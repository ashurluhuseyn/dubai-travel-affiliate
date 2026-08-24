import Image from "next/image";
import { Gem, MapPin, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Breadcrumb } from "@/components/shared/breadcrumb";
import { Container } from "@/components/shared/container";
import { aboutHeroImage, getAboutTrustItems, type AboutTrustIconKey } from "@/data";

const trustIcons: Record<AboutTrustIconKey, LucideIcon> = {
  handpicked: Gem,
  experts: MapPin,
  quality: ShieldCheck,
};

const breadcrumbItems = [{ label: "Home", href: "/" }, { label: "About Us" }];

export function AboutHero() {
  const trustItems = getAboutTrustItems();

  return (
    <section className="relative isolate overflow-hidden pt-28 pb-14 lg:pt-32 lg:pb-20">
      <Image
        src={aboutHeroImage.src}
        alt={aboutHeroImage.alt}
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
          <p className="label-luxury">Our Story</p>
          <h1 className="mt-3 font-heading text-4xl leading-[1.05] text-foreground text-balance md:text-5xl lg:text-6xl">
            Building a Clearer Way to Explore{" "}
            <span className="gold-gradient-text">Dubai</span>
          </h1>
          <p className="mt-5 max-w-xl text-muted-foreground md:text-lg">
            Caspaya creates independent Dubai travel content with an emphasis
            on practical research, clear sourcing, and honest recommendations.
          </p>

          <ul className="mt-9 flex flex-wrap gap-x-8 gap-y-4 border-t border-border/40 pt-7">
            {trustItems.map((item) => {
              const Icon = trustIcons[item.icon];
              return (
                <li key={item.id} className="flex items-center gap-2.5">
                  <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-luxury-gold-muted/30 bg-luxury-gold/10 text-luxury-gold">
                    <Icon className="size-4" aria-hidden />
                  </span>
                  <span className="text-sm font-medium text-foreground">
                    {item.label}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </section>
  );
}
