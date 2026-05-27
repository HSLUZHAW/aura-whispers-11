import { createFileRoute, Outlet, Link, useNavigate, useLocation, redirect } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Home, CalendarDays, Sparkles, Settings as SettingsIcon, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/app")({
  beforeLoad: async () => {
    if (typeof window === "undefined") return;
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { data: profile } = await supabase
      .from("profiles").select("onboarded").eq("id", user.id).maybeSingle();
    if (profile && !profile.onboarded) {
      throw redirect({ to: "/onboarding" });
    }
  },
  component: AppLayout,
});

function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;
      const { data } = await supabase.from("profiles").select("*").eq("id", user.id).maybeSingle();
      return data;
    },
  });

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/" });
  };

  const tabs = [
    { to: "/app", label: "Home", icon: Home, exact: true },
    { to: "/app/cycle", label: "Cycle", icon: CalendarDays },
    { to: "/app/assistant", label: "Lunara", icon: Sparkles },
    { to: "/app/settings", label: "You", icon: SettingsIcon },
  ];

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-0 md:pl-64">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col fixed inset-y-0 left-0 w-64 border-r border-border/60 bg-card/40 backdrop-blur p-6">
        <Link to="/app" className="flex items-center gap-2 mb-10">
          <span className="w-8 h-8 rounded-full bg-gradient-hero" />
          <span className="font-display text-xl">Lunara</span>
        </Link>
        <nav className="flex flex-col gap-1 flex-1">
          {tabs.map((t) => {
            const active = t.exact ? location.pathname === t.to : location.pathname.startsWith(t.to);
            return (
              <Link key={t.to} to={t.to}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-2xl text-sm transition ${active ? "bg-blush/30 text-foreground" : "text-muted-foreground hover:bg-secondary"}`}>
                <t.icon size={18} />{t.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-border/60 pt-4">
          <div className="px-2 mb-3">
            <p className="text-sm font-medium truncate">{profile?.display_name ?? "Welcome"}</p>
            <p className="text-xs text-muted-foreground">Logged in</p>
          </div>
          <button onClick={signOut} className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground px-2">
            <LogOut size={14} /> Sign out
          </button>
        </div>
      </aside>

      <main className="max-w-3xl mx-auto px-5 py-6 md:py-10">
        <Outlet />
      </main>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-50 border-t border-border/60 bg-card/90 backdrop-blur-xl">
        <div className="grid grid-cols-4 max-w-md mx-auto">
          {tabs.map((t) => {
            const active = t.exact ? location.pathname === t.to : location.pathname.startsWith(t.to);
            return (
              <Link key={t.to} to={t.to}
                className={`flex flex-col items-center gap-1 py-3 text-[10px] uppercase tracking-wider ${active ? "text-clay" : "text-muted-foreground"}`}>
                <t.icon size={20} />
                {t.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
