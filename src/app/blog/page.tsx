import type { Metadata } from "next";

import { BlogCategoriesCard } from "@/components/blog/blog-categories-card";
import { BlogHero } from "@/components/blog/blog-hero";
import { BlogLatestArticles } from "@/components/blog/blog-latest-articles";
import { FeaturedArticle } from "@/components/blog/featured-article";
import { NewsletterCta } from "@/components/blog/newsletter-cta";
import { PopularPostsCard } from "@/components/blog/popular-posts-card";
import { PageLayout } from "@/components/layout/page-layout";
import { Container } from "@/components/shared/container";
import {
  getBlogCategories,
  getBlogPosts,
  getFeaturedPost,
  getIndexableBlogPosts,
  getPopularPosts,
} from "@/data";
import { matchesSearchQuery } from "@/lib/search";
import { createPageMetadata } from "@/lib/site";

const hasPublishedArticles = getIndexableBlogPosts().length > 0;

export const metadata: Metadata = createPageMetadata({
  title: "Dubai Travel Stories & Guides",
  description:
    "Independent Dubai travel articles, practical planning notes, and carefully researched destination guides from Caspaya.",
  path: "/blog",
  index: hasPublishedArticles,
});

type BlogPageProps = {
  searchParams: Promise<{ search?: string }>;
};

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { search = "" } = await searchParams;
  const featuredPost = getFeaturedPost();
  const posts = getBlogPosts().filter((post) =>
    matchesSearchQuery(search, [
      post.title,
      post.excerpt,
      post.category,
    ])
  );
  const categories = getBlogCategories();
  const popularPosts = getPopularPosts();

  return (
    <PageLayout>
      <BlogHero initialSearch={search} />

      <Container className="py-section">
        <div
          className={
            categories.length > 0 || popularPosts.length > 0
              ? "grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-12"
              : "grid gap-10"
          }
        >
          <div className="space-y-12">
            {featuredPost && <FeaturedArticle post={featuredPost} />}
            <BlogLatestArticles posts={posts} searchQuery={search} />
            {posts.length > 0 && <NewsletterCta />}
          </div>

          {(categories.length > 0 || popularPosts.length > 0) && (
            <aside className="space-y-8 lg:sticky lg:top-28 lg:self-start">
              {categories.length > 0 && (
                <BlogCategoriesCard categories={categories} />
              )}
              {popularPosts.length > 0 && (
                <PopularPostsCard posts={popularPosts} />
              )}
            </aside>
          )}
        </div>
      </Container>
    </PageLayout>
  );
}
