import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getCasesForLevel } from "@/lib/cases";

export default async function CasesPage() {
  const cases = await getCasesForLevel("case-studies");

  return (
    <div className="section-shell py-16 pb-24">
      <div className="max-w-3xl">
        <p className="text-xs uppercase tracking-[0.3em] text-accent">Cases</p>
        <h1 className="mt-4 font-display text-5xl text-white">Business cases built for structured judgment</h1>
        <p className="mt-5 text-lg leading-8 text-slate-300">
          Explore the case portfolio for Level 4. Each case sharpens framing, trade-off analysis, and business decision-making through focused questions and explanation.
        </p>
      </div>

      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        {cases.map((item) => (
          <Link
            key={item.case_name}
            href={`/cases/${encodeURIComponent(item.case_name)}`}
            className="light-panel rounded-[28px] p-7 transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            <p className="text-xs uppercase tracking-[0.28em] text-accent-deep">Case Study</p>
            <h2 className="mt-4 font-display text-3xl text-slate-950">{item.case_name}</h2>
            <p className="mt-4 text-sm leading-7 text-slate-700">{item.short_description}</p>
            <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-slate-950">
              Open case
              <ArrowUpRight className="h-4 w-4" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
