import { redirect } from "next/navigation";
import { BrandLogo } from "@/components/brand-logo";
import { PrintCertificateButton } from "@/components/print-certificate-button";
import { getCurrentUser } from "@/lib/auth";
import { levels } from "@/lib/content";
import { getCompletedTopicsForLevel, getLearningStateForUser, getTotalTopicsForLevel, isLevelUnlocked } from "@/lib/member-data";

export function generateStaticParams() {
  return levels.map((level) => ({ level: level.id }));
}

export default async function CertificatePage({ params }: { params: Promise<{ level: string }> }) {
  const { level: levelSlug } = await params;
  const level = levels.find((item) => item.id === levelSlug);

  if (!level) {
    redirect("/dashboard");
  }

  const user = await getCurrentUser();
  if (!user) {
    redirect(`/login?next=/certificate/${levelSlug}`);
  }

  const learningState = await getLearningStateForUser(user.id);
  const purchasedLevels = learningState.purchases.map((purchase) => purchase.level);
  const unlocked = isLevelUnlocked(levelSlug, purchasedLevels);
  const completedTopics = getCompletedTopicsForLevel(levelSlug, learningState.progress);
  const totalTopics = getTotalTopicsForLevel(levelSlug, learningState.topics);
  const existingCertificate = learningState.certificates.find((certificate) => certificate.level === levelSlug);

  if (!unlocked || completedTopics.length < totalTopics || !existingCertificate) {
    redirect("/dashboard");
  }

  const issuedAt = existingCertificate.issued_at;
  const learnerName = (user.user_metadata.full_name as string | undefined) ?? (user.user_metadata.name as string | undefined) ?? user.email ?? "SDMLT Learner";

  return (
    <div className="section-shell py-16 pb-24 print:py-0">
      <div className="mx-auto max-w-5xl rounded-[36px] border border-white/10 bg-[#081321] p-8 text-white shadow-glow print:border-none print:bg-white print:text-slate-950 print:shadow-none sm:p-12">
        <div className="flex justify-center print:mb-6">
          <BrandLogo showText={false} imageClassName="border border-white/10" />
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 print:hidden">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-accent">Certificate</p>
            <h1 className="mt-3 font-display text-4xl">Certificate of Completion</h1>
          </div>
          <PrintCertificateButton />
        </div>

        <div className="mt-10 rounded-[30px] border border-white/10 bg-white/[0.04] px-8 py-12 text-center print:border print:border-slate-300 print:bg-white">
          <p className="text-sm uppercase tracking-[0.34em] text-accent print:text-slate-500">Certificate of Completion</p>
          <h2 className="mt-5 font-display text-5xl leading-tight print:text-slate-950">School of Decision Making &amp; Logical Thinking</h2>
          <p className="mt-8 text-sm uppercase tracking-[0.28em] text-slate-300 print:text-slate-500">Awarded to</p>
          <p className="mt-3 font-display text-4xl print:text-slate-950">{learnerName}</p>
          <p className="mx-auto mt-8 max-w-3xl text-base leading-8 text-slate-300 print:text-slate-700">
            For successfully completing {level.number}: {level.title} and demonstrating structured learning progress across every topic in this level.
          </p>
          <div className="mt-12 grid gap-6 border-t border-white/10 pt-8 text-left text-sm text-slate-300 print:border-slate-300 print:text-slate-700 sm:grid-cols-3">
            <div>
              <p className="uppercase tracking-[0.24em] text-slate-400 print:text-slate-500">Level</p>
              <p className="mt-3 text-base text-white print:text-slate-950">{level.number}: {level.title}</p>
            </div>
            <div>
              <p className="uppercase tracking-[0.24em] text-slate-400 print:text-slate-500">Completion Date</p>
              <p className="mt-3 text-base text-white print:text-slate-950">{new Date(issuedAt).toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" })}</p>
            </div>
            <div>
              <p className="uppercase tracking-[0.24em] text-slate-400 print:text-slate-500">Signature</p>
              <p className="mt-3 text-base text-white print:text-slate-950">SDMLT</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
