import {
  Building2,
  Camera,
  Compass,
  Moon,
  Sailboat,
  Ship,
  ShoppingBag,
  UtensilsCrossed,
} from "lucide-react";

import type { Category } from "./types";

export const categories: Category[] = [
  {
    id: "landmarks",
    label: "Landmarks",
    count: "48 places",
    icon: Building2,
    href: "#",
  },
  {
    id: "dining",
    label: "Fine Dining",
    count: "120 venues",
    icon: UtensilsCrossed,
    href: "#",
  },
  {
    id: "cruises",
    label: "Cruises",
    count: "32 charters",
    icon: Ship,
    href: "#",
  },
  {
    id: "adventure",
    label: "Adventure",
    count: "64 tours",
    icon: Compass,
    href: "#",
  },
  {
    id: "shopping",
    label: "Shopping",
    count: "85 spots",
    icon: ShoppingBag,
    href: "#",
  },
  {
    id: "nightlife",
    label: "Nightlife",
    count: "40 lounges",
    icon: Moon,
    href: "#",
  },
  {
    id: "photography",
    label: "Photo Spots",
    count: "57 locations",
    icon: Camera,
    href: "#",
  },
  {
    id: "beaches",
    label: "Beach Clubs",
    count: "28 clubs",
    icon: Sailboat,
    href: "#",
  },
];
