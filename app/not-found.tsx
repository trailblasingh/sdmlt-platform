import Link from "next/link";

export default function NotFound() {
  return (
    <div className="section-shell py-24 text-center">
      <p className="text-xs uppercase tracking-[0.3em] text-accent">404</p>
      <h1 className="mt-4 font-display text-5xl text-white">This page fell outside the decision tree</h1>
      <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-300">
        The route you are looking for does not exist, but the main learning paths are available below.
      </p>
      <div className="mt-8 flex justify-center gap-4">
        <Link href="/" className="rounded-full bg-white px-5 py-3 text-sm font-medium text-ink">
          Go home
        </Link>
        <Link href="/levels" className="rounded-full border border-white/10 px-5 py-3 text-sm font-medium text-white">
          View levels
        </Link>
      </div>
    </div>
  );
}
