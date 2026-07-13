import type {
  ExperienceProviderRow,
  ExperienceRow,
} from "@/lib/cms/types/database";
import type {
  ExperienceFormValues,
  ExperienceProviderInput,
} from "@/lib/cms/validation/experience";

export function experienceRowToFormValues(
  row: ExperienceRow
): ExperienceFormValues {
  return {
    title: row.title,
    slug: row.slug,
    category_id: row.category_id,
    location: row.location ?? "",
    description: row.description,
    long_description: row.long_description ?? "",
    listing_image_url: row.listing_image_url ?? "",
    badge: row.badge ?? "",
    duration_label: row.duration_label ?? "",
    duration_hours: row.duration_hours,
    group_size_label: row.group_size_label ?? "",
    pickup_included: row.pickup_included,
    mobile_ticket: row.mobile_ticket,
    free_cancellation: row.free_cancellation,
    meeting_point: row.meeting_point ?? "",
    cancellation_policy: row.cancellation_policy ?? "",
    languages: row.languages ?? [],
    tour_type: row.tour_type ?? "",
    recommended_score: row.recommended_score,
    highlights: row.highlights ?? [],
    included_items: row.included_items ?? [],
    itinerary: row.itinerary ?? [],
    important_info: row.important_info ?? [],
    faqs: row.faqs ?? [],
    gallery: row.gallery ?? [],
    cached_lowest_price: row.cached_lowest_price,
    cached_currency: row.cached_currency ?? "AED",
    cached_rating: row.cached_rating,
    cached_review_count: row.cached_review_count,
    meta_title: row.meta_title ?? "",
    meta_description: row.meta_description ?? "",
    og_image_url: row.og_image_url ?? "",
    canonical_path: row.canonical_path ?? "",
    no_index: row.no_index,
    status: row.status,
  };
}

export function providerRowToInput(
  row: ExperienceProviderRow
): ExperienceProviderInput {
  return {
    id: row.id,
    provider_name: row.provider_name,
    price: Number(row.price),
    currency: row.currency,
    rating: row.rating !== null ? Number(row.rating) : null,
    review_count: row.review_count,
    cancellation_text: row.cancellation_text ?? "",
    instant_confirmation: row.instant_confirmation,
    mobile_ticket: row.mobile_ticket,
    description: row.description ?? "",
    affiliate_url: row.affiliate_url,
    is_recommended: row.is_recommended,
    badge: row.badge ?? "",
    display_order: row.display_order,
    is_active: row.is_active,
  };
}

export const emptyExperienceFormValues: ExperienceFormValues = {
  title: "",
  slug: "",
  category_id: null,
  location: "",
  description: "",
  long_description: "",
  listing_image_url: "",
  badge: "",
  duration_label: "",
  duration_hours: null,
  group_size_label: "",
  pickup_included: false,
  mobile_ticket: false,
  free_cancellation: false,
  meeting_point: "",
  cancellation_policy: "",
  languages: [],
  tour_type: "",
  recommended_score: 0,
  highlights: [],
  included_items: [],
  itinerary: [],
  important_info: [],
  faqs: [],
  gallery: [],
  cached_lowest_price: null,
  cached_currency: "AED",
  cached_rating: null,
  cached_review_count: null,
  meta_title: "",
  meta_description: "",
  og_image_url: "",
  canonical_path: "",
  no_index: false,
  status: "draft",
};

export function emptyProviderInput(
  displayOrder = 0
): ExperienceProviderInput {
  return {
    provider_name: "",
    price: 0,
    currency: "AED",
    rating: null,
    review_count: null,
    cancellation_text: "",
    instant_confirmation: false,
    mobile_ticket: true,
    description: "",
    affiliate_url: "",
    is_recommended: false,
    badge: "",
    display_order: displayOrder,
    is_active: true,
  };
}
