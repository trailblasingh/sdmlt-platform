import Link from "next/link";
import { ArrowUpRight, LockKeyhole, Sparkles } from "lucide-react";
import type { Level } from "@/lib/content";

export function LevelCard({ level }: { level: Level }) {
  return (
    <article className="panel p-6 shadow-glow">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.26em] text-accent">{level.number}</p>
          <h3 className="mt-3 font-display text-2xl text-white">{level.title}</h3>
        </div>
        <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200">
          {level.access === "Free" ? "Open Access" : "Certification Unlock"}
        </div>
      </div>
      <p className="mt-4 text-sm leading-6 text-slate-300">{level.description}</p>
      <div className="mt-6 space-y-3">
        {level.topics.slice(0, 3).map((topic) => (
          <div key={topic} className="flex items-center gap-3 text-sm text-white/90">
            <Sparkles className="h-4 w-4 text-accent" />
            <span>{topic}</span>
          </div>
        ))}
      </div>
      <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-5">
        <div className="flex items-center gap-2 text-sm text-slate-300">
          <LockKeyhole className="h-4 w-4" />
          <span>{level.duration}</span>
        </div>
        <Link href={`/levels/${level.id}`} className="inline-flex items-center gap-2 text-sm font-medium text-white">
          Explore
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
