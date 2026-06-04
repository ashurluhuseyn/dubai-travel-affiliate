import type {
  Category,
  CategoryShowcase,
  FeaturedCategory,
  PopularExperience,
  TrustItem,
} from "./types";

export const categories: Category[] = [
  {
    id: "landmarks",
    label: "Landmarks",
    count: "48 places",
    icon: "building",
    href: "#",
  },
  {
    id: "dining",
    label: "Fine Dining",
    count: "120 venues",
    icon: "dining",
    href: "#",
  },
  {
    id: "cruises",
    label: "Cruises",
    count: "32 charters",
    icon: "cruise",
    href: "#",
  },
  {
    id: "adventure",
    label: "Adventure",
    count: "64 tours",
    icon: "adventure",
    href: "#",
  },
  {
    id: "shopping",
    label: "Shopping",
    count: "85 spots",
    icon: "shopping",
    href: "#",
  },
  {
    id: "nightlife",
    label: "Nightlife",
    count: "40 lounges",
    icon: "nightlife",
    href: "#",
  },
  {
    id: "photography",
    label: "Photo Spots",
    count: "57 locations",
    icon: "photo",
    href: "#",
  },
  {
    id: "beaches",
    label: "Beach Clubs",
    count: "28 clubs",
    icon: "beach",
    href: "#",
  },
];

/* -------------------------------------------------------------------------- */
/*  Categories page content                                                   */
/* -------------------------------------------------------------------------- */

const DESERT_IMG =
  "https://images.unsplash.com/photo-1451337516015-565b974c4936?w=900&q=80&fit=crop";
const SKYLINE_IMG =
  "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=900&q=80&fit=crop";
const YACHT_IMG =
  "https://images.unsplash.com/photo-1567894340315-ef73496d0d3f?w=900&q=80&fit=crop";
const COAST_IMG =
  "https://images.unsplash.com/photo-1476514525535-07fb3b4e5a1e?w=900&q=80&fit=crop";
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
    href: "/destinations?category=desert-safari",
  },
  {
    id: "yacht-tours",
    title: "Yacht Tours",
    count: "15 Experiences",
    icon: "yacht",
    image: YACHT_IMG,
    imageAlt: "Luxury yacht on calm marina waters",
    href: "/destinations?category=yacht-tours",
  },
  {
    id: "luxury",
    title: "Luxury Experiences",
    count: "22 Experiences",
    icon: "luxury",
    image: SKYLINE_IMG,
    imageAlt: "Dubai skyline glowing at dusk",
    href: "/destinations?category=luxury",
  },
  {
    id: "nightlife",
    title: "Nightlife",
    count: "18 Experiences",
    icon: "nightlife",
    image: COAST_IMG,
    imageAlt: "City coastline lit up at night",
    href: "/destinations?category=nightlife",
  },
  {
    id: "family-activities",
    title: "Family Activities",
    count: "20 Experiences",
    icon: "family",
    image: COAST_IMG,
    imageAlt: "Family-friendly waterfront attractions",
    href: "/destinations?category=family-activities",
  },
  {
    id: "food-dining",
    title: "Food & Dining",
    count: "17 Experiences",
    icon: "dining",
    image: DINING_IMG,
    imageAlt: "Elegant dining table with a view",
    href: "/destinations?category=food-dining",
  },
  {
    id: "attractions",
    title: "Attractions",
    count: "24 Experiences",
    icon: "attractions",
    image: SKYLINE_IMG,
    imageAlt: "Iconic Dubai landmarks at golden hour",
    href: "/destinations?category=attractions",
  },
  {
    id: "culture-heritage",
    title: "Culture & Heritage",
    count: "16 Experiences",
    icon: "culture",
    image: DESERT_IMG,
    imageAlt: "Traditional desert heritage setting",
    href: "/destinations?category=culture-heritage",
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
  href: "/experiences/desert-safari-dune-bashing",
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
    href: "/experiences/desert-safari-dune-bashing",
  },
  {
    id: "burj-khalifa-top",
    title: "Burj Khalifa At The Top",
    image: SKYLINE_IMG,
    imageAlt: "Burj Khalifa rising above Downtown Dubai",
    rating: 4.8,
    reviewLabel: "1.8k",
    price: "$45",
    href: "/experiences/desert-safari-dune-bashing",
  },
  {
    id: "luxury-yacht-tour",
    title: "Luxury Yacht Tour",
    image: YACHT_IMG,
    imageAlt: "Luxury yacht cruising the marina",
    rating: 4.9,
    reviewLabel: "1.2k",
    price: "$110",
    href: "/experiences/desert-safari-dune-bashing",
  },
  {
    id: "old-dubai-walking-tour",
    title: "Old Dubai Walking Tour",
    image: COAST_IMG,
    imageAlt: "Historic Dubai waterfront district",
    rating: 4.7,
    reviewLabel: "980",
    price: "$30",
    href: "/experiences/desert-safari-dune-bashing",
  },
  {
    id: "hot-air-balloon-ride",
    title: "Hot Air Balloon Ride",
    image: DINING_IMG,
    imageAlt: "Hot air balloon drifting at dawn",
    rating: 4.9,
    reviewLabel: "1.1k",
    price: "$150",
    href: "/experiences/desert-safari-dune-bashing",
  },
  {
    id: "dhow-cruise-dinner",
    title: "Dhow Cruise Dinner",
    image: YACHT_IMG,
    imageAlt: "Traditional dhow boat lit up at night",
    rating: 4.8,
    reviewLabel: "1.3k",
    price: "$75",
    href: "/experiences/desert-safari-dune-bashing",
  },
];

export const categoryTrustItems: TrustItem[] = [
  { icon: "itinerary", label: "Personalized Itineraries" },
  { icon: "price", label: "Best Price Guarantee" },
  { icon: "support", label: "24/7 Customer Support" },
  { icon: "trusted", label: "Trusted by Thousands" },
];
