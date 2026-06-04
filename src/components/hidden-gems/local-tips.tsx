import { Backpack, Clock, Route, UserMinus } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Section } from "@/components/shared/section";
import { SectionHeader } from "@/components/shared/section-header";
import { getLocalTips, type LocalTipIconKey } from "@/data";

const tipIcons: Record<LocalTipIconKey, LucideIcon> = {
  time: Clock,
  crowds: UserMinus,
  bring: Backpack,
  nearby: Route,
};

export function LocalTips() {
  const tips = getLocalTips();

  return (
    <Section muted>
      <SectionHeader
        align="center"
        label="Insider Knowledge"
        title="Local Tips"
        description="Make the most of every hidden gem with advice from our local team."
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {tips.map((tip) => {
          const Icon = tipIcons[tip.icon];
          return (
            <div
              key={tip.title}
              className="flex h-full flex-col gap-3 rounded-xl border border-border/60 bg-card p-6"
            >
              <span className="inline-flex size-11 items-center justify-center rounded-full border border-luxury-gold-muted/30 bg-luxury-gold/10 text-luxury-gold">
                <Icon className="size-5" aria-hidden />
              </span>
              <h3 className="font-heading text-lg text-foreground">
                {tip.title}
              </h3>
              <p className="text-sm text-muted-foreground">{tip.description}</p>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
