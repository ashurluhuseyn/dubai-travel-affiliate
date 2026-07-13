import "server-only";

import { unstable_cache } from "next/cache";

import type { Experience } from "@/data/types";

import {
  PUBLIC_CMS_CACHE_TAG,
  PUBLIC_CMS_CATEGORIES_TAG,
  PUBLIC_REVALIDATE_SECONDS,
} from "./constants";
import { mapExperienceToRelatedCard } from "./normalize";
import { fetchPublishedPublicPayload } from "./supabase-fetch";
import type { PublicCategory } from "./types";

export { PUBLIC_REVALIDATE_SECONDS } from "./constants";

const getCachedPublicPayload = unstable_cache(
  fetchPublishedPublicPayload,
  ["cms-public-payload"],
  {
    revalidate: PUBLIC_REVALIDATE_SECONDS,
    tags: [PUBLIC_CMS_CACHE_TAG, PUBLIC_CMS_CATEGORIES_TAG],
  }
);

export async function getSupabasePublicCategories(): Promise<PublicCategory[]> {
  const payload = await getCachedPublicPayload();
  return payload.categories;
}

export async function getSupabasePublicExperiences(): Promise<Experience[]> {
  const payload = await getCachedPublicPayload();
  return payload.experiences;
}

export async function getSupabasePublicExperienceBySlug(
  slug: string
): Promise<Experience | null> {
  const payload = await getCachedPublicPayload();
  return payload.experiences.find((experience) => experience.slug === slug) ?? null;
}

export async function getSupabasePublicExperienceSlugs(): Promise<string[]> {
  const payload = await getCachedPublicPayload();
  return payload.experiences.map((experience) => experience.slug);
}

export async function getSupabasePublicDestinationExperiences() {
  const payload = await getCachedPublicPayload();
  return payload.destinationListings;
}

export async function getSupabaseRelatedPublicExperiences(
  experience: Experience,
  limit = 3
) {
  const payload = await getCachedPublicPayload();
  const listingBySlug = new Map(
    payload.destinationListings.map((listing) => [listing.id, listing])
  );

  return payload.experiences
    .filter(
      (candidate) =>
        candidate.slug !== experience.slug &&
        candidate.category === experience.category
    )
    .sort((a, b) => {
      const rowA = payload.experienceRows.find((row) => row.slug === a.slug);
      const rowB = payload.experienceRows.find((row) => row.slug === b.slug);
      return (rowB?.recommended_score ?? 0) - (rowA?.recommended_score ?? 0);
    })
    .slice(0, limit)
    .map((related) =>
      mapExperienceToRelatedCard(
        related,
        listingBySlug.get(related.slug)
          ? {
              image: listingBySlug.get(related.slug)!.image,
              imageAlt: listingBySlug.get(related.slug)!.imageAlt,
            }
          : undefined
      )
    );
}

/** Uncached fetch for maintenance scripts. */
export async function fetchPublishedPublicPayloadUncached() {
  return fetchPublishedPublicPayload();
}
