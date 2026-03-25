import { notFound } from "next/navigation";
import { LockKeyhole, TrendingUp } from "lucide-react";
import { ModuleCard } from "@/components/module-card";
import { PaymentModal } from "@/components/payment-modal";
import { QuizInterface } from "@/components/quiz-interface";
import { levels } from "@/lib/content";

export function generateStaticParams() {
  return levels.map((level) => ({ slug: level.id }));
}

export default async function LevelDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const level = levels.find((item) => item.id === slug);

  if (!level) {
    notFound();
  }

  const lockedCount = level.modules.filter((module) => module.locked).length;

  return (
    <div className="pb-24">
      <section className="section-shell py-16">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.28em] text-accent">{level.number}</p>
            <h1 className="font-display text-5xl text-white">{level.title}</h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-300">{level.description}</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="panel p-5">
                <p className="text-sm text-slate-300">Outcome</p>
                <p className="mt-3 text-lg text-white">{level.outcome}</p>
              </div>
              <div className="panel p-5">
                <p className="text-sm text-slate-300">Access model</p>
                <p className="mt-3 text-lg text-white">
                  {level.access === "Free" ? "Open to all learners" : "Paid unlock required"}
                </p>
              </div>
            </div>
          </div>
          <div className="panel p-6">
            <p className="text-xs uppercase tracking-[0.28em] text-accent">Progress Tracking</p>
            <div className="mt-6 space-y-5">
              <div className="rounded-[22px] border border-white/10 bg-white/5 p-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-300">Completion</span>
                  <span className="text-sm text-accent">68%</span>
                </div>
                <div className="mt-4 h-2 rounded-full bg-white/10">
                  <div className="h-2 w-2/3 rounded-full bg-gradient-to-r from-accent to-accent-deep" />
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-200">
                <TrendingUp className="h-4 w-4 text-accent" />
                <span>Interactive modules calibrated for analytical progression</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-200">
                <LockKeyhole className="h-4 w-4 text-accent" />
                <span>{lockedCount} modules are locked until the level is fully unlocked</span>
              </div>
              {level.access === "Paid" ? <PaymentModal triggerLabel="Unlock this level" title={`Unlock ${level.title}`} /> : null}
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="light-panel p-8">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-accent-deep">Topics Covered</p>
              <div className="mt-5 space-y-3">
                {level.topics.map((topic) => (
                  <div key={topic} className="rounded-[18px] border border-slate-200 px-4 py-4 text-sm text-slate-700">
                    {topic}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-accent-deep">Interactive Modules</p>
              <div className="mt-5 grid gap-4">
                {level.modules.map((module) => (
                  <ModuleCard key={module.title} {...module} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell mt-10">
        <QuizInterface />
      </section>
    </div>
  );
}
