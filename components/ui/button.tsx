import Link, { type LinkProps } from "next/link";
import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "ghost";
} & LinkProps;

export function Button({ children, className, variant = "primary", ...props }: ButtonProps) {
  return (
    <Link
      {...props}
      className={cn(
        "inline-flex items-center justify-center rounded-full px-5 py-3.5 text-sm font-medium transition duration-200",
        variant === "primary" &&
          "bg-white text-ink shadow-[0_12px_30px_rgba(255,255,255,0.12)] hover:-translate-y-0.5 hover:bg-mist hover:shadow-[0_18px_36px_rgba(255,255,255,0.18)]",
        variant === "secondary" &&
          "border border-white/12 bg-white/[0.06] text-white hover:-translate-y-0.5 hover:border-accent/35 hover:bg-white/[0.1]",
        variant === "ghost" && "text-slate-300 hover:text-white",
        className
      )}
    >
      {children}
    </Link>
  );
}
