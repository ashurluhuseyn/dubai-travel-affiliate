"use client";

import { useRef, useState } from "react";
import { ImageIcon, Loader2, Trash2, Upload } from "lucide-react";

import { createExperienceMediaUploadAction } from "@/app/admin/(protected)/experiences/media-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EXPERIENCE_MEDIA_BUCKET } from "@/lib/cms/media/constants";
import { selectSingleCoverFile } from "@/lib/cms/media/gallery-batch-upload";
import { getImageSourceLabel } from "@/lib/cms/media/paths";
import { createBrowserSupabaseClient } from "@/lib/cms/supabase/client";
import { cn } from "@/lib/utils";

type ExperienceCoverUploaderProps = {
  experienceSlug: string;
  value: string;
  onChange: (value: string) => void;
  onUploadStateChange?: (isUploading: boolean) => void;
  error?: string;
};

export function ExperienceCoverUploader({
  experienceSlug,
  value,
  onChange,
  onUploadStateChange,
  error,
}: ExperienceCoverUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const slugReady = experienceSlug.trim().length > 0;
  const sourceLabel = getImageSourceLabel(value);

  const setUploading = (next: boolean) => {
    setIsUploading(next);
    onUploadStateChange?.(next);
  };

  async function uploadFile(file: File) {
    if (!slugReady) {
      setUploadError("Enter a title or slug before uploading images.");
      return;
    }

    setUploadError(null);
    setUploading(true);

    try {
      const signed = await createExperienceMediaUploadAction({
        experienceSlug,
        fileName: file.name,
        mimeType: file.type,
        fileSize: file.size,
      });

      if (!signed.ok) {
        setUploadError(signed.error);
        return;
      }

      const supabase = createBrowserSupabaseClient();
      const { error: uploadErrorResult } = await supabase.storage
        .from(EXPERIENCE_MEDIA_BUCKET)
        .uploadToSignedUrl(signed.path, signed.token, file, {
          contentType: file.type,
          upsert: false,
        });

      if (uploadErrorResult) {
        setUploadError(uploadErrorResult.message);
        return;
      }

      onChange(signed.publicUrl);
    } catch (caught) {
      setUploadError(
        caught instanceof Error ? caught.message : "Cover upload failed."
      );
    } finally {
      setUploading(false);
    }
  }

  async function handleFiles(files: FileList | null) {
    const file = selectSingleCoverFile(files);
    if (!file) {
      return;
    }

    await uploadFile(file);
  }

  return (
    <div className="space-y-4">
      {!slugReady && (
        <p className="rounded-lg border border-border/60 bg-card/30 px-4 py-3 text-sm text-muted-foreground">
          Enter a title or slug before uploading images.
        </p>
      )}

      <div
        className={cn(
          "rounded-xl border border-dashed border-border/70 bg-card/20 p-4 transition-colors",
          isDragging && "border-luxury-gold-muted/50 bg-luxury-gold/5",
          !slugReady && "opacity-60"
        )}
        onDragOver={(event) => {
          event.preventDefault();
          if (slugReady) {
            setIsDragging(true);
          }
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={async (event) => {
          event.preventDefault();
          setIsDragging(false);
          if (!slugReady || isUploading) {
            return;
          }
          await handleFiles(event.dataTransfer.files);
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/avif"
          className="sr-only"
          disabled={!slugReady || isUploading}
          onChange={async (event) => {
            await handleFiles(event.target.files);
            event.target.value = "";
          }}
        />

        {value ? (
          <div className="space-y-4">
            <div className="overflow-hidden rounded-lg border border-border/60 bg-black/20">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={value}
                alt="Cover preview"
                className="max-h-64 w-full object-cover"
              />
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <span className="rounded-full border border-border/60 px-2 py-1">
                {sourceLabel}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={!slugReady || isUploading}
                onClick={() => inputRef.current?.click()}
              >
                {isUploading ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Upload className="size-4" />
                )}
                Replace image
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={isUploading}
                onClick={() => {
                  if (
                    value &&
                    window.confirm("Remove the cover image from this experience?")
                  ) {
                    onChange("");
                  }
                }}
              >
                <Trash2 className="size-4" />
                Remove
              </Button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            className="flex min-h-40 w-full flex-col items-center justify-center gap-3 rounded-lg text-sm text-muted-foreground transition-colors hover:text-foreground disabled:cursor-not-allowed"
            disabled={!slugReady || isUploading}
            onClick={() => inputRef.current?.click()}
          >
            {isUploading ? (
              <Loader2 className="size-8 animate-spin text-luxury-gold-soft" />
            ) : (
              <ImageIcon className="size-8 text-luxury-gold-muted" />
            )}
            <span>Click or drag a cover image here</span>
            <span className="text-xs">JPEG, PNG, WebP, or AVIF up to 10 MB</span>
          </button>
        )}
      </div>

      {(uploadError || error) && (
        <p role="alert" className="text-sm text-destructive">
          {uploadError ?? error}
        </p>
      )}

      <details className="rounded-lg border border-border/60 bg-card/20 p-4">
        <summary className="cursor-pointer text-sm font-medium text-foreground">
          Advanced: listing image URL
        </summary>
        <div className="mt-3 space-y-2">
          <Input
            type="url"
            value={value}
            placeholder="https://..."
            onChange={(event) => onChange(event.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            Paste an external URL or a Supabase Storage public URL. Uploading
            above will replace this value.
          </p>
        </div>
      </details>
    </div>
  );
}
