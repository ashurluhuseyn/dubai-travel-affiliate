import Link from "next/link";

import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeader } from "@/components/shared/section-header";
import { categories } from "@/data";

export function CategoryExplorer() {
  return (
    <section
      id="categories"
      className="scroll-mt-24 border-y border-border/60 bg-luxury-charcoal/40 py-section"
    >
      <Container>
        <SectionHeader
          align="center"
          label="Browse"
          title="Explore by Category"
          description="Find your kind of luxury — from skyline landmarks to desert escapes."
        />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Reveal key={category.id} delay={index * 60}>
                <Link
                  href={category.href}
                  className="group flex h-full flex-col items-center gap-3 rounded-xl border border-border/60 bg-card p-5 text-center transition-luxury hover:-translate-y-1 hover:border-luxury-gold-muted/40 hover:bg-luxury-elevated"
                >
                  <span className="flex size-12 items-center justify-center rounded-full bg-luxury-elevated text-luxury-gold transition-luxury group-hover:bg-luxury-gold/10">
                    <Icon className="size-5" />
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
      </Container>
    </section>
  );
}
