"use client";

import { Button, type buttonVariants } from "@/components/ui/button";
import { AFFILIATE_LINK_REL } from "@/lib/affiliate";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import type { VariantProps } from "class-variance-authority";

type AffiliateTrackingProps = {
  /** Optional GA4 event payload (e.g. experience id). */
  trackingLabel?: string;
};

type AffiliateButtonProps = React.ComponentProps<"a"> &
  VariantProps<typeof buttonVariants> & {
    href: string;
  } &
  AffiliateTrackingProps;

function handleAffiliateClick(trackingLabel?: string) {
  trackEvent("affiliate_click", {
    link_url: trackingLabel,
  });
}

/**
 * Primary CTA for experience bookings — opens the affiliate partner in a new tab.
 */
export function AffiliateButton({
  href,
  className,
  variant,
  size,
  children,
  trackingLabel,
  onClick,
  ...props
}: AffiliateButtonProps) {
  return (
    <Button asChild variant={variant} size={size} className={className}>
      <a
        href={href}
        target="_blank"
        rel={AFFILIATE_LINK_REL}
        onClick={(event) => {
          onClick?.(event);
          if (!event.defaultPrevented) {
            handleAffiliateClick(trackingLabel ?? href);
          }
        }}
        {...props}
      >
        {children}
      </a>
    </Button>
  );
}

type AffiliateLinkProps = React.ComponentProps<"a"> & {
  href: string;
} & AffiliateTrackingProps;

/** Non-button affiliate anchor (cards, titles, icon CTAs). */
export function AffiliateLink({
  href,
  className,
  children,
  trackingLabel,
  onClick,
  ...props
}: AffiliateLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel={AFFILIATE_LINK_REL}
      className={cn(className)}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) {
          handleAffiliateClick(trackingLabel ?? href);
        }
      }}
      {...props}
    >
      {children}
    </a>
  );
}
