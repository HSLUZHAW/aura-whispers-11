
-- PROFILES
CREATE TABLE public.profiles (
  id UUID NOT NULL PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  age INTEGER,
  cycle_length INTEGER DEFAULT 28,
  period_length INTEGER DEFAULT 5,
  last_period_date DATE,
  contraceptive TEXT,
  symptoms TEXT[] DEFAULT '{}',
  fitness_goal TEXT,
  sleep_quality TEXT,
  stress_level TEXT,
  nutrition_habits TEXT,
  relationship_status TEXT,
  health_goals TEXT[] DEFAULT '{}',
  mood_tendencies TEXT[] DEFAULT '{}',
  partner_insights_enabled BOOLEAN DEFAULT false,
  onboarded BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "profiles_select_own" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "profiles_insert_own" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_update_own" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id);

-- auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email,'@',1)));
  RETURN NEW;
END;
$$;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- updated_at trigger helper
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;
CREATE TRIGGER profiles_set_updated_at BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- DAILY LOGS
CREATE TABLE public.daily_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  log_date DATE NOT NULL DEFAULT CURRENT_DATE,
  mood INTEGER,        -- 1-5
  energy INTEGER,      -- 1-5
  sleep_hours NUMERIC,
  stress INTEGER,      -- 1-5
  libido INTEGER,      -- 1-5
  skin TEXT,
  symptoms TEXT[] DEFAULT '{}',
  cravings TEXT[] DEFAULT '{}',
  workout TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, log_date)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.daily_logs TO authenticated;
GRANT ALL ON public.daily_logs TO service_role;
ALTER TABLE public.daily_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "daily_logs_select_own" ON public.daily_logs FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "daily_logs_insert_own" ON public.daily_logs FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "daily_logs_update_own" ON public.daily_logs FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "daily_logs_delete_own" ON public.daily_logs FOR DELETE TO authenticated USING (auth.uid() = user_id);
CREATE TRIGGER daily_logs_set_updated_at BEFORE UPDATE ON public.daily_logs
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- CYCLE EVENTS
CREATE TABLE public.cycle_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL, -- 'period_start' | 'period_end'
  event_date DATE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.cycle_events TO authenticated;
GRANT ALL ON public.cycle_events TO service_role;
ALTER TABLE public.cycle_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "cycle_events_select_own" ON public.cycle_events FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "cycle_events_insert_own" ON public.cycle_events FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "cycle_events_update_own" ON public.cycle_events FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "cycle_events_delete_own" ON public.cycle_events FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- AI MESSAGES
CREATE TABLE public.ai_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL, -- 'user' | 'assistant'
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.ai_messages TO authenticated;
GRANT ALL ON public.ai_messages TO service_role;
ALTER TABLE public.ai_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "ai_messages_select_own" ON public.ai_messages FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "ai_messages_insert_own" ON public.ai_messages FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "ai_messages_delete_own" ON public.ai_messages FOR DELETE TO authenticated USING (auth.uid() = user_id);
CREATE INDEX ai_messages_user_created_idx ON public.ai_messages(user_id, created_at);
