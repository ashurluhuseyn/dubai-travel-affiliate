import type { SupabaseClient } from "@supabase/supabase-js";

import type { CategoryRow } from "@/lib/cms/types/database";
import type { CategoryFormValues } from "@/lib/cms/validation/category";

type ListCategoriesOptions = {
  search?: string;
};

function emptyToNull(value: string | null | undefined): string | null {
  if (value === undefined || value === null || value.trim() === "") {
    return null;
  }
  return value.trim();
}

function buildCategoryRecord(values: CategoryFormValues) {
  return {
    label: values.label.trim(),
    slug: values.slug.trim(),
    description: emptyToNull(values.description),
    icon_key: emptyToNull(values.icon_key),
    sort_order: values.sort_order,
    status: values.status,
  };
}

export async function listCategoriesForAdmin(
  supabase: SupabaseClient,
  options: ListCategoriesOptions = {}
): Promise<CategoryRow[]> {
  let query = supabase
    .from("categories")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("updated_at", { ascending: false });

  if (options.search?.trim()) {
    const term = `%${options.search.trim()}%`;
    query = query.or(`label.ilike.${term},slug.ilike.${term}`);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as CategoryRow[];
}

export async function getCategoryByIdForAdmin(
  supabase: SupabaseClient,
  id: string
): Promise<CategoryRow | null> {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return (data as CategoryRow | null) ?? null;
}

export async function countExperiencesForCategory(
  supabase: SupabaseClient,
  categoryId: string
): Promise<number> {
  const { count, error } = await supabase
    .from("experiences")
    .select("id", { count: "exact", head: true })
    .eq("category_id", categoryId);

  if (error) {
    throw new Error(error.message);
  }

  return count ?? 0;
}

type DuplicateCheckOptions = {
  excludeId?: string;
};

export async function findDuplicateCategory(
  supabase: SupabaseClient,
  values: CategoryFormValues,
  options: DuplicateCheckOptions = {}
): Promise<{ field: "slug" | "label"; message: string } | null> {
  let slugQuery = supabase
    .from("categories")
    .select("id")
    .eq("slug", values.slug.trim())
    .limit(1);

  if (options.excludeId) {
    slugQuery = slugQuery.neq("id", options.excludeId);
  }

  const { data: slugMatch, error: slugError } = await slugQuery.maybeSingle();
  if (slugError) {
    throw new Error(slugError.message);
  }
  if (slugMatch) {
    return {
      field: "slug",
      message: "Another category already uses this slug.",
    };
  }

  let labelQuery = supabase
    .from("categories")
    .select("id")
    .ilike("label", values.label.trim())
    .limit(1);

  if (options.excludeId) {
    labelQuery = labelQuery.neq("id", options.excludeId);
  }

  const { data: labelMatch, error: labelError } = await labelQuery.maybeSingle();
  if (labelError) {
    throw new Error(labelError.message);
  }
  if (labelMatch) {
    return {
      field: "label",
      message: "Another category already uses this name.",
    };
  }

  return null;
}

export async function createCategoryForAdmin(
  supabase: SupabaseClient,
  values: CategoryFormValues
): Promise<{ categoryId: string }> {
  const duplicate = await findDuplicateCategory(supabase, values);
  if (duplicate) {
    throw new Error(duplicate.message);
  }

  const { data, error } = await supabase
    .from("categories")
    .insert(buildCategoryRecord(values))
    .select("id")
    .single();

  if (error) {
    if (error.code === "23505") {
      throw new Error("Another category already uses this slug.");
    }
    throw new Error(error.message);
  }

  return { categoryId: data.id as string };
}

export async function updateCategoryForAdmin(
  supabase: SupabaseClient,
  categoryId: string,
  values: CategoryFormValues
): Promise<void> {
  const duplicate = await findDuplicateCategory(supabase, values, {
    excludeId: categoryId,
  });
  if (duplicate) {
    throw new Error(duplicate.message);
  }

  const { error } = await supabase
    .from("categories")
    .update(buildCategoryRecord(values))
    .eq("id", categoryId);

  if (error) {
    if (error.code === "23505") {
      throw new Error("Another category already uses this slug.");
    }
    throw new Error(error.message);
  }
}

export async function deleteCategoryForAdmin(
  supabase: SupabaseClient,
  categoryId: string
): Promise<void> {
  const usageCount = await countExperiencesForCategory(supabase, categoryId);
  if (usageCount > 0) {
    throw new Error(
      `This category is used by ${usageCount} experience${usageCount === 1 ? "" : "s"}. Reassign those experiences before deleting.`
    );
  }

  const { error } = await supabase
    .from("categories")
    .delete()
    .eq("id", categoryId);

  if (error) {
    throw new Error(error.message);
  }
}
