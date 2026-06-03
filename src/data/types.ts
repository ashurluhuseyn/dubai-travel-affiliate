import type { LucideIcon } from "lucide-react";

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
  icon: LucideIcon;
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
