import type { BlogDetail } from "./types";
import { blogPosts, featuredPost } from "./blog";

function createBlogDetail(
  post: (typeof featuredPost),
  content: string[]
): BlogDetail {
  return {
    ...post,
    slug: post.id,
    href: `/blog/${post.id}`,
    content,
  };
}

const defaultParagraphs = (title: string): string[] => [
  `Planning a trip to Dubai? ${title} is one of the most searched topics among travellers heading to the Emirates — and for good reason. The city blends iconic landmarks, desert adventures, and world-class dining into a single unforgettable destination.`,
  "In this guide we cover practical tips, the best times to visit, how to book experiences, and insider advice from local experts. Whether you are visiting for a long weekend or a full week, these recommendations will help you make the most of every moment.",
  "Dubai rewards travellers who plan ahead. Book popular experiences early, allow buffer time between activities, and mix headline attractions with quieter neighbourhood discoveries for a richer trip.",
];

export const blogDetails: Record<string, BlogDetail> = {
  [featuredPost.id]: createBlogDetail(featuredPost, [
    "Dubai has evolved from a desert trading port into one of the world's most dynamic cities. Before you pack your bags, understanding visa requirements, local customs, and the best seasons to visit will set you up for a seamless trip.",
    "Most visitors receive a visa on arrival, but requirements vary by nationality. Check official UAE immigration guidance before departure and ensure your passport is valid for at least six months beyond your travel dates.",
    "The cooler months from November to March offer the most comfortable weather for outdoor sightseeing. Summer brings intense heat but also lower hotel rates — plan indoor attractions and evening activities if you travel then.",
    "Getting around is straightforward: the Metro connects major districts, taxis are plentiful, and ride-hailing apps work across the city. For desert safaris and marina cruises, most operators include hotel pickup.",
    "Finally, dress modestly in cultural areas, respect prayer times, and tip service staff where appropriate. Dubai is welcoming to international visitors — a little cultural awareness goes a long way.",
  ]),
  "best-things-to-do-2024": createBlogDetail(
    blogPosts.find((post) => post.id === "best-things-to-do-2024")!,
    defaultParagraphs("the best things to do in Dubai")
  ),
  "dubai-5-day-itinerary": createBlogDetail(
    blogPosts.find((post) => post.id === "dubai-5-day-itinerary")!,
    [
      "Five days in Dubai is the sweet spot for first-time visitors. This itinerary balances iconic sights, desert adventure, waterfront dining, and a touch of old-town culture without feeling rushed.",
      "Day one: arrive, check in, and take an evening stroll through Dubai Marina or Downtown. Day two: Burj Khalifa, Dubai Mall, and an Old Dubai heritage walk. Day three: morning desert safari with an evening BBQ under the stars.",
      "Day four: yacht cruise or beach club relaxation along the coast. Day five: last-minute shopping at Dubai Mall or Gold Souk before departure. Adjust pacing based on your hotel location and travel style.",
      "Book headline experiences in advance — desert safaris, observation decks, and marina cruises sell out quickly during peak season. Leave one flexible afternoon for spontaneous discoveries.",
    ]
  ),
  "hidden-gems-dubai": createBlogDetail(
    blogPosts.find((post) => post.id === "hidden-gems-dubai")!,
    defaultParagraphs("Dubai's hidden gems")
  ),
  "best-rooftop-restaurants": createBlogDetail(
    blogPosts.find((post) => post.id === "best-rooftop-restaurants")!,
    defaultParagraphs("Dubai's rooftop restaurants")
  ),
  "desert-safari-guide": createBlogDetail(
    blogPosts.find((post) => post.id === "desert-safari-guide")!,
    [
      "A desert safari is the quintessential Dubai experience. From adrenaline-pumping dune bashing to tranquil camel rides and starlit BBQ dinners, there is an option for every traveller.",
      "Morning safaris suit families and photographers who want softer light. Evening safaris combine dune adventures with live entertainment and a traditional camp dinner — the most popular choice.",
      "Look for operators with strong safety records, licensed vehicles, and clear pickup policies. Premium camps offer smaller groups and upgraded dining; budget options still deliver the core desert thrill.",
      "Wear comfortable clothing, closed shoes, and bring a light jacket for the evening. Sand gets everywhere — leave valuables at your hotel when possible.",
    ]
  ),
  "luxury-dubai-experiences": createBlogDetail(
    blogPosts.find((post) => post.id === "luxury-dubai-experiences")!,
    defaultParagraphs("luxury experiences in Dubai")
  ),
  "visit-burj-khalifa": {
    id: "visit-burj-khalifa",
    slug: "visit-burj-khalifa",
    title: "How to Visit Burj Khalifa: Tickets, Timings & Tips",
    excerpt:
      "Everything you need to know before visiting the world's tallest building — ticket tiers, best times, and photography tips.",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80",
    imageAlt: "Burj Khalifa rising above Downtown Dubai",
    category: "Guides",
    readTime: "5 min read",
    date: "May 10, 2024",
    href: "/blog/visit-burj-khalifa",
    content: defaultParagraphs("visiting the Burj Khalifa"),
  },
  "best-desert-safari-deals": {
    id: "best-desert-safari-deals",
    slug: "best-desert-safari-deals",
    title: "Best Desert Safari Deals in Dubai",
    excerpt:
      "Compare safari packages, pricing tiers, and what to look for when booking your desert adventure.",
    image:
      "https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?w=800&q=80",
    imageAlt: "Desert dunes at golden hour",
    category: "Guides",
    readTime: "5 min read",
    date: "May 8, 2024",
    href: "/blog/best-desert-safari-deals",
    content: defaultParagraphs("desert safari deals in Dubai"),
  },
  "dhow-cruise-guide": {
    id: "dhow-cruise-guide",
    slug: "dhow-cruise-guide",
    title: "Dhow Cruise Dubai: A Complete Guide",
    excerpt:
      "Traditional dhow cruises along Dubai Creek and Marina — routes, dining options, and booking advice.",
    image:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
    imageAlt: "Traditional dhow boat on the water",
    category: "Guides",
    readTime: "5 min read",
    date: "May 5, 2024",
    href: "/blog/dhow-cruise-guide",
    content: defaultParagraphs("dhow cruises in Dubai"),
  },
  "palm-jumeirah-guide": {
    id: "palm-jumeirah-guide",
    slug: "palm-jumeirah-guide",
    title: "Palm Jumeirah Guide: Hotels, Attractions & More",
    excerpt:
      "Explore the Palm's hotels, beach clubs, and iconic attractions on Dubai's famous man-made island.",
    image:
      "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=800&q=80",
    imageAlt: "Aerial view of Palm Jumeirah",
    category: "Guides",
    readTime: "6 min read",
    date: "May 3, 2024",
    href: "/blog/palm-jumeirah-guide",
    content: defaultParagraphs("Palm Jumeirah"),
  },
  "shopping-in-dubai": {
    id: "shopping-in-dubai",
    slug: "shopping-in-dubai",
    title: "Shopping in Dubai: Best Places and Tips",
    excerpt:
      "From mega malls to traditional souks — where to shop and how to find the best deals in Dubai.",
    image:
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&q=80",
    imageAlt: "Luxury shopping mall interior",
    category: "Shopping",
    readTime: "5 min read",
    date: "May 1, 2024",
    href: "/blog/shopping-in-dubai",
    content: defaultParagraphs("shopping in Dubai"),
  },
};
