"use client";

import { useMemo, useState } from "react";
import { useActionState } from "react";
import Link from "next/link";

import {
  createCategoryAction,
  updateCategoryAction,
  type CategoryActionState,
} from "@/app/admin/(protected)/categories/actions";
import {
  FormField,
  FormSection,
} from "@/components/admin/experiences/form-section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { slugify } from "@/lib/cms/utils/slugify";
import {
  emptyCategoryFormValues,
  type CategoryFormValues,
} from "@/lib/cms/validation/category";

type CategoryFormProps = {
  mode: "create" | "edit";
  categoryId?: string;
  initialValues?: CategoryFormValues;
};

const initialActionState: CategoryActionState = {};

export function CategoryForm({
  mode,
  categoryId,
  initialValues = emptyCategoryFormValues,
}: CategoryFormProps) {
  const action =
    mode === "create" ? createCategoryAction : updateCategoryAction;
  const [state, formAction, isPending] = useActionState(action, initialActionState);

  const [values, setValues] = useState<CategoryFormValues>(initialValues);
  const [slugEdited, setSlugEdited] = useState(mode === "edit");

  const payload = useMemo(() => JSON.stringify(values), [values]);

  const patch = (patchValues: Partial<CategoryFormValues>) => {
    setValues((current) => {
      const next = { ...current, ...patchValues };
      if (!slugEdited && patchValues.label !== undefined) {
        next.slug = slugify(patchValues.label);
      }
      return next;
    });
  };

  const fieldError = (key: keyof CategoryFormValues) => state.fieldErrors?.[key];

  return (
    <form action={formAction} className="space-y-6">
      {categoryId && (
        <input type="hidden" name="categoryId" value={categoryId} />
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
          Category saved successfully.
        </p>
      )}

      <FormSection
        title="Category details"
        description="Schema fields: label, slug, description, icon_key, sort_order, status."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            label="Name (label)"
            htmlFor="label"
            error={fieldError("label")}
          >
            <Input
              id="label"
              value={values.label}
              onChange={(e) => patch({ label: e.target.value })}
              required
            />
          </FormField>
          <FormField
            label="Slug"
            htmlFor="slug"
            error={fieldError("slug")}
            hint="Auto-generated from name; edit manually if needed."
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
          <FormField label="Sort order" htmlFor="sort_order">
            <Input
              id="sort_order"
              type="number"
              value={values.sort_order}
              onChange={(e) =>
                patch({ sort_order: Number(e.target.value) || 0 })
              }
            />
          </FormField>
          <FormField label="Status" htmlFor="status">
            <select
              id="status"
              className="h-9 w-full rounded-md border border-input bg-transparent px-2.5 text-sm"
              value={values.status}
              onChange={(e) =>
                patch({
                  status: e.target.value as CategoryFormValues["status"],
                })
              }
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </FormField>
          <FormField label="Icon key" htmlFor="icon_key">
            <Input
              id="icon_key"
              value={values.icon_key ?? ""}
              onChange={(e) => patch({ icon_key: e.target.value })}
              placeholder="e.g. desert, yacht"
            />
          </FormField>
        </div>
        <FormField label="Description" htmlFor="description">
          <textarea
            id="description"
            className="min-h-24 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
            value={values.description ?? ""}
            onChange={(e) => patch({ description: e.target.value })}
          />
        </FormField>
      </FormSection>

      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" disabled={isPending}>
          {isPending
            ? "Saving…"
            : mode === "create"
              ? "Create category"
              : "Save changes"}
        </Button>
        <Button type="button" variant="outline" asChild>
          <Link href="/admin/categories">Cancel</Link>
        </Button>
      </div>
    </form>
  );
}
