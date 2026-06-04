import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { BlogCategoriesCard } from "@/components/blog/blog-categories-card";
import { BlogHero } from "@/components/blog/blog-hero";
import { FeaturedArticle } from "@/components/blog/featured-article";
import { NewsletterCta } from "@/components/blog/newsletter-cta";
import { PopularPostsCard } from "@/components/blog/popular-posts-card";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Container } from "@/components/shared/container";
import { GuideCard } from "@/components/shared/guide-card";
import { Reveal } from "@/components/shared/reveal";
import {
  getBlogCategories,
  getBlogPosts,
  getFeaturedPost,
  getPopularPosts,
} from "@/data";

export const metadata: Metadata = {
  title: "Dubai Travel Stories",
  description:
    "Expert guides, insider tips, and inspiring stories to help you plan your perfect Dubai adventure — itineraries, hidden gems, and luxury experiences.",
};

export default function BlogPage() {
  const featuredPost = getFeaturedPost();
  const posts = getBlogPosts();
  const categories = getBlogCategories();
  const popularPosts = getPopularPosts();

  return (
    <>
      <Header />
      <main>
        <BlogHero />

        <Container className="py-section">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-12">
            <div className="space-y-12">
              <FeaturedArticle post={featuredPost} />

              <section aria-labelledby="latest-articles-heading">
                <div className="mb-6 flex items-end justify-between gap-4">
                  <h2
                    id="latest-articles-heading"
                    className="font-heading text-2xl text-foreground md:text-3xl"
                  >
                    Latest Articles
                  </h2>
                  <Link
                    href="#"
                    className="group inline-flex shrink-0 items-center gap-1.5 text-sm text-luxury-gold-soft transition-luxury hover:text-luxury-gold"
                  >
                    View All Articles
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  {posts.map((post, index) => (
                    <Reveal key={post.id} delay={index * 60}>
                      <GuideCard guide={post} />
                    </Reveal>
                  ))}
                </div>
              </section>

              <NewsletterCta />
            </div>

            <aside className="space-y-8 lg:sticky lg:top-28 lg:self-start">
              <BlogCategoriesCard categories={categories} />
              <PopularPostsCard posts={popularPosts} />
            </aside>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
