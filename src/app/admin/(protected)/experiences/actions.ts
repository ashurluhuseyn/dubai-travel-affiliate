"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import {
  getAuthenticatedSupabase,
  requireAdminDelete,
  requireAdminWrite,
} from "@/lib/cms/auth/admin-mutations";
import {
  createExperienceWithProviders,
  deleteExperienceForAdmin,
  getExperienceByIdForAdmin,
  updateExperienceWithProviders,
} from "@/lib/cms/repositories/experiences";
import {
  deriveCachedFields,
  formatZodErrors,
  saveExperiencePayloadSchema,
} from "@/lib/cms/validation/experience";

export type ExperienceActionState = {
  error?: string;
  fieldErrors?: Record<string, string>;
  success?: boolean;
  experienceId?: string;
};

function parsePayload(raw: string) {
  try {
    return JSON.parse(raw) as unknown;
  } catch {
    return null;
  }
}

export async function createExperienceAction(
  _prevState: ExperienceActionState,
  formData: FormData
): Promise<ExperienceActionState> {
  const session = await requireAdminWrite();
  const supabase = await getAuthenticatedSupabase();

  const parsedJson = parsePayload(String(formData.get("payload") ?? ""));
  if (!parsedJson) {
    return { error: "Invalid form submission." };
  }

  const parsed = saveExperiencePayloadSchema.safeParse(parsedJson);
  if (!parsed.success) {
    return { fieldErrors: formatZodErrors(parsed.error) };
  }

  const cached = deriveCachedFields(parsed.data.providers);
  const experience = {
    ...parsed.data.experience,
    ...cached,
  };

  let experienceId: string;

  try {
    ({ experienceId } = await createExperienceWithProviders(
      supabase,
      experience,
      parsed.data.providers,
      session.user.id
    ));
  } catch (error) {
    return {
      error:
        error instanceof Error ? error.message : "Failed to create experience.",
    };
  }

  revalidatePath("/admin/experiences");
  redirect(`/admin/experiences/${experienceId}/edit?success=created`);
}

export async function updateExperienceAction(
  _prevState: ExperienceActionState,
  formData: FormData
): Promise<ExperienceActionState> {
  try {
    const session = await requireAdminWrite();
    const supabase = await getAuthenticatedSupabase();

    const experienceId = String(formData.get("experienceId") ?? "");
    if (!experienceId) {
      return { error: "Experience ID is missing." };
    }

    const parsedJson = parsePayload(String(formData.get("payload") ?? ""));
    if (!parsedJson) {
      return { error: "Invalid form submission." };
    }

    const parsed = saveExperiencePayloadSchema.safeParse(parsedJson);
    if (!parsed.success) {
      return { fieldErrors: formatZodErrors(parsed.error) };
    }

    const cached = deriveCachedFields(parsed.data.providers);
    const experience = {
      ...parsed.data.experience,
      ...cached,
    };

    const existing = await getExperienceByIdForAdmin(supabase, experienceId);
    if (!existing) {
      return { error: "Experience not found." };
    }

    await updateExperienceWithProviders(
      supabase,
      experienceId,
      experience,
      parsed.data.providers,
      session.user.id,
      existing.published_at
    );

    revalidatePath("/admin/experiences");
    revalidatePath(`/admin/experiences/${experienceId}/edit`);

    return { success: true, experienceId };
  } catch (error) {
    return {
      error:
        error instanceof Error ? error.message : "Failed to update experience.",
    };
  }
}

export async function deleteExperienceAction(
  experienceId: string
): Promise<{ error?: string; success?: boolean }> {
  try {
    await requireAdminDelete();
    const supabase = await getAuthenticatedSupabase();

    await deleteExperienceForAdmin(supabase, experienceId);

    revalidatePath("/admin/experiences");
    return { success: true };
  } catch (error) {
    return {
      error:
        error instanceof Error ? error.message : "Failed to delete experience.",
    };
  }
}
