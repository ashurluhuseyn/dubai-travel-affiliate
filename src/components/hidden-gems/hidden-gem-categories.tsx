import Link from "next/link";
import {
  Camera,
  Coffee,
  Landmark,
  Sparkles,
  Tag,
  TreePalm,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { SectionHeader } from "@/components/shared/section-header";
import { getHiddenGemCategories, type HiddenGemCategoryIconKey } from "@/data";

const categoryIcons: Record<HiddenGemCategoryIconKey, LucideIcon> = {
  nature: TreePalm,
  culture: Landmark,
  cafes: Coffee,
  photography: Camera,
  unique: Sparkles,
  free: Tag,
};

export function HiddenGemCategories() {
  const categories = getHiddenGemCategories();

  return (
    <Section>
      <SectionHeader
        align="center"
        label="Browse by Interest"
        title="Find Your Kind of Hidden Gem"
      />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {categories.map((category, index) => {
          const Icon = categoryIcons[category.icon];
          return (
            <Reveal key={category.id} delay={index * 50}>
              <Link
                href={category.href}
                className="group flex h-full flex-col items-center gap-3 rounded-xl border border-border/60 bg-card p-5 text-center transition-luxury hover:-translate-y-1 hover:border-luxury-gold-muted/40 hover:bg-luxury-elevated"
              >
                <span className="inline-flex size-12 items-center justify-center rounded-full border border-luxury-gold-muted/30 bg-luxury-gold/10 text-luxury-gold transition-luxury group-hover:bg-luxury-gold/15">
                  <Icon className="size-5" aria-hidden />
                </span>
                <span className="text-sm font-medium text-foreground">
                  {category.label}
                </span>
                <span className="text-xs text-muted-foreground">
                  {category.count}
                </span>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
