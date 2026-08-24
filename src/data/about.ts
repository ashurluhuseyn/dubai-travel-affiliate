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
  { id: "handpicked", icon: "handpicked", label: "Independent Editorial" },
  { id: "experts", icon: "experts", label: "Dubai-Focused Research" },
  { id: "quality", icon: "quality", label: "Transparent Information" },
];

/* -------------------------------------------------------------------------- */
/*  Our Story                                                                 */
/* -------------------------------------------------------------------------- */

export const aboutStoryParagraphs: string[] = [
  "Caspaya is an independent travel-content project focused first on Dubai. It is being built to make trip research clearer, more practical, and easier to navigate.",
  "The current priority is publishing genuinely useful guides based on reliable sources. Caspaya does not currently sell or operate tours, process bookings, or represent a travel provider.",
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
    id: "usefulness",
    icon: "customer",
    title: "Usefulness",
    description: "Every guide should answer a real planning question clearly.",
  },
  {
    id: "authenticity",
    icon: "authenticity",
    title: "Accuracy",
    description: "Changeable travel information is checked against current sources.",
  },
  {
    id: "excellence",
    icon: "excellence",
    title: "Transparency",
    description: "Commercial relationships and editorial limits are disclosed clearly.",
  },
  {
    id: "sustainability",
    icon: "sustainability",
    title: "Care",
    description: "Content is prepared thoughtfully without inventing personal experience.",
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
  "Our mission is to help travelers research Dubai with practical context, clear sources, and fewer unsupported claims.";

export const aboutMissionBenefits: string[] = [
  "Clear search intent for every article",
  "Current sources for information that can change",
  "Transparent affiliate disclosure when links are introduced",
];

export const aboutMissionImage: AboutImage = {
  src: HOTEL_IMG,
  alt: "Warm luxury hospitality setting in Dubai",
};

/* -------------------------------------------------------------------------- */
/*  Why Choose Caspaya                                                         */
/* -------------------------------------------------------------------------- */

export const whyChooseItems: WhyChooseItem[] = [
  {
    id: "independent-research",
    icon: "expertise",
    title: "Independent Research",
    description: "Guides are written around real traveler questions and source checks.",
  },
  {
    id: "practical-structure",
    icon: "selection",
    title: "Practical Structure",
    description: "Articles focus on decisions, logistics, and useful planning details.",
  },
  {
    id: "clear-boundaries",
    icon: "secure",
    title: "Clear Boundaries",
    description: "Caspaya explains when a booking or service belongs to a third party.",
  },
];

/* -------------------------------------------------------------------------- */
/*  CTA                                                                       */
/* -------------------------------------------------------------------------- */

export const aboutCtaImage: AboutImage = {
  src: "https://images.unsplash.com/photo-1526495124232-a04e1849168c?w=1600&q=85",
  alt: "Luxury night scene on the Dubai coastline",
};
