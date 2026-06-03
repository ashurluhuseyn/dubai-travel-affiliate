import { Container } from "@/components/shared/container";
import { ExperienceCard } from "@/components/shared/experience-card";
import { SectionHeader } from "@/components/shared/section-header";
import { hotels } from "@/lib/data/home";

export function LuxuryHotels() {
  return (
    <section
      id="hotels"
      className="border-y border-border/60 bg-luxury-charcoal/50 py-section scroll-mt-24"
    >
      <Container>
        <SectionHeader
          label="Hotels"
          title="Sanctuaries of Arabian elegance"
          description="Hand-selected properties where impeccable service meets architectural wonder."
          href="#"
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {hotels.map((item, index) => (
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
