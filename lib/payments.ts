import { levels } from "@/lib/content";

export const paidLevelConfig = {
  "problem-solving": {
    title: levels.find((level) => level.id === "problem-solving")?.title ?? "Level 2",
    amount: 9900,
    currency: "INR"
  },
  "decision-frameworks": {
    title: levels.find((level) => level.id === "decision-frameworks")?.title ?? "Level 3",
    amount: 14900,
    currency: "INR"
  },
  "case-studies": {
    title: levels.find((level) => level.id === "case-studies")?.title ?? "Level 4",
    amount: 19900,
    currency: "INR"
  }
} as const;

export type PaidLevelSlug = keyof typeof paidLevelConfig;
export type LevelSlug = "foundations" | PaidLevelSlug;

export function isPaidLevelSlug(level: string): level is PaidLevelSlug {
  return level in paidLevelConfig;
}

export function isLevelSlug(level: string): level is LevelSlug {
  return level === "foundations" || isPaidLevelSlug(level);
}

export function getStoredLevelSlug(level: string): LevelSlug {
  if (level === "level1") return "foundations";
  if (level === "level2") return "problem-solving";
  if (level === "level3") return "decision-frameworks";
  if (level === "level4") return "case-studies";
  if (isLevelSlug(level)) return level;
  throw new Error(`Unknown level identifier: ${level}`);
}