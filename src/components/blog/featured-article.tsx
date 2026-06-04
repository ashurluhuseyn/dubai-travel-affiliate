import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { BlogPost } from "@/data";

type FeaturedArticleProps = {
  post: BlogPost;
};

export function FeaturedArticle({ post }: FeaturedArticleProps) {
  return (
    <Card className="grid gap-0 overflow-hidden border-border/60 bg-card py-0 transition-luxury hover:border-luxury-gold-muted/40 md:grid-cols-2">
      <div className="group relative aspect-[16/11] overflow-hidden md:aspect-auto md:min-h-[22rem]">
        <Image
          src={post.image}
          alt={post.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-luxury-slow group-hover:scale-105"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/40 to-transparent" />
        <Badge className="absolute left-4 top-4 shadow-sm">Featured</Badge>
      </div>

      <div className="flex flex-col justify-center gap-4 p-6 md:p-8">
        <Badge
          variant="outline"
          className="w-fit border-luxury-gold-muted/30 text-luxury-gold-soft"
        >
          {post.category}
        </Badge>
        <h2 className="font-heading text-2xl text-foreground text-balance md:text-3xl">
          <Link
            href={post.href}
            className="transition-luxury hover:text-luxury-gold"
          >
            {post.title}
          </Link>
        </h2>
        <p className="text-sm text-muted-foreground md:text-base">
          {post.excerpt}
        </p>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
          {post.author && (
            <span className="inline-flex items-center gap-2">
              <span
                className="inline-flex size-8 items-center justify-center rounded-full border border-luxury-gold-muted/30 bg-luxury-gold/10 text-xs font-medium text-luxury-gold-soft"
                aria-hidden
              >
                {post.author.initials}
              </span>
              <span className="text-foreground">{post.author.name}</span>
            </span>
          )}
          <span>{post.date}</span>
          <span className="inline-flex items-center gap-1">
            <Clock className="size-3.5" aria-hidden />
            {post.readTime}
          </span>
        </div>

        <Button asChild className="mt-2 w-fit rounded-full transition-luxury">
          <Link href={post.href}>
            Read Article
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
    </Card>
  );
}
