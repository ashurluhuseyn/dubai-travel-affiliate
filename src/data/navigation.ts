import type { FooterSection, NavLink } from "./types";

export const navLinks: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/destinations", label: "Experience Ideas" },
  { href: "/categories", label: "Categories" },
  { href: "/blog", label: "Blog" },
  { href: "/hidden-gems", label: "Hidden Gems" },
  { href: "/luxury", label: "Luxury" },
];

export const footerSections: FooterSection[] = [
  {
    title: "Explore",
    links: [
      { href: "/destinations", label: "Experience Ideas" },
      { href: "/categories", label: "Categories" },
      { href: "/hidden-gems", label: "Hidden Gems" },
      { href: "/luxury", label: "Luxury" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/blog", label: "Blog" },
      { href: "/about", label: "About Us" },
      { href: "/contact", label: "Contact Us" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy-policy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms & Conditions" },
      { href: "/affiliate-disclosure", label: "Affiliate Disclosure" },
    ],
  },
];
