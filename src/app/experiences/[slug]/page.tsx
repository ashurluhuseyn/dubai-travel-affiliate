import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ExperienceDetailView } from "@/components/experience/experience-detail-view";
import { PageLayout } from "@/components/layout/page-layout";
import { getExperienceDetail, getExperienceSlugs } from "@/data";
import { createPageMetadata } from "@/lib/site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getExperienceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const experience = getExperienceDetail(slug);

  if (!experience) {
    return { title: "Experience not found" };
  }

  const path = `/experiences/${slug}`;
  const ogImage = experience.gallery[0]?.src;

  return createPageMetadata({
    title: experience.title,
    description: experience.description,
    path,
    images: ogImage ? [ogImage] : undefined,
    openGraphType: "article",
  });
}

export default async function ExperienceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const experience = getExperienceDetail(slug);

  if (!experience) {
    notFound();
  }

  return (
    <PageLayout mainClassName="pt-28 lg:pt-32">
      <ExperienceDetailView experience={experience} />
    </PageLayout>
  );
}
