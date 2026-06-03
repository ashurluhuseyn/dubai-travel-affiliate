import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { Guide } from "@/data";
import { cn } from "@/lib/utils";

type GuideCardProps = {
  guide: Guide;
  className?: string;
};

export function GuideCard({ guide, className }: GuideCardProps) {
  return (
    <Card
      className={cn(
        "group gap-0 overflow-hidden border-border/60 bg-card py-0 transition-luxury hover:border-luxury-gold-muted/40",
        className
      )}
    >
      <Link href={guide.href} className="flex h-full flex-col">
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={guide.image}
            alt={guide.imageAlt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-luxury-slow group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/70 to-transparent" />
        </div>
        <CardContent className="flex flex-1 flex-col gap-3 p-5">
          <div className="flex items-center justify-between gap-2">
            <Badge
              variant="outline"
              className="border-luxury-gold-muted/30 text-luxury-gold-soft"
            >
              {guide.category}
            </Badge>
            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="size-3.5" />
              {guide.readTime}
            </span>
          </div>
          <h3 className="font-heading text-xl text-foreground transition-luxury group-hover:text-luxury-gold">
            {guide.title}
          </h3>
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {guide.excerpt}
          </p>
          <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm text-luxury-gold-soft transition-luxury group-hover:text-luxury-gold">
            Read guide
            <ArrowUpRight className="size-4" />
          </span>
        </CardContent>
      </Link>
    </Card>
  );
}
