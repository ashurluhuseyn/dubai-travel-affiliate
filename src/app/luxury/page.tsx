import type { Metadata } from "next";

import { PageLayout } from "@/components/layout/page-layout";
import { LuxuryHero } from "@/components/luxury/luxury-hero";
import { SignatureCollections } from "@/components/luxury/signature-collections";
import { createPageMetadata } from "@/lib/site";

export const metadata: Metadata = createPageMetadata({
  title: "Luxury Experiences in Dubai",
  description:
    "Editorial inspiration for researching Dubai's luxury hotels, dining, desert, and waterfront experiences.",
  path: "/luxury",
  index: false,
});

export default function LuxuryPage() {
  return (
    <PageLayout>
      <LuxuryHero />
      <SignatureCollections />
    </PageLayout>
  );
}
