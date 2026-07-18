import { z } from "zod";

import { sanitizeRelatedExperienceSlugs } from "@/lib/cms/public/related-experiences";

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const contentStatusSchema = z.enum(["draft", "published", "archived"]);

const itineraryItemSchema = z.object({
  time: z.string().min(1, "Time is required"),
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
});

const faqItemSchema = z.object({
  question: z.string().min(1, "Question is required"),
  answer: z.string().min(1, "Answer is required"),
});

const galleryItemSchema = z.object({
  src: z.string().url("Image URL must be valid"),
  alt: z.string().min(1, "Alt text is required"),
});

const includedItemSchema = z.object({
  label: z.string().min(1, "Label is required"),
});

export const experienceProviderInputSchema = z.object({
  id: z.string().uuid().optional(),
  provider_name: z.string().min(1, "Provider name is required"),
  price: z.coerce.number().min(0, "Price must be 0 or greater"),
  currency: z.string().min(1, "Currency is required").default("AED"),
  rating: z.coerce.number().min(0).max(5).optional().nullable(),
  review_count: z.coerce.number().int().min(0).optional().nullable(),
  cancellation_text: z.string().optional().nullable(),
  instant_confirmation: z.boolean().default(false),
  mobile_ticket: z.boolean().default(false),
  description: z.string().optional().nullable(),
  affiliate_url: z.string().url("Affiliate URL must be valid"),
  is_recommended: z.boolean().default(false),
  badge: z.string().optional().nullable(),
  display_order: z.coerce.number().int().min(0).default(0),
  is_active: z.boolean().default(true),
});

export const experienceFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase with hyphens"),
  category_id: z.string().uuid().optional().nullable(),
  location: z.string().optional().nullable(),
  description: z.string().min(1, "Short description is required"),
  long_description: z.string().optional().nullable(),
  listing_image_url: z
    .string()
    .optional()
    .nullable()
    .transform((val) => (val?.trim() === "" ? null : val))
    .pipe(z.union([z.string().url(), z.null()])),
  badge: z.string().optional().nullable(),
  duration_label: z.string().optional().nullable(),
  duration_hours: z.coerce.number().min(0).optional().nullable(),
  group_size_label: z.string().optional().nullable(),
  pickup_included: z.boolean().default(false),
  mobile_ticket: z.boolean().default(false),
  free_cancellation: z.boolean().default(false),
  meeting_point: z.string().optional().nullable(),
  cancellation_policy: z.string().optional().nullable(),
  languages: z.array(z.string()).default([]),
  tour_type: z.string().optional().nullable(),
  recommended_score: z.coerce.number().int().min(0).default(0),
  highlights: z.array(z.string().min(1)).default([]),
  included_items: z.array(includedItemSchema).default([]),
  itinerary: z.array(itineraryItemSchema).default([]),
  important_info: z.array(z.string().min(1)).default([]),
  faqs: z.array(faqItemSchema).default([]),
  gallery: z
    .array(galleryItemSchema)
    .max(20, "Maximum 20 gallery images allowed")
    .default([])
    .superRefine((items, ctx) => {
      const seen = new Set<string>();
      for (const [index, item] of items.entries()) {
        if (seen.has(item.src)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Duplicate gallery URLs are not allowed.",
            path: [index, "src"],
          });
        }
        seen.add(item.src);
      }
    }),
  gallery_extra_count: z.coerce.number().int().min(0).default(0),
  related_experience_slugs: z
    .array(z.string().regex(slugPattern, "Related slug must be lowercase with hyphens"))
    .default([]),
  cached_lowest_price: z.coerce.number().min(0).optional().nullable(),
  cached_currency: z.string().default("AED"),
  cached_rating: z.coerce.number().min(0).max(5).optional().nullable(),
  cached_review_count: z.coerce.number().int().min(0).optional().nullable(),
  meta_title: z.string().optional().nullable(),
  meta_description: z.string().optional().nullable(),
  og_image_url: z
    .string()
    .optional()
    .nullable()
    .transform((val) => (val?.trim() === "" ? null : val))
    .pipe(z.union([z.string().url(), z.null()])),
  canonical_path: z.string().optional().nullable(),
  no_index: z.boolean().default(false),
  status: contentStatusSchema,
});

export const saveExperiencePayloadSchema = z
  .object({
    experience: experienceFormSchema,
    providers: z.array(experienceProviderInputSchema).default([]),
  })
  .transform((payload) => ({
    experience: {
      ...payload.experience,
      related_experience_slugs: sanitizeRelatedExperienceSlugs(
        payload.experience.related_experience_slugs,
        payload.experience.slug
      ),
    },
    providers: payload.providers,
  }));

export type ExperienceFormValues = z.infer<typeof experienceFormSchema>;
export type ExperienceProviderInput = z.infer<typeof experienceProviderInputSchema>;
export type SaveExperiencePayload = z.infer<typeof saveExperiencePayloadSchema>;

export function deriveCachedFields(
  providers: ExperienceProviderInput[]
): Pick<
  ExperienceFormValues,
  "cached_lowest_price" | "cached_currency" | "cached_rating" | "cached_review_count"
> {
  const active = providers.filter((p) => p.is_active);
  if (active.length === 0) {
    return {
      cached_lowest_price: null,
      cached_currency: "AED",
      cached_rating: null,
      cached_review_count: null,
    };
  }

  const lowest = active.reduce((min, p) => (p.price < min.price ? p : min));
  const recommended = active.find((p) => p.is_recommended) ?? active[0];

  return {
    cached_lowest_price: lowest.price,
    cached_currency: lowest.currency || "AED",
    cached_rating: recommended.rating ?? null,
    cached_review_count: recommended.review_count ?? null,
  };
}

export function formatZodErrors(error: z.ZodError): Record<string, string> {
  const fieldErrors: Record<string, string> = {};
  for (const issue of error.issues) {
    const path = issue.path.join(".");
    if (!fieldErrors[path]) {
      fieldErrors[path] = issue.message;
    }
  }
  return fieldErrors;
}
