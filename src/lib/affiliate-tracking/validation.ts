const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

/** Validates a provider UUID before database lookup. */
export function isValidProviderUuid(value: string): boolean {
  return UUID_PATTERN.test(value);
}

/** Allows only http/https affiliate destinations from stored database values. */
export function isSafeAffiliateRedirectUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export function isTrackableProvider(provider: {
  is_active: boolean;
  affiliate_url: string;
  experience: { status: string };
}): boolean {
  return (
    provider.is_active &&
    provider.experience.status === "published" &&
    isSafeAffiliateRedirectUrl(provider.affiliate_url)
  );
}
