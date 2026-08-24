import { LuxuryCollectionCard } from "@/components/luxury/luxury-collection-card";
import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { SectionHeader } from "@/components/shared/section-header";
import { getSignatureCollections } from "@/data";

export function SignatureCollections() {
  const collections = getSignatureCollections();

  return (
    <Section id="collections">
      <SectionHeader
        label="Editorial Themes"
        title="Luxury Travel Inspiration"
        description="Starting points for researching Dubai's waterfront, desert, dining, and private-experience landscape."
      />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {collections.map((collection, index) => (
          <Reveal key={collection.id} delay={index * 70}>
            <LuxuryCollectionCard collection={collection} priority={index < 4} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
