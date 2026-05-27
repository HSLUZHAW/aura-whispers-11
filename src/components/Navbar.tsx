import { Link } from "@tanstack/react-router";

export function Navbar() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-background/70 border-b border-border/40">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-gradient-hero shadow-soft" />
          <span className="font-display text-xl tracking-tight">Lunara</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#features" className="hover:text-foreground transition">Features</a>
          <a href="#cycle" className="hover:text-foreground transition">Cycle</a>
          <a href="#education" className="hover:text-foreground transition">Hormones</a>
          <a href="#faq" className="hover:text-foreground transition">FAQ</a>
        </nav>
        <a
          href="#waitlist"
          className="text-sm px-4 py-2 rounded-full bg-primary text-primary-foreground hover:opacity-90 transition shadow-soft"
        >
          Join waitlist
        </a>
      </div>
    </header>
  );
}
