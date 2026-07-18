import assert from "node:assert/strict";
import { describe, it, beforeEach, afterEach } from "node:test";

import {
  buildExperienceMediaStoragePath,
  collectManagedPathsFromUrls,
  findRemovedManagedPaths,
  getExperienceMediaPublicUrl,
  getImageSourceLabel,
  isManagedExperienceMediaUrl,
  parseManagedExperienceMediaPath,
} from "../../src/lib/cms/media/paths";
import {
  dedupeGalleryItems,
  validateExperienceMediaUpload,
  validateGalleryCount,
} from "../../src/lib/cms/media/validation";
import { findRemovedExperienceMediaPaths } from "../../src/lib/cms/media/storage-cleanup";
import {
  appendGalleryItems,
  applyGalleryUploadResults,
  fileListToFiles,
  planGalleryFileBatch,
  selectSingleCoverFile,
  uploadGalleryFiles,
} from "../../src/lib/cms/media/gallery-batch-upload";
import { MAX_EXPERIENCE_MEDIA_BYTES } from "../../src/lib/cms/media/constants";

const SUPABASE_URL = "https://example-project.supabase.co";
const MANAGED_URL = `${SUPABASE_URL}/storage/v1/object/public/experience-media/experiences/desert-safari/11111111-1111-4111-8111-111111111111.jpg`;
const FILE_ID = "11111111-1111-4111-8111-111111111111";

describe("validateExperienceMediaUpload", () => {
  it("accepts JPEG, PNG, WebP, and AVIF files", () => {
    for (const mimeType of [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/avif",
    ]) {
      const result = validateExperienceMediaUpload({
        experienceSlug: "desert-safari",
        fileName: `photo.${mimeType.split("/")[1] === "jpeg" ? "jpg" : mimeType.split("/")[1]}`,
        mimeType,
        fileSize: 1024,
      });
      assert.equal(result.ok, true);
    }
  });

  it("rejects SVG uploads", () => {
    const result = validateExperienceMediaUpload({
      experienceSlug: "desert-safari",
      fileName: "logo.svg",
      mimeType: "image/svg+xml",
      fileSize: 1024,
    });

    assert.equal(result.ok, false);
    if (!result.ok) {
      assert.match(result.error, /SVG/i);
    }
  });

  it("rejects unsupported MIME types", () => {
    const result = validateExperienceMediaUpload({
      experienceSlug: "desert-safari",
      fileName: "photo.gif",
      mimeType: "image/gif",
      fileSize: 1024,
    });

    assert.equal(result.ok, false);
  });

  it("rejects oversized files", () => {
    const result = validateExperienceMediaUpload({
      experienceSlug: "desert-safari",
      fileName: "photo.jpg",
      mimeType: "image/jpeg",
      fileSize: MAX_EXPERIENCE_MEDIA_BYTES + 1,
    });

    assert.equal(result.ok, false);
  });

  it("requires a valid slug before upload", () => {
    const result = validateExperienceMediaUpload({
      experienceSlug: "",
      fileName: "photo.jpg",
      mimeType: "image/jpeg",
      fileSize: 1024,
    });

    assert.equal(result.ok, false);
  });
});

describe("buildExperienceMediaStoragePath", () => {
  it("generates safe storage paths without path traversal", () => {
    const path = buildExperienceMediaStoragePath(
      "desert-safari",
      "jpg",
      FILE_ID
    );

    assert.equal(
      path,
      `experiences/desert-safari/${FILE_ID}.jpg`
    );
    assert.equal(
      buildExperienceMediaStoragePath("../evil", "jpg", FILE_ID),
      null
    );
    assert.equal(
      buildExperienceMediaStoragePath("desert-safari", "../jpg", FILE_ID),
      null
    );
  });
});

describe("managed URL detection", () => {
  beforeEach(() => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = SUPABASE_URL;
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY = "test-key";
  });

  afterEach(() => {
    delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    delete process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  });

  it("detects Supabase-managed URLs and preserves external URLs", () => {
    assert.equal(isManagedExperienceMediaUrl(MANAGED_URL), true);
    assert.equal(
      isManagedExperienceMediaUrl("https://images.unsplash.com/photo-1"),
      false
    );
    assert.equal(getImageSourceLabel(MANAGED_URL), "Supabase Storage");
    assert.equal(
      getImageSourceLabel("https://images.unsplash.com/photo-1"),
      "External URL"
    );
  });

  it("extracts managed storage paths and builds public URLs", () => {
    assert.equal(
      parseManagedExperienceMediaPath(MANAGED_URL),
      `experiences/desert-safari/${FILE_ID}.jpg`
    );
    assert.equal(
      parseManagedExperienceMediaPath("https://images.unsplash.com/photo-1"),
      null
    );
    assert.equal(
      getExperienceMediaPublicUrl(`experiences/desert-safari/${FILE_ID}.jpg`),
      MANAGED_URL
    );
  });

  it("never treats external URLs as removable managed paths", () => {
    const removed = findRemovedManagedPaths(
      ["https://images.unsplash.com/photo-1"],
      []
    );
    assert.deepEqual(removed, []);
  });
});

describe("gallery helpers", () => {
  it("deduplicates gallery URLs while preserving order", () => {
    const deduped = dedupeGalleryItems([
      { src: "https://example.com/a.jpg", alt: "A" },
      { src: "https://example.com/a.jpg", alt: "A duplicate" },
      { src: "https://example.com/b.jpg", alt: "B" },
    ]);

    assert.deepEqual(deduped, [
      { src: "https://example.com/a.jpg", alt: "A" },
      { src: "https://example.com/b.jpg", alt: "B" },
    ]);
  });

  it("enforces the maximum gallery count", () => {
    assert.equal(validateGalleryCount(20), null);
    assert.match(validateGalleryCount(21) ?? "", /20/);
  });

  it("finds removed managed media only after database field changes", () => {
    const before = {
      listing_image_url: MANAGED_URL,
      og_image_url: null,
      gallery: [{ src: MANAGED_URL, alt: "Gallery" }],
    };
    const after = {
      listing_image_url: "https://images.unsplash.com/photo-1",
      og_image_url: null,
      gallery: [],
    };

    const removed = findRemovedExperienceMediaPaths(before, after);
    assert.deepEqual(removed, [
      `experiences/desert-safari/${FILE_ID}.jpg`,
    ]);
    assert.deepEqual(
      collectManagedPathsFromUrls([
        "https://images.unsplash.com/photo-1",
        after.listing_image_url,
      ]),
      []
    );
  });
});

describe("gallery batch upload", () => {
  function mockFile(name: string, type = "image/jpeg", size = 1024): File {
    return new File([new Uint8Array(size)], name, { type });
  }

  function mockFileList(files: File[]): FileList {
    return {
      length: files.length,
      item(index: number) {
        return files[index] ?? null;
      },
      ...Object.fromEntries(files.map((file, index) => [index, file])),
    } as FileList;
  }

  it("selecting 2 files uploads and appends both", async () => {
    let uploadCount = 0;
    const results = await uploadGalleryFiles(
      [mockFile("one.jpg"), mockFile("two.jpg")],
      {
        experienceSlug: "desert-safari",
        startingGalleryCount: 0,
        createSignedUpload: async () => {
          uploadCount += 1;
          return {
            ok: true,
            path: `experiences/desert-safari/${uploadCount}.jpg`,
            token: `token-${uploadCount}`,
            publicUrl: `${SUPABASE_URL}/storage/v1/object/public/experience-media/experiences/desert-safari/${uploadCount}.jpg`,
          };
        },
        uploadToSignedUrl: async () => ({ error: null }),
      }
    );

    assert.equal(uploadCount, 2);
    assert.equal(results.filter((result) => result.ok).length, 2);
    assert.equal(applyGalleryUploadResults([], results).length, 2);
  });

  it("selecting 3 files preserves order", async () => {
    let uploadCount = 0;
    const results = await uploadGalleryFiles(
      [mockFile("first.jpg"), mockFile("second.jpg"), mockFile("third.jpg")],
      {
        experienceSlug: "desert-safari",
        startingGalleryCount: 0,
        createSignedUpload: async ({ fileName }) => {
          uploadCount += 1;
          return {
            ok: true,
            path: `experiences/desert-safari/${uploadCount}.jpg`,
            token: `token-${uploadCount}`,
            publicUrl: `${SUPABASE_URL}/storage/v1/object/public/experience-media/experiences/desert-safari/${fileName}`,
          };
        },
        uploadToSignedUrl: async () => ({ error: null }),
      }
    );

    const merged = applyGalleryUploadResults([], results);
    assert.deepEqual(
      merged.map((item) => item.src),
      [
        `${SUPABASE_URL}/storage/v1/object/public/experience-media/experiences/desert-safari/first.jpg`,
        `${SUPABASE_URL}/storage/v1/object/public/experience-media/experiences/desert-safari/second.jpg`,
        `${SUPABASE_URL}/storage/v1/object/public/experience-media/experiences/desert-safari/third.jpg`,
      ]
    );
  });

  it("existing gallery items are not overwritten", async () => {
    const existing = [
      { src: "https://images.unsplash.com/photo-existing", alt: "Existing" },
    ];
    let uploadCount = 0;

    const results = await uploadGalleryFiles([mockFile("new.jpg")], {
      experienceSlug: "desert-safari",
      startingGalleryCount: existing.length,
      createSignedUpload: async () => {
        uploadCount += 1;
        return {
          ok: true,
          path: "experiences/desert-safari/new.jpg",
          token: "token-new",
          publicUrl: `${SUPABASE_URL}/storage/v1/object/public/experience-media/experiences/desert-safari/new.jpg`,
        };
      },
      uploadToSignedUrl: async () => ({ error: null }),
    });

    let current = [...existing];
    for (const result of results) {
      if (result.ok) {
        current = appendGalleryItems(current, [result.item]);
      }
    }

    assert.equal(current.length, 2);
    assert.equal(current[0]?.src, existing[0]?.src);
    assert.match(current[1]?.src ?? "", /new\.jpg$/);
    assert.equal(uploadCount, 1);
  });

  it("partial upload failure retains successful files", async () => {
    const results = await uploadGalleryFiles(
      [mockFile("good.jpg"), mockFile("bad.jpg"), mockFile("also-good.jpg")],
      {
        experienceSlug: "desert-safari",
        startingGalleryCount: 0,
        createSignedUpload: async ({ fileName }) => {
          if (fileName === "bad.jpg") {
            return { ok: false, error: "Signed URL failed." };
          }

          return {
            ok: true,
            path: `experiences/desert-safari/${fileName}`,
            token: `token-${fileName}`,
            publicUrl: `${SUPABASE_URL}/storage/v1/object/public/experience-media/experiences/desert-safari/${fileName}`,
          };
        },
        uploadToSignedUrl: async () => ({ error: null }),
      }
    );

    const merged = applyGalleryUploadResults([], results);
    assert.equal(merged.length, 2);
    assert.equal(results.filter((result) => !result.ok).length, 1);
  });

  it("remaining gallery capacity is respected", () => {
    const files = [
      mockFile("1.jpg"),
      mockFile("2.jpg"),
      mockFile("3.jpg"),
      mockFile("4.jpg"),
      mockFile("5.jpg"),
    ];
    const { accepted, rejectedExcess } = planGalleryFileBatch(files, 17);

    assert.equal(accepted.length, 3);
    assert.equal(rejectedExcess.length, 2);
    assert.match(rejectedExcess[0]?.message ?? "", /3 slot/i);
  });

  it("two distinct files do not get incorrectly deduplicated", async () => {
    const results = await uploadGalleryFiles(
      [mockFile("alpha.jpg"), mockFile("beta.jpg")],
      {
        experienceSlug: "desert-safari",
        startingGalleryCount: 0,
        createSignedUpload: async ({ fileName }) => ({
          ok: true,
          path: `experiences/desert-safari/${fileName}`,
          token: `token-${fileName}`,
          publicUrl: `${SUPABASE_URL}/storage/v1/object/public/experience-media/experiences/desert-safari/${fileName}`,
        }),
        uploadToSignedUrl: async () => ({ error: null }),
      }
    );

    const merged = applyGalleryUploadResults([], results);
    assert.equal(merged.length, 2);
    assert.notEqual(merged[0]?.src, merged[1]?.src);
  });

  it("cover uploader remains single-file", () => {
    const files = mockFileList([mockFile("cover-a.jpg"), mockFile("cover-b.jpg")]);
    assert.equal(selectSingleCoverFile(files)?.name, "cover-a.jpg");
    assert.equal(fileListToFiles(files).length, 2);
  });
});
