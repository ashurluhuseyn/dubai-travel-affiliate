import { isCmsExperiencesEnabled } from "@/lib/cms/flags";
import type { DestinationExperience, Experience, RelatedExperience } from "@/data/types";

import {
  getStaticPublicCategories,
  getStaticPublicDestinationExperiences,
  getStaticPublicExperienceBySlug,
  getStaticPublicExperiences,
  getStaticPublicExperienceSlugs,
  getStaticRelatedPublicExperiences,
} from "./public/static";
import type { PublicCategory } from "./public/types";

export { CMS_PUBLIC_PARITY_GAPS } from "./public/parity-notes";
export { PUBLIC_REVALIDATE_SECONDS } from "./public/constants";

export type PublicContentSource = "static" | "supabase";

/** Determines which backend serves public experience/category reads. */
export function resolvePublicContentSource(): PublicContentSource {
  return isCmsExperiencesEnabled() ? "supabase" : "static";
}

async function loadSupabasePublicSource() {
  return import("./public/supabase");
}

/**
 * Public content repository — single server-side seam for experience/category reads.
 *
 * When CMS_EXPERIENCES_ENABLED=false (default): returns static data with zero Supabase calls.
 * When true: reads published CMS content via anonymous Supabase client + RLS.
 *
 * Supabase public reads are cached for 300 seconds (see PUBLIC_REVALIDATE_SECONDS).
 */
export async function getPublicCategories(): Promise<PublicCategory[]> {
  if (resolvePublicContentSource() === "static") {
    return getStaticPublicCategories();
  }

  const supabase = await loadSupabasePublicSource();
  return supabase.getSupabasePublicCategories();
}

export async function getPublicExperiences(): Promise<Experience[]> {
  if (resolvePublicContentSource() === "static") {
    return getStaticPublicExperiences();
  }

  const supabase = await loadSupabasePublicSource();
  return supabase.getSupabasePublicExperiences();
}

export async function getPublicExperienceBySlug(
  slug: string
): Promise<Experience | null> {
  if (resolvePublicContentSource() === "static") {
    return getStaticPublicExperienceBySlug(slug);
  }

  const supabase = await loadSupabasePublicSource();
  return supabase.getSupabasePublicExperienceBySlug(slug);
}

export async function getPublicExperienceSlugs(): Promise<string[]> {
  if (resolvePublicContentSource() === "static") {
    return getStaticPublicExperienceSlugs();
  }

  const supabase = await loadSupabasePublicSource();
  return supabase.getSupabasePublicExperienceSlugs();
}

export async function getPublicDestinationExperiences(): Promise<
  DestinationExperience[]
> {
  if (resolvePublicContentSource() === "static") {
    return getStaticPublicDestinationExperiences();
  }

  const supabase = await loadSupabasePublicSource();
  return supabase.getSupabasePublicDestinationExperiences();
}

export async function getRelatedPublicExperiences(
  experience: Experience
): Promise<RelatedExperience[]> {
  if (resolvePublicContentSource() === "static") {
    return getStaticRelatedPublicExperiences(experience);
  }

  const supabase = await loadSupabasePublicSource();
  return supabase.getSupabaseRelatedPublicExperiences(experience);
}
