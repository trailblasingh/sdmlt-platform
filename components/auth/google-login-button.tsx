"use client";

import { Chrome } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/components/auth/auth-provider";

type GoogleLoginButtonProps = {
  nextPath?: string;
};

export function GoogleLoginButton({ nextPath = "/dashboard" }: GoogleLoginButtonProps) {
  const { loading, configured, signInWithGoogle } = useAuth();
  const [message, setMessage] = useState<string | null>(null);

  async function handleClick() {
    setMessage(null);
    try {
      await signInWithGoogle(nextPath);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to start Google sign in.");
    }
  }

  return (
    <div>
      <button
        onClick={() => void handleClick()}
        disabled={loading || !configured}
        className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-70"
      >
        <Chrome className="h-4 w-4" />
        {loading ? "Redirecting to Google..." : configured ? "Continue with Google" : "Supabase auth not configured"}
      </button>
      {message ? <p className="mt-3 text-sm text-rose-600">{message}</p> : null}
    </div>
  );
}
