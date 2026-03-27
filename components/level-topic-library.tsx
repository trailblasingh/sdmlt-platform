"use client";

import { useMemo, useState } from "react";
import { BookOpenText, ChevronDown, Lock, Sparkles } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
import type { LessonTopic } from "@/lib/content";
import { QuizInterface } from "@/components/quiz-interface";
import { TopicCompleteButton } from "@/components/topic-complete-button";
import { UnlockLevelButton } from "@/components/unlock-level-button";

type LevelTopicLibraryProps = {
  levelSlug: string;
  lessons: LessonTopic[];
  unlocked: boolean;
  completedTopicIds: string[];
  conceptPoints: Record<string, string[]>;
};

export function LevelTopicLibrary({ levelSlug, lessons, unlocked, completedTopicIds, conceptPoints }: LevelTopicLibraryProps) {
  const [isUnlocked, setIsUnlocked] = useState(unlocked);
  const [completed, setCompleted] = useState<string[]>(completedTopicIds);

  const progress = useMemo(() => {
    if (lessons.length === 0) return 0;
    return Math.round((completed.length / lessons.length) * 100);
  }, [completed.length, lessons.length]);

  return (
    <div className="light-panel p-8">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-accent-deep">Topic Library</p>
          <h2 className="mt-3 font-display text-3xl text-slate-950">Learn the concept, then solve the questions</h2>
        </div>
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-600">
            <Sparkles className="h-4 w-4" />
            {isUnlocked ? "Open any topic to study and practice" : "Preview the structure of this level"}
          </div>
          <div className="min-w-48">
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-slate-500">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="mt-2 h-2 rounded-full bg-slate-200">
              <div className="h-2 rounded-full bg-slate-950 transition-all" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 space-y-4">
        {lessons.map((topic) => {
          const topicId = topic.title;
          const isCompleted = completed.includes(topicId);

          return (
            <details key={topic.title} className="group overflow-hidden rounded-[26px] border border-slate-200 bg-slate-50/80 open:bg-white">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 marker:hidden">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-accent-deep">{topic.questions.length} Questions</p>
                  <h3 className="mt-2 font-display text-2xl text-slate-950">{topic.title}</h3>
                </div>
                <div className="flex items-center gap-3">
                  {!isUnlocked ? <Lock className="h-4 w-4 text-slate-500" /> : null}
                  <ChevronDown className="h-5 w-5 text-slate-500 transition group-open:rotate-180" />
                </div>
              </summary>
              <div className="border-t border-slate-200 px-5 py-5">
                <div className="relative">
                  <div className={!isUnlocked ? "pointer-events-none select-none blur-[6px]" : undefined}>
                    <div className="rounded-[22px] border border-slate-200 bg-white p-5">
                      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.26em] text-accent-deep">
                        <BookOpenText className="h-4 w-4" />
                        Concept
                      </div>
                      <h4 className="mt-4 font-display text-2xl text-slate-950">{topic.title}</h4>
                      <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-700">
                        {(conceptPoints[topic.title] ?? [topic.summary]).map((point) => (
                          <li key={point} className="flex gap-3">
                            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent-deep" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-5 rounded-[22px] border border-slate-200 bg-white p-5">
                      <p className="text-xs font-semibold uppercase tracking-[0.26em] text-accent-deep">Pause & Think</p>
                      <p className="mt-4 text-sm leading-7 text-slate-700">{topic.pausePrompt}</p>
                    </div>

                    <div className="mt-5">
                      <QuizInterface pausePrompt={topic.pausePrompt} questions={topic.questions} />
                    </div>

                    <TopicCompleteButton
                      levelSlug={levelSlug}
                      topicId={topicId}
                      completed={isCompleted}
                      onCompleted={() => setCompleted((current) => (current.includes(topicId) ? current : [...current, topicId]))}
                    />
                  </div>

                  {!isUnlocked ? (
                    <div className="absolute inset-0 flex items-center justify-center rounded-[24px] bg-slate-950/30 p-4">
                      <div className="max-w-md rounded-[24px] border border-white/10 bg-[#081321] p-6 text-center text-white shadow-xl">
                        <div className="mx-auto flex justify-center">
                          <BrandLogo compact showText={false} imageClassName="border border-white/10" />
                        </div>
                        <div className="mx-auto mt-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] text-accent">
                          <Lock className="h-5 w-5" />
                        </div>
                        <h4 className="mt-4 font-display text-2xl">Unlock this level to access content and questions</h4>
                        <p className="mt-3 text-sm leading-6 text-slate-300">
                          Purchase this level to open the concept notes, save progress, complete topics, and generate the certificate once you finish.
                        </p>
                        <UnlockLevelButton levelSlug={levelSlug} onUnlocked={() => setIsUnlocked(true)} />
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </details>
          );
        })}
      </div>
    </div>
  );
}