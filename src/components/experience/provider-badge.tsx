import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type ProviderBadgeProps = {
  label: string;
  variant?: "recommended" | "default";
  className?: string;
};

export function ProviderBadge({
  label,
  variant = "default",
  className,
}: ProviderBadgeProps) {
  return (
    <Badge
      variant={variant === "recommended" ? "default" : "outline"}
      className={cn(
        variant === "recommended"
          ? "border-luxury-gold-muted/40 bg-luxury-gold/15 text-luxury-gold-soft"
          : "border-luxury-gold-muted/30 text-luxury-gold-soft",
        className
      )}
    >
      {label}
    </Badge>
  );
}
