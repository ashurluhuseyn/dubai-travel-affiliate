import { Award, Headset, MapPin, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Container } from "@/components/shared/container";
import { getAboutStats, type AboutStatIconKey } from "@/data";

const statIcons: Record<AboutStatIconKey, LucideIcon> = {
  travelers: Users,
  experiences: MapPin,
  partners: Award,
  support: Headset,
};

export function AboutStats() {
  const stats = getAboutStats();

  return (
    <section className="py-12 md:py-16">
      <Container>
        <dl className="grid grid-cols-2 gap-6 rounded-2xl border border-border/60 bg-luxury-charcoal/40 p-8 md:grid-cols-4 md:p-10">
          {stats.map((stat) => {
            const Icon = statIcons[stat.icon];
            return (
              <div
                key={stat.id}
                className="flex flex-col items-center text-center md:flex-row md:items-center md:gap-4 md:text-left"
              >
                <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-full border border-luxury-gold-muted/30 bg-luxury-gold/10 text-luxury-gold">
                  <Icon className="size-5" aria-hidden />
                </span>
                <div className="mt-3 md:mt-0">
                  <dt className="font-heading text-3xl text-foreground md:text-4xl">
                    {stat.value}
                  </dt>
                  <dd className="mt-1 text-sm text-muted-foreground">
                    {stat.label}
                  </dd>
                </div>
              </div>
            );
          })}
        </dl>
      </Container>
    </section>
  );
}
