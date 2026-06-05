import { hiddenGemSpots, hiddenGems } from "./hidden-gems";
import type { HiddenGem, HiddenGemDetail, HiddenGemSpot } from "./types";

type GemSeed = {
  slug: string;
  title: string;
  location: string;
  description: string;
  image: string;
  imageAlt: string;
  badge: string;
  price: string;
  tags: string[];
  highlights: string[];
  bestTimeToVisit: string;
  howToGetThere: string;
  whatToBring: string;
  content: string[];
};

const DEFAULT_WHAT_TO_BRING =
  "Comfortable walking shoes, a camera, sun protection, and a bottle of water.";

function spotToSeed(spot: HiddenGemSpot): GemSeed {
  const extra = GEM_CONTENT[spot.id];
  return {
    slug: spot.id,
    title: spot.title,
    location: spot.location,
    description: spot.description,
    image: spot.image,
    imageAlt: spot.imageAlt,
    badge: spot.badge,
    price: spot.price,
    tags: extra?.tags ?? [spot.badge],
    highlights: extra?.highlights ?? [
      `Explore ${spot.title} in ${spot.location}`,
      spot.description,
      spot.price === "Free" ? "No entry fee required" : `Typical cost: ${spot.price}`,
    ],
    bestTimeToVisit:
      extra?.bestTimeToVisit ??
      "Early morning or late afternoon for softer light and fewer crowds.",
    howToGetThere:
      extra?.howToGetThere ??
      `Head to ${spot.location} by taxi, ride-hailing app, or Dubai Metro with a short walk or transfer.`,
    whatToBring: extra?.whatToBring ?? DEFAULT_WHAT_TO_BRING,
    content:
      extra?.content ??
      defaultContent(spot.title, spot.location, spot.description),
  };
}

function homeGemToSeed(gem: HiddenGem): GemSeed {
  const extra = GEM_CONTENT[gem.id];
  const description =
    extra?.description ??
    `Discover ${gem.title}, a local favorite in ${gem.location} that most travellers overlook.`;
  return {
    slug: gem.id,
    title: gem.title,
    location: gem.location,
    description,
    image: gem.image,
    imageAlt: gem.imageAlt,
    badge: extra?.badge ?? "Hidden Gem",
    price: extra?.price ?? "Free",
    tags: extra?.tags ?? ["Hidden Gem", gem.location],
    highlights: extra?.highlights ?? [
      `Uncover ${gem.title} in ${gem.location}`,
      description,
      "A quieter alternative to Dubai's headline attractions",
    ],
    bestTimeToVisit:
      extra?.bestTimeToVisit ??
      "Visit at sunrise or sunset for the best atmosphere and photography light.",
    howToGetThere:
      extra?.howToGetThere ??
      `Located in ${gem.location}. Reachable by taxi, Metro, or ride-hailing from central Dubai.`,
    whatToBring: extra?.whatToBring ?? DEFAULT_WHAT_TO_BRING,
    content: extra?.content ?? defaultContent(gem.title, gem.location, description),
  };
}

function defaultContent(
  title: string,
  location: string,
  description: string
): string[] {
  return [
    `${title} is one of Dubai's best-kept secrets in ${location}. ${description}`,
    "Unlike the city's busiest landmarks, this spot rewards travellers who slow down and explore at their own pace. Allow at least an hour to soak in the atmosphere, take photos, and discover nearby cafés or walking routes.",
    "Pair your visit with a neighbourhood stroll or a nearby experience to build a full day around this hidden gem. Weekday mornings tend to be quieter, while golden hour is ideal for photography.",
  ];
}

type GemContentOverride = Partial<
  Omit<GemSeed, "slug" | "title" | "location" | "image" | "imageAlt">
>;

const GEM_CONTENT: Record<string, GemContentOverride> = {
  "al-fahidi": {
    tags: ["Culture", "History", "Photography"],
    highlights: [
      "Wind-tower architecture and narrow alleyways",
      "Art galleries, museums, and heritage cafés",
      "Steps from Dubai Creek and abra crossings",
    ],
    bestTimeToVisit:
      "Weekday mornings before 11am, or late afternoon when courtyard cafés open.",
    howToGetThere:
      "Take the Metro to Al Fahidi station, then walk five minutes through the heritage district.",
    content: [
      "Al Fahidi Historical District preserves the soul of old Dubai. Sandstone lanes, restored wind towers, and courtyard galleries offer a striking contrast to the glass skyline nearby.",
      "Start at the Dubai Museum area and wander toward XVA Gallery and the Coffee Museum. Small independent cafés serve Arabic coffee and dates in shaded courtyards perfect for a mid-morning break.",
      "Photographers will love the textured walls, wooden doors, and soft morning light filtering through the alleys. Combine your visit with a creek abra ride to Deira for a full heritage day.",
    ],
  },
  "al-sufouh-beach": {
    tags: ["Beach", "Sunset", "Photography"],
    highlights: [
      "Unobstructed Burj Al Arab views",
      "Quiet shoreline away from resort crowds",
      "Ideal sunset photography spot",
    ],
    bestTimeToVisit: "One hour before sunset for golden light and calmer waters.",
    howToGetThere:
      "Drive or taxi to Al Sufouh Road; limited public parking — arrive early on weekends.",
    content: [
      "Al Sufouh Secret Beach is a local favourite for unobstructed views of the Burj Al Arab without the resort price tag. The shoreline is quieter than JBR or Kite Beach, especially on weekdays.",
      "Bring a towel and arrive before sunset to claim a spot along the sand. The warm evening light makes this one of Dubai's most photogenic coastal locations.",
      "There are few facilities nearby, so pack water and snacks. Combine with a coastal drive along King Salman bin Abdulaziz Al Saud Street for a relaxed evening itinerary.",
    ],
  },
  "alserkal-avenue": {
    tags: ["Art", "Culture", "Cafés"],
    highlights: [
      "Contemporary galleries and design studios",
      "Warehouse district creative energy",
      "Weekend markets and pop-up events",
    ],
    howToGetThere:
      "Taxi or ride-hailing to Alserkal Avenue, Al Quoz. Limited Metro access — plan a car transfer.",
    content: [
      "Alserkal Avenue transformed Al Quoz warehouses into Dubai's leading contemporary arts hub. Rotating exhibitions, independent cinemas, and design studios make every visit different.",
      "Spend an afternoon gallery-hopping, then settle into a specialty café for coffee and conversation. The district comes alive on weekends with markets and creative workshops.",
      "Check the venue calendar before you go — openings and performances often run Thursday through Saturday evenings.",
    ],
  },
  "ras-al-khor": {
    tags: ["Nature", "Wildlife", "Photography"],
    highlights: [
      "Thousands of pink flamingos in winter",
      "Free viewing hides along the lagoon",
      "Dubai skyline backdrop",
    ],
    bestTimeToVisit:
      "Winter mornings (November–March) when flamingo numbers peak and temperatures are mild.",
    howToGetThere:
      "Drive to Ras Al Khor Wildlife Sanctuary hides off Ras Al Khor Road; free parking at viewing platforms.",
    content: [
      "Ras Al Khor Wildlife Sanctuary is a surprising pocket of wilderness minutes from downtown Dubai. Flamingos gather in the lagoon against a backdrop of skyscrapers — a scene you won't find anywhere else.",
      "Three hides offer sheltered viewing platforms with binocular-friendly sightlines. Entry is free; bring a telephoto lens if you want close-up wildlife shots.",
      "Respect sanctuary rules: keep noise low, stay on marked paths, and avoid feeding wildlife. Pair with a creek-side lunch in nearby Deira.",
    ],
  },
  "nightjar-coffee": {
    tags: ["Café", "Specialty Coffee", "Al Quoz"],
    price: "From $5",
    highlights: [
      "Single-origin roasts and pour-overs",
      "Industrial-chic warehouse setting",
      "Popular with creatives and remote workers",
    ],
    bestTimeToVisit: "Weekday mornings for a quieter seat and fresher pastry selection.",
    content: [
      "Nightjar Coffee Roasters is a cult favourite among Dubai's specialty coffee scene. The industrial Al Quoz space pairs exposed brick with serious single-origin roasting.",
      "Order a pour-over or flat white and take a seat at the communal tables — this is a place to slow down, not rush through. Beans are roasted on-site and sold to take home.",
      "Combine with a visit to nearby Alserkal Avenue galleries for a perfect culture-and-coffee afternoon.",
    ],
  },
  "dubai-creek-abra": {
    tags: ["Experience", "Heritage", "Budget"],
    price: "From $1",
    highlights: [
      "Traditional wooden abra boats",
      "Cross the creek for a few dirhams",
      "Connects Deira and Bur Dubai",
    ],
    bestTimeToVisit: "Late afternoon for softer light; evening rides show the creek lit up.",
    content: [
      "The Dubai Creek abra is one of the city's oldest and cheapest experiences. Wooden boats shuttle passengers across the historic waterway for just a few dirhams — no booking required.",
      "Board at Deira Old Souk or Bur Dubai abra stations and enjoy a five-minute crossing with breeze and skyline views. Abras run continuously from early morning until late evening.",
      "Use the ride to link Al Fahidi, the Gold Souk, and Spice Souk into a single walking day. Carry small cash notes for the fare.",
    ],
  },
  "green-planet": {
    tags: ["Nature", "Family", "Indoor"],
    price: "From $25",
    highlights: [
      "Indoor tropical rainforest biodome",
      "Exotic birds, sloths, and reptiles",
      "Climate-controlled year-round visit",
    ],
    howToGetThere:
      "Located at City Walk — taxi, ride-hailing, or bus. Paid parking available on-site.",
    content: [
      "The Green Planet brings a tropical rainforest to the heart of Dubai. A towering biodome wraps around a living ecosystem of plants, birds, and small mammals.",
      "Walk the spiral canopy walkway for treetop views, then descend to the forest floor for close encounters with sloths and colourful parrots. Ideal for families on hot summer days.",
      "Book tickets online for faster entry. Allow 90 minutes to explore every level at a relaxed pace.",
    ],
  },
  "hatta-heritage": {
    tags: ["Heritage", "Mountains", "Day Trip"],
    highlights: [
      "Restored mountain village",
      "Emirati culture and rugged scenery",
      "Combine with Hatta Dam and hiking",
    ],
    bestTimeToVisit: "October through April when mountain temperatures are comfortable.",
    howToGetThere:
      "Drive 90 minutes from Dubai via the E44 highway. Rental car or organised tour recommended.",
    content: [
      "Hatta Heritage Village sits in the Hajar mountains, offering a glimpse of traditional Emirati life before the skyscraper era. Restored stone houses, falaj irrigation, and mountain views make this a rewarding day trip.",
      "Explore the village museum displays, then drive on to Hatta Dam for kayaking and hiking trails. Weekends can be busy — leave early for the best experience.",
      "Pack layers: mountain air is cooler than the city. Sun protection and sturdy shoes are essential for walking the rocky paths.",
    ],
  },
  creek: {
    badge: "Waterfront",
    tags: ["Waterfront", "Sunrise", "Photography"],
    description:
      "Watch Dubai Creek come alive at dawn as abras cross the water and the old city glows in soft morning light.",
    highlights: [
      "Golden-hour waterfront photography",
      "Traditional abras and fishing boats",
      "Authentic Deira atmosphere",
    ],
    content: [
      "Dubai Creek at dawn is when the city feels most timeless. Fishing boats unload their catch, abras begin their crossings, and the Deira waterfront glows in warm morning light.",
      "Arrive before 7am for the quietest atmosphere and best photography angles along the promenade. The contrast between old dhows and distant skyscrapers is unforgettable.",
      "End your morning with Arabic breakfast at a creek-side café before the crowds arrive.",
    ],
  },
  opera: {
    badge: "Nightlife",
    tags: ["Architecture", "Downtown", "Evening"],
    description:
      "Stroll the Dubai Opera gardens at night for illuminated architecture and Downtown skyline views.",
    highlights: [
      "Dubai Opera exterior and gardens",
      "Downtown skyline night views",
      "Free to explore the surrounding district",
    ],
    content: [
      "The Dubai Opera Garden district shines after dark. Even without a show ticket, the illuminated opera house and surrounding boulevards offer a sophisticated evening stroll.",
      "Walk from the Opera through the Souk Al Bahar bridge toward the Dubai Fountain for a full Downtown evening. The area is especially atmospheric during the cooler months.",
      "Dress smart-casual if you plan to dine at nearby restaurants — this is one of Downtown's most polished neighbourhoods.",
    ],
  },
  alserkal: {
    badge: "Art",
    tags: ["Art", "Al Quoz", "Culture"],
    description:
      "Explore warehouse galleries and creative studios in Dubai's most dynamic arts district.",
    highlights: [
      "Gallery openings and studio visits",
      "Warehouse district atmosphere",
      "Walking distance to specialty cafés",
    ],
    content: [
      "Alserkal Art District is the entry point to Dubai's warehouse arts scene. Smaller galleries and creative studios cluster around the avenue, each with its own curatorial voice.",
      "Pick two or three galleries based on current exhibitions, then wander the industrial lanes between them. The district rewards curious travellers who peek into open studio doors.",
      "Plan around gallery opening nights — usually Thursday evenings — for the most vibrant atmosphere.",
    ],
  },
  frame: {
    badge: "Landmark",
    tags: ["Landmark", "Views", "Zabeel Park"],
    price: "From $15",
    description:
      "Step inside the Dubai Frame for panoramic views of old and new Dubai from Zabeel Park.",
    highlights: [
      "Iconic golden frame architecture",
      "Old Dubai and skyline panoramas",
      "Located inside Zabeel Park",
    ],
    content: [
      "The Dubai Frame is one of the city's most distinctive landmarks — a 150-metre golden structure straddling Zabeel Park with views of both historic and modern Dubai.",
      "The elevator ride to the glass bridge offers sweeping panoramas. The museum level tells the story of Dubai's transformation from fishing village to global city.",
      "Buy tickets online to skip queues. Combine with a picnic in Zabeel Park for a relaxed half-day outing.",
    ],
  },
  madinat: {
    badge: "Waterfront",
    tags: ["Waterfront", "Jumeirah", "Dining"],
    description:
      "Wander the Madinat Jumeirah waterways, abra rides, and lantern-lit souk arcades.",
    highlights: [
      "Traditional waterway abras",
      "Burj Al Arab views from the marina",
      "Lantern-lit dining arcades",
    ],
    content: [
      "Madinat Jumeirah's waterways recreate old Arabia with modern polish. Abra boats ferry visitors along canals lined with restaurants, boutiques, and Burj Al Arab views.",
      "An evening visit is magical — lanterns reflect on the water and the souk arcades buzz with dinner reservations. Ride the abra before settling into a waterfront table.",
      "No entry fee for the district itself; budget for dining or a casual café stop along the water.",
    ],
  },
  "miracle-garden": {
    badge: "Nature",
    tags: ["Nature", "Seasonal", "Family"],
    price: "From $15",
    description:
      "Walk through millions of flowers arranged in spectacular displays at Dubai Miracle Garden.",
    highlights: [
      "Seasonal floral installations",
      "Instagram-worthy themed displays",
      "Family-friendly outdoor space",
    ],
    bestTimeToVisit:
      "November through May when the garden is open and flowers are in full bloom.",
    content: [
      "Dubai Miracle Garden is the world's largest natural flower garden, reopening each cool season with new floral sculptures and themed walkways.",
      "Allow two to three hours to explore the full site — displays range from heart-shaped arches to full-size houses covered in blooms. Weekday mornings are least crowded.",
      "Pair with nearby Dubai Butterfly Garden for a full Dubailand nature morning. Bring sun protection and comfortable shoes.",
    ],
  },
};

function seedToDetail(seed: GemSeed): HiddenGemDetail {
  return {
    slug: seed.slug,
    title: seed.title,
    location: seed.location,
    description: seed.description,
    image: seed.image,
    imageAlt: seed.imageAlt,
    badge: seed.badge,
    price: seed.price,
    tags: seed.tags,
    highlights: seed.highlights,
    bestTimeToVisit: seed.bestTimeToVisit,
    howToGetThere: seed.howToGetThere,
    whatToBring: seed.whatToBring,
    content: seed.content,
  };
}

const allSeeds: GemSeed[] = [
  ...hiddenGemSpots.map(spotToSeed),
  ...hiddenGems.map(homeGemToSeed),
];

export const hiddenGemDetails: Record<string, HiddenGemDetail> =
  Object.fromEntries(
    allSeeds.map((seed) => [seed.slug, seedToDetail(seed)])
  );

export function getHiddenGemBySlug(slug: string): HiddenGemDetail | null {
  return hiddenGemDetails[slug] ?? null;
}

export function getAllHiddenGemSlugs(): string[] {
  return Object.keys(hiddenGemDetails);
}
