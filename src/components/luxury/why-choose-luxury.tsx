import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { CheckList } from "@/components/shared/check-list";
import { Section } from "@/components/shared/section";
import { Button } from "@/components/ui/button";
import { elevateBenefits, luxuryEditorialImage, luxuryReasons } from "@/data";

export function WhyChooseLuxury() {
  return (
    <Section muted>
      <div className="grid items-center gap-10 lg:grid-cols-3 lg:gap-10">
        <div>
          <p className="label-luxury">The Dubai Moments Difference</p>
          <h2 className="mt-3 font-heading text-3xl text-foreground text-balance md:text-4xl">
            Why Choose Luxury in Dubai?
          </h2>
          <p className="mt-4 text-muted-foreground">
            Dubai redefines luxury with world-class hospitality, iconic
            landmarks, and once-in-a-lifetime experiences curated just for you.
          </p>
          <CheckList items={luxuryReasons} className="mt-6" gap="sm" />
          <Button
            asChild
            variant="outline"
            className="mt-7 rounded-full border-border/80 bg-transparent transition-luxury hover:bg-luxury-elevated"
          >
            <Link href="#collections">
              Learn More About Luxury Travel
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>

        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-border/60 lg:order-none">
          <Image
            src={luxuryEditorialImage.src}
            alt={luxuryEditorialImage.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 33vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/40 to-transparent" />
        </div>

        <div className="rounded-2xl border border-luxury-gold-muted/20 bg-luxury-charcoal/50 p-6 backdrop-blur-sm md:p-7">
          <h3 className="font-heading text-xl text-foreground">
            Elevate Every Moment
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            From sunrise yacht cruises to private helicopter tours, we curate
            every detail so you can simply enjoy.
          </p>
          <CheckList items={elevateBenefits} className="mt-5" gap="sm" />
        </div>
      </div>
    </Section>
  );
}
