import type { Metadata } from "next";

import { FeaturedHiddenGemSection } from "@/components/hidden-gems/featured-hidden-gem";
import { HiddenGemCategories } from "@/components/hidden-gems/hidden-gem-categories";
import { HiddenGemsGrid } from "@/components/hidden-gems/hidden-gems-grid";
import { HiddenGemsHero } from "@/components/hidden-gems/hidden-gems-hero";
import { HiddenGemsMap } from "@/components/hidden-gems/hidden-gems-map";
import { HiddenGemsPageSections } from "@/components/hidden-gems/hidden-gems-page-sections";
import { LocalTips } from "@/components/hidden-gems/local-tips";
import { PageLayout } from "@/components/layout/page-layout";
import { getHiddenGemsRelated } from "@/data";
import { createPageMetadata } from "@/lib/site";

export const metadata: Metadata = createPageMetadata({
  title: "Hidden Gems in Dubai",
  description:
    "Discover secret beaches, local cafés, cultural corners, and unforgettable places most tourists never find. Curated hidden gems and local tips across Dubai.",
  path: "/hidden-gems",
});

type HiddenGemsPageProps = {
  searchParams: Promise<{ search?: string }>;
};

export default async function HiddenGemsPage({
  searchParams,
}: HiddenGemsPageProps) {
  const { search = "" } = await searchParams;
  const related = getHiddenGemsRelated();

  return (
    <PageLayout>
      <HiddenGemsHero initialSearch={search} />
      <FeaturedHiddenGemSection />
      <HiddenGemsGrid searchQuery={search} />
      <HiddenGemCategories />
      <LocalTips />
      <HiddenGemsMap />
      <HiddenGemsPageSections related={related} />
    </PageLayout>
  );
}
