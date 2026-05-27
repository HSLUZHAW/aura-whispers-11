export function Footer() {
  return (
    <footer className="border-t border-border/60 py-12">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row gap-6 items-center justify-between text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-gradient-hero" />
          <span className="font-display text-lg text-foreground">Lunara</span>
        </div>
        <p>© {new Date().getFullYear()} Lunara. Made with care.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-foreground transition">Privacy</a>
          <a href="#" className="hover:text-foreground transition">Terms</a>
          <a href="#" className="hover:text-foreground transition">Contact</a>
        </div>
      </div>
    </footer>
  );
}
