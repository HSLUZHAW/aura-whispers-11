import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { getCycleInfo } from "@/lib/cycle";

export const Route = createFileRoute("/_authenticated/app/")({
  head: () => ({ meta: [{ title: "Home — Lunara" }] }),
  component: DashboardPage,
});

const MOODS = ["😔", "😕", "😐", "🙂", "😊"];

const PHASE_INSIGHTS: Record<string, string> = {
  Menstrual: "Rest is not laziness right now. Your body is doing real work. Warm food, slow movement, and early evenings are your medicine today.",
  Follicular: "Estrogen is climbing and your mind is sharp. This is the window for starting things, making plans, saying yes to the things that light you up.",
  Ovulatory: "Your energy peaks here. Confidence tends to follow. It is a good time for conversations you have been putting off and movement that feels alive.",
  Luteal: "Progesterone rises and the body slows. This is not a malfunction. Nourish, sleep deeply, and let the quieter rhythms lead.",
};

function DashboardPage() {
  const queryClient = useQueryClient();
  const [savingMood, setSavingMood] = useState(false);

  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;
      const { data } = await supabase
        .from("profiles")
        .select("display_name, last_period_date, cycle_length, period_length")
        .eq("id", user.id)
        .maybeSingle();
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
        .select("mood, energy, sleep_hours")
        .eq("user_id", user.id)
        .eq("log_date", today)
        .maybeSingle();
      return data;
    },
  });

  const cycle = profile
    ? getCycleInfo(profile.last_period_date, profile.cycle_length ?? 28, profile.period_length ?? 5)
    : null;

  async function quickMood(moodIdx: number) {
    setSavingMood(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setSavingMood(false); return; }
    const today = new Date().toISOString().slice(0, 10);
    await supabase.from("daily_logs").upsert(
      { user_id: user.id, log_date: today, mood: moodIdx + 1 },
      { onConflict: "user_id,log_date" },
    );
    await queryClient.invalidateQueries({ queryKey: ["today-log"] });
    setSavingMood(false);
  }

  const dateLabel = new Date().toLocaleDateString("en", { weekday: "long", month: "long", day: "numeric" });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", paddingBottom: "8px" }}>

      {/* Header */}
      <div>
        <p style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.2em", color: "var(--color-muted-foreground)", fontFamily: "'Inter', sans-serif" }}>
          {dateLabel}
        </p>
        <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "28px", fontWeight: 300, color: "var(--color-foreground)", marginTop: "2px", lineHeight: 1.2 }}>
          Hi, {profile?.display_name ?? "you"}.
        </h1>
      </div>

      {/* Phase card */}
      {cycle ? (
        <div style={{
          borderRadius: "20px",
          padding: "22px 24px",
          background: "var(--color-card)",
          border: "0.5px solid var(--color-border)",
          position: "relative",
          overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", inset: 0, opacity: 0.18,
            background: "radial-gradient(ellipse at 20% 20%, oklch(0.9 0.055 20), transparent 55%), radial-gradient(ellipse at 80% 80%, oklch(0.88 0.05 305), transparent 55%)",
            pointerEvents: "none",
          }} />
          <div style={{ position: "relative" }}>
            <p style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.2em", color: "var(--color-muted-foreground)", fontFamily: "'Inter', sans-serif" }}>
              Cycle day {cycle.day}
            </p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "36px", fontWeight: 300, color: "var(--color-foreground)", marginTop: "2px", lineHeight: 1.1 }}>
              {cycle.phase}
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "var(--color-muted-foreground)", marginTop: "8px", lineHeight: 1.6 }}>
              {cycle.description}
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "var(--color-muted-foreground)", marginTop: "6px" }}>
              ~{cycle.nextPeriodInDays} days until next period
            </p>
          </div>
        </div>
      ) : (
        <Link
          to="/app/settings"
          style={{
            display: "block",
            borderRadius: "20px",
            padding: "22px 24px",
            background: "var(--color-card)",
            border: "0.5px solid var(--color-border)",
            textDecoration: "none",
          }}
        >
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "var(--color-muted-foreground)" }}>
            Add your last period in settings to see your phase →
          </p>
        </Link>
      )}

      {/* Quick mood */}
      <div style={{ borderRadius: "20px", padding: "18px 20px", background: "var(--color-card)", border: "0.5px solid var(--color-border)" }}>
        <p style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.2em", color: "var(--color-muted-foreground)", fontFamily: "'Inter', sans-serif", marginBottom: "12px" }}>
          How are you feeling right now?
        </p>
        <div style={{ display: "flex", justifyContent: "space-between", gap: "4px" }}>
          {MOODS.map((emoji, i) => {
            const selected = todayLog?.mood === i + 1;
            return (
              <button
                key={i}
                onClick={() => quickMood(i)}
                disabled={savingMood}
                aria-label={`Mood ${i + 1} of 5`}
                style={{
                  flex: 1,
                  padding: "10px 4px",
                  borderRadius: "12px",
                  border: selected ? "1px solid var(--color-foreground)" : "0.5px solid var(--color-border)",
                  background: selected ? "var(--color-foreground)" : "var(--color-background)",
                  fontSize: "20px",
                  cursor: "pointer",
                  transition: "all 0.15s",
                  filter: selected ? "none" : "grayscale(0.2)",
                  opacity: savingMood ? 0.6 : 1,
                }}
              >
                {emoji}
              </button>
            );
          })}
        </div>
      </div>

      {/* Lunara insight */}
      {cycle && PHASE_INSIGHTS[cycle.phase] && (
        <div style={{
          borderRadius: "20px",
          padding: "20px 22px",
          background: "var(--color-primary)",
        }}>
          <p style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.2em", color: "rgba(245,240,235,0.5)", fontFamily: "'Inter', sans-serif", marginBottom: "10px" }}>
            From Lunara
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", lineHeight: "1.65", color: "#f5f0eb" }}>
            <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: "italic", fontWeight: 300, fontSize: "14px" }}>
              {PHASE_INSIGHTS[cycle.phase].split(" ")[0]}
            </span>
            {" " + PHASE_INSIGHTS[cycle.phase].split(" ").slice(1).join(" ")}
          </p>
          <Link
            to="/app/chat"
            style={{ display: "inline-block", marginTop: "14px", fontSize: "11px", fontFamily: "'Inter', sans-serif", color: "rgba(245,240,235,0.6)", textDecoration: "none" }}
          >
            Talk to Lunara →
          </Link>
        </div>
      )}

      {/* Stat cards */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
        <StatCard label="Cycle length" value={profile?.cycle_length ?? "—"} suffix="days" />
        <StatCard label="Next period" value={cycle ? `${cycle.nextPeriodInDays}` : "—"} suffix={cycle ? "days" : ""} />
      </div>

      {/* Log CTA */}
      <Link
        to="/app/log"
        style={{
          display: "block",
          borderRadius: "20px",
          padding: "18px 20px",
          background: "var(--color-background)",
          border: "0.5px solid var(--color-border)",
          textDecoration: "none",
        }}
      >
        <p style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.2em", color: "var(--color-muted-foreground)", fontFamily: "'Inter', sans-serif", marginBottom: "4px" }}>
          {todayLog ? "Update today's log" : "Daily log"}
        </p>
        <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "20px", fontWeight: 300, color: "var(--color-foreground)" }}>
          {todayLog ? "You checked in today." : "Track symptoms and energy."}
        </p>
      </Link>

    </div>
  );
}

function StatCard({ label, value, suffix }: { label: string; value: string | number; suffix?: string }) {
  return (
    <div style={{
      borderRadius: "16px",
      padding: "16px",
      background: "var(--color-card)",
      border: "0.5px solid var(--color-border)",
    }}>
      <p style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--color-muted-foreground)", fontFamily: "'Inter', sans-serif", marginBottom: "8px" }}>
        {label}
      </p>
      <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "28px", fontWeight: 300, color: "var(--color-foreground)", lineHeight: 1 }}>
        {value}
        {suffix && (
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "var(--color-muted-foreground)", marginLeft: "4px" }}>
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}
