/** Internal experience detail route for a slug. */
export function experienceHref(slug: string): string {
  return `/experiences/${slug}`;
}

/**
 * Maps listing-card ids to canonical experience detail slugs when they differ.
 * Unmapped ids are treated as slugs directly.
 */
const SLUG_ALIASES: Record<string, string> = {
  "desert-safari": "desert-safari-dune-bashing",
  "burj-khalifa": "burj-khalifa-at-the-top",
  "burj-khalifa-top": "burj-khalifa-at-the-top",
  "yacht-charter": "private-yacht-charter",
  "luxury-yacht-tour": "luxury-yacht-marina-cruise",
  helicopter: "panoramic-helicopter-tour",
  "helicopter-tour": "panoramic-helicopter-tour",
  "fine-dining": "michelin-tasting-menu",
  "old-dubai": "old-town-heritage-tour",
  "old-dubai-walking-tour": "al-fahidi-walking-tour",
  "private-yacht": "private-yacht-charter",
  "desert-retreats": "luxury-desert-retreat",
  "michelin-dining": "michelin-tasting-menu",
  "vip-tours": "old-town-heritage-tour",
  "sky-lounge": "burj-khalifa-at-the-top",
  "hot-air-balloon-ride": "hot-air-balloon",
  "creek-dinner-cruise": "dhow-cruise-dinner",
  "quad-biking-desert": "quad-biking",
  "underwater-dining": "burj-al-arab-high-tea",
  "private-jet": "panoramic-helicopter-tour",
};

export function resolveExperienceSlug(id: string): string {
  return SLUG_ALIASES[id] ?? id;
}

export function experienceHrefForId(id: string): string {
  return experienceHref(resolveExperienceSlug(id));
}
