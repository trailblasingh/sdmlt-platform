import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200/70 bg-mist text-slate-700">
      <div className="section-shell grid gap-8 py-10 md:grid-cols-[1.3fr_0.7fr]">
        <div className="space-y-3">
          <p className="font-display text-lg text-slate-900">SDMLT</p>
          <p className="max-w-xl text-sm leading-6">
            A structured thinking platform for ambitious learners who want sharper logic, clearer decisions,
            and real-world business judgment.
          </p>
        </div>
        <div className="flex flex-col gap-2 text-sm">
          <Link href="/levels">Levels</Link>
          <Link href="/case-study">Case Study</Link>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/payment">Payments & Certificates</Link>
        </div>
      </div>
    </footer>
  );
}
