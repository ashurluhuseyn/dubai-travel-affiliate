import { z } from "zod";

export const categoryFormSchema = z.object({
  label: z.string().min(1, "Name is required"),
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase with hyphens"),
  description: z.string().optional().nullable(),
  icon_key: z.string().optional().nullable(),
  sort_order: z.coerce.number().int().default(0),
  status: z.enum(["draft", "published", "archived"]),
});

export type CategoryFormValues = z.infer<typeof categoryFormSchema>;

export const emptyCategoryFormValues: CategoryFormValues = {
  label: "",
  slug: "",
  description: "",
  icon_key: "",
  sort_order: 0,
  status: "draft",
};
