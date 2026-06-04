import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Crown,
  Gem,
  Landmark,
  Martini,
  Route,
  ShoppingBag,
  UtensilsCrossed,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import type { BlogCategory, BlogCategoryIconKey } from "@/data";

const categoryIcons: Record<BlogCategoryIconKey, LucideIcon> = {
  guides: BookOpen,
  itineraries: Route,
  "hidden-gems": Gem,
  luxury: Crown,
  food: UtensilsCrossed,
  nightlife: Martini,
  culture: Landmark,
  shopping: ShoppingBag,
};

type BlogCategoriesCardProps = {
  categories: BlogCategory[];
};

export function BlogCategoriesCard({ categories }: BlogCategoriesCardProps) {
  return (
    <section
      aria-labelledby="blog-categories-heading"
      className="rounded-xl border border-border/60 bg-card p-6"
    >
      <h2
        id="blog-categories-heading"
        className="font-heading text-lg text-foreground"
      >
        Categories
      </h2>

      <ul className="mt-4 space-y-1">
        {categories.map((category) => {
          const Icon = categoryIcons[category.icon];
          return (
            <li key={category.id}>
              <Link
                href={category.href}
                className="group flex items-center justify-between gap-3 rounded-lg px-2 py-2 text-sm transition-luxury hover:bg-luxury-elevated"
              >
                <span className="inline-flex items-center gap-2.5 text-muted-foreground transition-luxury group-hover:text-foreground">
                  <Icon className="size-4 text-luxury-gold-muted" aria-hidden />
                  {category.label}
                </span>
                <span className="inline-flex min-w-7 items-center justify-center rounded-full border border-luxury-gold-muted/30 bg-luxury-gold/10 px-2 py-0.5 text-xs font-medium text-luxury-gold-soft">
                  {category.count}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>

      <Link
        href="#"
        className="group mt-4 inline-flex items-center gap-1.5 text-sm text-luxury-gold-soft transition-luxury hover:text-luxury-gold"
      >
        View All Categories
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
      </Link>
    </section>
  );
}
