import Link from "next/link";

export default function AuthCodeErrorPage() {
  return (
    <div className="section-shell py-20 pb-24">
      <div className="mx-auto max-w-2xl rounded-[30px] border border-white/10 bg-[#081321] p-8 text-white shadow-glow">
        <p className="text-xs uppercase tracking-[0.28em] text-accent">Authentication Error</p>
        <h1 className="mt-4 font-display text-4xl">We could not complete your sign in</h1>
        <p className="mt-4 text-base leading-7 text-slate-300">
          Please try the Google login flow again. If this continues, verify your Supabase and Google OAuth redirect settings.
        </p>
        <Link href="/login" className="mt-6 inline-flex rounded-full bg-white px-5 py-3 text-sm font-medium text-ink">
          Return to Login
        </Link>
      </div>
    </div>
  );
}
