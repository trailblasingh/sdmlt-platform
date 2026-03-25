import Link from "next/link";
import { ArrowUpRight, BrainCircuit, BriefcaseBusiness, ChartSpline, CircleDot, LockKeyhole } from "lucide-react";
import type { Level } from "@/lib/content";
import { cn } from "@/lib/utils";

const levelThemes: Record<string, { icon: typeof BrainCircuit; accent: string; tint: string; border: string }> = {
  foundations: {
    icon: BrainCircuit,
    accent: "text-sky-200",
    tint: "from-sky-400/16 via-sky-200/4 to-transparent",
    border: "group-hover:border-sky-300/35"
  },
  "problem-solving": {
    icon: ChartSpline,
    accent: "text-blue-200",
    tint: "from-blue-400/16 via-blue-200/4 to-transparent",
    border: "group-hover:border-blue-300/35"
  },
  "decision-frameworks": {
    icon: CircleDot,
    accent: "text-cyan-200",
    tint: "from-cyan-400/16 via-cyan-200/4 to-transparent",
    border: "group-hover:border-cyan-300/35"
  },
  "case-studies": {
    icon: BriefcaseBusiness,
    accent: "text-indigo-200",
    tint: "from-indigo-400/16 via-indigo-200/4 to-transparent",
    border: "group-hover:border-indigo-300/35"
  }
};

export function LevelCard({ level }: { level: Level }) {
  const theme = levelThemes[level.id];
  const Icon = theme.icon;

  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-[30px] border border-white/10 bg-[#091523] p-6 transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_28px_70px_rgba(3,10,18,0.34)]",
        theme.border
      )}
    >
      <div className={cn("pointer-events-none absolute inset-0 bg-gradient-to-br opacity-100", theme.tint)} />
      <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/18 to-transparent" />
      <div className="relative flex h-full flex-col">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-4">
            <div className={cn("flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05]", theme.accent)}>
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-brand-slate">{level.number}</p>
              <h3 className="mt-3 font-display text-[28px] leading-tight text-white">{level.title}</h3>
            </div>
          </div>
          <div className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-slate-200">
            {level.access === "Free" ? "Open" : "Paid"}
          </div>
        </div>

        <p className="relative mt-5 text-sm leading-7 text-slate-300">{level.description}</p>

        <div className="relative mt-6 space-y-3">
          {level.topics.slice(0, 3).map((topic) => (
            <div key={topic} className="flex items-start gap-3 text-sm leading-6 text-white/92">
              <span className={cn("mt-2 h-1.5 w-1.5 rounded-full", theme.accent.replace("text-", "bg-"))} />
              <span>{topic}</span>
            </div>
          ))}
        </div>

        <div className="relative mt-7 flex items-center justify-between border-t border-white/10 pt-5">
          <div className="flex items-center gap-2 text-sm text-slate-300">
            <LockKeyhole className="h-4 w-4" />
            <span>{level.duration}</span>
          </div>
          <Link
            href={`/levels/${level.id}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-white transition group-hover:translate-x-0.5"
          >
            Explore Level
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
