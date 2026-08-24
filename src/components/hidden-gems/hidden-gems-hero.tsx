import Image from "next/image";
import Link from "next/link";
import { Camera, Compass, Heart, Search, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Breadcrumb } from "@/components/shared/breadcrumb";
import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";

const breadcrumbItems = [{ label: "Home", href: "/" }, { label: "Hidden Gems" }];

const quickFilters: { icon: LucideIcon; label: string }[] = [
  { icon: Heart, label: "Waterfront" },
  { icon: Sparkles, label: "Culture" },
  { icon: Camera, label: "Architecture" },
  { icon: Compass, label: "Art & Cafés" },
];

type HiddenGemsHeroProps = {
  initialSearch?: string;
};

export function HiddenGemsHero({ initialSearch = "" }: HiddenGemsHeroProps) {
  return (
    <section className="relative isolate overflow-hidden pt-28 pb-14 lg:pt-32 lg:pb-20">
      <Image
        src="https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1920&q=85"
        alt="Old Dubai waterway lit up at night"
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-luxury-black via-luxury-black/80 to-luxury-black/40" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-luxury-black via-transparent to-luxury-black/50" />

      <Container>
        <Breadcrumb items={breadcrumbItems} />

        <div className="mt-10 max-w-2xl">
          <p className="label-luxury">Discover More</p>
          <h1 className="mt-3 font-heading text-4xl leading-[1.05] text-foreground text-balance md:text-5xl lg:text-6xl">
            Hidden Gems <span className="gold-gradient-text">in Dubai</span>
          </h1>
          <p className="mt-5 max-w-xl text-muted-foreground md:text-lg">
            Browse less-obvious beaches, cafés, cultural places, and city
            corners while detailed guides are being verified.
          </p>

          <form
            action="/hidden-gems"
            method="get"
            role="search"
            className="mt-8 flex w-full max-w-md items-center gap-2 rounded-full border border-border/70 bg-luxury-charcoal/70 p-2 pl-5 backdrop-blur-xl"
          >
            <Search
              className="size-5 shrink-0 text-luxury-gold-muted"
              aria-hidden
            />
            <input
              type="search"
              name="search"
              defaultValue={initialSearch}
              aria-label="Search hidden gems"
              placeholder="Search hidden gems…"
              className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
            <Button
              type="submit"
              size="icon"
              className="size-9 shrink-0 rounded-full transition-luxury"
              aria-label="Search"
            >
              <Search className="size-4" />
            </Button>
          </form>

          <Button
            asChild
            size="lg"
            className="mt-4 rounded-full transition-luxury"
          >
            <Link href="#gems">Explore Hidden Gems</Link>
          </Button>

          <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground">
            {quickFilters.map((filter) => (
              <li key={filter.label} className="inline-flex items-center gap-2">
                <filter.icon
                  className="size-4 text-luxury-gold-muted"
                  aria-hidden
                />
                {filter.label}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
