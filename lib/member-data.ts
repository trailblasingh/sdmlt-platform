import { levels, levelLessons } from "@/lib/content";
import { getStoredLevelSlug } from "@/lib/payments";
import { createClient } from "@/lib/supabase/server";

export async function getLearningStateForUser(userId: string) {
  try {
    const supabase = await createClient();

    if (!supabase) {
      return {
        purchases: [],
        progress: [],
        certificates: []
      };
    }

    const [{ data: purchases, error: purchasesError }, { data: progress, error: progressError }, { data: certificates, error: certificatesError }] = await Promise.all([
      supabase.from("purchases").select("level, payment_id, status, created_at").eq("user_id", userId).eq("status", "paid"),
      supabase.from("progress").select("level, completed_topics, updated_at").eq("user_id", userId),
      supabase.from("certificates").select("level, issued_at").eq("user_id", userId)
    ]);

    if (purchasesError || progressError || certificatesError) {
      console.error("[member-data] Failed to fetch member state", {
        userId,
        purchasesError,
        progressError,
        certificatesError
      });

      return {
        purchases: [],
        progress: [],
        certificates: []
      };
    }

    console.log("[member-data] purchases fetched for user", userId, purchases ?? []);

    return {
      purchases: purchases ?? [],
      progress: progress ?? [],
      certificates: certificates ?? []
    };
  } catch (error) {
    console.error("[member-data] Unexpected fetch failure", { userId, error });
    return {
      purchases: [],
      progress: [],
      certificates: []
    };
  }
}

export function getCompletedTopicsForLevel(levelSlug: string, progressRows: { level: string; completed_topics: unknown }[]) {
  const row = progressRows.find((item) => item.level === levelSlug || getStoredLevelSlug(item.level) === levelSlug);
  return Array.isArray(row?.completed_topics) ? (row.completed_topics as string[]) : [];
}

export function isLevelUnlocked(currentLevelSlug: string, purchasedLevels: string[]) {
  if (currentLevelSlug === "foundations") {
    return true;
  }

  const unlocked = purchasedLevels.some((purchaseLevel) => {
    console.log("[member-data] level slug comparison", {
      purchaseLevel,
      currentLevelSlug
    });
    return purchaseLevel === currentLevelSlug;
  });

  console.log("[member-data] unlock result", { currentLevelSlug, purchasedLevels, unlocked });
  return unlocked;
}

export function getTotalTopicsForLevel(levelSlug: string) {
  return levelLessons[levelSlug]?.length ?? 0;
}

export function getCompletionRatio(levelSlug: string, completedTopicIds: string[]) {
  const total = getTotalTopicsForLevel(levelSlug);
  return total === 0 ? 0 : completedTopicIds.length / total;
}

export function getLevelByCode(levelCode: string) {
  const levelSlug = getStoredLevelSlug(levelCode);
  return levels.find((level) => level.id === levelSlug) ?? null;
}