import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";

import { Section } from "@/components/shared/section";
import { Button } from "@/components/ui/button";

/** Decorative pin positions (percentage-based) for the placeholder map. */
const pins = [
  { top: "22%", left: "18%" },
  { top: "38%", left: "62%" },
  { top: "55%", left: "32%" },
  { top: "30%", left: "82%" },
  { top: "68%", left: "72%" },
  { top: "60%", left: "48%" },
];

export function HiddenGemsMap() {
  return (
    <Section>
      <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-luxury-charcoal">
        <div
          aria-hidden
          className="absolute inset-0 opacity-40 [background-image:linear-gradient(var(--luxury-border)_1px,transparent_1px),linear-gradient(90deg,var(--luxury-border)_1px,transparent_1px)] [background-size:48px_48px]"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,oklch(0.78_0.09_85/0.12),transparent_60%)]"
        />

        <div aria-hidden className="absolute inset-0">
          {pins.map((pin, index) => (
            <span
              key={index}
              className="absolute -translate-x-1/2 -translate-y-full text-luxury-gold"
              style={{ top: pin.top, left: pin.left }}
            >
              <MapPin className="size-6 fill-luxury-gold/20" />
            </span>
          ))}
        </div>

        <div className="relative flex min-h-[20rem] flex-col items-center justify-center gap-4 px-6 py-16 text-center md:min-h-[24rem]">
          <span className="inline-flex size-14 items-center justify-center rounded-full border border-luxury-gold-muted/30 bg-luxury-black/50 text-luxury-gold backdrop-blur-sm">
            <MapPin className="size-7" aria-hidden />
          </span>
          <h2 className="font-heading text-2xl text-foreground md:text-3xl">
            Hidden Gems Map
          </h2>
          <p className="max-w-md text-sm text-muted-foreground md:text-base">
            Explore every secret spot on an interactive map and plan your route
            across the city.
          </p>
          <Button
            asChild
            size="lg"
            className="mt-2 rounded-full transition-luxury"
          >
            <Link href="/hidden-gems">
              View All Locations
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </Section>
  );
}
