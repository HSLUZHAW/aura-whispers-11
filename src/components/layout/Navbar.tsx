import { Link } from "@tanstack/react-router";

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm bg-background/80 border-b border-border/60">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition">
          <div className="w-8 h-8 rounded-full bg-gradient-hero shadow-soft" />
          <span className="font-display text-xl font-semibold">Lunara</span>
        </Link>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition">
            Features
          </a>
          <a href="#cycle" className="text-sm text-muted-foreground hover:text-foreground transition">
            Cycle
          </a>
          <a href="#education" className="text-sm text-muted-foreground hover:text-foreground transition">
            Hormones
          </a>
          <a href="#faq" className="text-sm text-muted-foreground hover:text-foreground transition">
            FAQ
          </a>
        </nav>

        {/* Auth Buttons */}
        <div className="flex items-center gap-3">
          <Link
            to="/auth"
            className="text-sm text-muted-foreground hover:text-foreground transition"
          >
            Sign in
          </Link>
          <Link
            to="/auth"
            className="px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition shadow-soft"
          >
            Get started
          </Link>
        </div>
      </div>
    </header>
  );
}
