"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/", label: "Home" },
  { href: "/levels", label: "Levels" },
  { href: "/case-study", label: "Case Study" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/payment", label: "Certification" }
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-ink/75 backdrop-blur-2xl">
      <div className="section-shell flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-sm font-semibold text-accent">
            SD
          </div>
          <div>
            <p className="font-display text-sm uppercase tracking-[0.32em] text-brand-slate">SDMLT</p>
            <p className="text-sm text-white/80">School of Decision Thinking</p>
          </div>
        </Link>
        <nav className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1.5 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-full px-4 py-2 text-sm text-white/70 transition hover:text-white",
                pathname === item.href && "bg-white text-ink"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/login"
          className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-2 text-sm font-medium text-white transition hover:border-accent hover:bg-accent/20"
        >
          Sign in
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </header>
  );
}

