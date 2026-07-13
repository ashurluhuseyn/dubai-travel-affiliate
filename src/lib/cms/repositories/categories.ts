import type { SupabaseClient } from "@supabase/supabase-js";

import type { CategoryRow } from "@/lib/cms/types/database";

export async function listCategoriesForAdmin(
  supabase: SupabaseClient
): Promise<CategoryRow[]> {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as CategoryRow[];
}
