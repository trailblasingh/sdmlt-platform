"use client";

import { useState } from "react";
import { CheckCircle2, PauseCircle, XCircle } from "lucide-react";
import type { LessonQuestion } from "@/lib/content";
import { cn } from "@/lib/utils";

type QuizInterfaceProps = {
  pausePrompt: string;
  questions: LessonQuestion[];
};

export function QuizInterface({ pausePrompt, questions }: QuizInterfaceProps) {
  const [selected, setSelected] = useState<Record<number, number | null>>({});

  return (
    <div className="space-y-5">
      {questions.map((question, questionIndex) => {
        const chosen = selected[questionIndex];
        const revealed = typeof chosen === "number";

        return (
          <div key={question.prompt} className="rounded-[24px] border border-slate-200 bg-white p-5">
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent-deep">Question {questionIndex + 1}</p>
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-600">
                <PauseCircle className="h-3.5 w-3.5" />
                {pausePrompt}
              </div>
            </div>
            <p className="mt-4 text-base leading-7 text-slate-800">{question.prompt}</p>
            <div className="mt-5 grid gap-3">
              {question.options.map((option, optionIndex) => {
                const isCorrect = optionIndex === question.correctIndex;
                const isChosen = chosen === optionIndex;

                return (
                  <button
                    key={option}
                    onClick={() => setSelected((current) => ({ ...current, [questionIndex]: optionIndex }))}
                    className={cn(
                      "rounded-2xl border px-4 py-4 text-left text-sm leading-6 transition",
                      !revealed && "border-slate-200 bg-white text-slate-700 hover:border-slate-300",
                      revealed && isCorrect && "border-emerald-300 bg-emerald-50 text-emerald-900",
                      revealed && isChosen && !isCorrect && "border-rose-300 bg-rose-50 text-rose-900",
                      revealed && !isChosen && !isCorrect && "border-slate-200 bg-slate-50 text-slate-500"
                    )}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
            {revealed ? (
              <div className="mt-5 rounded-[20px] bg-slate-950 p-4 text-sm leading-7 text-slate-200">
                <div className="flex items-center gap-2 text-white">
                  {chosen === question.correctIndex ? <CheckCircle2 className="h-4 w-4 text-emerald-400" /> : <XCircle className="h-4 w-4 text-rose-400" />}
                  <span>{chosen === question.correctIndex ? "Correct" : "Pause and revise"}</span>
                </div>
                <p className="mt-3">{question.explanation}</p>
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
