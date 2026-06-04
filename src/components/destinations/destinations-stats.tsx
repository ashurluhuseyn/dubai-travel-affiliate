import { BadgeCheck, Compass, Headphones, Star } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Container } from "@/components/shared/container";
import { getDestinationStats } from "@/data";
import type { StatIconKey } from "@/data";

const statIcons: Record<StatIconKey, LucideIcon> = {
  experiences: Compass,
  rating: Star,
  price: BadgeCheck,
  support: Headphones,
};

export function DestinationsStats() {
  const stats = getDestinationStats();

  return (
    <section className="border-b border-border/60 bg-luxury-charcoal/40">
      <Container className="grid grid-cols-2 gap-6 py-8 md:grid-cols-4">
        {stats.map((stat) => {
          const Icon = statIcons[stat.icon];
          return (
            <div key={stat.id} className="flex items-center gap-3">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-luxury-gold-muted/30 bg-luxury-elevated text-luxury-gold">
                <Icon className="size-5" />
              </span>
              <div>
                <p className="font-heading text-lg text-foreground">
                  {stat.value}
                </p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </Container>
    </section>
  );
}
