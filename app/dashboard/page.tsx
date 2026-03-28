import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowUpRight, Award, CheckCircle2, Lock } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
import { getCurrentUser } from "@/lib/auth";
import { levels } from "@/lib/content";
import { getCompletedTopicsForLevel, getCompletionRatio, getLearningStateForUser, getTotalTopicsForLevel, isLevelUnlocked } from "@/lib/member-data";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login?next=/dashboard");
  }

  const learningState = await getLearningStateForUser(user.id);
  const purchasedLevels = learningState.purchases.map((purchase) => purchase.level);
  const earnedCertificates = new Set(learningState.certificates.map((certificate) => certificate.level));

  const stats = [
    { label: "Purchased levels", value: String(learningState.purchases.length) },
    { label: "Certificates earned", value: String(learningState.certificates.length) },
    {
      label: "Topics completed",
      value: String(learningState.progress.length)
    },
    { label: "Current user", value: user.email ?? "Member" }
  ];

  return (
    <div className="section-shell py-16 pb-24">
      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-6">
          <div className="panel p-8">
            <BrandLogo imageClassName="border border-white/10" />
            <p className="mt-8 text-xs uppercase tracking-[0.3em] text-accent">Dashboard</p>
            <h1 className="mt-4 font-display text-4xl text-white">Welcome back, {(user.user_metadata.full_name as string | undefined) ?? user.email?.split("@")[0] ?? "Learner"}</h1>
            <p className="mt-3 max-w-xl text-base leading-7 text-slate-300">
              Track purchased levels, continue from your saved topic progress, and generate certificates as you complete each stage of the platform.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {stats.map((stat) => (
              <div key={stat.label} className="light-panel p-6">
                <p className="text-sm text-slate-500">{stat.label}</p>
                <p className="mt-3 font-display text-3xl break-words">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="light-panel p-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-accent-deep">Progress by Level</p>
              <h2 className="mt-3 font-display text-3xl">Structured progression</h2>
            </div>
            <Link href="/levels" className="inline-flex items-center gap-2 text-sm font-medium text-slate-950">
              Open curriculum
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-8 space-y-4">
            {levels.map((level) => {
              const completedTopics = getCompletedTopicsForLevel(level.id, learningState.progress);
              const totalTopics = getTotalTopicsForLevel(level.id, learningState.topics);
              const completionRatio = getCompletionRatio(level.id, completedTopics, learningState.topics);
              const unlocked = isLevelUnlocked(level.id, purchasedLevels);
              const hasCertificate = earnedCertificates.has(level.id);

              return (
                <div key={level.id} className="rounded-[24px] border border-slate-200 p-5">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.26em] text-accent-deep">{level.number}</p>
                      <h3 className="mt-2 font-display text-2xl">{level.title}</h3>
                    </div>
                    <div className="rounded-full bg-slate-950 px-3 py-1 text-xs text-white">
                      {!unlocked ? "Locked" : completionRatio === 1 ? "Completed" : `${Math.round(completionRatio * 100)}%`}
                    </div>
                  </div>
                  <div className="mt-4 h-2 rounded-full bg-slate-200">
                    <div className="h-2 rounded-full bg-slate-950" style={{ width: `${Math.round(completionRatio * 100)}%` }} />
                  </div>
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-slate-500">
                    <div className="flex items-center gap-3">
                      {!unlocked ? <Lock className="h-4 w-4" /> : completionRatio === 1 ? <CheckCircle2 className="h-4 w-4" /> : <Award className="h-4 w-4" />}
                      <span>{!unlocked ? "Unlock required" : `${completedTopics.length}/${totalTopics} topics completed`}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      {unlocked ? (
                        <Link href={`/levels/${level.id}`} className="font-medium text-slate-950">
                          Continue learning
                        </Link>
                      ) : null}
                      {hasCertificate ? (
                        <Link href={`/certificate/${level.id}`} className="font-medium text-slate-950">
                          View certificate
                        </Link>
                      ) : null}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
