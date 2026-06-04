import { LuxuryExperienceCard } from "@/components/luxury/luxury-experience-card";
import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { SectionHeader } from "@/components/shared/section-header";
import { getTopLuxuryExperiences } from "@/data";

export function TopLuxuryExperiences() {
  const experiences = getTopLuxuryExperiences();

  return (
    <Section id="experiences">
      <SectionHeader
        label="Most Requested"
        title="Top Luxury Experiences"
        description="The experiences our concierge team books most for discerning travelers."
        href="#collections"
        linkLabel="View All"
      />
      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
        {experiences.map((experience, index) => (
          <Reveal key={experience.id} delay={index * 60}>
            <LuxuryExperienceCard experience={experience} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
