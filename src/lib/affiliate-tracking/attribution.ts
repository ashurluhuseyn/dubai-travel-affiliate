const MAX_SOURCE_PATH_LENGTH = 500;
const MAX_REFERRER_LENGTH = 500;
const MAX_UTM_LENGTH = 100;

function sanitizeOptionalText(
  value: string | null | undefined,
  maxLength: number
): string | null {
  if (value == null) {
    return null;
  }

  const trimmed = value.trim().replace(/[\u0000-\u001F\u007F]/g, "");
  if (!trimmed) {
    return null;
  }

  return trimmed.slice(0, maxLength);
}

export type RawAttributionInput = {
  sourcePath?: string | null;
  referrer?: string | null;
  utmSource?: string | null;
  utmMedium?: string | null;
  utmCampaign?: string | null;
};

export type SanitizedAttribution = {
  source_path: string | null;
  referrer: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
};

export function sanitizeAttribution(
  input: RawAttributionInput
): SanitizedAttribution {
  return {
    source_path: sanitizeOptionalText(input.sourcePath, MAX_SOURCE_PATH_LENGTH),
    referrer: sanitizeOptionalText(input.referrer, MAX_REFERRER_LENGTH),
    utm_source: sanitizeOptionalText(input.utmSource, MAX_UTM_LENGTH),
    utm_medium: sanitizeOptionalText(input.utmMedium, MAX_UTM_LENGTH),
    utm_campaign: sanitizeOptionalText(input.utmCampaign, MAX_UTM_LENGTH),
  };
}

export type TrackingLinkAttribution = {
  source_path?: string | null;
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
};

/** Builds the internal /go/[providerId] URL with bounded first-party attribution params. */
export function buildAffiliateTrackingUrl(
  providerId: string,
  attribution: TrackingLinkAttribution = {}
): string {
  const sanitized = sanitizeAttribution({
    sourcePath: attribution.source_path,
    utmSource: attribution.utm_source,
    utmMedium: attribution.utm_medium,
    utmCampaign: attribution.utm_campaign,
  });

  const params = new URLSearchParams();

  if (sanitized.source_path) {
    params.set("source_path", sanitized.source_path);
  }
  if (sanitized.utm_source) {
    params.set("utm_source", sanitized.utm_source);
  }
  if (sanitized.utm_medium) {
    params.set("utm_medium", sanitized.utm_medium);
  }
  if (sanitized.utm_campaign) {
    params.set("utm_campaign", sanitized.utm_campaign);
  }

  const query = params.toString();
  return query ? `/go/${providerId}?${query}` : `/go/${providerId}`;
}
