import type { FooterSection, NavLink } from "./types";

export const navLinks: NavLink[] = [
  { href: "#experiences", label: "Experiences" },
  { href: "#categories", label: "Categories" },
  { href: "#planner", label: "AI Planner" },
  { href: "#hidden-gems", label: "Hidden Gems" },
  { href: "#guides", label: "Guides" },
];

export const footerSections: FooterSection[] = [
  {
    title: "Explore",
    links: [
      { href: "#experiences", label: "Experiences" },
      { href: "#hidden-gems", label: "Hidden Gems" },
      { href: "#lifestyle", label: "Luxury Lifestyle" },
      { href: "#categories", label: "Categories" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "#", label: "About Us" },
      { href: "#", label: "Partners" },
      { href: "#", label: "Careers" },
      { href: "#", label: "Press" },
    ],
  },
  {
    title: "Support",
    links: [
      { href: "#", label: "Contact" },
      { href: "#", label: "FAQ" },
      { href: "#", label: "Privacy Policy" },
      { href: "#", label: "Terms" },
    ],
  },
];
