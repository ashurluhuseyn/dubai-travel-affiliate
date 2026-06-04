import Image from "next/image";
import { Star } from "lucide-react";

import { AffiliateLink } from "@/components/shared/affiliate-button";
import type { PopularExperience } from "@/data";

type PopularExperienceCardProps = {
  experience: PopularExperience;
};

export function PopularExperienceCard({
  experience,
}: PopularExperienceCardProps) {
  return (
    <AffiliateLink
      href={experience.affiliateUrl}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-border/60 bg-card transition-luxury hover:-translate-y-1 hover:border-luxury-gold-muted/40 hover:shadow-lg hover:shadow-luxury-gold/5"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={experience.image}
          alt={experience.imageAlt}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
          className="object-cover transition-luxury-slow group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/60 via-transparent to-transparent" />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="font-heading text-sm leading-snug text-foreground transition-luxury group-hover:text-luxury-gold">
          {experience.title}
        </h3>
        <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
          <Star className="size-3.5 fill-luxury-gold text-luxury-gold" aria-hidden />
          <span className="font-medium text-foreground">
            {experience.rating.toFixed(1)}
          </span>
          ({experience.reviewLabel})
        </span>
        <span className="mt-auto pt-1 text-sm">
          <span className="text-muted-foreground">From </span>
          <span className="font-semibold text-luxury-gold-soft">
            {experience.price}
          </span>
        </span>
      </div>
    </AffiliateLink>
  );
}
