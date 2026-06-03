import { Container } from "@/components/shared/container";
import { ExperienceCard } from "@/components/shared/experience-card";
import { SectionHeader } from "@/components/shared/section-header";
import { tours } from "@/lib/data/home";

export function ToursSection() {
  return (
    <section id="tours" className="py-section scroll-mt-24">
      <Container>
        <SectionHeader
          label="Experiences"
          title="Curated tours & private journeys"
          description="Desert safaris, yacht charters, and aerial adventures — tailored to your pace."
          href="#"
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tours.map((item, index) => (
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
