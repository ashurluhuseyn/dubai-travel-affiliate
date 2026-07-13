import { getExperienceBySlug as getStaticExperienceBySlug } from "@/data/experience-catalog";
import type { Experience } from "@/data/types";
import { isCmsExperiencesEnabled } from "@/lib/cms/flags";

const CMS_NOT_IMPLEMENTED =
  "CMS experience reads are not implemented yet. Set CMS_EXPERIENCES_ENABLED=false or complete Phase 1.";

/**
 * Resolves an experience by slug for the public site.
 * Static data remains the default until CMS_EXPERIENCES_ENABLED=true.
 */
export function getExperienceBySlugFromSource(slug: string): Experience | null {
  if (isCmsExperiencesEnabled()) {
    throw new Error(CMS_NOT_IMPLEMENTED);
  }

  return getStaticExperienceBySlug(slug);
}
