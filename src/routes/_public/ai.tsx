import { createFileRoute, Link } from "@tanstack/react-router";
import moodImg from "@/assets/mood.jpg";

export const Route = createFileRoute("/_public/ai")({
  head: () => ({ meta: [{ title: "Lunara AI — Your Health Companion" }] }),
  component: AiPage,
});

const EXAMPLES = [
  {
    q: "Why am I so tired this week?",
    a: "You are in your late luteal phase — progesterone is dropping and your body is preparing for your period. This kind of fatigue is physiological, not a sign of weakness. A magnesium-rich dinner and an early evening could feel really good tonight.",
  },
  {
    q: "Why do I feel so confident today?",
    a: "You are approaching ovulation. Estrogen is at its peak and testosterone has a brief rise — both contribute to that clarity and confidence you feel. It is a good day for conversations you have been putting off.",
  },
  {
    q: "Is it normal to crave chocolate before my period?",
    a: "Very. In the luteal phase, serotonin dips and your body craves magnesium — which dark chocolate happens to contain. It is not just a craving, it is your body communicating. A small amount of good dark chocolate is genuinely supportive.",
  },
];

const FEATURES = [
  { title: "Cycle-aware answers", body: "Lunara knows where you are in your cycle and adjusts her responses accordingly. No generic advice — only what's relevant to your phase, today." },
  { title: "Empathy before advice", body: "She validates how you feel before offering anything. If you need to vent, she listens. If you need guidance, she provides it warmly and clearly." },
  { title: "Science-backed, never alarmist", body: "Every response is grounded in women's health research. She never diagnoses, never catastrophises, and always knows when to suggest seeing a doctor." },
  { title: "Remembers your context", body: "Your conversations are saved. Lunara can refer back to what you've shared — so you don't have to start from scratch every time." },
  { title: "Speaks your language", body: "Write in English, German, or French — Lunara responds in whatever language you use. No switching required." },
  { title: "Private by design", body: "Your conversations are encrypted and never used to train models. What you share with Lunara stays with you." },
];

function AiPage() {
  return (
    <main className="pt-24">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-aurora opacity-60 pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">AI Companion</span>
            <h1 className="font-display text-5xl md:text-6xl mt-3 mb-5 leading-tight">
              An assistant that<br /><span className="italic text-clay">listens first.</span>
            </h1>
            <p className="text-muted-foreground text-lg mb-8 max-w-md leading-relaxed">
              Lunara is trained on women's health, not stereotypes. She answers with empathy, science, and zero judgement — and she knows where you are in your cycle before you even explain.
            </p>
            <Link to="/auth" className="inline-flex px-6 py-3.5 rounded-full bg-primary text-primary-foreground text-sm shadow-glow hover:opacity-90 transition">
              Talk to Lunara →
            </Link>
          </div>

          {/* Chat preview */}
          <div className="space-y-3 p-6 rounded-3xl bg-card border border-border/60 shadow-soft">
            <div className="flex items-center gap-3 pb-4 border-b border-border/60">
              <div className="w-8 h-8 rounded-full flex-shrink-0" style={{
                background: "radial-gradient(ellipse at 30% 30%, oklch(0.9 0.055 20 / 0.9), oklch(0.88 0.05 305 / 0.8) 60%, oklch(0.93 0.04 75 / 0.9))",
                boxShadow: "0 2px 12px oklch(0.82 0.045 305 / 0.3)",
              }} />
              <div>
                <p className="text-sm font-medium">Lunara</p>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  <span className="text-xs text-muted-foreground">Here for you</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <div className="max-w-[80%] px-4 py-2.5 rounded-2xl rounded-br-md bg-primary text-primary-foreground text-sm">
                Why am I so tired this week?
              </div>
            </div>
            <div className="flex justify-start">
              <div className="max-w-[85%] px-4 py-2.5 rounded-2xl rounded-bl-md bg-secondary text-foreground text-sm leading-relaxed">
                You are in your late luteal phase — progesterone is dropping and your body is asking for rest. This fatigue is real and physiological. A magnesium-rich dinner and an early evening could feel really good tonight. 🌙
              </div>
            </div>

            <div className="pt-3 border-t border-border/60">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">Try asking</p>
              <div className="flex flex-wrap gap-2">
                {["Why do I feel so sensitive?", "What should I eat today?", "Why am I craving sugar?"].map((p) => (
                  <span key={p} className="text-xs px-3 py-1.5 rounded-full bg-muted text-muted-foreground">
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Conversation examples */}
      <section className="py-24 bg-secondary/40">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-2xl mb-14">
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Real Conversations</span>
            <h2 className="font-display text-4xl md:text-5xl mt-3 mb-4">What it actually feels like.</h2>
            <p className="text-muted-foreground text-lg">Lunara responds the way a knowledgeable friend would — calm, honest, and grounded in your cycle.</p>
          </div>
          <div className="space-y-5">
            {EXAMPLES.map((ex) => (
              <div key={ex.q} className="p-7 rounded-3xl bg-card border border-border/60">
                <div className="flex justify-end mb-3">
                  <div className="max-w-xl px-4 py-2.5 rounded-2xl rounded-br-md bg-primary text-primary-foreground text-sm">
                    {ex.q}
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="max-w-xl px-4 py-2.5 rounded-2xl rounded-bl-md bg-secondary text-foreground text-sm leading-relaxed">
                    {ex.a}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-2xl mb-14">
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">How It Works</span>
            <h2 className="font-display text-4xl md:text-5xl mt-3 mb-4">Built differently.</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURES.map((f) => (
              <div key={f.title} className="p-7 rounded-3xl bg-card border border-border/60">
                <div className="w-8 h-8 rounded-full bg-gradient-hero mb-5 shadow-soft" />
                <h3 className="font-display text-xl mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Image + CTA */}
      <section className="py-24 bg-secondary/40">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-14 items-center">
          <div className="relative">
            <div className="absolute -inset-6 bg-gradient-hero blur-3xl opacity-40 rounded-full" />
            <img src={moodImg} alt="Calm abstract representing emotional balance" className="relative rounded-3xl shadow-glow w-full aspect-square object-cover" width={1200} height={1200} loading="lazy" />
          </div>
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Get started</span>
            <h2 className="font-display text-4xl md:text-5xl mt-3 mb-5 leading-tight">Ready to have a different kind of conversation?</h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Lunara is available any time, in your language, with context about your cycle. No appointment, no waitlist, no judgment.
            </p>
            <Link to="/auth" className="inline-flex px-8 py-4 rounded-full bg-primary text-primary-foreground shadow-glow hover:opacity-90 transition text-sm">
              Start talking to Lunara →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
