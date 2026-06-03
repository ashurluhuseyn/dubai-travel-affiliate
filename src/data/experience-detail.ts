import type { ExperienceDetail } from "./types";

/**
 * Mock experience detail content keyed by slug.
 *
 * Kept as a record so a future API/CMS layer can swap the implementation of
 * `getExperienceDetail()` (see `queries.ts`) without touching call sites.
 */
export const experienceDetails: Record<string, ExperienceDetail> = {
  "desert-safari-dune-bashing": {
    slug: "desert-safari-dune-bashing",
    title: "Desert Safari & Dune Bashing",
    category: "Adventure",
    badge: "Bestseller",
    rating: 4.8,
    reviews: 2357,
    description:
      "Experience the thrill of dune bashing, camel riding, sandboarding and a traditional BBQ dinner under the stars in the Dubai desert.",
    meta: [
      { icon: "duration", label: "6 Hours" },
      { icon: "group", label: "Small Group" },
      { icon: "pickup", label: "Hotel Pickup" },
      { icon: "ticket", label: "Mobile Ticket" },
    ],
    price: "$79",
    priceUnit: "person",
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1451337516015-565b974c4936?w=1400&q=85&fit=crop",
        alt: "4x4 vehicle cresting golden desert dunes at sunset",
      },
      {
        src: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80&fit=crop",
        alt: "Dubai skyline glowing at dusk",
      },
      {
        src: "https://images.unsplash.com/photo-1476514525535-07fb3b4e5a1e?w=600&q=80&fit=crop",
        alt: "Aerial view of the coastline at golden hour",
      },
      {
        src: "https://images.unsplash.com/photo-1567894340315-ef73496d0d3f?w=600&q=80&fit=crop",
        alt: "Camp set up beside calm desert waters",
      },
      {
        src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80&fit=crop",
        alt: "Elegant BBQ dinner table set under the open sky",
      },
      {
        src: "https://images.unsplash.com/photo-1451337516015-565b974c4936?w=600&q=80&fit=crop&sat=-20",
        alt: "Rolling red sand dunes stretching to the horizon",
      },
    ],
    galleryExtraCount: 12,
    highlights: [
      "Thrilling 4x4 dune bashing across red sand dunes",
      "Camel ride and sandboarding experience",
      "Traditional Arabic welcome with coffee & dates",
      "BBQ dinner with live entertainment",
      "Stargazing in the desert",
    ],
    included: [
      { id: "pickup", icon: "pickup", label: "Hotel Pickup & Drop-off" },
      { id: "dinner", icon: "dinner", label: "BBQ Dinner" },
      { id: "shows", icon: "shows", label: "Live Shows" },
      { id: "camel", icon: "camel", label: "Camel Ride" },
      { id: "drinks", icon: "drinks", label: "Water & Soft Drinks" },
    ],
    itinerary: [
      { time: "2:30 PM", title: "Pickup from your hotel in Dubai" },
      { time: "3:00 PM", title: "Dune bashing adventure" },
      { time: "4:30 PM", title: "Camel ride & sandboarding" },
      { time: "6:00 PM", title: "BBQ dinner & live entertainment" },
      { time: "8:30 PM", title: "Drop-off at your hotel" },
    ],
    importantInfo: [
      "Free cancellation up to 24 hours before the experience",
      "Wear comfortable clothing and closed shoes",
      "Not recommended for pregnant women or guests with back problems",
      "Children under 3 years old are free",
    ],
    faqSections: [
      {
        id: "meeting",
        title: "Meeting & Pickup",
        content:
          "Complimentary hotel pickup is included from all hotels in central Dubai. Your driver will contact you 30 minutes before the scheduled pickup time.\nPickups outside the city center may incur a small surcharge — please add your pickup location at checkout.",
      },
      {
        id: "cancellation",
        title: "Cancellation Policy",
        content:
          "Free cancellation up to 24 hours before the start of the experience for a full refund.\nCancellations made less than 24 hours in advance are non-refundable. Changes are subject to availability.",
      },
      {
        id: "faq",
        title: "Frequently Asked Questions",
        content:
          "Is the experience suitable for children? Yes — families are welcome, and children under 3 join for free.\nWhat should I bring? Comfortable clothing, closed shoes, and a light jacket for the evening.\nIs vegetarian food available? Yes, vegetarian and vegan BBQ options are provided on request.",
      },
    ],
    related: [
      {
        id: "premium-desert-camp",
        title: "Premium Desert Camp Experience",
        image:
          "https://images.unsplash.com/photo-1451337516015-565b974c4936?w=600&q=80&fit=crop",
        imageAlt: "Luxury desert camp at golden hour",
        price: "$129",
        rating: 4.7,
        href: "/experiences/premium-desert-camp",
      },
      {
        id: "buggy-adventure",
        title: "Buggy Adventure in Dubai Desert",
        image:
          "https://images.unsplash.com/photo-1476514525535-07fb3b4e5a1e?w=600&q=80&fit=crop",
        imageAlt: "Off-road buggy speeding across dunes",
        price: "$169",
        rating: 4.8,
        href: "/experiences/buggy-adventure",
      },
      {
        id: "quad-biking",
        title: "Quad Biking Desert Adventure",
        image:
          "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80&fit=crop",
        imageAlt: "Quad bikes lined up on the sand",
        price: "$139",
        rating: 4.9,
        href: "/experiences/quad-biking",
      },
      {
        id: "hot-air-balloon",
        title: "Hot Air Balloon Experience",
        image:
          "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80&fit=crop",
        imageAlt: "Hot air balloons drifting over the desert at dawn",
        price: "$159",
        rating: 4.9,
        href: "/experiences/hot-air-balloon",
      },
    ],
  },
};
