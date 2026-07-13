/** Shared rel value for external affiliate booking links. */
export const AFFILIATE_LINK_REL = "noopener noreferrer sponsored";

const AFFILIATE_PARTNER_BASE = "https://partner.example.com";

/** Builds a placeholder affiliate URL for legacy single-partner mock data. */
export function buildAffiliateUrl(experienceId: string): string {
  return `${AFFILIATE_PARTNER_BASE}/book/${experienceId}?ref=dubaimoments`;
}

/** Builds a placeholder affiliate URL for a specific provider and experience. */
export function buildProviderAffiliateUrl(
  providerKey: string,
  experienceSlug: string
): string {
  const normalized = providerKey.toLowerCase().replace(/\s+/g, "");
  return `${AFFILIATE_PARTNER_BASE}/${normalized}/${experienceSlug}?ref=dubaimoments`;
}
