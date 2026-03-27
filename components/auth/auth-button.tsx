"use client";

import Link from "next/link";
import { ArrowRight, LogOut } from "lucide-react";
import { useAuth } from "@/components/auth/auth-provider";

export function AuthButton() {
  const { user, loading, signOut } = useAuth();

  if (user) {
    return (
      <button
        onClick={() => void signOut()}
        disabled={loading}
        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-white/[0.1] disabled:opacity-70"
      >
        <LogOut className="h-4 w-4" />
        {loading ? "Signing out..." : "Logout"}
      </button>
    );
  }

  return (
    <Link
      href="/login"
      className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-2.5 text-sm font-medium text-white transition hover:border-accent hover:bg-accent/18"
    >
      Login
      <ArrowRight className="h-4 w-4" />
    </Link>
  );
}
