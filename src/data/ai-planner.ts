import type { ChatMessage, ItineraryDay } from "./types";

export const plannerChips: string[] = [
  "3-day luxury escape",
  "Desert + fine dining",
  "Romantic getaway",
  "Family friendly",
  "Adventure & yachts",
];

export const chatPreview: ChatMessage[] = [
  {
    id: "m1",
    role: "user",
    content: "Plan a 3-day luxury trip with desert and fine dining.",
  },
  {
    id: "m2",
    role: "assistant",
    content:
      "Done. I've put together a 3-day itinerary balancing desert adventure, iconic landmarks, and over-water dining. Here it is →",
  },
];

export const itinerary: ItineraryDay[] = [
  {
    id: "day-1",
    day: "Day 1",
    title: "Arrival & Golden Desert",
    items: [
      { label: "Private desert safari", time: "4:00 PM" },
      { label: "Bedouin dinner under the stars", time: "8:00 PM" },
    ],
  },
  {
    id: "day-2",
    day: "Day 2",
    title: "Iconic Skyline",
    items: [
      { label: "Burj Khalifa sky lounge access", time: "11:00 AM" },
      { label: "Over-water dining at Pierchic", time: "8:00 PM" },
    ],
  },
  {
    id: "day-3",
    day: "Day 3",
    title: "Sea & Heritage",
    items: [
      { label: "Marina yacht charter", time: "10:00 AM" },
      { label: "Al Fahidi heritage walk", time: "4:00 PM" },
    ],
  },
];
