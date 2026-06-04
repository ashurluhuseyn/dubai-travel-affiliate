import { buildAffiliateUrl } from "@/lib/affiliate";

import type { Experience } from "./types";

export const trendingExperiences: Experience[] = [
  {
    id: "desert-safari",
    title: "Private Desert Safari & Dinner",
    location: "Al Marmoom Reserve",
    image:
      "https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?w=800&q=80",
    imageAlt: "Sunset over desert dunes",
    category: "Adventure",
    rating: 4.9,
    reviews: 1240,
    price: "$320",
    href: "/experiences/desert-safari-dune-bashing",
    affiliateUrl: buildAffiliateUrl("desert-safari"),
  },
  {
    id: "burj-khalifa",
    title: "Burj Khalifa Sky Lounge Access",
    location: "Downtown Dubai",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80",
    imageAlt: "Burj Khalifa rising above Downtown Dubai",
    category: "Landmark",
    rating: 4.8,
    reviews: 2870,
    price: "$185",
    href: "/experiences/desert-safari-dune-bashing",
    affiliateUrl: buildAffiliateUrl("burj-khalifa"),
  },
  {
    id: "yacht-charter",
    title: "Luxury Marina Yacht Charter",
    location: "Dubai Marina",
    image:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
    imageAlt: "Luxury yacht on calm marina waters",
    category: "Cruise",
    rating: 5.0,
    reviews: 640,
    price: "$1,100",
    href: "/experiences/desert-safari-dune-bashing",
    affiliateUrl: buildAffiliateUrl("yacht-charter"),
  },
  {
    id: "helicopter",
    title: "Skyline Helicopter Tour",
    location: "Palm Jumeirah",
    image:
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80",
    imageAlt: "Helicopter flying over a coastal city",
    category: "Aerial",
    rating: 4.9,
    reviews: 410,
    price: "$540",
    href: "/experiences/desert-safari-dune-bashing",
    affiliateUrl: buildAffiliateUrl("helicopter"),
  },
  {
    id: "fine-dining",
    title: "Over-Water Fine Dining",
    location: "Jumeirah Al Naseem",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
    imageAlt: "Elegant dining table with ocean view",
    category: "Dining",
    rating: 4.7,
    reviews: 980,
    price: "$260",
    href: "/experiences/desert-safari-dune-bashing",
    affiliateUrl: buildAffiliateUrl("fine-dining"),
  },
  {
    id: "old-dubai",
    title: "Heritage Souk & Abra Tour",
    location: "Al Fahidi",
    image:
      "https://images.unsplash.com/photo-1526495124232-a04e1849168c?w=800&q=80",
    imageAlt: "Historic Al Fahidi district",
    category: "Culture",
    rating: 4.8,
    reviews: 1530,
    price: "$95",
    href: "/experiences/desert-safari-dune-bashing",
    affiliateUrl: buildAffiliateUrl("old-dubai"),
  },
];
