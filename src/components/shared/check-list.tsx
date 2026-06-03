import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

type CheckListProps = {
  items: string[];
  className?: string;
  /** Spacing between rows. */
  gap?: "sm" | "md";
};

/**
 * Gold check-marked list used for highlights, inclusions and policy points.
 */
export function CheckList({ items, className, gap = "md" }: CheckListProps) {
  return (
    <ul className={cn(gap === "sm" ? "space-y-2.5" : "space-y-3.5", className)}>
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-sm leading-relaxed">
          <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full border border-luxury-gold-muted/40 bg-luxury-gold/10 text-luxury-gold">
            <Check className="size-3" aria-hidden />
          </span>
          <span className="text-muted-foreground">{item}</span>
        </li>
      ))}
    </ul>
  );
}
