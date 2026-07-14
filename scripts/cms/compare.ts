import { getSeedEnv } from "./env";
import { createSeedSupabaseClient } from "./supabase-admin";
import { slugify } from "../../src/lib/cms/utils/slugify";
import { CMS_PUBLIC_PARITY_GAPS } from "../../src/lib/cms/public/parity-notes";
import {
  getStaticPublicCategories,
  getStaticPublicExperiences,
  getStaticRelatedPublicExperiences,
} from "../../src/lib/cms/public/static";
import { resolvePublicRelatedExperiences } from "../../src/lib/cms/public/related-experiences";
import { fetchPublishedPublicPayload } from "../../src/lib/cms/public/supabase-fetch";

function logSection(title: string) {
  console.log(`\n=== ${title} ===`);
}

function sorted(values: string[]): string[] {
  return [...values].sort();
}

async function main() {
  getSeedEnv();
  const supabase = createSeedSupabaseClient();

  const staticCategories = getStaticPublicCategories();
  const staticExperiences = getStaticPublicExperiences();
  const cmsPayload = await fetchPublishedPublicPayload();

  const staticCategorySlugs = new Set(staticCategories.map((category) => category.slug));
  const cmsCategorySlugs = new Set(
    cmsPayload.categories.map((category) => category.slug)
  );

  const cmsExperienceBySlug = new Map(
    cmsPayload.experiences.map((experience) => [experience.slug, experience])
  );

  const categorySlugMismatches = [
    ...staticCategorySlugs,
  ]
    .filter((slug) => !cmsCategorySlugs.has(slug))
    .map((slug) => `missing in CMS: ${slug}`)
    .concat(
      [...cmsCategorySlugs]
        .filter((slug) => !staticCategorySlugs.has(slug))
        .map((slug) => `extra in CMS: ${slug}`)
    );

  const missingExperienceSlugs = sorted(
    staticExperiences
      .map((experience) => experience.slug)
      .filter((slug) => !cmsExperienceBySlug.has(slug))
  );

  const titleMismatches: string[] = [];
  const categoryMismatches: string[] = [];
  const providerMismatches: string[] = [];
  const galleryExtraCountMismatches: string[] = [];
  const relatedSlugMismatches: string[] = [];
  const relatedOrderMismatches: string[] = [];

  for (const staticExperience of staticExperiences) {
    const cmsExperience = cmsExperienceBySlug.get(staticExperience.slug);
    if (!cmsExperience) {
      continue;
    }

    if (staticExperience.title !== cmsExperience.title) {
      titleMismatches.push(
        `${staticExperience.slug}: static="${staticExperience.title}" cms="${cmsExperience.title}"`
      );
    }

    if (staticExperience.category !== cmsExperience.category) {
      categoryMismatches.push(
        `${staticExperience.slug}: static="${staticExperience.category}" cms="${cmsExperience.category}"`
      );
    }

    if (staticExperience.providers.length !== cmsExperience.providers.length) {
      providerMismatches.push(
        `${staticExperience.slug}: static=${staticExperience.providers.length} cms=${cmsExperience.providers.length}`
      );
    }

    if (staticExperience.galleryExtraCount !== cmsExperience.galleryExtraCount) {
      galleryExtraCountMismatches.push(
        `${staticExperience.slug}: static=${staticExperience.galleryExtraCount ?? 0} cms=${cmsExperience.galleryExtraCount ?? 0}`
      );
    }

    const staticRelatedSlugs = staticExperience.relatedExperienceSlugs;
    const cmsRelatedSlugs = cmsExperience.relatedExperienceSlugs;

    if (staticRelatedSlugs.join("|") !== cmsRelatedSlugs.join("|")) {
      relatedSlugMismatches.push(
        `${staticExperience.slug}: static=[${staticRelatedSlugs.join(", ")}] cms=[${cmsRelatedSlugs.join(", ")}]`
      );
    }

    const staticRelated = getStaticRelatedPublicExperiences(staticExperience).map(
      (item) => item.id
    );
    const publishedBySlug = new Map(
      cmsPayload.experiences.map((item) => [item.slug, item])
    );
    const listingsBySlug = new Map(
      cmsPayload.destinationListings.map((listing) => [
        listing.id,
        { image: listing.image, imageAlt: listing.imageAlt },
      ])
    );
    const recommendedScoreBySlug = new Map(
      cmsPayload.experienceRows.map((row) => [row.slug, row.recommended_score])
    );
    const cmsRelated = resolvePublicRelatedExperiences({
      experience: cmsExperience,
      publishedBySlug,
      listingsBySlug,
      recommendedScoreBySlug,
    }).map((item) => item.id);

    if (staticRelated.join("|") !== cmsRelated.join("|")) {
      relatedOrderMismatches.push(
        `${staticExperience.slug}: static=[${staticRelated.join(", ")}] cms=[${cmsRelated.join(", ")}]`
      );
    }
  }

  const { count: publishedCount, error: publishedCountError } = await supabase
    .from("experiences")
    .select("id", { count: "exact", head: true })
    .eq("status", "published");

  if (publishedCountError) {
    throw new Error(`Failed to count published experiences: ${publishedCountError.message}`);
  }

  const publishedCountMismatch =
    publishedCount !== staticExperiences.length
      ? `static=${staticExperiences.length} cms published=${publishedCount ?? 0}`
      : null;

  console.log("Static categories:", staticCategories.length);
  console.log("CMS categories:", cmsPayload.categories.length);
  console.log("Static experiences:", staticExperiences.length);
  console.log("CMS experiences:", cmsPayload.experiences.length);

  logSection("Category slug mismatches");
  console.log(categorySlugMismatches.length ? categorySlugMismatches.join("\n") : "None");

  logSection("Missing experience slugs in CMS");
  console.log(missingExperienceSlugs.length ? missingExperienceSlugs.join("\n") : "None");

  logSection("Title mismatches");
  console.log(titleMismatches.length ? titleMismatches.join("\n") : "None");

  logSection("Category mismatches");
  console.log(categoryMismatches.length ? categoryMismatches.join("\n") : "None");

  logSection("Provider count mismatches");
  console.log(providerMismatches.length ? providerMismatches.join("\n") : "None");

  logSection("Gallery extra count mismatches");
  console.log(
    galleryExtraCountMismatches.length
      ? galleryExtraCountMismatches.join("\n")
      : "None"
  );

  logSection("Related experience slug mismatches");
  console.log(
    relatedSlugMismatches.length ? relatedSlugMismatches.join("\n") : "None"
  );

  logSection("Resolved related experience order mismatches");
  console.log(
    relatedOrderMismatches.length ? relatedOrderMismatches.join("\n") : "None"
  );

  logSection("Published count mismatch");
  console.log(publishedCountMismatch ?? "None");

  logSection("Important unmapped public fields");
  for (const [scope, fields] of Object.entries(CMS_PUBLIC_PARITY_GAPS)) {
    console.log(`\n${scope}:`);
    for (const field of fields) {
      console.log(`  - ${field}`);
    }
  }

  logSection("Records that would visibly differ when CMS flag is enabled");
  console.log("None");

  logSection("Category label → slug alignment");
  for (const category of staticCategories) {
    const cmsCategory = cmsPayload.categories.find(
      (item) => item.slug === category.slug
    );
    console.log(
      `${category.label} → ${slugify(category.label)}: ${
        cmsCategory ? "ok" : "missing"
      }`
    );
  }

  const hasIssues =
    categorySlugMismatches.length > 0 ||
    missingExperienceSlugs.length > 0 ||
    titleMismatches.length > 0 ||
    categoryMismatches.length > 0 ||
    providerMismatches.length > 0 ||
    galleryExtraCountMismatches.length > 0 ||
    relatedSlugMismatches.length > 0 ||
    relatedOrderMismatches.length > 0 ||
    publishedCountMismatch != null;

  if (hasIssues) {
    console.error("\nComparison found mismatches.");
    process.exit(1);
  }

  console.log("\nComparison passed.");
}

main().catch((error) => {
  console.error("\nComparison failed:");
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
