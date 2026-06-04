import Image from "next/image";
import { Clock, Star, Users } from "lucide-react";

import { AffiliateButton } from "@/components/shared/affiliate-button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { DestinationExperience } from "@/data";

import { SaveButton } from "./save-button";

type DestinationCardProps = {
  experience: DestinationExperience;
  priority?: boolean;
};

export function DestinationCard({ experience, priority }: DestinationCardProps) {
  return (
    <Card className="group flex h-full flex-col gap-0 overflow-hidden border-border/60 bg-card py-0 transition-luxury hover:-translate-y-1 hover:border-luxury-gold-muted/40 hover:shadow-xl hover:shadow-luxury-gold/5">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={experience.image}
          alt={experience.imageAlt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-luxury-slow group-hover:scale-105"
          priority={priority}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/70 via-transparent to-luxury-black/10" />
        {experience.badge && (
          <Badge
            variant="secondary"
            className="absolute left-3 top-3 border-luxury-gold-muted/30 bg-luxury-black/60 text-luxury-gold-soft backdrop-blur-sm"
          >
            {experience.badge}
          </Badge>
        )}
        <SaveButton className="absolute right-3 top-3" label={experience.title} />
      </div>

      <CardContent className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="font-heading text-lg leading-snug text-foreground transition-luxury group-hover:text-luxury-gold">
          {experience.title}
        </h3>

        <div className="flex items-center gap-1.5 text-sm">
          <Star className="size-4 fill-luxury-gold text-luxury-gold" />
          <span className="font-medium text-foreground">
            {experience.rating.toFixed(1)}
          </span>
          <span className="text-xs text-muted-foreground">
            ({experience.reviews.toLocaleString()} reviews)
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Clock className="size-3.5 text-luxury-gold-muted" />
            {experience.duration}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Users className="size-3.5 text-luxury-gold-muted" />
            {experience.groupSize}
          </span>
        </div>

        <div className="mt-auto flex items-center justify-between gap-3 pt-3">
          <p>
            <span className="font-heading text-xl text-luxury-gold-soft">
              ${experience.price}
            </span>
            <span className="text-xs text-muted-foreground"> / person</span>
          </p>
          <AffiliateButton
            href={experience.affiliateUrl}
            size="sm"
            className="rounded-full transition-luxury"
          >
            View Experience
          </AffiliateButton>
        </div>
      </CardContent>
    </Card>
  );
}
