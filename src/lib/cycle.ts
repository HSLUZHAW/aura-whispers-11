export type CyclePhase = "Menstrual" | "Follicular" | "Ovulatory" | "Luteal";

export interface CycleInfo {
  day: number;
  phase: CyclePhase;
  description: string;
  nextPeriodInDays: number;
}

export function getCycleInfo(
  lastPeriodDate: string | null | undefined,
  cycleLength = 28,
  periodLength = 5,
): CycleInfo | null {
  if (!lastPeriodDate) return null;
  const last = new Date(lastPeriodDate + "T00:00:00");
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - last.getTime()) / 86400000);
  const cycleDay = (((diffDays % cycleLength) + cycleLength) % cycleLength) + 1;

  let phase: CyclePhase;
  let description: string;
  if (cycleDay <= periodLength) {
    phase = "Menstrual";
    description = "Honor the rest your body is asking for.";
  } else if (cycleDay <= 13) {
    phase = "Follicular";
    description = "Energy is rising — a great window for new beginnings.";
  } else if (cycleDay <= 16) {
    phase = "Ovulatory";
    description = "Peak energy and confidence. Connect, create, move.";
  } else {
    phase = "Luteal";
    description = "Slow down, nourish, and prepare for renewal.";
  }
  return {
    day: cycleDay,
    phase,
    description,
    nextPeriodInDays: cycleLength - cycleDay + 1,
  };
}

export const PHASE_COLORS: Record<CyclePhase, string> = {
  Menstrual: "from-blush/60 to-clay/30",
  Follicular: "from-sand/70 to-blush/30",
  Ovulatory: "from-clay/40 to-blush/40",
  Luteal: "from-lavender/60 to-sand/40",
};
