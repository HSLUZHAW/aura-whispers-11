import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/app/log")({
  head: () => ({ meta: [{ title: "Daily Log — Lunara" }] }),
  component: LogPage,
});

const MOODS = ["😔", "😕", "😐", "🙂", "😊"];
const MOOD_LABELS = ["Hard", "Low", "Okay", "Good", "Great"];
const ENERGY_OPTIONS = [
  { label: "Low", value: 1 },
  { label: "Medium", value: 3 },
  { label: "High", value: 5 },
];
const SYMPTOM_OPTIONS = ["Cramps", "Bloating", "Headache", "Acne", "Tender", "Fatigue"];

function LogPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [mood, setMood] = useState<number | null>(null);
  const [energy, setEnergy] = useState<number | null>(null);
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;
      const { data } = await supabase.from("profiles").select("*").eq("id", user.id).maybeSingle();
      return data;
    },
  });

  const today = new Date().toISOString().slice(0, 10);

  useQuery({
    queryKey: ["today-log"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;
      const { data } = await supabase
        .from("daily_logs").select("*").eq("user_id", user.id).eq("log_date", today).maybeSingle();
      if (data) {
        if (data.mood != null) setMood(data.mood);
        if (data.energy != null) setEnergy(data.energy);
        if (data.symptoms) setSymptoms(data.symptoms);
        if (data.notes) setNotes(data.notes);
      }
      return data;
    },
  });

  function toggleSymptom(s: string) {
    setSymptoms((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );
  }

  async function save() {
    setSaving(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setSaving(false); return; }
    await supabase.from("daily_logs").upsert(
      {
        user_id: user.id,
        log_date: today,
        mood: mood ?? undefined,
        energy: energy ?? undefined,
        symptoms: symptoms.length > 0 ? symptoms : null,
        notes: notes.trim() || null,
      },
      { onConflict: "user_id,log_date" },
    );
    await queryClient.invalidateQueries({ queryKey: ["today-log"] });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  const dateLabel = new Date().toLocaleDateString("en", { weekday: "long", month: "long", day: "numeric" });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px", paddingBottom: "8px" }}>

      {/* Header */}
      <div>
        <p style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.2em", color: "var(--color-muted-foreground)", fontFamily: "'Inter', sans-serif" }}>
          {dateLabel}
        </p>
        <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "28px", fontWeight: 300, color: "var(--color-foreground)", marginTop: "2px", lineHeight: 1.2 }}>
          How are you today?
        </h1>
      </div>

      {/* Mood */}
      <Section label="Mood">
        <div style={{ display: "flex", gap: "8px" }}>
          {MOODS.map((emoji, i) => {
            const val = i + 1;
            const selected = mood === val;
            return (
              <button
                key={i}
                onClick={() => setMood(selected ? null : val)}
                style={{
                  flex: 1,
                  padding: "10px 4px 8px",
                  borderRadius: "14px",
                  border: selected ? "1px solid var(--color-foreground)" : "0.5px solid var(--color-border)",
                  background: selected ? "var(--color-foreground)" : "var(--color-background)",
                  cursor: "pointer",
                  transition: "all 0.15s",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <span style={{ fontSize: "22px", filter: selected ? "none" : "grayscale(0.2)" }}>{emoji}</span>
                <span style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "9px",
                  color: selected ? "var(--color-primary-foreground)" : "var(--color-muted-foreground)",
                  letterSpacing: "0.02em",
                }}>
                  {MOOD_LABELS[i]}
                </span>
              </button>
            );
          })}
        </div>
      </Section>

      {/* Energy */}
      <Section label="Energy">
        <div style={{ display: "flex", gap: "8px" }}>
          {ENERGY_OPTIONS.map((opt) => {
            const selected = energy === opt.value;
            return (
              <button
                key={opt.label}
                onClick={() => setEnergy(selected ? null : opt.value)}
                style={{
                  flex: 1,
                  padding: "10px 8px",
                  borderRadius: "12px",
                  border: selected ? "1px solid var(--color-foreground)" : "0.5px solid var(--color-border)",
                  background: selected ? "var(--color-foreground)" : "var(--color-background)",
                  cursor: "pointer",
                  transition: "all 0.15s",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "12px",
                  color: selected ? "var(--color-primary-foreground)" : "var(--color-foreground)",
                  letterSpacing: "0.01em",
                }}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </Section>

      {/* Symptoms */}
      <Section label="Symptoms">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px" }}>
          {SYMPTOM_OPTIONS.map((s) => {
            const selected = symptoms.includes(s);
            return (
              <button
                key={s}
                onClick={() => toggleSymptom(s)}
                style={{
                  padding: "9px 8px",
                  borderRadius: "12px",
                  border: selected ? "1px solid var(--color-foreground)" : "0.5px solid var(--color-border)",
                  background: selected ? "var(--color-foreground)" : "var(--color-background)",
                  cursor: "pointer",
                  transition: "all 0.15s",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "11px",
                  color: selected ? "var(--color-primary-foreground)" : "var(--color-foreground)",
                }}
              >
                {s}
              </button>
            );
          })}
        </div>
      </Section>

      {/* Notes */}
      <Section label="Notes">
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Anything else on your mind today..."
          rows={3}
          style={{
            width: "100%",
            padding: "12px 14px",
            borderRadius: "14px",
            border: "0.5px solid var(--color-input)",
            background: "var(--color-background)",
            color: "var(--color-foreground)",
            fontFamily: "'Inter', sans-serif",
            fontSize: "12px",
            lineHeight: "1.6",
            outline: "none",
            resize: "none",
            transition: "border-color 0.15s",
            boxSizing: "border-box",
          }}
          onFocus={(e) => (e.currentTarget.style.borderColor = "var(--color-ring)")}
          onBlur={(e) => (e.currentTarget.style.borderColor = "var(--color-input)")}
        />
      </Section>

      {/* Save */}
      <button
        onClick={save}
        disabled={saving || (!mood && !energy && symptoms.length === 0 && !notes.trim())}
        style={{
          width: "100%",
          padding: "14px",
          borderRadius: "999px",
          border: "none",
          background: saved ? "oklch(0.55 0.06 25)" : "var(--color-primary)",
          color: "var(--color-primary-foreground)",
          fontFamily: "'Inter', sans-serif",
          fontSize: "13px",
          letterSpacing: "0.02em",
          cursor: saving ? "default" : "pointer",
          transition: "opacity 0.15s, background 0.3s",
          opacity: saving || (!mood && !energy && symptoms.length === 0 && !notes.trim()) ? 0.4 : 1,
        }}
      >
        {saved ? "Saved" : saving ? "Saving..." : "Save today's log"}
      </button>

    </div>
  );
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p style={{
        fontSize: "10px",
        textTransform: "uppercase",
        letterSpacing: "0.2em",
        color: "var(--color-muted-foreground)",
        fontFamily: "'Inter', sans-serif",
        marginBottom: "10px",
      }}>
        {label}
      </p>
      {children}
    </div>
  );
}
