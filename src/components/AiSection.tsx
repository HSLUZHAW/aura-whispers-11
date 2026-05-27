import moodImg from "@/assets/mood.jpg";

const prompts = [
  "Why do I feel emotionally sensitive today?",
  "What workouts suit my current phase?",
  "How can I support my hormones naturally?",
  "Why am I craving sugar before my period?",
];

export function AiSection() {
  return (
    <section id="education" className="py-28">
      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">AI Companion</span>
          <h2 className="text-4xl md:text-5xl mt-3 mb-5">An assistant that listens first.</h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-md">
            Trained on women's health, not stereotypes. Lunara answers with
            empathy, science, and zero judgement.
          </p>

          <div className="space-y-3 p-5 rounded-3xl bg-card border border-border/60 shadow-soft">
            <div className="flex justify-end">
              <div className="max-w-[80%] px-4 py-2.5 rounded-2xl rounded-br-md bg-primary text-primary-foreground text-sm">
                Why am I so tired today?
              </div>
            </div>
            <div className="flex justify-start">
              <div className="max-w-[85%] px-4 py-2.5 rounded-2xl rounded-bl-md bg-secondary text-foreground text-sm leading-relaxed">
                You're in your late luteal phase — progesterone is dropping and
                your body is asking for rest. A magnesium-rich dinner and a
                slow walk could feel really good tonight. 🌙
              </div>
            </div>
            <div className="pt-3 border-t border-border/60">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">Try asking</p>
              <div className="flex flex-wrap gap-2">
                {prompts.map((p) => (
                  <button
                    key={p}
                    className="text-xs px-3 py-1.5 rounded-full bg-muted hover:bg-accent text-muted-foreground hover:text-foreground transition"
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-6 bg-gradient-hero blur-3xl opacity-40 rounded-full" />
          <img
            src={moodImg}
            alt="Soft abstract representing emotional balance"
            className="relative rounded-3xl shadow-glow w-full aspect-square object-cover"
            width={1200}
            height={1200}
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
