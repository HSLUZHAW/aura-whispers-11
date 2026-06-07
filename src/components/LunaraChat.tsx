import { useState, useRef, useEffect, useCallback } from "react";

const SYSTEM_PROMPT = `You are Lunara, a warm and knowledgeable AI companion specialising exclusively in women's health, hormones, the menstrual cycle, emotional wellbeing, and lifestyle topics related to female health. You speak in a calm, empathetic, and human tone. You never use em dashes. You write in clear, warm prose without bullet point lists unless absolutely necessary. You never sound clinical or robotic.

If someone asks you something outside your area of expertise such as mathematics, coding, politics, sports, recipes, travel, or anything unrelated to women's health and wellbeing, respond warmly but clearly: 'That is a little outside my world. I am here for everything around your cycle, hormones, mood, and wellbeing. What would you like to explore there?'

You can answer questions about: menstrual cycles and phases, PMS and PMDD, PCOS, endometriosis, adenomyosis, uterine fibroids, perimenopause and menopause, thyroid health in women, hormonal contraception and its effects, fertility awareness, emotional health across the cycle, how partners can better support women, nutrition and movement in relation to hormones, sleep and stress in relation to the cycle, and general wellbeing topics connected to female health.

You never diagnose. You never recommend specific medications by name. You always encourage the user to speak with a healthcare professional for personal medical decisions. You are educational, empowering, and never judgmental.`;

const GREETING = "Hi, I am Lunara. I am here for everything around your cycle, hormones, mood, and wellbeing. What is on your mind today?";

type Message = {
  role: "user" | "assistant";
  content: string;
};

function TypingIndicator() {
  return (
    <div className="lunara-msg-row lunara-msg-row--left">
      <div className="lunara-bubble lunara-bubble--assistant lunara-typing">
        <span /><span /><span />
      </div>
    </div>
  );
}

function MessageBubble({ msg, index }: { msg: Message; index: number }) {
  const isUser = msg.role === "user";
  return (
    <div className={`lunara-msg-row ${isUser ? "lunara-msg-row--right" : "lunara-msg-row--left"}`}>
      <div className={`lunara-bubble ${isUser ? "lunara-bubble--user" : "lunara-bubble--assistant"}`}>
        {!isUser && index === 0 ? (
          <p>
            <span className="lunara-first-word">Hi,</span>
            {" "}I am Lunara. I am here for everything around your cycle, hormones, mood, and wellbeing. What is on your mind today?
          </p>
        ) : (
          <p>{msg.content}</p>
        )}
      </div>
    </div>
  );
}

export function LunaraChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: GREETING },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [pulsing, setPulsing] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (open) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open, messages, scrollToBottom]);

  function handleOpen() {
    setPulsing(false);
    setOpen(true);
  }

  async function sendMessage() {
    const text = input.trim();
    if (!text || loading) return;

    const newMessages: Message[] = [...messages, { role: "user", content: text }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!res.ok) throw new Error("API error");

      const data = await res.json();
      const reply = data.content?.[0]?.text ?? "Something went quiet on my end. Give me a moment and try again.";
      setMessages([...newMessages, { role: "assistant", content: reply }]);
    } catch {
      setMessages([...newMessages, {
        role: "assistant",
        content: "Something went quiet on my end. Give me a moment and try again.",
      }]);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <>
      <style>{`
        .lunara-fab {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 9999;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          border: none;
          cursor: pointer;
          background: radial-gradient(ellipse at 30% 30%, oklch(0.84 0.055 20), oklch(0.82 0.045 305) 60%, oklch(0.9 0.03 75));
          box-shadow: 0 4px 24px oklch(0.82 0.045 305 / 0.35), 0 2px 8px oklch(0 0 0 / 0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .lunara-fab:hover {
          transform: scale(1.07);
          box-shadow: 0 6px 32px oklch(0.82 0.045 305 / 0.45), 0 2px 8px oklch(0 0 0 / 0.15);
        }
        .lunara-fab--pulse {
          animation: lunara-pulse 2.5s ease-in-out infinite;
        }
        @keyframes lunara-pulse {
          0%, 100% { box-shadow: 0 4px 24px oklch(0.82 0.045 305 / 0.35), 0 0 0 0 oklch(0.82 0.045 305 / 0.4); }
          50% { box-shadow: 0 4px 24px oklch(0.82 0.045 305 / 0.35), 0 0 0 12px oklch(0.82 0.045 305 / 0); }
        }
        .lunara-window {
          position: fixed;
          bottom: 92px;
          right: 24px;
          z-index: 9999;
          width: 380px;
          height: 520px;
          border-radius: 1.5rem;
          background: var(--card);
          box-shadow: 0 8px 48px oklch(0 0 0 / 0.14), 0 2px 12px oklch(0 0 0 / 0.08);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          border: 1px solid var(--border);
          animation: lunara-slide-up 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        @keyframes lunara-slide-up {
          from { opacity: 0; transform: translateY(16px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @media (max-width: 480px) {
          .lunara-window {
            width: 100vw;
            height: 100dvh;
            bottom: 0;
            right: 0;
            border-radius: 0;
          }
          .lunara-fab {
            bottom: 16px;
            right: 16px;
          }
        }
        .lunara-header {
          padding: 16px 20px;
          background: radial-gradient(ellipse at 0% 0%, oklch(0.84 0.055 20 / 0.18), oklch(0.82 0.045 305 / 0.12) 60%, transparent);
          border-bottom: 1px solid var(--border);
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
        }
        .lunara-header-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: radial-gradient(circle at 35% 35%, oklch(0.84 0.055 20), oklch(0.82 0.045 305));
          flex-shrink: 0;
        }
        .lunara-header-text {
          flex: 1;
          min-width: 0;
        }
        .lunara-header-name {
          font-family: var(--font-display);
          font-size: 1.05rem;
          font-weight: 600;
          color: var(--foreground);
          letter-spacing: -0.01em;
          line-height: 1.2;
        }
        .lunara-header-subtitle {
          font-family: var(--font-sans);
          font-size: 0.72rem;
          color: var(--muted-foreground);
          margin-top: 1px;
        }
        .lunara-close {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          border: none;
          background: var(--muted);
          color: var(--muted-foreground);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: background 0.15s, color 0.15s;
          font-size: 14px;
          line-height: 1;
        }
        .lunara-close:hover {
          background: var(--accent);
          color: var(--foreground);
        }
        .lunara-messages {
          flex: 1;
          overflow-y: auto;
          padding: 16px 16px 8px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          scroll-behavior: smooth;
        }
        .lunara-messages::-webkit-scrollbar { width: 4px; }
        .lunara-messages::-webkit-scrollbar-track { background: transparent; }
        .lunara-messages::-webkit-scrollbar-thumb { background: var(--border); border-radius: 2px; }
        .lunara-msg-row {
          display: flex;
        }
        .lunara-msg-row--right { justify-content: flex-end; }
        .lunara-msg-row--left { justify-content: flex-start; }
        .lunara-bubble {
          max-width: 80%;
          padding: 10px 14px;
          border-radius: 1.1rem;
          font-family: var(--font-sans);
          font-size: 0.875rem;
          line-height: 1.55;
        }
        .lunara-bubble p { margin: 0; }
        .lunara-bubble--user {
          background: var(--primary);
          color: var(--primary-foreground);
          border-bottom-right-radius: 4px;
        }
        .lunara-bubble--assistant {
          background: var(--secondary);
          color: var(--secondary-foreground);
          border-bottom-left-radius: 4px;
        }
        .lunara-first-word {
          font-family: var(--font-display);
          font-size: 0.95rem;
          font-weight: 600;
        }
        .lunara-typing {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 12px 16px;
          min-width: 52px;
        }
        .lunara-typing span {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--muted-foreground);
          display: inline-block;
          animation: lunara-dot 1.2s ease-in-out infinite;
        }
        .lunara-typing span:nth-child(2) { animation-delay: 0.2s; }
        .lunara-typing span:nth-child(3) { animation-delay: 0.4s; }
        @keyframes lunara-dot {
          0%, 60%, 100% { opacity: 0.3; transform: translateY(0); }
          30% { opacity: 1; transform: translateY(-4px); }
        }
        .lunara-input-row {
          padding: 12px 16px 16px;
          border-top: 1px solid var(--border);
          display: flex;
          gap: 8px;
          flex-shrink: 0;
          background: var(--card);
        }
        .lunara-input {
          flex: 1;
          padding: 9px 14px;
          border-radius: 999px;
          border: 1px solid var(--input);
          background: var(--background);
          color: var(--foreground);
          font-family: var(--font-sans);
          font-size: 0.85rem;
          outline: none;
          transition: border-color 0.15s;
          min-width: 0;
        }
        .lunara-input::placeholder { color: var(--muted-foreground); }
        .lunara-input:focus { border-color: var(--ring); }
        .lunara-send {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: none;
          cursor: pointer;
          background: radial-gradient(ellipse at 30% 30%, oklch(0.84 0.055 20), oklch(0.82 0.045 305) 70%);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: opacity 0.15s, transform 0.15s;
          align-self: center;
        }
        .lunara-send:hover:not(:disabled) { opacity: 0.85; transform: scale(1.05); }
        .lunara-send:disabled { opacity: 0.45; cursor: default; }
      `}</style>

      {!open && (
        <button
          className={`lunara-fab${pulsing ? " lunara-fab--pulse" : ""}`}
          onClick={handleOpen}
          aria-label="Open Lunara chat"
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
            <path d="M11 2.5C11 2.5 14.5 5 15.5 8.5C16.5 12 14 15 11 16.5C8 15 5.5 12 6.5 8.5C7.5 5 11 2.5 11 2.5Z" fill="white" opacity="0.9" />
            <circle cx="16" cy="5" r="1.5" fill="white" opacity="0.7" />
            <circle cx="7" cy="17" r="1" fill="white" opacity="0.5" />
            <circle cx="18" cy="14" r="1" fill="white" opacity="0.5" />
          </svg>
        </button>
      )}

      {open && (
        <div className="lunara-window" role="dialog" aria-label="Chat with Lunara">
          <div className="lunara-header">
            <div className="lunara-header-dot" />
            <div className="lunara-header-text">
              <div className="lunara-header-name">Lunara</div>
              <div className="lunara-header-subtitle">Your health companion</div>
            </div>
            <button className="lunara-close" onClick={() => setOpen(false)} aria-label="Close chat">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
                <path d="M1 1l8 8M9 1L1 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <div className="lunara-messages">
            {messages.map((msg, i) => (
              <MessageBubble key={i} msg={msg} index={i} />
            ))}
            {loading && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>

          <div className="lunara-input-row">
            <input
              ref={inputRef}
              className="lunara-input"
              type="text"
              placeholder="Ask Lunara anything about your health..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={loading}
            />
            <button
              className="lunara-send"
              onClick={sendMessage}
              disabled={!input.trim() || loading}
              aria-label="Send message"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path d="M12.5 1.5L6.5 7.5M12.5 1.5L8.5 12.5L6.5 7.5L1.5 5.5L12.5 1.5Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
