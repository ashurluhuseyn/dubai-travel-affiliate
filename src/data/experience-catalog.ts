import {
  deriveExperienceAggregates,
  formatLowestProviderPrice,
} from "@/lib/experience-providers";
import { experienceHref } from "@/lib/experience-path";

import { destinationExperiences } from "./destination-experiences";
import {
  DESERT_SAFARI_CONTENT,
  generateExperienceContent,
} from "./experience-content";
import { buildProvidersForExperience } from "./experience-providers";
import type { Experience, RelatedExperience } from "./types";

const DESERT_SAFARI_SLUG = "desert-safari-dune-bashing";

const destinationListingById = new Map(
  destinationExperiences.map((dest) => [dest.id, dest])
);

function assembleExperience(
  dest: (typeof destinationExperiences)[number]
): Experience {
  const content =
    dest.id === DESERT_SAFARI_SLUG
      ? DESERT_SAFARI_CONTENT
      : generateExperienceContent(dest, destinationExperiences);

  const providers = buildProvidersForExperience({
    slug: dest.id,
    basePriceUsd: dest.price,
    rating: dest.rating,
    reviewCount: dest.reviews,
    instantConfirmation: dest.instantConfirmation,
    freeCancellation: dest.freeCancellation,
  });

  const aggregates = deriveExperienceAggregates(providers);

  return {
    id: dest.id,
    slug: dest.id,
    title: dest.title,
    category: dest.category,
    location: dest.location,
    description: dest.description,
    price: aggregates.price,
    currency: aggregates.currency,
    rating: aggregates.rating,
    reviewCount: aggregates.reviewCount,
    duration: dest.duration,
    groupSize: dest.groupSize,
    hotelPickup: dest.pickupIncluded,
    mobileTicket: aggregates.mobileTicket,
    instantConfirmation: aggregates.instantConfirmation,
    freeCancellation: aggregates.freeCancellation,
    cancellationText: aggregates.cancellationText,
    highlights: content.highlights,
    includedItems: content.includedItems,
    itinerary: content.itinerary,
    importantInfo: content.importantInfo,
    meetingPoint: content.meetingPoint,
    cancellationPolicy: content.cancellationPolicy,
    faqs: content.faqs,
    images: content.images,
    galleryExtraCount: content.galleryExtraCount,
    badge: dest.badge,
    priceUnit: "person",
    relatedExperienceSlugs: content.relatedSlugs,
    providers,
  };
}

export const experienceCatalog: Record<string, Experience> = Object.fromEntries(
  destinationExperiences.map((dest) => [dest.id, assembleExperience(dest)])
);

export function getAllExperienceSlugs(): string[] {
  return Object.keys(experienceCatalog);
}

export function getExperienceBySlug(slug: string): Experience | null {
  return experienceCatalog[slug] ?? null;
}

export function resolveRelatedExperiences(
  experience: Experience
): RelatedExperience[] {
  return experience.relatedExperienceSlugs
    .map((slug) => experienceCatalog[slug])
    .filter((item): item is Experience => item !== undefined)
    .map((related) => {
      const aggregates = deriveExperienceAggregates(related.providers);
      const listing = destinationListingById.get(related.slug);

      return {
        id: related.id,
        title: related.title,
        category: related.category,
        image: listing?.image ?? related.images[0]?.src ?? "",
        imageAlt: listing?.imageAlt ?? related.images[0]?.alt ?? related.title,
        price: formatLowestProviderPrice(related.providers),
        rating: related.rating,
        href: experienceHref(related.slug),
        affiliateUrl: aggregates.primaryAffiliateUrl,
      };
    });
}
