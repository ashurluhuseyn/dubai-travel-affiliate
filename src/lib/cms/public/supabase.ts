import "server-only";

import { unstable_cache } from "next/cache";

import type { Experience } from "@/data/types";

import {
  PUBLIC_CMS_CACHE_TAG,
  PUBLIC_CMS_CATEGORIES_TAG,
  PUBLIC_REVALIDATE_SECONDS,
} from "./constants";
import { resolvePublicRelatedExperiences } from "./related-experiences";
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
  experience: Experience
) {
  const payload = await getCachedPublicPayload();
  const publishedBySlug = new Map(
    payload.experiences.map((item) => [item.slug, item])
  );
  const listingsBySlug = new Map(
    payload.destinationListings.map((listing) => [
      listing.id,
      { image: listing.image, imageAlt: listing.imageAlt },
    ])
  );
  const recommendedScoreBySlug = new Map(
    payload.experienceRows.map((row) => [row.slug, row.recommended_score])
  );

  return resolvePublicRelatedExperiences({
    experience,
    publishedBySlug,
    listingsBySlug,
    recommendedScoreBySlug,
  });
}

/** Uncached fetch for maintenance scripts. */
export async function fetchPublishedPublicPayloadUncached() {
  return fetchPublishedPublicPayload();
}
