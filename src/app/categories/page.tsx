import type { Metadata } from "next";

import { CategoriesCta } from "@/components/categories/categories-cta";
import { CategoriesGrid } from "@/components/categories/categories-grid";
import { CategoriesHero } from "@/components/categories/categories-hero";
import { FeaturedCategorySection } from "@/components/categories/featured-category";
import { PopularExperiences } from "@/components/categories/popular-experiences";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

export const metadata: Metadata = {
  title: "Explore Dubai by Categories",
  description:
    "Find the perfect experience for your next adventure. From thrilling deserts to luxurious escapes, browse Dubai experiences by category.",
};

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
