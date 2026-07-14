import { experienceCatalog } from "../../src/data/experience-catalog";
import { destinationExperiences } from "../../src/data/destination-experiences";
import { deriveExperienceAggregates } from "../../src/lib/experience-providers";
import { slugify } from "../../src/lib/cms/utils/slugify";

import type { AffiliateProvider } from "../../src/data/types";

const destinationById = new Map(
  destinationExperiences.map((dest) => [dest.id, dest])
);

/** Icon keys aligned with destination sidebar filter ids where possible. */
const CATEGORY_ICON_KEYS: Record<string, string> = {
  Adventure: "adventure",
  Sightseeing: "sightseeing",
  Cruise: "cruise",
  Cultural: "culture",
  Dining: "dining",
  Nightlife: "nightlife",
  "Family Friendly": "family",
};

export type SeedCategory = {
  slug: string;
  label: string;
  description: string;
  icon_key: string | null;
  sort_order: number;
  status: "published";
};

export type SeedExperience = {
  slug: string;
  title: string;
  category_label: string;
  location: string | null;
  description: string;
  long_description: string | null;
  listing_image_url: string | null;
  badge: string | null;
  duration_label: string | null;
  duration_hours: number | null;
  group_size_label: string | null;
  pickup_included: boolean;
  mobile_ticket: boolean;
  free_cancellation: boolean;
  meeting_point: string | null;
  cancellation_policy: string | null;
  languages: string[];
  tour_type: string | null;
  recommended_score: number;
  highlights: string[];
  included_items: { label: string }[];
  itinerary: { time: string; title: string; description?: string }[];
  important_info: string[];
  faqs: { question: string; answer: string }[];
  gallery: { src: string; alt: string }[];
  cached_lowest_price: number | null;
  cached_currency: string;
  cached_rating: number | null;
  cached_review_count: number | null;
  meta_title: string | null;
  meta_description: string | null;
  og_image_url: string | null;
  canonical_path: string | null;
  no_index: boolean;
  status: "published";
  gallery_extra_count: number;
  related_experience_slugs: string[];
  providers: SeedProvider[];
};

export type SeedProvider = {
  stable_key: string;
  provider_name: string;
  price: number;
  currency: string;
  rating: number | null;
  review_count: number | null;
  cancellation_text: string | null;
  instant_confirmation: boolean;
  mobile_ticket: boolean;
  description: string | null;
  affiliate_url: string;
  is_recommended: boolean;
  badge: string | null;
  display_order: number;
  is_active: boolean;
};

function buildLongDescription(
  meetingPoint?: string,
  cancellationPolicy?: string
): string | null {
  const parts = [meetingPoint, cancellationPolicy].filter(Boolean);
  return parts.length > 0 ? parts.join("\n\n") : null;
}

function mapProvider(
  experienceSlug: string,
  provider: AffiliateProvider,
  index: number
): SeedProvider {
  return {
    stable_key: `${experienceSlug}:${provider.providerName.toLowerCase()}`,
    provider_name: provider.providerName,
    price: provider.price,
    currency: provider.currency,
    rating: provider.rating ?? null,
    review_count: provider.reviewCount ?? null,
    cancellation_text: provider.cancellationText ?? null,
    instant_confirmation: provider.instantConfirmation ?? false,
    mobile_ticket: provider.mobileTicket ?? false,
    description: provider.description ?? null,
    affiliate_url: provider.affiliateUrl,
    is_recommended: provider.isRecommended ?? false,
    badge: provider.badge ?? null,
    display_order: index,
    is_active: true,
  };
}

export function extractSeedCategories(): SeedCategory[] {
  const labels = [
    ...new Set(
      Object.values(experienceCatalog).map((experience) => experience.category)
    ),
  ].sort();

  return labels.map((label, index) => ({
    slug: slugify(label),
    label,
    description: `Curated ${label.toLowerCase()} experiences in Dubai.`,
    icon_key: CATEGORY_ICON_KEYS[label] ?? null,
    sort_order: index,
    status: "published" as const,
  }));
}

export function extractSeedExperiences(): SeedExperience[] {
  return Object.values(experienceCatalog)
    .sort((a, b) => a.slug.localeCompare(b.slug))
    .map((experience) => {
      const dest = destinationById.get(experience.slug);
      if (!dest) {
        throw new Error(
          `Missing destination metadata for experience slug: ${experience.slug}`
        );
      }

      const aggregates = deriveExperienceAggregates(experience.providers);

      return {
        slug: experience.slug,
        title: experience.title,
        category_label: experience.category,
        location: experience.location,
        description: experience.description,
        long_description: buildLongDescription(
          experience.meetingPoint,
          experience.cancellationPolicy
        ),
        listing_image_url: dest.image,
        badge: experience.badge ?? null,
        duration_label: experience.duration,
        duration_hours: dest.durationHours,
        group_size_label: experience.groupSize,
        pickup_included: experience.hotelPickup,
        mobile_ticket: experience.mobileTicket,
        free_cancellation: experience.freeCancellation,
        meeting_point: experience.meetingPoint ?? null,
        cancellation_policy: experience.cancellationPolicy ?? null,
        languages: dest.languages,
        tour_type: dest.tourType,
        recommended_score: dest.recommendedScore,
        highlights: experience.highlights,
        included_items: experience.includedItems.map((label) => ({ label })),
        itinerary: experience.itinerary,
        important_info: experience.importantInfo,
        faqs: experience.faqs,
        gallery: experience.images.map((image) => ({
          src: image.src,
          alt: image.alt,
        })),
        cached_lowest_price: aggregates.price,
        cached_currency: aggregates.currency,
        cached_rating: aggregates.rating,
        cached_review_count: aggregates.reviewCount,
        meta_title: experience.title,
        meta_description: experience.description,
        og_image_url: dest.image,
        canonical_path: `/experiences/${experience.slug}`,
        no_index: false,
        status: "published" as const,
        gallery_extra_count: experience.galleryExtraCount ?? 0,
        related_experience_slugs: experience.relatedExperienceSlugs,
        providers: experience.providers.map((provider, index) =>
          mapProvider(experience.slug, provider, index)
        ),
      };
    });
}

export function getStaticSeedStats() {
  const categories = extractSeedCategories();
  const experiences = extractSeedExperiences();
  const providerCount = experiences.reduce(
    (sum, exp) => sum + exp.providers.length,
    0
  );

  return {
    categories,
    experiences,
    categoryCount: categories.length,
    experienceCount: experiences.length,
    providerCount,
    experienceSlugs: experiences.map((exp) => exp.slug),
    categorySlugs: categories.map((cat) => cat.slug),
  };
}
