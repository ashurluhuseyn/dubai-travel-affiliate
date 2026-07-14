import type { Experience, RelatedExperience } from "@/data/types";

import { mapExperienceToRelatedCard } from "./normalize";

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function parseRelatedExperienceSlugs(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((item): item is string => typeof item === "string");
}

/** Removes self-references and duplicate slugs while preserving first-seen order. */
export function sanitizeRelatedExperienceSlugs(
  slugs: string[],
  currentSlug?: string
): string[] {
  const seen = new Set<string>();
  const sanitized: string[] = [];

  for (const rawSlug of slugs) {
    const slug = rawSlug.trim();
    if (!slug || !SLUG_PATTERN.test(slug)) {
      continue;
    }
    if (currentSlug && slug === currentSlug) {
      continue;
    }
    if (seen.has(slug)) {
      continue;
    }
    seen.add(slug);
    sanitized.push(slug);
  }

  return sanitized;
}

type RelatedResolutionContext = {
  experience: Pick<Experience, "slug" | "category" | "relatedExperienceSlugs">;
  publishedBySlug: Map<string, Experience>;
  listingsBySlug: Map<string, { image: string; imageAlt: string }>;
  recommendedScoreBySlug: Map<string, number>;
  fallbackLimit?: number;
};

function resolveFallbackRelatedSlugs({
  experience,
  publishedBySlug,
  recommendedScoreBySlug,
  fallbackLimit = 3,
}: Omit<RelatedResolutionContext, "listingsBySlug">): string[] {
  return [...publishedBySlug.values()]
    .filter(
      (candidate) =>
        candidate.slug !== experience.slug &&
        candidate.category === experience.category
    )
    .sort((a, b) => {
      const scoreA = recommendedScoreBySlug.get(a.slug) ?? 0;
      const scoreB = recommendedScoreBySlug.get(b.slug) ?? 0;
      return scoreB - scoreA;
    })
    .slice(0, fallbackLimit)
    .map((candidate) => candidate.slug);
}

/** Resolves stored related slugs in order, excluding missing/unpublished/current entries. */
export function resolvePublicRelatedExperienceSlugs(
  context: RelatedResolutionContext
): string[] {
  const stored = sanitizeRelatedExperienceSlugs(
    context.experience.relatedExperienceSlugs ?? [],
    context.experience.slug
  );

  const validStored = stored.filter((slug) => context.publishedBySlug.has(slug));
  if (validStored.length > 0) {
    return validStored;
  }

  return resolveFallbackRelatedSlugs(context);
}

export function resolvePublicRelatedExperiences(
  context: RelatedResolutionContext
): RelatedExperience[] {
  const slugs = resolvePublicRelatedExperienceSlugs(context);

  return slugs
    .map((slug) => {
      const related = context.publishedBySlug.get(slug);
      if (!related) {
        return null;
      }

      return mapExperienceToRelatedCard(
        related,
        context.listingsBySlug.get(slug)
      );
    })
    .filter((item): item is RelatedExperience => item !== null);
}
