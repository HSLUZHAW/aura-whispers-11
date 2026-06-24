import { createFileRoute, Link } from "@tanstack/react-router";
import { LibrarySection } from "@/components/LibrarySection";

export const Route = createFileRoute("/_public/library")({
  head: () => ({ meta: [{ title: "Health Library — Lunara" }] }),
  component: LibraryPage,
});

function LibraryPage() {
  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="relative py-16 overflow-hidden border-b border-border/40">
        <div className="absolute inset-0 bg-gradient-aurora opacity-50 pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-6">
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Health Library</span>
          <h1 className="font-display text-5xl md:text-6xl mt-3 mb-4 leading-tight">Know your body.</h1>
          <p className="text-muted-foreground text-lg max-w-xl leading-relaxed">
            67 calm, researched articles on hormones, conditions, life stages, and the topics that matter most — written without alarm, designed to empower.
          </p>
        </div>
      </section>

      <LibrarySection />

      {/* App CTA */}
      <section className="py-16 border-t border-border/40">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-display text-3xl mb-3">Want the full experience?</h2>
          <p className="text-muted-foreground mb-6 text-sm">Sign in to access all articles, save your favourites, and get daily reading synced to your cycle phase.</p>
          <Link to="/auth" className="inline-flex px-6 py-3 rounded-full bg-primary text-primary-foreground text-sm shadow-glow hover:opacity-90 transition">
            Sign in to the app →
          </Link>
        </div>
      </section>
    </main>
  );
}
