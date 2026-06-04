import Link from "next/link";
import { Award, BadgeCheck, Headphones, Route } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Section } from "@/components/shared/section";
import { Button } from "@/components/ui/button";
import { getCategoryTrustItems, type TrustItemIconKey } from "@/data";

const trustIcons: Record<TrustItemIconKey, LucideIcon> = {
  itinerary: Route,
  price: BadgeCheck,
  support: Headphones,
  trusted: Award,
};

export function CategoriesCta() {
  const trustItems = getCategoryTrustItems();

  return (
    <Section id="contact">
      <div className="relative overflow-hidden rounded-3xl border border-luxury-gold-muted/30 bg-luxury-charcoal px-6 py-12 md:px-12 md:py-14">
        <div
          aria-hidden
          className="absolute -top-24 right-0 size-72 rounded-full bg-luxury-gold/10 blur-3xl"
        />
        <div className="relative grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <h2 className="font-heading text-3xl text-foreground text-balance md:text-4xl">
              Still cannot decide?
              <br />
              <span className="gold-gradient-text">We are here to help!</span>
            </h2>
            <p className="mt-4 max-w-md text-muted-foreground md:text-lg">
              Our travel experts are ready to create the perfect itinerary for
              you. Just tell us what you like.
            </p>
            <Button
              asChild
              size="lg"
              className="mt-8 rounded-full transition-luxury"
            >
              <Link href="#contact">Contact Our Experts</Link>
            </Button>
          </div>

          <ul className="grid grid-cols-2 gap-6 sm:grid-cols-4 lg:gap-4">
            {trustItems.map((item) => {
              const Icon = trustIcons[item.icon];
              return (
                <li
                  key={item.label}
                  className="flex flex-col items-center gap-3 text-center"
                >
                  <span className="inline-flex size-12 items-center justify-center rounded-full border border-luxury-gold-muted/30 bg-luxury-gold/10 text-luxury-gold">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <span className="text-xs font-medium leading-snug text-muted-foreground">
                    {item.label}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </Section>
  );
}
