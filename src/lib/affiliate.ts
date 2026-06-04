/** Shared rel value for external affiliate booking links. */
export const AFFILIATE_LINK_REL = "noopener noreferrer sponsored";

const AFFILIATE_PARTNER_BASE = "https://partner.example.com/book";

/** Builds a placeholder affiliate URL for mock data and future partner integration. */
export function buildAffiliateUrl(experienceId: string): string {
  return `${AFFILIATE_PARTNER_BASE}/${experienceId}?ref=dubaimoments`;
}
