import { Car, GlassWater, Music, Tent, UtensilsCrossed } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import type { IncludedIconKey, IncludedItem } from "@/data";

const includedIcons: Record<IncludedIconKey, LucideIcon> = {
  pickup: Car,
  dinner: UtensilsCrossed,
  shows: Music,
  camel: Tent,
  drinks: GlassWater,
};

type ExperienceIncludedProps = {
  items: IncludedItem[];
};

export function ExperienceIncluded({ items }: ExperienceIncludedProps) {
  return (
    <section aria-labelledby="included-heading">
      <h2
        id="included-heading"
        className="font-heading text-xl text-foreground md:text-2xl"
      >
        What&apos;s Included
      </h2>
      <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {items.map((item) => {
          const Icon = includedIcons[item.icon];
          return (
            <li
              key={item.id}
              className="group flex flex-col items-center gap-3 rounded-xl border border-border/60 bg-card p-4 text-center transition-luxury hover:-translate-y-1 hover:border-luxury-gold-muted/40"
            >
              <span className="inline-flex size-12 items-center justify-center rounded-full border border-luxury-gold-muted/30 bg-luxury-gold/10 text-luxury-gold transition-luxury group-hover:bg-luxury-gold/15">
                <Icon className="size-6" aria-hidden />
              </span>
              <span className="text-xs font-medium leading-snug text-muted-foreground">
                {item.label}
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
