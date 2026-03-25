"use client";

import { useState } from "react";
import { ArrowRight, BadgeIndianRupee, ShieldCheck } from "lucide-react";

type PaymentModalProps = {
  triggerLabel?: string;
  title?: string;
};

export function PaymentModal({
  triggerLabel = "Unlock certification",
  title = "Unlock Levels 2-4 + Certification"
}: PaymentModalProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleCheckout() {
    setLoading(true);
    try {
      const response = await fetch("/api/checkout", { method: "POST" });
      const data = await response.json();
      window.alert(`Razorpay order stub created: ${data.orderId}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-ink transition hover:bg-mist"
      >
        {triggerLabel}
      </button>
      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-6 backdrop-blur">
          <div className="w-full max-w-xl rounded-[30px] border border-white/10 bg-[#081321] p-7 text-white shadow-glow">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-accent">Payment</p>
                <h3 className="mt-3 font-display text-3xl">{title}</h3>
              </div>
              <button onClick={() => setOpen(false)} className="text-sm text-slate-300">
                Close
              </button>
            </div>
            <div className="mt-6 grid gap-4 rounded-[24px] border border-white/10 bg-white/5 p-5 md:grid-cols-2">
              <div>
                <p className="text-sm text-slate-300">Plan</p>
                <p className="mt-2 text-xl font-semibold">SDMLT Professional Track</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  Advanced levels, case labs, certificate access, and decision simulator unlocks.
                </p>
              </div>
              <div className="rounded-[22px] bg-white p-5 text-slate-950">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <BadgeIndianRupee className="h-4 w-4" />
                  One-time unlock
                </div>
                <p className="mt-3 font-display text-4xl">?7,999</p>
                <p className="mt-2 text-sm text-slate-500">India payments via Razorpay. GST invoice enabled.</p>
              </div>
            </div>
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 text-sm text-slate-200">
                <ShieldCheck className="h-4 w-4 text-accent" />
                <span>Secure checkout with webhook-ready order scaffolding</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-200">
                <ArrowRight className="h-4 w-4 text-accent" />
                <span>Certificate issued after completing required assessments</span>
              </div>
            </div>
            <div className="mt-8 flex gap-3">
              <button
                onClick={handleCheckout}
                disabled={loading}
                className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-ink transition hover:bg-mist disabled:opacity-70"
              >
                {loading ? "Creating order..." : "Proceed to Pay"}
              </button>
              <button
                onClick={() => setOpen(false)}
                className="rounded-full border border-white/10 px-5 py-3 text-sm text-white"
              >
                Review syllabus
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
