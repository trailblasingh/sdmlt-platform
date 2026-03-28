import { notFound } from "next/navigation";
import { getCaseDetail, getCasesForLevel } from "@/lib/cases";

export async function generateStaticParams() {
  const cases = await getCasesForLevel("case-studies");
  return cases.map((item) => ({ caseName: encodeURIComponent(item.case_name) }));
}

export default async function CaseDetailPage({ params }: { params: Promise<{ caseName: string }> }) {
  const { caseName } = await params;
  const { caseRecord, questions } = await getCaseDetail(caseName);

  if (!caseRecord) {
    notFound();
  }

  return (
    <div className="section-shell py-16 pb-24">
      <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr]">
        <div className="space-y-5">
          <p className="text-xs uppercase tracking-[0.3em] text-accent">Case Detail</p>
          <h1 className="font-display text-5xl text-white">{caseRecord.case_name}</h1>
          <p className="text-lg leading-8 text-slate-300">{caseRecord.short_description}</p>
        </div>
        <div className="space-y-6">
          {questions.map((question, index) => (
            <div key={question.prompt} className="light-panel p-7">
              <p className="text-xs uppercase tracking-[0.28em] text-accent-deep">Question {index + 1}</p>
              <p className="mt-4 text-base leading-7 text-slate-900">{question.prompt}</p>
              <div className="mt-5 grid gap-3">
                {question.options.map((option, optionIndex) => (
                  <div
                    key={option}
                    className={`rounded-[20px] border px-4 py-4 text-sm ${optionIndex === question.correct_index ? "border-slate-950 bg-slate-950 text-white" : "border-slate-200 text-slate-700"}`}
                  >
                    {option}
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-[20px] border border-slate-200 bg-white px-5 py-5">
                <p className="text-xs uppercase tracking-[0.26em] text-accent-deep">Analysis</p>
                <p className="mt-4 text-sm leading-7 text-slate-700">{question.analysis}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
