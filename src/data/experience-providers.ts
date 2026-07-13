import { buildProviderAffiliateUrl } from "@/lib/affiliate";
import { usdToAed } from "@/lib/experience-providers";

import type { AffiliateProvider, AffiliateProviderName } from "./types";

/** Experiences that demonstrate multi-provider comparison on the detail page. */
const MULTI_PROVIDER_SLUGS = new Set([
  "desert-safari-dune-bashing",
  "burj-khalifa-at-the-top",
  "luxury-yacht-marina-cruise",
]);

type BuildProvidersInput = {
  slug: string;
  basePriceUsd: number;
  rating: number;
  reviewCount: number;
  instantConfirmation: boolean;
  freeCancellation: boolean;
};

function providerId(slug: string, providerKey: string): string {
  return `${slug}-${providerKey.toLowerCase().replace(/\s+/g, "-")}`;
}

function cancellationText(freeCancellation: boolean): string {
  return freeCancellation
    ? "Free cancellation up to 24 hours before the experience"
    : "Non-refundable once confirmed — see partner terms at checkout.";
}

function buildSingleProvider(
  input: BuildProvidersInput,
  providerName: AffiliateProviderName
): AffiliateProvider[] {
  const baseAed = usdToAed(input.basePriceUsd);

  return [
    {
      id: providerId(input.slug, providerName),
      providerName,
      price: baseAed,
      currency: "AED",
      rating: input.rating,
      reviewCount: input.reviewCount,
      cancellationText: cancellationText(input.freeCancellation),
      instantConfirmation: input.instantConfirmation,
      mobileTicket: true,
      description: `Book ${input.slug.replace(/-/g, " ")} through ${providerName}.`,
      affiliateUrl: buildProviderAffiliateUrl(providerName, input.slug),
      isRecommended: true,
    },
  ];
}

function buildComparisonProviders(
  input: BuildProvidersInput
): AffiliateProvider[] {
  const baseAed = usdToAed(input.basePriceUsd);

  return [
    {
      id: providerId(input.slug, "getyourguide"),
      providerName: "GetYourGuide",
      price: baseAed,
      currency: "AED",
      rating: input.rating,
      reviewCount: input.reviewCount,
      cancellationText: cancellationText(input.freeCancellation),
      instantConfirmation: input.instantConfirmation,
      mobileTicket: true,
      description:
        "Popular choice with flexible dates and verified local operators.",
      affiliateUrl: buildProviderAffiliateUrl("GetYourGuide", input.slug),
      isRecommended: true,
      badge: "Best Seller",
    },
    {
      id: providerId(input.slug, "viator"),
      providerName: "Viator",
      price: baseAed + 25,
      currency: "AED",
      rating: Math.max(4.5, input.rating - 0.1),
      reviewCount: Math.round(input.reviewCount * 0.85),
      cancellationText: input.freeCancellation
        ? "Free cancellation up to 48 hours in advance"
        : "Strict cancellation policy applies.",
      instantConfirmation: true,
      mobileTicket: true,
      description: "Trusted global platform with 24/7 customer support.",
      affiliateUrl: buildProviderAffiliateUrl("Viator", input.slug),
    },
    {
      id: providerId(input.slug, "klook"),
      providerName: "Klook",
      price: Math.max(baseAed - 20, 49),
      currency: "AED",
      rating: Math.max(4.4, input.rating - 0.2),
      reviewCount: Math.round(input.reviewCount * 0.6),
      cancellationText: input.freeCancellation
        ? "Cancel for free up to 24 hours before start time"
        : "Partial refund may be available — check checkout details.",
      instantConfirmation: input.instantConfirmation,
      mobileTicket: true,
      description: "Mobile-first booking with instant e-tickets in the app.",
      affiliateUrl: buildProviderAffiliateUrl("Klook", input.slug),
      badge: "Lowest Price",
    },
  ];
}

const SINGLE_PROVIDER_ROTATION: AffiliateProviderName[] = [
  "Headout",
  "GetYourGuide",
  "Viator",
  "Klook",
  "Headout",
];

/**
 * Builds mock affiliate provider offers for an experience.
 * Ready to swap for Supabase / admin-managed records later.
 */
export function buildProvidersForExperience(
  input: BuildProvidersInput
): AffiliateProvider[] {
  if (MULTI_PROVIDER_SLUGS.has(input.slug)) {
    return buildComparisonProviders(input);
  }

  const index = input.slug.length % SINGLE_PROVIDER_ROTATION.length;
  return buildSingleProvider(input, SINGLE_PROVIDER_ROTATION[index]);
}
