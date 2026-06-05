import type {
  DestinationFilters,
  DestinationStat,
  SortOption,
} from "./types";
import { destinationExperiences } from "./destination-experiences";

export { destinationExperiences };

const stats: DestinationStat[] = [
  { id: "experiences", icon: "experiences", value: "1000+", label: "Experiences" },
  { id: "rating", icon: "rating", value: "4.9", label: "Average Rating" },
  { id: "price", icon: "price", value: "Best Price", label: "Guarantee" },
  { id: "support", icon: "support", value: "24/7", label: "Customer Support" },
];

const sortOptions: SortOption[] = [
  { id: "recommended", label: "Recommended" },
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
  { id: "rating-desc", label: "Rating: High to Low" },
  { id: "duration-asc", label: "Duration: Short to Long" },
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

export function getDestinationExperiences() {
  return destinationExperiences;
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
