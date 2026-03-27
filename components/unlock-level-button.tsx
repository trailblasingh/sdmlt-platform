"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/components/auth/auth-provider";
import { getPaymentLink, isPaidLevelSlug } from "@/lib/payments";

type UnlockLevelButtonProps = {
  levelSlug: string;
  className?: string;
  onUnlocked?: () => void;
};

export function UnlockLevelButton({ levelSlug, className }: UnlockLevelButtonProps) {
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!message) return;
    const timeout = window.setTimeout(() => setMessage(null), 4000);
    return () => window.clearTimeout(timeout);
  }, [message]);

  function handleClick() {
    setMessage(null);

    if (!user) {
      router.push(`/login?next=${encodeURIComponent(pathname)}`);
      return;
    }

    if (!isPaidLevelSlug(levelSlug)) {
      setMessage("This level does not require payment.");
      return;
    }

    setLoading(true);
    window.location.href = getPaymentLink(levelSlug);
  }

  return (
    <div>
      <button
        onClick={handleClick}
        disabled={loading}
        className={className ?? "mt-5 rounded-full bg-white px-5 py-3 text-sm font-medium text-ink transition hover:bg-mist disabled:cursor-wait disabled:opacity-80"}
      >
        {loading ? "Redirecting..." : "Unlock Level"}
      </button>
      {message ? <p className="mt-3 text-sm text-slate-300">{message}</p> : null}
    </div>
  );
}