import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import type { Article } from "@/lib/articles/en";
import { ARTICLES as EN_ARTICLES } from "@/lib/articles/en";
import { getArticlesForLang } from "@/lib/articles/index";
import { getLanguage, onLanguageChange } from "@/lib/language";

export const Route = createFileRoute("/_authenticated/app/library")({
  head: () => ({ meta: [{ title: "Health Library — Lunara" }] }),
  component: LibraryPage,
});

function LibraryPage() {
  const [articles, setArticles] = useState<Article[]>(EN_ARTICLES);

  useEffect(() => {
    const load = async () => {
      const lang = getLanguage();
      const data = await getArticlesForLang(lang);
      setArticles(data);
    };
    load();
    return onLanguageChange(() => { load(); });
  }, []);
  const [open, setOpen] = useState<string | null>(null);
  const article = articles.find((a) => a.id === open);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px", paddingBottom: "8px" }}>

      <div>
        <p style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.2em", color: "var(--color-muted-foreground)", fontFamily: "'Inter', sans-serif" }}>
          Knowledge
        </p>
        <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "28px", fontWeight: 300, color: "var(--color-foreground)", marginTop: "2px", lineHeight: 1.2 }}>
          Health Library
        </h1>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "var(--color-muted-foreground)", marginTop: "6px", lineHeight: 1.6 }}>
          Reliable, calm information about conditions and topics that matter to you.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
        {articles.map((a) => (
          <button
            key={a.id}
            onClick={() => setOpen(a.id)}
            style={{
              textAlign: "left",
              padding: "18px 16px",
              borderRadius: "20px",
              background: "var(--color-card)",
              border: "0.5px solid var(--color-border)",
              cursor: "pointer",
              transition: "border-color 0.15s",
              display: "flex",
              flexDirection: "column",
              gap: "6px",
            }}
          >
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--color-muted-foreground)" }}>
              {a.tag}
            </span>
            <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "20px", fontWeight: 300, color: "var(--color-foreground)", lineHeight: 1.2 }}>
              {a.title}
            </span>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "var(--color-muted-foreground)", lineHeight: 1.5 }}>
              {a.summary}
            </span>
          </button>
        ))}
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
                style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-muted-foreground)", fontSize: "20px", lineHeight: 1, padding: "4px", flexShrink: 0 }}
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
                This information is for general education only. It does not replace the advice of a qualified healthcare professional. Please speak with your doctor or specialist for personal medical guidance.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
