"use server";

import {
  getAuthenticatedSupabase,
  requireAdminWrite,
} from "@/lib/cms/auth/admin-mutations";
import { EXPERIENCE_MEDIA_BUCKET } from "@/lib/cms/media/constants";
import {
  buildExperienceMediaStoragePath,
  getExperienceMediaPublicUrl,
  isSafeStorageObjectPath,
  parseManagedExperienceMediaPath,
} from "@/lib/cms/media/paths";
import { validateExperienceMediaUpload } from "@/lib/cms/media/validation";

export type ExperienceMediaUploadResult =
  | {
      ok: true;
      path: string;
      token: string;
      publicUrl: string;
    }
  | {
      ok: false;
      error: string;
    };

export type ExperienceMediaDeleteResult =
  | { ok: true }
  | { ok: false; error: string };

type CreateUploadInput = {
  experienceSlug: string;
  fileName: string;
  mimeType: string;
  fileSize: number;
};

export async function createExperienceMediaUploadAction(
  input: CreateUploadInput
): Promise<ExperienceMediaUploadResult> {
  try {
    await requireAdminWrite();

    const validation = validateExperienceMediaUpload(input);
    if (!validation.ok) {
      return { ok: false, error: validation.error };
    }

    const storagePath = buildExperienceMediaStoragePath(
      validation.experienceSlug,
      validation.extension
    );

    if (!storagePath) {
      return { ok: false, error: "Could not generate a safe storage path." };
    }

    const supabase = await getAuthenticatedSupabase();
    const { data, error } = await supabase.storage
      .from(EXPERIENCE_MEDIA_BUCKET)
      .createSignedUploadUrl(storagePath);

    if (error || !data?.token) {
      return {
        ok: false,
        error: error?.message ?? "Unable to create a signed upload URL.",
      };
    }

    return {
      ok: true,
      path: data.path ?? storagePath,
      token: data.token,
      publicUrl: getExperienceMediaPublicUrl(storagePath),
    };
  } catch (error) {
    return {
      ok: false,
      error:
        error instanceof Error ? error.message : "Upload authorization failed.",
    };
  }
}

/** Deletes a managed Storage object after explicit admin confirmation in the UI. */
export async function deleteManagedExperienceMediaAction(
  publicUrl: string
): Promise<ExperienceMediaDeleteResult> {
  try {
    await requireAdminWrite();

    const storagePath = parseManagedExperienceMediaPath(publicUrl);
    if (!storagePath || !isSafeStorageObjectPath(storagePath)) {
      return { ok: false, error: "Only managed Supabase media can be deleted." };
    }

    const supabase = await getAuthenticatedSupabase();
    const { error } = await supabase.storage
      .from(EXPERIENCE_MEDIA_BUCKET)
      .remove([storagePath]);

    if (error) {
      return { ok: false, error: error.message };
    }

    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      error:
        error instanceof Error ? error.message : "Media deletion failed.",
    };
  }
}
