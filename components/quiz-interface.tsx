"use client";

import { useMemo, useState } from "react";
import { Clock3, Eye, PauseCircle, PlayCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const answers = [
  "A. The decision tree should start with the least likely scenario.",
  "B. The first branch should separate controllable from uncontrollable variables.",
  "C. The right answer depends only on expected value."
];

export function QuizInterface() {
  const [selected, setSelected] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [paused, setPaused] = useState(true);
  const timer = useMemo(() => (paused ? "Paused at 02:15" : "Running 02:15"), [paused]);

  return (
    <div className="light-panel p-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent-deep">Interactive Module</p>
          <h3 className="mt-3 font-display text-2xl">Decision Logic Drill</h3>
        </div>
        <div className="flex items-center gap-3 text-sm text-slate-500">
          <Clock3 className="h-4 w-4" />
          <span>{timer}</span>
          <button
            onClick={() => setPaused((value) => !value)}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-2 text-slate-700"
          >
            {paused ? <PlayCircle className="h-4 w-4" /> : <PauseCircle className="h-4 w-4" />}
            {paused ? "Resume" : "Pause"}
          </button>
        </div>
      </div>
      <div className="mt-6">
        <p className="text-sm uppercase tracking-[0.26em] text-slate-400">Prompt</p>
        <p className="mt-3 max-w-3xl text-base leading-7 text-slate-700">
          A company is considering a market expansion. Before making the decision, which split creates the
          most useful first branch in a decision tree?
        </p>
      </div>
      <div className="mt-6 grid gap-3">
        {answers.map((answer) => (
          <button
            key={answer}
            onClick={() => setSelected(answer)}
            className={cn(
              "rounded-2xl border px-4 py-4 text-left text-sm transition",
              selected === answer
                ? "border-accent-deep bg-blue-50 text-slate-950"
                : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
            )}
          >
            {answer}
          </button>
        ))}
      </div>
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button
          onClick={() => setShowExplanation((value) => !value)}
          className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-3 text-sm text-white"
        >
          <Eye className="h-4 w-4" />
          {showExplanation ? "Hide explanation" : "Reveal step-by-step"}
        </button>
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-3 text-sm text-slate-600">
          <PauseCircle className="h-4 w-4" />
          Pause & Think is enabled before the explanation opens
        </div>
      </div>
      {showExplanation ? (
        <div className="mt-6 rounded-[24px] bg-slate-950 p-5 text-sm leading-7 text-slate-200">
          <p className="font-medium text-white">Step 1</p>
          <p>Start with a branch that changes the strategy, not just the arithmetic.</p>
          <p className="mt-4 font-medium text-white">Step 2</p>
          <p>Controllable vs uncontrollable variables is the strongest first split because it clarifies where management can act.</p>
          <p className="mt-4 font-medium text-white">Step 3</p>
          <p>
            Expected value matters later, but the opening branch should frame the structure of the decision.
          </p>
        </div>
      ) : null}
    </div>
  );
}
