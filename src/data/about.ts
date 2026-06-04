import type {
  AboutImage,
  AboutStat,
  AboutTrustItem,
  AboutValue,
  WhyChooseItem,
} from "./types";

/* Stable, verified Unsplash photo IDs reused across the site. */
const SKYLINE_IMG =
  "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1000&q=85";
const DESERT_IMG =
  "https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?w=900&q=80";
const DINING_IMG =
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=80";
const YACHT_IMG =
  "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=900&q=80";
const HOTEL_IMG =
  "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1100&q=85";

/* -------------------------------------------------------------------------- */
/*  Hero                                                                      */
/* -------------------------------------------------------------------------- */

export const aboutHeroImage: AboutImage = {
  src: SKYLINE_IMG,
  alt: "Dubai skyline at dusk along the waterfront",
};

export const aboutTrustItems: AboutTrustItem[] = [
  { id: "handpicked", icon: "handpicked", label: "Handpicked Experiences" },
  { id: "experts", icon: "experts", label: "Trusted Local Experts" },
  { id: "quality", icon: "quality", label: "Quality & Safety First" },
];

/* -------------------------------------------------------------------------- */
/*  Our Story                                                                 */
/* -------------------------------------------------------------------------- */

export const aboutStoryParagraphs: string[] = [
  "We are a team of travel enthusiasts and Dubai locals who know the city inside out. From iconic landmarks to hidden gems, we curate experiences that go beyond the ordinary.",
  "Every moment is designed to create memories that last a lifetime — blending local expertise with a genuine passion for hospitality.",
];

export const aboutStoryImages: AboutImage[] = [
  { src: DESERT_IMG, alt: "Desert safari drive through golden dunes at sunset" },
  { src: DINING_IMG, alt: "Elegant fine-dining table with a skyline view" },
  { src: YACHT_IMG, alt: "Private luxury yacht on the Dubai coastline" },
];

/* -------------------------------------------------------------------------- */
/*  Our Values                                                                */
/* -------------------------------------------------------------------------- */

export const aboutValues: AboutValue[] = [
  {
    id: "customer-first",
    icon: "customer",
    title: "Customer First",
    description: "We put our travelers at the heart of everything we do.",
  },
  {
    id: "authenticity",
    icon: "authenticity",
    title: "Authenticity",
    description: "We showcase the real Dubai with genuine and unique experiences.",
  },
  {
    id: "excellence",
    icon: "excellence",
    title: "Excellence",
    description: "We are committed to the highest standards in quality and service.",
  },
  {
    id: "sustainability",
    icon: "sustainability",
    title: "Sustainability",
    description: "We support responsible tourism and a better future.",
  },
];

/* -------------------------------------------------------------------------- */
/*  Statistics                                                                */
/* -------------------------------------------------------------------------- */

export const aboutStats: AboutStat[] = [
  { id: "travelers", icon: "travelers", value: "25K+", label: "Happy Travelers" },
  { id: "experiences", icon: "experiences", value: "300+", label: "Experiences" },
  { id: "partners", icon: "partners", value: "50+", label: "Trusted Partners" },
  { id: "support", icon: "support", value: "24/7", label: "Support" },
];

/* -------------------------------------------------------------------------- */
/*  Our Mission                                                               */
/* -------------------------------------------------------------------------- */

export const aboutMissionParagraph =
  "Our mission is to inspire travelers from around the world to explore Dubai in meaningful ways. We connect you with extraordinary experiences and help you create stories worth sharing.";

export const aboutMissionBenefits: string[] = [
  "Curated by local experts",
  "Premium experiences at the best value",
  "Personalized support every step of the way",
];

export const aboutMissionImage: AboutImage = {
  src: HOTEL_IMG,
  alt: "Warm luxury hospitality setting in Dubai",
};

/* -------------------------------------------------------------------------- */
/*  Why Choose Dubai Moments                                                  */
/* -------------------------------------------------------------------------- */

export const whyChooseItems: WhyChooseItem[] = [
  {
    id: "local-expertise",
    icon: "expertise",
    title: "Local Expertise",
    description: "We live here, we know here, and we love sharing it with you.",
  },
  {
    id: "premium-selection",
    icon: "selection",
    title: "Premium Selection",
    description: "Only the best experiences make it to our collection.",
  },
  {
    id: "secure-booking",
    icon: "secure",
    title: "Secure Booking",
    description: "Your booking and payment are safe and protected.",
  },
  {
    id: "best-price",
    icon: "price",
    title: "Best Price Guarantee",
    description: "Get the best value with no hidden fees.",
  },
  {
    id: "concierge",
    icon: "concierge",
    title: "24/7 Concierge",
    description: "We're here for you anytime, anywhere.",
  },
];

/* -------------------------------------------------------------------------- */
/*  CTA                                                                       */
/* -------------------------------------------------------------------------- */

export const aboutCtaImage: AboutImage = {
  src: "https://images.unsplash.com/photo-1526495124232-a04e1849168c?w=1600&q=85",
  alt: "Luxury night scene on the Dubai coastline",
};
