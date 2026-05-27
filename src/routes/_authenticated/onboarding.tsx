import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/onboarding")({
  head: () => ({ meta: [{ title: "Welcome — Lunara" }] }),
  component: Onboarding,
});

type Answers = {
  display_name: string;
  age: number | null;
  cycle_length: number;
  period_length: number;
  last_period_date: string;
  contraceptive: string;
  symptoms: string[];
  fitness_goal: string;
  sleep_quality: string;
  stress_level: string;
  health_goals: string[];
  mood_tendencies: string[];
  partner_insights_enabled: boolean;
};

const SYMPTOMS = ["Cramps", "Bloating", "Headaches", "Acne", "Fatigue", "Tender breasts", "Back pain"];
const GOALS = ["Understand my cycle", "Mood balance", "Better sleep", "Energy", "Fertility awareness", "Hormone health"];
const MOODS = ["Anxious", "Sensitive", "Calm", "Focused", "Low", "Energized"];

function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [saving, setSaving] = useState(false);
  const [a, setA] = useState<Answers>({
    display_name: "",
    age: null,
    cycle_length: 28,
    period_length: 5,
    last_period_date: new Date().toISOString().slice(0, 10),
    contraceptive: "none",
    symptoms: [],
    fitness_goal: "balanced",
    sleep_quality: "good",
    stress_level: "moderate",
    health_goals: [],
    mood_tendencies: [],
    partner_insights_enabled: false,
  });

  const toggle = (key: "symptoms" | "health_goals" | "mood_tendencies", v: string) =>
    setA((s) => ({ ...s, [key]: s[key].includes(v) ? s[key].filter((x) => x !== v) : [...s[key], v] }));

  const finish = async () => {
    setSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not signed in");
      const { error } = await supabase
        .from("profiles")
        .update({ ...a, onboarded: true })
        .eq("id", user.id);
      if (error) throw error;
      toast.success("Your Lunara is ready 🌙");
      navigate({ to: "/app" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save");
      setSaving(false);
    }
  };

  const steps = [
    {
      title: "What should we call you?",
      body: (
        <input
          value={a.display_name}
          onChange={(e) => setA({ ...a, display_name: e.target.value })}
          placeholder="Your first name"
          className="w-full px-5 py-4 rounded-2xl bg-background border border-border text-lg focus:outline-none focus:ring-2 focus:ring-ring"
        />
      ),
      can: a.display_name.length > 0,
    },
    {
      title: "How old are you?",
      body: (
        <input
          type="number"
          min={13}
          max={80}
          value={a.age ?? ""}
          onChange={(e) => setA({ ...a, age: e.target.value ? Number(e.target.value) : null })}
          placeholder="e.g. 27"
          className="w-full px-5 py-4 rounded-2xl bg-background border border-border text-lg focus:outline-none focus:ring-2 focus:ring-ring"
        />
      ),
      can: !!a.age,
    },
    {
      title: "When did your last period start?",
      body: (
        <input
          type="date"
          value={a.last_period_date}
          max={new Date().toISOString().slice(0, 10)}
          onChange={(e) => setA({ ...a, last_period_date: e.target.value })}
          className="w-full px-5 py-4 rounded-2xl bg-background border border-border text-lg focus:outline-none focus:ring-2 focus:ring-ring"
        />
      ),
      can: !!a.last_period_date,
    },
    {
      title: "Average cycle length?",
      sub: "Days from one period to the next. Don't know? 28 is a good guess.",
      body: (
        <div className="space-y-3">
          <input
            type="range"
            min={21}
            max={45}
            value={a.cycle_length}
            onChange={(e) => setA({ ...a, cycle_length: Number(e.target.value) })}
            className="w-full accent-clay"
          />
          <div className="text-center font-display text-4xl">{a.cycle_length} days</div>
        </div>
      ),
      can: true,
    },
    {
      title: "Are you using contraception?",
      body: (
        <div className="grid grid-cols-2 gap-3">
          {["none", "pill", "iud", "implant", "ring", "other"].map((c) => (
            <button
              key={c}
              onClick={() => setA({ ...a, contraceptive: c })}
              className={`px-4 py-4 rounded-2xl border capitalize transition ${a.contraceptive === c ? "border-clay bg-blush/30" : "border-border bg-card hover:border-clay/50"}`}
            >
              {c}
            </button>
          ))}
        </div>
      ),
      can: true,
    },
    {
      title: "Common symptoms for you?",
      sub: "Select all that apply.",
      body: (
        <div className="flex flex-wrap gap-2">
          {SYMPTOMS.map((s) => (
            <button
              key={s}
              onClick={() => toggle("symptoms", s)}
              className={`px-4 py-2 rounded-full text-sm border transition ${a.symptoms.includes(s) ? "border-clay bg-blush/30" : "border-border bg-card"}`}
            >
              {s}
            </button>
          ))}
        </div>
      ),
      can: true,
    },
    {
      title: "What are you hoping for?",
      body: (
        <div className="flex flex-wrap gap-2">
          {GOALS.map((s) => (
            <button
              key={s}
              onClick={() => toggle("health_goals", s)}
              className={`px-4 py-2 rounded-full text-sm border transition ${a.health_goals.includes(s) ? "border-clay bg-blush/30" : "border-border bg-card"}`}
            >
              {s}
            </button>
          ))}
        </div>
      ),
      can: a.health_goals.length > 0,
    },
    {
      title: "How do you tend to feel?",
      body: (
        <div className="flex flex-wrap gap-2">
          {MOODS.map((s) => (
            <button
              key={s}
              onClick={() => toggle("mood_tendencies", s)}
              className={`px-4 py-2 rounded-full text-sm border transition ${a.mood_tendencies.includes(s) ? "border-clay bg-blush/30" : "border-border bg-card"}`}
            >
              {s}
            </button>
          ))}
        </div>
      ),
      can: true,
    },
    {
      title: "Sleep & stress lately?",
      body: (
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Sleep quality</p>
            <div className="flex gap-2">
              {["poor", "okay", "good", "great"].map((v) => (
                <button key={v} onClick={() => setA({ ...a, sleep_quality: v })}
                  className={`flex-1 py-2 rounded-full text-sm border capitalize ${a.sleep_quality === v ? "border-clay bg-blush/30" : "border-border"}`}>{v}</button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Stress level</p>
            <div className="flex gap-2">
              {["low", "moderate", "high"].map((v) => (
                <button key={v} onClick={() => setA({ ...a, stress_level: v })}
                  className={`flex-1 py-2 rounded-full text-sm border capitalize ${a.stress_level === v ? "border-clay bg-blush/30" : "border-border"}`}>{v}</button>
              ))}
            </div>
          </div>
        </div>
      ),
      can: true,
    },
  ];

  const cur = steps[step];
  const isLast = step === steps.length - 1;

  return (
    <div className="min-h-screen bg-gradient-aurora flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-lg">
        <div className="mb-8">
          <div className="h-1 bg-border rounded-full overflow-hidden">
            <div className="h-full bg-clay transition-all duration-500" style={{ width: `${((step + 1) / steps.length) * 100}%` }} />
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">Step {step + 1} of {steps.length}</p>
        </div>

        <div className="bg-card/80 backdrop-blur-xl border border-border/60 rounded-3xl p-8 shadow-soft animate-fade-up" key={step}>
          <h1 className="font-display text-3xl mb-2">{cur.title}</h1>
          {cur.sub && <p className="text-sm text-muted-foreground mb-6">{cur.sub}</p>}
          <div className="my-6">{cur.body}</div>
          <div className="flex gap-3 mt-8">
            {step > 0 && (
              <button onClick={() => setStep(step - 1)} className="px-5 py-3 rounded-full border border-border text-sm">
                Back
              </button>
            )}
            <button
              onClick={() => isLast ? finish() : setStep(step + 1)}
              disabled={!cur.can || saving}
              className="flex-1 px-5 py-3 rounded-full bg-primary text-primary-foreground text-sm shadow-glow disabled:opacity-50"
            >
              {isLast ? (saving ? "Saving..." : "Enter Lunara") : "Continue"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
