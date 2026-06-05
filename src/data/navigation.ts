import type { FooterSection, NavLink } from "./types";

export const navLinks: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/destinations", label: "Tours" },
  { href: "/categories", label: "Categories" },
  { href: "/blog", label: "Blog" },
  { href: "/hidden-gems", label: "Hidden Gems" },
  { href: "/luxury", label: "Luxury" },
];

export const footerSections: FooterSection[] = [
  {
    title: "Explore",
    links: [
      { href: "/destinations", label: "Tours" },
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
      { href: "#", label: "FAQ" },
      { href: "/contact", label: "Contact Us" },
      { href: "#", label: "Privacy Policy" },
    ],
  },
  {
    title: "Support",
    links: [
      { href: "#", label: "Help Center" },
      { href: "#", label: "Booking Guide" },
      { href: "#", label: "Terms & Conditions" },
      { href: "#", label: "Cancellation Policy" },
    ],
  },
];
