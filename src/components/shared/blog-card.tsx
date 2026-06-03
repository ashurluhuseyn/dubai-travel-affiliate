import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { BlogPost } from "@/lib/data/home";
import { cn } from "@/lib/utils";

type BlogCardProps = {
  post: BlogPost;
  className?: string;
};

export function BlogCard({ post, className }: BlogCardProps) {
  return (
    <Card
      className={cn(
        "group overflow-hidden border-border/60 bg-card py-0 transition-luxury hover:border-luxury-gold-muted/40",
        className
      )}
    >
      <Link href={post.href} className="flex h-full flex-col">
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={post.image}
            alt={post.imageAlt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-luxury-slow group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/70 to-transparent" />
        </div>
        <CardContent className="flex flex-1 flex-col gap-3 p-5 md:p-6">
          <div className="flex items-center justify-between gap-2">
            <Badge
              variant="outline"
              className="border-luxury-gold-muted/30 text-luxury-gold-soft"
            >
              {post.category}
            </Badge>
            <span className="text-xs text-muted-foreground">{post.date}</span>
          </div>
          <h3 className="font-heading text-xl text-foreground md:text-2xl">
            {post.title}
          </h3>
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {post.excerpt}
          </p>
          <span className="mt-auto inline-flex items-center gap-1.5 text-sm text-luxury-gold-soft transition-luxury group-hover:text-luxury-gold">
            Read article
            <ArrowUpRight className="size-4" />
          </span>
        </CardContent>
      </Link>
    </Card>
  );
}
