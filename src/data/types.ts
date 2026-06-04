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

/* -------------------------------------------------------------------------- */
/*  Categories page                                                           */
/* -------------------------------------------------------------------------- */

/** Icons for the image-backed category showcase cards. */
export type CategoryShowcaseIconKey =
  | "desert"
  | "yacht"
  | "luxury"
  | "nightlife"
  | "family"
  | "dining"
  | "attractions"
  | "culture";

export type CategoryShowcase = {
  id: string;
  title: string;
  /** Display string, e.g. "25 Experiences". */
  count: string;
  icon: CategoryShowcaseIconKey;
  image: string;
  imageAlt: string;
  href: string;
};

export type FeaturedBenefitIconKey = "thrilling" | "guides" | "safety";

export type FeaturedBenefit = {
  icon: FeaturedBenefitIconKey;
  label: string;
};

export type FeaturedCategory = {
  label: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  benefits: FeaturedBenefit[];
  ctaLabel: string;
  href: string;
};

export type PopularExperience = {
  id: string;
  title: string;
  image: string;
  imageAlt: string;
  rating: number;
  /** Abbreviated review count, e.g. "2.2k". */
  reviewLabel: string;
  price: string;
  href: string;
};

export type TrustItemIconKey = "itinerary" | "price" | "support" | "trusted";

export type TrustItem = {
  icon: TrustItemIconKey;
  label: string;
};

/* -------------------------------------------------------------------------- */
/*  Blog page                                                                 */
/* -------------------------------------------------------------------------- */

export type BlogAuthor = {
  name: string;
  /** Initials shown in the gold avatar chip. */
  initials: string;
};

/**
 * A blog article. Extends {@link Guide} so it can be rendered with the shared
 * `GuideCard`, adding an optional author for the editorial/featured layout.
 */
export type BlogPost = Guide & {
  author?: BlogAuthor;
};

export type BlogCategoryIconKey =
  | "guides"
  | "itineraries"
  | "hidden-gems"
  | "luxury"
  | "food"
  | "nightlife"
  | "culture"
  | "shopping";

export type BlogCategory = {
  id: string;
  label: string;
  count: number;
  icon: BlogCategoryIconKey;
  href: string;
};

export type PopularPost = {
  id: string;
  title: string;
  image: string;
  imageAlt: string;
  date: string;
  href: string;
};

/* -------------------------------------------------------------------------- */
/*  Hidden Gems page                                                          */
/* -------------------------------------------------------------------------- */

export type HiddenGemSpot = {
  id: string;
  title: string;
  description: string;
  location: string;
  image: string;
  imageAlt: string;
  /** Short category label shown as an overlay badge, e.g. "Beach". */
  badge: string;
  /** Display price, e.g. "Free" or "From $25". */
  price: string;
  href: string;
};

export type FeaturedHiddenGem = {
  title: string;
  location: string;
  description: string;
  image: string;
  imageAlt: string;
  tags: string[];
  ctaLabel: string;
  href: string;
};

export type HiddenGemReasonIconKey =
  | "authentic"
  | "crowds"
  | "photography"
  | "local";

export type HiddenGemReason = {
  icon: HiddenGemReasonIconKey;
  title: string;
  description: string;
};

export type HiddenGemCategoryIconKey =
  | "nature"
  | "culture"
  | "cafes"
  | "photography"
  | "unique"
  | "free";

export type HiddenGemCategory = {
  id: string;
  label: string;
  count: string;
  icon: HiddenGemCategoryIconKey;
  href: string;
};

export type LocalTipIconKey = "time" | "crowds" | "bring" | "nearby";

export type LocalTip = {
  icon: LocalTipIconKey;
  title: string;
  description: string;
};

/* -------------------------------------------------------------------------- */
/*  Luxury page                                                               */
/* -------------------------------------------------------------------------- */

export type LuxuryHighlightIconKey =
  | "handpicked"
  | "partners"
  | "price"
  | "support";

export type LuxuryHighlight = {
  icon: LuxuryHighlightIconKey;
  label: string;
};

export type LuxuryCollection = {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  badge: string;
  /** Display price, e.g. "From $499". */
  price: string;
  href: string;
};

export type LuxuryExperience = {
  id: string;
  title: string;
  location: string;
  image: string;
  imageAlt: string;
  badge: string;
  price: string;
  href: string;
};

/* -------------------------------------------------------------------------- */
/*  Contact page                                                              */
/* -------------------------------------------------------------------------- */

export type ContactMethodIconKey = "whatsapp" | "email" | "phone" | "location";

export type ContactMethod = {
  id: string;
  icon: ContactMethodIconKey;
  title: string;
  description: string;
  actionLabel: string;
  href: string;
};
