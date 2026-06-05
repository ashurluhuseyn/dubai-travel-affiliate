import type { Metadata } from "next";

import { AboutCta } from "@/components/about/about-cta";
import { AboutHero } from "@/components/about/about-hero";
import { AboutStats } from "@/components/about/about-stats";
import { OurMission } from "@/components/about/our-mission";
import { OurStory } from "@/components/about/our-story";
import { OurValues } from "@/components/about/our-values";
import { WhyChoose } from "@/components/about/why-choose";
import { PageLayout } from "@/components/layout/page-layout";
import { createPageMetadata } from "@/lib/site";

export const metadata: Metadata = createPageMetadata({
  title: "About Us",
  description:
    "Learn how Dubai Moments helps travelers discover exceptional Dubai experiences — built on local expertise, handpicked partners, and a passion for hospitality.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <PageLayout>
      <AboutHero />
      <OurStory />
      <OurValues />
      <AboutStats />
      <OurMission />
      <WhyChoose />
      <AboutCta />
    </PageLayout>
  );
}
