import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";

import { FavoriteButton } from "@/components/experience/favorite-button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { LuxuryExperience } from "@/data";

type LuxuryExperienceCardProps = {
  experience: LuxuryExperience;
};

export function LuxuryExperienceCard({
  experience,
}: LuxuryExperienceCardProps) {
  return (
    <Card className="group gap-0 overflow-hidden border-border/60 bg-card py-0 transition-luxury hover:-translate-y-1 hover:border-luxury-gold-muted/40 hover:shadow-xl hover:shadow-luxury-gold/5">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={experience.image}
          alt={experience.imageAlt}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          className="object-cover transition-luxury-slow group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/75 via-transparent to-transparent" />
        <Badge
          variant="secondary"
          className="absolute left-3 top-3 border-luxury-gold-muted/30 bg-luxury-black/60 text-luxury-gold-soft backdrop-blur-sm"
        >
          {experience.badge}
        </Badge>
        <FavoriteButton
          label={experience.title}
          size="sm"
          className="absolute right-3 top-3"
        />
      </div>

      <CardContent className="flex flex-1 flex-col gap-2 p-4">
        <Link
          href={experience.href}
          className="font-heading text-base leading-snug text-foreground transition-luxury hover:text-luxury-gold"
        >
          {experience.title}
        </Link>
        <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
          <MapPin className="size-3.5 text-luxury-gold-muted" aria-hidden />
          {experience.location}
        </span>
        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="text-sm">
            <span className="text-muted-foreground">From </span>
            <span className="font-semibold text-luxury-gold-soft">
              {experience.price.replace(/^From\s/, "")}
            </span>
          </span>
          <Link
            href={experience.href}
            aria-label={`View ${experience.title}`}
            className="inline-flex size-9 items-center justify-center rounded-full border border-luxury-gold-muted/30 bg-luxury-black/40 text-luxury-gold transition-luxury hover:bg-luxury-gold/15"
          >
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
