import type { Metadata } from "next";

import { FeaturedHiddenGemSection } from "@/components/hidden-gems/featured-hidden-gem";
import { HiddenGemsGrid } from "@/components/hidden-gems/hidden-gems-grid";
import { HiddenGemsHero } from "@/components/hidden-gems/hidden-gems-hero";
import { PageLayout } from "@/components/layout/page-layout";
import { createPageMetadata } from "@/lib/site";

export const metadata: Metadata = createPageMetadata({
  title: "Hidden Gems in Dubai",
  description:
    "Browse less-obvious Dubai places while Caspaya verifies and expands its editorial guides.",
  path: "/hidden-gems",
  index: false,
});

type HiddenGemsPageProps = {
  searchParams: Promise<{ search?: string }>;
};

export default async function HiddenGemsPage({
  searchParams,
}: HiddenGemsPageProps) {
  const { search = "" } = await searchParams;
  return (
    <PageLayout>
      <HiddenGemsHero initialSearch={search} />
      <FeaturedHiddenGemSection />
      <HiddenGemsGrid searchQuery={search} />
    </PageLayout>
  );
}
