import type { Metadata } from "next";

import { PageLayout } from "@/components/layout/page-layout";
import { LuxuryCta } from "@/components/luxury/luxury-cta";
import { LuxuryHero } from "@/components/luxury/luxury-hero";
import { SignatureCollections } from "@/components/luxury/signature-collections";
import { TopLuxuryExperiences } from "@/components/luxury/top-luxury-experiences";
import { WhyChooseLuxury } from "@/components/luxury/why-choose-luxury";
import { createPageMetadata } from "@/lib/site";

export const metadata: Metadata = createPageMetadata({
  title: "Luxury Experiences in Dubai",
  description:
    "Indulge in the finest Dubai has to offer. Private yacht charters, exclusive desert retreats, Michelin dining, and VIP tours curated for discerning travelers.",
  path: "/luxury",
});

export default function LuxuryPage() {
  return (
    <PageLayout>
      <LuxuryHero />
      <SignatureCollections />
      <WhyChooseLuxury />
      <TopLuxuryExperiences />
      <LuxuryCta />
    </PageLayout>
  );
}
