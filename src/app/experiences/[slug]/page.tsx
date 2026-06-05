import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ExperienceDetailView } from "@/components/experience/experience-detail-view";
import { PageLayout } from "@/components/layout/page-layout";
import {
  getExperienceBySlug,
  getExperienceSlugs,
  resolveRelatedExperiences,
} from "@/data";
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
  const experience = getExperienceBySlug(slug);

  if (!experience) {
    return { title: "Experience not found" };
  }

  const path = `/experiences/${slug}`;
  const ogImage = experience.images[0]?.src;

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
  const experience = getExperienceBySlug(slug);

  if (!experience) {
    notFound();
  }

  const relatedExperiences = resolveRelatedExperiences(experience);

  return (
    <PageLayout mainClassName="pt-28 lg:pt-32">
      <ExperienceDetailView
        experience={experience}
        relatedExperiences={relatedExperiences}
      />
    </PageLayout>
  );
}
