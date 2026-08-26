import assert from "node:assert/strict";
import { describe, it } from "node:test";

import sitemap from "../../src/app/sitemap";
import {
  getBlogDetail,
  getIndexableBlogPosts,
  isBlogPostIndexable,
} from "../../src/data";

describe("blog publishing guard", () => {
  it("keeps legacy placeholders out while allowing researched posts", () => {
    const placeholder = getBlogDetail("ultimate-dubai-travel-guide-2024");
    const publishedPosts = getIndexableBlogPosts();

    assert.ok(placeholder);
    assert.equal(placeholder.status, "draft");
    assert.equal(placeholder.noindex, true);
    assert.equal(isBlogPostIndexable(placeholder), false);
    assert.deepEqual(
      publishedPosts.map((post) => post.slug),
      [
        "best-time-to-visit-dubai",
        "dubai-first-time-guide",
        "dubai-in-48-hours",
      ]
    );
  });

  it("publishes a complete 12-month weather decision table", () => {
    const weatherGuide = getBlogDetail("best-time-to-visit-dubai");
    const monthlySection = weatherGuide?.sections.find(
      (section) => section.id === "month-by-month"
    );

    assert.ok(weatherGuide);
    assert.equal(isBlogPostIndexable(weatherGuide), true);
    assert.equal(monthlySection?.table?.rows.length, 12);
    assert.ok(
      weatherGuide.sources.some(
        (source) => source.publisher === "Dubai Statistics Center"
      )
    );
  });

  it("requires editorial fields before a post can be indexed", () => {
    const placeholder = getBlogDetail("ultimate-dubai-travel-guide-2024");
    assert.ok(placeholder);

    const candidate = {
      ...placeholder,
      status: "published" as const,
      noindex: false,
      author: { name: "Caspaya Editorial", initials: "CE" },
      publishedAt: "2026-08-24T00:00:00.000Z",
      updatedAt: "2026-08-24T00:00:00.000Z",
      sections: [
        { id: "verified", heading: "Verified section", paragraphs: ["Body"] },
      ],
      sources: [
        {
          title: "Official source",
          publisher: "Official publisher",
          url: "https://example.org/source",
          accessedAt: "2026-08-24",
        },
      ],
    };

    assert.equal(isBlogPostIndexable(candidate), true);
  });
});

describe("sitemap publishing policy", () => {
  it("contains legal foundations and only researched articles", async () => {
    const entries = await sitemap();
    const urls = entries.map((entry) => entry.url);

    assert.ok(urls.includes("https://caspaya.com/privacy-policy"));
    assert.ok(urls.includes("https://caspaya.com/terms"));
    assert.ok(urls.includes("https://caspaya.com/affiliate-disclosure"));
    assert.ok(urls.includes("https://caspaya.com/blog"));
    assert.ok(urls.includes("https://caspaya.com/blog/best-time-to-visit-dubai"));
    assert.ok(urls.includes("https://caspaya.com/blog/dubai-first-time-guide"));
    assert.ok(urls.includes("https://caspaya.com/blog/dubai-in-48-hours"));
    assert.equal(
      urls.includes("https://caspaya.com/blog/ultimate-dubai-travel-guide-2024"),
      false
    );
    assert.equal(urls.some((url) => url.includes("/experiences/")), false);
    assert.equal(urls.some((url) => url.includes("/hidden-gems/")), false);
  });
});
