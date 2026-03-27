import { levels } from "@/lib/content";
import { getOptionalNumberEnv } from "@/lib/env";

export const paidLevelConfig = {
  "problem-solving": {
    code: "level2",
    title: levels.find((level) => level.id === "problem-solving")?.title ?? "Level 2",
    amount: getOptionalNumberEnv("RAZORPAY_LEVEL2_AMOUNT", 799900)
  },
  "decision-frameworks": {
    code: "level3",
    title: levels.find((level) => level.id === "decision-frameworks")?.title ?? "Level 3",
    amount: getOptionalNumberEnv("RAZORPAY_LEVEL3_AMOUNT", 799900)
  },
  "case-studies": {
    code: "level4",
    title: levels.find((level) => level.id === "case-studies")?.title ?? "Level 4",
    amount: getOptionalNumberEnv("RAZORPAY_LEVEL4_AMOUNT", 799900)
  }
} as const;

export type PaidLevelSlug = keyof typeof paidLevelConfig;
export type LevelCode = "level1" | (typeof paidLevelConfig)[PaidLevelSlug]["code"];

export function isPaidLevelSlug(level: string): level is PaidLevelSlug {
  return level in paidLevelConfig;
}

export function getLevelCodeFromSlug(level: string): LevelCode {
  if (level === "foundations") return "level1";
  if (isPaidLevelSlug(level)) return paidLevelConfig[level].code;
  throw new Error(`Unknown level slug: ${level}`);
}

export function getSlugFromLevelCode(levelCode: LevelCode) {
  if (levelCode === "level1") return "foundations";
  return (Object.entries(paidLevelConfig).find(([, config]) => config.code === levelCode)?.[0] ?? "foundations") as string;
}
