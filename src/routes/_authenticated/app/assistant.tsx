import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { Sparkles, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { askLunara } from "@/lib/ai.functions";
import { getCycleInfo } from "@/lib/cycle";
import { getDynamicSuggestions, getEmptyStateText, detectLanguage } from "@/lib/suggestions";

export const Route = createFileRoute("/_authenticated/app/assistant")({
  head: () => ({ meta: [{ title: "Lunara — AI Companion" }] }),
  component: AssistantPage,
});



type Msg = { role: "user" | "assistant"; content: string };

function AssistantPage() {
  const ask = useServerFn(askLunara);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
const lang = detectLanguage();
const emptyState = getEmptyStateText(lang);
  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;
      const { data } = await supabase.from("profiles").select("*").eq("id", user.id).maybeSingle();
      return data;
    },
  });

  // Load past messages once
  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data } = await supabase.from("ai_messages")
        .select("role,content").eq("user_id", user.id)
        .order("created_at", { ascending: true }).limit(40);
      if (data) setMessages(data as Msg[]);
    })();
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const send = async (text: string) => {
    if (!text.trim() || loading) return;
    const userMsg: Msg = { role: "user", content: text.trim() };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);

    const cycle = profile ? getCycleInfo(profile.last_period_date, profile.cycle_length ?? 28, profile.period_length ?? 5) : null;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      const recent = messages.slice(-10);
      const { reply } = await ask({
        data: {
          message: userMsg.content,
          history: recent,
          context: cycle ? { phase: cycle.phase, cycleDay: cycle.day } : undefined,
        },
      });
      const aiMsg: Msg = { role: "assistant", content: reply };
      setMessages((m) => [...m, aiMsg]);
      if (user) {
        await supabase.from("ai_messages").insert([
          { user_id: user.id, role: "user", content: userMsg.content },
          { user_id: user.id, role: "assistant", content: reply },
        ]);
      }
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Lunara couldn't reply");
      setMessages((m) => m.slice(0, -1));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-180px)] md:h-[calc(100vh-100px)]">
      <header className="mb-4">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">AI Companion</p>
        <h1 className="font-display text-3xl mt-1 flex items-center gap-2">
          Lunara <Sparkles size={20} className="text-clay" />
        </h1>
      </header>

      <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-4 pb-4">
    {messages.length === 0 && (
  <div className="text-center py-10">
    <div className="w-16 h-16 mx-auto rounded-full bg-gradient-hero shadow-glow mb-4 animate-float-slow" />
    <p className="font-display text-xl mb-2">{emptyState.title}</p>
    <p className="text-sm text-muted-foreground mb-6">{emptyState.subtitle}</p>
    <div className="flex flex-col gap-2 max-w-sm mx-auto">
      {getDynamicSuggestions(
        profile
          ? getCycleInfo(profile.last_period_date, profile.cycle_length ?? 28, profile.period_length ?? 5).phase as any
          : null,
        lang,
      ).map((s) => (
        <button key={s} onClick={() => send(s)}
          className="text-left text-sm px-4 py-3 rounded-2xl bg-card border border-border/60 hover:border-clay/50 transition">
          {s}
        </button>
      ))}
    </div>
  </div>
)}
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
              m.role === "user"
                ? "bg-primary text-primary-foreground rounded-br-md"
                : "bg-secondary text-foreground rounded-bl-md"
            }`}>
              {m.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="px-4 py-3 rounded-2xl rounded-bl-md bg-secondary text-muted-foreground text-sm">
              <span className="inline-flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-clay animate-pulse" />
                <span className="w-1.5 h-1.5 rounded-full bg-clay animate-pulse" style={{ animationDelay: "0.15s" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-clay animate-pulse" style={{ animationDelay: "0.3s" }} />
              </span>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={(e) => { e.preventDefault(); send(input); }}
        className="flex gap-2 p-2 rounded-full bg-card border border-border/60 shadow-soft sticky bottom-24 md:bottom-0">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Share what's on your mind..."
          disabled={loading}
          className="flex-1 bg-transparent px-4 text-sm focus:outline-none"
        />
        <button type="submit" disabled={loading || !input.trim()}
          className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center disabled:opacity-40">
          <Send size={16} />
        </button>
      </form>

      <p className="text-[10px] text-center text-muted-foreground mt-2">
        Lunara is not a doctor. For medical concerns please consult a healthcare professional.
      </p>
    </div>
  );
}
