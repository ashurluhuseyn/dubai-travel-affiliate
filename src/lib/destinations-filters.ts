import type {
  DestinationExperience,
  DestinationsFilterState,
  DestinationsSortId,
} from "@/data/types";

export const DEFAULT_PRICE_MIN = 10;
export const DEFAULT_PRICE_MAX = 2000;

export const DEFAULT_DESTINATIONS_FILTERS: DestinationsFilterState = {
  q: "",
  categories: ["all"],
  showcaseCategory: null,
  priceMin: DEFAULT_PRICE_MIN,
  priceMax: DEFAULT_PRICE_MAX,
  durations: ["any"],
  ratings: ["any"],
  availability: ["any"],
  instantConfirmation: ["any"],
  languages: ["any"],
  groupSizes: ["any"],
  tourTypes: ["all"],
  pickup: ["any"],
  cancellation: ["any"],
  sort: "recommended",
};

/** Maps showcase card labels to sidebar category filter ids. */
export const SHOWCASE_TO_CATEGORY_FILTER: Record<string, string> = {
  "Desert Safari": "adventure",
  "Yacht Tours": "cruise",
  "Luxury Experiences": "sightseeing",
  Nightlife: "nightlife",
  "Family Activities": "family",
  "food-dining": "dining",
  "Food & Dining": "dining",
  Attractions: "sightseeing",
  attractions: "sightseeing",
  "Culture & Heritage": "cultural",
  "culture-heritage": "cultural",
  "family-activities": "family",
  Landmarks: "sightseeing",
  "Fine Dining": "dining",
  Cruises: "cruise",
  Adventure: "adventure",
  Shopping: "sightseeing",
  "Photo Spots": "sightseeing",
  "Beach Clubs": "sightseeing",
};

const CATEGORY_ID_TO_LABEL: Record<string, string> = {
  adventure: "Adventure",
  sightseeing: "Sightseeing",
  cruise: "Cruise",
  cultural: "Cultural",
  dining: "Dining",
  nightlife: "Nightlife",
  family: "Family Friendly",
};

function matchesSearch(experience: DestinationExperience, query: string): boolean {
  if (!query.trim()) return true;
  const haystack = [
    experience.title,
    experience.category,
    experience.location,
    experience.description,
    ...experience.showcaseCategories,
  ]
    .join(" ")
    .toLowerCase();
  return haystack.includes(query.trim().toLowerCase());
}

function matchesCategoryFilters(
  experience: DestinationExperience,
  categories: string[],
  showcaseCategory: string | null
): boolean {
  if (showcaseCategory) {
    const mapped = SHOWCASE_TO_CATEGORY_FILTER[showcaseCategory];
    if (mapped) {
      const label = CATEGORY_ID_TO_LABEL[mapped];
      if (label && experience.category !== label) return false;
    } else if (
      !experience.showcaseCategories.includes(showcaseCategory) &&
      experience.category !== showcaseCategory
    ) {
      return false;
    }
  }

  const active = categories.filter((id) => id !== "all");
  if (active.length === 0) return true;

  return active.some((id) => {
    const label = CATEGORY_ID_TO_LABEL[id];
    return label ? experience.category === label : false;
  });
}

function matchesPrice(
  experience: DestinationExperience,
  min: number,
  max: number
): boolean {
  if (experience.price < min) return false;
  if (max < DEFAULT_PRICE_MAX && experience.price > max) return false;
  return true;
}

function matchesDuration(
  experience: DestinationExperience,
  durations: string[]
): boolean {
  const active = durations.filter((id) => id !== "any");
  if (active.length === 0) return true;
  const hours = experience.durationHours;

  return active.some((id) => {
    switch (id) {
      case "1-3":
        return hours >= 1 && hours <= 3;
      case "3-6":
        return hours > 3 && hours <= 6;
      case "6-12":
        return hours > 6 && hours <= 12;
      case "full-day":
        return hours > 12 && hours <= 24;
      case "multi-day":
        return hours > 24;
      default:
        return true;
    }
  });
}

function matchesRating(
  experience: DestinationExperience,
  ratings: string[]
): boolean {
  const active = ratings.filter((id) => id !== "any");
  if (active.length === 0) return true;
  const thresholds = active.map((id) => Number.parseFloat(id)).filter(Number.isFinite);
  if (thresholds.length === 0) return true;
  const minThreshold = Math.min(...thresholds);
  return experience.rating >= minThreshold;
}

function matchesSingleSelect(
  selected: string[],
  experienceValue: string,
  anyValue = "any"
): boolean {
  const active = selected.filter((id) => id !== anyValue);
  if (active.length === 0) return true;
  return active.includes(experienceValue);
}

function matchesMultiOr(
  selected: string[],
  experienceValues: string[],
  anyValue = "any"
): boolean {
  const active = selected.filter((id) => id !== anyValue);
  if (active.length === 0) return true;
  return active.some((id) => experienceValues.includes(id));
}

function matchesInstantConfirmation(
  experience: DestinationExperience,
  selected: string[]
): boolean {
  const active = selected.filter((id) => id !== "any");
  if (active.length === 0) return true;
  return active.some((id) => {
    if (id === "instant") return experience.instantConfirmation;
    if (id === "request") return !experience.instantConfirmation;
    return false;
  });
}

function matchesBooleanFilter(
  selected: string[],
  value: boolean,
  yesId = "yes",
  noId = "no"
): boolean {
  const active = selected.filter((id) => id !== "any");
  if (active.length === 0) return true;
  return active.some((id) => {
    if (id === yesId) return value === true;
    if (id === noId) return value === false;
    return false;
  });
}

export function filterExperiences(
  experiences: DestinationExperience[],
  filters: DestinationsFilterState
): DestinationExperience[] {
  return experiences.filter((experience) => {
    if (!matchesSearch(experience, filters.q)) return false;
    if (
      !matchesCategoryFilters(
        experience,
        filters.categories,
        filters.showcaseCategory
      )
    ) {
      return false;
    }
    if (!matchesPrice(experience, filters.priceMin, filters.priceMax)) {
      return false;
    }
    if (!matchesDuration(experience, filters.durations)) return false;
    if (!matchesRating(experience, filters.ratings)) return false;
    if (
      !matchesSingleSelect(filters.availability, experience.availability, "any")
    ) {
      return false;
    }
    if (!matchesInstantConfirmation(experience, filters.instantConfirmation)) {
      return false;
    }
    if (
      !matchesMultiOr(filters.languages, experience.languages, "any")
    ) {
      return false;
    }
    if (
      !matchesSingleSelect(filters.groupSizes, experience.groupSizeKey, "any")
    ) {
      return false;
    }
    if (
      !matchesSingleSelect(filters.tourTypes, experience.tourType, "all")
    ) {
      return false;
    }
    if (
      !matchesBooleanFilter(filters.pickup, experience.pickupIncluded, "yes", "no")
    ) {
      return false;
    }
    if (
      !matchesBooleanFilter(
        filters.cancellation,
        experience.freeCancellation,
        "yes",
        "no"
      )
    ) {
      return false;
    }
    return true;
  });
}

export function sortExperiences(
  experiences: DestinationExperience[],
  sort: DestinationsSortId
): DestinationExperience[] {
  const sorted = [...experiences];

  switch (sort) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "rating-desc":
      return sorted.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
    case "duration-asc":
      return sorted.sort((a, b) => a.durationHours - b.durationHours);
    case "recommended":
    default:
      return sorted.sort(
        (a, b) => b.recommendedScore - a.recommendedScore || b.reviews - a.reviews
      );
  }
}

export function parseListParam(value: string | null, fallback: string[]): string[] {
  if (!value) return fallback;
  const items = value.split(",").map((item) => item.trim()).filter(Boolean);
  return items.length > 0 ? items : fallback;
}

export function parseFiltersFromSearchParams(
  params: URLSearchParams
): DestinationsFilterState {
  const showcaseCategory = params.get("category");
  const mappedCategory = showcaseCategory
    ? SHOWCASE_TO_CATEGORY_FILTER[showcaseCategory]
    : undefined;

  const categoriesFromUrl = parseListParam(
    params.get("categories"),
    DEFAULT_DESTINATIONS_FILTERS.categories
  );

  const categories =
    mappedCategory && !categoriesFromUrl.includes(mappedCategory)
      ? [mappedCategory]
      : categoriesFromUrl;

  const sortParam = params.get("sort") as DestinationsSortId | null;
  const validSorts: DestinationsSortId[] = [
    "recommended",
    "price-asc",
    "price-desc",
    "rating-desc",
    "duration-asc",
  ];

  const priceMin = Number.parseInt(params.get("priceMin") ?? "", 10);
  const priceMax = Number.parseInt(params.get("priceMax") ?? "", 10);

  return {
    q: params.get("search") ?? params.get("q") ?? "",
    categories,
    showcaseCategory,
    priceMin: Number.isFinite(priceMin) ? priceMin : DEFAULT_PRICE_MIN,
    priceMax: Number.isFinite(priceMax) ? priceMax : DEFAULT_PRICE_MAX,
    durations: parseListParam(params.get("duration"), ["any"]),
    ratings: parseListParam(params.get("rating"), ["any"]),
    availability: parseListParam(params.get("availability"), ["any"]),
    instantConfirmation: parseListParam(params.get("instant"), ["any"]),
    languages: parseListParam(params.get("language"), ["any"]),
    groupSizes: parseListParam(params.get("groupSize"), ["any"]),
    tourTypes: parseListParam(params.get("tourType"), ["all"]),
    pickup: parseListParam(params.get("pickup"), ["any"]),
    cancellation: parseListParam(params.get("cancellation"), ["any"]),
    sort: sortParam && validSorts.includes(sortParam) ? sortParam : "recommended",
  };
}

/** Reads the `page` query param; defaults to 1. */
export function parsePageParam(params: URLSearchParams): number {
  const raw = Number.parseInt(params.get("page") ?? "1", 10);
  return Number.isFinite(raw) && raw >= 1 ? raw : 1;
}

export function filtersToSearchParams(
  filters: DestinationsFilterState,
  page = 1
): URLSearchParams {
  const params = new URLSearchParams();

  if (filters.q.trim()) params.set("search", filters.q.trim());
  if (filters.showcaseCategory) {
    params.set("category", filters.showcaseCategory);
  }

  const setList = (key: string, values: string[], defaultValues: string[]) => {
    const active = values.filter(
      (value) => !defaultValues.includes(value)
    );
    if (active.length > 0) params.set(key, active.join(","));
  };

  setList("categories", filters.categories, ["all"]);
  if (filters.priceMin !== DEFAULT_PRICE_MIN) {
    params.set("priceMin", String(filters.priceMin));
  }
  if (filters.priceMax !== DEFAULT_PRICE_MAX) {
    params.set("priceMax", String(filters.priceMax));
  }
  setList("duration", filters.durations, ["any"]);
  setList("rating", filters.ratings, ["any"]);
  setList("availability", filters.availability, ["any"]);
  setList("instant", filters.instantConfirmation, ["any"]);
  setList("language", filters.languages, ["any"]);
  setList("groupSize", filters.groupSizes, ["any"]);
  setList("tourType", filters.tourTypes, ["all"]);
  setList("pickup", filters.pickup, ["any"]);
  setList("cancellation", filters.cancellation, ["any"]);

  if (filters.sort !== "recommended") params.set("sort", filters.sort);

  if (page > 1) params.set("page", String(page));

  return params;
}

export function hasActiveFilters(filters: DestinationsFilterState): boolean {
  return (
    filters.q.trim() !== "" ||
    filters.showcaseCategory !== null ||
    !filters.categories.includes("all") ||
    filters.priceMin !== DEFAULT_PRICE_MIN ||
    filters.priceMax !== DEFAULT_PRICE_MAX ||
    !filters.durations.includes("any") ||
    !filters.ratings.includes("any") ||
    !filters.availability.includes("any") ||
    !filters.instantConfirmation.includes("any") ||
    !filters.languages.includes("any") ||
    !filters.groupSizes.includes("any") ||
    !filters.tourTypes.includes("all") ||
    !filters.pickup.includes("any") ||
    !filters.cancellation.includes("any")
  );
}
