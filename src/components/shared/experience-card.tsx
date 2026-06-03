import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { ExperienceItem } from "@/lib/data/home";
import { cn } from "@/lib/utils";

type ExperienceCardProps = {
  item: ExperienceItem;
  className?: string;
  priority?: boolean;
};

export function ExperienceCard({
  item,
  className,
  priority = false,
}: ExperienceCardProps) {
  return (
    <Card
      className={cn(
        "group overflow-hidden border-border/60 bg-card py-0 transition-luxury hover:border-luxury-gold-muted/40 hover:shadow-lg hover:shadow-luxury-gold/5",
        className
      )}
    >
      <Link href={item.href} className="flex h-full flex-col">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={item.image}
            alt={item.imageAlt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-luxury-slow group-hover:scale-105"
            priority={priority}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/80 via-luxury-black/20 to-transparent" />
          {item.tag && (
            <Badge
              variant="secondary"
              className="absolute left-4 top-4 border-luxury-gold-muted/30 bg-luxury-black/60 text-luxury-gold-soft backdrop-blur-sm"
            >
              {item.tag}
            </Badge>
          )}
        </div>
        <CardContent className="flex flex-1 flex-col gap-3 p-5 md:p-6">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-heading text-xl text-foreground md:text-2xl">
              {item.title}
            </h3>
            <ArrowUpRight className="size-5 shrink-0 text-luxury-gold-muted transition-luxury group-hover:text-luxury-gold group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {item.description}
          </p>
          {item.price && (
            <p className="mt-auto text-sm font-medium text-luxury-gold-soft">
              {item.price}
            </p>
          )}
        </CardContent>
      </Link>
    </Card>
  );
}
