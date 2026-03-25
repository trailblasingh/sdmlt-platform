import Link from "next/link";
import { ArrowUpRight, Award, CheckCircle2, Lock } from "lucide-react";
import { dashboardStats, levels } from "@/lib/content";

export default function DashboardPage() {
  return (
    <div className="section-shell py-16 pb-24">
      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-6">
          <div className="panel p-8">
            <p className="text-xs uppercase tracking-[0.3em] text-accent">Dashboard</p>
            <h1 className="mt-4 font-display text-4xl text-white">Welcome back, Aarav</h1>
            <p className="mt-3 max-w-xl text-base leading-7 text-slate-300">
              Your current focus is Level 3. Keep momentum on decision trees and risk framing to unlock the
              final case certification.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {dashboardStats.map((stat) => (
              <div key={stat.label} className="light-panel p-6">
                <p className="text-sm text-slate-500">{stat.label}</p>
                <p className="mt-3 font-display text-3xl">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="light-panel p-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-accent-deep">Progress by Level</p>
              <h2 className="mt-3 font-display text-3xl">Structured progression</h2>
            </div>
            <Link href="/levels" className="inline-flex items-center gap-2 text-sm font-medium text-slate-950">
              Open curriculum
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-8 space-y-4">
            {levels.map((level, index) => {
              const completed = index === 0;
              const inProgress = index === 2;

              return (
                <div key={level.id} className="rounded-[24px] border border-slate-200 p-5">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.26em] text-accent-deep">{level.number}</p>
                      <h3 className="mt-2 font-display text-2xl">{level.title}</h3>
                    </div>
                    <div className="rounded-full bg-slate-950 px-3 py-1 text-xs text-white">
                      {completed ? "Completed" : inProgress ? "In Progress" : level.access}
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-3 text-sm text-slate-500">
                    {completed ? <CheckCircle2 className="h-4 w-4" /> : inProgress ? <Award className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
                    <span>{completed ? "All assessments submitted" : inProgress ? "2 modules left in this level" : "Unlock required"}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
