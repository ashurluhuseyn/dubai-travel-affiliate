import { HiddenGemCard } from "@/components/hidden-gems/hidden-gem-card";
import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { SectionHeader } from "@/components/shared/section-header";
import { getHiddenGemSpots } from "@/data";
import { matchesSearchQuery } from "@/lib/search";

type HiddenGemsGridProps = {
  searchQuery?: string;
};

export function HiddenGemsGrid({ searchQuery = "" }: HiddenGemsGridProps) {
  const gems = getHiddenGemSpots().filter((gem) =>
    matchesSearchQuery(searchQuery, [
      gem.title,
      gem.description,
      gem.location,
      gem.badge,
    ])
  );

  return (
    <Section id="gems" muted>
      <SectionHeader
        label="Places to Research"
        title="More Dubai Places"
        description="A visual directory of places being reviewed for future editorial guides."
      />
      {gems.length === 0 ? (
        <p
          role="status"
          className="rounded-xl border border-border/60 bg-card px-5 py-8 text-center text-sm text-muted-foreground"
        >
          {searchQuery.trim()
            ? `No hidden gems found for "${searchQuery.trim()}". Try a different keyword.`
            : "No hidden gems found."}
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {gems.map((gem, index) => (
            <Reveal key={gem.id} delay={index * 60}>
              <HiddenGemCard gem={gem} priority={index < 4} />
            </Reveal>
          ))}
        </div>
      )}
    </Section>
  );
}
