import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";

import { FavoriteButton } from "@/components/experience/favorite-button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { HiddenGemSpot } from "@/data";

type HiddenGemCardProps = {
  gem: HiddenGemSpot;
  priority?: boolean;
};

export function HiddenGemCard({ gem, priority = false }: HiddenGemCardProps) {
  return (
    <Card className="group relative gap-0 overflow-hidden border-border/60 bg-card py-0 transition-luxury hover:-translate-y-1 hover:border-luxury-gold-muted/40 hover:shadow-xl hover:shadow-luxury-gold/5">
      <FavoriteButton
        label={gem.title}
        size="sm"
        className="absolute right-3 top-3 z-10"
      />

      <Link href={gem.href} className="flex h-full flex-col">
        <div className="relative aspect-[16/11] overflow-hidden">
          <Image
            src={gem.image}
            alt={gem.imageAlt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-luxury-slow group-hover:scale-105"
            priority={priority}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/70 via-transparent to-transparent" />
          <Badge
            variant="secondary"
            className="absolute left-3 top-3 border-luxury-gold-muted/30 bg-luxury-black/60 text-luxury-gold-soft backdrop-blur-sm"
          >
            {gem.badge}
          </Badge>
        </div>

        <CardContent className="flex flex-1 flex-col gap-2 p-5">
          <h3 className="font-heading text-lg leading-snug text-foreground transition-luxury group-hover:text-luxury-gold">
            {gem.title}
          </h3>
          <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
            <MapPin className="size-3.5 text-luxury-gold-muted" aria-hidden />
            {gem.location}
          </span>
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {gem.description}
          </p>
          <div className="mt-auto flex items-center justify-end pt-3">
            <span className="inline-flex items-center gap-1 text-sm text-luxury-gold-soft transition-luxury group-hover:text-luxury-gold">
              View Guide
              <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
