import { slugify } from "../../src/lib/cms/utils/slugify";

import type { SeedCategory, SeedExperience } from "./extract-static";

export type SeedValidationError = {
  code: string;
  message: string;
};

export function validateSeedPayload(
  categories: SeedCategory[],
  experiences: SeedExperience[]
): SeedValidationError[] {
  const errors: SeedValidationError[] = [];
  const categorySlugs = new Set<string>();

  for (const category of categories) {
    if (!category.slug) {
      errors.push({
        code: "category_missing_slug",
        message: `Category "${category.label}" has an empty slug.`,
      });
    }

    if (categorySlugs.has(category.slug)) {
      errors.push({
        code: "category_duplicate_slug",
        message: `Duplicate category slug: ${category.slug}`,
      });
    }
    categorySlugs.add(category.slug);
  }

  const experienceSlugs = new Set<string>();

  for (const experience of experiences) {
    if (!experience.slug) {
      errors.push({
        code: "experience_missing_slug",
        message: `Experience "${experience.title}" has an empty slug.`,
      });
    }

    if (experienceSlugs.has(experience.slug)) {
      errors.push({
        code: "experience_duplicate_slug",
        message: `Duplicate experience slug: ${experience.slug}`,
      });
    }
    experienceSlugs.add(experience.slug);

    const categorySlug = slugify(experience.category_label);
    if (!categorySlugs.has(categorySlug)) {
      errors.push({
        code: "experience_unknown_category",
        message: `Experience "${experience.slug}" references unknown category "${experience.category_label}".`,
      });
    }

    if (!experience.description.trim()) {
      errors.push({
        code: "experience_missing_description",
        message: `Experience "${experience.slug}" is missing a description.`,
      });
    }

    if (experience.providers.length === 0) {
      errors.push({
        code: "experience_missing_providers",
        message: `Experience "${experience.slug}" has no provider offers.`,
      });
    }

    for (const provider of experience.providers) {
      if (!provider.provider_name.trim()) {
        errors.push({
          code: "provider_missing_name",
          message: `Provider for "${experience.slug}" is missing a name.`,
        });
      }

      if (!provider.affiliate_url.trim()) {
        errors.push({
          code: "provider_missing_affiliate_url",
          message: `Provider "${provider.provider_name}" for "${experience.slug}" is missing an affiliate URL.`,
        });
      }

      if (provider.price <= 0) {
        errors.push({
          code: "provider_invalid_price",
          message: `Provider "${provider.provider_name}" for "${experience.slug}" has invalid price ${provider.price}.`,
        });
      }
    }
  }

  return errors;
}
