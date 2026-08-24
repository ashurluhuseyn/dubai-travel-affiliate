import assert from "node:assert/strict";
import { describe, it } from "node:test";

import type { Experience } from "../../src/data/types";
import {
  parseRelatedExperienceSlugs,
  resolvePublicRelatedExperienceSlugs,
  resolvePublicRelatedExperiences,
  sanitizeRelatedExperienceSlugs,
} from "../../src/lib/cms/public/related-experiences";

function makeExperience(
  overrides: Partial<Experience> & Pick<Experience, "slug" | "category">
): Experience {
  const { slug, category, ...rest } = overrides;

  return {
    id: slug,
    slug,
    title: overrides.title ?? slug,
    category,
    location: "",
    description: "",
    price: 100,
    currency: "AED",
    rating: 4.8,
    reviewCount: 100,
    duration: "2 Hours",
    groupSize: "Small Group",
    hotelPickup: true,
    mobileTicket: true,
    instantConfirmation: true,
    freeCancellation: true,
    cancellationText: "Free cancellation",
    highlights: [],
    includedItems: [],
    itinerary: [],
    importantInfo: [],
    meetingPoint: "",
    cancellationPolicy: "",
    faqs: [],
    images: [],
    galleryExtraCount: 0,
    priceUnit: "person",
    relatedExperienceSlugs: [],
    providers: [],
    ...rest,
  };
}

describe("sanitizeRelatedExperienceSlugs", () => {
  it("removes self references and duplicate slugs", () => {
    assert.deepEqual(
      sanitizeRelatedExperienceSlugs(
        ["alpha", "beta", "alpha", "current", "beta"],
        "current"
      ),
      ["alpha", "beta"]
    );
  });
});

describe("parseRelatedExperienceSlugs", () => {
  it("returns only string array entries", () => {
    assert.deepEqual(parseRelatedExperienceSlugs(["a", 1, "b"]), ["a", "b"]);
  });
});

describe("resolvePublicRelatedExperienceSlugs", () => {
  const publishedBySlug = new Map<string, Experience>([
    [
      "desert-safari-dune-bashing",
      makeExperience({
        slug: "desert-safari-dune-bashing",
        category: "Adventure",
      }),
    ],
    [
      "premium-desert-camp",
      makeExperience({ slug: "premium-desert-camp", category: "Adventure" }),
    ],
    [
      "hot-air-balloon",
      makeExperience({ slug: "hot-air-balloon", category: "Adventure" }),
    ],
    [
      "draft-only",
      makeExperience({ slug: "draft-only", category: "Adventure" }),
    ],
  ]);

  const recommendedScoreBySlug = new Map<string, number>([
    ["premium-desert-camp", 90],
    ["hot-air-balloon", 95],
    ["desert-safari-dune-bashing", 98],
  ]);

  it("preserves stored slug order for valid published experiences", () => {
    const slugs = resolvePublicRelatedExperienceSlugs({
      experience: makeExperience({
        slug: "desert-safari-dune-bashing",
        category: "Adventure",
        relatedExperienceSlugs: [
          "premium-desert-camp",
          "hot-air-balloon",
          "missing-slug",
        ],
      }),
      publishedBySlug,
      listingsBySlug: new Map(),
      recommendedScoreBySlug,
    });

    assert.deepEqual(slugs, ["premium-desert-camp", "hot-air-balloon"]);
  });

  it("excludes the current experience from stored slugs", () => {
    const slugs = resolvePublicRelatedExperienceSlugs({
      experience: makeExperience({
        slug: "desert-safari-dune-bashing",
        category: "Adventure",
        relatedExperienceSlugs: ["desert-safari-dune-bashing", "hot-air-balloon"],
      }),
      publishedBySlug,
      listingsBySlug: new Map(),
      recommendedScoreBySlug,
    });

    assert.deepEqual(slugs, ["hot-air-balloon"]);
  });

  it("falls back by recommended score when stored list has no valid records", () => {
    const slugs = resolvePublicRelatedExperienceSlugs({
      experience: makeExperience({
        slug: "desert-safari-dune-bashing",
        category: "Adventure",
        relatedExperienceSlugs: ["missing-slug", "draft-only"],
      }),
      publishedBySlug: new Map(
        [...publishedBySlug.entries()].filter(([slug]) => slug !== "draft-only")
      ),
      listingsBySlug: new Map(),
      recommendedScoreBySlug,
      fallbackLimit: 2,
    });

    assert.deepEqual(slugs, ["hot-air-balloon", "premium-desert-camp"]);
  });
});

describe("resolvePublicRelatedExperiences", () => {
  it("returns related cards in stored slug order", () => {
    const premium = makeExperience({
      slug: "premium-desert-camp",
      category: "Adventure",
      title: "Premium Desert Camp",
    });
    const balloon = makeExperience({
      slug: "hot-air-balloon",
      category: "Adventure",
      title: "Hot Air Balloon",
    });

    const related = resolvePublicRelatedExperiences({
      experience: makeExperience({
        slug: "desert-safari-dune-bashing",
        category: "Adventure",
        relatedExperienceSlugs: ["hot-air-balloon", "premium-desert-camp"],
      }),
      publishedBySlug: new Map([
        ["desert-safari-dune-bashing", makeExperience({ slug: "desert-safari-dune-bashing", category: "Adventure" })],
        ["premium-desert-camp", premium],
        ["hot-air-balloon", balloon],
      ]),
      listingsBySlug: new Map([
        ["hot-air-balloon", { image: "balloon.jpg", imageAlt: "Balloon" }],
        ["premium-desert-camp", { image: "camp.jpg", imageAlt: "Camp" }],
      ]),
      recommendedScoreBySlug: new Map(),
    });

    assert.deepEqual(
      related.map((item) => item.id),
      ["hot-air-balloon", "premium-desert-camp"]
    );
  });
});

describe("mapSupabaseExperienceRow gallery extra count", () => {
  it("maps gallery_extra_count to galleryExtraCount", async () => {
    const { mapSupabaseExperienceRow } = await import(
      "../../src/lib/cms/public/normalize"
    );

    const experience = mapSupabaseExperienceRow({
      id: "uuid",
      slug: "desert-safari-dune-bashing",
      title: "Desert Safari",
      category_id: null,
      location: null,
      description: "Short",
      long_description: null,
      listing_image_url: null,
      badge: null,
      duration_label: null,
      duration_hours: null,
      group_size_label: null,
      pickup_included: false,
      mobile_ticket: false,
      free_cancellation: false,
      meeting_point: null,
      cancellation_policy: null,
      languages: [],
      tour_type: null,
      recommended_score: 0,
      highlights: [],
      included_items: [],
      itinerary: [],
      important_info: [],
      faqs: [],
      gallery: [],
      gallery_extra_count: 12,
      related_experience_slugs: ["premium-desert-camp"],
      cached_lowest_price: null,
      cached_currency: "AED",
      cached_rating: null,
      cached_review_count: null,
      meta_title: null,
      meta_description: null,
      og_image_url: null,
      canonical_path: null,
      no_index: false,
      status: "published",
      published_at: null,
      created_by: null,
      updated_by: null,
      created_at: "",
      updated_at: "",
      categories: null,
      experience_providers: [],
    });

    assert.equal(experience.galleryExtraCount, 12);
    assert.deepEqual(experience.relatedExperienceSlugs, ["premium-desert-camp"]);
  });
});
