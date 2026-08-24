import type { Metadata } from "next";

import { CategoriesGrid } from "@/components/categories/categories-grid";
import { CategoriesHero } from "@/components/categories/categories-hero";
import { PageLayout } from "@/components/layout/page-layout";
import { createPageMetadata } from "@/lib/site";

export const metadata: Metadata = createPageMetadata({
  title: "Explore Dubai by Categories",
  description:
    "Browse Dubai travel ideas by broad themes while Caspaya prepares its first researched guides.",
  path: "/categories",
  index: false,
});

export default function CategoriesPage() {
  return (
    <PageLayout>
      <CategoriesHero />
      <CategoriesGrid />
    </PageLayout>
  );
}
