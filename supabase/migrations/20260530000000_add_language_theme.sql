-- Add language and theme columns to profiles
-- Allows users to choose their preferred app language (de/en) and theme
ALTER TABLE public.profiles 
  ADD COLUMN IF NOT EXISTS language TEXT DEFAULT 'en' CHECK (language IN ('de', 'en')),
  ADD COLUMN IF NOT EXISTS theme TEXT DEFAULT 'auto' CHECK (theme IN ('light', 'dark', 'auto'));
