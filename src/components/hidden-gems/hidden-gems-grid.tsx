import { HiddenGemCard } from "@/components/hidden-gems/hidden-gem-card";
import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { SectionHeader } from "@/components/shared/section-header";
import { getHiddenGemSpots } from "@/data";

export function HiddenGemsGrid() {
  const gems = getHiddenGemSpots();

  return (
    <Section id="gems" muted>
      <SectionHeader
        label="Curated Spots"
        title="More Hidden Gems"
        description="Local favorites and secret spots worth the detour."
        href="#"
        linkLabel="View All Gems"
      />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {gems.map((gem, index) => (
          <Reveal key={gem.id} delay={index * 60}>
            <HiddenGemCard gem={gem} priority={index < 4} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
