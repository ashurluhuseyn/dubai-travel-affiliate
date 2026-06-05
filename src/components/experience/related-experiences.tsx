"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

import { FavoriteButton } from "@/components/experience/favorite-button";
import type { RelatedExperience } from "@/data";

type RelatedExperiencesProps = {
  experiences: RelatedExperience[];
  title?: string;
};

export function RelatedExperiences({
  experiences,
  title = "You Might Also Like",
}: RelatedExperiencesProps) {
  const trackRef = useRef<HTMLUListElement>(null);

  const scrollBy = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const amount = track.clientWidth * 0.8 * direction;
    track.scrollBy({ left: amount, behavior: "smooth" });
  };

  if (experiences.length === 0) return null;

  return (
    <section aria-labelledby="related-heading">
      <div className="mb-6 flex items-end justify-between gap-4">
        <h2
          id="related-heading"
          className="font-heading text-2xl text-foreground md:text-3xl"
        >
          {title}
        </h2>
        <div className="hidden items-center gap-2 sm:flex">
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            aria-label="Scroll to previous experiences"
            className="inline-flex size-9 items-center justify-center rounded-full border border-border/70 bg-luxury-charcoal/60 text-foreground transition-luxury hover:border-luxury-gold-muted/50 hover:text-luxury-gold"
          >
            <ChevronLeft className="size-4" aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            aria-label="Scroll to more experiences"
            className="inline-flex size-9 items-center justify-center rounded-full border border-border/70 bg-luxury-charcoal/60 text-foreground transition-luxury hover:border-luxury-gold-muted/50 hover:text-luxury-gold"
          >
            <ChevronRight className="size-4" aria-hidden />
          </button>
        </div>
      </div>

      <ul
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {experiences.map((experience) => (
          <li
            key={experience.id}
            className="w-[15rem] shrink-0 snap-start sm:w-[16rem]"
          >
            <article className="group h-full overflow-hidden rounded-xl border border-border/60 bg-card transition-luxury hover:-translate-y-1 hover:border-luxury-gold-muted/40">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Link href={experience.href} className="block h-full w-full">
                  <Image
                    src={experience.image}
                    alt={experience.imageAlt}
                    fill
                    sizes="256px"
                    className="object-cover transition-luxury-slow group-hover:scale-105"
                  />
                </Link>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-luxury-black/70 via-transparent to-transparent" />
                <FavoriteButton
                  label={experience.title}
                  size="sm"
                  className="absolute right-3 top-3"
                />
              </div>
              <Link href={experience.href} className="block">
                <div className="flex flex-col gap-2 p-4">
                  <h3 className="font-heading text-base leading-snug text-foreground transition-luxury group-hover:text-luxury-gold">
                    {experience.title}
                  </h3>
                  <div className="mt-1 flex items-center justify-between">
                    <span className="text-sm">
                      <span className="text-muted-foreground">From </span>
                      <span className="font-semibold text-luxury-gold-soft">
                        {experience.price}
                      </span>
                      <span className="text-xs text-muted-foreground"> / person</span>
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                      <Star className="size-3.5 fill-luxury-gold text-luxury-gold" aria-hidden />
                      {experience.rating.toFixed(1)}
                    </span>
                  </div>
                </div>
              </Link>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
