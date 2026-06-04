import type {
  DestinationExperience,
  DestinationFilters,
  DestinationStat,
  SortOption,
} from "@/types";

const experiences: DestinationExperience[] = [
  {
    id: "desert-safari-dune-bashing",
    title: "Desert Safari & Dune Bashing",
    image:
      "https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?w=800&q=80",
    imageAlt: "4x4 vehicle dune bashing across golden desert dunes",
    badge: "Bestseller",
    category: "Adventure",
    rating: 4.8,
    reviews: 3757,
    duration: "6 Hours",
    groupSize: "Small Group",
    price: 79,
    href: "#",
  },
  {
    id: "luxury-yacht-marina-cruise",
    title: "Luxury Yacht Marina Cruise",
    image:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
    imageAlt: "Luxury yacht cruising through Dubai Marina",
    badge: "Popular",
    category: "Cruise",
    rating: 4.9,
    reviews: 1581,
    duration: "4 Hours",
    groupSize: "Small Group",
    price: 199,
    href: "#",
  },
  {
    id: "burj-khalifa-at-the-top",
    title: "Burj Khalifa At The Top",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80",
    imageAlt: "Burj Khalifa towering over the Downtown Dubai skyline",
    badge: "Bestseller",
    category: "Sightseeing",
    rating: 4.9,
    reviews: 5837,
    duration: "2 Hours",
    groupSize: "Any Size",
    price: 89,
    href: "#",
  },
  {
    id: "old-town-heritage-tour",
    title: "Dubai City & Old Town Heritage Tour",
    image:
      "https://images.unsplash.com/photo-1526495124232-a04e1849168c?w=800&q=80",
    imageAlt: "Historic Al Fahidi heritage district in Dubai",
    badge: "Cultural",
    category: "Cultural",
    rating: 4.7,
    reviews: 2105,
    duration: "5 Hours",
    groupSize: "Small Group",
    price: 149,
    href: "#",
  },
  {
    id: "premium-desert-camp",
    title: "Premium Desert Camp Experience",
    image:
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80",
    imageAlt: "Luxury desert camp set up at sunset",
    badge: "New",
    category: "Adventure",
    rating: 4.8,
    reviews: 2018,
    duration: "7 Hours",
    groupSize: "Small Group",
    price: 129,
    href: "#",
  },
  {
    id: "marina-sunset-sailing",
    title: "Dubai Marina Sunset Sailing",
    image:
      "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=800&q=80",
    imageAlt: "Sailing boat on Dubai Marina at sunset",
    badge: "Popular",
    category: "Cruise",
    rating: 4.8,
    reviews: 1799,
    duration: "2.5 Hours",
    groupSize: "Small Group",
    price: 119,
    href: "#",
  },
  {
    id: "panoramic-helicopter-tour",
    title: "Panoramic City Helicopter Tour",
    image:
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80",
    imageAlt: "Helicopter flying over the coastal city skyline",
    badge: "Premium",
    category: "Sightseeing",
    rating: 4.9,
    reviews: 846,
    duration: "30 Minutes",
    groupSize: "Up to 4",
    price: 299,
    href: "#",
  },
  {
    id: "quad-biking-desert",
    title: "Quad Biking Desert Adventure",
    image:
      "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&q=80",
    imageAlt: "Quad bikes parked on desert sand",
    badge: "Bestseller",
    category: "Adventure",
    rating: 4.7,
    reviews: 2018,
    duration: "4 Hours",
    groupSize: "Small Group",
    price: 159,
    href: "#",
  },
  {
    id: "burj-al-arab-high-tea",
    title: "Burj Al Arab High Tea Experience",
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80",
    imageAlt: "Burj Al Arab luxury hotel at dusk",
    badge: "Exclusive",
    category: "Dining",
    rating: 4.8,
    reviews: 1224,
    duration: "2 Hours",
    groupSize: "Up to 6",
    price: 149,
    href: "#",
  },
];

const stats: DestinationStat[] = [
  { id: "experiences", icon: "experiences", value: "1000+", label: "Experiences" },
  { id: "rating", icon: "rating", value: "4.9", label: "Average Rating" },
  { id: "price", icon: "price", value: "Best Price", label: "Guarantee" },
  { id: "support", icon: "support", value: "24/7", label: "Customer Support" },
];

const sortOptions: SortOption[] = [
  { id: "popular", label: "Popular" },
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
  { id: "rating", label: "Top Rated" },
  { id: "newest", label: "Newest" },
];

const filters: DestinationFilters = {
  categories: [
    { id: "all", label: "All Categories", count: 1242 },
    { id: "adventure", label: "Adventure", count: 235 },
    { id: "sightseeing", label: "Sightseeing", count: 284 },
    { id: "cruise", label: "Cruise", count: 156 },
    { id: "cultural", label: "Cultural", count: 198 },
    { id: "dining", label: "Dining", count: 175 },
    { id: "nightlife", label: "Nightlife", count: 132 },
    { id: "family", label: "Family Friendly", count: 162 },
  ],
  durations: [
    { id: "any", label: "Any Duration", count: 0 },
    { id: "1-3", label: "1 - 3 Hours", count: 312 },
    { id: "3-6", label: "3 - 6 Hours", count: 421 },
    { id: "6-12", label: "6 - 12 Hours", count: 288 },
    { id: "full-day", label: "Full Day", count: 156 },
    { id: "multi-day", label: "Multi Day", count: 65 },
  ],
  ratings: [
    { id: "any", label: "Any Rating", count: 0 },
    { id: "4.5", label: "4.5 & Above", count: 632 },
    { id: "4.0", label: "4.0 & Above", count: 842 },
    { id: "3.5", label: "3.5 & Above", count: 1061 },
  ],
  availability: [
    { id: "any", label: "Any Time", count: 0 },
    { id: "today", label: "Available Today", count: 312 },
    { id: "this-week", label: "This Week", count: 642 },
    { id: "this-month", label: "This Month", count: 921 },
  ],
  instantConfirmation: [
    { id: "any", label: "Any", count: 0 },
    { id: "instant", label: "Instant Confirmation", count: 842 },
    { id: "request", label: "Request Confirmation", count: 400 },
  ],
  languages: [
    { id: "any", label: "Any Language", count: 0 },
    { id: "english", label: "English", count: 842 },
    { id: "arabic", label: "Arabic", count: 312 },
    { id: "russian", label: "Russian", count: 156 },
    { id: "chinese", label: "Chinese", count: 132 },
    { id: "french", label: "French", count: 98 },
    { id: "hindi", label: "Hindi", count: 76 },
    { id: "german", label: "German", count: 65 },
    { id: "spanish", label: "Spanish", count: 54 },
    { id: "other", label: "Other", count: 25 },
  ],
  groupSizes: [
    { id: "any", label: "Any Group Size", count: 0 },
    { id: "1-2", label: "1 - 2 People", count: 232 },
    { id: "3-5", label: "3 - 5 People", count: 421 },
    { id: "6-10", label: "6 - 10 People", count: 288 },
    { id: "11-20", label: "11 - 20 People", count: 156 },
    { id: "21+", label: "21+ People", count: 65 },
  ],
  tourTypes: [
    { id: "all", label: "All Types", count: 0 },
    { id: "shared", label: "Shared Tour", count: 632 },
    { id: "private", label: "Private Tour", count: 421 },
    { id: "self-guided", label: "Self-Guided", count: 156 },
    { id: "skip-line", label: "Skip The Line", count: 98 },
    { id: "vip", label: "VIP / Exclusive", count: 65 },
  ],
  other: [
    {
      id: "pickup",
      title: "Pickup Included",
      options: [
        { id: "any", label: "Any", count: 0 },
        { id: "yes", label: "Yes", count: 842 },
        { id: "no", label: "No", count: 400 },
      ],
    },
    {
      id: "cancellation",
      title: "Free Cancellation",
      options: [
        { id: "any", label: "Any", count: 0 },
        { id: "yes", label: "Yes", count: 632 },
        { id: "no", label: "No", count: 610 },
      ],
    },
  ],
};

const resultsCount = 122;

export function getDestinationExperiences(): DestinationExperience[] {
  return experiences;
}

export function getDestinationStats(): DestinationStat[] {
  return stats;
}

export function getDestinationFilters(): DestinationFilters {
  return filters;
}

export function getSortOptions(): SortOption[] {
  return sortOptions;
}

export function getResultsCount(): number {
  return resultsCount;
}
