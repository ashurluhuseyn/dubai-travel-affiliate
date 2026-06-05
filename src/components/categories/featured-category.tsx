import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Play, ShieldCheck, UserCheck, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Section } from "@/components/shared/section";
import { Button } from "@/components/ui/button";
import { getFeaturedCategory, type FeaturedBenefitIconKey } from "@/data";

const benefitIcons: Record<FeaturedBenefitIconKey, LucideIcon> = {
  thrilling: Zap,
  guides: UserCheck,
  safety: ShieldCheck,
};

export function FeaturedCategorySection() {
  const featured = getFeaturedCategory();

  return (
    <Section muted>
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <Link
          href={featured.href}
          aria-label={`${featured.title} — watch preview`}
          className="group relative block aspect-[16/10] overflow-hidden rounded-3xl border border-border/60"
        >
          <Image
            src={featured.image}
            alt={featured.imageAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-luxury-slow group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-luxury-black/35 transition-luxury group-hover:bg-luxury-black/25" />
          <span className="absolute left-1/2 top-1/2 inline-flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-luxury-gold-muted/40 bg-luxury-black/50 text-luxury-gold backdrop-blur-sm transition-luxury group-hover:scale-110 group-hover:bg-luxury-gold/15">
            <Play className="size-6 translate-x-0.5 fill-current" aria-hidden />
          </span>
        </Link>

        <div>
          <p className="label-luxury">{featured.label}</p>
          <h2 className="mt-3 font-heading text-3xl text-foreground text-balance md:text-4xl">
            {featured.title}
          </h2>
          <p className="mt-4 max-w-lg text-muted-foreground md:text-lg">
            {featured.description}
          </p>

          <ul className="mt-7 flex flex-wrap gap-x-8 gap-y-4">
            {featured.benefits.map((benefit) => {
              const Icon = benefitIcons[benefit.icon];
              return (
                <li
                  key={benefit.label}
                  className="inline-flex items-center gap-2.5 text-sm text-muted-foreground"
                >
                  <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-luxury-gold-muted/30 bg-luxury-gold/10 text-luxury-gold">
                    <Icon className="size-4" aria-hidden />
                  </span>
                  {benefit.label}
                </li>
              );
            })}
          </ul>

          <Button asChild size="lg" className="mt-8 rounded-full transition-luxury">
            <Link href={featured.href}>
              {featured.ctaLabel}
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </Section>
  );
}
