import Image from "next/image";

import { HeroSearch } from "@/components/home/hero-search";
import { Container } from "@/components/shared/container";
import { siteConfig } from "@/lib/site";

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
          <p className="label-luxury">{siteConfig.tagline}</p>
          <h1 className="mt-4 font-heading text-4xl leading-[1.05] text-foreground text-balance sm:text-5xl md:text-6xl lg:text-7xl">
            Discover Dubai{" "}
            <span className="gold-gradient-text">Beyond the Ordinary</span>
          </h1>
          <p className="mt-6 max-w-xl text-base text-muted-foreground md:text-lg">
            Independent travel notes, destination ideas, and practical guides
            for planning a more informed visit to Dubai.
          </p>

          <HeroSearch />
        </div>
      </Container>
    </section>
  );
}
