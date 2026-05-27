const features = [
  {
    eyebrow: "Cycle",
    title: "Cycle awareness that learns you",
    body: "Track period, mood, energy, libido, sleep and skin — and watch patterns surface over time.",
  },
  {
    eyebrow: "AI Insight",
    title: "An assistant that actually gets it",
    body: "Ask anything from cravings to PMS. Empathetic, educational, never prescriptive.",
  },
  {
    eyebrow: "Hormones",
    title: "Hormone literacy, made calm",
    body: "Estrogen, progesterone, cortisol, oxytocin — clear, beautiful, science-backed.",
  },
  {
    eyebrow: "Wellbeing",
    title: "Personalized to your phase",
    body: "Food, movement, recovery and mindfulness — synced to where you are right now.",
  },
  {
    eyebrow: "Together",
    title: "Partner mode, on your terms",
    body: "Share simple, respectful insights so the people you love can support you better.",
  },
  {
    eyebrow: "Analytics",
    title: "Patterns over noise",
    body: "Soft, intelligent visualizations of mood, energy, sleep and cycle consistency.",
  },
];

export function Features() {
  return (
    <section id="features" className="py-28 relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-2xl mb-16">
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Features</span>
          <h2 className="text-4xl md:text-5xl mt-3 mb-4">A holistic Female Health OS.</h2>
          <p className="text-muted-foreground text-lg">
            Not another period tracker. A complete, emotionally intelligent home
            for your cycle, hormones, mood and lifestyle.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <article
              key={f.title}
              className="group p-7 rounded-3xl bg-card border border-border/60 hover:border-blush/60 hover:shadow-soft transition-all duration-500"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="w-10 h-10 rounded-2xl bg-gradient-soft mb-6 group-hover:scale-110 transition-transform" />
              <span className="text-[10px] uppercase tracking-[0.2em] text-clay">{f.eyebrow}</span>
              <h3 className="text-xl mt-2 mb-3 leading-snug">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
