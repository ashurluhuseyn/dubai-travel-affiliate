import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  buildAffiliateTrackingUrl,
  sanitizeAttribution,
} from "../../src/lib/affiliate-tracking/attribution";
import { aggregateAffiliateAnalytics } from "../../src/lib/affiliate-tracking/analytics";
import { getProviderAffiliateHref } from "../../src/lib/affiliate-tracking/provider-link";
import {
  isSafeAffiliateRedirectUrl,
  isTrackableProvider,
  isValidProviderUuid,
} from "../../src/lib/affiliate-tracking/validation";
import type { AffiliateProvider } from "../../src/data/types";

const VALID_UUID = "550e8400-e29b-41d4-a716-446655440000";

describe("isValidProviderUuid", () => {
  it("rejects invalid provider UUIDs", () => {
    assert.equal(isValidProviderUuid("not-a-uuid"), false);
    assert.equal(isValidProviderUuid("123"), false);
  });

  it("accepts valid UUIDs", () => {
    assert.equal(isValidProviderUuid(VALID_UUID), true);
  });
});

describe("isSafeAffiliateRedirectUrl", () => {
  it("accepts http and https destinations", () => {
    assert.equal(isSafeAffiliateRedirectUrl("https://partner.example.com/book"), true);
    assert.equal(isSafeAffiliateRedirectUrl("http://partner.example.com/book"), true);
  });

  it("rejects unsafe affiliate URL protocols", () => {
    assert.equal(isSafeAffiliateRedirectUrl("javascript:alert(1)"), false);
    assert.equal(isSafeAffiliateRedirectUrl("ftp://files.example.com"), false);
    assert.equal(isSafeAffiliateRedirectUrl("not-a-url"), false);
  });
});

describe("isTrackableProvider", () => {
  const base = {
    is_active: true,
    affiliate_url: "https://partner.example.com/book",
    experience: { status: "published" },
  };

  it("rejects inactive providers", () => {
    assert.equal(isTrackableProvider({ ...base, is_active: false }), false);
  });

  it("rejects providers linked to draft experiences", () => {
    assert.equal(
      isTrackableProvider({
        ...base,
        experience: { status: "draft" },
      }),
      false
    );
  });

  it("accepts active published providers with safe URLs", () => {
    assert.equal(isTrackableProvider(base), true);
  });
});

describe("sanitizeAttribution", () => {
  it("bounds attribution parameter lengths", () => {
    const long = "a".repeat(600);
    const sanitized = sanitizeAttribution({
      sourcePath: long,
      utmSource: long,
      utmMedium: long,
      utmCampaign: long,
      referrer: long,
    });

    assert.equal(sanitized.source_path?.length, 500);
    assert.equal(sanitized.referrer?.length, 500);
    assert.equal(sanitized.utm_source?.length, 100);
  });

  it("strips control characters", () => {
    const sanitized = sanitizeAttribution({
      sourcePath: "/experiences/test\u0007",
    });
    assert.equal(sanitized.source_path, "/experiences/test");
  });
});

describe("buildAffiliateTrackingUrl", () => {
  it("builds internal tracking URLs with attribution", () => {
    const url = buildAffiliateTrackingUrl(VALID_UUID, {
      source_path: "/experiences/desert-safari-dune-bashing",
      utm_source: "dubaimoments",
      utm_medium: "affiliate",
      utm_campaign: "experience-detail",
    });

    assert.match(url, new RegExp(`^/go/${VALID_UUID}\\?`));
    assert.match(url, /source_path=/);
    assert.match(url, /utm_source=dubaimoments/);
  });
});

describe("getProviderAffiliateHref", () => {
  const staticProvider: AffiliateProvider = {
    id: "desert-safari-getyourguide",
    providerName: "GetYourGuide",
    price: 290,
    currency: "AED",
    affiliateUrl: "https://partner.example.com/getyourguide/desert-safari",
  };

  const cmsProvider: AffiliateProvider = {
    ...staticProvider,
    trackingProviderId: VALID_UUID,
  };

  it("keeps static providers on direct affiliate URLs", () => {
    assert.equal(
      getProviderAffiliateHref(staticProvider, "desert-safari-dune-bashing"),
      staticProvider.affiliateUrl
    );
  });

  it("routes CMS providers through /go/[providerId]", () => {
    const href = getProviderAffiliateHref(
      cmsProvider,
      "desert-safari-dune-bashing"
    );
    assert.match(href, new RegExp(`^/go/${VALID_UUID}`));
    assert.doesNotMatch(href, /^https?:/);
    assert.doesNotMatch(href, /partner\.example\.com/);
    assert.match(href, /source_path=/);
    assert.match(href, /utm_source=dubaimoments/);
    assert.match(href, /utm_medium=affiliate/);
    assert.match(href, /utm_campaign=experience-detail/);
  });
});

describe("aggregateAffiliateAnalytics", () => {
  const baseClick = {
    experience_id: "exp-1",
    provider_id: VALID_UUID,
    experience_slug: "desert-safari-dune-bashing",
    experience_title: "Desert Safari",
    source_path: "/experiences/desert-safari-dune-bashing",
    referrer: null,
    utm_source: "dubaimoments",
    utm_medium: "affiliate",
    utm_campaign: "experience-detail",
  };

  it("aggregates totals, top lists, and daily counts", () => {
    const summary = aggregateAffiliateAnalytics(
      [
        {
          id: "1",
          ...baseClick,
          provider_name: "GetYourGuide",
          clicked_at: "2026-06-04T10:00:00.000Z",
        },
        {
          id: "2",
          ...baseClick,
          provider_name: "Viator",
          clicked_at: "2026-06-03T10:00:00.000Z",
        },
      ],
      new Date("2026-06-04T12:00:00.000Z")
    );

    assert.equal(summary.clicksToday, 1);
    assert.equal(summary.clicksLast7Days, 2);
    assert.equal(summary.clicksLast30Days, 2);
    assert.equal(summary.selectedRangeClicks, 2);
    assert.equal(summary.topExperiences[0]?.key, "desert-safari-dune-bashing");
    assert.equal(summary.dailyClicks.length, 30);
  });

  it("counts clicks today using Asia/Dubai, not UTC midnight", () => {
    const dubaiNow = new Date("2026-07-15T02:35:00.000+04:00");
    const summary = aggregateAffiliateAnalytics(
      [
        {
          id: "1",
          ...baseClick,
          provider_name: "GetYourGuide",
          clicked_at: "2026-07-14T22:33:00.000Z",
        },
        {
          id: "2",
          ...baseClick,
          provider_name: "Viator",
          clicked_at: "2026-07-14T22:34:00.000Z",
        },
      ],
      dubaiNow
    );

    assert.equal(summary.clicksToday, 2);
    assert.equal(summary.clicksLast7Days, 2);
    assert.equal(summary.clicksLast30Days, 2);
    assert.deepEqual(summary.dailyClicks.at(-1), {
      date: "2026-07-15",
      count: 2,
    });
  });

  it("excludes clicks before Dubai start-of-day even on the same UTC date", () => {
    const dubaiNow = new Date("2026-07-15T02:35:00.000+04:00");
    const summary = aggregateAffiliateAnalytics(
      [
        {
          id: "1",
          ...baseClick,
          provider_name: "GetYourGuide",
          clicked_at: "2026-07-14T19:59:00.000Z",
        },
        {
          id: "2",
          ...baseClick,
          provider_name: "Viator",
          clicked_at: "2026-07-14T22:33:00.000Z",
        },
      ],
      dubaiNow
    );

    assert.equal(summary.clicksToday, 1);
    assert.deepEqual(summary.dailyClicks.at(-2), {
      date: "2026-07-14",
      count: 1,
    });
    assert.deepEqual(summary.dailyClicks.at(-1), {
      date: "2026-07-15",
      count: 1,
    });
  });
});
