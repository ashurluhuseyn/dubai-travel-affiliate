import type { Metadata } from "next";

import { CategoryExplorer } from "@/components/home/category-explorer";
import { HeroSection } from "@/components/home/hero-section";
import { HiddenGems } from "@/components/home/hidden-gems";
import { LuxuryLifestyle } from "@/components/home/luxury-lifestyle";
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
      <HiddenGems />
      <LuxuryLifestyle />
    </PageLayout>
  );
}
