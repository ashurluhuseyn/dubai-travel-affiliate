"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
            className="w-[15rem] shrink-0 snap-start sm:w-[17rem]"
          >
            <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-border/60 bg-card transition-luxury hover:-translate-y-1 hover:border-luxury-gold-muted/40">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Link href={experience.href} className="block h-full w-full">
                  <Image
                    src={experience.image}
                    alt={experience.imageAlt}
                    fill
                    sizes="272px"
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
              <Link href={experience.href} className="flex flex-1 flex-col p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-luxury-gold-muted">
                  {experience.category}
                </p>
                <h3 className="mt-1 font-heading text-base leading-snug text-foreground transition-luxury group-hover:text-luxury-gold">
                  {experience.title}
                </h3>
                <span className="mt-auto pt-3 text-sm text-luxury-gold-soft">
                  View overview
                </span>
              </Link>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
