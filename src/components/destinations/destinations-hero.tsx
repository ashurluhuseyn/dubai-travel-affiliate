"use client";

import Image from "next/image";
import { Search } from "lucide-react";
import { useState } from "react";

import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";

type DestinationsHeroProps = {
  initialQuery?: string;
  onSearchSubmit: (query: string) => void;
};

export function DestinationsHero({
  initialQuery = "",
  onSearchSubmit,
}: DestinationsHeroProps) {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  return (
    <section className="relative flex min-h-[60vh] items-center overflow-hidden pt-32 pb-16 md:min-h-[68vh]">
      <Image
        src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&q=85"
        alt="Dubai Marina skyline at night with a luxury yacht"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-luxury-black/95 via-luxury-black/75 to-luxury-black/45" />
      <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-transparent to-luxury-black/40" />

      <Container className="relative z-10">
        <div className="max-w-2xl">
          <h1 className="font-heading text-4xl leading-[1.05] text-foreground text-balance sm:text-5xl md:text-6xl">
            Explore Dubai{" "}
            <span className="gold-gradient-text">Experiences</span>
          </h1>
          <p className="mt-5 max-w-xl text-base text-muted-foreground md:text-lg">
            Discover unforgettable moments in the city of dreams. Choose from
            1000+ handpicked experiences.
          </p>

          <form
            className="mt-8 flex w-full max-w-xl flex-col gap-3 rounded-2xl border border-border/70 bg-luxury-charcoal/70 p-3 backdrop-blur-xl sm:flex-row sm:items-center sm:rounded-full sm:pl-6"
            role="search"
            onSubmit={(event) => {
              event.preventDefault();
              onSearchSubmit(searchQuery);
            }}
          >
            <div className="flex flex-1 items-center gap-3">
              <Search className="size-5 shrink-0 text-luxury-gold-muted" />
              <input
                type="search"
                aria-label="Search experiences"
                placeholder="Search experiences, activities, tours…"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
            </div>
            <Button type="submit" size="lg" className="rounded-full transition-luxury">
              Search
            </Button>
          </form>
        </div>
      </Container>
    </section>
  );
}
