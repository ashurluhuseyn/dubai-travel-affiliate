import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Gem, Handshake, Headset } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Breadcrumb } from "@/components/shared/breadcrumb";
import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { getLuxuryHighlights, type LuxuryHighlightIconKey } from "@/data";

const highlightIcons: Record<LuxuryHighlightIconKey, LucideIcon> = {
  handpicked: Gem,
  partners: Handshake,
  price: BadgeCheck,
  support: Headset,
};

const breadcrumbItems = [{ label: "Home", href: "/" }, { label: "Luxury" }];

export function LuxuryHero() {
  const highlights = getLuxuryHighlights();

  return (
    <section className="relative isolate overflow-hidden pt-28 pb-14 lg:pt-32 lg:pb-20">
      <Image
        src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&q=85"
        alt="Dubai skyline and luxury yacht at night"
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-luxury-black via-luxury-black/80 to-luxury-black/30" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-luxury-black via-transparent to-luxury-black/50" />

      <Container>
        <Breadcrumb items={breadcrumbItems} />

        <div className="mt-10 max-w-2xl">
          <p className="label-luxury">Extraordinary by Nature</p>
          <h1 className="mt-3 font-heading text-4xl leading-[1.05] text-foreground text-balance md:text-5xl lg:text-6xl">
            Luxury Experiences{" "}
            <span className="gold-gradient-text">in Dubai</span>
          </h1>
          <p className="mt-5 max-w-xl text-muted-foreground md:text-lg">
            Indulge in the finest Dubai has to offer. From private yacht
            charters to exclusive desert retreats, discover a world of unmatched
            luxury.
          </p>

          <Button
            asChild
            size="lg"
            className="mt-8 rounded-full transition-luxury"
          >
            <Link href="#collections">
              Explore Luxury Experiences
              <ArrowRight className="size-4" />
            </Link>
          </Button>

          <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-4 sm:flex sm:flex-wrap sm:gap-x-8">
            {highlights.map((highlight) => {
              const Icon = highlightIcons[highlight.icon];
              return (
                <li
                  key={highlight.label}
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <Icon
                    className="size-4 shrink-0 text-luxury-gold-muted"
                    aria-hidden
                  />
                  {highlight.label}
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </section>
  );
}
