import type {
  FeaturedHiddenGem,
  HiddenGem,
  HiddenGemCategory,
  HiddenGemReason,
  HiddenGemSpot,
  LocalTip,
  RelatedExperience,
} from "./types";

export const hiddenGems: HiddenGem[] = [
  {
    id: "creek",
    title: "Dubai Creek at Dawn",
    location: "Deira",
    image:
      "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=900&q=80",
    imageAlt: "Dubai Creek waterfront in soft morning light",
    span: "tall",
    href: "#",
  },
  {
    id: "opera",
    title: "Dubai Opera Garden",
    location: "Downtown",
    image:
      "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=900&q=80",
    imageAlt: "Illuminated cityscape at night",
    span: "default",
    href: "#",
  },
  {
    id: "alserkal",
    title: "Alserkal Art District",
    location: "Al Quoz",
    image:
      "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=900&q=80",
    imageAlt: "Contemporary art gallery interior",
    span: "default",
    href: "#",
  },
  {
    id: "frame",
    title: "The Dubai Frame",
    location: "Zabeel Park",
    image:
      "https://images.unsplash.com/photo-1518562180175-34a163b1a9a6?w=900&q=80",
    imageAlt: "Golden architectural frame structure",
    span: "default",
    href: "#",
  },
  {
    id: "madinat",
    title: "Madinat Waterways",
    location: "Jumeirah",
    image:
      "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=900&q=80",
    imageAlt: "Traditional waterways with abra boats",
    span: "wide",
    href: "#",
  },
  {
    id: "miracle-garden",
    title: "Miracle Garden",
    location: "Dubailand",
    image:
      "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=900&q=80",
    imageAlt: "Lush flower garden pathways",
    span: "default",
    href: "#",
  },
];

/* -------------------------------------------------------------------------- */
/*  Hidden Gems page content                                                  */
/* -------------------------------------------------------------------------- */

const COAST_IMG =
  "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=900&q=80";
const CITY_IMG =
  "https://images.unsplash.com/photo-1526495124232-a04e1849168c?w=900&q=80";
const ART_IMG =
  "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=900&q=80";
const NATURE_IMG =
  "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=900&q=80";
const DINING_IMG =
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=80";
const CREEK_IMG =
  "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=900&q=80";
const GARDEN_IMG =
  "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=900&q=80";
const DESERT_IMG =
  "https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?w=900&q=80";
const YACHT_IMG =
  "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=900&q=80";

export const featuredHiddenGem: FeaturedHiddenGem = {
  title: "Al Fahidi Historical Neighborhood",
  location: "Bur Dubai",
  description:
    "Step back in time in Al Fahidi, Dubai's oldest neighborhood. Explore art galleries, cultural museums, charming cafés and wind-tower architecture that tells the story of old Dubai.",
  image: DINING_IMG,
  imageAlt: "Lantern-lit historical courtyard café in old Dubai",
  tags: ["Culture", "History", "Photography"],
  ctaLabel: "Explore This Gem",
  href: "#",
};

export const hiddenGemReasons: HiddenGemReason[] = [
  {
    icon: "authentic",
    title: "Unique & Authentic",
    description: "Experience the real Dubai beyond the tourist hotspots.",
  },
  {
    icon: "crowds",
    title: "Fewer Crowds",
    description: "Enjoy peaceful places away from the busy areas.",
  },
  {
    icon: "photography",
    title: "Great for Photography",
    description: "Capture stunning shots in unique settings.",
  },
  {
    icon: "local",
    title: "Support Local",
    description: "Visit local businesses and support the community.",
  },
];

export const hiddenGemSpots: HiddenGemSpot[] = [
  {
    id: "al-fahidi",
    title: "Al Fahidi Historical District",
    description:
      "A blend of old and new Dubai with traditional vibes and beautiful creek views.",
    location: "Bur Dubai",
    image: CITY_IMG,
    imageAlt: "Historic wind-tower architecture in Al Fahidi",
    badge: "Culture",
    price: "Free",
    href: "#",
  },
  {
    id: "al-sufouh-beach",
    title: "Al Sufouh Secret Beach",
    description:
      "A quiet beach with breathtaking views of Burj Al Arab, perfect for a peaceful sunset.",
    location: "Al Sufouh",
    image: COAST_IMG,
    imageAlt: "Secluded beach with calm turquoise water",
    badge: "Beach",
    price: "Free",
    href: "#",
  },
  {
    id: "alserkal-avenue",
    title: "Alserkal Avenue",
    description:
      "Dubai's artsy hub filled with galleries, studios and creative energy.",
    location: "Al Quoz",
    image: ART_IMG,
    imageAlt: "Contemporary art gallery interior",
    badge: "Art",
    price: "Free",
    href: "#",
  },
  {
    id: "ras-al-khor",
    title: "Ras Al Khor Wildlife Sanctuary",
    description:
      "A protected wetland where flocks of pink flamingos gather against the skyline.",
    location: "Ras Al Khor",
    image: NATURE_IMG,
    imageAlt: "Wetland nature reserve at golden hour",
    badge: "Nature",
    price: "Free",
    href: "#",
  },
  {
    id: "nightjar-coffee",
    title: "Nightjar Coffee Roasters",
    description:
      "A hidden industrial-chic café known for its amazing coffee and vibes.",
    location: "Al Quoz",
    image: DINING_IMG,
    imageAlt: "Cozy specialty coffee roastery interior",
    badge: "Café",
    price: "From $5",
    href: "#",
  },
  {
    id: "dubai-creek-abra",
    title: "Dubai Creek Abra Ride",
    description:
      "Cross the historic creek on a traditional wooden abra for just a few dirhams.",
    location: "Deira",
    image: CREEK_IMG,
    imageAlt: "Traditional abra boats on Dubai Creek",
    badge: "Experience",
    price: "From $1",
    href: "#",
  },
  {
    id: "green-planet",
    title: "The Green Planet",
    description:
      "An indoor tropical rainforest bio-dome teeming with exotic plants and wildlife.",
    location: "City Walk",
    image: GARDEN_IMG,
    imageAlt: "Lush indoor rainforest dome",
    badge: "Nature",
    price: "From $25",
    href: "#",
  },
  {
    id: "hatta-heritage",
    title: "Hatta Heritage Village",
    description:
      "A restored mountain village offering a glimpse into Emirati life and rugged scenery.",
    location: "Hatta",
    image: DESERT_IMG,
    imageAlt: "Mountain heritage village landscape",
    badge: "Heritage",
    price: "Free",
    href: "#",
  },
];

export const hiddenGemCategories: HiddenGemCategory[] = [
  {
    id: "nature",
    label: "Nature & Outdoors",
    count: "12 spots",
    icon: "nature",
    href: "#",
  },
  {
    id: "culture",
    label: "Culture & Heritage",
    count: "18 spots",
    icon: "culture",
    href: "#",
  },
  {
    id: "cafes",
    label: "Cafés & Restaurants",
    count: "24 spots",
    icon: "cafes",
    href: "#",
  },
  {
    id: "photography",
    label: "Photography Spots",
    count: "15 spots",
    icon: "photography",
    href: "#",
  },
  {
    id: "unique",
    label: "Unique Experiences",
    count: "20 spots",
    icon: "unique",
    href: "#",
  },
  {
    id: "free",
    label: "Free Places",
    count: "30 spots",
    icon: "free",
    href: "#",
  },
];

export const localTips: LocalTip[] = [
  {
    icon: "time",
    title: "Best Time to Visit",
    description:
      "Head out in the early morning or near sunset for soft light and cooler temperatures.",
  },
  {
    icon: "crowds",
    title: "How to Avoid Crowds",
    description:
      "Visit on weekday mornings and skip public holidays for a quieter experience.",
  },
  {
    icon: "bring",
    title: "What to Bring",
    description:
      "Comfortable shoes, a camera, sun protection, and some cash for small local vendors.",
  },
  {
    icon: "nearby",
    title: "Nearby Experiences",
    description:
      "Pair your visit with a nearby walking tour, café, or creek-side abra ride.",
  },
];

export const hiddenGemsRelated: RelatedExperience[] = [
  {
    id: "desert-safari",
    title: "Desert Safari & Dune Bashing",
    image: DESERT_IMG,
    imageAlt: "4x4 crossing desert dunes at sunset",
    price: "$79",
    rating: 4.8,
    href: "/experiences/desert-safari-dune-bashing",
  },
  {
    id: "old-dubai-walking-tour",
    title: "Old Dubai Walking Tour",
    image: CITY_IMG,
    imageAlt: "Historic Dubai streets and souks",
    price: "$30",
    rating: 4.7,
    href: "/experiences/desert-safari-dune-bashing",
  },
  {
    id: "creek-dinner-cruise",
    title: "Dubai Creek Dinner Cruise",
    image: CREEK_IMG,
    imageAlt: "Dinner cruise boat on Dubai Creek at night",
    price: "$75",
    rating: 4.8,
    href: "/experiences/desert-safari-dune-bashing",
  },
  {
    id: "luxury-yacht-tour",
    title: "Luxury Yacht Tour",
    image: YACHT_IMG,
    imageAlt: "Luxury yacht on turquoise water",
    price: "$110",
    rating: 4.9,
    href: "/experiences/desert-safari-dune-bashing",
  },
];
