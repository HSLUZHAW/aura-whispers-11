import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Droplets, Moon, Activity, Heart, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { getCycleInfo, PHASE_COLORS } from "@/lib/cycle";

export const Route = createFileRoute("/_authenticated/app/")({
  head: () => ({ meta: [{ title: "Today — Lunara" }] }),
  component: Dashboard,
});

function Dashboard() {
  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;
      const { data } = await supabase.from("profiles").select("*").eq("id", user.id).maybeSingle();
      return data;
    },
  });

  const { data: todayLog } = useQuery({
    queryKey: ["today-log"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;
      const today = new Date().toISOString().slice(0, 10);
      const { data } = await supabase
        .from("daily_logs")
        .select("*").eq("user_id", user.id).eq("log_date", today).maybeSingle();
      return data;
    },
  });

  const cycle = profile ? getCycleInfo(profile.last_period_date, profile.cycle_length ?? 28, profile.period_length ?? 5) : null;
  const wellness = todayLog
    ? Math.round(((todayLog.mood ?? 3) + (todayLog.energy ?? 3) + (6 - (todayLog.stress ?? 3))) / 15 * 100)
    : null;

  const insights: Record<string, string> = {
    Menstrual: "Today is a day for softness. Iron-rich foods, warm baths, and saying no to anything that feels too much.",
    Follicular: "Estrogen is climbing — your brain loves novelty right now. Start that thing you've been thinking about.",
    Ovulatory: "Confidence is peaking. Schedule the conversation, the workout, the date. You'll feel it.",
    Luteal: "Progesterone is rising. Lean into routines, magnesium, slow walks. Productivity over creativity today.",
  };

  return (
    <div className="space-y-5">
      <header className="flex items-baseline justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {new Date().toLocaleDateString("en", { weekday: "long", month: "long", day: "numeric" })}
          </p>
          <h1 className="font-display text-3xl mt-1">
            Hi, {profile?.display_name ?? "you"}.
          </h1>
        </div>
      </header>

      {/* Phase hero */}
      {cycle ? (
        <div className={`relative overflow-hidden rounded-3xl p-7 bg-gradient-to-br ${PHASE_COLORS[cycle.phase]} border border-border/40`}>
          <div className="absolute inset-0 bg-gradient-aurora opacity-30" />
          <div className="relative">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Cycle day {cycle.day}</p>
            <h2 className="font-display text-4xl mt-1">{cycle.phase}</h2>
            <p className="mt-3 text-sm text-foreground/80 max-w-md">{cycle.description}</p>
            <p className="mt-4 text-xs text-muted-foreground">~{cycle.nextPeriodInDays} days until next period</p>
          </div>
        </div>
      ) : (
        <div className="rounded-3xl p-7 bg-card border border-border">
          <p className="text-sm text-muted-foreground">Add your last period in settings to see your phase.</p>
        </div>
      )}

      {/* Daily insight */}
      {cycle && (
        <article className="rounded-3xl p-6 bg-card border border-border/60">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles size={14} className="text-clay" />
            <span className="text-xs uppercase tracking-wider text-muted-foreground">Today's insight</span>
          </div>
          <p className="font-display text-lg leading-snug">{insights[cycle.phase]}</p>
          <Link to="/app/assistant" className="inline-block mt-4 text-xs text-clay hover:underline">
            Ask Lunara more →
          </Link>
        </article>
      )}

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3">
        <StatCard icon={<Heart size={16} />} label="Wellness" value={wellness ? `${wellness}` : "—"} suffix="/100" />
        <StatCard icon={<Activity size={16} />} label="Energy" value={todayLog?.energy ?? "—"} suffix="/5" />
        <StatCard icon={<Moon size={16} />} label="Sleep" value={todayLog?.sleep_hours ?? "—"} suffix="h" />
        <StatCard icon={<Droplets size={16} />} label="Mood" value={todayLog?.mood ?? "—"} suffix="/5" />
      </div>

      {/* CTA */}
      <Link to="/app/cycle"
        className="block rounded-3xl p-6 bg-gradient-soft border border-border/60 hover:shadow-soft transition">
        <p className="text-xs uppercase tracking-wider text-clay mb-1">Today's check-in</p>
        <p className="font-display text-xl">{todayLog ? "Update how you feel today" : "How are you feeling today?"}</p>
        <p className="text-sm text-muted-foreground mt-1">Two taps. Patterns start here.</p>
      </Link>

      {/* Recommendation */}
      {cycle && (
        <article className="rounded-3xl p-6 bg-card border border-border/60">
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Try today</p>
          <ul className="space-y-2 text-sm">
            {recommend(cycle.phase).map((r) => (
              <li key={r} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-clay mt-2" />
                {r}
              </li>
            ))}
          </ul>
        </article>
      )}
    </div>
  );
}

function StatCard({ icon, label, value, suffix }: { icon: React.ReactNode; label: string; value: string | number; suffix?: string }) {
  return (
    <div className="rounded-2xl p-4 bg-card border border-border/60">
      <div className="flex items-center gap-2 text-muted-foreground mb-2">
        {icon}
        <span className="text-xs uppercase tracking-wider">{label}</span>
      </div>
      <div className="font-display text-2xl">
        {value}<span className="text-sm text-muted-foreground ml-1">{suffix}</span>
      </div>
    </div>
  );
}

function recommend(phase: string): string[] {
  switch (phase) {
    case "Menstrual":
      return ["Gentle yin yoga or a long walk", "Iron-rich foods: lentils, dark greens", "Limit caffeine — be kind to your nervous system"];
    case "Follicular":
      return ["Try a new workout — your body adapts fastest now", "Brainstorm or start creative projects", "Fermented foods to support rising estrogen"];
    case "Ovulatory":
      return ["High-intensity workouts feel best today", "Big conversations and social plans", "Hydration + cruciferous veggies"];
    case "Luteal":
      return ["Strength training over cardio", "Magnesium-rich foods: pumpkin seeds, dark chocolate", "Wind-down routine: low light, no doom-scroll"];
    default:
      return [];
  }
}
