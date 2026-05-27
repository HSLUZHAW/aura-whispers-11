import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { getCycleInfo, PHASE_COLORS, type CyclePhase } from "@/lib/cycle";

export const Route = createFileRoute("/_authenticated/app/cycle")({
  head: () => ({ meta: [{ title: "Cycle — Lunara" }] }),
  component: CyclePage,
});

const SYMPTOMS = ["Cramps", "Bloating", "Headache", "Acne", "Fatigue", "Tender breasts", "Back pain"];
const CRAVINGS = ["Sweet", "Salty", "Carbs", "Chocolate", "Caffeine"];

function CyclePage() {
  const qc = useQueryClient();
  const today = new Date().toISOString().slice(0, 10);

  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;
      const { data } = await supabase.from("profiles").select("*").eq("id", user.id).maybeSingle();
      return data;
    },
  });

  const { data: log } = useQuery({
    queryKey: ["log", today],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;
      const { data } = await supabase.from("daily_logs").select("*")
        .eq("user_id", user.id).eq("log_date", today).maybeSingle();
      return data;
    },
  });

  const [form, setForm] = useState({
    mood: 3, energy: 3, stress: 3, sleep_hours: 7,
    symptoms: [] as string[], cravings: [] as string[], notes: "",
  });

  useEffect(() => {
    if (log) {
      setForm({
        mood: log.mood ?? 3,
        energy: log.energy ?? 3,
        stress: log.stress ?? 3,
        sleep_hours: log.sleep_hours ?? 7,
        symptoms: log.symptoms ?? [],
        cravings: log.cravings ?? [],
        notes: log.notes ?? "",
      });
    }
  }, [log]);

  const toggle = (key: "symptoms" | "cravings", v: string) =>
    setForm((s) => ({ ...s, [key]: s[key].includes(v) ? s[key].filter((x) => x !== v) : [...s[key], v] }));

  const save = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { error } = await supabase.from("daily_logs").upsert(
        { user_id: user.id, log_date: today, ...form },
        { onConflict: "user_id,log_date" },
      );
      if (error) throw error;
      toast.success("Saved 🌸");
      qc.invalidateQueries({ queryKey: ["log", today] });
      qc.invalidateQueries({ queryKey: ["today-log"] });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not save");
    }
  };

  const logPeriod = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { error } = await supabase.from("profiles").update({ last_period_date: today }).eq("id", user.id);
      if (error) throw error;
      await supabase.from("cycle_events").insert({ user_id: user.id, event_type: "period_start", event_date: today });
      toast.success("Period logged");
      qc.invalidateQueries({ queryKey: ["profile"] });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not log");
    }
  };

  const cycle = profile ? getCycleInfo(profile.last_period_date, profile.cycle_length ?? 28, profile.period_length ?? 5) : null;

  return (
    <div className="space-y-6">
      <header>
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Cycle</p>
        <h1 className="font-display text-3xl mt-1">Your rhythm</h1>
      </header>

      {/* Cycle ring */}
      {cycle && profile && (
        <CycleRing day={cycle.day} length={profile.cycle_length ?? 28} periodLength={profile.period_length ?? 5} phase={cycle.phase} />
      )}

      <button onClick={logPeriod}
        className="w-full py-3 rounded-full bg-blush/40 border border-blush/60 text-sm font-medium hover:bg-blush/60 transition">
        🩸 Log period started today
      </button>

      {/* Daily check-in */}
      <section className="rounded-3xl p-6 bg-card border border-border/60 space-y-5">
        <h2 className="font-display text-xl">Today's check-in</h2>

        <Scale label="Mood" value={form.mood} onChange={(v) => setForm({ ...form, mood: v })} />
        <Scale label="Energy" value={form.energy} onChange={(v) => setForm({ ...form, energy: v })} />
        <Scale label="Stress" value={form.stress} onChange={(v) => setForm({ ...form, stress: v })} />

        <div>
          <label className="text-sm text-muted-foreground">Sleep (hours)</label>
          <input type="number" step="0.5" min={0} max={14} value={form.sleep_hours}
            onChange={(e) => setForm({ ...form, sleep_hours: Number(e.target.value) })}
            className="w-full mt-1 px-4 py-2.5 rounded-2xl bg-background border border-border" />
        </div>

        <Pills label="Symptoms" options={SYMPTOMS} selected={form.symptoms} onToggle={(v) => toggle("symptoms", v)} />
        <Pills label="Cravings" options={CRAVINGS} selected={form.cravings} onToggle={(v) => toggle("cravings", v)} />

        <div>
          <label className="text-sm text-muted-foreground">Notes</label>
          <textarea rows={3} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })}
            placeholder="A few words about today..."
            className="w-full mt-1 px-4 py-3 rounded-2xl bg-background border border-border resize-none" />
        </div>

        <button onClick={save} className="w-full py-3 rounded-full bg-primary text-primary-foreground shadow-glow text-sm">
          Save today
        </button>
      </section>
    </div>
  );
}

function Scale({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) {
  return (
    <div>
      <div className="flex justify-between mb-2">
        <span className="text-sm">{label}</span>
        <span className="text-sm text-muted-foreground">{value}/5</span>
      </div>
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((n) => (
          <button key={n} onClick={() => onChange(n)}
            className={`flex-1 h-10 rounded-xl border transition ${value >= n ? "bg-clay/80 border-clay" : "bg-background border-border"}`} />
        ))}
      </div>
    </div>
  );
}

function Pills({ label, options, selected, onToggle }: { label: string; options: string[]; selected: string[]; onToggle: (v: string) => void }) {
  return (
    <div>
      <p className="text-sm mb-2">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button key={o} onClick={() => onToggle(o)}
            className={`px-3 py-1.5 rounded-full text-xs border transition ${selected.includes(o) ? "bg-blush/40 border-clay" : "bg-background border-border"}`}>
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}

function CycleRing({ day, length, periodLength, phase }: { day: number; length: number; periodLength: number; phase: CyclePhase }) {
  const size = 220;
  const stroke = 16;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const segments = [
    { start: 0, end: periodLength / length, color: "oklch(0.74 0.09 20)", label: "Menstrual" },
    { start: periodLength / length, end: 13 / length, color: "oklch(0.85 0.06 75)", label: "Follicular" },
    { start: 13 / length, end: 16 / length, color: "oklch(0.7 0.08 25)", label: "Ovulatory" },
    { start: 16 / length, end: 1, color: "oklch(0.78 0.05 305)", label: "Luteal" },
  ];
  return (
    <div className={`flex items-center justify-center rounded-3xl p-6 bg-gradient-to-br ${PHASE_COLORS[phase]} border border-border/40`}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="oklch(0.95 0 0 / 0.4)" strokeWidth={stroke} />
          {segments.map((s, i) => (
            <circle key={i} cx={size / 2} cy={size / 2} r={r} fill="none"
              stroke={s.color} strokeWidth={stroke}
              strokeDasharray={`${(s.end - s.start) * c} ${c}`}
              strokeDashoffset={-s.start * c}
              strokeLinecap="butt"
            />
          ))}
          {/* day marker */}
          <circle cx={size / 2 + r * Math.cos((day / length) * 2 * Math.PI - Math.PI / 2)}
            cy={size / 2 + r * Math.sin((day / length) * 2 * Math.PI - Math.PI / 2)}
            r={8} fill="oklch(0.98 0 0)" stroke="oklch(0.3 0 0)" strokeWidth={2}
            transform={`rotate(90 ${size / 2} ${size / 2})`} />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xs uppercase tracking-wider text-muted-foreground">Day</span>
          <span className="font-display text-5xl leading-none">{day}</span>
          <span className="text-sm mt-1 text-foreground/80">{phase}</span>
        </div>
      </div>
    </div>
  );
}
