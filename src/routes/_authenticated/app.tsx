import { createFileRoute, Outlet, Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Home, BookOpen, MessageCircle, Settings, CalendarDays, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/app")({
  component: AppLayout,
});

const NAV = [
  { to: "/app/", icon: Home, label: "Home" },
  { to: "/app/cycle", icon: CalendarDays, label: "Cycle" },
  { to: "/app/chat", icon: MessageCircle, label: "Lunara", isAI: true },
  { to: "/app/library", icon: BookOpen, label: "Library" },
  { to: "/app/settings", icon: Settings, label: "Settings" },
] as const;

function AppLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const qc = useQueryClient();

  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;
      const { data } = await supabase
        .from("profiles")
        .select("display_name, onboarded")
        .eq("id", user.id)
        .maybeSingle();
      return data;
    },
  });

  const signOut = async () => {
    await supabase.auth.signOut();
    qc.clear();
    navigate({ to: "/" });
  };

  return (
    <div className="min-h-screen bg-background flex md:flex-row">

      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col fixed inset-y-0 left-0 w-56 border-r border-border/60 bg-card/50 backdrop-blur-sm z-40">
        <Link to="/app/" className="flex items-center gap-2.5 px-6 py-5 border-b border-border/40">
          <div className="w-7 h-7 rounded-full bg-gradient-hero shadow-soft flex-shrink-0" />
          <span className="font-display text-xl">Lunara</span>
        </Link>

        <nav className="flex flex-col gap-1 flex-1 px-3 py-4">
          {NAV.map(({ to, icon: Icon, label, isAI }) => {
            const active = to === "/app/"
              ? pathname === "/app" || pathname === "/app/"
              : pathname.startsWith(to);
            return (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-2xl text-sm transition-colors ${
                  active
                    ? "bg-blush/25 text-foreground font-medium"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                {isAI ? (
                  <div style={{
                    width: "18px", height: "18px", borderRadius: "50%", flexShrink: 0,
                    background: active
                      ? "radial-gradient(ellipse at 30% 30%, oklch(0.9 0.055 20 / 0.9), oklch(0.88 0.05 305 / 0.8) 60%, oklch(0.93 0.04 75 / 0.9))"
                      : "radial-gradient(ellipse at 30% 30%, oklch(0.9 0.055 20 / 0.5), oklch(0.88 0.05 305 / 0.4) 60%, oklch(0.93 0.04 75 / 0.5))",
                  }} />
                ) : (
                  <Icon size={17} strokeWidth={active ? 2 : 1.5} />
                )}
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="px-3 pb-5 border-t border-border/40 pt-4">
          <p className="text-xs text-muted-foreground px-3 mb-1 truncate">{profile?.display_name ?? "Welcome"}</p>
          <button
            onClick={signOut}
            className="flex items-center gap-2 px-3 py-2 rounded-2xl text-xs text-muted-foreground hover:bg-secondary hover:text-foreground w-full transition-colors"
          >
            <LogOut size={14} /> Sign out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 md:ml-56 max-w-full">
        <div className="max-w-2xl mx-auto px-5 pt-6 pb-28 md:pb-10 md:pt-10">
          <Outlet />
        </div>
      </main>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-card/90 backdrop-blur-md border-t border-border/60">
        <div className="flex items-center justify-around h-16 px-2 max-w-lg mx-auto">
          {NAV.map(({ to, icon: Icon, label, isAI }) => {
            const active = to === "/app/"
              ? pathname === "/app" || pathname === "/app/"
              : pathname.startsWith(to);
            return (
              <Link
                key={to}
                to={to}
                aria-label={label}
                className="flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-colors"
                style={{ color: active ? "var(--color-clay, #c9856a)" : "var(--color-muted-foreground)" }}
              >
                {isAI ? (
                  <div style={{
                    width: "22px", height: "22px", borderRadius: "50%",
                    background: active
                      ? "radial-gradient(ellipse at 30% 30%, oklch(0.9 0.055 20 / 0.9), oklch(0.88 0.05 305 / 0.8) 60%, oklch(0.93 0.04 75 / 0.9))"
                      : "radial-gradient(ellipse at 30% 30%, oklch(0.9 0.055 20 / 0.45), oklch(0.88 0.05 305 / 0.4) 60%, oklch(0.93 0.04 75 / 0.5))",
                    boxShadow: active ? "0 1px 8px oklch(0.82 0.045 305 / 0.35)" : "none",
                  }} />
                ) : (
                  <Icon size={20} strokeWidth={active ? 2 : 1.5} />
                )}
                <span style={{ fontSize: "9px", letterSpacing: "0.05em", fontFamily: "'Inter', sans-serif" }}>
                  {label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
