"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/components/auth/auth-provider";

function readPaymentParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    paymentId: params.get("razorpay_payment_id"),
    linkId: params.get("razorpay_payment_link_id") || params.get("payment_link_id")
  };
}

export default function PaymentSuccessPage() {
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("We are recording your purchase and unlocking the level.");
  const [levelSlug, setLevelSlug] = useState<string | null>(null);

  const paymentSession = useMemo(() => {
    if (typeof window === "undefined") {
      return { paymentId: null, linkId: null };
    }

    return readPaymentParams();
  }, []);

  useEffect(() => {
    if (user === undefined) {
      return;
    }

    if (!user) {
      const search = typeof window !== "undefined" ? window.location.search : "";
      router.replace(`/login?next=${encodeURIComponent(`${pathname}${search}`)}`);
      return;
    }

    if (!paymentSession.paymentId || !paymentSession.linkId) {
      setStatus("error");
      setMessage("Invalid payment session");
      return;
    }

    async function completePayment() {
      try {
        const response = await fetch("/api/payments/complete", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            payment_id: paymentSession.paymentId,
            link_id: paymentSession.linkId
          })
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error ?? "Unable to unlock the level right now.");
        }

        setStatus("success");
        setLevelSlug(data.levelSlug ?? null);
        setMessage("Payment successful. Your level is now unlocked.");
        router.refresh();
      } catch (error) {
        setStatus("error");
        setMessage(error instanceof Error ? error.message : "Unable to complete the payment return.");
      }
    }

    void completePayment();
  }, [pathname, paymentSession.linkId, paymentSession.paymentId, router, user]);

  return (
    <div className="section-shell py-16 pb-24">
      <div className="light-panel p-8">
        <p className="text-xs uppercase tracking-[0.28em] text-accent-deep">Payment status</p>
        <h1 className="mt-4 font-display text-4xl">Payment successful</h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">{message}</p>

        {status === "loading" ? <p className="mt-6 text-sm text-slate-500">Unlocking your content...</p> : null}
        {status === "error" ? <p className="mt-6 text-sm text-rose-600">The level will remain locked until a valid paid purchase is saved in Supabase.</p> : null}

        {status === "success" ? (
          <div className="mt-8 flex flex-wrap items-center gap-3">
            {levelSlug ? (
              <Link href={`/levels/${levelSlug}`} className="rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800">
                Continue learning
              </Link>
            ) : null}
            <Link href="/dashboard" className="rounded-full border border-slate-200 px-5 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50">
              Open dashboard
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
}