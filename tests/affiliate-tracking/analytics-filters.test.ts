import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  buildAnalyticsHref,
  buildAnalyticsSearchParams,
  DEFAULT_ANALYTICS_RANGE,
  hasActiveAnalyticsFilters,
  listDateKeysInRange,
  parseAnalyticsSearchParams,
  resolveAnalyticsDateRange,
  resolveAnalyticsFilters,
} from "../../src/lib/affiliate-tracking/analytics-filters";

const DUBAI_NOW = new Date("2026-07-15T02:35:00.000+04:00");

describe("parseAnalyticsSearchParams", () => {
  it("defaults to last 30 days with no params", () => {
    const filters = parseAnalyticsSearchParams({});

    assert.equal(filters.range, DEFAULT_ANALYTICS_RANGE);
    assert.equal(filters.page, 1);
    assert.equal(filters.experienceSlug, null);
    assert.equal(filters.providerName, null);
    assert.equal(filters.sourcePath, null);
    assert.equal(filters.utmSource, null);
    assert.equal(filters.utmCampaign, null);
  });

  it("parses date presets from URL search params", () => {
    assert.equal(parseAnalyticsSearchParams({ range: "today" }).range, "today");
    assert.equal(parseAnalyticsSearchParams({ range: "7d" }).range, "7d");
    assert.equal(parseAnalyticsSearchParams({ range: "30d" }).range, "30d");
  });

  it("parses experience, provider, source, and UTM filters", () => {
    const filters = parseAnalyticsSearchParams({
      range: "7d",
      experience: "desert-safari-dune-bashing",
      provider: "GetYourGuide",
      source: "/experiences/desert-safari",
      utm_source: "dubaimoments",
      utm_campaign: "experience-detail",
      page: "2",
    });

    assert.equal(filters.range, "7d");
    assert.equal(filters.experienceSlug, "desert-safari-dune-bashing");
    assert.equal(filters.providerName, "GetYourGuide");
    assert.equal(filters.sourcePath, "/experiences/desert-safari");
    assert.equal(filters.utmSource, "dubaimoments");
    assert.equal(filters.utmCampaign, "experience-detail");
    assert.equal(filters.page, 2);
  });

  it("rejects invalid experience slugs and malformed dates", () => {
    const filters = parseAnalyticsSearchParams({
      range: "custom",
      from: "2026-13-40",
      to: "2026-07-15",
      experience: "Invalid Slug!",
    });

    assert.equal(filters.range, DEFAULT_ANALYTICS_RANGE);
    assert.equal(filters.customFrom, null);
    assert.equal(filters.experienceSlug, null);
  });

  it("sanitizes oversized filter values", () => {
    const filters = parseAnalyticsSearchParams({
      provider: "a".repeat(200),
      utm_source: "b".repeat(200),
    });

    assert.equal(filters.providerName?.length, 100);
    assert.equal(filters.utmSource?.length, 100);
  });
});

describe("resolveAnalyticsDateRange", () => {
  it("uses Dubai midnight boundaries for today preset", () => {
    const range = resolveAnalyticsDateRange({ range: "today", customFrom: null, customTo: null }, DUBAI_NOW);

    assert.equal(range.start.toISOString(), "2026-07-14T20:00:00.000Z");
    assert.equal(range.end.toISOString(), "2026-07-15T20:00:00.000Z");
  });

  it("builds a custom Dubai range with inclusive start and exclusive end", () => {
    const range = resolveAnalyticsDateRange(
      {
        range: "custom",
        customFrom: "2026-07-14",
        customTo: "2026-07-15",
      },
      DUBAI_NOW
    );

    assert.equal(range.start.toISOString(), "2026-07-13T20:00:00.000Z");
    assert.equal(range.end.toISOString(), "2026-07-15T20:00:00.000Z");
    assert.deepEqual(listDateKeysInRange(range), ["2026-07-14", "2026-07-15"]);
  });

  it("falls back to last 30 days for invalid custom ranges", () => {
    const range = resolveAnalyticsDateRange(
      {
        range: "custom",
        customFrom: "2026-07-20",
        customTo: "2026-07-10",
      },
      DUBAI_NOW
    );

    assert.equal(range.start.toISOString(), "2026-06-15T20:00:00.000Z");
    assert.equal(range.end.toISOString(), "2026-07-15T20:00:00.000Z");
  });
});

describe("buildAnalyticsSearchParams", () => {
  const baseFilters = parseAnalyticsSearchParams({ range: "30d" });

  it("preserves active filters in shareable URLs", () => {
    const params = buildAnalyticsSearchParams({
      ...baseFilters,
      range: "7d",
      experienceSlug: "desert-safari-dune-bashing",
      providerName: "GetYourGuide",
      sourcePath: "/experiences/",
      utmSource: "dubaimoments",
      utmCampaign: "experience-detail",
    });

    assert.equal(params.get("range"), "7d");
    assert.equal(params.get("experience"), "desert-safari-dune-bashing");
    assert.equal(params.get("provider"), "GetYourGuide");
    assert.equal(params.get("source"), "/experiences/");
    assert.equal(params.get("utm_source"), "dubaimoments");
    assert.equal(params.get("utm_campaign"), "experience-detail");
  });

  it("preserves pagination while changing pages", () => {
    const filters = parseAnalyticsSearchParams({
      range: "30d",
      experience: "desert-safari-dune-bashing",
      page: "2",
    });

    const nextPage = buildAnalyticsHref(filters, { page: 3 });
    assert.match(nextPage, /page=3/);
    assert.match(nextPage, /experience=desert-safari-dune-bashing/);

    const firstPage = buildAnalyticsHref(filters, { page: 1 });
    assert.doesNotMatch(firstPage, /page=/);
  });

  it("resets to the default analytics route", () => {
    const filters = parseAnalyticsSearchParams({
      range: "7d",
      provider: "GetYourGuide",
      page: "3",
    });

    assert.equal(hasActiveAnalyticsFilters(filters), true);

    const defaults = parseAnalyticsSearchParams({});
    assert.equal(hasActiveAnalyticsFilters(defaults), false);
    assert.equal(defaults.range, DEFAULT_ANALYTICS_RANGE);
    assert.equal(defaults.page, 1);
  });
});

describe("resolveAnalyticsFilters", () => {
  it("returns a resolved Dubai range label for presets", () => {
    const resolved = resolveAnalyticsFilters(
      parseAnalyticsSearchParams({ range: "today" }),
      DUBAI_NOW
    );

    assert.equal(resolved.rangeLabel, "Today");
    assert.equal(resolved.rangeWindow.end.toISOString(), "2026-07-15T20:00:00.000Z");
  });
});
