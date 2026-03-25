import { Lock, PlayCircle, Timer } from "lucide-react";

type ModuleCardProps = {
  title: string;
  format: string;
  duration: string;
  locked: boolean;
};

export function ModuleCard({ title, format, duration, locked }: ModuleCardProps) {
  return (
    <div className="light-panel p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-accent-deep">{format}</p>
          <h3 className="font-display text-xl">{title}</h3>
        </div>
        <div className="rounded-full bg-slate-950 px-3 py-1 text-xs text-white">{locked ? "Locked" : "Unlocked"}</div>
      </div>
      <div className="mt-5 flex items-center justify-between text-sm text-slate-500">
        <div className="flex items-center gap-2">
          <Timer className="h-4 w-4" />
          <span>{duration}</span>
        </div>
        <div className="flex items-center gap-2">
          {locked ? <Lock className="h-4 w-4" /> : <PlayCircle className="h-4 w-4" />}
          <span>{locked ? "Unlock to access" : "Start module"}</span>
        </div>
      </div>
    </div>
  );
}
