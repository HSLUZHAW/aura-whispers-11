import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import type { Article } from "@/lib/articles/en";
import { ARTICLES as EN_ARTICLES } from "@/lib/articles/en";
import { getArticlesForLang } from "@/lib/articles/index";
import { getLanguage, onLanguageChange } from "@/lib/language";

const DISCLAIMER_KEY = "lunara_library_disclaimer_accepted";

export function LibrarySection() {
  const [open, setOpen] = useState<string | null>(null);
  const [articles, setArticles] = useState<Article[]>(EN_ARTICLES);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState<string>("All");

  useEffect(() => {
    if (typeof window !== "undefined" && !localStorage.getItem(DISCLAIMER_KEY)) {
      setShowDisclaimer(true);
    }
  }, []);

  useEffect(() => {
    const load = async () => {
      const data = await getArticlesForLang(getLanguage());
      setArticles(data);
    };
    load();
    return onLanguageChange(() => { load(); });
  }, []);

  const acceptDisclaimer = () => {
    localStorage.setItem(DISCLAIMER_KEY, "1");
    setShowDisclaimer(false);
  };

  const tags = ["All", ...Array.from(new Set(articles.map((a) => a.tag)))];

  const filtered = articles.filter((a) => {
    const matchesTag = activeTag === "All" || a.tag === activeTag;
    const q = search.toLowerCase().trim();
    const matchesSearch =
      !q ||
      a.title.toLowerCase().includes(q) ||
      a.summary.toLowerCase().includes(q) ||
      a.tag.toLowerCase().includes(q);
    return matchesTag && matchesSearch;
  });

  const article = articles.find((a) => a.id === open);

  return (
    <>
      {/* Medical Disclaimer Modal */}
      {showDisclaimer && (
        <div
          style={{
            position: "fixed", inset: 0, zIndex: 200,
            background: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(6px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "24px",
          }}
        >
          <div
            style={{
              maxWidth: "480px", width: "100%",
              background: "var(--color-card)",
              borderRadius: "24px",
              padding: "32px 28px",
              display: "flex", flexDirection: "column", gap: "20px",
            }}
          >
            <div>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.2em", color: "var(--color-muted-foreground)", marginBottom: "8px" }}>
                Before you continue
              </p>
              <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "28px", fontWeight: 300, lineHeight: 1.2, color: "var(--color-foreground)" }}>
                Medical Disclaimer
              </h2>
            </div>

            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", lineHeight: 1.75, color: "var(--color-foreground)" }}>
              The health articles in this library are for <strong>general educational purposes only</strong>. They do not constitute medical advice, diagnosis, or treatment.
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", lineHeight: 1.75, color: "var(--color-foreground)" }}>
              Always consult a qualified healthcare professional for personal medical decisions. If you are experiencing a medical emergency, contact emergency services immediately.
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", lineHeight: 1.7, color: "var(--color-muted-foreground)" }}>
              This disclaimer applies in all jurisdictions, including Switzerland (CH), Germany (DE), and France (FR), in accordance with applicable medical device and health information regulations.
            </p>

            <button
              onClick={acceptDisclaimer}
              style={{
                padding: "14px 24px",
                borderRadius: "100px",
                background: "var(--color-foreground)",
                color: "var(--color-background)",
                fontFamily: "'Inter', sans-serif",
                fontSize: "13px",
                fontWeight: 500,
                border: "none",
                cursor: "pointer",
                letterSpacing: "0.02em",
              }}
            >
              I understand — continue to library
            </button>
          </div>
        </div>
      )}

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

          {/* Search */}
          <div style={{ position: "relative", maxWidth: "400px", marginBottom: "20px" }}>
            <input
              type="search"
              placeholder="Search articles…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 40px 10px 16px",
                borderRadius: "100px",
                border: "1px solid var(--color-border)",
                background: "var(--color-card)",
                fontFamily: "'Inter', sans-serif",
                fontSize: "13px",
                color: "var(--color-foreground)",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                style={{
                  position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)",
                  background: "none", border: "none", cursor: "pointer",
                  color: "var(--color-muted-foreground)", fontSize: "16px", lineHeight: 1, padding: 0,
                }}
              >
                ×
              </button>
            )}
          </div>

          {/* Tag filters */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "28px" }}>
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                style={{
                  padding: "6px 16px",
                  borderRadius: "100px",
                  border: `1px solid ${activeTag === tag ? "var(--color-foreground)" : "var(--color-border)"}`,
                  background: activeTag === tag ? "var(--color-foreground)" : "transparent",
                  color: activeTag === tag ? "var(--color-background)" : "var(--color-muted-foreground)",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "11px",
                  letterSpacing: "0.05em",
                  cursor: "pointer",
                  transition: "all 0.15s",
                }}
              >
                {tag}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 0", color: "var(--color-muted-foreground)", fontFamily: "'Inter', sans-serif", fontSize: "14px" }}>
              No articles found.{" "}
              <button
                onClick={() => { setSearch(""); setActiveTag("All"); }}
                style={{ background: "none", border: "none", cursor: "pointer", textDecoration: "underline", color: "inherit", fontFamily: "inherit", fontSize: "inherit" }}
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((a) => (
                <button
                  key={a.id}
                  onClick={() => setOpen(a.id)}
                  className="text-left p-6 rounded-3xl bg-card border border-border/60 hover:border-blush/60 hover:shadow-soft transition-all duration-300 flex flex-col gap-3 cursor-pointer"
                >
                  <span className="text-[9px] uppercase tracking-[0.15em] text-muted-foreground">{a.tag}</span>
                  <span className="font-display text-2xl leading-tight">{a.title}</span>
                  <span className="text-xs text-muted-foreground leading-relaxed line-clamp-3">{a.summary}</span>
                </button>
              ))}
            </div>
          )}

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
              <div style={{ width: "36px", height: "4px", borderRadius: "2px", background: "var(--color-border)", margin: "0 auto -8px" }} />

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
    </>
  );
}
