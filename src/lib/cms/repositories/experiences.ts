import type { SupabaseClient } from "@supabase/supabase-js";

import type {
  ExperienceListItem,
  ExperienceProviderRow,
  ExperienceRow,
} from "@/lib/cms/types/database";
import type {
  ExperienceFormValues,
  ExperienceProviderInput,
} from "@/lib/cms/validation/experience";

type ListExperiencesOptions = {
  search?: string;
  status?: "draft" | "published" | "archived";
};

function mapExperienceRow(row: Record<string, unknown>): ExperienceRow {
  return {
    ...row,
    highlights: (row.highlights as string[]) ?? [],
    included_items: (row.included_items as ExperienceRow["included_items"]) ?? [],
    itinerary: (row.itinerary as ExperienceRow["itinerary"]) ?? [],
    important_info: (row.important_info as string[]) ?? [],
    faqs: (row.faqs as ExperienceRow["faqs"]) ?? [],
    gallery: (row.gallery as ExperienceRow["gallery"]) ?? [],
    languages: (row.languages as string[]) ?? [],
  } as ExperienceRow;
}

export async function listExperiencesForAdmin(
  supabase: SupabaseClient,
  options: ListExperiencesOptions = {}
): Promise<ExperienceListItem[]> {
  let query = supabase
    .from("experiences")
    .select(
      `
        id,
        title,
        slug,
        status,
        badge,
        recommended_score,
        updated_at,
        categories:category_id ( label )
      `
    )
    .order("updated_at", { ascending: false });

  if (options.status) {
    query = query.eq("status", options.status);
  }

  if (options.search?.trim()) {
    const term = `%${options.search.trim()}%`;
    query = query.or(`title.ilike.${term},slug.ilike.${term}`);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []).map((row) => {
    const category = row.categories as unknown as { label: string } | null;
    return {
      id: row.id as string,
      title: row.title as string,
      slug: row.slug as string,
      status: row.status as ExperienceListItem["status"],
      badge: row.badge as string | null,
      recommended_score: row.recommended_score as number,
      updated_at: row.updated_at as string,
      category_label: category?.label ?? null,
    };
  });
}

export async function getExperienceByIdForAdmin(
  supabase: SupabaseClient,
  id: string
): Promise<ExperienceRow | null> {
  const { data, error } = await supabase
    .from("experiences")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  if (!data) return null;
  return mapExperienceRow(data);
}

export async function listProvidersForExperience(
  supabase: SupabaseClient,
  experienceId: string
): Promise<ExperienceProviderRow[]> {
  const { data, error } = await supabase
    .from("experience_providers")
    .select("*")
    .eq("experience_id", experienceId)
    .order("display_order", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as ExperienceProviderRow[];
}

function emptyToNull(value: string | null | undefined): string | null {
  if (value === undefined || value === null || value.trim() === "") {
    return null;
  }
  return value.trim();
}

function buildExperienceRecord(
  values: ExperienceFormValues,
  userId: string,
  options: { isCreate: boolean; existingPublishedAt?: string | null }
) {
  const record: Record<string, unknown> = {
    slug: values.slug,
    title: values.title,
    category_id: values.category_id || null,
    location: emptyToNull(values.location),
    description: values.description,
    long_description: emptyToNull(values.long_description),
    listing_image_url: emptyToNull(values.listing_image_url),
    badge: emptyToNull(values.badge),
    duration_label: emptyToNull(values.duration_label),
    duration_hours: values.duration_hours ?? null,
    group_size_label: emptyToNull(values.group_size_label),
    pickup_included: values.pickup_included,
    mobile_ticket: values.mobile_ticket,
    free_cancellation: values.free_cancellation,
    meeting_point: emptyToNull(values.meeting_point),
    cancellation_policy: emptyToNull(values.cancellation_policy),
    languages: values.languages,
    tour_type: emptyToNull(values.tour_type),
    recommended_score: values.recommended_score,
    highlights: values.highlights,
    included_items: values.included_items,
    itinerary: values.itinerary,
    important_info: values.important_info,
    faqs: values.faqs,
    gallery: values.gallery,
    cached_lowest_price: values.cached_lowest_price ?? null,
    cached_currency: values.cached_currency || "AED",
    cached_rating: values.cached_rating ?? null,
    cached_review_count: values.cached_review_count ?? null,
    meta_title: emptyToNull(values.meta_title),
    meta_description: emptyToNull(values.meta_description),
    og_image_url: emptyToNull(values.og_image_url),
    canonical_path: emptyToNull(values.canonical_path),
    no_index: values.no_index,
    status: values.status,
    updated_by: userId,
  };

  if (options.isCreate) {
    record.created_by = userId;
    record.published_at =
      values.status === "published" ? new Date().toISOString() : null;
  } else if (values.status === "published" && !options.existingPublishedAt) {
    record.published_at = new Date().toISOString();
  }

  return record;
}

export async function createExperienceWithProviders(
  supabase: SupabaseClient,
  values: ExperienceFormValues,
  providers: ExperienceProviderInput[],
  userId: string
): Promise<{ experienceId: string }> {
  const { data: experience, error: experienceError } = await supabase
    .from("experiences")
    .insert(buildExperienceRecord(values, userId, { isCreate: true }))
    .select("id")
    .single();

  if (experienceError || !experience) {
    throw new Error(experienceError?.message ?? "Failed to create experience");
  }

  try {
    await replaceProvidersForExperience(
      supabase,
      experience.id as string,
      providers
    );
  } catch (providerError) {
    await supabase.from("experiences").delete().eq("id", experience.id);
    throw providerError;
  }

  return { experienceId: experience.id as string };
}

export async function updateExperienceWithProviders(
  supabase: SupabaseClient,
  experienceId: string,
  values: ExperienceFormValues,
  providers: ExperienceProviderInput[],
  userId: string,
  existingPublishedAt?: string | null
): Promise<void> {
  const { error: experienceError } = await supabase
    .from("experiences")
    .update(
      buildExperienceRecord(values, userId, {
        isCreate: false,
        existingPublishedAt,
      })
    )
    .eq("id", experienceId);

  if (experienceError) {
    throw new Error(experienceError.message);
  }

  await replaceProvidersForExperience(supabase, experienceId, providers);
}

async function replaceProvidersForExperience(
  supabase: SupabaseClient,
  experienceId: string,
  providers: ExperienceProviderInput[]
): Promise<void> {
  const { error: deleteError } = await supabase
    .from("experience_providers")
    .delete()
    .eq("experience_id", experienceId);

  if (deleteError) {
    throw new Error(deleteError.message);
  }

  if (providers.length === 0) return;

  const rows = providers.map((provider, index) => ({
    experience_id: experienceId,
    provider_name: provider.provider_name,
    price: provider.price,
    currency: provider.currency || "AED",
    rating: provider.rating ?? null,
    review_count: provider.review_count ?? null,
    cancellation_text: emptyToNull(provider.cancellation_text),
    instant_confirmation: provider.instant_confirmation,
    mobile_ticket: provider.mobile_ticket,
    description: emptyToNull(provider.description),
    affiliate_url: provider.affiliate_url,
    is_recommended: provider.is_recommended,
    badge: emptyToNull(provider.badge),
    display_order: provider.display_order ?? index,
    is_active: provider.is_active,
  }));

  const { error: insertError } = await supabase
    .from("experience_providers")
    .insert(rows);

  if (insertError) {
    throw new Error(insertError.message);
  }
}

export async function deleteExperienceForAdmin(
  supabase: SupabaseClient,
  experienceId: string
): Promise<void> {
  const { error } = await supabase
    .from("experiences")
    .delete()
    .eq("id", experienceId);

  if (error) {
    throw new Error(error.message);
  }
}
