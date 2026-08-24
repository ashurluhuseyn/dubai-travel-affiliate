import type { BlogDetail } from "./types";
import { blogHref, blogPosts, featuredPost } from "./blog";
import { latestGuides } from "./guides";

type LegacyBlogDetail = Omit<
  BlogDetail,
  | "status"
  | "noindex"
  | "seoTitle"
  | "metaDescription"
  | "publishedAt"
  | "updatedAt"
  | "sections"
  | "faqs"
  | "sources"
  | "internalLinks"
  | "relatedArticleSlugs"
>;

function createBlogDetail(
  post: (typeof featuredPost),
  content: string[]
): LegacyBlogDetail {
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

const legacyBlogDetails: Record<string, LegacyBlogDetail> = {
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
  ...Object.fromEntries(
    latestGuides.map((guide) => [
      guide.id,
      {
        ...guide,
        slug: guide.id,
        href: blogHref(guide.id),
        content: defaultParagraphs(guide.title),
      } satisfies LegacyBlogDetail,
    ])
  ),
};

/**
 * Existing short articles are intentionally retained as crawlable drafts so
 * search engines can see `noindex`. New, researched articles should use the
 * structured fields below and only move to `published` when complete.
 */
const placeholderBlogDetails: Record<string, BlogDetail> = Object.fromEntries(
  Object.entries(legacyBlogDetails).map(([slug, article]) => [
    slug,
    {
      ...article,
      status: "draft",
      noindex: true,
      seoTitle: article.title,
      metaDescription: article.excerpt,
      sections: [],
      faqs: [],
      sources: [],
      internalLinks: [],
      relatedArticleSlugs: [],
    } satisfies BlogDetail,
  ])
);

/**
 * Add new, manually researched articles here. Keep `status: "draft"` and
 * `noindex: true` until every required field and source has been reviewed.
 */
const researchedBlogDetails: Record<string, BlogDetail> = {
  "dubai-in-48-hours": {
    id: "dubai-in-48-hours",
    slug: "dubai-in-48-hours",
    title: "Dubai in 48 Hours: A Practical Two-Day Itinerary",
    seoTitle: "Dubai in 48 Hours: A Practical Two-Day Itinerary",
    metaDescription:
      "Plan 48 hours in Dubai with a realistic route through Old Dubai, Downtown, the coast and desert, plus transport and booking tips.",
    excerpt:
      "A realistic first-time route through Old Dubai, Downtown, the coast and desert — without spending the whole trip in traffic.",
    image:
      "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1200&q=85",
    imageAlt: "Dubai coastline and skyline seen in warm evening light",
    category: "Itineraries",
    readTime: "11 min read",
    date: "August 24, 2026",
    publishedAt: "2026-08-24T00:00:00.000Z",
    updatedAt: "2026-08-24T00:00:00.000Z",
    href: "/blog/dubai-in-48-hours",
    status: "published",
    noindex: false,
    author: {
      name: "Caspaya Editorial Team",
      initials: "CE",
      entityType: "Organization",
      bio: "Caspaya researches practical Dubai travel information using current official sources.",
      url: "https://caspaya.com/about",
    },
    sections: [
      {
        id: "before-you-start",
        heading: "Before you start: make 48 hours feel longer",
        paragraphs: [
          "Dubai is spread out, so a short itinerary works best when each half-day stays within one part of the city. This plan groups the Creek and historic districts together, then moves to Downtown. The second day pairs the coast with an afternoon or evening desert experience. It gives a first-time visitor four distinct views of Dubai without turning the trip into a race between landmarks.",
          "Treat the times below as a framework rather than a booking schedule. Attraction hours, Metro service and tour pickup windows can change for public holidays, Ramadan and special events. Recheck every timed stop on its official website shortly before you travel. This guide was reviewed against official sources on 24 August 2026.",
        ],
        bullets: [
          "Reserve only the time-sensitive anchors: Burj Khalifa and your desert experience.",
          "Keep meals flexible so a delayed arrival does not disrupt the whole day.",
          "Use the Metro for long north-south sections, then taxis for awkward final connections.",
          "If you arrive on an overnight flight, do not drive straight into a full itinerary without rest.",
        ],
      },
      {
        id: "day-one-old-dubai-downtown",
        heading: "Day one: Old Dubai to Downtown",
        paragraphs: [
          "The first day follows Dubai's story from the Creek-side trading districts to the modern skyline. Start early enough to walk outdoors comfortably, especially during hotter months, and leave Downtown for late afternoon when the light begins to soften.",
        ],
        subsections: [
          {
            id: "al-fahidi-morning",
            heading: "8:30am–10:30am: walk through Al Fahidi",
            paragraphs: [
              "Begin in Al Fahidi Historical Neighbourhood. Its narrow lanes, courtyards and traditional wind-tower architecture make it a useful introduction to the city before the glass towers. Visit Dubai recommends exploring the district on foot; give yourself time to look into the small galleries and cultural spaces that are open that morning rather than trying to tick off every doorway.",
              "Dress with the setting in mind. The UAE Government advises modest clothing in conservative areas and public places. Lightweight clothes that cover the shoulders and knees are a comfortable default, and you should ask permission before photographing people.",
            ],
          },
          {
            id: "creek-and-souks",
            heading: "10:30am–12:30pm: cross Dubai Creek and browse the souks",
            paragraphs: [
              "Walk toward the Bur Dubai abra station and cross the Creek to Deira. RTA lists the motorised traditional abra between Bur Dubai and Deira Old Souq at AED 1 per passenger, paid in cash. A separate petrol heritage abra network serves routes including Al Fahidi to Deira Old Souq at AED 2. Check the route board before boarding so you know which service you are using.",
              "On the Deira side, walk through the Spice Souk and Gold Souk at your own pace. You do not need to buy anything for the area to be worthwhile. If you do shop, ask for the full price before agreeing and keep receipts for valuable purchases. Friday prayers, holidays and summer heat can affect the rhythm of the district, so avoid building the rest of the day around a single shop's listed hours.",
            ],
          },
          {
            id: "lunch-and-reset",
            heading: "12:30pm–3:00pm: lunch and reset",
            paragraphs: [
              "Choose lunch near the Creek, then return to your hotel or travel directly to Downtown. This buffer is intentional: it absorbs heat, traffic and a slower-than-planned morning. If you are carrying luggage during a stopover, confirm storage with your hotel in advance rather than assuming an attraction will accept large bags.",
            ],
          },
          {
            id: "downtown-evening",
            heading: "3:30pm–evening: Downtown Dubai and Burj Khalifa",
            paragraphs: [
              "Spend late afternoon around Dubai Mall and Burj Lake, then use a prebooked Burj Khalifa time slot as the day's anchor. At the Top begins inside Dubai Mall, so allow more walking time than the map suggests and follow the official ticket instructions for arrival and entry. Sunset slots are popular, but a clear daytime view or the city lights after dark can work just as well if the premium sunset timing does not fit your budget.",
              "Keep the evening loose. Walk around Downtown, have dinner nearby and return when you are ready. Fountain schedules and access arrangements may change, so treat any show as a bonus and check current information on the day rather than promising yourself a specific performance.",
            ],
          },
        ],
      },
      {
        id: "day-two-coast-desert",
        heading: "Day two: Dubai's coast and desert",
        paragraphs: [
          "Day two moves away from dense sightseeing. A calm morning by the water balances the longer desert excursion later in the day and leaves room for pickup windows that vary by hotel and season.",
        ],
        subsections: [
          {
            id: "coast-morning",
            heading: "8:00am–11:00am: an easy morning on the coast",
            paragraphs: [
              "Choose one coastal area rather than trying to cover every beach. Kite Beach works for an open shoreline and a view toward Burj Al Arab; JBR is more convenient if you are staying around Dubai Marina. Go early in hotter months, carry water and use sun protection. Swim only where conditions and lifeguard guidance allow.",
              "If the weather is uncomfortable or you prefer an indoor morning, replace the beach with a museum or cultural space that matches your interests. The goal is not to complete a fixed checklist; it is to preserve enough energy for the afternoon.",
            ],
          },
          {
            id: "desert-preparation",
            heading: "11:00am–2:30pm: lunch and prepare for pickup",
            paragraphs: [
              "Return to your hotel, eat a light lunch and confirm the exact pickup point with your desert operator. Shared pickups can involve a window rather than a precise minute. Ask whether the stated duration includes transfers and confirm what is included, what costs extra, the cancellation terms and the return time before you pay.",
            ],
            bullets: [
              "Tell the operator about pregnancy, back or neck conditions, mobility needs and young children before booking dune driving.",
              "Check that every passenger has a seat belt and follow the driver's safety instructions.",
              "Wear secure footwear if sandboarding is included; bring a light layer for cooler winter evenings.",
              "Treat quad biking as a separate higher-risk activity and check insurance and age restrictions explicitly.",
            ],
          },
          {
            id: "desert-afternoon",
            heading: "Afternoon–evening: choose the desert experience that fits you",
            paragraphs: [
              "Official Dubai tourism information lists both morning and evening desert safaris, with common elements such as four-wheel-drive transfers, dune driving, sandboarding and short camel experiences. Packages vary widely. Do not assume dinner, every activity or hotel pickup from every district is included simply because it appears in a photograph.",
              "For a 48-hour visit, an afternoon-to-evening safari is efficient because it combines the desert, sunset and dinner window. Travellers who dislike dune driving can ask for a gentler nature-focused or direct-to-camp option. Caspaya does not currently sell tours, and no affiliate offer is being recommended in this article; compare the operator's current terms directly before booking.",
            ],
          },
        ],
      },
      {
        id: "getting-around",
        heading: "Getting around during a two-day visit",
        paragraphs: [
          "Dubai Metro is useful for airport, Old Dubai, Downtown and Marina corridors, but it does not place every attraction at the station entrance. RTA requires a nol card or ticket, and fares are calculated by zones. Its current guidance says passengers need at least AED 7.50 balance to enter the Metro and notes that working hours can change for holidays and special events.",
          "For an occasional short visit, compare a Red Ticket with a Silver card based on the journeys you actually expect to make. RTA currently lists regular Red Ticket journeys at AED 4 within one zone, AED 6 across two adjacent zones and AED 8.50 across more than two zones. Check the official fare page before travel, since transport prices and products can change.",
          "Taxis are the practical bridge when a Metro connection would add too much walking or a long transfer. Allow extra road time around evening peaks and major events. If you have a flight after the desert safari, do not rely on the advertised return time alone; traffic and shared drop-offs can move it.",
        ],
      },
      {
        id: "what-to-book",
        heading: "What to book in advance — and what to leave open",
        paragraphs: [
          "A short trip becomes fragile when every hour is prepaid. Book the experiences that control the day's timing, then preserve space around them. For this route, that normally means one Burj Khalifa entry and one desert pickup. The historic district, Creek crossing, souks and beach can remain flexible.",
        ],
        bullets: [
          "Book: Burj Khalifa timed entry and a desert experience with clear pickup and cancellation terms.",
          "Confirm: hotel luggage storage, airport transfer plan and any restaurant you would be disappointed to miss.",
          "Leave flexible: Al Fahidi galleries, souk browsing, beach time and most casual meals.",
          "Recheck 24–48 hours before: attraction hours, RTA service notices, weather and your operator's pickup message.",
        ],
      },
      {
        id: "adjust-the-plan",
        heading: "How to adjust this itinerary",
        paragraphs: [
          "Families may want to replace the souks or beach with one longer indoor attraction and request a desert package suitable for the children's ages. Travellers with limited mobility should verify step-free routes, vehicle access and sand conditions directly; the traditional abra experience may not suit every mobility requirement even when some newer vessels have accessibility features.",
          "In the hottest part of the year, move outdoor walking to the earliest available hours and turn midday into indoor time. During Ramadan, be especially careful with changed operating hours and desert entertainment schedules. On a true airport stopover, leave a large margin for immigration, baggage, transfers and security rather than treating all 48 hours as sightseeing time.",
          "If your trip is only two nights but includes arrival and departure on those same dates, cut one major block. Old Dubai plus Downtown makes a strong city day; the coast plus desert makes a contrasting second day. Doing either well is better than seeing every landmark through a taxi window.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is 48 hours enough for Dubai?",
        answer:
          "It is enough for a focused introduction, not the whole city. Group nearby areas together and choose two timed experiences at most. A longer stay is better for theme parks, Abu Dhabi, multiple beaches or a slower food-focused trip.",
      },
      {
        question: "Do I need a car for this Dubai itinerary?",
        answer:
          "No. Metro, taxis and an operator pickup can cover this route. A rental car may add parking and navigation time on a first short visit, while it is essential to confirm that any desert experience includes the transfer you need.",
      },
      {
        question: "Should I stay in Downtown Dubai or Dubai Marina for two days?",
        answer:
          "Downtown is convenient for Burj Khalifa and a short central sightseeing plan. Marina or JBR suits travellers who prioritise the waterfront. Your best choice is the area that removes the most transfers from your personal must-do list.",
      },
      {
        question: "Can I follow this plan during summer?",
        answer:
          "Yes, but move outdoor walking to early morning, use midday for air-conditioned stops and confirm desert pickup timing with the operator. Heat tolerance varies, so shorten or replace outdoor blocks when needed.",
      },
      {
        question: "Does Caspaya earn commission from the links in this guide?",
        answer:
          "No. Caspaya has not activated affiliate booking links in this article. The source links lead to official information pages so readers can verify current details.",
      },
    ],
    sources: [
      {
        title: "A First-Timer's Guide to Dubai",
        publisher: "Visit Dubai",
        url: "https://www.visitdubai.com/en/things-to-do/itineraries/a-first-timers-guide-to-dubai",
        accessedAt: "2026-08-24",
      },
      {
        title: "Al Fahidi Historical Neighbourhood",
        publisher: "Visit Dubai",
        url: "https://www.visitdubai.com/en/places-to-visit/al-fahidi-historical-neighbourhood",
        accessedAt: "2026-08-24",
      },
      {
        title: "About Marine Transport",
        publisher: "Dubai Roads and Transport Authority",
        url: "https://www.rta.ae/wps/portal/rta/ae/public-transport/marine/about-marine",
        accessedAt: "2026-08-24",
      },
      {
        title: "nol Fares",
        publisher: "Dubai Roads and Transport Authority",
        url: "https://rta.ae/wps/portal/rta/ae/public-transport/Nol-Fares?lang=en",
        accessedAt: "2026-08-24",
      },
      {
        title: "Transport Using the Metro",
        publisher: "Dubai Roads and Transport Authority",
        url: "https://rta.ae/wps/portal/rta/ae/home/rta-services/service-details?serviceId=338",
        accessedAt: "2026-08-24",
      },
      {
        title: "Desert Safaris in Dubai",
        publisher: "Visit Dubai",
        url: "https://www.visitdubai.com/en/places-to-visit/desert-safari-dubai",
        accessedAt: "2026-08-24",
      },
      {
        title: "Weather in Dubai",
        publisher: "Visit Dubai",
        url: "https://www.visitdubai.com/en/plan-your-trip/weather-in-dubai",
        accessedAt: "2026-08-24",
      },
      {
        title: "Social Responsibility and Visitor Etiquette",
        publisher: "The Official Platform of the UAE Government",
        url: "https://u.ae/en/information-and-services/visiting-and-exploring-the-uae/social-responsibility",
        accessedAt: "2026-08-24",
      },
      {
        title: "Burj Khalifa Fact Sheet",
        publisher: "Burj Khalifa",
        url: "https://www.burjkhalifa.ae/img/fact-sheet.pdf",
        accessedAt: "2026-08-24",
      },
    ],
    internalLinks: [
      { label: "Explore Caspaya's Dubai travel ideas", href: "/" },
      { label: "Read how Caspaya researches its guides", href: "/about" },
    ],
    relatedArticleSlugs: [],
  },
};

export const blogDetails: Record<string, BlogDetail> = {
  ...placeholderBlogDetails,
  ...researchedBlogDetails,
};
