export type ExperienceBadge =
  | "Bestseller"
  | "Popular"
  | "New"
  | "Cultural"
  | "Premium"
  | "Exclusive";

export type DestinationExperience = {
  id: string;
  title: string;
  image: string;
  imageAlt: string;
  badge?: ExperienceBadge;
  category: string;
  rating: number;
  reviews: number;
  duration: string;
  groupSize: string;
  /** Price per person in USD */
  price: number;
  href: string;
  /** External partner booking URL. */
  affiliateUrl: string;
};

/** A single selectable option inside a filter group (label + result count) */
export type FilterOption = {
  id: string;
  label: string;
  count: number;
};

/** A named group of related filter options (e.g. "Pickup Included") */
export type FilterGroup = {
  id: string;
  title: string;
  options: FilterOption[];
};

export type SortOption = {
  id: string;
  label: string;
};

export type DestinationFilters = {
  categories: FilterOption[];
  durations: FilterOption[];
  ratings: FilterOption[];
  availability: FilterOption[];
  instantConfirmation: FilterOption[];
  languages: FilterOption[];
  groupSizes: FilterOption[];
  tourTypes: FilterOption[];
  other: FilterGroup[];
};

export type StatIconKey = "experiences" | "rating" | "price" | "support";

export type DestinationStat = {
  id: string;
  icon: StatIconKey;
  value: string;
  label: string;
};
