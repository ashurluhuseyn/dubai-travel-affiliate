/** Row types matching supabase/migrations/001_admin_foundation.sql */

export type ContentStatus = "draft" | "published" | "archived";

export type CategoryRow = {
  id: string;
  slug: string;
  label: string;
  description: string | null;
  icon_key: string | null;
  sort_order: number;
  status: ContentStatus;
  created_at: string;
  updated_at: string;
};

export type ExperienceItineraryJson = {
  time: string;
  title: string;
  description?: string;
};

export type ExperienceFaqJson = {
  question: string;
  answer: string;
};

export type ExperienceGalleryJson = {
  src: string;
  alt: string;
};

export type ExperienceIncludedJson = {
  label: string;
};

export type ExperienceRow = {
  id: string;
  slug: string;
  title: string;
  category_id: string | null;
  location: string | null;
  description: string;
  long_description: string | null;
  listing_image_url: string | null;
  badge: string | null;
  duration_label: string | null;
  duration_hours: number | null;
  group_size_label: string | null;
  pickup_included: boolean;
  mobile_ticket: boolean;
  free_cancellation: boolean;
  meeting_point: string | null;
  cancellation_policy: string | null;
  languages: string[];
  tour_type: string | null;
  recommended_score: number;
  highlights: string[];
  included_items: ExperienceIncludedJson[];
  itinerary: ExperienceItineraryJson[];
  important_info: string[];
  faqs: ExperienceFaqJson[];
  gallery: ExperienceGalleryJson[];
  gallery_extra_count: number;
  related_experience_slugs: string[];
  cached_lowest_price: number | null;
  cached_currency: string;
  cached_rating: number | null;
  cached_review_count: number | null;
  meta_title: string | null;
  meta_description: string | null;
  og_image_url: string | null;
  canonical_path: string | null;
  no_index: boolean;
  status: ContentStatus;
  published_at: string | null;
  created_by: string | null;
  updated_by: string | null;
  created_at: string;
  updated_at: string;
};

export type ExperienceProviderRow = {
  id: string;
  experience_id: string;
  provider_name: string;
  price: number;
  currency: string;
  rating: number | null;
  review_count: number | null;
  cancellation_text: string | null;
  instant_confirmation: boolean;
  mobile_ticket: boolean;
  description: string | null;
  affiliate_url: string;
  is_recommended: boolean;
  badge: string | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type ExperienceListItem = Pick<
  ExperienceRow,
  "id" | "title" | "slug" | "status" | "badge" | "recommended_score" | "updated_at"
> & {
  category_label: string | null;
};
