import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ExperienceDetailView } from "@/components/experience/experience-detail-view";
import { PageLayout } from "@/components/layout/page-layout";
import {
  getPublicExperienceBySlug,
  getPublicExperienceSlugs,
  getRelatedPublicExperiences,
} from "@/lib/cms/content-source";
import { createPageMetadata } from "@/lib/site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getPublicExperienceSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const experience = await getPublicExperienceBySlug(slug);

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
    index: false,
  });
}

export default async function ExperienceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const experience = await getPublicExperienceBySlug(slug);

  if (!experience) {
    notFound();
  }

  const relatedExperiences = await getRelatedPublicExperiences(experience);

  return (
    <PageLayout mainClassName="pt-28 lg:pt-32">
      <ExperienceDetailView
        experience={experience}
        relatedExperiences={relatedExperiences}
      />
    </PageLayout>
  );
}
