import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Section } from "@/components/shared/section";
import { Button } from "@/components/ui/button";
import { aboutStoryImages, aboutStoryParagraphs } from "@/data";

export function OurStory() {
  return (
    <Section>
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <div>
          <p className="label-luxury">Our Story</p>
          <h2 className="mt-3 font-heading text-3xl text-foreground text-balance md:text-4xl">
            Passion. Local Knowledge. Unmatched Experiences.
          </h2>
          <div className="mt-5 space-y-4 text-muted-foreground md:text-lg">
            {aboutStoryParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <Button
            asChild
            size="lg"
            className="mt-8 rounded-full transition-luxury"
          >
            <Link href="/destinations">
              Discover Our Journey
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          {aboutStoryImages.map((image, index) => (
            <div
              key={image.src}
              className={
                "relative aspect-[3/4] overflow-hidden rounded-2xl border border-border/60" +
                (index === 1 ? " mt-6 sm:mt-8" : "")
              }
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 1024px) 33vw, 16vw"
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/40 to-transparent" />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
