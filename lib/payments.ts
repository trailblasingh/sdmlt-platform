import { levels } from "@/lib/content";

export const PAYMENT_LINKS = {
  "problem-solving": "https://rzp.io/rzp/5gST3mf",
  "decision-frameworks": "https://rzp.io/rzp/xasmIQSh",
  "case-studies": "https://rzp.io/rzp/9IyoITI8"
} as const;

export const paidLevelConfig = {
  "problem-solving": {
    title: levels.find((level) => level.id === "problem-solving")?.title ?? "Level 2",
    paymentLink: PAYMENT_LINKS["problem-solving"],
    linkIds: ["5gST3mf"] as string[]
  },
  "decision-frameworks": {
    title: levels.find((level) => level.id === "decision-frameworks")?.title ?? "Level 3",
    paymentLink: PAYMENT_LINKS["decision-frameworks"],
    linkIds: ["xasmIQSh"] as string[]
  },
  "case-studies": {
    title: levels.find((level) => level.id === "case-studies")?.title ?? "Level 4",
    paymentLink: PAYMENT_LINKS["case-studies"],
    linkIds: ["9IyoITI8"] as string[]
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

export function getPaymentLink(level: PaidLevelSlug) {
  return PAYMENT_LINKS[level];
}

export function getPaidLevelSlugFromPaymentLinkId(linkId: string) {
  return (
    Object.entries(paidLevelConfig).find(([, config]) => config.linkIds.includes(linkId))?.[0] ?? null
  ) as PaidLevelSlug | null;
}