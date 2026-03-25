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
        "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-medium transition",
        variant === "primary" && "bg-white text-ink hover:bg-mist",
        variant === "secondary" && "border border-white/15 bg-white/5 text-white hover:bg-white/10",
        variant === "ghost" && "text-slate-300 hover:text-white",
        className
      )}
    >
      {children}
    </Link>
  );
}
