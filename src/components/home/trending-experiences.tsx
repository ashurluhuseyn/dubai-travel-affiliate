import { Container } from "@/components/shared/container";
import { ExperienceCard } from "@/components/shared/experience-card";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeader } from "@/components/shared/section-header";
import { trendingExperiences } from "@/data";

export function TrendingExperiences() {
  return (
    <section id="experiences" className="scroll-mt-24 py-section">
      <Container>
        <SectionHeader
          align="center"
          label="Trending Now"
          title="Trending Experiences"
          description="The most sought-after adventures, handpicked by our local curators."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {trendingExperiences.map((experience, index) => (
            <Reveal key={experience.id} delay={index * 80}>
              <ExperienceCard
                experience={experience}
                priority={index === 0}
              />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
