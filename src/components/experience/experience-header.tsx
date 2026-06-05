import { Car, Clock, Smartphone, Star, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import type { Experience } from "@/data";
import { cn } from "@/lib/utils";

type MetaItem = {
  icon: LucideIcon;
  label: string;
};

function buildMetaItems(experience: Experience): MetaItem[] {
  const items: MetaItem[] = [
    { icon: Clock, label: experience.duration },
    { icon: Users, label: experience.groupSize },
  ];
  if (experience.hotelPickup) {
    items.push({ icon: Car, label: "Hotel Pickup" });
  }
  if (experience.mobileTicket) {
    items.push({ icon: Smartphone, label: "Mobile Ticket" });
  }
  return items;
}

type ExperienceHeaderProps = {
  experience: Experience;
};

export function ExperienceHeader({ experience }: ExperienceHeaderProps) {
  const meta = buildMetaItems(experience);

  return (
    <header>
      <h1 className="font-heading text-3xl text-foreground text-balance md:text-4xl lg:text-[2.75rem] lg:leading-tight">
        {experience.title}
      </h1>

      <div className="mt-3 flex items-center gap-2 text-sm">
        <div className="flex items-center" aria-hidden>
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              className={cn(
                "size-4",
                index < Math.round(experience.rating)
                  ? "fill-luxury-gold text-luxury-gold"
                  : "text-luxury-white-subtle"
              )}
            />
          ))}
        </div>
        <span className="font-medium text-foreground">
          {experience.rating.toFixed(1)}
        </span>
        <span className="text-muted-foreground">
          ({experience.reviewCount.toLocaleString()} reviews)
        </span>
      </div>

      <ul className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
        {meta.map((item) => (
          <li key={item.label} className="inline-flex items-center gap-2">
            <item.icon className="size-4 text-luxury-gold-muted" aria-hidden />
            {item.label}
          </li>
        ))}
      </ul>

      <p className="mt-5 max-w-2xl text-muted-foreground md:text-lg">
        {experience.description}
      </p>
    </header>
  );
}
