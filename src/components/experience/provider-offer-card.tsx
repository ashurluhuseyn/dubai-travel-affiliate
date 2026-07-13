import { BadgeCheck, RotateCcw, Star, Zap } from "lucide-react";

import { ProviderBadge } from "@/components/experience/provider-badge";
import { AffiliateButton } from "@/components/shared/affiliate-button";
import type { AffiliateProvider } from "@/data";
import { formatProviderPrice } from "@/lib/experience-providers";

type ProviderOfferCardProps = {
  provider: AffiliateProvider;
  experienceSlug: string;
  priceUnit: string;
};

export function ProviderOfferCard({
  provider,
  experienceSlug,
  priceUnit,
}: ProviderOfferCardProps) {
  return (
    <article className="rounded-xl border border-border/60 bg-luxury-black/20 p-5 transition-luxury hover:border-luxury-gold-muted/40 md:p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-heading text-lg text-foreground">
              {provider.providerName}
            </h3>
            {provider.isRecommended && (
              <ProviderBadge label="Recommended" variant="recommended" />
            )}
            {provider.badge && !provider.isRecommended && (
              <ProviderBadge label={provider.badge} />
            )}
          </div>
          {provider.description && (
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {provider.description}
            </p>
          )}
        </div>

        <div className="shrink-0 text-right">
          <p className="whitespace-nowrap font-heading text-2xl leading-none tracking-tight text-luxury-gold">
            {formatProviderPrice(provider)}
          </p>
          <p className="mt-1.5 whitespace-nowrap text-sm text-muted-foreground">
            / {priceUnit}
          </p>
        </div>
      </div>

      {(provider.rating !== undefined || provider.reviewCount !== undefined) && (
        <p className="mt-4 inline-flex items-center gap-2 text-sm text-muted-foreground">
          <Star className="size-4 fill-luxury-gold text-luxury-gold" aria-hidden />
          <span className="font-medium text-foreground">
            {provider.rating?.toFixed(1)}
          </span>
          {provider.reviewCount !== undefined && (
            <span>({provider.reviewCount.toLocaleString()} reviews)</span>
          )}
        </p>
      )}

      <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-muted-foreground">
        {provider.cancellationText && (
          <li className="flex items-start gap-2.5">
            <RotateCcw
              className="mt-0.5 size-4 shrink-0 text-luxury-gold-muted"
              aria-hidden
            />
            <span>{provider.cancellationText}</span>
          </li>
        )}
        {provider.instantConfirmation && (
          <li className="flex items-center gap-2.5">
            <Zap className="size-4 shrink-0 text-luxury-gold-muted" aria-hidden />
            <span>Instant confirmation</span>
          </li>
        )}
        {provider.mobileTicket && (
          <li className="flex items-center gap-2.5">
            <BadgeCheck
              className="size-4 shrink-0 text-luxury-gold-muted"
              aria-hidden
            />
            <span>Mobile ticket</span>
          </li>
        )}
      </ul>

      <AffiliateButton
        href={provider.affiliateUrl}
        size="lg"
        className="mt-5 min-h-11 w-full rounded-full transition-luxury"
        trackingLabel={`${experienceSlug}:${provider.providerName}`}
        data-provider={provider.providerName}
        data-experience-slug={experienceSlug}
      >
        Check Availability
      </AffiliateButton>
    </article>
  );
}
