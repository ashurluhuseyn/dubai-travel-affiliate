import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { PopularPost } from "@/data";

type PopularPostsCardProps = {
  posts: PopularPost[];
};

export function PopularPostsCard({ posts }: PopularPostsCardProps) {
  return (
    <section
      aria-labelledby="popular-posts-heading"
      className="rounded-xl border border-border/60 bg-card p-6"
    >
      <h2
        id="popular-posts-heading"
        className="font-heading text-lg text-foreground"
      >
        Popular Posts
      </h2>

      <ul className="mt-4 space-y-4">
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={post.href} className="group flex items-center gap-3">
              <span className="relative size-14 shrink-0 overflow-hidden rounded-lg border border-border/60">
                <Image
                  src={post.image}
                  alt={post.imageAlt}
                  fill
                  sizes="56px"
                  className="object-cover transition-luxury-slow group-hover:scale-105"
                />
              </span>
              <span className="min-w-0">
                <span className="line-clamp-2 text-sm font-medium text-foreground transition-luxury group-hover:text-luxury-gold">
                  {post.title}
                </span>
                <span className="mt-1 block text-xs text-muted-foreground">
                  {post.date}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <Link
        href="#"
        className="group mt-5 inline-flex items-center gap-1.5 text-sm text-luxury-gold-soft transition-luxury hover:text-luxury-gold"
      >
        View All Popular Posts
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
      </Link>
    </section>
  );
}
