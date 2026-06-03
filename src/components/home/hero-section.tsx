import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";

import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { heroStats } from "@/data";

export function HeroSection() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden pb-16 pt-32">
      <Image
        src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&q=85"
        alt="Dubai skyline at dusk with Burj Khalifa"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-luxury-black/95 via-luxury-black/75 to-luxury-black/45" />
      <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-transparent to-luxury-black/40" />

      <Container className="relative z-10">
        <div className="max-w-3xl animate-in fade-in slide-in-from-bottom-8 fill-mode-both duration-700">
          <p className="label-luxury">Curated Luxury Travel · Dubai</p>
          <h1 className="mt-4 font-heading text-4xl leading-[1.05] text-foreground text-balance sm:text-5xl md:text-6xl lg:text-7xl">
            Experience Dubai{" "}
            <span className="gold-gradient-text">Beyond Tourism</span>
          </h1>
          <p className="mt-6 max-w-xl text-base text-muted-foreground md:text-lg">
            Hand-picked experiences, hidden gems, and an AI concierge that
            crafts your perfect itinerary across the Emirates.
          </p>

          <div className="mt-8 flex w-full max-w-xl flex-col gap-3 rounded-2xl border border-border/70 bg-luxury-charcoal/70 p-3 backdrop-blur-xl sm:flex-row sm:items-center sm:rounded-full sm:pl-6">
            <div className="flex flex-1 items-center gap-3">
              <Search className="size-5 shrink-0 text-luxury-gold-muted" />
              <input
                type="text"
                aria-label="Search experiences"
                placeholder="Search desert safaris, yachts, dining…"
                className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
            </div>
            <Button asChild size="lg" className="rounded-full transition-luxury">
              <Link href="#experiences">
                Explore
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>

          <dl className="mt-12 grid max-w-xl grid-cols-3 gap-6 border-t border-border/60 pt-8">
            {heroStats.map((stat) => (
              <div key={stat.label}>
                <dt className="font-heading text-2xl text-luxury-gold-soft md:text-3xl">
                  {stat.value}
                </dt>
                <dd className="mt-1 text-xs text-muted-foreground md:text-sm">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}
