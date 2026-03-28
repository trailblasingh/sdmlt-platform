"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/components/auth/auth-provider";

type TopicCompleteButtonProps = {
  levelSlug: string;
  topicId: string;
  completed: boolean;
  onCompleted: () => void;
};

export function TopicCompleteButton({ levelSlug, topicId, completed, onCompleted }: TopicCompleteButtonProps) {
  const { user } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const pathLevelSlug = pathname.split("/")[2] ?? levelSlug;

  async function handleComplete() {
    if (completed) {
      return;
    }

    if (!user) {
      router.push(`/login?next=${encodeURIComponent(pathname)}`);
      return;
    }

    setLoading(true);
    setMessage(null);

    const level = pathLevelSlug || levelSlug;
    const topic = topicId;

    console.log("Progress payload:", { level, topic });

    try {
      const response = await fetch("/api/progress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ level, topic })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "Unable to save progress.");
      }

      onCompleted();
      router.refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to save progress.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-5">
      <button
        onClick={() => void handleComplete()}
        disabled={completed || loading}
        className="rounded-full bg-slate-950 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-default disabled:opacity-70"
      >
        {completed ? "Completed" : loading ? "Saving..." : "Mark as Complete"}
      </button>
      {message ? <p className="mt-2 text-sm text-rose-600">{message}</p> : null}
    </div>
  );
}
