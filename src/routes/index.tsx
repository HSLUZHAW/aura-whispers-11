import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { CycleSection } from "@/components/CycleSection";
import { AiSection } from "@/components/AiSection";
import { Testimonials } from "@/components/Testimonials";
import { Faq } from "@/components/Faq";
import { Waitlist } from "@/components/Waitlist";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lunara — Your Female Health OS" },
      {
        name: "description",
        content:
          "AI-powered cycle, hormone and emotional wellbeing companion. A calm, intelligent home for women's health.",
      },
      { property: "og:title", content: "Lunara — Your Female Health OS" },
      {
        property: "og:description",
        content:
          "Cycle, mood, hormones and lifestyle in one calm, intelligent space.",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..600;1,9..144,300..500&family=Inter:wght@300..600&display=swap",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <CycleSection />
        <AiSection />
        <Testimonials />
        <Faq />
        <Waitlist />
      </main>
      <Footer />
    </div>
  );
}
