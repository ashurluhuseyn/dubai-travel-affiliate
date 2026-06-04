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
  getPopularPosts,
} from "@/data";
import { createPageMetadata } from "@/lib/site";

export const metadata: Metadata = createPageMetadata({
  title: "Dubai Travel Stories & Guides",
  description:
    "Expert Dubai travel guides, insider tips, and inspiring stories. Plan itineraries, discover hidden gems, and explore luxury experiences across the Emirates.",
  path: "/blog",
});

export default function BlogPage() {
  const featuredPost = getFeaturedPost();
  const posts = getBlogPosts();
  const categories = getBlogCategories();
  const popularPosts = getPopularPosts();

  return (
    <PageLayout>
      <BlogHero />

      <Container className="py-section">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-12">
          <div className="space-y-12">
            <FeaturedArticle post={featuredPost} />
            <BlogLatestArticles posts={posts} />
            <NewsletterCta />
          </div>

          <aside className="space-y-8 lg:sticky lg:top-28 lg:self-start">
            <BlogCategoriesCard categories={categories} />
            <PopularPostsCard posts={popularPosts} />
          </aside>
        </div>
      </Container>
    </PageLayout>
  );
}
