import { Gem, Heart, Star, UserRound } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { SectionHeader } from "@/components/shared/section-header";
import { getAboutValues, type AboutValueIconKey } from "@/data";

const valueIcons: Record<AboutValueIconKey, LucideIcon> = {
  customer: UserRound,
  authenticity: Star,
  excellence: Gem,
  sustainability: Heart,
};

export function OurValues() {
  const values = getAboutValues();

  return (
    <Section muted>
      <SectionHeader label="What We Stand For" title="Our Values" />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {values.map((value, index) => {
          const Icon = valueIcons[value.icon];
          return (
            <Reveal key={value.id} delay={index * 60}>
              <div className="flex h-full flex-col gap-3 rounded-xl border border-border/60 bg-card p-6 transition-luxury hover:-translate-y-1 hover:border-luxury-gold-muted/40">
                <span className="inline-flex size-12 items-center justify-center rounded-full border border-luxury-gold-muted/30 bg-luxury-gold/10 text-luxury-gold">
                  <Icon className="size-5" aria-hidden />
                </span>
                <h3 className="font-heading text-lg text-foreground">
                  {value.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {value.description}
                </p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
