import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="section-shell py-16 pb-24">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-[32px] border border-white/10 bg-[#081321] shadow-glow lg:grid lg:grid-cols-[0.9fr_1.1fr]">
        <div className="border-b border-white/10 bg-gradient-to-br from-accent/10 via-transparent to-transparent p-8 lg:border-b-0 lg:border-r">
          <p className="text-xs uppercase tracking-[0.3em] text-accent">Member Access</p>
          <h1 className="mt-4 font-display text-4xl text-white">Continue your decision thinking practice</h1>
          <p className="mt-4 text-base leading-7 text-slate-300">
            Sign in to resume modules, access paid levels, track your streak, and issue certificates after
            completion.
          </p>
        </div>
        <div className="bg-white p-8 text-slate-900">
          <form className="space-y-5">
            <div>
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-accent-deep"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-accent-deep"
              />
            </div>
            <button className="w-full rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white">
              Sign in
            </button>
          </form>
          <div className="mt-6 flex items-center justify-between text-sm text-slate-500">
            <span>New to SDMLT?</span>
            <Link href="/payment" className="font-medium text-slate-950">
              View plans
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
