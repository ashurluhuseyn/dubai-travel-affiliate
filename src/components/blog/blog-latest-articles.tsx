import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { GuideCard } from "@/components/shared/guide-card";
import { Reveal } from "@/components/shared/reveal";
import type { BlogPost } from "@/data";

type BlogLatestArticlesProps = {
  posts: BlogPost[];
};

export function BlogLatestArticles({ posts }: BlogLatestArticlesProps) {
  return (
    <section aria-labelledby="latest-articles-heading">
      <div className="mb-6 flex items-end justify-between gap-4">
        <h2
          id="latest-articles-heading"
          className="font-heading text-2xl text-foreground md:text-3xl"
        >
          Latest Articles
        </h2>
        <Link
          href="/blog"
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
  );
}
