import type { Metadata } from "next";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const siteConfig = {
  name: "Dubai Luxe Travel",
  tagline: "Curated luxury experiences in Dubai",
  description:
    "Discover handpicked luxury hotels, exclusive experiences, and premium travel offers in Dubai. Your guide to extraordinary stays and unforgettable Arabian Gulf escapes.",
  locale: "en_AE",
  keywords: [
    "Dubai luxury travel",
    "Dubai hotels",
    "luxury Dubai vacations",
    "Dubai experiences",
    "premium travel Dubai",
    "Dubai affiliate travel",
    "UAE luxury holidays",
  ],
  url: siteUrl,
  /** Default social share image (Dubai skyline). */
  defaultOgImage:
    "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&q=85",
} as const;

export const siteMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Luxury Dubai Travel`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: siteConfig.locale.replace("_", "-"),
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

type PageMetadataOptions = {
  /** Page title (appended to site name via root layout template unless absolute). */
  title: string;
  description: string;
  /** Canonical path, e.g. `/destinations`. */
  path: string;
  /** Optional OG/Twitter image URL(s). Falls back to {@link siteConfig.defaultOgImage}. */
  images?: string[];
  openGraphType?: "website" | "article";
};

/**
 * Builds consistent per-page SEO metadata: title, description, canonical,
 * Open Graph, and Twitter cards.
 */
export function createPageMetadata({
  title,
  description,
  path,
  images,
  openGraphType = "website",
}: PageMetadataOptions): Metadata {
  const ogImages = (images ?? [siteConfig.defaultOgImage]).map((url) => ({
    url,
    alt: title,
  }));

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: openGraphType,
      locale: siteConfig.locale.replace("_", "-"),
      url: path,
      siteName: siteConfig.name,
      title,
      description,
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImages.map((image) => image.url),
    },
  };
}
