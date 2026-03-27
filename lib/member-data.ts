import { levels, levelLessons } from "@/lib/content";
import { getLevelCodeFromSlug } from "@/lib/payments";
import { createClient } from "@/lib/supabase/server";

export async function getLearningStateForUser(userId: string) {
  const supabase = await createClient();

  if (!supabase) {
    return {
      purchases: [],
      progress: [],
      certificates: []
    };
  }

  const [{ data: purchases }, { data: progress }, { data: certificates }] = await Promise.all([
    supabase.from("purchases").select("level, payment_id, created_at").eq("user_id", userId),
    supabase.from("progress").select("level, completed_topics, updated_at").eq("user_id", userId),
    supabase.from("certificates").select("level, issued_at").eq("user_id", userId)
  ]);

  return {
    purchases: purchases ?? [],
    progress: progress ?? [],
    certificates: certificates ?? []
  };
}

export function getCompletedTopicsForLevel(levelSlug: string, progressRows: { level: string; completed_topics: unknown }[]) {
  const levelCode = getLevelCodeFromSlug(levelSlug);
  const row = progressRows.find((item) => item.level === levelCode);
  return Array.isArray(row?.completed_topics) ? (row.completed_topics as string[]) : [];
}

export function isLevelUnlocked(levelSlug: string, purchasedLevelCodes: string[]) {
  if (levelSlug === "foundations") {
    return true;
  }

  return purchasedLevelCodes.includes(getLevelCodeFromSlug(levelSlug));
}

export function getTotalTopicsForLevel(levelSlug: string) {
  return levelLessons[levelSlug]?.length ?? 0;
}

export function getCompletionRatio(levelSlug: string, completedTopicIds: string[]) {
  const total = getTotalTopicsForLevel(levelSlug);
  return total === 0 ? 0 : completedTopicIds.length / total;
}

export function getLevelByCode(levelCode: string) {
  if (levelCode === "level1") return levels.find((level) => level.id === "foundations") ?? null;
  if (levelCode === "level2") return levels.find((level) => level.id === "problem-solving") ?? null;
  if (levelCode === "level3") return levels.find((level) => level.id === "decision-frameworks") ?? null;
  if (levelCode === "level4") return levels.find((level) => level.id === "case-studies") ?? null;
  return null;
}