import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import type { Article } from "@/lib/articles/en";
import { ARTICLES as EN_ARTICLES } from "@/lib/articles/en";
import { getArticlesForLang } from "@/lib/articles/index";
import { getLanguage, onLanguageChange } from "@/lib/language";

export function LibrarySection() {
  const [open, setOpen] = useState<string | null>(null);
  const [articles, setArticles] = useState<Article[]>(EN_ARTICLES);

  useEffect(() => {
    const load = async () => {
      const data = await getArticlesForLang(getLanguage());
      setArticles(data);
    };
    load();
    return onLanguageChange(() => { load(); });
  }, []);

  const article = articles.find((a) => a.id === open);

  return (
    <section id="library" className="py-28">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-2xl mb-12">
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Health Library</span>
          <h2 className="text-4xl md:text-5xl mt-3 mb-4">Know your body.</h2>
          <p className="text-muted-foreground text-lg">
            Reliable, calm information about conditions and topics that matter —
            written without overwhelm.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {articles.map((a) => (
            <button
              key={a.id}
              onClick={() => setOpen(a.id)}
              className="text-left p-6 rounded-3xl bg-card border border-border/60 hover:border-blush/60 hover:shadow-soft transition-all duration-300 flex flex-col gap-3 cursor-pointer"
            >
              <span className="text-[9px] uppercase tracking-[0.15em] text-muted-foreground">{a.tag}</span>
              <span className="font-display text-2xl leading-tight">{a.title}</span>
              <span className="text-xs text-muted-foreground leading-relaxed">{a.summary}</span>
            </button>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/auth"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border/60 text-sm text-muted-foreground hover:text-foreground hover:border-blush/60 transition"
          >
            Sign in to access the full library →
          </Link>
        </div>
      </div>

      {open && article && (
        <div
          onClick={() => setOpen(null)}
          style={{
            position: "fixed", inset: 0, zIndex: 100,
            background: "rgba(0,0,0,0.35)",
            backdropFilter: "blur(4px)",
            display: "flex", alignItems: "flex-end", justifyContent: "center",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: "680px",
              maxHeight: "85dvh",
              overflowY: "auto",
              background: "var(--color-card)",
              borderRadius: "24px 24px 0 0",
              padding: "28px 24px 40px",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--color-muted-foreground)", marginBottom: "4px" }}>
                  {article.tag}
                </p>
                <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "32px", fontWeight: 300, color: "var(--color-foreground)", lineHeight: 1.1 }}>
                  {article.title}
                </h2>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "var(--color-muted-foreground)", marginTop: "2px" }}>
                  {article.subtitle}
                </p>
              </div>
              <button
                onClick={() => setOpen(null)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-muted-foreground)", fontSize: "20px", lineHeight: 1, padding: "4px" }}
              >
                ×
              </button>
            </div>

            <div style={{ height: "0.5px", background: "var(--color-border)" }} />

            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", lineHeight: "1.75", color: "var(--color-foreground)", whiteSpace: "pre-line" }}>
              {article.body}
            </div>

            {article.questions && article.questions.length > 0 && (
              <div style={{ padding: "16px 18px", borderRadius: "16px", background: "var(--color-background)", border: "0.5px solid var(--color-border)" }}>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--color-muted-foreground)", marginBottom: "10px" }}>
                  Questions for your doctor
                </p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
                  {article.questions.map((q, i) => (
                    <li key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                      <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "var(--color-muted-foreground)", flexShrink: 0, marginTop: "6px" }} />
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "var(--color-foreground)", lineHeight: 1.6 }}>{q}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div style={{ padding: "14px 16px", borderRadius: "14px", background: "var(--color-background)", border: "0.5px solid var(--color-border)" }}>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "var(--color-muted-foreground)", lineHeight: 1.6 }}>
                This information is for general education only. It does not replace the advice of a qualified healthcare professional.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
