import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BlogDetailView } from "@/components/blog/blog-detail-view";
import { PageLayout } from "@/components/layout/page-layout";
import { getBlogDetail, getBlogSlugs } from "@/data";
import { createPageMetadata } from "@/lib/site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getBlogDetail(slug);

  if (!article) {
    return { title: "Article not found" };
  }

  return createPageMetadata({
    title: article.title,
    description: article.excerpt,
    path: `/blog/${slug}`,
    images: [article.image],
    openGraphType: "article",
  });
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const article = getBlogDetail(slug);

  if (!article) {
    notFound();
  }

  return (
    <PageLayout mainClassName="pt-28 lg:pt-32">
      <BlogDetailView article={article} />
    </PageLayout>
  );
}
