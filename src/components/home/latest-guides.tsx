import { GuideCard } from "@/components/shared/guide-card";
import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { SectionHeader } from "@/components/shared/section-header";
import { getLatestGuides } from "@/data";

export function LatestGuides() {
  const latestGuides = getLatestGuides();

  return (
    <Section id="guides">
      <SectionHeader
        label="Journal"
        title="Latest Stories"
        description="Insider stories, itineraries, and editorial picks from our team."
        href="/blog"
        linkLabel="Read the journal"
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {latestGuides.map((guide, index) => (
          <Reveal key={guide.id} delay={index * 80}>
            <GuideCard guide={guide} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
