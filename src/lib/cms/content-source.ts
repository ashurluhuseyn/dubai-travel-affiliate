import { isCmsExperiencesEnabled } from "@/lib/cms/flags";
import { siteFeatures } from "@/lib/site-features";
import type { DestinationExperience, Experience, RelatedExperience } from "@/data/types";

import {
  getStaticPublicCategories,
  getStaticPublicDestinationExperiences,
  getStaticPublicExperienceBySlug,
  getStaticPublicExperiences,
  getStaticPublicExperienceSlugs,
  getStaticRelatedPublicExperiences,
} from "./public/static";
import type { PublicCategory } from "./public/types";

export { CMS_PUBLIC_PARITY_GAPS } from "./public/parity-notes";
export { PUBLIC_REVALIDATE_SECONDS } from "./public/constants";

export type PublicContentSource = "static" | "supabase";

/** Determines which backend serves public experience/category reads. */
export function resolvePublicContentSource(): PublicContentSource {
  return isCmsExperiencesEnabled() ? "supabase" : "static";
}

async function loadSupabasePublicSource() {
  return import("./public/supabase");
}

function withoutCommercialExperienceData(experience: Experience): Experience {
  if (siteFeatures.affiliateOffers) return experience;

  return {
    ...experience,
    price: 0,
    rating: 0,
    reviewCount: 0,
    hotelPickup: false,
    mobileTicket: false,
    instantConfirmation: false,
    freeCancellation: false,
    cancellationText: "",
    includedItems: [],
    itinerary: [],
    importantInfo: [],
    meetingPoint: "",
    cancellationPolicy: "",
    faqs: [],
    providers: [],
    badge: undefined,
  };
}

function withoutCommercialDestinationData(
  experience: DestinationExperience
): DestinationExperience {
  if (siteFeatures.affiliateOffers) return experience;

  return {
    ...experience,
    badge: undefined,
    rating: 0,
    reviews: 0,
    price: 0,
    listingPriceAed: undefined,
    listingCurrency: undefined,
    availability: "this-month",
    instantConfirmation: false,
    pickupIncluded: false,
    freeCancellation: false,
    affiliateUrl: "",
  };
}

function withoutCommercialRelatedData(
  experience: RelatedExperience
): RelatedExperience {
  if (siteFeatures.affiliateOffers) return experience;

  return {
    ...experience,
    price: "",
    rating: 0,
    affiliateUrl: "",
  };
}

/**
 * Public content repository — single server-side seam for experience/category reads.
 *
 * When CMS_EXPERIENCES_ENABLED=false (default): returns static data with zero Supabase calls.
 * When true: reads published CMS content via anonymous Supabase client + RLS.
 *
 * Supabase public reads are cached for 300 seconds (see PUBLIC_REVALIDATE_SECONDS).
 */
export async function getPublicCategories(): Promise<PublicCategory[]> {
  if (resolvePublicContentSource() === "static") {
    return getStaticPublicCategories();
  }

  const supabase = await loadSupabasePublicSource();
  return supabase.getSupabasePublicCategories();
}

export async function getPublicExperiences(): Promise<Experience[]> {
  if (resolvePublicContentSource() === "static") {
    return getStaticPublicExperiences().map(withoutCommercialExperienceData);
  }

  const supabase = await loadSupabasePublicSource();
  const experiences = await supabase.getSupabasePublicExperiences();
  return experiences.map(withoutCommercialExperienceData);
}

export async function getPublicExperienceBySlug(
  slug: string
): Promise<Experience | null> {
  if (resolvePublicContentSource() === "static") {
    const experience = getStaticPublicExperienceBySlug(slug);
    return experience ? withoutCommercialExperienceData(experience) : null;
  }

  const supabase = await loadSupabasePublicSource();
  const experience = await supabase.getSupabasePublicExperienceBySlug(slug);
  return experience ? withoutCommercialExperienceData(experience) : null;
}

export async function getPublicExperienceSlugs(): Promise<string[]> {
  if (resolvePublicContentSource() === "static") {
    return getStaticPublicExperienceSlugs();
  }

  const supabase = await loadSupabasePublicSource();
  return supabase.getSupabasePublicExperienceSlugs();
}

export async function getPublicDestinationExperiences(): Promise<
  DestinationExperience[]
> {
  if (resolvePublicContentSource() === "static") {
    return getStaticPublicDestinationExperiences().map(
      withoutCommercialDestinationData
    );
  }

  const supabase = await loadSupabasePublicSource();
  const experiences = await supabase.getSupabasePublicDestinationExperiences();
  return experiences.map(withoutCommercialDestinationData);
}

export async function getRelatedPublicExperiences(
  experience: Experience
): Promise<RelatedExperience[]> {
  if (resolvePublicContentSource() === "static") {
    return getStaticRelatedPublicExperiences(experience).map(
      withoutCommercialRelatedData
    );
  }

  const supabase = await loadSupabasePublicSource();
  const experiences = await supabase.getSupabaseRelatedPublicExperiences(experience);
  return experiences.map(withoutCommercialRelatedData);
}
