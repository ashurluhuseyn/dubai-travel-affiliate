import type { SupabaseClient } from "@supabase/supabase-js";

import type { ExperienceRow } from "@/lib/cms/types/database";
import type { ExperienceFormValues } from "@/lib/cms/validation/experience";

import { EXPERIENCE_MEDIA_BUCKET } from "./constants";
import {
  collectManagedPathsFromUrls,
  findRemovedManagedPaths,
  isSafeStorageObjectPath,
} from "./paths";

function logCleanupError(message: string) {
  console.error(`[experience-media] ${message}`);
}

export function collectExperienceMediaUrls(
  source: Pick<
    ExperienceRow | ExperienceFormValues,
    "listing_image_url" | "gallery" | "og_image_url"
  >
): string[] {
  return [
    source.listing_image_url,
    source.og_image_url,
    ...source.gallery.map((item) => item.src),
  ].filter((url): url is string => Boolean(url));
}

export function findRemovedExperienceMediaPaths(
  before: Pick<
    ExperienceRow | ExperienceFormValues,
    "listing_image_url" | "gallery" | "og_image_url"
  >,
  after: Pick<
    ExperienceRow | ExperienceFormValues,
    "listing_image_url" | "gallery" | "og_image_url"
  >
): string[] {
  return findRemovedManagedPaths(
    collectExperienceMediaUrls(before),
    collectExperienceMediaUrls(after)
  );
}

export async function deleteManagedExperienceMediaPaths(
  supabase: SupabaseClient,
  paths: string[]
): Promise<void> {
  const safePaths = [...new Set(paths)].filter(isSafeStorageObjectPath);
  if (safePaths.length === 0) {
    return;
  }

  const { error } = await supabase.storage
    .from(EXPERIENCE_MEDIA_BUCKET)
    .remove(safePaths);

  if (error) {
    logCleanupError(`storage cleanup failed: ${error.message}`);
  }
}

export async function cleanupRemovedExperienceMedia(
  supabase: SupabaseClient,
  before: Pick<
    ExperienceRow | ExperienceFormValues,
    "listing_image_url" | "gallery" | "og_image_url"
  >,
  after: Pick<
    ExperienceRow | ExperienceFormValues,
    "listing_image_url" | "gallery" | "og_image_url"
  >
): Promise<void> {
  const removedPaths = findRemovedExperienceMediaPaths(before, after);
  await deleteManagedExperienceMediaPaths(supabase, removedPaths);
}

export async function cleanupAllExperienceMedia(
  supabase: SupabaseClient,
  experience: Pick<
    ExperienceRow | ExperienceFormValues,
    "listing_image_url" | "gallery" | "og_image_url"
  >
): Promise<void> {
  const paths = collectManagedPathsFromUrls(collectExperienceMediaUrls(experience));
  await deleteManagedExperienceMediaPaths(supabase, paths);
}
