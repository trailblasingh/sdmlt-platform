import { notFound } from "next/navigation";
import { BookOpenText, ChevronDown, Sparkles } from "lucide-react";
import { QuizInterface } from "@/components/quiz-interface";
import { levelLessons, levels } from "@/lib/content";

export function generateStaticParams() {
  return levels.map((level) => ({ slug: level.id }));
}

export default async function LevelDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const level = levels.find((item) => item.id === slug);

  if (!level) {
    notFound();
  }

  const lessons = levelLessons[level.id];
  const questionCount = lessons.reduce((total, topic) => total + topic.questions.length, 0);

  return (
    <div className="pb-24">
      <section className="section-shell py-16">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.28em] text-accent">{level.number}</p>
            <h1 className="font-display text-5xl text-white">{level.title}</h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-300">{level.description}</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="panel p-5">
                <p className="text-sm text-slate-300">Outcome</p>
                <p className="mt-3 text-lg leading-7 text-white">{level.outcome}</p>
              </div>
              <div className="panel p-5">
                <p className="text-sm text-slate-300">Coverage</p>
                <p className="mt-3 text-lg leading-7 text-white">{lessons.length} topics | {questionCount} questions</p>
              </div>
            </div>
          </div>
          <div className="panel p-6">
            <p className="text-xs uppercase tracking-[0.28em] text-accent">Level Structure</p>
            <div className="mt-5 space-y-4">
              {lessons.map((topic, index) => (
                <div key={topic.title} className="rounded-[22px] border border-white/10 bg-white/[0.05] p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-brand-slate">Topic {index + 1}</p>
                  <p className="mt-2 text-lg text-white">{topic.title}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{topic.questions.length} questions</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="light-panel p-8">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-5">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-accent-deep">Topic Library</p>
              <h2 className="mt-3 font-display text-3xl text-slate-950">Read the concept, then solve the questions</h2>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-600">
              <Sparkles className="h-4 w-4" />
              Open any topic to study and practice
            </div>
          </div>

          <div className="mt-8 space-y-4">
            {lessons.map((topic) => (
              <details key={topic.title} className="group overflow-hidden rounded-[26px] border border-slate-200 bg-slate-50/80 open:bg-white">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 marker:hidden">
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-accent-deep">{topic.questions.length} Questions</p>
                    <h3 className="mt-2 font-display text-2xl text-slate-950">{topic.title}</h3>
                  </div>
                  <ChevronDown className="h-5 w-5 text-slate-500 transition group-open:rotate-180" />
                </summary>
                <div className="border-t border-slate-200 px-5 py-5">
                  <div className="rounded-[22px] border border-slate-200 bg-white p-5">
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.26em] text-accent-deep">
                      <BookOpenText className="h-4 w-4" />
                      Teaching Note
                    </div>
                    <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-700">{topic.summary}</p>
                  </div>
                  <div className="mt-5">
                    <QuizInterface pausePrompt={topic.pausePrompt} questions={topic.questions} />
                  </div>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
