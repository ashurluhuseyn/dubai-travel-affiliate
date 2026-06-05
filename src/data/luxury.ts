import { buildAffiliateUrl } from "@/lib/affiliate";
import { experienceHrefForId } from "@/lib/experience-path";

import type {
  LuxuryCollection,
  LuxuryExperience,
  LuxuryHighlight,
} from "./types";

/* Stable, verified Unsplash photo IDs reused across the site. */
const SKYLINE_IMG =
  "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=900&q=80";
const YACHT_IMG =
  "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=900&q=80";
const DESERT_IMG =
  "https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?w=900&q=80";
const DINING_IMG =
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=80";
const HOTEL_IMG =
  "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=900&q=80";
const COAST_IMG =
  "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=900&q=80";
const NATURE_IMG =
  "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=900&q=80";
const TRAVEL_IMG =
  "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=900&q=80";
const LOUNGE_IMG =
  "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=900&q=80";

/** Trust badges shown beneath the hero CTA. */
export const luxuryHighlights: LuxuryHighlight[] = [
  { icon: "handpicked", label: "Handpicked Luxury Experiences" },
  { icon: "partners", label: "Trusted Partners & Top Providers" },
  { icon: "price", label: "Best Price Guarantee" },
  { icon: "support", label: "VIP Customer Support" },
];

export const signatureCollections: LuxuryCollection[] = [
  {
    id: "private-yacht",
    title: "Private Yacht Experiences",
    description:
      "Cruise Dubai's stunning coastline in ultimate style and privacy.",
    image: YACHT_IMG,
    imageAlt: "Private luxury yacht on the Dubai coastline",
    badge: "Yacht Charters",
    price: "From $499",
    href: experienceHrefForId("private-yacht"),
    affiliateUrl: buildAffiliateUrl("private-yacht"),
  },
  {
    id: "desert-retreats",
    title: "Exclusive Desert Retreats",
    description:
      "Private desert escapes with gourmet dining and premium experiences.",
    image: DESERT_IMG,
    imageAlt: "Luxury desert retreat at sunset",
    badge: "Desert Luxury",
    price: "From $350",
    href: experienceHrefForId("desert-retreats"),
    affiliateUrl: buildAffiliateUrl("desert-retreats"),
  },
  {
    id: "michelin-dining",
    title: "Michelin Star Dining",
    description:
      "World-class restaurants with breathtaking views and exceptional cuisine.",
    image: DINING_IMG,
    imageAlt: "Elegant fine-dining table with a skyline view",
    badge: "Fine Dining",
    price: "From $250",
    href: experienceHrefForId("michelin-dining"),
    affiliateUrl: buildAffiliateUrl("michelin-dining"),
  },
  {
    id: "vip-tours",
    title: "VIP Tours & Private Tours",
    description:
      "Explore Dubai with private guides and premium transportation.",
    image: HOTEL_IMG,
    imageAlt: "Chauffeured luxury experience in Dubai",
    badge: "VIP Experiences",
    price: "From $400",
    href: experienceHrefForId("vip-tours"),
    affiliateUrl: buildAffiliateUrl("vip-tours"),
  },
];

/** Left-column checklist for the "Why Choose Luxury" section. */
export const luxuryReasons: string[] = [
  "Unforgettable, once-in-a-lifetime experiences",
  "Handpicked luxury with the highest standards",
  "Expert local knowledge & VIP access",
  "24/7 concierge support",
];

/** Right-column benefits for the "Elevate Every Moment" panel. */
export const elevateBenefits: string[] = [
  "Private & Exclusive",
  "Tailored Just For You",
  "Premium Service",
  "Memorable Moments",
];

export const topLuxuryExperiences: LuxuryExperience[] = [
  {
    id: "helicopter-tour",
    title: "Helicopter Tour of Dubai",
    location: "Dubai",
    image: COAST_IMG,
    imageAlt: "Aerial view of the Dubai coastline",
    badge: "Popular",
    price: "From $599",
    href: experienceHrefForId("helicopter-tour"),
    affiliateUrl: buildAffiliateUrl("helicopter-tour"),
  },
  {
    id: "underwater-dining",
    title: "Underwater Dining at Atlantis",
    location: "The Palm Jumeirah",
    image: LOUNGE_IMG,
    imageAlt: "Atmospheric fine-dining setting",
    badge: "Best Seller",
    price: "From $450",
    href: experienceHrefForId("underwater-dining"),
    affiliateUrl: buildAffiliateUrl("underwater-dining"),
  },
  {
    id: "sky-lounge",
    title: "At The Top SKY Lounge",
    location: "Burj Khalifa",
    image: SKYLINE_IMG,
    imageAlt: "Dubai skyline from a high observation lounge",
    badge: "Luxury",
    price: "From $320",
    href: experienceHrefForId("sky-lounge"),
    affiliateUrl: buildAffiliateUrl("sky-lounge"),
  },
  {
    id: "hot-air-balloon",
    title: "Hot Air Balloon with Falcon Show",
    location: "Dubai Desert",
    image: NATURE_IMG,
    imageAlt: "Hot air balloon over the desert at dawn",
    badge: "Exclusive",
    price: "From $380",
    href: experienceHrefForId("hot-air-balloon"),
    affiliateUrl: buildAffiliateUrl("hot-air-balloon"),
  },
  {
    id: "private-jet",
    title: "Private Jet Experience",
    location: "Dubai",
    image: TRAVEL_IMG,
    imageAlt: "Private jet ready for departure",
    badge: "Premium",
    price: "From $4,999",
    href: experienceHrefForId("private-jet"),
    affiliateUrl: buildAffiliateUrl("private-jet"),
  },
];

/** Trust items shown in the premium concierge CTA banner. */
export const luxuryCtaTrust: string[] = [
  "Personalized Itineraries",
  "Exclusive Access",
  "VIP Treatment",
];

/** Cinematic image for the "Elevate Every Moment" centre column / CTA. */
export const luxuryEditorialImage = {
  src: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1100&q=85",
  alt: "Infinity pool overlooking the Dubai skyline at dusk",
};

export const luxuryCtaImage = {
  src: "https://images.unsplash.com/photo-1526495124232-a04e1849168c?w=1100&q=85",
  alt: "Chauffeur opening the door of a luxury car at night",
};
