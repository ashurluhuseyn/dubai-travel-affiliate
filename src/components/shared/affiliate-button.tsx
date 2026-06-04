import { Button, type buttonVariants } from "@/components/ui/button";
import { AFFILIATE_LINK_REL } from "@/lib/affiliate";
import { cn } from "@/lib/utils";
import type { VariantProps } from "class-variance-authority";

type AffiliateButtonProps = React.ComponentProps<"a"> &
  VariantProps<typeof buttonVariants> & {
    href: string;
  };

/**
 * Primary CTA for experience bookings — opens the affiliate partner in a new tab.
 */
export function AffiliateButton({
  href,
  className,
  variant,
  size,
  children,
  ...props
}: AffiliateButtonProps) {
  return (
    <Button asChild variant={variant} size={size} className={className}>
      <a
        href={href}
        target="_blank"
        rel={AFFILIATE_LINK_REL}
        {...props}
      >
        {children}
      </a>
    </Button>
  );
}

type AffiliateLinkProps = React.ComponentProps<"a"> & {
  href: string;
};

/** Non-button affiliate anchor (cards, titles, icon CTAs). */
export function AffiliateLink({ href, className, children, ...props }: AffiliateLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel={AFFILIATE_LINK_REL}
      className={cn(className)}
      {...props}
    >
      {children}
    </a>
  );
}
