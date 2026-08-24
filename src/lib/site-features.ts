/**
 * Public commercial features stay disabled until Caspaya has approved
 * affiliate accounts and real provider data.
 */
export const siteFeatures = {
  affiliateOffers:
    process.env.NEXT_PUBLIC_AFFILIATE_OFFERS_ENABLED === "true",
} as const;
