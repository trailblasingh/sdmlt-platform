import Image from "next/image";
import { ArrowRight, BadgeCheck, BrainCircuit, BriefcaseBusiness, ChartColumnIncreasing, ChevronRight, ShieldCheck } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
import { LevelCard } from "@/components/level-card";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { levels } from "@/lib/content";

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

const founderFocus = [
  "Quantitative Aptitude, DILR & CAT Coaching",
  "Stock Valuation & Investment Strategies",
  "Company & Industry Analysis",
  "Risk Management",
  "Finance & EdTech Content Creation"
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
                  <p className="text-sm text-slate-300">Founder</p>
                  <p className="mt-3 max-w-lg font-display text-2xl leading-tight text-white sm:text-3xl">
                    Serial 99%iler in CAT (QA) | IIM Bangalore Alumnus | Educator &amp; Finance Content Creator
                  </p>
                  <p className="mt-4 max-w-lg text-sm leading-7 text-slate-300">
                    SDMLT is built to help ambitious thinkers move from fast answers to disciplined reasoning, stronger frameworks, and cleaner judgment.
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
        <div className="light-panel overflow-hidden p-6 sm:p-8 lg:p-10">
          <div className="mx-auto max-w-5xl space-y-10">
            <div className="flex flex-wrap items-center gap-4 border-b border-slate-200 pb-6">
              <BrandLogo compact showText={false} imageClassName="border border-slate-200" />
              <div className="max-w-3xl">
                <p className="text-xs uppercase tracking-[0.28em] text-accent-deep">Founder</p>
                <h2 className="mt-3 font-display text-3xl leading-tight text-slate-950 sm:text-4xl">
                  Serial 99%iler in CAT (QA) | IIM Bangalore Alumnus | Educator &amp; Finance Content Creator
                </h2>
              </div>
            </div>

            <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
              <div className="space-y-6 text-sm leading-7 text-slate-700 sm:text-base">
                <div className="space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Introduction</p>
                  <p>
                    My journey started with a passion for problem-solving and a drive to become a serial 99%iler in CAT. I turned that experience into a career in teaching - mentoring thousands of aspirants over the last 14+ years. Along the way, I authored a book on DILR and built a YouTube presence where I live-solve CAT questions, analyze mocks, and share logical shortcuts to help students maximize their scores.
                  </p>
                </div>

                <div className="space-y-3 border-t border-slate-200 pt-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Finance Transition</p>
                  <p>
                    But my story doesn&apos;t stop at CAT. Curiosity led me deeper into finance and investments, where I wanted to understand how companies are valued and how strategies are built in the markets. This pursuit took me to IIM Bangalore, where I completed the Advanced Program in Capital Markets &amp; Risk Management.
                  </p>
                  <p>
                    Since then, I&apos;ve been applying analytical rigor to stock valuation, industry analysis, investment strategies, and risk management - areas where I now create content and consult.
                  </p>
                </div>

                <div className="space-y-3 border-t border-slate-200 pt-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Dual Positioning</p>
                  <div className="space-y-3 rounded-[24px] border border-slate-200 bg-slate-50 px-5 py-5 text-slate-700">
                    <p>Education - helping students crack CAT through logic-driven learning</p>
                    <p>Finance - simplifying stock markets, valuation, and investments for a wider audience</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white">
                  <div className="relative aspect-[4/5] w-full bg-slate-100">
                    <Image
                      src="/VikashProfile.jpeg"
                      alt="Vikash Singh"
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 32rem, 100vw"
                    />
                  </div>
                  <div className="border-t border-slate-200 px-6 py-5">
                    <p className="font-display text-2xl text-slate-950">Vikash Singh</p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Educator, finance content creator, and founder of SDMLT.
                    </p>
                  </div>
                </div>

                <div className="rounded-[28px] border border-slate-200 bg-white p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Mission</p>
                  <p className="mt-4 text-base leading-8 text-slate-700">
                    Through my work as a content creator, my mission is to make finance accessible and empower people to make smarter investment decisions.
                  </p>
                </div>

                <div className="rounded-[28px] border border-slate-200 bg-white p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Key Focus Areas</p>
                  <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-700 sm:text-base">
                    {founderFocus.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent-deep" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-[28px] border border-slate-200 bg-white p-6">
                  <p className="text-base leading-8 text-slate-700">
                    Always open to collaborations, consulting opportunities, and speaking engagements in education and finance.
                  </p>
                  <p className="mt-5 border-t border-slate-200 pt-5 text-base leading-8 text-slate-950">
                    SDMLT is built to help ambitious thinkers move from fast answers to disciplined reasoning, stronger frameworks, and cleaner judgment.
                  </p>
                </div>
              </div>
            </div>
          </div>
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