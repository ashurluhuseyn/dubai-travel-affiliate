import { chatPreview, itinerary, plannerChips } from "./ai-planner";
import { categories } from "./categories";
import { trendingExperiences } from "./experiences";
import { latestGuides } from "./guides";
import { hiddenGems } from "./hidden-gems";
import { lifestyleItems } from "./lifestyle";
import { footerSections, navLinks } from "./navigation";
import { heroStats } from "./stats";
import { testimonials } from "./testimonials";
import type {
  Category,
  ChatMessage,
  Experience,
  FooterSection,
  Guide,
  HeroStat,
  HiddenGem,
  ItineraryDay,
  LifestyleItem,
  NavLink,
  Testimonial,
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

export function getLifestyleItems(): LifestyleItem[] {
  return lifestyleItems;
}

export function getTestimonials(): Testimonial[] {
  return testimonials;
}

export function getLatestGuides(): Guide[] {
  return latestGuides;
}
