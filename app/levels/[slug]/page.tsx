import { notFound } from "next/navigation";
import { Lock } from "lucide-react";
import { LevelTopicLibrary } from "@/components/level-topic-library";
import { getCurrentUser } from "@/lib/auth";
import { levelLessons, levels } from "@/lib/content";
import { getCompletedTopicsForLevel, getLearningStateForUser, isLevelUnlocked } from "@/lib/member-data";

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

  const user = await getCurrentUser();
  const lessons = levelLessons[level.id];
  const questionCount = lessons.reduce((total, topic) => total + topic.questions.length, 0);
  const learningState = user ? await getLearningStateForUser(user.id) : { purchases: [], progress: [], certificates: [] };
  const purchasedLevelCodes = learningState.purchases.map((purchase) => purchase.level);
  const unlocked = isLevelUnlocked(level.id, purchasedLevelCodes);
  const completedTopicIds = user ? getCompletedTopicsForLevel(level.id, learningState.progress) : [];
  const completionPercent = lessons.length === 0 ? 0 : Math.round((completedTopicIds.length / lessons.length) * 100);

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
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs uppercase tracking-[0.28em] text-accent">Level Structure</p>
              {!unlocked ? <Lock className="h-4 w-4 text-accent" /> : null}
            </div>
            <div className="mt-5 h-2 rounded-full bg-white/10">
              <div className="h-2 rounded-full bg-gradient-to-r from-accent to-accent-deep" style={{ width: `${completionPercent}%` }} />
            </div>
            <p className="mt-3 text-sm text-slate-300">{completionPercent}% completed</p>
            <div className="mt-5 space-y-4">
              {lessons.map((topic, index) => (
                <div key={topic.title} className="rounded-[22px] border border-white/10 bg-white/[0.05] p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.24em] text-brand-slate">Topic {index + 1}</p>
                      <p className="mt-2 text-lg text-white">{topic.title}</p>
                    </div>
                    {completedTopicIds.includes(topic.title) ? <span className="rounded-full bg-white px-3 py-1 text-xs text-ink">Done</span> : null}
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{topic.questions.length} questions</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <LevelTopicLibrary
          levelSlug={level.id}
          lessons={lessons}
          unlocked={unlocked}
          completedTopicIds={completedTopicIds}
          conceptPoints={conceptPoints}
        />
      </section>
    </div>
  );
}
