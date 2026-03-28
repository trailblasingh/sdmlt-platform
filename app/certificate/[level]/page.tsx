import { redirect } from "next/navigation";
import { BrandLogo } from "@/components/brand-logo";
import { PrintCertificateButton } from "@/components/print-certificate-button";
import { getCurrentUser } from "@/lib/auth";
import { levels } from "@/lib/content";
import { getCompletedTopicsForLevel, getLearningStateForUser, getTotalTopicsForLevel, isLevelUnlocked } from "@/lib/member-data";
import { createClient } from "@/lib/supabase/server";

const certificateThemes = {
  foundations: {
    title: "Certificate in Logical Thinking Foundations",
    difficulty: "Beginner",
    levelCode: "L1",
    accentText: "text-sky-300 print:text-sky-700",
    accentBorder: "border-sky-400/30 print:border-sky-600",
    badgeClass: "border-sky-400/30 bg-sky-400/10 text-sky-200 print:border-sky-200 print:bg-sky-50 print:text-sky-700",
    underlineClass: "bg-sky-300 print:bg-sky-700"
  },
  "problem-solving": {
    title: "Certificate in Problem Solving & Data Reasoning",
    difficulty: "Intermediate",
    levelCode: "L2",
    accentText: "text-emerald-300 print:text-emerald-700",
    accentBorder: "border-emerald-400/30 print:border-emerald-600",
    badgeClass: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200 print:border-emerald-200 print:bg-emerald-50 print:text-emerald-700",
    underlineClass: "bg-emerald-300 print:bg-emerald-700"
  },
  "decision-frameworks": {
    title: "Certificate in Decision Making & Economic Reasoning",
    difficulty: "Advanced",
    levelCode: "L3",
    accentText: "text-violet-300 print:text-violet-700",
    accentBorder: "border-violet-400/30 print:border-violet-600",
    badgeClass: "border-violet-400/30 bg-violet-400/10 text-violet-200 print:border-violet-200 print:bg-violet-50 print:text-violet-700",
    underlineClass: "bg-violet-300 print:bg-violet-700"
  },
  "case-studies": {
    title: "Advanced Certificate in Case-Based Business Decision Making",
    difficulty: "Expert",
    levelCode: "L4",
    accentText: "text-amber-300 print:text-amber-700",
    accentBorder: "border-amber-400/30 print:border-amber-600",
    badgeClass: "border-amber-400/30 bg-amber-400/10 text-amber-200 print:border-amber-200 print:bg-amber-50 print:text-amber-700",
    underlineClass: "bg-amber-300 print:bg-amber-700"
  }
} as const;

function generateCertificateId(levelSlug: keyof typeof certificateThemes) {
  const year = new Date().getFullYear();
  const random = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `SDMLT-${certificateThemes[levelSlug].levelCode}-${year}-${random}`;
}

export function generateStaticParams() {
  return levels.map((level) => ({ level: level.id }));
}

export default async function CertificatePage({ params }: { params: Promise<{ level: string }> }) {
  const { level: levelSlug } = await params;
  const level = levels.find((item) => item.id === levelSlug);

  if (!level || !(levelSlug in certificateThemes)) {
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

  const theme = certificateThemes[levelSlug as keyof typeof certificateThemes];
  const supabase = await createClient();
  let certificateId = existingCertificate.certificate_id;

  if (!certificateId) {
    certificateId = generateCertificateId(levelSlug as keyof typeof certificateThemes);

    if (supabase) {
      const { error } = await supabase
        .from("certificates")
        .update({ certificate_id: certificateId })
        .eq("user_id", user.id)
        .eq("level", levelSlug)
        .is("certificate_id", null);

      if (error) {
        console.error("[certificate] Failed to backfill certificate id", {
          userId: user.id,
          levelSlug,
          error
        });
      }
    }
  }

  const issuedAt = existingCertificate.issued_at;
  const learnerName = (user.user_metadata.full_name as string | undefined) ?? (user.user_metadata.name as string | undefined) ?? user.email ?? "SDMLT Learner";
  const verifyBaseUrl = "https://www.sdmlt.in/verify";
  const verifyUrl = `${verifyBaseUrl}/${certificateId}`;

  return (
    <div className="section-shell py-16 pb-24 print:py-0">
      <div className={`mx-auto max-w-5xl rounded-[36px] border bg-[#081321] p-8 text-white shadow-glow print:border-none print:bg-white print:text-slate-950 print:shadow-none sm:p-12 ${theme.accentBorder}`}>
        <div className="flex justify-center print:mb-6">
          <BrandLogo showText={false} imageClassName={`border ${theme.accentBorder}`} />
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 print:hidden">
          <div>
            <p className={`text-xs uppercase tracking-[0.3em] ${theme.accentText}`}>Certificate</p>
            <h1 className="mt-3 font-display text-4xl">Certificate of Completion</h1>
          </div>
          <PrintCertificateButton />
        </div>

        <div className={`mt-10 rounded-[30px] border bg-white/[0.04] px-8 py-12 text-center print:border print:bg-white ${theme.accentBorder}`}>
          <div className="flex flex-col items-center gap-4">
            <p className={`text-sm uppercase tracking-[0.34em] ${theme.accentText}`}>School of Decision Making &amp; Logical Thinking</p>
            <div className={`inline-flex items-center rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-[0.24em] ${theme.badgeClass}`}>
              Level: {theme.difficulty}
            </div>
          </div>
          <h2 className="mt-6 font-display text-5xl leading-tight print:text-slate-950">{theme.title}</h2>
          <div className={`mx-auto mt-5 h-1 w-28 rounded-full ${theme.underlineClass}`} />
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
          <div className={`mt-10 grid gap-4 rounded-[24px] border px-6 py-5 text-left sm:grid-cols-[1fr_auto] ${theme.accentBorder}`}>
            <div className="space-y-3">
              <p className="text-sm text-slate-300 print:text-slate-600">Certificate ID: <span className="font-medium text-white print:text-slate-950">{certificateId}</span></p>
              <p className="text-sm text-slate-300 print:text-slate-600">Verify this certificate at: <span className="font-medium text-white print:text-slate-950">{verifyBaseUrl}</span></p>
              <p className="text-xs break-all text-slate-400 print:text-slate-500">{verifyUrl}</p>
            </div>
            <div className={`self-start rounded-full border px-4 py-2 text-xs uppercase tracking-[0.24em] ${theme.badgeClass}`}>
              {theme.difficulty}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
