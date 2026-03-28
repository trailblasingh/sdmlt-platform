"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/components/auth/auth-provider";
import { isPaidLevelSlug } from "@/lib/payments";

async function ensureRazorpayLoaded() {
  if (window.Razorpay) {
    return true;
  }

  return await new Promise<boolean>((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

type UnlockLevelButtonProps = {
  levelSlug: string;
  className?: string;
  onUnlocked?: () => void;
};

export function UnlockLevelButton({ levelSlug, className, onUnlocked }: UnlockLevelButtonProps) {
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

  async function handleClick() {
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

    try {
      const orderResponse = await fetch("/api/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ level_id: levelSlug })
      });

      const orderData = await orderResponse.json();

      if (!orderResponse.ok) {
        throw new Error(orderData.error ?? "Unable to create payment order.");
      }

      const loaded = await ensureRazorpayLoaded();

      if (!loaded || !window.Razorpay) {
        throw new Error("Unable to load Razorpay checkout.");
      }

      const razorpay = new window.Razorpay({
        key: orderData.key_id,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "SDMLT",
        description: `${orderData.title} unlock`,
        order_id: orderData.order_id,
        prefill: {
          name: (user.user_metadata.full_name as string | undefined) ?? (user.user_metadata.name as string | undefined) ?? undefined,
          email: user.email ?? undefined
        },
        theme: {
          color: "#7EC8FF"
        },
        modal: {
          ondismiss: () => setLoading(false)
        },
        handler: async (response) => {
          try {
            const verifyResponse = await fetch("/api/verify-payment", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                level_id: levelSlug,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature
              })
            });

            const verifyData = await verifyResponse.json();

            if (!verifyResponse.ok) {
              setMessage(verifyData.error ?? "Payment verification failed.");
              setLoading(false);
              return;
            }

            if (verifyData.success) {
              setMessage("Level unlocked successfully.");
              onUnlocked?.();
              await router.refresh();
            } else {
              setMessage("Payment verification failed.");
            }
          } catch (error) {
            setMessage(error instanceof Error ? error.message : "Payment verification failed.");
          } finally {
            setLoading(false);
          }
        }
      });

      razorpay.open();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to start checkout.");
      setLoading(false);
    }
  }

  return (
    <div>
      <button
        onClick={() => void handleClick()}
        disabled={loading}
        className={className ?? "mt-5 rounded-full bg-white px-5 py-3 text-sm font-medium text-ink transition hover:bg-mist disabled:cursor-wait disabled:opacity-80"}
      >
        {loading ? "Processing..." : "Unlock Level"}
      </button>
      {message ? <p className="mt-3 text-sm text-slate-300">{message}</p> : null}
    </div>
  );
}