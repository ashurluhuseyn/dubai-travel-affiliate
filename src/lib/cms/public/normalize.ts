import { experienceHref } from "@/lib/experience-path";
import {
  deriveExperienceAggregates,
  formatLowestProviderPrice,
  usdToAed,
} from "@/lib/experience-providers";

import type {
  CategoryRow,
  ExperienceProviderRow,
  ExperienceRow,
} from "@/lib/cms/types/database";
import type {
  AffiliateProvider,
  DestinationAvailability,
  DestinationExperience,
  DestinationGroupSizeKey,
  Experience,
  ExperienceBadge,
  RelatedExperience,
} from "@/data/types";

import type { PublicCategory } from "./types";

export type SupabaseExperienceRow = ExperienceRow & {
  categories: Pick<CategoryRow, "label" | "slug"> | null;
  experience_providers: ExperienceProviderRow[] | null;
};

const DEFAULT_PRICE_UNIT = "person";
const DEFAULT_AVAILABILITY: DestinationAvailability = "this-week";
const DEFAULT_GROUP_SIZE_KEY: DestinationGroupSizeKey = "3-5";

function activeProvidersSorted(
  providers: ExperienceProviderRow[] | null | undefined
): ExperienceProviderRow[] {
  return (providers ?? [])
    .filter((provider) => provider.is_active)
    .sort((a, b) => a.display_order - b.display_order);
}

function providerStableId(slug: string, providerName: string): string {
  return `${slug}-${providerName.toLowerCase().replace(/\s+/g, "-")}`;
}

export function mapSupabaseProviders(
  slug: string,
  providers: ExperienceProviderRow[] | null | undefined
): AffiliateProvider[] {
  return activeProvidersSorted(providers).map((provider) => ({
    id: providerStableId(slug, provider.provider_name),
    providerName: provider.provider_name,
    price: Number(provider.price),
    currency: provider.currency,
    rating: provider.rating != null ? Number(provider.rating) : undefined,
    reviewCount: provider.review_count ?? undefined,
    cancellationText: provider.cancellation_text ?? undefined,
    instantConfirmation: provider.instant_confirmation,
    mobileTicket: provider.mobile_ticket,
    description: provider.description ?? undefined,
    affiliateUrl: provider.affiliate_url,
    isRecommended: provider.is_recommended,
    badge: provider.badge ?? undefined,
  }));
}

export function mapSupabaseExperienceRow(row: SupabaseExperienceRow): Experience {
  const providers = mapSupabaseProviders(row.slug, row.experience_providers);
  const aggregates = deriveExperienceAggregates(providers);

  const includedItems = (row.included_items ?? []).map((item) => item.label);
  const gallery = row.gallery ?? [];

  return {
    id: row.slug,
    slug: row.slug,
    title: row.title,
    category: row.categories?.label ?? "Uncategorized",
    location: row.location ?? "",
    description: row.description,
    price: aggregates.price,
    currency: aggregates.currency,
    rating: aggregates.rating,
    reviewCount: aggregates.reviewCount,
    duration: row.duration_label ?? "",
    groupSize: row.group_size_label ?? "",
    hotelPickup: row.pickup_included,
    mobileTicket: aggregates.mobileTicket,
    instantConfirmation: aggregates.instantConfirmation,
    freeCancellation: aggregates.freeCancellation,
    cancellationText: aggregates.cancellationText,
    highlights: row.highlights ?? [],
    includedItems,
    itinerary: (row.itinerary ?? []).map((item) => ({
      time: item.time,
      title: item.title,
      description: item.description ?? "",
    })),
    importantInfo: row.important_info ?? [],
    meetingPoint: row.meeting_point ?? "",
    cancellationPolicy: row.cancellation_policy ?? "",
    faqs: row.faqs ?? [],
    images: gallery,
    galleryExtraCount: 0,
    badge: row.badge ?? undefined,
    priceUnit: DEFAULT_PRICE_UNIT,
    relatedExperienceSlugs: [],
    providers,
  };
}

export function mapSupabaseCategoryRow(row: CategoryRow): PublicCategory {
  return {
    slug: row.slug,
    label: row.label,
    description: row.description,
    iconKey: row.icon_key,
    sortOrder: row.sort_order,
  };
}

function inferGroupSizeKey(groupSizeLabel: string | null): DestinationGroupSizeKey {
  const label = (groupSizeLabel ?? "").toLowerCase();
  if (label.includes("any")) return "6-10";
  if (label.includes("private")) return "1-2";
  if (label.includes("small")) return "3-5";
  return DEFAULT_GROUP_SIZE_KEY;
}

function aedToUsd(aed: number): number {
  return Math.round((aed / 3.67) * 100) / 100;
}

export function mapExperienceToDestinationListing(
  experience: Experience,
  row: Pick<
    ExperienceRow,
    | "duration_hours"
    | "languages"
    | "tour_type"
    | "recommended_score"
    | "listing_image_url"
  > & {
    imageAlt?: string | null;
  }
): DestinationExperience {
  const aggregates = deriveExperienceAggregates(experience.providers);
  const listingImage =
    row.listing_image_url ?? experience.images[0]?.src ?? "";
  const imageAlt =
    row.imageAlt ?? experience.images[0]?.alt ?? experience.title;

  return {
    id: experience.slug,
    title: experience.title,
    description: experience.description,
    location: experience.location,
    image: listingImage,
    imageAlt,
    badge: experience.badge as ExperienceBadge | undefined,
    category: experience.category,
    showcaseCategories: [experience.category],
    rating: experience.rating,
    reviews: experience.reviewCount,
    duration: experience.duration,
    durationHours: row.duration_hours != null ? Number(row.duration_hours) : 0,
    groupSize: experience.groupSize,
    groupSizeKey: inferGroupSizeKey(experience.groupSize),
    price: aedToUsd(experience.price),
    availability: DEFAULT_AVAILABILITY,
    instantConfirmation: experience.instantConfirmation,
    languages: row.languages ?? [],
    tourType: (row.tour_type as DestinationExperience["tourType"]) ?? "shared",
    pickupIncluded: experience.hotelPickup,
    freeCancellation: experience.freeCancellation,
    recommendedScore: row.recommended_score,
    href: experienceHref(experience.slug),
    affiliateUrl: aggregates.primaryAffiliateUrl,
    listingPriceAed: experience.price,
    listingCurrency: experience.currency,
  };
}

export function mapExperienceToRelatedCard(
  experience: Experience,
  listing?: Pick<DestinationExperience, "image" | "imageAlt">
): RelatedExperience {
  const aggregates = deriveExperienceAggregates(experience.providers);

  return {
    id: experience.id,
    title: experience.title,
    category: experience.category,
    image: listing?.image ?? experience.images[0]?.src ?? "",
    imageAlt: listing?.imageAlt ?? experience.images[0]?.alt ?? experience.title,
    price: formatLowestProviderPrice(experience.providers),
    rating: experience.rating,
    href: experienceHref(experience.slug),
    affiliateUrl: aggregates.primaryAffiliateUrl,
  };
}

/** Converts USD listing price to AED when CMS listing fields are absent. */
export function fallbackListingPriceAed(usdPrice: number): number {
  return usdToAed(usdPrice);
}
