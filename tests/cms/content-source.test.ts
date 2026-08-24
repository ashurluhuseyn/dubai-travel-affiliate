import assert from "node:assert/strict";
import { afterEach, describe, it } from "node:test";

import {
  getStaticPublicExperienceBySlug,
  getStaticPublicExperienceSlugs,
} from "../../src/lib/cms/public/static";
import {
  resolvePublicContentSource,
  getPublicExperienceBySlug,
} from "../../src/lib/cms/content-source";

const ORIGINAL_FLAG = process.env.CMS_EXPERIENCES_ENABLED;

afterEach(() => {
  if (ORIGINAL_FLAG === undefined) {
    delete process.env.CMS_EXPERIENCES_ENABLED;
  } else {
    process.env.CMS_EXPERIENCES_ENABLED = ORIGINAL_FLAG;
  }
});

describe("resolvePublicContentSource", () => {
  it("selects static when CMS_EXPERIENCES_ENABLED is false", () => {
    process.env.CMS_EXPERIENCES_ENABLED = "false";
    assert.equal(resolvePublicContentSource(), "static");
  });

  it("selects static when CMS_EXPERIENCES_ENABLED is unset", () => {
    delete process.env.CMS_EXPERIENCES_ENABLED;
    assert.equal(resolvePublicContentSource(), "static");
  });

  it("selects supabase when CMS_EXPERIENCES_ENABLED is true", () => {
    process.env.CMS_EXPERIENCES_ENABLED = "true";
    assert.equal(resolvePublicContentSource(), "supabase");
  });
});

describe("getPublicExperienceBySlug with static source", () => {
  it("returns a published static experience", async () => {
    process.env.CMS_EXPERIENCES_ENABLED = "false";
    const experience = await getPublicExperienceBySlug("desert-safari-dune-bashing");
    assert.ok(experience);
    assert.equal(experience.title, "Desert Safari & Dune Bashing");
    assert.equal(experience.providers.length, 0);
    assert.equal(experience.price, 0);
  });

  it("returns null for a missing slug", async () => {
    process.env.CMS_EXPERIENCES_ENABLED = "false";
    const experience = await getPublicExperienceBySlug("does-not-exist-slug");
    assert.equal(experience, null);
  });
});

describe("static catalog coverage", () => {
  it("includes 24 experience slugs", () => {
    assert.equal(getStaticPublicExperienceSlugs().length, 24);
  });

  it("loads every static slug", () => {
    for (const slug of getStaticPublicExperienceSlugs()) {
      assert.ok(getStaticPublicExperienceBySlug(slug));
    }
  });
});
