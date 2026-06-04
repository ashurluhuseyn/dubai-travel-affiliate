import { Car, Clock, Smartphone, Star, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import type { ExperienceMeta, ExperienceMetaIconKey } from "@/data";
import { cn } from "@/lib/utils";

const metaIcons: Record<ExperienceMetaIconKey, LucideIcon> = {
  duration: Clock,
  group: Users,
  pickup: Car,
  ticket: Smartphone,
};

type ExperienceHeaderProps = {
  title: string;
  rating: number;
  reviews: number;
  description: string;
  meta: ExperienceMeta[];
};

export function ExperienceHeader({
  title,
  rating,
  reviews,
  description,
  meta,
}: ExperienceHeaderProps) {
  return (
    <header>
      <h1 className="font-heading text-3xl text-foreground text-balance md:text-4xl lg:text-[2.75rem] lg:leading-tight">
        {title}
      </h1>

      <div className="mt-3 flex items-center gap-2 text-sm">
        <div className="flex items-center" aria-hidden>
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              className={cn(
                "size-4",
                index < Math.round(rating)
                  ? "fill-luxury-gold text-luxury-gold"
                  : "text-luxury-white-subtle"
              )}
            />
          ))}
        </div>
        <span className="font-medium text-foreground">{rating.toFixed(1)}</span>
        <span className="text-muted-foreground">
          ({reviews.toLocaleString()} reviews)
        </span>
      </div>

      <ul className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
        {meta.map((item) => {
          const Icon = metaIcons[item.icon];
          return (
            <li key={item.label} className="inline-flex items-center gap-2">
              <Icon className="size-4 text-luxury-gold-muted" aria-hidden />
              {item.label}
            </li>
          );
        })}
      </ul>

      <p className="mt-5 max-w-2xl text-muted-foreground md:text-lg">
        {description}
      </p>
    </header>
  );
}
