import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { getProviderAffiliateHref } from "../../src/lib/affiliate-tracking/provider-link";
import { buildProvidersForExperience } from "../../src/data/experience-providers";
import {
  filterActiveProviders,
  isPublishedExperience,
  PUBLIC_PROVIDER_EMBED_FIELDS,
} from "../../src/lib/cms/public/supabase-fetch";
import {
  mapSupabaseExperienceRow,
  mapSupabaseProviders,
} from "../../src/lib/cms/public/normalize";
import type { ExperienceProviderRow, ExperienceRow } from "../../src/lib/cms/types/database";

const CMS_PROVIDER_UUID = "550e8400-e29b-41d4-a716-446655440000";

const baseExperienceRow: ExperienceRow = {
  id: "uuid-1",
  slug: "desert-safari-dune-bashing",
  title: "Desert Safari & Dune Bashing",
  category_id: "cat-1",
  location: "Dubai Desert",
  description: "Short description",
  long_description: null,
  listing_image_url: "https://example.com/cover.jpg",
  badge: "Bestseller",
  duration_label: "6 Hours",
  duration_hours: 6,
  group_size_label: "Small Group",
  pickup_included: true,
  mobile_ticket: true,
  free_cancellation: true,
  meeting_point: "Hotel pickup",
  cancellation_policy: "Free cancellation",
  languages: ["english"],
  tour_type: "shared",
  recommended_score: 98,
  highlights: ["Dune bashing"],
  included_items: [{ label: "BBQ dinner" }],
  itinerary: [{ time: "3:00 PM", title: "Pickup" }],
  important_info: ["Wear comfortable shoes"],
  faqs: [{ question: "Pickup?", answer: "Yes" }],
  gallery: [{ src: "https://example.com/1.jpg", alt: "Desert" }],
  gallery_extra_count: 0,
  related_experience_slugs: [],
  cached_lowest_price: 290,
  cached_currency: "AED",
  cached_rating: 4.8,
  cached_review_count: 1000,
  meta_title: "Desert Safari",
  meta_description: "Short description",
  og_image_url: "https://example.com/cover.jpg",
  canonical_path: "/experiences/desert-safari-dune-bashing",
  no_index: false,
  status: "published",
  published_at: "2026-01-01T00:00:00.000Z",
  created_by: null,
  updated_by: null,
  created_at: "2026-01-01T00:00:00.000Z",
  updated_at: "2026-01-01T00:00:00.000Z",
};

function makeProvider(
  overrides: Partial<ExperienceProviderRow> = {}
): ExperienceProviderRow {
  return {
    id: "provider-1",
    experience_id: "uuid-1",
    provider_name: "GetYourGuide",
    price: 290,
    currency: "AED",
    rating: 4.8,
    review_count: 1000,
    cancellation_text: "Free cancellation",
    instant_confirmation: true,
    mobile_ticket: true,
    description: "Popular choice",
    affiliate_url: "https://example.com/book",
    is_recommended: true,
    badge: "Best Seller",
    display_order: 0,
    is_active: true,
    created_at: "2026-01-01T00:00:00.000Z",
    updated_at: "2026-01-01T00:00:00.000Z",
    ...overrides,
  };
}

describe("isPublishedExperience", () => {
  it("accepts published rows", () => {
    assert.equal(isPublishedExperience({ status: "published" }), true);
  });

  it("rejects draft rows", () => {
    assert.equal(isPublishedExperience({ status: "draft" }), false);
  });
});

describe("filterActiveProviders", () => {
  it("excludes inactive providers", () => {
    const providers = filterActiveProviders([
      makeProvider({ provider_name: "Active", is_active: true, display_order: 0 }),
      makeProvider({
        id: "provider-2",
        provider_name: "Inactive",
        is_active: false,
        display_order: 1,
      }),
    ]);

    assert.equal(providers.length, 1);
    assert.equal(providers[0]?.provider_name, "Active");
  });

  it("orders providers by display_order", () => {
    const providers = filterActiveProviders([
      makeProvider({
        id: "provider-2",
        provider_name: "Second",
        display_order: 2,
      }),
      makeProvider({
        id: "provider-3",
        provider_name: "First",
        display_order: 0,
      }),
    ]);

    assert.deepEqual(
      providers.map((provider) => provider.provider_name),
      ["First", "Second"]
    );
  });
});

describe("PUBLIC_PROVIDER_EMBED_FIELDS", () => {
  it("includes experience_providers.id for affiliate tracking", () => {
    assert.equal(PUBLIC_PROVIDER_EMBED_FIELDS.includes("id"), true);
    assert.equal(PUBLIC_PROVIDER_EMBED_FIELDS[0], "id");
  });
});

describe("mapSupabaseProviders", () => {
  it("maps only active providers for public output", () => {
    const providers = mapSupabaseProviders("desert-safari-dune-bashing", [
      makeProvider({ provider_name: "GetYourGuide", is_active: true }),
      makeProvider({
        id: "provider-2",
        provider_name: "Hidden",
        is_active: false,
      }),
    ]);

    assert.equal(providers.length, 1);
    assert.equal(providers[0]?.providerName, "GetYourGuide");
  });

  it("preserves the real experience_providers.id as trackingProviderId", () => {
    const providers = mapSupabaseProviders("desert-safari-dune-bashing", [
      makeProvider({
        id: CMS_PROVIDER_UUID,
        affiliate_url: "https://partner.example.com/getyourguide/desert-safari",
      }),
    ]);

    assert.equal(providers[0]?.trackingProviderId, CMS_PROVIDER_UUID);
    assert.equal(providers[0]?.id, "desert-safari-dune-bashing-getyourguide");
    assert.notEqual(providers[0]?.id, CMS_PROVIDER_UUID);
  });

  it("routes CMS providers through /go and never direct partner URLs", () => {
    const providers = mapSupabaseProviders("desert-safari-dune-bashing", [
      makeProvider({
        id: CMS_PROVIDER_UUID,
        affiliate_url: "https://partner.example.com/getyourguide/desert-safari",
      }),
    ]);
    const href = getProviderAffiliateHref(
      providers[0]!,
      "desert-safari-dune-bashing"
    );

    assert.match(href, new RegExp(`^/go/${CMS_PROVIDER_UUID}`));
    assert.doesNotMatch(href, /^https?:\/\//);
    assert.doesNotMatch(href, /partner\.example\.com/);
  });

  it("leaves static mock providers without trackingProviderId", () => {
    const staticProviders = buildProvidersForExperience({
      slug: "desert-safari-dune-bashing",
      basePriceUsd: 79,
      rating: 4.8,
      reviewCount: 1200,
      instantConfirmation: true,
      freeCancellation: true,
    });

    for (const provider of staticProviders) {
      assert.equal(provider.trackingProviderId, undefined);
      assert.match(
        getProviderAffiliateHref(provider, "desert-safari-dune-bashing"),
        /^https:\/\/partner\.example\.com\//
      );
    }
  });
});

describe("mapSupabaseExperienceRow", () => {
  it("normalizes published experience rows", () => {
    const experience = mapSupabaseExperienceRow({
      ...baseExperienceRow,
      categories: { label: "Adventure", slug: "adventure" },
      experience_providers: [makeProvider()],
    });

    assert.equal(experience.slug, "desert-safari-dune-bashing");
    assert.equal(experience.category, "Adventure");
    assert.equal(experience.includedItems[0], "BBQ dinner");
    assert.equal(experience.providers.length, 1);
    assert.equal(experience.priceUnit, "person");
  });
});

describe("supabase source selection contract", () => {
  it("represents CMS-enabled reads through published-only filters", () => {
    assert.equal(isPublishedExperience({ status: "draft" }), false);
    assert.equal(
      filterActiveProviders([makeProvider({ is_active: false })]).length,
      0
    );
  });
});
