export type NavLink = {
  href: string;
  label: string;
};

export type ExperienceItem = {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  tag?: string;
  price?: string;
  href: string;
};

export type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  category: string;
  date: string;
  href: string;
};

export const navLinks: NavLink[] = [
  { href: "#destinations", label: "Destinations" },
  { href: "#hotels", label: "Hotels" },
  { href: "#tours", label: "Tours" },
  { href: "#nightlife", label: "Nightlife" },
  { href: "#journal", label: "Journal" },
];

export const destinations: ExperienceItem[] = [
  {
    id: "palm-jumeirah",
    title: "Palm Jumeirah",
    description:
      "Iconic island living with private beaches, Michelin dining, and skyline views.",
    image:
      "https://images.unsplash.com/photo-1518684079-3c830dcef0901?w=800&q=80",
    imageAlt: "Palm Jumeirah aerial view at sunset",
    tag: "Signature",
    href: "#",
  },
  {
    id: "downtown",
    title: "Downtown Dubai",
    description:
      "Burj Khalifa, Dubai Mall, and the heart of the city's luxury pulse.",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80",
    imageAlt: "Dubai downtown skyline with Burj Khalifa",
    tag: "City",
    href: "#",
  },
  {
    id: "dubai-marina",
    title: "Dubai Marina",
    description:
      "Waterfront promenades, yacht charters, and cosmopolitan nightlife.",
    image:
      "https://images.unsplash.com/photo-1580674684081-3e9f8d9b1a8e?w=800&q=80",
    imageAlt: "Dubai Marina skyline at dusk",
    tag: "Waterfront",
    href: "#",
  },
  {
    id: "al-fahidi",
    title: "Al Fahidi",
    description:
      "Heritage quarters, art galleries, and authentic Arabian culture.",
    image:
      "https://images.unsplash.com/photo-1546412414-803848c215e1c?w=800&q=80",
    imageAlt: "Historic Al Fahidi district in Dubai",
    tag: "Culture",
    href: "#",
  },
];

export const hotels: ExperienceItem[] = [
  {
    id: "burj-al-arab",
    title: "Burj Al Arab",
    description: "The world's most iconic sail-shaped sanctuary of indulgence.",
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80",
    imageAlt: "Burj Al Arab hotel exterior",
    price: "From $1,200 / night",
    href: "#",
  },
  {
    id: "atlantis-royal",
    title: "Atlantis The Royal",
    description: "Contemporary grandeur on Palm Jumeirah with infinity pools.",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
    imageAlt: "Luxury resort pool and architecture",
    price: "From $890 / night",
    href: "#",
  },
  {
    id: "armani-hotel",
    title: "Armani Hotel Dubai",
    description: "Giorgio Armani elegance within the Burj Khalifa.",
    image:
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
    imageAlt: "Luxury hotel suite interior",
    price: "From $650 / night",
    href: "#",
  },
];

export const tours: ExperienceItem[] = [
  {
    id: "desert-safari",
    title: "Private Desert Safari",
    description:
      "Sunset dunes, falconry, and a candlelit Bedouin camp under the stars.",
    image:
      "https://images.unsplash.com/photo-1451337516015-565b974c4936?w=800&q=80",
    imageAlt: "Desert dunes at golden hour",
    price: "From $320",
    href: "#",
  },
  {
    id: "yacht-charter",
    title: "Marina Yacht Charter",
    description:
      "Half-day cruises with champagne service along the Arabian Gulf.",
    image:
      "https://images.unsplash.com/photo-1567894340315-ef73496d0d3f?w=800&q=80",
    imageAlt: "Luxury yacht on calm waters",
    price: "From $1,100",
    href: "#",
  },
  {
    id: "helicopter",
    title: "Skyline Helicopter Tour",
    description:
      "Aerial views of Palm Jumeirah, World Islands, and Downtown Dubai.",
    image:
      "https://images.unsplash.com/photo-1476514525535-07fb3b4e5a1e?w=800&q=80",
    imageAlt: "Helicopter flying over coastal city",
    price: "From $540",
    href: "#",
  },
];

export const nightlife: ExperienceItem[] = [
  {
    id: "ce-la-vie",
    title: "Ce La Vi Sky Lounge",
    description: "Panoramic cocktails above Downtown with live DJ sets.",
    image:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80",
    imageAlt: "Rooftop lounge ambiance at night",
    tag: "Rooftop",
    href: "#",
  },
  {
    id: "white-dubai",
    title: "White Dubai",
    description: "Open-air club experience with world-class headliners.",
    image:
      "https://images.unsplash.com/photo-1571266023763-5b2c948b5f8b?w=800&q=80",
    imageAlt: "Nightclub with dramatic lighting",
    tag: "Club",
    href: "#",
  },
  {
    id: "pierchic",
    title: "Pierchic",
    description: "Over-water fine dining and late-evening oyster bars.",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
    imageAlt: "Fine dining table with ocean view",
    tag: "Dining",
    href: "#",
  },
];

export const blogPosts: BlogPost[] = [
  {
    id: "winter-escapes",
    title: "Why Dubai Is the Ultimate Winter Escape",
    excerpt:
      "Sun-soaked days, world-class shopping festivals, and mild evenings perfect for rooftop dining.",
    image:
      "https://images.unsplash.com/photo-1518684079-3c830dcef0901?w=800&q=80",
    imageAlt: "Dubai coastline at golden hour",
    category: "Guides",
    date: "May 28, 2026",
    href: "#",
  },
  {
    id: "hotel-guide",
    title: "The 7 Hotels Redefining Gulf Luxury",
    excerpt:
      "From underwater suites to private butlers — our editors' picks for 2026.",
    image:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80",
    imageAlt: "Luxury hotel lobby",
    category: "Hotels",
    date: "May 15, 2026",
    href: "#",
  },
  {
    id: "desert-weekend",
    title: "A Perfect 48 Hours Beyond the City",
    excerpt:
      "Desert camps, stargazing, and Michelin pop-ups — a curated weekend itinerary.",
    image:
      "https://images.unsplash.com/photo-1509316785289-025f5b846b8e?w=800&q=80",
    imageAlt: "Desert landscape at sunset",
    category: "Itineraries",
    date: "Apr 30, 2026",
    href: "#",
  },
];

export const footerLinks = {
  explore: [
    { label: "Destinations", href: "#destinations" },
    { label: "Luxury Hotels", href: "#hotels" },
    { label: "Tours", href: "#tours" },
    { label: "Nightlife", href: "#nightlife" },
  ],
  company: [
    { label: "About", href: "#" },
    { label: "Partners", href: "#" },
    { label: "Contact", href: "#" },
    { label: "Privacy", href: "#" },
  ],
} as const;
