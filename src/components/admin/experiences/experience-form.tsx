"use client";

import { useMemo, useState } from "react";
import { useActionState } from "react";
import Link from "next/link";
import { Plus, Trash2 } from "lucide-react";

import {
  createExperienceAction,
  updateExperienceAction,
  type ExperienceActionState,
} from "@/app/admin/(protected)/experiences/actions";
import {
  FormField,
  FormSection,
} from "@/components/admin/experiences/form-section";
import { ProviderEditor } from "@/components/admin/experiences/provider-editor";
import { RelatedExperiencesEditor } from "@/components/admin/experiences/related-experiences-editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { CategoryRow, ExperienceListItem } from "@/lib/cms/types/database";
import { slugify } from "@/lib/cms/utils/slugify";
import {
  emptyExperienceFormValues,
} from "@/lib/cms/utils/experience-form-mapper";
import type {
  ExperienceFormValues,
  ExperienceProviderInput,
} from "@/lib/cms/validation/experience";

type ExperienceFormProps = {
  mode: "create" | "edit";
  experienceId?: string;
  initialValues?: ExperienceFormValues;
  initialProviders?: ExperienceProviderInput[];
  categories: CategoryRow[];
  experienceOptions: Pick<ExperienceListItem, "slug" | "title" | "status">[];
};

const initialActionState: ExperienceActionState = {};

function err(fieldErrors: Record<string, string> | undefined, key: string) {
  return fieldErrors?.[`experience.${key}`] ?? fieldErrors?.[key];
}

function StringListEditor({
  label,
  values,
  onChange,
  placeholder,
}: {
  label: string;
  values: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
}) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-medium">{label}</p>
      {values.map((value, index) => (
        <div key={index} className="flex gap-2">
          <Input
            value={value}
            placeholder={placeholder}
            onChange={(e) =>
              onChange(
                values.map((item, i) => (i === index ? e.target.value : item))
              )
            }
          />
          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            onClick={() => onChange(values.filter((_, i) => i !== index))}
            aria-label={`Remove ${label} item`}
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => onChange([...values, ""])}
      >
        <Plus className="size-4" />
        Add item
      </Button>
    </div>
  );
}

export function ExperienceForm({
  mode,
  experienceId,
  initialValues = emptyExperienceFormValues,
  initialProviders = [],
  categories,
  experienceOptions,
}: ExperienceFormProps) {
  const action = mode === "create" ? createExperienceAction : updateExperienceAction;
  const [state, formAction, isPending] = useActionState(action, initialActionState);

  const [values, setValues] = useState<ExperienceFormValues>(initialValues);
  const [providers, setProviders] =
    useState<ExperienceProviderInput[]>(initialProviders);
  const [slugEdited, setSlugEdited] = useState(mode === "edit");
  const [languagesInput, setLanguagesInput] = useState(
    initialValues.languages.join(", ")
  );

  const payload = useMemo(() => {
    const languages = languagesInput
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    const cleanedExperience: ExperienceFormValues = {
      ...values,
      languages,
      highlights: values.highlights.filter((item) => item.trim()),
      important_info: values.important_info.filter((item) => item.trim()),
      included_items: values.included_items.filter((item) => item.label.trim()),
      itinerary: values.itinerary.filter(
        (item) => item.time.trim() || item.title.trim()
      ),
      faqs: values.faqs.filter(
        (item) => item.question.trim() && item.answer.trim()
      ),
      gallery: values.gallery.filter(
        (item) => item.src.trim() && item.alt.trim()
      ),
    };

    return JSON.stringify({
      experience: cleanedExperience,
      providers: providers.map((provider, index) => ({
        ...provider,
        display_order: index,
      })),
    });
  }, [values, providers, languagesInput]);

  const patch = (patchValues: Partial<ExperienceFormValues>) => {
    setValues((current) => {
      const next = { ...current, ...patchValues };
      if (!slugEdited && patchValues.title !== undefined) {
        next.slug = slugify(patchValues.title);
      }
      return next;
    });
  };

  return (
    <form action={formAction} className="space-y-6">
      {experienceId && (
        <input type="hidden" name="experienceId" value={experienceId} />
      )}
      <input type="hidden" name="payload" value={payload} readOnly />

      {state.error && (
        <p
          role="alert"
          className="rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive"
        >
          {state.error}
        </p>
      )}

      {state.success && (
        <p
          role="status"
          className="rounded-lg border border-luxury-gold-muted/30 bg-luxury-gold/10 px-4 py-3 text-sm text-luxury-gold-soft"
        >
          Experience saved successfully.
        </p>
      )}

      <FormSection title="Basics" description="Core listing information.">
        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            label="Title"
            htmlFor="title"
            error={err(state.fieldErrors, "title")}
          >
            <Input
              id="title"
              value={values.title}
              onChange={(e) => patch({ title: e.target.value })}
              required
            />
          </FormField>
          <FormField
            label="Slug"
            htmlFor="slug"
            error={err(state.fieldErrors, "slug")}
            hint="Auto-generated from title; edit manually if needed."
          >
            <Input
              id="slug"
              value={values.slug}
              onChange={(e) => {
                setSlugEdited(true);
                patch({ slug: e.target.value });
              }}
              required
            />
          </FormField>
          <FormField label="Category" htmlFor="category_id">
            <select
              id="category_id"
              className="h-9 w-full rounded-md border border-input bg-transparent px-2.5 text-sm"
              value={values.category_id ?? ""}
              onChange={(e) =>
                patch({
                  category_id: e.target.value ? e.target.value : null,
                })
              }
            >
              <option value="">No category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.label}
                </option>
              ))}
            </select>
          </FormField>
          <FormField label="Status" htmlFor="status">
            <select
              id="status"
              className="h-9 w-full rounded-md border border-input bg-transparent px-2.5 text-sm"
              value={values.status}
              onChange={(e) =>
                patch({
                  status: e.target.value as ExperienceFormValues["status"],
                })
              }
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </FormField>
          <FormField label="Location" htmlFor="location">
            <Input
              id="location"
              value={values.location ?? ""}
              onChange={(e) => patch({ location: e.target.value })}
            />
          </FormField>
          <FormField
            label="Badge"
            htmlFor="badge"
            hint="e.g. Bestseller, Popular"
          >
            <Input
              id="badge"
              value={values.badge ?? ""}
              onChange={(e) => patch({ badge: e.target.value })}
            />
          </FormField>
          <FormField
            label="Recommended score"
            htmlFor="recommended_score"
            hint="Higher scores sort earlier on destinations (schema: recommended_score)."
          >
            <Input
              id="recommended_score"
              type="number"
              min={0}
              value={values.recommended_score}
              onChange={(e) =>
                patch({ recommended_score: Number(e.target.value) || 0 })
              }
            />
          </FormField>
        </div>
        <FormField
          label="Short description"
          htmlFor="description"
          error={err(state.fieldErrors, "description")}
        >
          <textarea
            id="description"
            className="min-h-24 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
            value={values.description}
            onChange={(e) => patch({ description: e.target.value })}
            required
          />
        </FormField>
        <FormField label="Full description" htmlFor="long_description">
          <textarea
            id="long_description"
            className="min-h-32 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
            value={values.long_description ?? ""}
            onChange={(e) => patch({ long_description: e.target.value })}
          />
        </FormField>
      </FormSection>

      <FormSection title="Details">
        <div className="grid gap-4 md:grid-cols-2">
          <FormField label="Duration label" htmlFor="duration_label">
            <Input
              id="duration_label"
              value={values.duration_label ?? ""}
              onChange={(e) => patch({ duration_label: e.target.value })}
            />
          </FormField>
          <FormField label="Duration (hours)" htmlFor="duration_hours">
            <Input
              id="duration_hours"
              type="number"
              min={0}
              step="0.5"
              value={values.duration_hours ?? ""}
              onChange={(e) =>
                patch({
                  duration_hours:
                    e.target.value === "" ? null : Number(e.target.value),
                })
              }
            />
          </FormField>
          <FormField label="Group size label" htmlFor="group_size_label">
            <Input
              id="group_size_label"
              value={values.group_size_label ?? ""}
              onChange={(e) => patch({ group_size_label: e.target.value })}
            />
          </FormField>
          <FormField label="Tour type" htmlFor="tour_type">
            <Input
              id="tour_type"
              value={values.tour_type ?? ""}
              onChange={(e) => patch({ tour_type: e.target.value })}
            />
          </FormField>
        </div>
        <FormField
          label="Languages"
          htmlFor="languages"
          hint="Comma-separated, e.g. english, arabic"
        >
          <Input
            id="languages"
            value={languagesInput}
            onChange={(e) => setLanguagesInput(e.target.value)}
          />
        </FormField>
        <div className="flex flex-wrap gap-4 text-sm">
          <label className="inline-flex items-center gap-2">
            <input
              type="checkbox"
              checked={values.pickup_included}
              onChange={(e) => patch({ pickup_included: e.target.checked })}
            />
            Pickup included
          </label>
          <label className="inline-flex items-center gap-2">
            <input
              type="checkbox"
              checked={values.mobile_ticket}
              onChange={(e) => patch({ mobile_ticket: e.target.checked })}
            />
            Mobile ticket
          </label>
          <label className="inline-flex items-center gap-2">
            <input
              type="checkbox"
              checked={values.free_cancellation}
              onChange={(e) => patch({ free_cancellation: e.target.checked })}
            />
            Free cancellation
          </label>
        </div>
        <FormField label="Meeting point" htmlFor="meeting_point">
          <textarea
            id="meeting_point"
            className="min-h-20 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
            value={values.meeting_point ?? ""}
            onChange={(e) => patch({ meeting_point: e.target.value })}
          />
        </FormField>
        <FormField label="Cancellation policy" htmlFor="cancellation_policy">
          <textarea
            id="cancellation_policy"
            className="min-h-20 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
            value={values.cancellation_policy ?? ""}
            onChange={(e) => patch({ cancellation_policy: e.target.value })}
          />
        </FormField>
      </FormSection>

      <FormSection title="Media">
        <FormField
          label="Listing image URL"
          htmlFor="listing_image_url"
          error={err(state.fieldErrors, "listing_image_url")}
        >
          <Input
            id="listing_image_url"
            type="url"
            value={values.listing_image_url ?? ""}
            onChange={(e) => patch({ listing_image_url: e.target.value })}
          />
        </FormField>
        <StringListEditor
          label="Gallery images (src per row — add alt in expanded editor below)"
          values={values.gallery.map((item) => item.src)}
          onChange={(srcs) =>
            patch({
              gallery: srcs.map((src, index) => ({
                src,
                alt: values.gallery[index]?.alt ?? "",
              })),
            })
          }
          placeholder="https://..."
        />
        {values.gallery.map((item, index) => (
          <FormField
            key={`gallery-alt-${index}`}
            label={`Gallery alt text #${index + 1}`}
            htmlFor={`gallery-alt-${index}`}
            error={err(state.fieldErrors, `gallery.${index}.alt`)}
          >
            <Input
              id={`gallery-alt-${index}`}
              value={item.alt}
              onChange={(e) =>
                patch({
                  gallery: values.gallery.map((entry, i) =>
                    i === index ? { ...entry, alt: e.target.value } : entry
                  ),
                })
              }
            />
          </FormField>
        ))}
        <FormField
          label="Gallery extra count"
          htmlFor="gallery_extra_count"
          hint="Number of additional photos shown as +N on the gallery tile."
          error={err(state.fieldErrors, "gallery_extra_count")}
        >
          <Input
            id="gallery_extra_count"
            type="number"
            min={0}
            value={values.gallery_extra_count}
            onChange={(e) =>
              patch({
                gallery_extra_count: Math.max(0, Number(e.target.value) || 0),
              })
            }
          />
        </FormField>
      </FormSection>

      <FormSection
        title="Related experiences"
        description="Curated cards shown in the You Might Also Like section."
      >
        <RelatedExperiencesEditor
          selectedSlugs={values.related_experience_slugs}
          currentSlug={values.slug || undefined}
          options={experienceOptions}
          onChange={(related_experience_slugs) =>
            patch({ related_experience_slugs })
          }
        />
      </FormSection>

      <FormSection title="Content blocks">
        <StringListEditor
          label="Highlights"
          values={values.highlights}
          onChange={(highlights) => patch({ highlights })}
        />
        <StringListEditor
          label="Included items"
          values={values.included_items.map((item) => item.label)}
          onChange={(labels) =>
            patch({
              included_items: labels.map((label) => ({ label })),
            })
          }
        />
        <StringListEditor
          label="Important information"
          values={values.important_info}
          onChange={(important_info) => patch({ important_info })}
        />
        <div className="space-y-3">
          <p className="text-sm font-medium">Itinerary</p>
          {values.itinerary.map((stop, index) => (
            <div
              key={`itinerary-${index}`}
              className="grid gap-2 rounded-lg border border-border/50 p-3 md:grid-cols-3"
            >
              <Input
                placeholder="Time"
                value={stop.time}
                onChange={(e) =>
                  patch({
                    itinerary: values.itinerary.map((item, i) =>
                      i === index ? { ...item, time: e.target.value } : item
                    ),
                  })
                }
              />
              <Input
                placeholder="Title"
                value={stop.title}
                onChange={(e) =>
                  patch({
                    itinerary: values.itinerary.map((item, i) =>
                      i === index ? { ...item, title: e.target.value } : item
                    ),
                  })
                }
              />
              <Input
                placeholder="Description"
                value={stop.description ?? ""}
                onChange={(e) =>
                  patch({
                    itinerary: values.itinerary.map((item, i) =>
                      i === index
                        ? { ...item, description: e.target.value }
                        : item
                    ),
                  })
                }
              />
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              patch({
                itinerary: [
                  ...values.itinerary,
                  { time: "", title: "", description: "" },
                ],
              })
            }
          >
            <Plus className="size-4" />
            Add itinerary stop
          </Button>
        </div>
        <div className="space-y-3">
          <p className="text-sm font-medium">FAQs</p>
          {values.faqs.map((faq, index) => (
            <div
              key={`faq-${index}`}
              className="space-y-2 rounded-lg border border-border/50 p-3"
            >
              <Input
                placeholder="Question"
                value={faq.question}
                onChange={(e) =>
                  patch({
                    faqs: values.faqs.map((item, i) =>
                      i === index ? { ...item, question: e.target.value } : item
                    ),
                  })
                }
              />
              <textarea
                placeholder="Answer"
                className="min-h-20 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
                value={faq.answer}
                onChange={(e) =>
                  patch({
                    faqs: values.faqs.map((item, i) =>
                      i === index ? { ...item, answer: e.target.value } : item
                    ),
                  })
                }
              />
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              patch({
                faqs: [...values.faqs, { question: "", answer: "" }],
              })
            }
          >
            <Plus className="size-4" />
            Add FAQ
          </Button>
        </div>
      </FormSection>

      <FormSection
        title="Cached listing prices"
        description="Auto-derived from active providers on save. You can override manually."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <FormField label="Lowest price" htmlFor="cached_lowest_price">
            <Input
              id="cached_lowest_price"
              type="number"
              min={0}
              value={values.cached_lowest_price ?? ""}
              onChange={(e) =>
                patch({
                  cached_lowest_price:
                    e.target.value === "" ? null : Number(e.target.value),
                })
              }
            />
          </FormField>
          <FormField label="Currency" htmlFor="cached_currency">
            <Input
              id="cached_currency"
              value={values.cached_currency}
              onChange={(e) => patch({ cached_currency: e.target.value })}
            />
          </FormField>
          <FormField label="Cached rating" htmlFor="cached_rating">
            <Input
              id="cached_rating"
              type="number"
              min={0}
              max={5}
              step="0.1"
              value={values.cached_rating ?? ""}
              onChange={(e) =>
                patch({
                  cached_rating:
                    e.target.value === "" ? null : Number(e.target.value),
                })
              }
            />
          </FormField>
          <FormField label="Cached review count" htmlFor="cached_review_count">
            <Input
              id="cached_review_count"
              type="number"
              min={0}
              value={values.cached_review_count ?? ""}
              onChange={(e) =>
                patch({
                  cached_review_count:
                    e.target.value === "" ? null : Number(e.target.value),
                })
              }
            />
          </FormField>
        </div>
      </FormSection>

      <FormSection title="SEO">
        <div className="grid gap-4 md:grid-cols-2">
          <FormField label="SEO title" htmlFor="meta_title">
            <Input
              id="meta_title"
              value={values.meta_title ?? ""}
              onChange={(e) => patch({ meta_title: e.target.value })}
            />
          </FormField>
          <FormField label="Canonical path" htmlFor="canonical_path">
            <Input
              id="canonical_path"
              value={values.canonical_path ?? ""}
              onChange={(e) => patch({ canonical_path: e.target.value })}
            />
          </FormField>
        </div>
        <FormField label="SEO description" htmlFor="meta_description">
          <textarea
            id="meta_description"
            className="min-h-24 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
            value={values.meta_description ?? ""}
            onChange={(e) => patch({ meta_description: e.target.value })}
          />
        </FormField>
        <FormField label="OG image URL" htmlFor="og_image_url">
          <Input
            id="og_image_url"
            type="url"
            value={values.og_image_url ?? ""}
            onChange={(e) => patch({ og_image_url: e.target.value })}
          />
        </FormField>
        <label className="inline-flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={values.no_index}
            onChange={(e) => patch({ no_index: e.target.checked })}
          />
          No index (hide from search engines)
        </label>
      </FormSection>

      <FormSection
        title="Affiliate providers"
        description="Booking options shown on the public experience detail page."
      >
        <ProviderEditor
          providers={providers}
          onChange={setProviders}
          fieldErrors={state.fieldErrors ?? {}}
        />
      </FormSection>

      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" disabled={isPending}>
          {isPending
            ? "Saving…"
            : mode === "create"
              ? "Create experience"
              : "Save changes"}
        </Button>
        <Button type="button" variant="outline" asChild>
          <Link href="/admin/experiences">Cancel</Link>
        </Button>
      </div>
    </form>
  );
}
