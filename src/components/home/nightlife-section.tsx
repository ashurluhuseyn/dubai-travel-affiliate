import { Container } from "@/components/shared/container";
import { ExperienceCard } from "@/components/shared/experience-card";
import { SectionHeader } from "@/components/shared/section-header";
import { nightlife } from "@/lib/data/home";

export function NightlifeSection() {
  return (
    <section
      id="nightlife"
      className="border-y border-border/60 bg-luxury-charcoal/50 py-section scroll-mt-24"
    >
      <Container>
        <SectionHeader
          label="After dark"
          title="Dubai after sunset"
          description="Rooftop lounges, world-renowned clubs, and over-water dining beneath the stars."
          href="#"
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {nightlife.map((item, index) => (
            <div
              key={item.id}
              className="animate-in fade-in slide-in-from-bottom-6 fill-mode-both duration-700"
              style={{ animationDelay: `${index * 120}ms` }}
            >
              <ExperienceCard item={item} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
