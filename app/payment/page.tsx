import { CertificatePreview } from "@/components/certificate-preview";
import { PaymentModal } from "@/components/payment-modal";

export default function PaymentPage() {
  return (
    <div className="section-shell py-16 pb-24">
      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-6">
          <div className="panel p-8">
            <p className="text-xs uppercase tracking-[0.3em] text-accent">Unlock Access</p>
            <h1 className="mt-4 font-display text-5xl text-white">Move from free foundations to certification track</h1>
            <p className="mt-4 text-lg leading-8 text-slate-300">
              Level 1 is free. Levels 2-4, premium case labs, progress intelligence, and certificate issuance
              are unlocked through the professional track.
            </p>
            <div className="mt-8">
              <PaymentModal />
            </div>
          </div>
          <div className="light-panel p-8">
            <p className="text-xs uppercase tracking-[0.28em] text-accent-deep">Payment Flow</p>
            <div className="mt-5 grid gap-4">
              {[
                "Create Razorpay order from a secure API route",
                "Launch modal checkout with course and user metadata",
                "Verify webhook or signature before unlocking Levels 2-4",
                "Enable certificate issuance when module thresholds are met"
              ].map((item) => (
                <div key={item} className="rounded-[18px] border border-slate-200 px-4 py-4 text-sm text-slate-700">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
        <CertificatePreview />
      </div>
    </div>
  );
}
