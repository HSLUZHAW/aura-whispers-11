const items = [
  {
    quote: "It's the first health app that feels like it was made by someone who actually listens.",
    name: "Maya, 27",
    role: "Designer",
  },
  {
    quote: "I finally understand why I feel the way I feel. It's like therapy meets biology.",
    name: "Léa, 31",
    role: "Founder",
  },
  {
    quote: "The AI is shockingly thoughtful. Calm, warm, never clinical.",
    name: "Sofia, 24",
    role: "Student",
  },
];

export function Testimonials() {
  return (
    <section className="py-28 bg-secondary/40">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-2xl mb-14">
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Loved early</span>
          <h2 className="text-4xl md:text-5xl mt-3">Words from our first community.</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {items.map((t) => (
            <figure key={t.name} className="p-7 rounded-3xl bg-card border border-border/60 flex flex-col">
              <blockquote className="font-display text-xl leading-snug text-foreground mb-6">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-auto flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-soft" />
                <div>
                  <div className="text-sm font-medium">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
