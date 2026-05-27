import heroImg from "@/assets/hero.jpg";

export function Hero() {
  return (
    <section className="relative pt-32 pb-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-aurora opacity-80 pointer-events-none" />
      <div className="relative max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-blush" />
            A new kind of health companion
          </span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl leading-[1.05] text-foreground mb-6">
            Your hormones,<br />
            <span className="italic text-clay">understood.</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-lg mb-8 leading-relaxed">
            Lunara is the AI-powered Female Health OS — cycle, mood, hormones,
            and lifestyle in one calm, intelligent space designed for the way
            you actually live.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#waitlist"
              className="px-6 py-3.5 rounded-full bg-primary text-primary-foreground shadow-glow hover:scale-[1.02] transition text-sm"
            >
              Join the waitlist
            </a>
            <a
              href="#features"
              className="px-6 py-3.5 rounded-full bg-card border border-border hover:bg-secondary transition text-sm"
            >
              Explore the app
            </a>
          </div>
          <div className="mt-10 flex items-center gap-6 text-xs text-muted-foreground">
            <div>
              <div className="font-display text-2xl text-foreground">12k+</div>
              waitlist
            </div>
            <div className="w-px h-8 bg-border" />
            <div>
              <div className="font-display text-2xl text-foreground">4.9</div>
              early rating
            </div>
            <div className="w-px h-8 bg-border" />
            <div>
              <div className="font-display text-2xl text-foreground">100%</div>
              private
            </div>
          </div>
        </div>

        <div className="relative animate-float-slow">
          <div className="absolute -inset-8 bg-gradient-hero blur-3xl opacity-50 rounded-full" />
          <div className="relative rounded-3xl overflow-hidden shadow-glow border border-border/50 aspect-[4/5]">
            <img
              src={heroImg}
              alt="Calming abstract gradient representing cycle awareness"
              className="w-full h-full object-cover"
              width={1600}
              height={1280}
            />
            <div className="absolute bottom-6 left-6 right-6 backdrop-blur-xl bg-background/70 rounded-2xl p-4 border border-border/50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase tracking-wider text-muted-foreground">Today · Day 14</span>
                <span className="text-xs text-clay">Ovulatory</span>
              </div>
              <p className="text-sm text-foreground leading-snug">
                Energy peaks today — a beautiful window for connection and creative work.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
