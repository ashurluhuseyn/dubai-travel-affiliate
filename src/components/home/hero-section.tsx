import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

export function HeroSection() {
  return (
    <section className="relative flex min-h-[100svh] items-end overflow-hidden pb-16 pt-28 md:items-center md:pb-24 md:pt-32">
      <Image
        src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&q=85"
        alt="Dubai skyline at dusk with Burj Khalifa"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-luxury-black/95 via-luxury-black/70 to-luxury-black/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-transparent to-luxury-black/30" />

      <Container className="relative z-10">
        <div className="max-w-3xl animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both">
          <p className="label-luxury">United Arab Emirates</p>
          <h1 className="mt-4 font-heading text-4xl leading-[1.1] text-foreground sm:text-5xl md:text-6xl lg:text-7xl text-balance">
            Where the desert meets{" "}
            <span className="gold-gradient-text">extraordinary</span>
          </h1>
          <p className="mt-6 max-w-xl text-base text-muted-foreground md:text-lg">
            {siteConfig.tagline}. Curated hotels, private tours, and the finest
            nightlife — crafted for discerning travelers.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button asChild size="lg" className="transition-luxury">
              <Link href="#hotels">
                Explore hotels
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-border/80 bg-luxury-black/40 backdrop-blur-sm transition-luxury hover:bg-luxury-elevated"
            >
              <Link href="#destinations">Discover destinations</Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
