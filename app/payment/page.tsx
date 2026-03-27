import { UnlockLevelButton } from "@/components/unlock-level-button";
import { levels } from "@/lib/content";
import { getCurrentUser } from "@/lib/auth";
import { getLearningStateForUser, isLevelUnlocked } from "@/lib/member-data";

export default async function PaymentPage() {
  const user = await getCurrentUser();
  const learningState = user ? await getLearningStateForUser(user.id) : { purchases: [], progress: [], certificates: [] };
  const purchasedLevels = learningState.purchases.map((purchase) => purchase.level);
  const paidLevels = levels.filter((level) => level.access === "Paid");

  return (
    <div className="section-shell py-16 pb-24">
      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-6">
          <div className="panel p-8">
            <p className="text-xs uppercase tracking-[0.3em] text-accent">Unlock Access</p>
            <h1 className="mt-4 font-display text-5xl text-white">Purchase levels, save progress, and generate certificates</h1>
            <p className="mt-4 text-lg leading-8 text-slate-300">
              Level 1 stays free. Levels 2 to 4 unlock premium content, persistent progress, dashboard tracking, and certificate issuance once the topics are completed.
            </p>
          </div>
          <div className="space-y-4">
            {paidLevels.map((level) => {
              const unlocked = isLevelUnlocked(level.id, purchasedLevels);

              return (
                <div key={level.id} className="light-panel p-6">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.26em] text-accent-deep">{level.number}</p>
                      <h2 className="mt-2 font-display text-3xl">{level.title}</h2>
                      <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">{level.description}</p>
                    </div>
                    <div className="rounded-full bg-slate-950 px-3 py-1 text-xs text-white">{unlocked ? "Purchased" : "Locked"}</div>
                  </div>
                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    {unlocked ? (
                      <div className="rounded-full bg-emerald-100 px-4 py-3 text-sm font-medium text-emerald-800">Unlocked on your account</div>
                    ) : (
                      <UnlockLevelButton levelSlug={level.id} className="rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="light-panel p-8">
          <p className="text-xs uppercase tracking-[0.28em] text-accent-deep">How it works</p>
          <div className="mt-5 grid gap-4">
            {[
              "Login with Google to connect purchases and progress to your account.",
              "Click unlock to open the correct Razorpay payment link with your email prefilled.",
              "After payment, Razorpay should return you to /payment-success so the purchase can be recorded in Supabase.",
              "Finish every topic in a level to unlock its certificate page and print-ready certificate."
            ].map((item) => (
              <div key={item} className="rounded-[18px] border border-slate-200 px-4 py-4 text-sm leading-7 text-slate-700">
                {item}
              </div>
            ))}
          </div>
          {!user ? (
            <p className="mt-6 text-sm leading-6 text-slate-500">Login is required before payment can begin, so purchases can be verified and attached to the right account.</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}