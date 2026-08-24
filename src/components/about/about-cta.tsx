import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Section } from "@/components/shared/section";
import { Button } from "@/components/ui/button";
import { aboutCtaImage } from "@/data";

export function AboutCta() {
  return (
    <Section>
      <div className="relative isolate overflow-hidden rounded-3xl border border-luxury-gold-muted/30 px-6 py-14 md:px-12 md:py-16">
        <Image
          src={aboutCtaImage.src}
          alt={aboutCtaImage.alt}
          fill
          sizes="100vw"
          className="-z-10 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-luxury-black via-luxury-black/85 to-luxury-black/55" />

        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <h2 className="font-heading text-3xl text-foreground text-balance md:text-4xl">
              Start Exploring More of{" "}
              <span className="gold-gradient-text">Dubai?</span>
            </h2>
            <p className="mt-3 text-muted-foreground md:text-lg">
              Browse destination ideas while our first in-depth guides are
              being researched and prepared.
            </p>
          </div>
          <Button
            asChild
            size="lg"
            className="shrink-0 rounded-full transition-luxury"
          >
            <Link href="/destinations">
              Explore Experiences
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </Section>
  );
}
