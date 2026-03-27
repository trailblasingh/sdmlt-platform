import Image from "next/image";
import { cn } from "@/lib/utils";

type BrandLogoProps = {
  className?: string;
  imageClassName?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  showText?: boolean;
  compact?: boolean;
};

export function BrandLogo({
  className,
  imageClassName,
  titleClassName,
  subtitleClassName,
  showText = true,
  compact = false
}: BrandLogoProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className={cn("overflow-hidden rounded-2xl bg-white", compact ? "p-1.5" : "p-2", imageClassName)}>
        <Image src="/logo.png" alt="SDMLT logo" width={compact ? 44 : 72} height={compact ? 44 : 72} className="h-auto w-auto" priority />
      </div>
      {showText ? (
        <div>
          <p className={cn("font-display text-sm uppercase tracking-[0.32em]", titleClassName ?? "text-brand-slate")}>SDMLT</p>
          <p className={cn("text-sm", subtitleClassName ?? "text-white/75")}>School of Decision Thinking</p>
        </div>
      ) : null}
    </div>
  );
}