/**
 * Fields the public UI expects that Supabase cannot reproduce exactly.
 * Documented for cms:compare and future CMS schema work.
 */
export const CMS_PUBLIC_PARITY_GAPS = {
  experience: [
    "showcaseCategories on destination listings — defaults to [category label]",
    "availability on destination listings — defaults to 'this-week'",
    "groupSizeKey on destination listings — derived heuristically from group_size_label",
    "DestinationExperience.price (USD filter field) — converted from cached_lowest_price AED",
    "AffiliateProvider.id — synthesized as `${slug}:${providerName}`",
  ],
  categories: [
    "Homepage marketing categories (Landmarks, Fine Dining, …) remain static-only",
    "/categories showcase cards, featured blocks, and trust items remain static-only",
    "Destination filter sidebar counts remain static marketing numbers",
  ],
  pages: [
    "Homepage trending experiences — separate curated mock list, not CMS-backed",
    "Luxury page collections and top experiences — curated static marketing content",
    "/categories popular experiences — curated static cards",
  ],
} as const;
