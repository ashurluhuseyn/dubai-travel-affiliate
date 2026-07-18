"use client";

import { useEffect, useState } from "react";

import {
  FormField,
  FormSection,
} from "@/components/admin/experiences/form-section";
import { Input } from "@/components/ui/input";
import type { ExperienceFormValues } from "@/lib/cms/validation/experience";

import { ExperienceCoverUploader } from "./experience-cover-uploader";
import { ExperienceGalleryManager } from "./experience-gallery-manager";

type ExperienceMediaSectionProps = {
  values: ExperienceFormValues;
  onPatch: (patch: Partial<ExperienceFormValues>) => void;
  onUploadStateChange: (isUploading: boolean) => void;
  fieldErrors?: Record<string, string>;
  err: (key: string) => string | undefined;
};

export function ExperienceMediaSection({
  values,
  onPatch,
  onUploadStateChange,
  fieldErrors,
  err,
}: ExperienceMediaSectionProps) {
  const [coverUploading, setCoverUploading] = useState(false);
  const [galleryUploading, setGalleryUploading] = useState(false);

  useEffect(() => {
    onUploadStateChange(coverUploading || galleryUploading);
  }, [coverUploading, galleryUploading, onUploadStateChange]);

  return (
    <FormSection
      title="Media"
      description="Upload cover and gallery images to Supabase Storage, or keep external URLs."
    >
      <FormField
        label="Cover image"
        htmlFor="listing_image_url"
        error={err("listing_image_url")}
      >
        <ExperienceCoverUploader
          experienceSlug={values.slug}
          value={values.listing_image_url ?? ""}
          onChange={(listing_image_url) => onPatch({ listing_image_url })}
          onUploadStateChange={setCoverUploading}
          error={err("listing_image_url")}
        />
      </FormField>

      <ExperienceGalleryManager
        experienceSlug={values.slug}
        items={values.gallery}
        onChange={(gallery) => onPatch({ gallery })}
        onUploadStateChange={setGalleryUploading}
        fieldErrors={fieldErrors}
      />

      <FormField
        label="Gallery extra count"
        htmlFor="gallery_extra_count"
        hint="Number of additional photos shown as +N on the gallery tile."
        error={err("gallery_extra_count")}
      >
        <Input
          id="gallery_extra_count"
          type="number"
          min={0}
          value={values.gallery_extra_count}
          onChange={(event) =>
            onPatch({
              gallery_extra_count: Math.max(0, Number(event.target.value) || 0),
            })
          }
        />
      </FormField>
    </FormSection>
  );
}
