import { NextResponse } from "next/server";

import { sanitizeAttribution } from "@/lib/affiliate-tracking/attribution";
import { fetchTrackableProvider } from "@/lib/affiliate-tracking/fetch-provider";
import { recordAffiliateClick } from "@/lib/affiliate-tracking/record-click";
import {
  isSafeAffiliateRedirectUrl,
  isTrackableProvider,
  isValidProviderUuid,
} from "@/lib/affiliate-tracking/validation";
import { areAffiliateRedirectsEnabled } from "@/lib/affiliate-tracking/flags";

export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ providerId: string }>;
};

function notFoundResponse() {
  return new NextResponse("Not found", {
    status: 404,
    headers: {
      "Cache-Control": "no-store",
    },
  });
}

function redirectResponse(destination: string) {
  return NextResponse.redirect(destination, {
    status: 302,
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate",
      Pragma: "no-cache",
    },
  });
}

export async function GET(request: Request, context: RouteContext) {
  if (!areAffiliateRedirectsEnabled()) {
    return notFoundResponse();
  }

  const { providerId } = await context.params;

  if (!isValidProviderUuid(providerId)) {
    return notFoundResponse();
  }

  const provider = await fetchTrackableProvider(providerId);
  if (!provider || !isTrackableProvider(provider)) {
    return notFoundResponse();
  }

  const destination = provider.affiliate_url.trim();
  if (!isSafeAffiliateRedirectUrl(destination)) {
    return notFoundResponse();
  }

  const url = new URL(request.url);
  const referrer = request.headers.get("referer");
  const attribution = sanitizeAttribution({
    sourcePath: url.searchParams.get("source_path"),
    referrer,
    utmSource: url.searchParams.get("utm_source"),
    utmMedium: url.searchParams.get("utm_medium"),
    utmCampaign: url.searchParams.get("utm_campaign"),
  });

  void recordAffiliateClick({
    experience_id: provider.experience.id,
    provider_id: provider.id,
    experience_slug: provider.experience.slug,
    experience_title: provider.experience.title,
    provider_name: provider.provider_name,
    source_path: attribution.source_path,
    referrer: attribution.referrer,
    utm_source: attribution.utm_source,
    utm_medium: attribution.utm_medium,
    utm_campaign: attribution.utm_campaign,
  });

  return redirectResponse(destination);
}
