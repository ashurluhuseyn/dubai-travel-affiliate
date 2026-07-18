export const EXPERIENCE_MEDIA_BUCKET = "experience-media";

export const MAX_EXPERIENCE_MEDIA_BYTES = 10 * 1024 * 1024;

export const MAX_GALLERY_IMAGES = 20;

export const ALLOWED_EXPERIENCE_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
] as const;

export type AllowedExperienceImageMimeType =
  (typeof ALLOWED_EXPERIENCE_IMAGE_MIME_TYPES)[number];

export const MIME_TO_EXTENSION: Record<AllowedExperienceImageMimeType, string> =
  {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
    "image/avif": "avif",
  };
