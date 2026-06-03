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
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
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
  alternates: {
    canonical: "/",
  },
};
