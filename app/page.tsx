import { BadgeCheck, BrainCircuit, ChartNoAxesCombined, LayoutDashboard, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { LevelCard } from "@/components/level-card";
import { PaymentModal } from "@/components/payment-modal";
import { credibility, levels, testimonials } from "@/lib/content";

export default function HomePage() {
  return (
    <div className="pb-20">
      <section className="section-shell pt-14 sm:pt-20">
        <div className="grid items-end gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200">
              <ShieldCheck className="h-4 w-4 text-accent" />
              Built for CAT thinkers, analysts, consultants, and founders
            </div>
            <div className="space-y-5">
              <h1 className="max-w-4xl font-display text-5xl leading-[1.02] text-balance sm:text-6xl lg:text-7xl">
                Learn how to think, not what to think
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-300">
                Master decision-making from logic to real-world business cases through structured drills,
                framework-based analysis, and premium case-first learning.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button href="/login">Start Learning</Button>
              <Button href="/levels" variant="secondary">
                Explore Levels
              </Button>
            </div>
            <div className="grid max-w-3xl gap-4 sm:grid-cols-3">
              {credibility.map((item) => (
                <div key={item} className="rounded-[24px] border border-white/10 bg-white/5 px-4 py-4 text-sm text-slate-200">
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="panel overflow-hidden p-6 shadow-glow">
            <div className="rounded-[26px] border border-white/10 bg-gradient-to-br from-white/10 to-transparent p-6">
              <p className="text-xs uppercase tracking-[0.28em] text-accent">Thinking Engine</p>
              <div className="mt-6 grid gap-4">
                <div className="rounded-[22px] border border-white/10 bg-[#0d1a2a] p-5">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-slate-300">Structured reasoning score</p>
                    <p className="text-sm text-accent">+24%</p>
                  </div>
                  <div className="mt-4 h-2 rounded-full bg-white/10">
                    <div className="h-2 w-3/4 rounded-full bg-gradient-to-r from-accent to-accent-deep" />
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-[22px] border border-white/10 bg-white/5 p-5">
                    <BrainCircuit className="h-6 w-6 text-accent" />
                    <p className="mt-5 text-lg font-medium text-white">Logic-first learning</p>
                    <p className="mt-2 text-sm leading-6 text-slate-300">
                      Build cognitive discipline before jumping to answers.
                    </p>
                  </div>
                  <div className="rounded-[22px] border border-white/10 bg-white/5 p-5">
                    <ChartNoAxesCombined className="h-6 w-6 text-accent" />
                    <p className="mt-5 text-lg font-medium text-white">Decision simulators</p>
                    <p className="mt-2 text-sm leading-6 text-slate-300">
                      Practice under constraints with time pressure and trade-offs.
                    </p>
                  </div>
                </div>
                <div className="rounded-[22px] border border-white/10 bg-white/5 p-5">
                  <p className="text-sm text-slate-300">Created by Vikash Singh</p>
                  <p className="mt-2 font-display text-2xl">IIM Bangalore • 14+ years experience</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell mt-24">
        <SectionHeading
          eyebrow="Levels"
          title="Four levels that move from logic to boardroom decisions"
          description="Each level advances the same core skill: thinking clearly when the problem is messy, incomplete, or high-stakes."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
          {levels.map((level) => (
            <LevelCard key={level.id} level={level} />
          ))}
        </div>
      </section>

      <section className="section-shell mt-24">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-4">
            <SectionHeading
              eyebrow="How It Works"
              title="A progression designed for real thinking, not passive consumption"
              description="Concepts are introduced only to the extent they sharpen your ability to diagnose, frame, and decide."
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              ["Step 1", "Learn concepts", "Decode the logic, frameworks, and hidden assumptions behind strong analysis."],
              ["Step 2", "Solve problems", "Use timer-based drills, MCQ/TITA modules, and evidence-based decomposition."],
              ["Step 3", "Apply to real cases", "Work through pricing, growth, risk, and operating decisions in context."],
              ["Step 4", "Get certified", "Unlock certificate issuance after completing the assessments and capstone."]
            ].map(([step, title, body]) => (
              <div key={step} className="light-panel p-6">
                <p className="text-xs uppercase tracking-[0.28em] text-accent-deep">{step}</p>
                <h3 className="mt-3 font-display text-2xl">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell mt-24 pb-24">
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="light-panel p-8">
            <SectionHeading
              eyebrow="Features"
              title="Designed like a premium thinking platform"
              description="A sharp interface is not cosmetic here. It reduces noise so the structure of the problem stands out."
              invert
            />
            <div className="mt-8 grid gap-4">
              {[
                ["Interactive problems", "MCQ and TITA flows with structured answer reveal."],
                ["Decision simulators", "Practice weighing incentives, evidence, and risk under pressure."],
                ["Case-based learning", "Bridge CAT-style logic with consulting-style business judgment."],
                ["Progress intelligence", "Track level completion, module wins, and certification readiness."]
              ].map(([title, body]) => (
                <div key={title} className="flex gap-4 rounded-[22px] border border-slate-200 p-4">
                  <BadgeCheck className="mt-1 h-5 w-5 text-accent-deep" />
                  <div>
                    <p className="font-medium text-slate-950">{title}</p>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            {testimonials.map((item) => (
              <div key={item.name} className="panel p-8">
                <p className="text-lg leading-8 text-white/90">{item.quote}</p>
                <div className="mt-6 border-t border-white/10 pt-5">
                  <p className="font-medium text-white">{item.name}</p>
                  <p className="text-sm text-slate-400">{item.role}</p>
                </div>
              </div>
            ))}
            <div className="panel flex flex-col gap-6 p-8 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-accent">Final CTA</p>
                <h3 className="mt-3 font-display text-3xl text-white">Start your decision thinking journey</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button href="/dashboard" variant="secondary">
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  View Dashboard
                </Button>
                <PaymentModal />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
