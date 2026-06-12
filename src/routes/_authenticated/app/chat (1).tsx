import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { getCycleInfo } from "@/lib/cycle";

export const Route = createFileRoute("/_authenticated/app/chat")({
  head: () => ({ meta: [{ title: "Lunara — Chat" }] }),
  component: ChatPage,
});

const SYSTEM_PROMPT =
  "You are Lunara, a warm and knowledgeable AI companion specialising exclusively in women's health, hormones, the menstrual cycle, emotional wellbeing, and lifestyle topics related to female health. You speak in a calm, empathetic, and human tone. You never use em dashes. You write in clear, warm prose without bullet point lists unless absolutely necessary. You never sound clinical or robotic. If someone asks something outside your area such as mathematics, coding, politics, or anything unrelated to women's health, respond warmly: That is a little outside my world. I am here for everything around your cycle, hormones, mood, and wellbeing. What would you like to explore there? You never diagnose. You never recommend specific medications by name. You always encourage speaking with a healthcare professional for personal medical decisions.";

const SUGGESTIONS = [
  "What foods help with PMS?",
  "How long does it last?",
  "Is this PMDD?",
];

type Msg = {
  role: "user" | "assistant";
  content: string;
  time: string;
};

function nowTime() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function buildGreeting(phase: string | null | undefined): string {
  const h = new Date().getHours();
  const tod = h < 12 ? "morning" : h < 17 ? "afternoon" : "evening";
  if (phase) {
    return `Good ${tod}. You are in your ${phase.toLowerCase()} phase today. What is on your mind?`;
  }
  return `Good ${tod}. I am here for everything around your cycle, hormones, mood, and wellbeing. What is on your mind?`;
}

function LunaraText({ content }: { content: string }) {
  const spaceIdx = content.indexOf(" ");
  if (spaceIdx === -1) {
    return (
      <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: "italic", fontWeight: 300, fontSize: "13px" }}>
        {content}
      </span>
    );
  }
  const first = content.slice(0, spaceIdx);
  const rest = content.slice(spaceIdx);
  return (
    <span>
      <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: "italic", fontWeight: 300, fontSize: "13px" }}>
        {first}
      </span>
      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", lineHeight: "1.6" }}>{rest}</span>
    </span>
  );
}

function TypingIndicator() {
  return (
    <div style={{ display: "flex", justifyContent: "flex-start" }}>
      <div>
        <div style={{
          background: "#ffffff",
          border: "0.5px solid var(--color-border)",
          borderRadius: "18px",
          borderBottomLeftRadius: "5px",
          padding: "12px 16px",
          display: "flex",
          alignItems: "center",
          gap: "5px",
        }}>
          {[0, 1, 2].map((i) => (
            <span key={i} style={{
              width: "4px", height: "4px", borderRadius: "50%",
              background: "var(--color-muted-foreground)",
              display: "inline-block",
              animation: `lunaraTyping 1.2s ease-in-out infinite`,
              animationDelay: `${i * 0.2}s`,
            }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ChatPage() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const greetingAdded = useRef(false);

  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;
      const { data } = await supabase.from("profiles").select("*").eq("id", user.id).maybeSingle();
      return data;
    },
  });

  useEffect(() => {
    if (greetingAdded.current) return;
    if (profile === undefined) return;
    greetingAdded.current = true;
    const cycle = profile
      ? getCycleInfo(profile.last_period_date, profile.cycle_length ?? 28, profile.period_length ?? 5)
      : null;
    setMessages([{ role: "assistant", content: buildGreeting(cycle?.phase), time: nowTime() }]);
  }, [profile]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const send = useCallback(async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;
    const userMsg: Msg = { role: "user", content: trimmed, time: nowTime() };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setShowSuggestions(false);
    setLoading(true);
    try {
      const key = import.meta.env.VITE_ANTHROPIC_API_KEY;
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": key,
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: next.map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      if (!res.ok) throw new Error();
      const json = await res.json();
      const reply = json.content?.[0]?.text ?? "Something went quiet on my end. Give me a moment and try again.";
      setMessages((m) => [...m, { role: "assistant", content: reply, time: nowTime() }]);
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "Something went quiet on my end. Give me a moment and try again.", time: nowTime() },
      ]);
    } finally {
      setLoading(false);
    }
  }, [messages, loading]);

  return (
    <>
      <style>{`
        @keyframes lunaraTyping {
          0%, 60%, 100% { opacity: 0.25; transform: scale(0.8); }
          30% { opacity: 1; transform: scale(1); }
        }
      `}</style>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "-24px -20px",
          height: "calc(100dvh - 60px)",
        }}
        className="md:m-0 md:h-[calc(100dvh-40px)]"
      >
        {/* Header */}
        <div style={{
          flexShrink: 0,
          padding: "16px 20px 14px",
          borderBottom: "0.5px solid var(--color-border)",
          background: "var(--color-card)",
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}>
          <div style={{
            width: "34px", height: "34px", borderRadius: "50%", flexShrink: 0,
            background: "radial-gradient(ellipse at 30% 30%, oklch(0.9 0.055 20 / 0.7), oklch(0.88 0.05 305 / 0.6) 60%, oklch(0.93 0.04 75 / 0.8))",
            boxShadow: "0 2px 12px oklch(0.82 0.045 305 / 0.3)",
          }} />
          <div>
            <div style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "20px",
              fontWeight: 300,
              letterSpacing: "0.01em",
              color: "var(--color-foreground)",
              lineHeight: 1.2,
            }}>
              Lunara
            </div>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              marginTop: "2px",
            }}>
              <div style={{
                width: "5px", height: "5px", borderRadius: "50%",
                background: "#4ade80",
                flexShrink: 0,
              }} />
              <span style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "10px",
                color: "var(--color-muted-foreground)",
              }}>
                Here for you
              </span>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div
          ref={scrollRef}
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "16px 20px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            background: "var(--color-background)",
          }}
        >
          <div style={{ flex: 1 }} />

          {messages.map((msg, i) => {
            const isUser = msg.role === "user";
            return (
              <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: isUser ? "flex-end" : "flex-start" }}>
                <div style={{
                  maxWidth: "82%",
                  padding: "10px 14px",
                  borderRadius: "18px",
                  borderBottomRightRadius: isUser ? "5px" : "18px",
                  borderBottomLeftRadius: isUser ? "18px" : "5px",
                  background: isUser ? "var(--color-primary)" : "#ffffff",
                  border: isUser ? "none" : "0.5px solid var(--color-border)",
                  color: isUser ? "#f5f0eb" : "var(--color-foreground)",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "12px",
                  lineHeight: "1.6",
                  wordBreak: "break-word",
                  whiteSpace: "pre-wrap",
                }}>
                  {isUser ? msg.content : <LunaraText content={msg.content} />}
                </div>
                <div style={{
                  fontSize: "9px",
                  color: "var(--color-muted-foreground)",
                  marginTop: "3px",
                  fontFamily: "'Inter', sans-serif",
                  paddingLeft: isUser ? 0 : "2px",
                  paddingRight: isUser ? "2px" : 0,
                }}>
                  {msg.time}
                </div>
              </div>
            );
          })}

          {loading && <TypingIndicator />}
        </div>

        {/* Quick suggestions */}
        {showSuggestions && messages.length > 0 && (
          <div style={{
            flexShrink: 0,
            padding: "0 20px 10px",
            display: "flex",
            gap: "6px",
            flexWrap: "wrap",
            background: "var(--color-background)",
          }}>
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                style={{
                  padding: "5px 12px",
                  borderRadius: "999px",
                  border: "0.5px solid var(--color-border)",
                  background: "var(--color-background)",
                  color: "var(--color-muted-foreground)",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "10px",
                  cursor: "pointer",
                  transition: "border-color 0.15s, color 0.15s",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--color-clay)";
                  (e.currentTarget as HTMLButtonElement).style.color = "var(--color-foreground)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--color-border)";
                  (e.currentTarget as HTMLButtonElement).style.color = "var(--color-muted-foreground)";
                }}
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Input row */}
        <div style={{
          flexShrink: 0,
          padding: "10px 20px 14px",
          borderTop: "0.5px solid var(--color-border)",
          background: "var(--color-card)",
          display: "flex",
          gap: "10px",
          alignItems: "center",
        }}>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input); }
            }}
            placeholder="Ask Lunara anything..."
            disabled={loading}
            style={{
              flex: 1,
              padding: "9px 14px",
              borderRadius: "999px",
              border: "0.5px solid var(--color-input)",
              background: "var(--color-background)",
              color: "var(--color-foreground)",
              fontFamily: "'Inter', sans-serif",
              fontSize: "12px",
              outline: "none",
              transition: "border-color 0.15s",
              minWidth: 0,
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "var(--color-ring)")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "var(--color-input)")}
          />
          <button
            onClick={() => send(input)}
            disabled={!input.trim() || loading}
            style={{
              width: "36px", height: "36px", borderRadius: "50%", border: "none",
              background: "var(--color-primary)",
              color: "var(--color-primary-foreground)",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
              cursor: "pointer",
              transition: "opacity 0.15s",
              opacity: !input.trim() || loading ? 0.4 : 1,
            }}
            aria-label="Send message"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 11V3M7 3L3.5 6.5M7 3L10.5 6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
