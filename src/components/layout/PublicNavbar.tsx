import { Link, useRouterState } from "@tanstack/react-router";

const LINKS = [
  { to: "/cycle", label: "Cycle" },
  { to: "/ai", label: "Lunara AI" },
  { to: "/library", label: "Library" },
] as const;

export function PublicNavbar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-background/70 border-b border-border/40">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-gradient-hero shadow-soft" />
          <span className="font-display text-xl tracking-tight">Lunara</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {LINKS.map(({ to, label }) => {
            const active = pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                  active
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link to="/auth" className="text-sm text-muted-foreground hover:text-foreground transition hidden sm:inline">
            Sign in
          </Link>
          <Link
            to="/auth"
            className="text-sm px-4 py-2 rounded-full bg-primary text-primary-foreground hover:opacity-90 transition shadow-soft"
          >
            Get started
          </Link>
        </div>
      </div>

      {/* Mobile nav */}
      <div className="md:hidden border-t border-border/40 flex justify-around py-2 px-4">
        {LINKS.map(({ to, label }) => {
          const active = pathname === to;
          return (
            <Link
              key={to}
              to={to}
              className={`text-xs px-3 py-1.5 rounded-full transition-colors ${
                active ? "bg-secondary text-foreground" : "text-muted-foreground"
              }`}
            >
              {label}
            </Link>
          );
        })}
      </div>
    </header>
  );
}
