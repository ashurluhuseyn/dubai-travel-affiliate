import { Container } from "@/components/shared/container";
import { GuideCard } from "@/components/shared/guide-card";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeader } from "@/components/shared/section-header";
import { latestGuides } from "@/data";

export function LatestGuides() {
  return (
    <section id="guides" className="scroll-mt-24 py-section">
      <Container>
        <SectionHeader
          label="Journal"
          title="Latest Stories"
          description="Insider stories, itineraries, and editorial picks from our team."
          href="#"
          linkLabel="Read the journal"
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {latestGuides.map((guide, index) => (
            <Reveal key={guide.id} delay={index * 80}>
              <GuideCard guide={guide} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
