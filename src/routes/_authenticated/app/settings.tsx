import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/app/settings")({
  head: () => ({ meta: [{ title: "Settings — Lunara" }] }),
  component: SettingsPage,
});

function SettingsPage() {
  const qc = useQueryClient();
  const navigate = useNavigate();
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
    cycle_length: 28,
    period_length: 5,
    last_period_date: "",
    partner_insights_enabled: false,
  });

  useEffect(() => {
    if (profile) {
      setForm({
        display_name: profile.display_name ?? "",
        cycle_length: profile.cycle_length ?? 28,
        period_length: profile.period_length ?? 5,
        last_period_date: profile.last_period_date ?? "",
        partner_insights_enabled: profile.partner_insights_enabled ?? false,
      });
    }
  }, [profile]);

  const save = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { error } = await supabase.from("profiles").update(form).eq("id", user.id);
      if (error) throw error;
      toast.success("Saved");
      qc.invalidateQueries({ queryKey: ["profile"] });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not save");
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/" });
  };

  return (
    <div className="space-y-6">
      <header>
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Settings</p>
        <h1 className="font-display text-3xl mt-1">Your profile</h1>
      </header>

      <section className="rounded-3xl p-6 bg-card border border-border/60 space-y-4">
        <Field label="Name">
          <input value={form.display_name} onChange={(e) => setForm({ ...form, display_name: e.target.value })}
            className="w-full px-4 py-2.5 rounded-2xl bg-background border border-border" />
        </Field>
        <Field label="Cycle length (days)">
          <input type="number" min={21} max={45} value={form.cycle_length}
            onChange={(e) => setForm({ ...form, cycle_length: Number(e.target.value) })}
            className="w-full px-4 py-2.5 rounded-2xl bg-background border border-border" />
        </Field>
        <Field label="Period length (days)">
          <input type="number" min={1} max={10} value={form.period_length}
            onChange={(e) => setForm({ ...form, period_length: Number(e.target.value) })}
            className="w-full px-4 py-2.5 rounded-2xl bg-background border border-border" />
        </Field>
        <Field label="Last period start">
          <input type="date" value={form.last_period_date}
            onChange={(e) => setForm({ ...form, last_period_date: e.target.value })}
            className="w-full px-4 py-2.5 rounded-2xl bg-background border border-border" />
        </Field>

        <label className="flex items-center justify-between py-2">
          <div>
            <p className="text-sm font-medium">Partner insights</p>
            <p className="text-xs text-muted-foreground">Allow simplified cycle insights to be shared.</p>
          </div>
          <input type="checkbox" checked={form.partner_insights_enabled}
            onChange={(e) => setForm({ ...form, partner_insights_enabled: e.target.checked })}
            className="w-5 h-5 accent-clay" />
        </label>

        <button onClick={save} className="w-full py-3 rounded-full bg-primary text-primary-foreground text-sm shadow-glow">
          Save changes
        </button>
      </section>

      <button onClick={signOut}
        className="w-full py-3 rounded-full border border-border text-sm text-muted-foreground hover:bg-secondary">
        Sign out
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
