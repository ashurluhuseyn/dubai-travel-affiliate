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
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { createPageMetadata } from "@/lib/site";

export const metadata: Metadata = createPageMetadata({
  title: "Luxury Dubai Travel & Curated Experiences",
  description:
    "Discover handpicked luxury hotels, exclusive experiences, and premium travel offers in Dubai. Plan desert safaris, yacht charters, and unforgettable Arabian Gulf escapes.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <TrendingExperiences />
        <CategoryExplorer />
        <AiTripPlanner />
        <HiddenGems />
        <LuxuryLifestyle />
        <TravelerStories />
        <LatestGuides />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
