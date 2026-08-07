import type { Metadata } from "next";

import { AiTripPlanner } from "@/components/home/ai-trip-planner";
import { CategoryExplorer } from "@/components/home/category-explorer";
import { CtaSection } from "@/components/home/cta-section";
import { HeroSection } from "@/components/home/hero-section";
import { HiddenGems } from "@/components/home/hidden-gems";
import { LatestGuides } from "@/components/home/latest-guides";
import { LuxuryLifestyle } from "@/components/home/luxury-lifestyle";
import { TravelerStories } from "@/components/home/traveler-stories";
import { TrendingExperiences } from "@/components/home/trending-experiences";
import { PageLayout } from "@/components/layout/page-layout";
import { createPageMetadata, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  ...createPageMetadata({
    title: siteConfig.tagline,
    description: siteConfig.description,
    path: "/",
  }),
  title: {
    absolute: `${siteConfig.name} | ${siteConfig.tagline}`,
  },
};

export default function HomePage() {
  return (
    <PageLayout>
      <HeroSection />
      <TrendingExperiences />
      <CategoryExplorer />
      <AiTripPlanner />
      <HiddenGems />
      <LuxuryLifestyle />
      <TravelerStories />
      <LatestGuides />
      <CtaSection />
    </PageLayout>
  );
}
