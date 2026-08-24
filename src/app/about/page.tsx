import type { Metadata } from "next";

import { AboutCta } from "@/components/about/about-cta";
import { AboutHero } from "@/components/about/about-hero";
import { OurMission } from "@/components/about/our-mission";
import { OurStory } from "@/components/about/our-story";
import { OurValues } from "@/components/about/our-values";
import { WhyChoose } from "@/components/about/why-choose";
import { PageLayout } from "@/components/layout/page-layout";
import { createPageMetadata } from "@/lib/site";

export const metadata: Metadata = createPageMetadata({
  title: "About Us",
  description:
    "Learn about Caspaya, an independent travel-content project creating practical and carefully researched Dubai guides.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <PageLayout>
      <AboutHero />
      <OurStory />
      <OurValues />
      <OurMission />
      <WhyChoose />
      <AboutCta />
    </PageLayout>
  );
}
