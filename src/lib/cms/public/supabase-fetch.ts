import { createPublicSupabaseClient } from "@/lib/cms/supabase/public";
import type {
  CategoryRow,
  ExperienceProviderRow,
  ExperienceRow,
} from "@/lib/cms/types/database";
import type { DestinationExperience, Experience } from "@/data/types";

import {
  mapExperienceToDestinationListing,
  mapSupabaseCategoryRow,
  mapSupabaseExperienceRow,
  type SupabaseExperienceRow,
} from "./normalize";
import type { PublicCategory } from "./types";

/** Public embed columns — `id` is required for /go/[providerId] affiliate tracking. */
export const PUBLIC_PROVIDER_EMBED_FIELDS = [
  "id",
  "experience_id",
  "provider_name",
  "price",
  "currency",
  "rating",
  "review_count",
  "cancellation_text",
  "instant_confirmation",
  "mobile_ticket",
  "description",
  "affiliate_url",
  "is_recommended",
  "badge",
  "display_order",
  "is_active",
] as const;

const EXPERIENCE_SELECT = `
  *,
  categories ( label, slug ),
  experience_providers (
    id,
    experience_id,
    provider_name,
    price,
    currency,
    rating,
    review_count,
    cancellation_text,
    instant_confirmation,
    mobile_ticket,
    description,
    affiliate_url,
    is_recommended,
    badge,
    display_order,
    is_active
  )
`;

export type CachedPublicPayload = {
  categories: PublicCategory[];
  experiences: Experience[];
  destinationListings: DestinationExperience[];
  experienceRows: SupabaseExperienceRow[];
};

export async function fetchPublishedPublicPayload(): Promise<CachedPublicPayload> {
  const supabase = createPublicSupabaseClient();

  const [{ data: categoryRows, error: categoryError }, { data: experienceRows, error: experienceError }] =
    await Promise.all([
      supabase
        .from("categories")
        .select("*")
        .eq("status", "published")
        .order("sort_order", { ascending: true }),
      supabase
        .from("experiences")
        .select(EXPERIENCE_SELECT)
        .eq("status", "published")
        .order("recommended_score", { ascending: false }),
    ]);

  if (categoryError) {
    throw new Error(`Failed to load published categories: ${categoryError.message}`);
  }

  if (experienceError) {
    throw new Error(`Failed to load published experiences: ${experienceError.message}`);
  }

  const categories = ((categoryRows ?? []) as CategoryRow[]).map(mapSupabaseCategoryRow);
  const normalizedRows = (experienceRows ?? []) as SupabaseExperienceRow[];
  const experiences = normalizedRows.map(mapSupabaseExperienceRow);
  const destinationListings = normalizedRows.map((row) =>
    mapExperienceToDestinationListing(mapSupabaseExperienceRow(row), {
      duration_hours: row.duration_hours,
      languages: row.languages,
      tour_type: row.tour_type,
      recommended_score: row.recommended_score,
      listing_image_url: row.listing_image_url,
      imageAlt: row.gallery?.[0]?.alt ?? row.title,
    })
  );

  return {
    categories,
    experiences,
    destinationListings,
    experienceRows: normalizedRows,
  };
}

/** Filters inactive providers from a raw row — used in tests. */
export function filterActiveProviders(
  providers: ExperienceProviderRow[] | null | undefined
): ExperienceProviderRow[] {
  return (providers ?? [])
    .filter((provider) => provider.is_active)
    .sort((a, b) => a.display_order - b.display_order);
}

/** Filters draft/archived experiences — used in tests. */
export function isPublishedExperience(row: Pick<ExperienceRow, "status">): boolean {
  return row.status === "published";
}
