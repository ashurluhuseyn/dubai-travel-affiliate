"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { FavoriteButton } from "@/components/experience/favorite-button";
import { Badge } from "@/components/ui/badge";
import type { GalleryImage } from "@/data";
import { cn } from "@/lib/utils";

type ExperienceGalleryProps = {
  title: string;
  images: GalleryImage[];
  badge?: string;
  extraCount?: number;
};

export function ExperienceGallery({
  title,
  images,
  badge,
  extraCount,
}: ExperienceGalleryProps) {
  const [active, setActive] = useState(0);
  const count = images.length;

  const go = (direction: 1 | -1) =>
    setActive((current) => (current + direction + count) % count);

  if (count === 0) return null;

  return (
    <div>
      <div className="group relative aspect-[16/10] overflow-hidden rounded-2xl border border-border/60 bg-luxury-charcoal md:aspect-[16/9]">
        <Image
          src={images[active].src}
          alt={images[active].alt}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 60vw"
          className="object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-luxury-black/40 via-transparent to-luxury-black/10" />

        {badge && (
          <Badge className="absolute left-4 top-4 shadow-sm">{badge}</Badge>
        )}

        <FavoriteButton
          label={title}
          className="absolute right-4 top-4"
        />

        {count > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous photo"
              className="absolute left-4 top-1/2 inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-border/60 bg-luxury-black/50 text-foreground backdrop-blur-sm transition-luxury hover:border-luxury-gold-muted/50 hover:text-luxury-gold"
            >
              <ChevronLeft className="size-5" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next photo"
              className="absolute right-4 top-1/2 inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-border/60 bg-luxury-black/50 text-foreground backdrop-blur-sm transition-luxury hover:border-luxury-gold-muted/50 hover:text-luxury-gold"
            >
              <ChevronRight className="size-5" aria-hidden />
            </button>
          </>
        )}
      </div>

      <ul className="mt-3 grid grid-cols-4 gap-2.5 sm:grid-cols-6 sm:gap-3">
        {images.map((image, index) => {
          const isLast = index === count - 1;
          const showExtra = isLast && !!extraCount && extraCount > 0;

          return (
            <li key={image.src + index}>
              <button
                type="button"
                onClick={() => setActive(index)}
                aria-label={`View ${image.alt}`}
                aria-current={index === active ? "true" : undefined}
                className={cn(
                  "relative block aspect-[4/3] w-full overflow-hidden rounded-lg border transition-luxury",
                  index === active
                    ? "border-luxury-gold"
                    : "border-border/60 hover:border-luxury-gold-muted/50"
                )}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 640px) 25vw, 120px"
                  className="object-cover"
                />
                {showExtra && (
                  <span className="absolute inset-0 flex items-center justify-center bg-luxury-black/65 text-sm font-medium text-foreground">
                    +{extraCount}
                  </span>
                )}
                {index === active && !showExtra && (
                  <span className="absolute inset-0 ring-2 ring-inset ring-luxury-gold/60" />
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
