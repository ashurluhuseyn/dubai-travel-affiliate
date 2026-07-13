"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import {
  getAuthenticatedSupabase,
  requireAdminDelete,
  requireAdminWrite,
} from "@/lib/cms/auth/admin-mutations";
import { requireAdmin } from "@/lib/cms/auth/require-admin";
import {
  countExperiencesForCategory,
  createCategoryForAdmin,
  deleteCategoryForAdmin,
  updateCategoryForAdmin,
} from "@/lib/cms/repositories/categories";
import { categoryFormSchema } from "@/lib/cms/validation/category";
import { formatZodErrors } from "@/lib/cms/validation/experience";

export type CategoryActionState = {
  error?: string;
  fieldErrors?: Record<string, string>;
  success?: boolean;
  categoryId?: string;
};

function parsePayload(raw: string) {
  try {
    return JSON.parse(raw) as unknown;
  } catch {
    return null;
  }
}

export async function createCategoryAction(
  _prevState: CategoryActionState,
  formData: FormData
): Promise<CategoryActionState> {
  await requireAdminWrite();
  const supabase = await getAuthenticatedSupabase();

  const parsedJson = parsePayload(String(formData.get("payload") ?? ""));
  if (!parsedJson) {
    return { error: "Invalid form submission." };
  }

  const parsed = categoryFormSchema.safeParse(parsedJson);
  if (!parsed.success) {
    return { fieldErrors: formatZodErrors(parsed.error) };
  }

  let categoryId: string;

  try {
    ({ categoryId } = await createCategoryForAdmin(supabase, parsed.data));
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to create category.";
    if (message.includes("slug")) {
      return { fieldErrors: { slug: message } };
    }
    if (message.includes("name")) {
      return { fieldErrors: { label: message } };
    }
    return { error: message };
  }

  revalidatePath("/admin/categories");
  redirect(`/admin/categories/${categoryId}/edit?success=created`);
}

export async function updateCategoryAction(
  _prevState: CategoryActionState,
  formData: FormData
): Promise<CategoryActionState> {
  try {
    await requireAdminWrite();
    const supabase = await getAuthenticatedSupabase();

    const categoryId = String(formData.get("categoryId") ?? "");
    if (!categoryId) {
      return { error: "Category ID is missing." };
    }

    const parsedJson = parsePayload(String(formData.get("payload") ?? ""));
    if (!parsedJson) {
      return { error: "Invalid form submission." };
    }

    const parsed = categoryFormSchema.safeParse(parsedJson);
    if (!parsed.success) {
      return { fieldErrors: formatZodErrors(parsed.error) };
    }

    await updateCategoryForAdmin(supabase, categoryId, parsed.data);

    revalidatePath("/admin/categories");
    revalidatePath(`/admin/categories/${categoryId}/edit`);

    return { success: true, categoryId };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to update category.";
    if (message.includes("slug")) {
      return { fieldErrors: { slug: message } };
    }
    if (message.includes("name")) {
      return { fieldErrors: { label: message } };
    }
    return { error: message };
  }
}

export async function deleteCategoryAction(
  categoryId: string
): Promise<{ error?: string; success?: boolean }> {
  try {
    await requireAdminDelete();
    const supabase = await getAuthenticatedSupabase();

    await deleteCategoryForAdmin(supabase, categoryId);

    revalidatePath("/admin/categories");
    return { success: true };
  } catch (error) {
    return {
      error:
        error instanceof Error ? error.message : "Failed to delete category.",
    };
  }
}

export async function getCategoryUsageCountAction(
  categoryId: string
): Promise<{ count: number; error?: string }> {
  try {
    await requireAdmin();
    const supabase = await getAuthenticatedSupabase();
    const count = await countExperiencesForCategory(supabase, categoryId);
    return { count };
  } catch (error) {
    return {
      count: 0,
      error: error instanceof Error ? error.message : "Unable to check usage.",
    };
  }
}
