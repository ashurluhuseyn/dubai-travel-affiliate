import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { PopularExperienceCard } from "@/components/categories/popular-experience-card";
import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { SectionHeader } from "@/components/shared/section-header";
import { getPopularExperiences } from "@/data";

export function PopularExperiences() {
  const experiences = getPopularExperiences();

  return (
    <Section>
      <SectionHeader
        align="center"
        label="Popular Experiences"
        title="Top Experiences in Each Category"
      />
      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
        {experiences.map((experience, index) => (
          <Reveal key={experience.id} delay={index * 60}>
            <PopularExperienceCard experience={experience} />
          </Reveal>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <Link
          href="/#experiences"
          className="group inline-flex items-center gap-2 rounded-full border border-luxury-gold-muted/40 bg-transparent px-6 py-2.5 text-sm text-luxury-gold-soft transition-luxury hover:border-luxury-gold-muted/70 hover:text-luxury-gold"
        >
          View All Experiences
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </Section>
  );
}
