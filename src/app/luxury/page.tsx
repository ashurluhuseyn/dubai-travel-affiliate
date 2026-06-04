import type { Metadata } from "next";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { LuxuryCta } from "@/components/luxury/luxury-cta";
import { LuxuryHero } from "@/components/luxury/luxury-hero";
import { SignatureCollections } from "@/components/luxury/signature-collections";
import { TopLuxuryExperiences } from "@/components/luxury/top-luxury-experiences";
import { WhyChooseLuxury } from "@/components/luxury/why-choose-luxury";

export const metadata: Metadata = {
  title: "Luxury Experiences in Dubai",
  description:
    "Indulge in the finest Dubai has to offer. From private yacht charters to exclusive desert retreats, discover a world of unmatched luxury.",
};

export default function LuxuryPage() {
  return (
    <>
      <Header />
      <main>
        <LuxuryHero />
        <SignatureCollections />
        <WhyChooseLuxury />
        <TopLuxuryExperiences />
        <LuxuryCta />
      </main>
      <Footer />
    </>
  );
}
