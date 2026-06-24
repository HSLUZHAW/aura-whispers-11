import { createFileRoute, Link } from "@tanstack/react-router";
import cycleImg from "@/assets/cycle.jpg";

export const Route = createFileRoute("/_public/cycle")({
  head: () => ({ meta: [{ title: "Cycle — Lunara" }] }),
  component: CyclePage,
});

const PHASES = [
  {
    name: "Menstrual",
    days: "Day 1–5",
    color: "bg-blush/40",
    dot: "bg-rose-300",
    tagline: "Soften. Restore. Turn inward.",
    body: "Estrogen and progesterone are at their lowest. The uterine lining sheds. Energy may be quieter, and that is not a flaw. This is the body asking for rest, warmth, and gentleness. Iron-rich foods, slow movement, and reduced demands on yourself are your medicine this week.",
    tips: ["Gentle yin yoga or a slow walk", "Iron-rich meals: lentils, dark greens, red meat", "Reduce caffeine and cold foods", "Prioritise sleep and heat"],
  },
  {
    name: "Follicular",
    days: "Day 6–13",
    color: "bg-sand/50",
    dot: "bg-amber-300",
    tagline: "Rise. Begin. Say yes.",
    body: "Estrogen climbs as a follicle matures in the ovary. The brain responds with sharper focus, higher motivation, and a greater appetite for novelty. This is your window for starting projects, making decisions, and taking on new challenges. Your body adapts fastest to new workouts during this phase.",
    tips: ["High-intensity exercise if it calls to you", "Start new creative projects", "Socialise and take on challenges", "Fermented foods to support estrogen"],
  },
  {
    name: "Ovulatory",
    days: "Day 14–16",
    color: "bg-clay/25",
    dot: "bg-orange-300",
    tagline: "Peak. Connect. Be seen.",
    body: "A surge of LH triggers ovulation — the release of an egg from the ovary. Estrogen peaks and testosterone briefly rises. Confidence, communication, and physical energy all tend to peak here. It is a natural window for important conversations, visibility, and high-output work.",
    tips: ["Schedule presentations, pitches, or difficult conversations", "High-energy workouts: HIIT, strength", "Hydration and cruciferous vegetables", "Your charisma is at its highest — use it"],
  },
  {
    name: "Luteal",
    days: "Day 17–28",
    color: "bg-lavender/40",
    dot: "bg-purple-300",
    tagline: "Nourish. Wind down. Go deeper.",
    body: "Progesterone rises and the body slows to prepare for a potential pregnancy. Energy becomes more inward. Creativity can deepen, detail work improves, but tolerance for noise, disruption, and demands may reduce. In the late luteal phase, PMS symptoms may arise as progesterone drops before the next period.",
    tips: ["Strength training over intense cardio", "Magnesium-rich foods: pumpkin seeds, dark chocolate", "Wind-down routines: dim light, no screens late", "Track symptoms — patterns matter"],
  },
];

const HORMONES = [
  { name: "Estrogen", role: "Energy, mood, bone health, and the first half of the cycle. Drives confidence, focus, and physical vitality.", peak: "Follicular & Ovulatory" },
  { name: "Progesterone", role: "The calming hormone. Rises after ovulation, prepares the uterine lining, and supports deep rest. Its drop triggers a period.", peak: "Luteal" },
  { name: "Testosterone", role: "Present in small amounts in women — drives libido, muscle strength, and assertive energy. Peaks briefly around ovulation.", peak: "Ovulatory" },
  { name: "FSH & LH", role: "Follicle-stimulating and luteinising hormones regulate ovulation. LH triggers the release of the egg at mid-cycle.", peak: "Mid-cycle" },
];

function CyclePage() {
  return (
    <main className="pt-24">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-aurora opacity-60 pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Cycle Syncing</span>
            <h1 className="font-display text-5xl md:text-6xl mt-3 mb-5 leading-tight">
              Live in tune with your four phases.
            </h1>
            <p className="text-muted-foreground text-lg mb-8 max-w-md leading-relaxed">
              Your cycle is not just a period. It is a monthly rhythm of four distinct hormonal phases, each one shaping how you feel, think, move, and create. Understanding them changes everything.
            </p>
            <Link to="/auth" className="inline-flex px-6 py-3.5 rounded-full bg-primary text-primary-foreground text-sm shadow-glow hover:opacity-90 transition">
              Track your cycle →
            </Link>
          </div>
          <div className="relative">
            <div className="absolute -inset-10 bg-gradient-aurora blur-3xl opacity-60 rounded-full" />
            <img src={cycleImg} alt="Four phases of the menstrual cycle" className="relative rounded-3xl shadow-soft w-full" width={1200} height={1200} loading="lazy" />
          </div>
        </div>
      </section>

      {/* Phases */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-2xl mb-14">
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">The Phases</span>
            <h2 className="font-display text-4xl md:text-5xl mt-3 mb-4">Four rhythms. One cycle.</h2>
            <p className="text-muted-foreground text-lg">Each phase has its own hormonal signature, energy, and intelligence. Here is what to expect.</p>
          </div>
          <div className="space-y-6">
            {PHASES.map((p) => (
              <div key={p.name} className={`rounded-3xl p-8 md:p-10 border border-border/40 ${p.color}`}>
                <div className="grid md:grid-cols-3 gap-8">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-3 h-3 rounded-full ${p.dot}`} />
                      <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{p.days}</span>
                    </div>
                    <h3 className="font-display text-3xl mb-2">{p.name}</h3>
                    <p className="text-sm text-clay italic">{p.tagline}</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-sm leading-relaxed text-foreground/80 mb-5">{p.body}</p>
                    <ul className="grid sm:grid-cols-2 gap-2">
                      {p.tips.map((t) => (
                        <li key={t} className="flex items-start gap-2 text-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-clay mt-1.5 flex-shrink-0" />
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hormones */}
      <section className="py-24 bg-secondary/40">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-2xl mb-14">
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Key Hormones</span>
            <h2 className="font-display text-4xl md:text-5xl mt-3 mb-4">The hormones behind the rhythm.</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {HORMONES.map((h) => (
              <div key={h.name} className="p-7 rounded-3xl bg-card border border-border/60">
                <div className="text-[10px] uppercase tracking-[0.2em] text-clay mb-2">{h.peak}</div>
                <h3 className="font-display text-2xl mb-3">{h.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{h.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-display text-4xl md:text-5xl mb-4">Ready to track yours?</h2>
          <p className="text-muted-foreground mb-8">Lunara maps your cycle, tracks your patterns, and gives you daily guidance synced to your hormones.</p>
          <Link to="/auth" className="inline-flex px-8 py-4 rounded-full bg-primary text-primary-foreground shadow-glow hover:opacity-90 transition text-sm">
            Start tracking for free →
          </Link>
        </div>
      </section>
    </main>
  );
}
