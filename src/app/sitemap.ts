import type { MetadataRoute } from "next";

import { getIndexableBlogPosts } from "@/data";
import { SITE_URL } from "@/lib/site";

const STATIC_PAGES = [
  { path: "/", updatedAt: "2026-08-24", priority: 1 },
  { path: "/about", updatedAt: "2026-08-24", priority: 0.7 },
  { path: "/contact", updatedAt: "2026-08-24", priority: 0.6 },
  { path: "/privacy-policy", updatedAt: "2026-08-24", priority: 0.4 },
  { path: "/terms", updatedAt: "2026-08-24", priority: 0.4 },
  { path: "/affiliate-disclosure", updatedAt: "2026-08-24", priority: 0.4 },
] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = STATIC_PAGES.map((page) => ({
    url: `${SITE_URL}${page.path === "/" ? "" : page.path}`,
    lastModified: new Date(page.updatedAt),
    priority: page.priority,
  }));

  const indexablePosts = getIndexableBlogPosts();
  const blogEntries: MetadataRoute.Sitemap = indexablePosts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt!),
    priority: 0.7,
  }));

  if (indexablePosts.length > 0) {
    staticEntries.push({
      url: `${SITE_URL}/blog`,
      lastModified: new Date(
        Math.max(...indexablePosts.map((post) => Date.parse(post.updatedAt!)))
      ),
      priority: 0.8,
    });
  }

  return [...staticEntries, ...blogEntries];
}
