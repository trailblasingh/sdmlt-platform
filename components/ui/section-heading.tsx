type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
  invert?: boolean;
};

export function SectionHeading({ eyebrow, title, description, invert }: SectionHeadingProps) {
  return (
    <div className="space-y-4">
      <p className={`text-xs font-semibold uppercase tracking-[0.3em] ${invert ? "text-accent-deep" : "text-accent"}`}>
        {eyebrow}
      </p>
      <h2 className={`max-w-3xl font-display text-3xl leading-tight sm:text-4xl ${invert ? "text-slate-950" : "text-white"}`}>
        {title}
      </h2>
      <p className={`max-w-2xl text-base leading-7 ${invert ? "text-slate-600" : "text-slate-300"}`}>{description}</p>
    </div>
  );
}
