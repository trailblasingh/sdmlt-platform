import { redirect } from "next/navigation";
import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";
import { GoogleLoginButton } from "@/components/auth/google-login-button";
import { getCurrentUser } from "@/lib/auth";

export default async function LoginPage({
  searchParams
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const user = await getCurrentUser();
  const { next } = await searchParams;
  const nextPath = next && next.startsWith("/") ? next : "/dashboard";

  if (user) {
    redirect(nextPath);
  }

  return (
    <div className="section-shell py-16 pb-24">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-[32px] border border-white/10 bg-[#081321] shadow-glow lg:grid lg:grid-cols-[0.9fr_1.1fr]">
        <div className="border-b border-white/10 bg-gradient-to-br from-accent/10 via-transparent to-transparent p-8 lg:border-b-0 lg:border-r">
          <BrandLogo imageClassName="border border-white/10" />
          <p className="mt-8 text-xs uppercase tracking-[0.3em] text-accent">Member Access</p>
          <h1 className="mt-4 font-display text-4xl text-white">Continue your decision thinking practice</h1>
          <p className="mt-4 text-base leading-7 text-slate-300">
            Sign in to unlock paid levels, save topic progress, access your dashboard, and generate certificates as you complete each stage.
          </p>
        </div>
        <div className="bg-white p-8 text-slate-900">
          <div className="space-y-5">
            <div>
              <p className="text-sm font-medium">Preferred sign-in</p>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Use Google login to start learning, track progress, and unlock purchased levels across devices.
              </p>
            </div>
            <GoogleLoginButton nextPath={nextPath} />
          </div>
          <div className="mt-6 flex items-center justify-between text-sm text-slate-500">
            <span>Want to review the curriculum first?</span>
            <Link href="/levels" className="font-medium text-slate-950">
              Explore levels
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}