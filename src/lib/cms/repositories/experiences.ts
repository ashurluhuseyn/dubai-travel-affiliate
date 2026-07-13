import type { Experience } from "@/data/types";

const NOT_IMPLEMENTED =
  "CMS experience reads are not implemented yet. Set CMS_EXPERIENCES_ENABLED=false or complete Phase 1.";

/** Future: load a published experience from Supabase with providers. */
export async function getPublishedExperienceBySlug(
  slug: string
): Promise<Experience | null> {
  void slug;
  throw new Error(NOT_IMPLEMENTED);
}

/** Future: list published experiences for destinations. */
export async function listPublishedExperiences(): Promise<Experience[]> {
  throw new Error(NOT_IMPLEMENTED);
}
