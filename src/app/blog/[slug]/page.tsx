import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BlogDetailView } from "@/components/blog/blog-detail-view";
import { PageLayout } from "@/components/layout/page-layout";
import { getBlogDetail, getBlogSlugs, isBlogPostIndexable } from "@/data";
import { createPageMetadata, SITE_URL } from "@/lib/site";

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

  const indexable = isBlogPostIndexable(article);

  return createPageMetadata({
    title: article.seoTitle,
    description: article.metaDescription,
    path: `/blog/${slug}`,
    images: [article.image],
    openGraphType: "article",
    index: indexable,
  });
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const article = getBlogDetail(slug);

  if (!article) {
    notFound();
  }

  const indexable = isBlogPostIndexable(article);
  const structuredData = indexable
    ? {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Article",
            headline: article.title,
            description: article.metaDescription,
            image: [article.image],
            datePublished: article.publishedAt,
            dateModified: article.updatedAt,
            author: {
              "@type": "Person",
              name: article.author!.name,
              ...(article.author!.url ? { url: article.author!.url } : {}),
            },
            publisher: {
              "@type": "Organization",
              name: "Caspaya",
              url: SITE_URL,
            },
            mainEntityOfPage: `${SITE_URL}/blog/${slug}`,
          },
          {
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: SITE_URL,
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Blog",
                item: `${SITE_URL}/blog`,
              },
              {
                "@type": "ListItem",
                position: 3,
                name: article.title,
                item: `${SITE_URL}/blog/${slug}`,
              },
            ],
          },
        ],
      }
    : null;

  return (
    <PageLayout mainClassName="pt-28 lg:pt-32">
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
      )}
      <BlogDetailView article={article} />
    </PageLayout>
  );
}
