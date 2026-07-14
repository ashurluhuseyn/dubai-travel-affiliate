/**
 * Static → Supabase field mapping reference for cms:seed / cms:verify.
 *
 * Categories source: unique `DestinationExperience.category` labels (24 experiences).
 * Homepage `categories.ts` marketing cards (Landmarks, Fine Dining, …) are NOT seeded
 * because no experience FK references them.
 *
 * Experiences source: `experienceCatalog` + `destinationExperiences` metadata.
 * Providers source: `Experience.providers` from catalog assembly.
 */

export const UNMAPPED_STATIC_FIELDS = {
  categories: [
    "categories.ts homepage cards (Landmarks, Fine Dining, …) — marketing only, no experience FK",
    "Category.count display strings",
    "Category.href / showcase hrefs",
    "categoryShowcase images and featured blocks",
  ],
  experiences: [
    "showcaseCategories (string[]) — no column on experiences",
    "priceUnit — no column",
    "availability (today | this-week | this-month) — no column",
    "groupSizeKey — only group_size_label is stored",
    "DestinationExperience.price (USD listing filter price) — providers use AED",
    "affiliateUrl (legacy single URL on listing) — superseded by experience_providers",
    "href (computed route)",
    "featured boolean — use recommended_score instead",
  ],
  providers: [
    "AffiliateProvider.id (static mock id) — DB generates uuid; match by provider_name per experience",
  ],
} as const;

export const FIELD_MAPPING = {
  categories: {
    slug: "slugify(category label)",
    label: "DestinationExperience.category (unique)",
    description: "Generated seed description",
    icon_key: "Derived from destinations filter id where available",
    sort_order: "Stable sort index",
    status: "'published' for all seeded categories",
  },
  experiences: {
    slug: "DestinationExperience.id / Experience.slug",
    title: "Experience.title",
    category_id: "FK resolved from category label slug",
    location: "Experience.location",
    description: "Experience.description (short)",
    long_description:
      "Concatenation of meetingPoint + cancellationPolicy when present",
    listing_image_url: "DestinationExperience.image",
    badge: "Experience.badge",
    duration_label: "Experience.duration",
    duration_hours: "DestinationExperience.durationHours",
    group_size_label: "Experience.groupSize",
    pickup_included: "Experience.hotelPickup / DestinationExperience.pickupIncluded",
    mobile_ticket: "Experience.mobileTicket",
    free_cancellation: "Experience.freeCancellation",
    meeting_point: "Experience.meetingPoint (from content)",
    cancellation_policy: "Experience.cancellationPolicy",
    languages: "DestinationExperience.languages",
    tour_type: "DestinationExperience.tourType",
    recommended_score: "DestinationExperience.recommendedScore",
    highlights: "Experience.highlights (jsonb string[])",
    included_items: "Experience.includedItems → { label }[]",
    itinerary: "Experience.itinerary (jsonb)",
    important_info: "Experience.importantInfo (jsonb string[])",
    faqs: "Experience.faqs (jsonb)",
    gallery: "Experience.images → { src, alt }[]",
    gallery_extra_count: "Experience.galleryExtraCount",
    related_experience_slugs: "Experience.relatedExperienceSlugs (ordered jsonb string[])",
    cached_lowest_price: "deriveExperienceAggregates().price",
    cached_currency: "deriveExperienceAggregates().currency",
    cached_rating: "deriveExperienceAggregates().rating",
    cached_review_count: "deriveExperienceAggregates().reviewCount",
    meta_title: "Experience.title",
    meta_description: "Experience.description",
    og_image_url: "DestinationExperience.image",
    canonical_path: "`/experiences/${slug}`",
    no_index: "false",
    status: "'published'",
    published_at: "ISO timestamp at seed time",
  },
  experience_providers: {
    provider_name: "AffiliateProvider.providerName",
    price: "AffiliateProvider.price",
    currency: "AffiliateProvider.currency",
    rating: "AffiliateProvider.rating",
    review_count: "AffiliateProvider.reviewCount",
    cancellation_text: "AffiliateProvider.cancellationText",
    instant_confirmation: "AffiliateProvider.instantConfirmation",
    mobile_ticket: "AffiliateProvider.mobileTicket",
    description: "AffiliateProvider.description",
    affiliate_url: "AffiliateProvider.affiliateUrl",
    is_recommended: "AffiliateProvider.isRecommended",
    badge: "AffiliateProvider.badge",
    display_order: "Array index",
    is_active: "true",
  },
} as const;
