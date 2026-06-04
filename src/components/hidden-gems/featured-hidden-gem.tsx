import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Camera,
  HandHeart,
  MapPin,
  UserMinus,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Section } from "@/components/shared/section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  getFeaturedHiddenGem,
  getHiddenGemReasons,
  type HiddenGemReasonIconKey,
} from "@/data";

const reasonIcons: Record<HiddenGemReasonIconKey, LucideIcon> = {
  authentic: BadgeCheck,
  crowds: UserMinus,
  photography: Camera,
  local: HandHeart,
};

export function FeaturedHiddenGemSection() {
  const featured = getFeaturedHiddenGem();
  const reasons = getHiddenGemReasons();

  return (
    <Section>
      <div className="grid gap-6 lg:grid-cols-[1.7fr_1fr] lg:gap-8">
        <Card className="grid gap-0 overflow-hidden border-border/60 bg-card py-0 transition-luxury hover:border-luxury-gold-muted/40 md:grid-cols-2">
          <div className="group relative aspect-[16/11] overflow-hidden md:aspect-auto md:min-h-[20rem]">
            <Image
              src={featured.image}
              alt={featured.imageAlt}
              fill
              sizes="(max-width: 768px) 100vw, 35vw"
              className="object-cover transition-luxury-slow group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/40 to-transparent" />
            <Badge className="absolute left-4 top-4 shadow-sm">
              Featured Gem
            </Badge>
          </div>

          <div className="flex flex-col justify-center gap-4 p-6 md:p-8">
            <h2 className="font-heading text-2xl text-foreground text-balance md:text-3xl">
              {featured.title}
            </h2>
            <span className="inline-flex items-center gap-1.5 text-sm text-luxury-gold-soft">
              <MapPin className="size-4" aria-hidden />
              {featured.location}
            </span>
            <p className="text-sm text-muted-foreground md:text-base">
              {featured.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {featured.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="border-luxury-gold-muted/30 text-luxury-gold-soft"
                >
                  {tag}
                </Badge>
              ))}
            </div>
            <Button asChild className="mt-2 w-fit rounded-full transition-luxury">
              <Link href={featured.href}>
                {featured.ctaLabel}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </Card>

        <aside className="rounded-xl border border-luxury-gold-muted/20 bg-luxury-charcoal/50 p-6 backdrop-blur-sm md:p-7">
          <h2 className="font-heading text-lg text-foreground md:text-xl">
            Why Explore Hidden Gems?
          </h2>
          <ul className="mt-5 space-y-5">
            {reasons.map((reason) => {
              const Icon = reasonIcons[reason.icon];
              return (
                <li key={reason.title} className="flex items-start gap-3">
                  <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-luxury-gold-muted/30 bg-luxury-gold/10 text-luxury-gold">
                    <Icon className="size-4" aria-hidden />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {reason.title}
                    </p>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      {reason.description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </aside>
      </div>
    </Section>
  );
}
