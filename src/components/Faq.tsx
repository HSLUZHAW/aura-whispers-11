const faqs = [
  {
    q: "Is Lunara a medical app?",
    a: "No. Lunara is an educational and lifestyle companion. For any medical concern, please consult a qualified healthcare professional.",
  },
  {
    q: "Is my data private?",
    a: "Your data is encrypted and never sold. You control what's shared — including partner insights, which are fully optional.",
  },
  {
    q: "Does it work without a regular cycle?",
    a: "Yes. Lunara adapts to irregular cycles, hormonal contraception, PCOS, perimenopause and more.",
  },
  {
    q: "When is the app launching?",
    a: "We're rolling out access gradually. Join the waitlist for early invites and founding-member pricing.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="py-28">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">FAQ</span>
          <h2 className="text-4xl md:text-5xl mt-3">Questions, gently answered.</h2>
        </div>
        <div className="space-y-3">
          {faqs.map((f) => (
            <details
              key={f.q}
              className="group p-6 rounded-2xl bg-card border border-border/60 open:shadow-soft transition"
            >
              <summary className="cursor-pointer list-none flex items-center justify-between gap-4">
                <span className="font-display text-lg">{f.q}</span>
                <span className="text-clay text-xl group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="mt-3 text-muted-foreground text-sm leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
