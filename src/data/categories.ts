import { buildAffiliateUrl } from "@/lib/affiliate";
import { experienceHrefForId } from "@/lib/experience-path";

import type {
  Category,
  CategoryShowcase,
  FeaturedCategory,
  PopularExperience,
  TrustItem,
} from "./types";

function destinationsCategoryHref(categoryName: string): string {
  return `/destinations?category=${encodeURIComponent(categoryName)}`;
}

/** Showcase cards on /categories use the same category labels as destination filters. */
function showcaseCategoryHref(title: string): string {
  return destinationsCategoryHref(title);
}

export const categories: Category[] = [
  {
    id: "landmarks",
    label: "Landmarks",
    count: "48 places",
    icon: "building",
    href: destinationsCategoryHref("Landmarks"),
  },
  {
    id: "dining",
    label: "Fine Dining",
    count: "120 venues",
    icon: "dining",
    href: destinationsCategoryHref("Fine Dining"),
  },
  {
    id: "cruises",
    label: "Cruises",
    count: "32 charters",
    icon: "cruise",
    href: destinationsCategoryHref("Cruises"),
  },
  {
    id: "adventure",
    label: "Adventure",
    count: "64 tours",
    icon: "adventure",
    href: destinationsCategoryHref("Adventure"),
  },
  {
    id: "shopping",
    label: "Shopping",
    count: "85 spots",
    icon: "shopping",
    href: destinationsCategoryHref("Shopping"),
  },
  {
    id: "nightlife",
    label: "Nightlife",
    count: "40 lounges",
    icon: "nightlife",
    href: destinationsCategoryHref("Nightlife"),
  },
  {
    id: "photography",
    label: "Photo Spots",
    count: "57 locations",
    icon: "photo",
    href: destinationsCategoryHref("Photo Spots"),
  },
  {
    id: "beaches",
    label: "Beach Clubs",
    count: "28 clubs",
    icon: "beach",
    href: destinationsCategoryHref("Beach Clubs"),
  },
];

/* -------------------------------------------------------------------------- */
/*  Categories page content                                                   */
/* -------------------------------------------------------------------------- */

const DESERT_IMG =
  "https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?w=900&q=80&fit=crop";
const SKYLINE_IMG =
  "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=900&q=80&fit=crop";
const YACHT_IMG =
  "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=900&q=80&fit=crop";
const COAST_IMG =
  "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=900&q=80&fit=crop";
const DINING_IMG =
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=80&fit=crop";

/** Image-backed showcase cards. Cards link to the (filtered) listing page. */
export const categoryShowcase: CategoryShowcase[] = [
  {
    id: "desert-safari",
    title: "Desert Safari",
    count: "25 Experiences",
    icon: "desert",
    image: DESERT_IMG,
    imageAlt: "4x4 driving across golden desert dunes",
    href: showcaseCategoryHref("Desert Safari"),
  },
  {
    id: "yacht-tours",
    title: "Yacht Tours",
    count: "15 Experiences",
    icon: "yacht",
    image: YACHT_IMG,
    imageAlt: "Luxury yacht on calm marina waters",
    href: showcaseCategoryHref("Yacht Tours"),
  },
  {
    id: "luxury",
    title: "Luxury Experiences",
    count: "22 Experiences",
    icon: "luxury",
    image: SKYLINE_IMG,
    imageAlt: "Dubai skyline glowing at dusk",
    href: showcaseCategoryHref("Luxury Experiences"),
  },
  {
    id: "nightlife",
    title: "Nightlife",
    count: "18 Experiences",
    icon: "nightlife",
    image: COAST_IMG,
    imageAlt: "City coastline lit up at night",
    href: showcaseCategoryHref("Nightlife"),
  },
  {
    id: "family-activities",
    title: "Family Activities",
    count: "20 Experiences",
    icon: "family",
    image: COAST_IMG,
    imageAlt: "Family-friendly waterfront attractions",
    href: showcaseCategoryHref("Family Activities"),
  },
  {
    id: "food-dining",
    title: "Food & Dining",
    count: "17 Experiences",
    icon: "dining",
    image: DINING_IMG,
    imageAlt: "Elegant dining table with a view",
    href: showcaseCategoryHref("Food & Dining"),
  },
  {
    id: "attractions",
    title: "Attractions",
    count: "24 Experiences",
    icon: "attractions",
    image: SKYLINE_IMG,
    imageAlt: "Iconic Dubai landmarks at golden hour",
    href: showcaseCategoryHref("Attractions"),
  },
  {
    id: "culture-heritage",
    title: "Culture & Heritage",
    count: "16 Experiences",
    icon: "culture",
    image: DESERT_IMG,
    imageAlt: "Traditional desert heritage setting",
    href: showcaseCategoryHref("Culture & Heritage"),
  },
];

export const featuredCategory: FeaturedCategory = {
  label: "Featured Category",
  title: "Adventure in the Desert",
  description:
    "Feel the thrill of the dunes. Dune bashing, quad biking, sandboarding and more unforgettable experiences await you in the golden Dubai desert.",
  image: DESERT_IMG,
  imageAlt: "4x4 vehicle racing across desert dunes at sunset",
  benefits: [
    { icon: "thrilling", label: "Thrilling Experiences" },
    { icon: "guides", label: "Professional Guides" },
    { icon: "safety", label: "Safety First" },
  ],
  ctaLabel: "Explore Adventure",
  href: experienceHrefForId("desert-safari-dune-bashing"),
  affiliateUrl: buildAffiliateUrl("desert-safari-dune-bashing"),
};

export const popularExperiences: PopularExperience[] = [
  {
    id: "morning-desert-safari",
    title: "Morning Desert Safari",
    image: DESERT_IMG,
    imageAlt: "Desert dunes in the early morning light",
    rating: 4.9,
    reviewLabel: "2.2k",
    price: "$65",
    href: experienceHrefForId("morning-desert-safari"),
    affiliateUrl: buildAffiliateUrl("morning-desert-safari"),
  },
  {
    id: "burj-khalifa-top",
    title: "Burj Khalifa At The Top",
    image: SKYLINE_IMG,
    imageAlt: "Burj Khalifa rising above Downtown Dubai",
    rating: 4.8,
    reviewLabel: "1.8k",
    price: "$45",
    href: experienceHrefForId("burj-khalifa-top"),
    affiliateUrl: buildAffiliateUrl("burj-khalifa-top"),
  },
  {
    id: "luxury-yacht-tour",
    title: "Luxury Yacht Tour",
    image: YACHT_IMG,
    imageAlt: "Luxury yacht cruising the marina",
    rating: 4.9,
    reviewLabel: "1.2k",
    price: "$110",
    href: experienceHrefForId("luxury-yacht-tour"),
    affiliateUrl: buildAffiliateUrl("luxury-yacht-tour"),
  },
  {
    id: "old-dubai-walking-tour",
    title: "Old Dubai Walking Tour",
    image: COAST_IMG,
    imageAlt: "Historic Dubai waterfront district",
    rating: 4.7,
    reviewLabel: "980",
    price: "$30",
    href: experienceHrefForId("old-dubai-walking-tour"),
    affiliateUrl: buildAffiliateUrl("old-dubai-walking-tour"),
  },
  {
    id: "hot-air-balloon-ride",
    title: "Hot Air Balloon Ride",
    image: DINING_IMG,
    imageAlt: "Hot air balloon drifting at dawn",
    rating: 4.9,
    reviewLabel: "1.1k",
    price: "$150",
    href: experienceHrefForId("hot-air-balloon-ride"),
    affiliateUrl: buildAffiliateUrl("hot-air-balloon-ride"),
  },
  {
    id: "dhow-cruise-dinner",
    title: "Dhow Cruise Dinner",
    image: YACHT_IMG,
    imageAlt: "Traditional dhow boat lit up at night",
    rating: 4.8,
    reviewLabel: "1.3k",
    price: "$75",
    href: experienceHrefForId("dhow-cruise-dinner"),
    affiliateUrl: buildAffiliateUrl("dhow-cruise-dinner"),
  },
];

export const categoryTrustItems: TrustItem[] = [
  { icon: "itinerary", label: "Personalized Itineraries" },
  { icon: "price", label: "Best Price Guarantee" },
  { icon: "support", label: "24/7 Customer Support" },
  { icon: "trusted", label: "Trusted by Thousands" },
];
