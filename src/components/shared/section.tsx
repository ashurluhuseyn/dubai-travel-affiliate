import { Container } from "@/components/shared/container";
import { cn } from "@/lib/utils";

type SectionProps = {
  children: React.ReactNode;
  id?: string;
  /** Applies the charcoal "muted band" background variant */
  muted?: boolean;
  className?: string;
};

export function Section({ children, id, muted, className }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-24 py-section",
        muted && "border-y border-border/60 bg-luxury-charcoal/40",
        className
      )}
    >
      <Container>{children}</Container>
    </section>
  );
}
