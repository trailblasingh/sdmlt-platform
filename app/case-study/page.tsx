import { caseStudy } from "@/lib/content";

export default function CaseStudyPage() {
  return (
    <div className="section-shell py-16 pb-24">
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-5">
          <p className="text-xs uppercase tracking-[0.3em] text-accent">Case Study</p>
          <h1 className="font-display text-5xl text-white">{caseStudy.title}</h1>
          <p className="text-lg leading-8 text-slate-300">{caseStudy.problem}</p>
        </div>
        <div className="space-y-6">
          <div className="light-panel p-7">
            <p className="text-xs uppercase tracking-[0.28em] text-accent-deep">Pause & Think</p>
            <p className="mt-4 text-base leading-7 text-slate-700">{caseStudy.pausePrompt}</p>
          </div>
          <div className="light-panel p-7">
            <p className="text-xs uppercase tracking-[0.28em] text-accent-deep">Options</p>
            <div className="mt-4 grid gap-3">
              {caseStudy.options.map((option) => (
                <div key={option} className="rounded-[20px] border border-slate-200 px-4 py-4 text-sm text-slate-700">
                  {option}
                </div>
              ))}
            </div>
          </div>
          <div className="light-panel p-7">
            <p className="text-xs uppercase tracking-[0.28em] text-accent-deep">Analysis</p>
            <div className="mt-4 space-y-4 text-sm leading-7 text-slate-700">
              {caseStudy.analysis.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>
          </div>
          <div className="panel p-7">
            <p className="text-xs uppercase tracking-[0.28em] text-accent">Final Solution</p>
            <p className="mt-4 text-lg leading-8 text-white">{caseStudy.solution}</p>
            <div className="mt-6 border-t border-white/10 pt-5">
              <p className="text-sm uppercase tracking-[0.26em] text-slate-400">Key Takeaways</p>
              <div className="mt-4 grid gap-3">
                {caseStudy.takeaways.map((item) => (
                  <div key={item} className="rounded-[18px] border border-white/10 bg-white/5 px-4 py-4 text-sm text-slate-200">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
