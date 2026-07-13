import type { AffiliateProvider } from "@/data/types";

import { formatFromPrice, formatPrice } from "./format-price";

/** Converts a USD listing price to AED for mock provider offers. */
export function usdToAed(usd: number): number {
  return Math.round(usd * 3.67);
}

export function getLowestProviderPrice(
  providers: AffiliateProvider[]
): Pick<AffiliateProvider, "price" | "currency"> {
  if (providers.length === 0) {
    return { price: 0, currency: "AED" };
  }

  const lowest = providers.reduce((min, provider) =>
    provider.price < min.price ? provider : min
  );

  return { price: lowest.price, currency: lowest.currency };
}

export function formatLowestProviderPrice(providers: AffiliateProvider[]): string {
  const { price, currency } = getLowestProviderPrice(providers);
  return formatFromPrice(price, currency);
}

export function getRecommendedProvider(
  providers: AffiliateProvider[]
): AffiliateProvider | undefined {
  return providers.find((provider) => provider.isRecommended);
}

/** Recommended first, then ascending price. */
export function sortProvidersForDisplay(
  providers: AffiliateProvider[]
): AffiliateProvider[] {
  return [...providers].sort((a, b) => {
    if (a.isRecommended && !b.isRecommended) return -1;
    if (!a.isRecommended && b.isRecommended) return 1;
    return a.price - b.price;
  });
}

export function deriveExperienceAggregates(providers: AffiliateProvider[]): {
  price: number;
  currency: string;
  rating: number;
  reviewCount: number;
  instantConfirmation: boolean;
  mobileTicket: boolean;
  freeCancellation: boolean;
  cancellationText: string;
  primaryAffiliateUrl: string;
} {
  const lowest = getLowestProviderPrice(providers);
  const recommended = getRecommendedProvider(providers);
  const primary = recommended ?? providers[0];

  const freeCancellation = providers.some((provider) =>
    provider.cancellationText?.toLowerCase().includes("free cancellation")
  );

  return {
    price: lowest.price,
    currency: lowest.currency,
    rating: primary?.rating ?? 0,
    reviewCount: primary?.reviewCount ?? 0,
    instantConfirmation: providers.some((p) => p.instantConfirmation),
    mobileTicket: providers.some((p) => p.mobileTicket),
    freeCancellation,
    cancellationText:
      primary?.cancellationText ??
      "See partner terms for cancellation details at checkout.",
    primaryAffiliateUrl: primary?.affiliateUrl ?? "",
  };
}

export function formatProviderPrice(provider: AffiliateProvider): string {
  return formatPrice(provider.price, provider.currency);
}
