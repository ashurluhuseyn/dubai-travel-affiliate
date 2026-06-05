import type {
  BlogCategory,
  BlogPost,
  PopularPost,
} from "./types";

/* Stable, verified Unsplash photo IDs reused across the site. */
const SKYLINE_IMG =
  "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80";
const COAST_IMG =
  "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=900&q=80";
const MARINA_IMG =
  "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=800&q=80";
const CITY_IMG =
  "https://images.unsplash.com/photo-1526495124232-a04e1849168c?w=800&q=80";
const DINING_IMG =
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80";
const DESERT_IMG =
  "https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?w=800&q=80";
const YACHT_IMG =
  "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80";
const TRAVEL_IMG =
  "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&q=80";

function blogHref(slug: string): string {
  return `/blog/${slug}`;
}

export const featuredPost: BlogPost = {
  id: "ultimate-dubai-travel-guide-2024",
  title: "Ultimate Dubai Travel Guide 2024: Everything You Need to Know Before You Go",
  excerpt:
    "From visa requirements to the best time to visit, this comprehensive guide covers everything you need to know for an unforgettable trip to Dubai.",
  image: COAST_IMG,
  imageAlt: "Iconic Dubai beachfront at golden hour",
  category: "Guides",
  readTime: "8 min read",
  date: "May 30, 2024",
  href: blogHref("ultimate-dubai-travel-guide-2024"),
  author: { name: "Sarah Johnson", initials: "SJ" },
};

export const blogPosts: BlogPost[] = [
  {
    id: "best-things-to-do-2024",
    title: "25 Best Things To Do in Dubai in 2024",
    excerpt:
      "Our hand-picked list of must-do experiences, from sky-high views to desert nights.",
    image: SKYLINE_IMG,
    imageAlt: "Dubai skyline glowing at dusk",
    category: "Guides",
    readTime: "6 min read",
    date: "May 28, 2024",
    href: blogHref("best-things-to-do-2024"),
  },
  {
    id: "dubai-5-day-itinerary",
    title: "Dubai 5 Day Itinerary: The Perfect Plan",
    excerpt:
      "A day-by-day plan balancing landmarks, leisure, and hidden local favourites.",
    image: MARINA_IMG,
    imageAlt: "Dubai Marina waterfront",
    category: "Itineraries",
    readTime: "7 min read",
    date: "May 26, 2024",
    href: blogHref("dubai-5-day-itinerary"),
  },
  {
    id: "hidden-gems-dubai",
    title: "10 Hidden Gems in Dubai You Must Visit",
    excerpt:
      "Skip the crowds and discover the quiet courtyards, souks, and viewpoints locals love.",
    image: CITY_IMG,
    imageAlt: "Historic Dubai neighbourhood",
    category: "Hidden Gems",
    readTime: "5 min read",
    date: "May 22, 2024",
    href: blogHref("hidden-gems-dubai"),
  },
  {
    id: "best-rooftop-restaurants",
    title: "20 Best Rooftop Restaurants in Dubai",
    excerpt:
      "Where to dine above the skyline — from sunset cocktails to fine-dining tasting menus.",
    image: DINING_IMG,
    imageAlt: "Elegant rooftop dining table with a view",
    category: "Food & Dining",
    readTime: "6 min read",
    date: "May 20, 2024",
    href: blogHref("best-rooftop-restaurants"),
  },
  {
    id: "desert-safari-guide",
    title: "Desert Safari in Dubai: Complete Guide",
    excerpt:
      "Everything about dune bashing, camp dinners, and choosing the right safari for you.",
    image: DESERT_IMG,
    imageAlt: "4x4 crossing desert dunes at sunset",
    category: "Guides",
    readTime: "6 min read",
    date: "May 18, 2024",
    href: blogHref("desert-safari-guide"),
  },
  {
    id: "luxury-dubai-experiences",
    title: "Luxury Experiences in Dubai You Can't Miss",
    excerpt:
      "Private yachts, helicopter tours, and butler-served suites for the ultimate escape.",
    image: YACHT_IMG,
    imageAlt: "Luxury yacht on turquoise water",
    category: "Luxury",
    readTime: "6 min read",
    date: "May 15, 2024",
    href: blogHref("luxury-dubai-experiences"),
  },
];

export const blogCategories: BlogCategory[] = [
  { id: "guides", label: "Guides", count: 12, icon: "guides", href: "/blog" },
  {
    id: "itineraries",
    label: "Itineraries",
    count: 8,
    icon: "itineraries",
    href: blogHref("dubai-5-day-itinerary"),
  },
  {
    id: "hidden-gems",
    label: "Hidden Gems",
    count: 10,
    icon: "hidden-gems",
    href: blogHref("hidden-gems-dubai"),
  },
  { id: "luxury", label: "Luxury", count: 6, icon: "luxury", href: blogHref("luxury-dubai-experiences") },
  { id: "food", label: "Food & Dining", count: 9, icon: "food", href: blogHref("best-rooftop-restaurants") },
  { id: "nightlife", label: "Nightlife", count: 7, icon: "nightlife", href: "/blog" },
  { id: "culture", label: "Culture", count: 5, icon: "culture", href: "/blog" },
  { id: "shopping", label: "Shopping", count: 4, icon: "shopping", href: blogHref("shopping-in-dubai") },
];

export const popularPosts: PopularPost[] = [
  {
    id: "visit-burj-khalifa",
    title: "How to Visit Burj Khalifa: Tickets, Timings & Tips",
    image: SKYLINE_IMG,
    imageAlt: "Burj Khalifa rising above Downtown Dubai",
    date: "May 10, 2024",
    href: blogHref("visit-burj-khalifa"),
  },
  {
    id: "best-desert-safari-deals",
    title: "Best Desert Safari Deals in Dubai",
    image: DESERT_IMG,
    imageAlt: "Desert dunes at golden hour",
    date: "May 8, 2024",
    href: blogHref("best-desert-safari-deals"),
  },
  {
    id: "dhow-cruise-guide",
    title: "Dhow Cruise Dubai: A Complete Guide",
    image: YACHT_IMG,
    imageAlt: "Traditional dhow boat on the water",
    date: "May 5, 2024",
    href: blogHref("dhow-cruise-guide"),
  },
  {
    id: "palm-jumeirah-guide",
    title: "Palm Jumeirah Guide: Hotels, Attractions & More",
    image: MARINA_IMG,
    imageAlt: "Aerial view of Palm Jumeirah",
    date: "May 3, 2024",
    href: blogHref("palm-jumeirah-guide"),
  },
  {
    id: "shopping-in-dubai",
    title: "Shopping in Dubai: Best Places and Tips",
    image: TRAVEL_IMG,
    imageAlt: "Luxury shopping mall interior",
    date: "May 1, 2024",
    href: blogHref("shopping-in-dubai"),
  },
];
