import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

const sizeClasses = {
  sm: "size-8 [&_svg]:size-4",
  md: "size-9 [&_svg]:size-4",
  lg: "size-12 [&_svg]:size-5",
} as const;

type IconCircleProps = {
  icon: LucideIcon;
  size?: keyof typeof sizeClasses;
  className?: string;
  "aria-hidden"?: boolean;
};

/** Gold-bordered circular icon container used across marketing sections. */
export function IconCircle({
  icon: Icon,
  size = "md",
  className,
  "aria-hidden": ariaHidden = true,
}: IconCircleProps) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full border border-luxury-gold-muted/30 bg-luxury-gold/10 text-luxury-gold",
        sizeClasses[size],
        className
      )}
    >
      <Icon aria-hidden={ariaHidden} />
    </span>
  );
}
