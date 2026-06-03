import {
  Building2,
  Camera,
  Compass,
  Moon,
  Sailboat,
  Ship,
  ShoppingBag,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";

import type { IconKey } from "@/data";

/**
 * Maps serializable icon keys (owned by the data layer) to Lucide icon
 * components (owned by the UI layer). The `Record<IconKey, LucideIcon>` type
 * makes this mapping exhaustive — every key must resolve to a component.
 */
export const iconRegistry: Record<IconKey, LucideIcon> = {
  building: Building2,
  dining: UtensilsCrossed,
  cruise: Ship,
  adventure: Compass,
  shopping: ShoppingBag,
  nightlife: Moon,
  photo: Camera,
  beach: Sailboat,
};
