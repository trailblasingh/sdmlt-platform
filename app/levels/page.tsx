import { LevelCard } from "@/components/level-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { levels } from "@/lib/content";

export default function LevelsPage() {
  return (
    <div className="section-shell py-16 pb-24">
      <SectionHeading
        eyebrow="Curriculum"
        title="Progressive levels for disciplined reasoning and stronger judgment"
        description="The SDMLT platform is structured to mirror how analytical maturity grows: foundations first, frameworks next, real-world decisions last."
      />
      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {levels.map((level) => (
          <LevelCard key={level.id} level={level} />
        ))}
      </div>
    </div>
  );
}
