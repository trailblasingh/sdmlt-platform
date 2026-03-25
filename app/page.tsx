import { ArrowRight, BadgeCheck, BrainCircuit, BriefcaseBusiness, ChartColumnIncreasing, ChevronRight, ShieldCheck } from "lucide-react";
import { LevelCard } from "@/components/level-card";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { credibility, levels } from "@/lib/content";

const principles = [
  {
    title: "Logic before intuition",
    description: "Learn to inspect assumptions, separate signals from noise, and structure reasoning before reaching for an answer.",
    icon: BrainCircuit
  },
  {
    title: "Frameworks that clarify",
    description: "Use disciplined thinking tools to simplify ambiguous problems, compare options, and move toward better decisions.",
    icon: ChartColumnIncreasing
  },
  {
    title: "Cases that feel real",
    description: "Apply structured thought to CAT-style sets, business trade-offs, and strategic decisions that resemble actual work.",
    icon: BriefcaseBusiness
  }
];

const platformSignals = [
  "Built for MBA aspirants, analysts, consultants, and founders",
  "Level 1 is free. Levels 2 to 4 unlock advanced decision training",
  "Minimal interface, strong prompts, and case-first progression"
];

export default function HomePage() {
  return (
    <div className="pb-28">
      <section className="section-shell pt-16 sm:pt-24 lg:pt-28">
        <div className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <div className="space-y-9">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-slate-200">
              <ShieldCheck className="h-4 w-4 text-accent" />
              School of Decision Thinking
            </div>
            <div className="space-y-6">
              <h1 className="max-w-5xl font-display text-5xl leading-[0.96] text-white text-balance sm:text-6xl lg:text-7xl">
                Learn how to think, not what to think
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
                Train decision-making from logic and structured problem solving to frameworks, risk judgment,
                and real-world business cases.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button href="/login" className="gap-2">
                Start Learning
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button href="/levels" variant="secondary" className="gap-2">
                Explore Levels
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid max-w-3xl gap-3 sm:grid-cols-3">
              {platformSignals.map((item) => (
                <div key={item} className="rounded-[24px] border border-white/10 bg-white/[0.05] px-4 py-4 text-sm leading-6 text-slate-200">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="panel overflow-hidden p-4 sm:p-6">
            <div className="rounded-[30px] border border-white/10 bg-[radial-gradient(circle_at_top_right,_rgba(126,200,255,0.18),_transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-6 sm:p-7">
              <div className="flex items-center justify-between border-b border-white/10 pb-5">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-accent">Decision Studio</p>
                  <h2 className="mt-3 font-display text-2xl leading-tight text-white sm:text-3xl">
                    Structured thinking for serious learners
                  </h2>
                </div>
                <div className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-slate-200">
                  Premium Track
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div className="rounded-[24px] border border-white/10 bg-[#0b1726] p-5 sm:p-6">
                  <p className="text-sm text-slate-300">Created by Vikash Singh</p>
                  <p className="mt-3 font-display text-3xl leading-tight text-white">IIM Bangalore | 14+ years experience</p>
                  <p className="mt-4 max-w-lg text-sm leading-7 text-slate-300">
                    Built to help ambitious thinkers move from fast answers to disciplined reasoning, stronger frameworks, and cleaner judgment.
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-[24px] border border-white/10 bg-white/[0.05] p-5">
                    <p className="text-xs uppercase tracking-[0.26em] text-accent">Inputs</p>
                    <p className="mt-4 text-lg leading-7 text-white">Logic drills, framework sessions, timer-based sets, and business cases</p>
                  </div>
                  <div className="rounded-[24px] border border-white/10 bg-white/[0.05] p-5">
                    <p className="text-xs uppercase tracking-[0.26em] text-accent">Outcome</p>
                    <p className="mt-4 text-lg leading-7 text-white">More clarity under pressure and better structure in real decisions</p>
                  </div>
                </div>

                <div className="rounded-[24px] border border-white/10 bg-white/[0.05] p-5">
                  <div className="flex items-center justify-between text-sm text-slate-300">
                    <span>Program progression</span>
                    <span className="text-accent">4 levels</span>
                  </div>
                  <div className="mt-4 h-2 rounded-full bg-white/10">
                    <div className="h-2 w-3/4 rounded-full bg-gradient-to-r from-accent via-sky-300 to-accent-deep" />
                  </div>
                  <div className="mt-4 grid grid-cols-4 gap-2 text-[11px] uppercase tracking-[0.18em] text-slate-400">
                    <span>Logic</span>
                    <span>Structure</span>
                    <span>Decision</span>
                    <span>Cases</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell mt-16">
        <div className="grid gap-3 rounded-[32px] border border-white/10 bg-white/[0.05] p-4 sm:grid-cols-3 sm:p-5">
          {credibility.map((item) => (
            <div key={item} className="rounded-[24px] border border-white/10 bg-[#0a1523] px-5 py-4 text-sm leading-6 text-slate-200">
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="section-shell mt-28">
        <SectionHeading
          eyebrow="Levels"
          title="A four-level progression from raw logic to real business judgment"
          description="Each level is designed as a distinct stage in analytical maturity. You begin with mental discipline, move into problem solving, then decision frameworks, and finally real-world cases."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
          {levels.map((level) => (
            <LevelCard key={level.id} level={level} />
          ))}
        </div>
      </section>

      <section className="section-shell mt-28">
        <div className="grid gap-10 lg:grid-cols-[0.84fr_1.16fr]">
          <div>
            <SectionHeading
              eyebrow="Philosophy"
              title="This is not an information product. It is a training ground for thought."
              description="SDMLT is built around one idea: serious thinkers improve when they practice framing, decomposition, comparison, and judgment in a structured environment."
            />
          </div>
          <div className="grid gap-4">
            {principles.map((item) => {
              const Icon = item.icon;

              return (
                <div key={item.title} className="light-panel flex gap-5 p-6 sm:p-7">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-[30px] leading-tight text-slate-950">{item.title}</h3>
                    <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-shell mt-28 pb-8">
        <div className="panel overflow-hidden p-8 sm:p-10 lg:p-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.92fr] lg:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-accent">Begin With Intent</p>
              <h2 className="mt-4 max-w-3xl font-display text-4xl leading-tight text-white sm:text-5xl">
                Start with Foundations. Build the quality of thinking that carries into every harder problem.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300">
                For students, analysts, consultants, and founders, the value is the same: cleaner logic, better framing, and more reliable decisions when the answer is not obvious.
              </p>
            </div>
            <div className="space-y-4">
              {[
                "Level 1 opens the platform with core reasoning and assumption work.",
                "Level 2 to 4 move into structured solving, decision frameworks, and business cases.",
                "The interface stays minimal so attention remains on the thinking itself."
              ].map((item) => (
                <div key={item} className="flex gap-3 rounded-[24px] border border-white/10 bg-white/[0.05] px-5 py-4 text-sm leading-6 text-slate-200">
                  <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <span>{item}</span>
                </div>
              ))}
              <div className="flex flex-wrap gap-3 pt-2">
                <Button href="/login">Start Learning</Button>
                <Button href="/levels" variant="secondary">
                  Explore Levels
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
