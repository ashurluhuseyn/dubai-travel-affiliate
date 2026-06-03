export type IconKey =
  | "building"
  | "dining"
  | "cruise"
  | "adventure"
  | "shopping"
  | "nightlife"
  | "photo"
  | "beach";

export type NavLink = {
  href: string;
  label: string;
};

export type FooterSection = {
  title: string;
  links: NavLink[];
};

export type HeroStat = {
  value: string;
  label: string;
};

export type Experience = {
  id: string;
  title: string;
  location: string;
  image: string;
  imageAlt: string;
  category: string;
  rating: number;
  reviews: number;
  price: string;
  href: string;
};

export type Category = {
  id: string;
  label: string;
  count: string;
  icon: IconKey;
  href: string;
};

export type ChatMessage = {
  id: string;
  role: "assistant" | "user";
  content: string;
};

export type ItineraryItem = {
  label: string;
  time: string;
};

export type ItineraryDay = {
  id: string;
  day: string;
  title: string;
  items: ItineraryItem[];
};

export type HiddenGem = {
  id: string;
  title: string;
  location: string;
  image: string;
  imageAlt: string;
  /** Controls bento span on large screens */
  span: "tall" | "wide" | "default";
  href: string;
};

export type LifestyleItem = {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  tag: string;
  /** Marks the large hero tile in the bento layout */
  featured?: boolean;
  href: string;
};

export type Testimonial = {
  id: string;
  quote: string;
  author: string;
  role: string;
  initials: string;
  rating: number;
};

export type Guide = {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  category: string;
  readTime: string;
  date: string;
  href: string;
};

/* -------------------------------------------------------------------------- */
/*  Experience detail page                                                    */
/* -------------------------------------------------------------------------- */

/** Quick-fact pills shown under the experience title. */
export type ExperienceMetaIconKey = "duration" | "group" | "pickup" | "ticket";

export type ExperienceMeta = {
  icon: ExperienceMetaIconKey;
  label: string;
};

/** Icons for the "What's Included" grid. */
export type IncludedIconKey =
  | "pickup"
  | "dinner"
  | "shows"
  | "camel"
  | "drinks";

export type IncludedItem = {
  id: string;
  icon: IncludedIconKey;
  label: string;
};

export type ItineraryStop = {
  time: string;
  title: string;
  description?: string;
};

export type GalleryImage = {
  src: string;
  alt: string;
};

export type FaqSection = {
  id: string;
  title: string;
  /** Plain text; newlines are rendered as separate paragraphs. */
  content: string;
};

/** Compact card used in the "You Might Also Like" carousel. */
export type RelatedExperience = {
  id: string;
  title: string;
  image: string;
  imageAlt: string;
  price: string;
  rating: number;
  href: string;
};

export type ExperienceDetail = {
  slug: string;
  title: string;
  category: string;
  /** Optional overlay badge on the hero image, e.g. "Bestseller". */
  badge?: string;
  rating: number;
  reviews: number;
  description: string;
  meta: ExperienceMeta[];
  /** Display string, e.g. "$79". */
  price: string;
  /** Unit the price applies to, e.g. "person". */
  priceUnit: string;
  gallery: GalleryImage[];
  /** Count of additional photos not shown as thumbnails (the "+12" tile). */
  galleryExtraCount?: number;
  highlights: string[];
  included: IncludedItem[];
  itinerary: ItineraryStop[];
  importantInfo: string[];
  faqSections: FaqSection[];
  related: RelatedExperience[];
};
