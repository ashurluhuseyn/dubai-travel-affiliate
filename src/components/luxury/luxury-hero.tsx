import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Breadcrumb } from "@/components/shared/breadcrumb";
import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";

const breadcrumbItems = [{ label: "Home", href: "/" }, { label: "Luxury" }];

export function LuxuryHero() {
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
            Explore editorial themes for researching Dubai&apos;s hotels, dining,
            desert retreats, and waterfront experiences.
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

        </div>
      </Container>
    </section>
  );
}
