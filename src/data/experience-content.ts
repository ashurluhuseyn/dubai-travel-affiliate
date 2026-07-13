import type {
  DestinationExperience,
  ExperienceFaq,
  ExperienceImage,
  ExperienceItineraryItem,
} from "./types";

export type ExperienceContentSeed = {
  highlights: string[];
  includedItems: string[];
  itinerary: ExperienceItineraryItem[];
  importantInfo: string[];
  meetingPoint: string;
  cancellationPolicy: string;
  cancellationText: string;
  faqs: ExperienceFaq[];
  images: ExperienceImage[];
  galleryExtraCount: number;
  relatedSlugs: string[];
};

function buildImages(dest: DestinationExperience): ExperienceImage[] {
  const heroSrc = dest.image.replace("w=800", "w=1400").replace("q=80", "q=85");
  const base = dest.image.split("?")[0];
  return [
    { src: heroSrc, alt: dest.imageAlt },
    { src: `${base}?w=600&q=80&fit=crop`, alt: `${dest.title} — view 2` },
    { src: `${base}?w=600&q=80&fit=crop&sat=-10`, alt: `${dest.title} — view 3` },
    { src: `${base}?w=600&q=80&fit=crop&brightness=1.05`, alt: `${dest.title} — view 4` },
  ];
}

function cancellationText(dest: DestinationExperience): string {
  return dest.freeCancellation
    ? "Free cancellation up to 24 hours before the experience"
    : "This booking is non-refundable. See partner terms at checkout.";
}

function cancellationPolicy(dest: DestinationExperience): string {
  return dest.freeCancellation
    ? "Free cancellation up to 24 hours before the start time for a full refund. Cancellations made less than 24 hours in advance are non-refundable."
    : "This experience is non-refundable once confirmed. Changes are subject to availability and may incur fees.";
}

function meetingPoint(dest: DestinationExperience): string {
  if (dest.pickupIncluded) {
    return `Complimentary pickup from hotels in central Dubai. Your operator for ${dest.title} will confirm the exact pickup window after booking.`;
  }
  return `Meet at the main entrance for ${dest.title} in ${dest.location}. Arrive 15 minutes before your scheduled start time.`;
}

function defaultFaqs(dest: DestinationExperience): ExperienceFaq[] {
  return [
    {
      question: "Where is the meeting point?",
      answer: meetingPoint(dest),
    },
    {
      question: "What is the cancellation policy?",
      answer: cancellationPolicy(dest),
    },
    {
      question: `What should I know before booking ${dest.title}?`,
      answer: `${dest.description} Duration is ${dest.duration} with a ${dest.groupSize.toLowerCase()} format. ${dest.instantConfirmation ? "Instant confirmation is available on most dates." : "Confirmation may take up to 24 hours."}`,
    },
  ];
}

function pickRelatedSlugs(
  all: DestinationExperience[],
  currentId: string,
  limit = 4
): string[] {
  const current = all.find((exp) => exp.id === currentId);
  if (!current) return [];

  return all
    .filter((exp) => exp.id !== currentId)
    .sort((a, b) => {
      const aSameCategory = a.category === current.category ? 1 : 0;
      const bSameCategory = b.category === current.category ? 1 : 0;
      if (aSameCategory !== bSameCategory) return bSameCategory - aSameCategory;
      return b.rating - a.rating;
    })
    .slice(0, limit)
    .map((exp) => exp.id);
}

function adventureItinerary(dest: DestinationExperience): ExperienceItineraryItem[] {
  if (dest.id === "hot-air-balloon") {
    return [
      { time: "4:30 AM", title: "Hotel pickup", description: `Transfer from your hotel to the ${dest.location} launch site.` },
      { time: "5:30 AM", title: "Balloon flight", description: "Sunrise flight over the desert with panoramic views." },
      { time: "7:00 AM", title: "Falcon show & breakfast", description: "Traditional breakfast served after landing." },
      { time: "9:00 AM", title: "Return transfer", description: "Drop-off back at your Dubai hotel." },
    ];
  }
  if (dest.id === "quad-biking" || dest.id === "buggy-adventure") {
    return [
      { time: "2:00 PM", title: "Pickup & safety briefing", description: `Gear fitting before heading to ${dest.location}.` },
      { time: "2:45 PM", title: "Dune ride session", description: "Guided off-road ride across open desert terrain." },
      { time: "4:00 PM", title: "Refreshment break", description: "Water and rest stop with photo opportunities." },
      { time: "5:00 PM", title: "Return transfer", description: "Drop-off at your hotel." },
    ];
  }
  if (dest.id.includes("morning")) {
    return [
      { time: "6:30 AM", title: "Hotel pickup", description: "Early morning transfer to the desert." },
      { time: "7:15 AM", title: "Sunrise dune drive", description: "Scenic drive with photo stops as the desert wakes." },
      { time: "8:30 AM", title: "Light breakfast", description: "Arabic breakfast served at a desert camp." },
      { time: "10:00 AM", title: "Return to Dubai", description: "Drop-off at your hotel." },
    ];
  }
  return [
    { time: "2:30 PM", title: "Hotel pickup", description: `Collection from your hotel for ${dest.title}.` },
    { time: "3:15 PM", title: "Main activity", description: `Begin your ${dest.duration.toLowerCase()} adventure in ${dest.location}.` },
    { time: "5:30 PM", title: "Refreshments", description: "Break with drinks and photo opportunities." },
    { time: "8:30 PM", title: "Drop-off", description: "Return transfer to your hotel." },
  ];
}

function cruiseItinerary(dest: DestinationExperience): ExperienceItineraryItem[] {
  return [
    { time: "Boarding", title: "Marina check-in", description: `Meet your crew at ${dest.location} and board the vessel.` },
    { time: "Cruise", title: dest.title, description: `Enjoy a ${dest.duration.toLowerCase()} cruise with skyline views.` },
    { time: "Return", title: "Docking", description: "Experience ends at the departure marina." },
  ];
}

function diningItinerary(dest: DestinationExperience): ExperienceItineraryItem[] {
  return [
    { time: "Arrival", title: "Venue check-in", description: `Arrive at ${dest.location} and be seated for ${dest.title}.` },
    { time: "Service", title: "Dining experience", description: `Enjoy your ${dest.duration.toLowerCase()} curated menu.` },
    { time: "Departure", title: "End of experience", description: "Conclude at the restaurant." },
  ];
}

function sightseeingItinerary(dest: DestinationExperience): ExperienceItineraryItem[] {
  return [
    { time: "Start", title: "Check-in", description: `Arrive at ${dest.location} for ${dest.title}.` },
    { time: "Visit", title: "Main experience", description: `Explore at your own pace for ${dest.duration.toLowerCase()}.` },
    { time: "End", title: "Conclusion", description: "Experience ends at the venue." },
  ];
}

function buildItinerary(dest: DestinationExperience): ExperienceItineraryItem[] {
  switch (dest.category) {
    case "Adventure":
      return adventureItinerary(dest);
    case "Cruise":
      return cruiseItinerary(dest);
    case "Dining":
      return diningItinerary(dest);
    case "Nightlife":
      return [
        { time: "Evening", title: "Venue entry", description: `Arrive at ${dest.location} for ${dest.title}.` },
        { time: "Experience", title: "Main event", description: `Enjoy ${dest.duration.toLowerCase()} of nightlife entertainment.` },
        { time: "Close", title: "End of night", description: "Experience concludes at the venue." },
      ];
    default:
      return sightseeingItinerary(dest);
  }
}

function buildIncludedItems(dest: DestinationExperience): string[] {
  const items: string[] = ["Professional host or guide"];
  if (dest.pickupIncluded) items.push("Hotel pickup & drop-off");
  if (dest.category === "Dining") items.push("Set menu or dining experience");
  if (dest.category === "Cruise") items.push("Cruise / charter access");
  if (dest.category === "Adventure") items.push("Safety equipment");
  items.push("Customer support");
  if (dest.instantConfirmation) items.push("Instant confirmation");
  return items;
}

function buildHighlights(dest: DestinationExperience): string[] {
  const lines = [
    `${dest.title} in ${dest.location}`,
    dest.description.split(".")[0],
    `Rated ${dest.rating} stars from ${dest.reviews.toLocaleString()} reviews`,
    `${dest.duration} · ${dest.groupSize}`,
  ];
  if (dest.pickupIncluded) lines.push("Hotel pickup included");
  if (dest.instantConfirmation) lines.push("Instant confirmation available");
  return lines.slice(0, 5);
}

function buildImportantInfo(dest: DestinationExperience): string[] {
  const info = [
    cancellationText(dest),
    "Please arrive 15 minutes before the scheduled start time",
    "Bring a valid photo ID and your mobile ticket",
    "Children must be accompanied by an adult",
  ];
  if (dest.category === "Adventure") {
    info.push("Wear comfortable clothing and closed-toe shoes");
  }
  if (dest.category === "Dining") {
    info.push("Smart casual dress code may apply");
  }
  return info;
}

/** Generates unique content for a destination listing experience. */
export function generateExperienceContent(
  dest: DestinationExperience,
  all: DestinationExperience[]
): ExperienceContentSeed {
  return {
    highlights: buildHighlights(dest),
    includedItems: buildIncludedItems(dest),
    itinerary: buildItinerary(dest),
    importantInfo: buildImportantInfo(dest),
    meetingPoint: meetingPoint(dest),
    cancellationPolicy: cancellationPolicy(dest),
    cancellationText: cancellationText(dest),
    faqs: defaultFaqs(dest),
    images: buildImages(dest),
    galleryExtraCount: 8,
    relatedSlugs: pickRelatedSlugs(all, dest.id),
  };
}

/** Rich curated content for the flagship desert safari experience. */
export const DESERT_SAFARI_CONTENT: ExperienceContentSeed = {
  highlights: [
    "Thrilling 4x4 dune bashing across red sand dunes",
    "Camel ride and sandboarding experience",
    "Traditional Arabic welcome with coffee & dates",
    "BBQ dinner with live entertainment",
    "Stargazing in the desert",
  ],
  includedItems: [
    "Hotel Pickup & Drop-off",
    "BBQ Dinner",
    "Live Shows",
    "Camel Ride",
    "Water & Soft Drinks",
  ],
  itinerary: [
    { time: "2:30 PM", title: "Pickup from your hotel in Dubai", description: "Your driver will collect you from your hotel lobby." },
    { time: "3:00 PM", title: "Dune bashing adventure", description: "4x4 ride across the red dunes with photo stops." },
    { time: "4:30 PM", title: "Camel ride & sandboarding", description: "Try sandboarding and a short camel ride at camp." },
    { time: "6:00 PM", title: "BBQ dinner & live entertainment", description: "Buffet dinner with Tanoura and fire shows." },
    { time: "8:30 PM", title: "Drop-off at your hotel", description: "Return transfer to your Dubai hotel." },
  ],
  importantInfo: [
    "Free cancellation up to 24 hours before the experience",
    "Wear comfortable clothing and closed shoes",
    "Not recommended for pregnant women or guests with back problems",
    "Children under 3 years old are free",
  ],
  meetingPoint:
    "Complimentary hotel pickup is included from all hotels in central Dubai. Your driver will contact you 30 minutes before the scheduled pickup time.",
  cancellationPolicy:
    "Free cancellation up to 24 hours before the start of the experience for a full refund. Cancellations made less than 24 hours in advance are non-refundable.",
  cancellationText: "Free cancellation up to 24 hours before the experience",
  faqs: [
    {
      question: "Meeting & Pickup",
      answer:
        "Complimentary hotel pickup is included from all hotels in central Dubai. Your driver will contact you 30 minutes before the scheduled pickup time. Pickups outside the city center may incur a small surcharge.",
    },
    {
      question: "Cancellation Policy",
      answer:
        "Free cancellation up to 24 hours before the start of the experience for a full refund. Cancellations made less than 24 hours in advance are non-refundable.",
    },
    {
      question: "Is this suitable for children?",
      answer:
        "Yes — families are welcome, and children under 3 join for free. Vegetarian and vegan BBQ options are available on request.",
    },
  ],
  images: [
    {
      src: "https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?w=1400&q=85&fit=crop",
      alt: "4x4 vehicle cresting golden desert dunes at sunset",
    },
    {
      src: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80&fit=crop",
      alt: "Dubai skyline glowing at dusk",
    },
    {
      src: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&q=80&fit=crop",
      alt: "Aerial view of the coastline at golden hour",
    },
    {
      src: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80&fit=crop",
      alt: "Camp set up beside calm desert waters",
    },
  ],
  galleryExtraCount: 12,
  relatedSlugs: [
    "premium-desert-camp",
    "buggy-adventure",
    "quad-biking",
    "hot-air-balloon",
  ],
};
