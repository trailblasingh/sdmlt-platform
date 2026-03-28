import { levels, levelLessons } from "@/lib/content";
import { getStoredLevelSlug } from "@/lib/payments";
import { createClient } from "@/lib/supabase/server";

type PurchaseRow = {
  level: string;
  payment_id: string;
  status: string;
  created_at: string;
};

type ProgressRow = {
  level: string;
  topic: string;
  completed: boolean | null;
  created_at: string;
};

type CertificateRow = {
  level: string;
  issued_at: string;
};

type TopicRow = {
  level: string;
  topic: string;
};

export async function getLearningStateForUser(userId: string) {
  try {
    const supabase = await createClient();

    if (!supabase) {
      return {
        purchases: [] as PurchaseRow[],
        progress: [] as ProgressRow[],
        certificates: [] as CertificateRow[],
        topics: [] as TopicRow[]
      };
    }

    const [
      { data: purchases, error: purchasesError },
      { data: progress, error: progressError },
      { data: certificates, error: certificatesError },
      { data: topics, error: topicsError }
    ] = await Promise.all([
      supabase.from("purchases").select("level, payment_id, status, created_at").eq("user_id", userId).eq("status", "paid"),
      supabase.from("progress").select("level, topic, completed, created_at").eq("user_id", userId).eq("completed", true),
      supabase.from("certificates").select("level, issued_at").eq("user_id", userId),
      supabase.from("topics").select("level, topic")
    ]);

    if (purchasesError || progressError || certificatesError || topicsError) {
      console.error("[member-data] Failed to fetch member state", {
        userId,
        purchasesError,
        progressError,
        certificatesError,
        topicsError
      });

      return {
        purchases: [] as PurchaseRow[],
        progress: [] as ProgressRow[],
        certificates: [] as CertificateRow[],
        topics: [] as TopicRow[]
      };
    }

    console.log("[member-data] purchases fetched for user", userId, purchases ?? []);

    return {
      purchases: (purchases ?? []) as PurchaseRow[],
      progress: (progress ?? []) as ProgressRow[],
      certificates: (certificates ?? []) as CertificateRow[],
      topics: (topics ?? []) as TopicRow[]
    };
  } catch (error) {
    console.error("[member-data] Unexpected fetch failure", { userId, error });
    return {
      purchases: [] as PurchaseRow[],
      progress: [] as ProgressRow[],
      certificates: [] as CertificateRow[],
      topics: [] as TopicRow[]
    };
  }
}

export function getCompletedTopicsForLevel(levelSlug: string, progressRows: ProgressRow[]) {
  return progressRows
    .filter((item) => (item.level === levelSlug || getStoredLevelSlug(item.level) === levelSlug) && item.completed)
    .map((item) => item.topic);
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

export function getTotalTopicsForLevel(levelSlug: string, topicRows?: TopicRow[]) {
  if (topicRows && topicRows.length > 0) {
    return topicRows.filter((row) => row.level === levelSlug).length;
  }

  return levelLessons[levelSlug]?.length ?? 0;
}

export function getCompletionRatio(levelSlug: string, completedTopicIds: string[], topicRows?: TopicRow[]) {
  const total = getTotalTopicsForLevel(levelSlug, topicRows);
  return total === 0 ? 0 : completedTopicIds.length / total;
}

export function getLevelByCode(levelCode: string) {
  const levelSlug = getStoredLevelSlug(levelCode);
  return levels.find((level) => level.id === levelSlug) ?? null;
}
