import { notFound } from "next/navigation";
import { BookOpenText, ChevronDown, Lock, Sparkles } from "lucide-react";
import { QuizInterface } from "@/components/quiz-interface";
import { levelLessons, levels } from "@/lib/content";

const conceptPoints: Record<string, string[]> = {
  "Decision Sources": [
    "Emotional decisions are fast and human, but they can become impulsive when the feeling is stronger than the evidence.",
    "Habitual decisions save time by using routine, but they often hide stale assumptions and missed alternatives.",
    "Logical decisions are slower because they gather evidence, compare options, and test reasoning before acting."
  ],
  "Logic Types": [
    "Deductive logic moves from a general rule to a necessary conclusion if the premises are true.",
    "Inductive logic builds a pattern from observations, so its conclusions are useful but never fully certain.",
    "Abductive and analogical logic help when the answer is incomplete, but they fail when alternatives or key differences are ignored."
  ],
  "Statements & Assumptions": [
    "Strong reasoning starts by separating facts from opinions instead of treating both as equal evidence.",
    "A necessary condition must be present, while a sufficient condition can complete the conclusion by itself.",
    "Hidden assumptions are often the real source of weak answers, so they must be surfaced before the conclusion is trusted."
  ],
  "Cognitive Biases": [
    "Biases are mental shortcuts that feel efficient but distort judgment in predictable ways.",
    "Anchoring, availability, and confirmation bias usually shape what we notice before we realize they are active.",
    "Better thinking comes from challenging the first number, the easiest story, and the belief we already wanted to keep."
  ],
  "Problem Framing (GAI)": [
    "Given means the explicit facts, constraints, and hard data that define the starting point.",
    "Asked means the real decision question, which is often deeper than the first version stated aloud.",
    "Implied means the hidden assumptions that quietly shape the answer unless they are examined."
  ],
  "Structured Solving": [
    "A hard problem becomes manageable when it is broken into drivers that can be tested one by one.",
    "Case-based reasoning helps because familiar structures reveal what type of answer is likely to matter.",
    "Elimination is not guessing; it is removing options that conflict with facts, constraints, or logic."
  ],
  "Data Interpretation": [
    "Data becomes dangerous when patterns are accepted before checking how the pattern was produced.",
    "Correlation, misleading averages, and aggregated views can hide the real signal if subgroup logic is ignored.",
    "A better habit is to ask what the full dataset, the base rate, and the missing observations would say."
  ],
  "Reasoning Patterns": [
    "Many difficult sets become easier once you identify whether the structure is arrangement, network, game, or flow.",
    "The surface story changes, but the constraint logic underneath is often the same across problems.",
    "Good solvers track relationships and movement carefully instead of restarting their thinking from zero each time."
  ],
  "Decision Trees": [
    "A decision tree separates what you choose from what chance decides after your choice is made.",
    "Branches make assumptions explicit, which makes trade-offs easier to explain and challenge.",
    "This framework is most useful when the decision has stages and uncertainty can be meaningfully estimated."
  ],
  "Expected Value": [
    "Expected value converts uncertain branches into one weighted average so the options can be compared cleanly.",
    "It is powerful because it disciplines judgment, but it still depends on the quality of the assumptions underneath.",
    "A high expected value is not enough if the downside is severe or the estimates are casually optimistic."
  ],
  "Risk (Known vs Unknown)": [
    "Known risks can be estimated, measured, and managed with mitigation plans and probability-based thinking.",
    "Unknown risks are harder because the event is real but the odds or impact cannot be estimated with confidence.",
    "When uncertainty becomes deeply unknowable, the goal shifts from precision to resilience, flexibility, and downside protection."
  ],
  "Personal Finance Logic": [
    "Personal finance decisions improve when they are treated as comparisons over time, not just as current monthly cash flow.",
    "Inflation, opportunity cost, and loan structure can change whether a decision is actually attractive.",
    "Discipline matters because good financial choices usually compound through consistency rather than excitement."
  ],
  "Case Orientation": [
    "A business case becomes clearer when symptoms are separated from the decision that actually has to be made.",
    "Constraints matter early because they tell you what solutions are realistic before analysis becomes too broad.",
    "The right opening move is to define the core problem, not to jump straight into recommendations."
  ],
  "Case Structuring": [
    "MECE structure prevents overlap and makes sure the case is examined in clear, non-redundant buckets.",
    "Hypothesis-driven solving keeps the analysis pointed toward what is most likely to explain the problem.",
    "Bottleneck analysis matters because one limiting factor often controls more of the outcome than the rest combined."
  ],
  "Data & Insight": [
    "In a case, numbers matter only when they change the decision, not when they are merely precise-looking.",
    "Estimation and market sizing are useful because they force the case into explicit assumptions and trade-offs.",
    "A strong metric should connect local efficiency to overall value instead of hiding strategic weakness."
  ],
  "Integrated Cases": [
    "Integrated cases require logic, structure, data, and risk to work together rather than as separate exercises.",
    "The strongest answers usually weigh flexibility, timing, and irreversibility instead of focusing on one metric alone.",
    "A mature decision is not only about being correct today; it is about preserving the best future options."
  ]
};

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
  const isLocked = level.access === "Paid";

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
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.24em] text-brand-slate">Topic {index + 1}</p>
                      <p className="mt-2 text-lg text-white">{topic.title}</p>
                    </div>
                    {isLocked ? <Lock className="h-4 w-4 text-accent" /> : null}
                  </div>
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
              <h2 className="mt-3 font-display text-3xl text-slate-950">Learn the concept, then solve the questions</h2>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-600">
              <Sparkles className="h-4 w-4" />
              {isLocked ? "Preview the structure of this level" : "Open any topic to study and practice"}
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
                  <div className="flex items-center gap-3">
                    {isLocked ? <Lock className="h-4 w-4 text-slate-500" /> : null}
                    <ChevronDown className="h-5 w-5 text-slate-500 transition group-open:rotate-180" />
                  </div>
                </summary>
                <div className="border-t border-slate-200 px-5 py-5">
                  <div className="relative">
                    <div className={isLocked ? "pointer-events-none select-none blur-[6px]" : undefined}>
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
                    </div>

                    {isLocked ? (
                      <div className="absolute inset-0 flex items-center justify-center rounded-[24px] bg-slate-950/30 p-4">
                        <div className="max-w-md rounded-[24px] border border-white/10 bg-[#081321] p-6 text-center text-white shadow-xl">
                          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] text-accent">
                            <Lock className="h-5 w-5" />
                          </div>
                          <h4 className="mt-4 font-display text-2xl">Unlock this level to access content and questions</h4>
                          <p className="mt-3 text-sm leading-6 text-slate-300">
                            You can preview the structure now. Unlocking this level reveals the concept notes, pause prompts, and practice questions.
                          </p>
                          <button className="mt-5 rounded-full bg-white px-5 py-3 text-sm font-medium text-ink">
                            Unlock Level
                          </button>
                        </div>
                      </div>
                    ) : null}
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
