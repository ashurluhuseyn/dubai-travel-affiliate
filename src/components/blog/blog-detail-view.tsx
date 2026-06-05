import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";

import { Container } from "@/components/shared/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { BlogDetail } from "@/data";

type BlogDetailViewProps = {
  article: BlogDetail;
};

export function BlogDetailView({ article }: BlogDetailViewProps) {
  return (
    <article>
      <div className="relative aspect-[21/9] min-h-[16rem] overflow-hidden">
        <Image
          src={article.image}
          alt={article.imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-luxury-black/40 to-luxury-black/20" />
      </div>

      <Container className="py-section">
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="mb-6 -ml-2 text-muted-foreground hover:text-luxury-gold"
        >
          <Link href="/blog">
            <ArrowLeft className="size-4" />
            Back to Blog
          </Link>
        </Button>

        <header className="max-w-3xl">
          <Badge
            variant="outline"
            className="border-luxury-gold-muted/30 text-luxury-gold-soft"
          >
            {article.category}
          </Badge>
          <h1 className="mt-4 font-heading text-3xl leading-tight text-foreground text-balance md:text-5xl">
            {article.title}
          </h1>
          <p className="mt-4 text-base text-muted-foreground md:text-lg">
            {article.excerpt}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
            {article.author && (
              <span className="inline-flex items-center gap-2">
                <span
                  className="inline-flex size-8 items-center justify-center rounded-full border border-luxury-gold-muted/30 bg-luxury-gold/10 text-xs font-medium text-luxury-gold-soft"
                  aria-hidden
                >
                  {article.author.initials}
                </span>
                <span className="text-foreground">{article.author.name}</span>
              </span>
            )}
            <span>{article.date}</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="size-3.5" aria-hidden />
              {article.readTime}
            </span>
          </div>
        </header>

        <div className="prose-luxury mt-10 max-w-3xl space-y-5 text-base leading-relaxed text-luxury-white-muted">
          {article.content.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </div>
      </Container>
    </article>
  );
}
