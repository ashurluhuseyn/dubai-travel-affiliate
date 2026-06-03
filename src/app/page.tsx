import { BlogPreview } from "@/components/home/blog-preview";
import { FeaturedDestinations } from "@/components/home/featured-destinations";
import { HeroSection } from "@/components/home/hero-section";
import { LuxuryHotels } from "@/components/home/luxury-hotels";
import { NightlifeSection } from "@/components/home/nightlife-section";
import { ToursSection } from "@/components/home/tours-section";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <FeaturedDestinations />
        <LuxuryHotels />
        <ToursSection />
        <NightlifeSection />
        <BlogPreview />
      </main>
      <Footer />
    </>
  );
}
