import assert from "node:assert/strict";
import { describe, it } from "node:test";

import sitemap from "../../src/app/sitemap";
import {
  getBlogDetail,
  getIndexableBlogPosts,
  isBlogPostIndexable,
} from "../../src/data";

describe("blog publishing guard", () => {
  it("keeps every legacy placeholder out of search", () => {
    const placeholder = getBlogDetail("ultimate-dubai-travel-guide-2024");

    assert.ok(placeholder);
    assert.equal(placeholder.status, "draft");
    assert.equal(placeholder.noindex, true);
    assert.equal(isBlogPostIndexable(placeholder), false);
    assert.equal(getIndexableBlogPosts().length, 0);
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
  it("contains legal foundations but excludes placeholder content", async () => {
    const entries = await sitemap();
    const urls = entries.map((entry) => entry.url);

    assert.ok(urls.includes("https://caspaya.com/privacy-policy"));
    assert.ok(urls.includes("https://caspaya.com/terms"));
    assert.ok(urls.includes("https://caspaya.com/affiliate-disclosure"));
    assert.equal(urls.some((url) => url.includes("/blog/")), false);
    assert.equal(urls.some((url) => url.includes("/experiences/")), false);
    assert.equal(urls.some((url) => url.includes("/hidden-gems/")), false);
  });
});
