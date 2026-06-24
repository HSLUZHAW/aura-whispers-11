import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { getLanguage, setLanguage } from "@/lib/language";
import { getSettingsTranslations } from "@/lib/settings-translations";
import { onLanguageChange } from "@/lib/language";

export const Route = createFileRoute("/_authenticated/app/settings")({
  head: () => ({ meta: [{ title: "Settings — Lunara" }] }),
  component: SettingsPage,
});

function SettingsPage() {
  const qc = useQueryClient();
  const navigate = useNavigate();
  const [lang, setLangState] = useState<"de" | "en" | "fr">("en");
  const t = getSettingsTranslations(lang);

  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;
      const { data } = await supabase.from("profiles").select("*").eq("id", user.id).maybeSingle();
      return data;
    },
  });

  const [form, setForm] = useState({
    display_name: "",
    age: null as number | null,
    cycle_length: 28,
    period_length: 5,
    last_period_date: "",
    contraceptive: "",
    fitness_goal: "",
    sleep_quality: "",
    stress_level: "",
    nutrition_habits: "",
    relationship_status: "",
    partner_insights_enabled: false,
  });

  const [userEmail, setUserEmail] = useState<string>("");

  useEffect(() => {
    const currentLang = getLanguage();
    setLangState(currentLang);
    const unsubscribe = onLanguageChange(() => {
      setLangState(getLanguage());
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (profile) {
      setForm({
        display_name: profile.display_name ?? "",
        age: profile.age ?? null,
        cycle_length: profile.cycle_length ?? 28,
        period_length: profile.period_length ?? 5,
        last_period_date: profile.last_period_date ?? "",
        contraceptive: profile.contraceptive ?? "",
        fitness_goal: profile.fitness_goal ?? "",
        sleep_quality: profile.sleep_quality ?? "",
        stress_level: profile.stress_level ?? "",
        nutrition_habits: profile.nutrition_habits ?? "",
        relationship_status: profile.relationship_status ?? "",
        partner_insights_enabled: profile.partner_insights_enabled ?? false,
      });
    }
  }, [profile]);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserEmail(user.email ?? "");
      }
    };
    fetchUser();
  }, []);

  const save = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { error } = await supabase.from("profiles").update(form).eq("id", user.id);
      if (error) throw error;
      toast.success(t.saveButton);
      qc.invalidateQueries({ queryKey: ["profile"] });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not save");
    }
  };

  const handleLanguageChange = (newLang: "de" | "en" | "fr") => {
    setLanguage(newLang);
    setLangState(newLang);
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    qc.clear();
    navigate({ to: "/" });
  };

  return (
    <div className="space-y-6">
      <header>
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{t.settings}</p>
        <h1 className="font-display text-3xl mt-1">{t.yourProfile}</h1>
      </header>

      {/* Profile Section */}
      <section className="rounded-3xl p-6 bg-card border border-border/60 space-y-4">
        <h2 className="text-lg font-semibold">{t.profileSection}</h2>
        <Field label={t.nameLabel}>
          <input
            value={form.display_name}
            onChange={(e) => setForm({ ...form, display_name: e.target.value })}
            className="w-full px-4 py-2.5 rounded-2xl bg-background border border-border"
          />
        </Field>
        <Field label={t.ageLabel}>
          <input
            type="number"
            min={1}
            max={120}
            value={form.age ?? ""}
            onChange={(e) => setForm({ ...form, age: e.target.value ? Number(e.target.value) : null })}
            className="w-full px-4 py-2.5 rounded-2xl bg-background border border-border"
          />
        </Field>
      </section>

      {/* Cycle Section */}
      <section className="rounded-3xl p-6 bg-card border border-border/60 space-y-4">
        <h2 className="text-lg font-semibold">{t.cycleSection}</h2>
        <Field label={t.cycleLengthLabel}>
          <input
            type="number"
            min={21}
            max={45}
            value={form.cycle_length}
            onChange={(e) => setForm({ ...form, cycle_length: Number(e.target.value) })}
            className="w-full px-4 py-2.5 rounded-2xl bg-background border border-border"
          />
        </Field>
        <Field label={t.periodLengthLabel}>
          <input
            type="number"
            min={1}
            max={10}
            value={form.period_length}
            onChange={(e) => setForm({ ...form, period_length: Number(e.target.value) })}
            className="w-full px-4 py-2.5 rounded-2xl bg-background border border-border"
          />
        </Field>
        <Field label={t.lastPeriodLabel}>
          <input
            type="date"
            value={form.last_period_date}
            onChange={(e) => setForm({ ...form, last_period_date: e.target.value })}
            className="w-full px-4 py-2.5 rounded-2xl bg-background border border-border"
          />
        </Field>
      </section>

      {/* Lifestyle Section */}
      <section className="rounded-3xl p-6 bg-card border border-border/60 space-y-4">
        <h2 className="text-lg font-semibold">{t.lifestyleSection}</h2>
        <Field label={t.contraceptiveLabel}>
          <select
            value={form.contraceptive}
            onChange={(e) => setForm({ ...form, contraceptive: e.target.value })}
            className="w-full px-4 py-2.5 rounded-2xl bg-background border border-border"
          >
            <option value="">— {t.contraceptiveLabel}</option>
            {t.contraceptiveOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </Field>
        <Field label={t.fitnessGoalLabel}>
          <select
            value={form.fitness_goal}
            onChange={(e) => setForm({ ...form, fitness_goal: e.target.value })}
            className="w-full px-4 py-2.5 rounded-2xl bg-background border border-border"
          >
            <option value="">— {t.fitnessGoalLabel}</option>
            {t.fitnessGoalOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </Field>
        <Field label={t.sleepQualityLabel}>
          <select
            value={form.sleep_quality}
            onChange={(e) => setForm({ ...form, sleep_quality: e.target.value })}
            className="w-full px-4 py-2.5 rounded-2xl bg-background border border-border"
          >
            <option value="">— {t.sleepQualityLabel}</option>
            {t.sleepQualityOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </Field>
        <Field label={t.stressLevelLabel}>
          <select
            value={form.stress_level}
            onChange={(e) => setForm({ ...form, stress_level: e.target.value })}
            className="w-full px-4 py-2.5 rounded-2xl bg-background border border-border"
          >
            <option value="">— {t.stressLevelLabel}</option>
            {t.stressLevelOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </Field>
        <Field label={t.nutritionHabitsLabel}>
          <select
            value={form.nutrition_habits}
            onChange={(e) => setForm({ ...form, nutrition_habits: e.target.value })}
            className="w-full px-4 py-2.5 rounded-2xl bg-background border border-border"
          >
            <option value="">— {t.nutritionHabitsLabel}</option>
            {t.nutritionHabitsOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </Field>
        <Field label={t.relationshipStatusLabel}>
          <select
            value={form.relationship_status}
            onChange={(e) => setForm({ ...form, relationship_status: e.target.value })}
            className="w-full px-4 py-2.5 rounded-2xl bg-background border border-border"
          >
            <option value="">— {t.relationshipStatusLabel}</option>
            {t.relationshipStatusOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </Field>
      </section>

      {/* App Settings Section */}
      <section className="rounded-3xl p-6 bg-card border border-border/60 space-y-4">
        <h2 className="text-lg font-semibold">{t.appSettingsSection}</h2>
        <Field label={t.languageLabel}>
          <div className="flex gap-2">
            <button
              onClick={() => handleLanguageChange("de")}
              className={`flex-1 px-4 py-2.5 rounded-2xl text-sm font-medium transition ${
                lang === "de"
                  ? "bg-primary text-primary-foreground"
                  : "bg-background border border-border text-foreground hover:bg-secondary"
              }`}
            >
              {t.deutsch}
            </button>
            <button
              onClick={() => handleLanguageChange("en")}
              className={`flex-1 px-4 py-2.5 rounded-2xl text-sm font-medium transition ${
                lang === "en"
                  ? "bg-primary text-primary-foreground"
                  : "bg-background border border-border text-foreground hover:bg-secondary"
              }`}
            >
              {t.english}
            </button>
            <button
              onClick={() => handleLanguageChange("fr")}
              className={`flex-1 px-4 py-2.5 rounded-2xl text-sm font-medium transition ${
                lang === "fr"
                  ? "bg-primary text-primary-foreground"
                  : "bg-background border border-border text-foreground hover:bg-secondary"
              }`}
            >
              Français
            </button>
          </div>
        </Field>
        <label className="flex items-center justify-between py-2">
          <div>
            <p className="text-sm font-medium">{t.partnerInsightsLabel}</p>
            <p className="text-xs text-muted-foreground">{t.partnerInsightsDescription}</p>
          </div>
          <input
            type="checkbox"
            checked={form.partner_insights_enabled}
            onChange={(e) => setForm({ ...form, partner_insights_enabled: e.target.checked })}
            className="w-5 h-5 accent-clay"
          />
        </label>
      </section>

      {/* Account Section */}
      <section className="rounded-3xl p-6 bg-card border border-border/60 space-y-4">
        <h2 className="text-lg font-semibold">{t.accountSection}</h2>
        <Field label={t.emailLabel}>
          <div className="w-full px-4 py-2.5 rounded-2xl bg-background border border-border text-foreground text-sm">
            {userEmail}
          </div>
        </Field>
      </section>

      {/* Save and Sign Out Buttons */}
      <button
        onClick={save}
        className="w-full py-3 rounded-full bg-primary text-primary-foreground text-sm shadow-glow"
      >
        {t.saveButton}
      </button>

      <button
        onClick={signOut}
        className="w-full py-3 rounded-full border border-border text-sm text-muted-foreground hover:bg-secondary"
      >
        {t.signOutButton}
      </button>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-sm text-muted-foreground mb-1.5 block">{label}</label>
      {children}
    </div>
  );
}
