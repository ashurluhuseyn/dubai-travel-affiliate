import type { MetadataRoute } from "next";

import { getBlogSlugs, getHiddenGemSlugs } from "@/data";
import { getPublicExperienceSlugs } from "@/lib/cms/content-source";
import { SITE_URL } from "@/lib/site";

/** Marketing and listing pages included in the sitemap. */
const STATIC_PATHS = [
  "/",
  "/destinations",
  "/categories",
  "/blog",
  "/hidden-gems",
  "/luxury",
  "/contact",
  "/about",
] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  const experienceSlugs = await getPublicExperienceSlugs();

  const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.map((path) => ({
    url: `${SITE_URL}${path === "/" ? "" : path}`,
    lastModified,
    changeFrequency: path === "/" ? "daily" : "weekly",
    priority: path === "/" ? 1 : 0.8,
  }));

  const experienceEntries: MetadataRoute.Sitemap = experienceSlugs.map((slug) => ({
    url: `${SITE_URL}/experiences/${slug}`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const blogEntries: MetadataRoute.Sitemap = getBlogSlugs().map((slug) => ({
    url: `${SITE_URL}/blog/${slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const hiddenGemEntries: MetadataRoute.Sitemap = getHiddenGemSlugs().map(
    (slug) => ({
      url: `${SITE_URL}/hidden-gems/${slug}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    })
  );

  return [
    ...staticEntries,
    ...experienceEntries,
    ...blogEntries,
    ...hiddenGemEntries,
  ];
}
