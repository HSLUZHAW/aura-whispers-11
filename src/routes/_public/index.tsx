import { createFileRoute, Link } from "@tanstack/react-router";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Faq } from "@/components/Faq";
import { Waitlist } from "@/components/Waitlist";

export const Route = createFileRoute("/_public/")({
  head: () => ({ meta: [{ title: "Lunara — Your Female Health OS" }] }),
  component: HomePage,
});

function HomePage() {
  return (
    <main>
      <Hero />

      {/* Quick nav to pages */}
      <section className="py-16 border-t border-border/40">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid sm:grid-cols-3 gap-4">
            <Link to="/cycle" className="group p-7 rounded-3xl bg-card border border-border/60 hover:border-blush/60 hover:shadow-soft transition-all duration-300 block">
              <div className="w-10 h-10 rounded-2xl bg-blush/40 mb-5 group-hover:scale-110 transition-transform" />
              <span className="text-[10px] uppercase tracking-[0.2em] text-clay">Cycle</span>
              <h3 className="font-display text-2xl mt-2 mb-2 leading-snug">Live in tune with your phases.</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">Understand the four phases and how they shape your energy, mood, and body.</p>
              <span className="mt-4 inline-block text-xs text-clay">Learn more →</span>
            </Link>

            <Link to="/ai" className="group p-7 rounded-3xl bg-card border border-border/60 hover:border-blush/60 hover:shadow-soft transition-all duration-300 block">
              <div className="w-10 h-10 rounded-full bg-gradient-hero mb-5 group-hover:scale-110 transition-transform shadow-soft" />
              <span className="text-[10px] uppercase tracking-[0.2em] text-clay">AI Companion</span>
              <h3 className="font-display text-2xl mt-2 mb-2 leading-snug">An assistant that listens first.</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">Ask anything about your cycle, hormones, mood, and wellbeing — calmly, without judgment.</p>
              <span className="mt-4 inline-block text-xs text-clay">Meet Lunara →</span>
            </Link>

            <Link to="/library" className="group p-7 rounded-3xl bg-card border border-border/60 hover:border-blush/60 hover:shadow-soft transition-all duration-300 block">
              <div className="w-10 h-10 rounded-2xl bg-sand/60 mb-5 group-hover:scale-110 transition-transform" />
              <span className="text-[10px] uppercase tracking-[0.2em] text-clay">Library</span>
              <h3 className="font-display text-2xl mt-2 mb-2 leading-snug">Know your body.</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">Reliable, calm information about hormones, conditions, and the topics that matter most to you.</p>
              <span className="mt-4 inline-block text-xs text-clay">Browse articles →</span>
            </Link>
          </div>
        </div>
      </section>

      <Features />
      <Faq />
      <Waitlist />
    </main>
  );
}
