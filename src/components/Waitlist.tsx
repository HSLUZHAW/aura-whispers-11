import { useState, type FormEvent } from "react";

export function Waitlist() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <section id="waitlist" className="py-28">
      <div className="max-w-3xl mx-auto px-6">
        <div className="relative overflow-hidden rounded-[2.5rem] p-12 md:p-16 text-center bg-gradient-hero">
          <div className="absolute inset-0 bg-gradient-aurora opacity-70" />
          <div className="relative">
            <h2 className="text-4xl md:text-5xl mb-4 text-foreground">Begin the season of understanding.</h2>
            <p className="text-muted-foreground max-w-md mx-auto mb-8">
              Join the waitlist for early access and founding-member pricing.
            </p>

            {submitted ? (
              <p className="font-display italic text-xl text-clay">
                Thank you — we'll be in touch soon. 🌙
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 px-5 py-3.5 rounded-full bg-background/80 backdrop-blur border border-border/60 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <button
                  type="submit"
                  className="px-6 py-3.5 rounded-full bg-primary text-primary-foreground text-sm hover:scale-[1.02] transition shadow-glow"
                >
                  Join waitlist
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
