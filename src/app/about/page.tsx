import type { Metadata } from "next";

import { AboutCta } from "@/components/about/about-cta";
import { AboutHero } from "@/components/about/about-hero";
import { AboutStats } from "@/components/about/about-stats";
import { OurMission } from "@/components/about/our-mission";
import { OurStory } from "@/components/about/our-story";
import { OurValues } from "@/components/about/our-values";
import { WhyChoose } from "@/components/about/why-choose";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Dubai Moments was created to help travelers discover the most exceptional experiences in Dubai — blending local expertise with a passion for hospitality.",
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <AboutHero />
        <OurStory />
        <OurValues />
        <AboutStats />
        <OurMission />
        <WhyChoose />
        <AboutCta />
      </main>
      <Footer />
    </>
  );
}
