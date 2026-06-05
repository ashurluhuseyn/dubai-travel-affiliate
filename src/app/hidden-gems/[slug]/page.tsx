import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { HiddenGemDetailView } from "@/components/hidden-gems/hidden-gem-detail-view";
import { PageLayout } from "@/components/layout/page-layout";
import { getHiddenGemDetail, getHiddenGemSlugs } from "@/data";
import { createPageMetadata } from "@/lib/site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getHiddenGemSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const gem = getHiddenGemDetail(slug);

  if (!gem) {
    return { title: "Hidden gem not found" };
  }

  return createPageMetadata({
    title: gem.title,
    description: gem.description,
    path: `/hidden-gems/${slug}`,
    images: [gem.image],
    openGraphType: "article",
  });
}

export default async function HiddenGemDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const gem = getHiddenGemDetail(slug);

  if (!gem) {
    notFound();
  }

  return (
    <PageLayout mainClassName="pt-28 lg:pt-32">
      <HiddenGemDetailView gem={gem} />
    </PageLayout>
  );
}
