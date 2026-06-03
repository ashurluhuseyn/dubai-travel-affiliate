import { ExperienceCard } from "@/components/shared/experience-card";
import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { SectionHeader } from "@/components/shared/section-header";
import { getTrendingExperiences } from "@/data";

export function TrendingExperiences() {
  const trendingExperiences = getTrendingExperiences();

  return (
    <Section id="experiences">
      <SectionHeader
        align="center"
        label="Trending Now"
        title="Trending Experiences"
        description="The most sought-after adventures, handpicked by our local curators."
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {trendingExperiences.map((experience, index) => (
          <Reveal key={experience.id} delay={index * 80}>
            <ExperienceCard experience={experience} priority={index === 0} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
