import {
  getAllExperienceSlugs,
  getExperienceBySlug,
  resolveRelatedExperiences,
} from "@/data/experience-catalog";
import { destinationExperiences } from "@/data/destination-experiences";
import { slugify } from "@/lib/cms/utils/slugify";
import { deriveExperienceAggregates } from "@/lib/experience-providers";

import type { DestinationExperience, Experience } from "@/data/types";

import {
  fallbackListingPriceAed,
  mapExperienceToDestinationListing,
} from "./normalize";
import type { PublicCategory } from "./types";

const CATEGORY_ICON_KEYS: Record<string, string> = {
  Adventure: "adventure",
  Sightseeing: "sightseeing",
  Cruise: "cruise",
  Cultural: "culture",
  Dining: "dining",
  Nightlife: "nightlife",
  "Family Friendly": "family",
};

const destinationById = new Map(
  destinationExperiences.map((destination) => [destination.id, destination])
);

function enrichDestinationListing(
  destination: (typeof destinationExperiences)[number]
): DestinationExperience {
  const catalogExperience = getExperienceBySlug(destination.id);
  const listingPriceAed = catalogExperience?.price;
  const listingCurrency = catalogExperience?.currency;

  return {
    ...destination,
    listingPriceAed,
    listingCurrency,
    affiliateUrl:
      catalogExperience != null
        ? deriveExperienceAggregates(catalogExperience.providers).primaryAffiliateUrl
        : destination.affiliateUrl,
  };
}

export function getStaticPublicCategories(): PublicCategory[] {
  const labels = [
    ...new Set(destinationExperiences.map((destination) => destination.category)),
  ].sort();

  return labels.map((label, index) => ({
    slug: slugify(label),
    label,
    description: null,
    iconKey: CATEGORY_ICON_KEYS[label] ?? null,
    sortOrder: index,
  }));
}

export function getStaticPublicExperiences(): Experience[] {
  return getAllExperienceSlugs()
    .map((slug) => getExperienceBySlug(slug))
    .filter((experience): experience is Experience => experience != null);
}

export function getStaticPublicExperienceBySlug(slug: string): Experience | null {
  return getExperienceBySlug(slug);
}

export function getStaticPublicExperienceSlugs(): string[] {
  return getAllExperienceSlugs();
}

export function getStaticRelatedPublicExperiences(
  experience: Experience
): ReturnType<typeof resolveRelatedExperiences> {
  return resolveRelatedExperiences(experience);
}

export function getStaticPublicDestinationExperiences(): DestinationExperience[] {
  return destinationExperiences.map(enrichDestinationListing);
}

export function getStaticDestinationListingBySlug(
  slug: string
): DestinationExperience | null {
  const destination = destinationById.get(slug);
  if (!destination) {
    return null;
  }

  return enrichDestinationListing(destination);
}

export function mapStaticExperienceToDestinationListing(
  experience: Experience
): DestinationExperience {
  const destination = destinationById.get(experience.slug);
  if (destination) {
    return enrichDestinationListing(destination);
  }

  return mapExperienceToDestinationListing(experience, {
    duration_hours: null,
    languages: [],
    tour_type: null,
    recommended_score: 0,
    listing_image_url: experience.images[0]?.src ?? null,
    imageAlt: experience.images[0]?.alt ?? experience.title,
  });
}

export { fallbackListingPriceAed };
