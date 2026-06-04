import { chatPreview, itinerary, plannerChips } from "./ai-planner";
import { contactFaqs, contactMethods } from "./contact";
import {
  blogCategories,
  blogPosts,
  featuredPost,
  popularPosts,
} from "./blog";
import {
  categories,
  categoryShowcase,
  categoryTrustItems,
  featuredCategory,
  popularExperiences,
} from "./categories";
import { experienceDetails } from "./experience-detail";
import { trendingExperiences } from "./experiences";
import { latestGuides } from "./guides";
import {
  luxuryHighlights,
  signatureCollections,
  topLuxuryExperiences,
} from "./luxury";
import {
  featuredHiddenGem,
  hiddenGemCategories,
  hiddenGemReasons,
  hiddenGems,
  hiddenGemSpots,
  hiddenGemsRelated,
  localTips,
} from "./hidden-gems";
import { lifestyleItems } from "./lifestyle";
import { footerSections, navLinks } from "./navigation";
import { heroStats } from "./stats";
import { testimonials } from "./testimonials";
import type {
  BlogCategory,
  BlogPost,
  Category,
  CategoryShowcase,
  ChatMessage,
  ContactMethod,
  Experience,
  ExperienceDetail,
  FaqSection,
  FeaturedCategory,
  FeaturedHiddenGem,
  FooterSection,
  Guide,
  HeroStat,
  HiddenGem,
  HiddenGemCategory,
  HiddenGemReason,
  HiddenGemSpot,
  ItineraryDay,
  LifestyleItem,
  LocalTip,
  LuxuryCollection,
  LuxuryExperience,
  LuxuryHighlight,
  NavLink,
  PopularExperience,
  PopularPost,
  RelatedExperience,
  Testimonial,
  TrustItem,
} from "./types";

/**
 * Data-access layer for homepage content.
 *
 * These functions are the single seam between UI and data. They currently
 * return in-memory mock data synchronously; the signatures are kept simple so
 * the implementation can later move to an async source (CMS/API) without
 * changing call sites.
 */

export function getNavLinks(): NavLink[] {
  return navLinks;
}

export function getFooterSections(): FooterSection[] {
  return footerSections;
}

export function getHeroStats(): HeroStat[] {
  return heroStats;
}

export function getTrendingExperiences(): Experience[] {
  return trendingExperiences;
}

export function getCategories(): Category[] {
  return categories;
}

export function getCategoryShowcase(): CategoryShowcase[] {
  return categoryShowcase;
}

export function getFeaturedCategory(): FeaturedCategory {
  return featuredCategory;
}

export function getPopularExperiences(): PopularExperience[] {
  return popularExperiences;
}

export function getCategoryTrustItems(): TrustItem[] {
  return categoryTrustItems;
}

export function getPlannerChips(): string[] {
  return plannerChips;
}

export function getChatPreview(): ChatMessage[] {
  return chatPreview;
}

export function getItinerary(): ItineraryDay[] {
  return itinerary;
}

export function getHiddenGems(): HiddenGem[] {
  return hiddenGems;
}

export function getFeaturedHiddenGem(): FeaturedHiddenGem {
  return featuredHiddenGem;
}

export function getHiddenGemReasons(): HiddenGemReason[] {
  return hiddenGemReasons;
}

export function getHiddenGemSpots(): HiddenGemSpot[] {
  return hiddenGemSpots;
}

export function getHiddenGemCategories(): HiddenGemCategory[] {
  return hiddenGemCategories;
}

export function getLocalTips(): LocalTip[] {
  return localTips;
}

export function getHiddenGemsRelated(): RelatedExperience[] {
  return hiddenGemsRelated;
}

export function getLuxuryHighlights(): LuxuryHighlight[] {
  return luxuryHighlights;
}

export function getSignatureCollections(): LuxuryCollection[] {
  return signatureCollections;
}

export function getTopLuxuryExperiences(): LuxuryExperience[] {
  return topLuxuryExperiences;
}

export function getContactMethods(): ContactMethod[] {
  return contactMethods;
}

export function getContactFaqs(): FaqSection[] {
  return contactFaqs;
}

export function getLifestyleItems(): LifestyleItem[] {
  return lifestyleItems;
}

export function getTestimonials(): Testimonial[] {
  return testimonials;
}

export function getLatestGuides(): Guide[] {
  return latestGuides;
}

export function getFeaturedPost(): BlogPost {
  return featuredPost;
}

export function getBlogPosts(): BlogPost[] {
  return blogPosts;
}

export function getBlogCategories(): BlogCategory[] {
  return blogCategories;
}

export function getPopularPosts(): PopularPost[] {
  return popularPosts;
}

/** All experience detail slugs — used for static route generation. */
export function getExperienceSlugs(): string[] {
  return Object.keys(experienceDetails);
}

/** Returns the experience detail for a slug, or `null` if it does not exist. */
export function getExperienceDetail(slug: string): ExperienceDetail | null {
  return experienceDetails[slug] ?? null;
}
