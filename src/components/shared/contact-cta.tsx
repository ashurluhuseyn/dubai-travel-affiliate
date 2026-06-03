import Link from "next/link";
import type { LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ContactCtaProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel: string;
  actionHref: string;
  className?: string;
};

/**
 * Reusable horizontal "still need help?" banner — icon and copy on the left,
 * primary action on the right. Stacks on mobile.
 */
export function ContactCta({
  icon: Icon,
  title,
  description,
  actionLabel,
  actionHref,
  className,
}: ContactCtaProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-6 rounded-2xl border border-border/60 bg-luxury-charcoal px-6 py-8 text-center md:flex-row md:justify-between md:px-10 md:text-left",
        className
      )}
    >
      <div className="flex flex-col items-center gap-4 md:flex-row md:gap-5">
        <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-full border border-luxury-gold-muted/30 bg-luxury-gold/10 text-luxury-gold">
          <Icon className="size-6" aria-hidden />
        </span>
        <div>
          <h2 className="font-heading text-2xl text-foreground md:text-3xl">
            {title}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground md:text-base">
            {description}
          </p>
        </div>
      </div>
      <Button
        asChild
        size="lg"
        className="w-full rounded-full transition-luxury sm:w-auto"
      >
        <Link href={actionHref}>{actionLabel}</Link>
      </Button>
    </div>
  );
}
