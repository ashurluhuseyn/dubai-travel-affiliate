import {
  ALLOWED_EXPERIENCE_IMAGE_MIME_TYPES,
  MAX_EXPERIENCE_MEDIA_BYTES,
  MAX_GALLERY_IMAGES,
  type AllowedExperienceImageMimeType,
} from "./constants";
import {
  getExtensionForMimeType,
  getExtensionFromFileName,
  sanitizeExperienceSlugForStorage,
} from "./paths";

export type UploadValidationInput = {
  fileName: string;
  mimeType: string;
  fileSize: number;
  experienceSlug: string;
};

export type UploadValidationResult =
  | {
      ok: true;
      extension: string;
      experienceSlug: string;
    }
  | {
      ok: false;
      error: string;
    };

export function isAllowedExperienceImageMimeType(
  mimeType: string
): mimeType is AllowedExperienceImageMimeType {
  return (ALLOWED_EXPERIENCE_IMAGE_MIME_TYPES as readonly string[]).includes(
    mimeType
  );
}

export function validateExperienceMediaUpload(
  input: UploadValidationInput
): UploadValidationResult {
  const slug = sanitizeExperienceSlugForStorage(input.experienceSlug);
  if (!slug) {
    return {
      ok: false,
      error: "Enter a valid experience slug before uploading images.",
    };
  }

  const extensionFromMime = getExtensionForMimeType(input.mimeType);
  if (!extensionFromMime) {
    if (input.mimeType === "image/svg+xml" || input.mimeType.includes("svg")) {
      return { ok: false, error: "SVG uploads are not allowed." };
    }

    return {
      ok: false,
      error: "Unsupported file type. Use JPEG, PNG, WebP, or AVIF.",
    };
  }

  const extensionFromName = getExtensionFromFileName(input.fileName);
  if (extensionFromName && extensionFromName !== extensionFromMime) {
    return {
      ok: false,
      error: "File extension does not match the selected image type.",
    };
  }

  if (input.fileSize <= 0 || input.fileSize > MAX_EXPERIENCE_MEDIA_BYTES) {
    return {
      ok: false,
      error: "Image must be 10 MB or smaller.",
    };
  }

  return { ok: true, extension: extensionFromMime, experienceSlug: slug };
}

export function dedupeGalleryItems<T extends { src: string; alt: string }>(
  items: T[]
): T[] {
  const seen = new Set<string>();
  const result: T[] = [];

  for (const item of items) {
    const src = item.src.trim();
    if (!src || seen.has(src)) {
      continue;
    }

    seen.add(src);
    result.push(item);
  }

  return result;
}

export function validateGalleryCount(count: number): string | null {
  if (count > MAX_GALLERY_IMAGES) {
    return `Maximum ${MAX_GALLERY_IMAGES} gallery images allowed.`;
  }

  return null;
}
