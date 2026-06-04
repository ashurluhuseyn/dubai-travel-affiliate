import type { Metadata } from "next";

import { CategoriesCta } from "@/components/categories/categories-cta";
import { CategoriesGrid } from "@/components/categories/categories-grid";
import { CategoriesHero } from "@/components/categories/categories-hero";
import { FeaturedCategorySection } from "@/components/categories/featured-category";
import { PopularExperiences } from "@/components/categories/popular-experiences";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { createPageMetadata } from "@/lib/site";

export const metadata: Metadata = createPageMetadata({
  title: "Explore Dubai by Categories",
  description:
    "Find the perfect Dubai experience for your next adventure. Browse desert safaris, yacht tours, luxury escapes, nightlife, dining, and culture by category.",
  path: "/categories",
});

export default function CategoriesPage() {
  return (
    <>
      <Header />
      <main>
        <CategoriesHero />
        <CategoriesGrid />
        <FeaturedCategorySection />
        <PopularExperiences />
        <CategoriesCta />
      </main>
      <Footer />
    </>
  );
}
