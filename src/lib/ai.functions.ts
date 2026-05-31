import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { z } from "zod";

const SYSTEM_PROMPT = `You are Lunara, a calm, warm, emotionally intelligent AI companion for women's hormonal and emotional health.

Voice & style:
- empathetic, supportive, encouraging, gentle
- science-informed, educational, never preachy
- short paragraphs, plain language, occasional soft emoji 🌙
- never diagnose or prescribe — you are not a doctor
- when something sounds medical/serious, gently suggest seeing a qualified healthcare professional

You can talk about: menstrual cycle phases, hormones (estrogen, progesterone, cortisol, oxytocin, serotonin, dopamine, testosterone), PMS, mood, sleep, energy, nutrition, movement, cycle syncing, stress, relationships and emotional wellbeing.

Always end with one small, kind, actionable suggestion when appropriate.

Language: Detect the user's language from their message. If they write in German, respond fully in German. If they write in English, respond in English. Always match the user's language naturally. Never mix languages in a single response.

When the user shares how they feel, validate their emotions first before giving advice.`;

const InputSchema = z.object({
  message: z.string().min(1).max(2000),
  history: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().max(4000),
      }),
    )
    .max(20)
    .default([]),
  context: z
    .object({
      phase: z.string().optional(),
      cycleDay: z.number().optional(),
    })
    .optional(),
});

export const askLunara = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => InputSchema.parse(input))
  .handler(async ({ data }) => {
    const anthropicKey = process.env.ANTHROPIC_API_KEY;
    const lovableKey = process.env.LOVABLE_API_KEY;

    const ctxLine = data.context?.phase
      ? `\n\nUser context: she is on day ${data.context.cycleDay ?? "?"} of her cycle (${data.context.phase} phase). Use this naturally if relevant.`
      : "";

    const systemPromptWithContext = SYSTEM_PROMPT + ctxLine;

    // Try Claude API if available
    if (anthropicKey) {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": anthropicKey,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 800,
          system: systemPromptWithContext,
          messages: [
            ...data.history,
            { role: "user", content: data.message },
          ],
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        if (res.status === 429) throw new Error("Lunara is resting — please try again in a moment.");
        if (res.status === 401 || res.status === 403) throw new Error("Invalid API key for Claude.");
        throw new Error(`Claude API error: ${text.slice(0, 200)}`);
      }

      const json = (await res.json()) as { content?: Array<{ text?: string }> };
      const reply = json.content?.[0]?.text?.trim() ?? "I'm here — could you say that again?";
      return { reply };
    }

    // Fallback to Lovable Gateway
    if (!lovableKey) throw new Error("Missing API keys: neither ANTHROPIC_API_KEY nor LOVABLE_API_KEY configured");

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Lovable-API-Key": lovableKey,
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPromptWithContext },
          ...data.history,
          { role: "user", content: data.message },
        ],
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      if (res.status === 429) throw new Error("Lunara is resting — please try again in a moment.");
      if (res.status === 402) throw new Error("AI credits exhausted. Please add credits in workspace settings.");
      throw new Error(`AI gateway error: ${text.slice(0, 200)}`);
    }
    const json = (await res.json()) as { choices?: Array<{ message?: { content?: string } }> };
    const reply = json.choices?.[0]?.message?.content?.trim() ?? "I'm here — could you say that again?";
    return { reply };
  });
