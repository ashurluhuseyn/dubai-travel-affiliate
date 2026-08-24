import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { LuxuryCollection } from "@/data";

type LuxuryCollectionCardProps = {
  collection: LuxuryCollection;
  priority?: boolean;
};

export function LuxuryCollectionCard({
  collection,
  priority = false,
}: LuxuryCollectionCardProps) {
  return (
    <Card className="group gap-0 overflow-hidden border-border/60 bg-card py-0 transition-luxury hover:-translate-y-1 hover:border-luxury-gold-muted/50 hover:shadow-xl hover:shadow-luxury-gold/10">
      <Link href={collection.href} className="flex h-full flex-col">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={collection.image}
            alt={collection.imageAlt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-luxury-slow group-hover:scale-105"
            priority={priority}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/80 via-luxury-black/15 to-transparent" />
          <Badge
            variant="secondary"
            className="absolute left-3 top-3 border-luxury-gold-muted/30 bg-luxury-black/60 text-luxury-gold-soft backdrop-blur-sm"
          >
            {collection.badge}
          </Badge>
        </div>

        <CardContent className="flex flex-1 flex-col gap-2 p-5">
          <h3 className="font-heading text-lg text-foreground transition-luxury group-hover:text-luxury-gold">
            {collection.title}
          </h3>
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {collection.description}
          </p>
          <div className="mt-auto flex items-center justify-end pt-3">
            <span
              className="inline-flex size-9 items-center justify-center rounded-full border border-luxury-gold-muted/30 bg-luxury-black/40 text-luxury-gold transition-luxury group-hover:bg-luxury-gold/15"
              aria-hidden
            >
              <ArrowRight className="size-4" />
            </span>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
