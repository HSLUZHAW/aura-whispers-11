import cycleImg from "@/assets/cycle.jpg";

const phases = [
  { name: "Menstrual", days: "Day 1–5", note: "Rest, reflect, gentle movement.", color: "bg-blush/40" },
  { name: "Follicular", days: "Day 6–13", note: "Rising energy, new ideas, strength.", color: "bg-sand/60" },
  { name: "Ovulatory", days: "Day 14–16", note: "Peak energy, connection, confidence.", color: "bg-clay/30" },
  { name: "Luteal", days: "Day 17–28", note: "Wind down, nourish, slow productivity.", color: "bg-lavender/40" },
];

export function CycleSection() {
  return (
    <section id="cycle" className="py-28 bg-secondary/40">
      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <div className="relative order-2 lg:order-1">
          <div className="absolute -inset-10 bg-gradient-aurora blur-3xl opacity-60 rounded-full" />
          <img
            src={cycleImg}
            alt="Four phases of the menstrual cycle"
            className="relative rounded-3xl shadow-soft w-full"
            width={1200}
            height={1200}
            loading="lazy"
          />
        </div>
        <div className="order-1 lg:order-2">
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Cycle Syncing</span>
          <h2 className="text-4xl md:text-5xl mt-3 mb-5">Live in tune with your four phases.</h2>
          <p className="text-muted-foreground text-lg mb-10 max-w-md">
            Lunara maps the rhythm of your hormones to gentle, personalized
            guidance — so every day feels less like a mystery.
          </p>
          <div className="space-y-3">
            {phases.map((p) => (
              <div key={p.name} className="flex items-center gap-4 p-4 rounded-2xl bg-card border border-border/60">
                <div className={`w-10 h-10 rounded-full ${p.color} shadow-soft`} />
                <div className="flex-1">
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-base font-medium">{p.name}</h3>
                    <span className="text-xs text-muted-foreground">{p.days}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{p.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
