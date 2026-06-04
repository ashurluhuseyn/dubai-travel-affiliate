import type { Metadata } from "next";
import { Compass } from "lucide-react";

import { RelatedExperiences } from "@/components/experience/related-experiences";
import { FeaturedHiddenGemSection } from "@/components/hidden-gems/featured-hidden-gem";
import { HiddenGemCategories } from "@/components/hidden-gems/hidden-gem-categories";
import { HiddenGemsGrid } from "@/components/hidden-gems/hidden-gems-grid";
import { HiddenGemsHero } from "@/components/hidden-gems/hidden-gems-hero";
import { HiddenGemsMap } from "@/components/hidden-gems/hidden-gems-map";
import { LocalTips } from "@/components/hidden-gems/local-tips";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { ContactCta } from "@/components/shared/contact-cta";
import { Section } from "@/components/shared/section";
import { getHiddenGemsRelated } from "@/data";
import { createPageMetadata } from "@/lib/site";

export const metadata: Metadata = createPageMetadata({
  title: "Hidden Gems in Dubai",
  description:
    "Discover secret beaches, local cafés, cultural corners, and unforgettable places most tourists never find. Curated hidden gems and local tips across Dubai.",
  path: "/hidden-gems",
});

export default function HiddenGemsPage() {
  const related = getHiddenGemsRelated();

  return (
    <>
      <Header />
      <main>
        <HiddenGemsHero />
        <FeaturedHiddenGemSection />
        <HiddenGemsGrid />
        <HiddenGemCategories />
        <LocalTips />
        <HiddenGemsMap />

        <Section>
          <RelatedExperiences
            experiences={related}
            title="Related Experiences"
          />
        </Section>

        <Section>
          <ContactCta
            icon={Compass}
            title="Want the local Dubai experience?"
            description="Get curated hidden spots, local tips and unique experiences selected for curious travelers."
            actionLabel="Get the Hidden Gems Guide"
            actionHref="#"
          />
        </Section>
      </main>
      <Footer />
    </>
  );
}
