import type { CategoryRow } from "@/lib/cms/types/database";
import {
  categoryFormSchema,
  type CategoryFormValues,
} from "@/lib/cms/validation/category";

/** Maps a Supabase category row to form values for create/edit UI. */
export function categoryRowToFormValues(
  row: Pick<
    CategoryRow,
    "label" | "slug" | "description" | "icon_key" | "sort_order" | "status"
  >
): CategoryFormValues {
  return categoryFormSchema.parse({
    label: row.label,
    slug: row.slug,
    description: row.description ?? "",
    icon_key: row.icon_key ?? "",
    sort_order: row.sort_order,
    status: row.status,
  });
}
