import { slugify } from "../../src/lib/cms/utils/slugify";

import {
  extractSeedCategories,
  extractSeedExperiences,
  type SeedCategory,
  type SeedExperience,
} from "./extract-static";
import { FIELD_MAPPING, UNMAPPED_STATIC_FIELDS } from "./field-mapping";
import { getSeedEnv, isDryRun } from "./env";
import { createSeedSupabaseClient } from "./supabase-admin";
import { validateSeedPayload } from "./validate-seed";

type PlannedAction = "insert" | "update";

type PlannedRecord = {
  table: "categories" | "experiences" | "experience_providers";
  key: string;
  action: PlannedAction;
};

function logSection(title: string) {
  console.log(`\n=== ${title} ===`);
}

function printUnmappedFields() {
  logSection("Unmapped static fields");
  for (const [scope, fields] of Object.entries(UNMAPPED_STATIC_FIELDS)) {
    console.log(`\n${scope}:`);
    for (const field of fields) {
      console.log(`  - ${field}`);
    }
  }
}

function printFieldMappingSummary() {
  logSection("Field mapping (see scripts/cms/field-mapping.ts)");
  console.log(`Categories: ${Object.keys(FIELD_MAPPING.categories).length} mapped columns`);
  console.log(
    `Experiences: ${Object.keys(FIELD_MAPPING.experiences).length} mapped columns`
  );
  console.log(
    `Providers: ${Object.keys(FIELD_MAPPING.experience_providers).length} mapped columns`
  );
}

async function fetchExistingCategorySlugs(): Promise<Set<string>> {
  const supabase = createSeedSupabaseClient();
  const { data, error } = await supabase.from("categories").select("slug");

  if (error) {
    throw new Error(`Failed to read categories: ${error.message}`);
  }

  return new Set((data ?? []).map((row) => row.slug));
}

async function fetchExistingExperienceSlugs(): Promise<Set<string>> {
  const supabase = createSeedSupabaseClient();
  const { data, error } = await supabase.from("experiences").select("slug");

  if (error) {
    throw new Error(`Failed to read experiences: ${error.message}`);
  }

  return new Set((data ?? []).map((row) => row.slug));
}

function buildPlan(
  categories: SeedCategory[],
  experiences: SeedExperience[],
  existingCategorySlugs: Set<string>,
  existingExperienceSlugs: Set<string>
): PlannedRecord[] {
  const plan: PlannedRecord[] = [];

  for (const category of categories) {
    plan.push({
      table: "categories",
      key: category.slug,
      action: existingCategorySlugs.has(category.slug) ? "update" : "insert",
    });
  }

  for (const experience of experiences) {
    plan.push({
      table: "experiences",
      key: experience.slug,
      action: existingExperienceSlugs.has(experience.slug) ? "update" : "insert",
    });

    for (const provider of experience.providers) {
      plan.push({
        table: "experience_providers",
        key: provider.stable_key,
        action: existingExperienceSlugs.has(experience.slug)
          ? "update"
          : "insert",
      });
    }
  }

  return plan;
}

function printPlan(plan: PlannedRecord[]) {
  logSection("Planned changes");

  const byTable = {
    categories: plan.filter((item) => item.table === "categories"),
    experiences: plan.filter((item) => item.table === "experiences"),
    experience_providers: plan.filter(
      (item) => item.table === "experience_providers"
    ),
  };

  for (const [table, records] of Object.entries(byTable)) {
    const inserts = records.filter((record) => record.action === "insert").length;
    const updates = records.filter((record) => record.action === "update").length;
    console.log(`${table}: ${inserts} insert(s), ${updates} update/replace(s)`);

    for (const record of records) {
      console.log(`  [${record.action}] ${record.key}`);
    }
  }
}

async function upsertCategories(categories: SeedCategory[]) {
  const supabase = createSeedSupabaseClient();
  const rows = categories.map((category) => ({
    slug: category.slug,
    label: category.label,
    description: category.description,
    icon_key: category.icon_key,
    sort_order: category.sort_order,
    status: category.status,
  }));

  const { error } = await supabase
    .from("categories")
    .upsert(rows, { onConflict: "slug" });

  if (error) {
    throw new Error(`Category upsert failed: ${error.message}`);
  }
}

async function fetchCategoryIdBySlug(): Promise<Map<string, string>> {
  const supabase = createSeedSupabaseClient();
  const { data, error } = await supabase.from("categories").select("id, slug");

  if (error) {
    throw new Error(`Failed to resolve category ids: ${error.message}`);
  }

  return new Map((data ?? []).map((row) => [row.slug, row.id]));
}

async function upsertExperiences(
  experiences: SeedExperience[],
  categoryIdBySlug: Map<string, string>
) {
  const supabase = createSeedSupabaseClient();
  const publishedAt = new Date().toISOString();

  const rows = experiences.map((experience) => {
    const categorySlug = slugify(experience.category_label);
    const categoryId = categoryIdBySlug.get(categorySlug);

    if (!categoryId) {
      throw new Error(
        `Missing category id for slug "${categorySlug}" (experience "${experience.slug}")`
      );
    }

    return {
      slug: experience.slug,
      title: experience.title,
      category_id: categoryId,
      location: experience.location,
      description: experience.description,
      long_description: experience.long_description,
      listing_image_url: experience.listing_image_url,
      badge: experience.badge,
      duration_label: experience.duration_label,
      duration_hours: experience.duration_hours,
      group_size_label: experience.group_size_label,
      pickup_included: experience.pickup_included,
      mobile_ticket: experience.mobile_ticket,
      free_cancellation: experience.free_cancellation,
      meeting_point: experience.meeting_point,
      cancellation_policy: experience.cancellation_policy,
      languages: experience.languages,
      tour_type: experience.tour_type,
      recommended_score: experience.recommended_score,
      highlights: experience.highlights,
      included_items: experience.included_items,
      itinerary: experience.itinerary,
      important_info: experience.important_info,
      faqs: experience.faqs,
      gallery: experience.gallery,
      cached_lowest_price: experience.cached_lowest_price,
      cached_currency: experience.cached_currency,
      cached_rating: experience.cached_rating,
      cached_review_count: experience.cached_review_count,
      meta_title: experience.meta_title,
      meta_description: experience.meta_description,
      og_image_url: experience.og_image_url,
      canonical_path: experience.canonical_path,
      no_index: experience.no_index,
      status: experience.status,
      published_at: publishedAt,
    };
  });

  const { error } = await supabase
    .from("experiences")
    .upsert(rows, { onConflict: "slug" });

  if (error) {
    throw new Error(`Experience upsert failed: ${error.message}`);
  }
}

async function fetchExperienceIdsBySlug(
  slugs: string[]
): Promise<Map<string, string>> {
  const supabase = createSeedSupabaseClient();
  const { data, error } = await supabase
    .from("experiences")
    .select("id, slug")
    .in("slug", slugs);

  if (error) {
    throw new Error(`Failed to resolve experience ids: ${error.message}`);
  }

  return new Map((data ?? []).map((row) => [row.slug, row.id]));
}

async function replaceProvidersForSeededExperiences(
  experiences: SeedExperience[],
  experienceIdBySlug: Map<string, string>
) {
  const supabase = createSeedSupabaseClient();
  const experienceIds = experiences
    .map((experience) => experienceIdBySlug.get(experience.slug))
    .filter((id): id is string => Boolean(id));

  if (experienceIds.length === 0) {
    return;
  }

  const { error: deleteError } = await supabase
    .from("experience_providers")
    .delete()
    .in("experience_id", experienceIds);

  if (deleteError) {
    throw new Error(`Provider replace failed on delete: ${deleteError.message}`);
  }

  const providerRows = experiences.flatMap((experience) => {
    const experienceId = experienceIdBySlug.get(experience.slug);
    if (!experienceId) {
      throw new Error(`Missing experience id for slug "${experience.slug}"`);
    }

    return experience.providers.map((provider) => ({
      experience_id: experienceId,
      provider_name: provider.provider_name,
      price: provider.price,
      currency: provider.currency,
      rating: provider.rating,
      review_count: provider.review_count,
      cancellation_text: provider.cancellation_text,
      instant_confirmation: provider.instant_confirmation,
      mobile_ticket: provider.mobile_ticket,
      description: provider.description,
      affiliate_url: provider.affiliate_url,
      is_recommended: provider.is_recommended,
      badge: provider.badge,
      display_order: provider.display_order,
      is_active: provider.is_active,
    }));
  });

  if (providerRows.length === 0) {
    return;
  }

  const { error: insertError } = await supabase
    .from("experience_providers")
    .insert(providerRows);

  if (insertError) {
    throw new Error(`Provider replace failed on insert: ${insertError.message}`);
  }
}

async function main() {
  const dryRun = isDryRun(process.argv.slice(2));

  try {
    getSeedEnv();
  } catch (error) {
    console.error(
      error instanceof Error ? error.message : "Missing Supabase environment."
    );
    process.exit(1);
  }

  logSection(`CMS seed ${dryRun ? "(dry run)" : "(live)"}`);

  const categories = extractSeedCategories();
  const experiences = extractSeedExperiences();
  const providerCount = experiences.reduce(
    (sum, experience) => sum + experience.providers.length,
    0
  );

  console.log(`Categories: ${categories.length}`);
  console.log(`Experiences: ${experiences.length}`);
  console.log(`Providers: ${providerCount}`);

  const validationErrors = validateSeedPayload(categories, experiences);
  if (validationErrors.length > 0) {
    logSection("Validation errors");
    for (const issue of validationErrors) {
      console.error(`[${issue.code}] ${issue.message}`);
    }
    process.exit(1);
  }

  printUnmappedFields();
  printFieldMappingSummary();

  const existingCategorySlugs = await fetchExistingCategorySlugs();
  const existingExperienceSlugs = await fetchExistingExperienceSlugs();
  const plan = buildPlan(
    categories,
    experiences,
    existingCategorySlugs,
    existingExperienceSlugs
  );

  printPlan(plan);

  if (dryRun) {
    console.log("\nDry run complete. No database writes were performed.");
    return;
  }

  await upsertCategories(categories);
  const categoryIdBySlug = await fetchCategoryIdBySlug();
  await upsertExperiences(experiences, categoryIdBySlug);

  const experienceIdBySlug = await fetchExperienceIdsBySlug(
    experiences.map((experience) => experience.slug)
  );
  await replaceProvidersForSeededExperiences(experiences, experienceIdBySlug);

  logSection("Success");
  console.log(
    `Seeded ${categories.length} categories, ${experiences.length} experiences, and ${providerCount} providers.`
  );
}

main().catch((error) => {
  console.error("\nSeed failed:");
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
