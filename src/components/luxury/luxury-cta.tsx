import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";

import { Section } from "@/components/shared/section";
import { Button } from "@/components/ui/button";
import { luxuryCtaImage, luxuryCtaTrust } from "@/data";

export function LuxuryCta() {
  return (
    <Section>
      <div className="grid overflow-hidden rounded-3xl border border-luxury-gold-muted/30 bg-luxury-charcoal md:grid-cols-2 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="relative aspect-[16/10] md:aspect-auto md:min-h-full">
          <Image
            src={luxuryCtaImage.src}
            alt={luxuryCtaImage.alt}
            fill
            sizes="(max-width: 768px) 100vw, 40vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-luxury-black/30 to-luxury-charcoal md:bg-gradient-to-r md:from-transparent md:to-luxury-charcoal" />
        </div>

        <div className="flex flex-col justify-center gap-5 p-6 md:p-10">
          <div>
            <h2 className="font-heading text-3xl text-foreground text-balance md:text-4xl">
              Plan Your Dream Luxury Escape
            </h2>
            <p className="mt-3 max-w-lg text-muted-foreground md:text-lg">
              Our travel experts are here to create a tailor-made luxury
              experience that exceeds your expectations.
            </p>
          </div>

          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <Button
              asChild
              size="lg"
              className="w-full rounded-full transition-luxury sm:w-fit"
            >
              <Link href="/contact">Get In Touch</Link>
            </Button>

            <ul className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-5">
              {luxuryCtaTrust.map((item) => (
                <li
                  key={item}
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <span className="inline-flex size-5 shrink-0 items-center justify-center rounded-full border border-luxury-gold-muted/40 bg-luxury-gold/10 text-luxury-gold">
                    <Check className="size-3" aria-hidden />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}
