"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  ImageIcon,
  Loader2,
  Plus,
  Trash2,
  Upload,
} from "lucide-react";

import { createExperienceMediaUploadAction } from "@/app/admin/(protected)/experiences/media-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  MAX_GALLERY_IMAGES,
  EXPERIENCE_MEDIA_BUCKET,
} from "@/lib/cms/media/constants";
import {
  appendGalleryItems,
  defaultGalleryAlt,
  fileListToFiles,
  planGalleryFileBatch,
  uploadGalleryFiles,
  type GalleryFileUploadAttempt,
} from "@/lib/cms/media/gallery-batch-upload";
import { getImageSourceLabel } from "@/lib/cms/media/paths";
import { createBrowserSupabaseClient } from "@/lib/cms/supabase/client";
import { cn } from "@/lib/utils";

type GalleryItem = {
  src: string;
  alt: string;
};

type ExperienceGalleryManagerProps = {
  experienceSlug: string;
  items: GalleryItem[];
  onChange: (items: GalleryItem[]) => void;
  onUploadStateChange?: (isUploading: boolean) => void;
  fieldErrors?: Record<string, string>;
};

function fileKey(file: File): string {
  return `${file.name}:${file.size}:${file.lastModified}`;
}

export function ExperienceGalleryManager({
  experienceSlug,
  items,
  onChange,
  onUploadStateChange,
  fieldErrors,
}: ExperienceGalleryManagerProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const itemsRef = useRef(items);
  const [isDragging, setIsDragging] = useState(false);
  const [isBatchUploading, setIsBatchUploading] = useState(false);
  const [uploadingFileKeys, setUploadingFileKeys] = useState<Set<string>>(
    () => new Set()
  );
  const [uploadErrors, setUploadErrors] = useState<string[]>([]);
  const [retryFiles, setRetryFiles] = useState<File[]>([]);

  itemsRef.current = items;

  const slugReady = experienceSlug.trim().length > 0;
  const remainingSlots = Math.max(0, MAX_GALLERY_IMAGES - items.length);
  const isUploading = isBatchUploading || uploadingFileKeys.size > 0;

  useEffect(() => {
    onUploadStateChange?.(isUploading);
  }, [isUploading, onUploadStateChange]);

  function patchItem(index: number, patch: Partial<GalleryItem>) {
    onChange(
      items.map((item, itemIndex) =>
        itemIndex === index ? { ...item, ...patch } : item
      )
    );
  }

  function moveItem(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= items.length) {
      return;
    }

    const next = [...items];
    const [moved] = next.splice(index, 1);
    next.splice(target, 0, moved);
    onChange(next);
  }

  function removeItem(index: number) {
    if (!window.confirm("Remove this gallery image from the experience?")) {
      return;
    }

    onChange(items.filter((_, itemIndex) => itemIndex !== index));
  }

  function addExternalItem() {
    if (items.length >= MAX_GALLERY_IMAGES) {
      return;
    }

    onChange([
      ...items,
      { src: "", alt: defaultGalleryAlt(experienceSlug, items.length) },
    ]);
  }

  async function uploadSignedFile(
    path: string,
    token: string,
    file: File
  ): Promise<{ error: string | null }> {
    const supabase = createBrowserSupabaseClient();
    const { error } = await supabase.storage
      .from(EXPERIENCE_MEDIA_BUCKET)
      .uploadToSignedUrl(path, token, file, {
        contentType: file.type,
        upsert: false,
      });

    return { error: error?.message ?? null };
  }

  function handleUploadResult(result: GalleryFileUploadAttempt, file: File) {
    setUploadingFileKeys((current) => {
      const next = new Set(current);
      next.delete(fileKey(file));
      return next;
    });

    if (result.ok) {
      const nextItems = appendGalleryItems(itemsRef.current, [result.item]);
      itemsRef.current = nextItems;
      onChange(nextItems);
      setRetryFiles((current) =>
        current.filter((candidate) => fileKey(candidate) !== fileKey(file))
      );
      return;
    }

    setUploadErrors((current) => [...current, `${result.fileName}: ${result.error}`]);
    setRetryFiles((current) => {
      const key = fileKey(file);
      if (current.some((candidate) => fileKey(candidate) === key)) {
        return current;
      }
      return [...current, file];
    });
  }

  async function processGalleryFiles(files: File[]) {
    if (files.length === 0) {
      return;
    }

    if (!slugReady) {
      setUploadErrors(["Enter a title or slug before uploading images."]);
      return;
    }

    const { accepted, rejectedExcess } = planGalleryFileBatch(
      files,
      itemsRef.current.length
    );

    if (rejectedExcess.length > 0) {
      setUploadErrors((current) => [
        ...current,
        ...rejectedExcess.map(
          (rejection) => `${rejection.fileName}: ${rejection.message}`
        ),
      ]);
    }

    if (accepted.length === 0) {
      return;
    }

    setIsBatchUploading(true);
    setUploadingFileKeys(new Set(accepted.map((file) => fileKey(file))));

    try {
      await uploadGalleryFiles(accepted, {
        experienceSlug,
        startingGalleryCount: itemsRef.current.length,
        createSignedUpload: createExperienceMediaUploadAction,
        uploadToSignedUrl: uploadSignedFile,
        onFileComplete: (result, file) => {
          handleUploadResult(result, file);
        },
      });
    } catch (caught) {
      setUploadErrors((current) => [
        ...current,
        caught instanceof Error ? caught.message : "Gallery upload failed.",
      ]);
    } finally {
      setIsBatchUploading(false);
      setUploadingFileKeys(new Set());
    }
  }

  async function handleFiles(files: FileList | null) {
    const fileArray = fileListToFiles(files);
    await processGalleryFiles(fileArray);
  }

  async function retryFailedUploads() {
    const filesToRetry = [...retryFiles];
    setRetryFiles([]);
    await processGalleryFiles(filesToRetry);
  }

  return (
    <div className="space-y-4">
      {!slugReady && (
        <p className="rounded-lg border border-border/60 bg-card/30 px-4 py-3 text-sm text-muted-foreground">
          Enter a title or slug before uploading images.
        </p>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          {items.length} / {MAX_GALLERY_IMAGES} images
          {uploadingFileKeys.size > 0 && (
            <span className="ml-2 text-luxury-gold-soft">
              Uploading {uploadingFileKeys.size} file
              {uploadingFileKeys.size === 1 ? "" : "s"}…
            </span>
          )}
        </p>
        <div className="flex flex-wrap gap-2">
          <input
            ref={inputRef}
            type="file"
            multiple
            accept="image/jpeg,image/png,image/webp,image/avif"
            className="sr-only"
            disabled={!slugReady || isUploading || remainingSlots === 0}
            onChange={async (event) => {
              await handleFiles(event.target.files);
              event.target.value = "";
            }}
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={!slugReady || isUploading || remainingSlots === 0}
            onClick={() => inputRef.current?.click()}
          >
            {isUploading ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Upload className="size-4" />
            )}
            Upload images
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addExternalItem}
            disabled={remainingSlots === 0}
          >
            <Plus className="size-4" />
            Add external URL
          </Button>
        </div>
      </div>

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
        {items.length === 0 ? (
          <button
            type="button"
            className="flex min-h-32 w-full flex-col items-center justify-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground disabled:cursor-not-allowed"
            disabled={!slugReady || isUploading}
            onClick={() => inputRef.current?.click()}
          >
            <ImageIcon className="size-7 text-luxury-gold-muted" />
            <span>Drop gallery images here or upload files</span>
          </button>
        ) : (
          <div className="space-y-4">
            {items.map((item, index) => (
              <article
                key={`${item.src}-${index}`}
                className="rounded-lg border border-border/60 bg-card/30 p-4"
              >
                <div className="flex flex-col gap-4 lg:flex-row">
                  <div className="shrink-0 overflow-hidden rounded-md border border-border/60 bg-black/20 lg:w-40">
                    {item.src ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.src}
                        alt={item.alt || "Gallery preview"}
                        className="h-32 w-full object-cover lg:h-28"
                      />
                    ) : (
                      <div className="flex h-32 items-center justify-center text-xs text-muted-foreground lg:h-28">
                        No image URL
                      </div>
                    )}
                  </div>

                  <div className="min-w-0 flex-1 space-y-3">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                      <span className="rounded-full border border-border/60 px-2 py-1">
                        {getImageSourceLabel(item.src)}
                      </span>
                      <span>Image {index + 1}</span>
                    </div>

                    <Input
                      type="url"
                      value={item.src}
                      placeholder="https://..."
                      onChange={(event) =>
                        patchItem(index, { src: event.target.value })
                      }
                    />
                    <Input
                      value={item.alt}
                      placeholder="Alt text"
                      onChange={(event) =>
                        patchItem(index, { alt: event.target.value })
                      }
                    />
                    {fieldErrors?.[`gallery.${index}.alt`] && (
                      <p className="text-sm text-destructive">
                        {fieldErrors[`gallery.${index}.alt`]}
                      </p>
                    )}
                    {fieldErrors?.[`gallery.${index}.src`] && (
                      <p className="text-sm text-destructive">
                        {fieldErrors[`gallery.${index}.src`]}
                      </p>
                    )}

                    <div className="flex flex-wrap gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="icon-sm"
                        disabled={index === 0}
                        aria-label={`Move image ${index + 1} up`}
                        onClick={() => moveItem(index, -1)}
                      >
                        <ArrowUp className="size-4" />
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon-sm"
                        disabled={index === items.length - 1}
                        aria-label={`Move image ${index + 1} down`}
                        onClick={() => moveItem(index, 1)}
                      >
                        <ArrowDown className="size-4" />
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeItem(index)}
                      >
                        <Trash2 className="size-4" />
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {uploadErrors.length > 0 && (
        <div className="space-y-2">
          {uploadErrors.map((message, index) => (
            <p
              key={`${message}-${index}`}
              role="alert"
              className="text-sm text-destructive"
            >
              {message}
            </p>
          ))}
          <div className="flex flex-wrap gap-2">
            {retryFiles.length > 0 && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={isUploading || !slugReady}
                onClick={retryFailedUploads}
              >
                Retry failed uploads ({retryFiles.length})
              </Button>
            )}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                setUploadErrors([]);
                setRetryFiles([]);
              }}
            >
              Dismiss errors
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
