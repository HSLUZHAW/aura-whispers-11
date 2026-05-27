/**
 * Dynamic suggestion buttons for the Lunara chat.
 * Picks 4 questions based on:
 *  - current cycle phase
 *  - current time of day
 *  - browser language (de / en)
 */

type Phase = "menstruation" | "follicular" | "ovulation" | "luteal";
type TimeOfDay = "morning" | "midday" | "evening" | "night";
type Lang = "de" | "en";

// ---------- Language detection ----------
export function detectLanguage(): Lang {
  if (typeof navigator === "undefined") return "en";
  const browserLang = navigator.language.toLowerCase();
  return browserLang.startsWith("de") ? "de" : "en";
}

// ---------- Time of day ----------
function getTimeOfDay(date = new Date()): TimeOfDay {
  const h = date.getHours();
  if (h >= 6 && h < 11) return "morning";
  if (h >= 11 && h < 17) return "midday";
  if (h >= 17 && h < 22) return "evening";
  return "night";
}

// ---------- Phase-based suggestions ----------
const PHASE_SUGGESTIONS: Record<Phase, Record<Lang, string[]>> = {
  menstruation: {
    de: [
      "Wie lindere ich Krämpfe auf natürliche Weise?",
      "Welche Lebensmittel helfen mir während der Periode?",
      "Ist es okay, mich heute einfach auszuruhen?",
      "Warum fühle ich mich gerade so erschöpft?",
    ],
    en: [
      "How can I ease cramps naturally?",
      "Which foods support me during my period?",
      "Is it okay to rest more today?",
      "Why do I feel so drained right now?",
    ],
  },
  follicular: {
    de: [
      "Welche Workouts passen jetzt zu meinem Körper?",
      "Wie nutze ich meine wachsende Energie am besten?",
      "Warum fühle ich mich gerade so motiviert?",
      "Was sollte ich in dieser Phase essen?",
    ],
    en: [
      "Which workouts suit my body right now?",
      "How do I make the most of my rising energy?",
      "Why do I feel so motivated lately?",
      "What should I eat during this phase?",
    ],
  },
  ovulation: {
    de: [
      "Warum fühle ich mich heute so selbstbewusst?",
      "Wie unterstütze ich meinen Körper während der Ovulation?",
      "Welche Workouts sind jetzt ideal?",
      "Warum ist meine Libido gerade so hoch?",
    ],
    en: [
      "Why do I feel so confident today?",
      "How can I support my body during ovulation?",
      "Which workouts feel best right now?",
      "Why is my libido so high lately?",
    ],
  },
  luteal: {
    de: [
      "Warum bin ich heute emotional empfindlich?",
      "Wieso habe ich gerade Heißhunger?",
      "Wie gehe ich mit PMS-Symptomen um?",
      "Welche Selbstfürsorge brauche ich jetzt?",
    ],
    en: [
      "Why am I emotionally sensitive today?",
      "Why am I craving sugar right now?",
      "How can I cope with PMS symptoms?",
      "What self-care do I need most right now?",
    ],
  },
};

// ---------- Time-based suggestions ----------
const TIME_SUGGESTIONS: Record<TimeOfDay, Record<Lang, string[]>> = {
  morning: {
    de: [
      "Wie starte ich heute kraftvoll in den Tag?",
      "Welche Morgenroutine passt zu meiner aktuellen Phase?",
    ],
    en: [
      "How do I start my day with strength?",
      "What morning routine fits my current phase?",
    ],
  },
  midday: {
    de: [
      "Warum fühle ich mich gerade so müde?",
      "Wie hole ich mir am Nachmittag neue Energie?",
    ],
    en: [
      "Why do I feel so tired right now?",
      "How do I find new energy this afternoon?",
    ],
  },
  evening: {
    de: [
      "Wie komme ich heute Abend zur Ruhe?",
      "Welche Abendroutine tut mir jetzt gut?",
    ],
    en: [
      "How can I wind down tonight?",
      "What evening routine would feel good now?",
    ],
  },
  night: {
    de: [
      "Warum kann ich gerade nicht schlafen?",
      "Wie beruhige ich meine Gedanken nachts?",
    ],
    en: [
      "Why can't I sleep right now?",
      "How can I quiet my mind at night?",
    ],
  },
};

// ---------- Empty state text (also localized) ----------
export function getEmptyStateText(lang: Lang = detectLanguage()) {
  if (lang === "de") {
    return {
      title: "Ich bin hier, und ich höre dir zu.",
      subtitle: "Frag mich alles über deinen Körper, deine Stimmung oder deinen Zyklus.",
    };
  }
  return {
    title: "I'm here, and I'm listening.",
    subtitle: "Ask me anything about your body, mood or cycle.",
  };
}

// ---------- Main function ----------
export function getDynamicSuggestions(
  phase: Phase | null | undefined,
  lang: Lang = detectLanguage(),
  now: Date = new Date(),
): string[] {
  const time = getTimeOfDay(now);

  // Fallback if no phase known yet (no period date entered)
  const safePhase: Phase = phase ?? "follicular";

  const phasePool = PHASE_SUGGESTIONS[safePhase][lang];
  const timePool = TIME_SUGGESTIONS[time][lang];

  // 2 from phase, 2 from time, deduplicated
  const picked = [
    phasePool[0],
    phasePool[1],
    timePool[0],
    timePool[1],
  ];

  return Array.from(new Set(picked)).slice(0, 4);
}
