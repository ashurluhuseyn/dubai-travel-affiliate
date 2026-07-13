import { slugify } from "../../src/lib/cms/utils/slugify";

import { getStaticSeedStats } from "./extract-static";
import { getSeedEnv } from "./env";
import { createSeedSupabaseClient } from "./supabase-admin";

type DuplicateSlug = {
  table: string;
  slug: string;
  count: number;
};

function logSection(title: string) {
  console.log(`\n=== ${title} ===`);
}

function findDuplicateSlugs(
  table: string,
  rows: { slug: string }[]
): DuplicateSlug[] {
  const counts = new Map<string, number>();

  for (const row of rows) {
    counts.set(row.slug, (counts.get(row.slug) ?? 0) + 1);
  }

  return [...counts.entries()]
    .filter(([, count]) => count > 1)
    .map(([slug, count]) => ({ table, slug, count }));
}

async function main() {
  try {
    getSeedEnv();
  } catch (error) {
    console.error(
      error instanceof Error ? error.message : "Missing Supabase environment."
    );
    process.exit(1);
  }

  logSection("CMS verify");

  const staticStats = getStaticSeedStats();
  const supabase = createSeedSupabaseClient();

  const [
    { data: categoryRows, error: categoryError },
    { data: experienceRows, error: experienceError },
    { data: providerRows, error: providerError },
  ] = await Promise.all([
    supabase.from("categories").select("id, slug, status"),
    supabase.from("experiences").select("id, slug, status, category_id"),
    supabase.from("experience_providers").select("id, experience_id"),
  ]);

  if (categoryError) {
    throw new Error(`Failed to read categories: ${categoryError.message}`);
  }
  if (experienceError) {
    throw new Error(`Failed to read experiences: ${experienceError.message}`);
  }
  if (providerError) {
    throw new Error(`Failed to read providers: ${providerError.message}`);
  }

  const categories = categoryRows ?? [];
  const experiences = experienceRows ?? [];
  const providers = providerRows ?? [];

  const staticExperienceSlugs = new Set(staticStats.experienceSlugs);

  const dbCategorySlugs = new Set(categories.map((row) => row.slug));
  const dbExperienceSlugs = new Set(experiences.map((row) => row.slug));

  const missingCategories = staticStats.categorySlugs.filter(
    (slug) => !dbCategorySlugs.has(slug)
  );
  const missingExperiences = staticStats.experienceSlugs.filter(
    (slug) => !dbExperienceSlugs.has(slug)
  );

  const duplicateSlugs = [
    ...findDuplicateSlugs("categories", categories),
    ...findDuplicateSlugs("experiences", experiences),
  ];

  const categoryIdToSlug = new Map(
    categories.map((row) => [row.id, row.slug])
  );

  const invalidCategoryReferences = experiences
    .filter(
      (row) =>
        staticExperienceSlugs.has(row.slug) &&
        row.category_id &&
        !categoryIdToSlug.has(row.category_id)
    )
    .map((row) => row.slug);

  const providersByExperienceId = new Map<string, number>();
  for (const provider of providers) {
    providersByExperienceId.set(
      provider.experience_id,
      (providersByExperienceId.get(provider.experience_id) ?? 0) + 1
    );
  }

  const providerMismatches: {
    slug: string;
    expected: number;
    actual: number;
  }[] = [];

  for (const experience of staticStats.experiences) {
    const dbExperience = experiences.find((row) => row.slug === experience.slug);
    if (!dbExperience) {
      continue;
    }

    const actual = providersByExperienceId.get(dbExperience.id) ?? 0;
    const expected = experience.providers.length;

    if (actual !== expected) {
      providerMismatches.push({
        slug: experience.slug,
        expected,
        actual,
      });
    }
  }

  const publishedStaticExperiences = experiences.filter(
    (row) => staticExperienceSlugs.has(row.slug) && row.status === "published"
  ).length;

  console.log("Static counts:");
  console.log(`  Categories: ${staticStats.categoryCount}`);
  console.log(`  Experiences: ${staticStats.experienceCount}`);
  console.log(`  Providers: ${staticStats.providerCount}`);

  console.log("\nSupabase counts:");
  console.log(`  Categories: ${categories.length}`);
  console.log(`  Experiences: ${experiences.length}`);
  console.log(`  Providers: ${providers.length}`);
  console.log(
    `  Published seeded experiences: ${publishedStaticExperiences}/${staticStats.experienceCount}`
  );

  let hasIssues = false;

  logSection("Missing categories");
  if (missingCategories.length === 0) {
    console.log("None");
  } else {
    hasIssues = true;
    for (const slug of missingCategories) {
      console.log(`  - ${slug}`);
    }
  }

  logSection("Missing experiences");
  if (missingExperiences.length === 0) {
    console.log("None");
  } else {
    hasIssues = true;
    for (const slug of missingExperiences) {
      console.log(`  - ${slug}`);
    }
  }

  logSection("Duplicate slugs");
  if (duplicateSlugs.length === 0) {
    console.log("None");
  } else {
    hasIssues = true;
    for (const duplicate of duplicateSlugs) {
      console.log(
        `  - ${duplicate.table}.${duplicate.slug} (${duplicate.count} rows)`
      );
    }
  }

  logSection("Provider count mismatches (seeded experiences only)");
  if (providerMismatches.length === 0) {
    console.log("None");
  } else {
    hasIssues = true;
    for (const mismatch of providerMismatches) {
      console.log(
        `  - ${mismatch.slug}: expected ${mismatch.expected}, found ${mismatch.actual}`
      );
    }
  }

  logSection("Invalid category references (seeded experiences only)");
  if (invalidCategoryReferences.length === 0) {
    console.log("None");
  } else {
    hasIssues = true;
    for (const slug of invalidCategoryReferences) {
      console.log(`  - ${slug}`);
    }
  }

  logSection("Category slug alignment");
  for (const label of [
    ...new Set(staticStats.experiences.map((experience) => experience.category_label)),
  ]) {
    const slug = slugify(label);
    const present = dbCategorySlugs.has(slug);
    console.log(`  ${label} → ${slug}: ${present ? "ok" : "missing"}`);
    if (!present) {
      hasIssues = true;
    }
  }

  if (hasIssues) {
    console.error("\nVerification failed.");
    process.exit(1);
  }

  console.log("\nVerification passed.");
}

main().catch((error) => {
  console.error("\nVerify failed:");
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
