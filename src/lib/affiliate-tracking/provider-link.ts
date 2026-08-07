import { buildAffiliateTrackingUrl } from "@/lib/affiliate-tracking/attribution";
import { AFFILIATE_LINK_REL } from "@/lib/affiliate";
import type { AffiliateProvider } from "@/data/types";

export function getProviderAffiliateHref(
  provider: AffiliateProvider,
  experienceSlug: string
): string {
  if (provider.trackingProviderId) {
    return buildAffiliateTrackingUrl(provider.trackingProviderId, {
      source_path: `/experiences/${experienceSlug}`,
      utm_source: "caspaya",
      utm_medium: "affiliate",
      utm_campaign: "experience-detail",
    });
  }

  return provider.affiliateUrl;
}

export { AFFILIATE_LINK_REL as PROVIDER_AFFILIATE_REL };
