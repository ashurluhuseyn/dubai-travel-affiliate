import { BookOpen, Crown, Headset, Lock, Tag } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { SectionHeader } from "@/components/shared/section-header";
import { getWhyChooseItems, type WhyChooseIconKey } from "@/data";

const whyChooseIcons: Record<WhyChooseIconKey, LucideIcon> = {
  expertise: BookOpen,
  selection: Crown,
  secure: Lock,
  price: Tag,
  concierge: Headset,
};

export function WhyChoose() {
  const items = getWhyChooseItems();

  return (
    <Section muted>
      <SectionHeader
        label="The Dubai Moments Difference"
        title="Why Choose Dubai Moments"
        align="center"
      />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {items.map((item, index) => {
          const Icon = whyChooseIcons[item.icon];
          return (
            <Reveal key={item.id} delay={index * 60}>
              <div className="flex h-full flex-col items-center gap-3 rounded-xl border border-border/60 bg-card p-6 text-center transition-luxury hover:-translate-y-1 hover:border-luxury-gold-muted/40">
                <span className="inline-flex size-12 items-center justify-center rounded-full border border-luxury-gold-muted/30 bg-luxury-gold/10 text-luxury-gold">
                  <Icon className="size-5" aria-hidden />
                </span>
                <h3 className="font-heading text-lg text-foreground">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
