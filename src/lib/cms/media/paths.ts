import { getPublicSupabaseEnv } from "@/lib/cms/env";

import {
  EXPERIENCE_MEDIA_BUCKET,
  MIME_TO_EXTENSION,
  type AllowedExperienceImageMimeType,
} from "./constants";

const EXPERIENCE_SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const SAFE_EXTENSION_PATTERN = /^[a-z0-9]+$/;

/** Parses a public Supabase Storage URL into an object path within experience-media. */
export function parseManagedExperienceMediaPath(
  url: string | null | undefined
): string | null {
  if (!url?.trim()) {
    return null;
  }

  let parsed: URL;
  try {
    parsed = new URL(url.trim());
  } catch {
    return null;
  }

  const marker = `/storage/v1/object/public/${EXPERIENCE_MEDIA_BUCKET}/`;
  const index = parsed.pathname.indexOf(marker);
  if (index === -1) {
    return null;
  }

  const objectPath = decodeURIComponent(
    parsed.pathname.slice(index + marker.length)
  );

  if (!isSafeStorageObjectPath(objectPath)) {
    return null;
  }

  return objectPath;
}

export function isManagedExperienceMediaUrl(
  url: string | null | undefined
): boolean {
  return parseManagedExperienceMediaPath(url) != null;
}

export function getImageSourceLabel(
  url: string | null | undefined
): "Supabase Storage" | "External URL" | "None" {
  if (!url?.trim()) {
    return "None";
  }

  return isManagedExperienceMediaUrl(url) ? "Supabase Storage" : "External URL";
}

export function isSafeStorageObjectPath(path: string): boolean {
  if (!path || path.startsWith("/") || path.includes("..")) {
    return false;
  }

  if (!path.startsWith("experiences/")) {
    return false;
  }

  return /^experiences\/[a-z0-9-]+\/[a-z0-9-]+\.[a-z0-9]+$/.test(path);
}

export function sanitizeExperienceSlugForStorage(slug: string): string | null {
  const normalized = slug.trim().toLowerCase();
  if (!EXPERIENCE_SLUG_PATTERN.test(normalized)) {
    return null;
  }

  return normalized;
}

export function getExtensionForMimeType(mimeType: string): string | null {
  if (!(mimeType in MIME_TO_EXTENSION)) {
    return null;
  }

  return MIME_TO_EXTENSION[mimeType as AllowedExperienceImageMimeType];
}

export function getExtensionFromFileName(fileName: string): string | null {
  const baseName = fileName.split(/[/\\]/).pop() ?? fileName;
  const match = baseName.match(/\.([a-zA-Z0-9]+)$/);
  if (!match) {
    return null;
  }

  const extension = match[1].toLowerCase();
  if (!SAFE_EXTENSION_PATTERN.test(extension)) {
    return null;
  }

  return extension;
}

export function buildExperienceMediaStoragePath(
  experienceSlug: string,
  extension: string,
  fileId = crypto.randomUUID()
): string | null {
  const slug = sanitizeExperienceSlugForStorage(experienceSlug);
  const normalizedExtension = extension.toLowerCase();

  if (!slug || !SAFE_EXTENSION_PATTERN.test(normalizedExtension)) {
    return null;
  }

  const objectPath = `experiences/${slug}/${fileId}.${normalizedExtension}`;
  return isSafeStorageObjectPath(objectPath) ? objectPath : null;
}

export function getExperienceMediaPublicUrl(storagePath: string): string {
  const { NEXT_PUBLIC_SUPABASE_URL } = getPublicSupabaseEnv();
  const encodedPath = storagePath
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");

  return `${NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${EXPERIENCE_MEDIA_BUCKET}/${encodedPath}`;
}

export function collectManagedPathsFromUrls(
  urls: Array<string | null | undefined>
): string[] {
  const paths = new Set<string>();

  for (const url of urls) {
    const path = parseManagedExperienceMediaPath(url);
    if (path) {
      paths.add(path);
    }
  }

  return [...paths];
}

export function findRemovedManagedPaths(
  beforeUrls: Array<string | null | undefined>,
  afterUrls: Array<string | null | undefined>
): string[] {
  const afterPaths = new Set(collectManagedPathsFromUrls(afterUrls));
  return collectManagedPathsFromUrls(beforeUrls).filter(
    (path) => !afterPaths.has(path)
  );
}
