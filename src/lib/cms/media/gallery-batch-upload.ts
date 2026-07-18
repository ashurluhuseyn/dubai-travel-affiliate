import { MAX_GALLERY_IMAGES } from "./constants";
import {
  dedupeGalleryItems,
  validateExperienceMediaUpload,
} from "./validation";

export type GalleryMediaItem = {
  src: string;
  alt: string;
};

export function fileListToFiles(
  files: FileList | null | undefined
): File[] {
  if (!files?.length) {
    return [];
  }

  return Array.from(files);
}

export function selectSingleCoverFile(
  files: FileList | null | undefined
): File | null {
  return files?.[0] ?? null;
}

export function defaultGalleryAlt(experienceSlug: string, index: number): string {
  const label = experienceSlug.replace(/-/g, " ");
  return label ? `${label} photo ${index + 1}` : `Gallery photo ${index + 1}`;
}

export function planGalleryFileBatch(
  files: File[],
  currentGalleryCount: number,
  maxImages = MAX_GALLERY_IMAGES
): {
  accepted: File[];
  rejectedExcess: Array<{ fileName: string; message: string }>;
} {
  const remaining = Math.max(0, maxImages - currentGalleryCount);
  const accepted = files.slice(0, remaining);
  const excessCount = files.length - accepted.length;

  const rejectedExcess =
    excessCount > 0
      ? files.slice(remaining).map((file) => ({
          fileName: file.name,
          message:
            remaining === 0
              ? `Gallery is full (${maxImages} images maximum).`
              : `Only ${remaining} slot${remaining === 1 ? "" : "s"} remaining; ${excessCount} file${excessCount === 1 ? "" : "s"} skipped.`,
        }))
      : [];

  return { accepted, rejectedExcess };
}

export function appendGalleryItems(
  current: GalleryMediaItem[],
  uploaded: GalleryMediaItem[]
): GalleryMediaItem[] {
  if (uploaded.length === 0) {
    return current;
  }

  return dedupeGalleryItems([...current, ...uploaded]);
}

export type GalleryFileUploadAttempt =
  | { ok: true; fileName: string; item: GalleryMediaItem }
  | { ok: false; fileName: string; error: string };

export type CreateSignedUploadFn = (input: {
  experienceSlug: string;
  fileName: string;
  mimeType: string;
  fileSize: number;
}) => Promise<
  | { ok: true; path: string; token: string; publicUrl: string }
  | { ok: false; error: string }
>;

export type UploadToSignedUrlFn = (
  path: string,
  token: string,
  file: File
) => Promise<{ error: string | null }>;

export async function uploadGalleryFiles(
  files: File[],
  options: {
    experienceSlug: string;
    startingGalleryCount: number;
    createSignedUpload: CreateSignedUploadFn;
    uploadToSignedUrl: UploadToSignedUrlFn;
    onFileComplete?: (
      result: GalleryFileUploadAttempt,
      file: File
    ) => void;
  }
): Promise<GalleryFileUploadAttempt[]> {
  const results: GalleryFileUploadAttempt[] = [];
  let nextIndex = options.startingGalleryCount;

  for (const file of files) {
    const clientValidation = validateExperienceMediaUpload({
      experienceSlug: options.experienceSlug,
      fileName: file.name,
      mimeType: file.type,
      fileSize: file.size,
    });

    if (!clientValidation.ok) {
      const result: GalleryFileUploadAttempt = {
        ok: false,
        fileName: file.name,
        error: clientValidation.error,
      };
      results.push(result);
      options.onFileComplete?.(result, file);
      continue;
    }

    const signed = await options.createSignedUpload({
      experienceSlug: options.experienceSlug,
      fileName: file.name,
      mimeType: file.type,
      fileSize: file.size,
    });

    if (!signed.ok) {
      const result: GalleryFileUploadAttempt = {
        ok: false,
        fileName: file.name,
        error: signed.error,
      };
      results.push(result);
      options.onFileComplete?.(result, file);
      continue;
    }

    const upload = await options.uploadToSignedUrl(
      signed.path,
      signed.token,
      file
    );

    if (upload.error) {
      const result: GalleryFileUploadAttempt = {
        ok: false,
        fileName: file.name,
        error: upload.error,
      };
      results.push(result);
      options.onFileComplete?.(result, file);
      continue;
    }

    const result: GalleryFileUploadAttempt = {
      ok: true,
      fileName: file.name,
      item: {
        src: signed.publicUrl,
        alt: defaultGalleryAlt(options.experienceSlug, nextIndex),
      },
    };
    nextIndex += 1;
    results.push(result);
    options.onFileComplete?.(result, file);
  }

  return results;
}

export function applyGalleryUploadResults(
  current: GalleryMediaItem[],
  results: GalleryFileUploadAttempt[]
): GalleryMediaItem[] {
  const successful = results
    .filter(
      (result): result is Extract<GalleryFileUploadAttempt, { ok: true }> =>
        result.ok
    )
    .map((result) => result.item);

  return appendGalleryItems(current, successful);
}
