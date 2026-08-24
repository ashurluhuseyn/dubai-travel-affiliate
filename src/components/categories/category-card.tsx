import Image from "next/image";
import Link from "next/link";
import {
  Car,
  FerrisWheel,
  Gem,
  Landmark,
  Martini,
  Sailboat,
  Users,
  UtensilsCrossed,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import type { CategoryShowcase, CategoryShowcaseIconKey } from "@/data";

const categoryIcons: Record<CategoryShowcaseIconKey, LucideIcon> = {
  desert: Car,
  yacht: Sailboat,
  luxury: Gem,
  nightlife: Martini,
  family: Users,
  dining: UtensilsCrossed,
  attractions: FerrisWheel,
  culture: Landmark,
};

type CategoryCardProps = {
  category: CategoryShowcase;
  priority?: boolean;
};

export function CategoryCard({ category, priority = false }: CategoryCardProps) {
  const Icon = categoryIcons[category.icon];

  return (
    <Link
      href={category.href}
      className="group relative block aspect-[4/3] overflow-hidden rounded-2xl border border-border/60 transition-luxury hover:-translate-y-1 hover:border-luxury-gold-muted/50 hover:shadow-xl hover:shadow-luxury-gold/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-luxury-gold/60"
    >
      <Image
        src={category.image}
        alt={category.imageAlt}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        className="object-cover transition-luxury-slow group-hover:scale-105"
        priority={priority}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-luxury-black/45 to-luxury-black/10" />

      <div className="relative flex h-full flex-col items-start justify-end gap-2.5 p-5">
        <span className="inline-flex size-11 items-center justify-center rounded-full border border-luxury-gold-muted/30 bg-luxury-black/40 text-luxury-gold backdrop-blur-sm transition-luxury group-hover:bg-luxury-gold/15">
          <Icon className="size-5" aria-hidden />
        </span>
        <h3 className="font-heading text-lg text-luxury-white">
          {category.title}
        </h3>
      </div>
    </Link>
  );
}
