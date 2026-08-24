import { siteConfig } from "@/lib/site";

import type { ContactMethod, FaqSection } from "./types";

export const contactMethods: ContactMethod[] = [
  {
    id: "email",
    icon: "email",
    title: "Email Us",
    description: "For content corrections, source suggestions, and partnership enquiries.",
    actionLabel: siteConfig.contactEmail,
    href: `mailto:${siteConfig.contactEmail}`,
  },
  {
    id: "location",
    icon: "location",
    title: "Our Location",
    description: "Dubai, United Arab Emirates",
    actionLabel: "About Caspaya",
    href: "/about",
  },
];

/** Short preview of the most common questions, shown on the contact page. */
export const contactFaqs: FaqSection[] = [
  {
    id: "booking-conditions",
    title: "What are your booking conditions?",
    content:
      "Most experiences can be booked instantly with free cancellation up to 24 hours before the start time. Specific conditions are shown on each experience page before you confirm.",
  },
  {
    id: "confirmation",
    title: "How do I receive my booking confirmation?",
    content:
      "You'll receive an instant confirmation by email with a mobile ticket. No printing required — just show your ticket on arrival.",
  },
  {
    id: "customize",
    title: "Can I customize my Dubai experience?",
    content:
      "Absolutely. Our concierge team can tailor any itinerary to your dates, group size, and preferences. Just reach out and we'll craft something unique.",
  },
  {
    id: "group-private",
    title: "Do you offer group or private experiences?",
    content:
      "Yes — many experiences are available as private bookings, and we offer dedicated packages for families, corporate groups, and special occasions.",
  },
];
