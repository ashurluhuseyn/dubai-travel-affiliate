import { Container } from "@/components/shared/container";
import { ExperienceCard } from "@/components/shared/experience-card";
import { SectionHeader } from "@/components/shared/section-header";
import { destinations } from "@/lib/data/home";

export function FeaturedDestinations() {
  return (
    <section id="destinations" className="py-section scroll-mt-24">
      <Container>
        <SectionHeader
          label="Destinations"
          title="Iconic districts of Dubai"
          description="From palm-fringed resorts to heritage quarters — each neighborhood tells a different story of luxury."
          href="#"
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {destinations.map((item, index) => (
            <div
              key={item.id}
              className="animate-in fade-in slide-in-from-bottom-6 fill-mode-both duration-700"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ExperienceCard item={item} priority={index === 0} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
