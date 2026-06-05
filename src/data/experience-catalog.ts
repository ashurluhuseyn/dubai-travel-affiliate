import { buildAffiliateUrl } from "@/lib/affiliate";
import { experienceHref } from "@/lib/experience-path";

import { destinationExperiences } from "./destination-experiences";
import {
  DESERT_SAFARI_CONTENT,
  generateExperienceContent,
} from "./experience-content";
import type { Experience, RelatedExperience } from "./types";

const DESERT_SAFARI_SLUG = "desert-safari-dune-bashing";

function assembleExperience(
  dest: (typeof destinationExperiences)[number]
): Experience {
  const content =
    dest.id === DESERT_SAFARI_SLUG
      ? DESERT_SAFARI_CONTENT
      : generateExperienceContent(dest, destinationExperiences);

  return {
    id: dest.id,
    slug: dest.id,
    title: dest.title,
    category: dest.category,
    location: dest.location,
    description: dest.description,
    price: dest.price,
    currency: "USD",
    rating: dest.rating,
    reviewCount: dest.reviews,
    duration: dest.duration,
    groupSize: dest.groupSize,
    hotelPickup: dest.pickupIncluded,
    mobileTicket: true,
    instantConfirmation: dest.instantConfirmation,
    freeCancellation: dest.freeCancellation,
    cancellationText: content.cancellationText,
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
    affiliateUrl: buildAffiliateUrl(dest.id),
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
    .map((related) => ({
      id: related.id,
      title: related.title,
      image: related.images[0]?.src ?? "",
      imageAlt: related.images[0]?.alt ?? related.title,
      price: `$${related.price}`,
      rating: related.rating,
      href: experienceHref(related.slug),
      affiliateUrl: related.affiliateUrl,
    }));
}
