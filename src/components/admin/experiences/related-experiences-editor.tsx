"use client";

import { ChevronDown, ChevronUp, Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { ExperienceListItem } from "@/lib/cms/types/database";

type RelatedExperiencesEditorProps = {
  selectedSlugs: string[];
  currentSlug?: string;
  options: Pick<ExperienceListItem, "slug" | "title" | "status">[];
  onChange: (slugs: string[]) => void;
};

function moveItem(values: string[], index: number, direction: -1 | 1): string[] {
  const targetIndex = index + direction;
  if (targetIndex < 0 || targetIndex >= values.length) {
    return values;
  }

  const next = [...values];
  [next[index], next[targetIndex]] = [next[targetIndex], next[index]];
  return next;
}

export function RelatedExperiencesEditor({
  selectedSlugs,
  currentSlug,
  options,
  onChange,
}: RelatedExperiencesEditorProps) {
  const selectedSet = new Set(selectedSlugs);
  const selectableOptions = options.filter(
    (option) =>
      option.slug !== currentSlug &&
      !selectedSet.has(option.slug)
  );

  return (
    <div className="space-y-3">
      <p className="text-sm font-medium">Related experiences</p>
      <p className="text-xs text-muted-foreground">
        Ordered list of related experience slugs shown on the public detail page.
      </p>

      {selectedSlugs.length === 0 && (
        <p className="text-sm text-muted-foreground">No related experiences selected.</p>
      )}

      {selectedSlugs.map((slug, index) => {
        const option = options.find((item) => item.slug === slug);
        return (
          <div
            key={`${slug}-${index}`}
            className="flex flex-wrap items-center gap-2 rounded-lg border border-border/50 p-3"
          >
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-foreground">
                {option?.title ?? slug}
              </p>
              <p className="text-xs text-muted-foreground">{slug}</p>
            </div>
            <div className="flex items-center gap-1">
              <Button
                type="button"
                variant="outline"
                size="icon-sm"
                onClick={() => onChange(moveItem(selectedSlugs, index, -1))}
                disabled={index === 0}
                aria-label="Move related experience up"
              >
                <ChevronUp className="size-4" />
              </Button>
              <Button
                type="button"
                variant="outline"
                size="icon-sm"
                onClick={() => onChange(moveItem(selectedSlugs, index, 1))}
                disabled={index === selectedSlugs.length - 1}
                aria-label="Move related experience down"
              >
                <ChevronDown className="size-4" />
              </Button>
              <Button
                type="button"
                variant="outline"
                size="icon-sm"
                onClick={() =>
                  onChange(selectedSlugs.filter((_, itemIndex) => itemIndex !== index))
                }
                aria-label="Remove related experience"
              >
                <Trash2 className="size-4" />
              </Button>
            </div>
          </div>
        );
      })}

      <div className="flex flex-wrap items-center gap-2">
        <select
          className="h-9 min-w-[16rem] flex-1 rounded-md border border-input bg-transparent px-2.5 text-sm"
          defaultValue=""
          onChange={(event) => {
            const slug = event.target.value;
            if (!slug || selectedSet.has(slug) || slug === currentSlug) {
              return;
            }
            onChange([...selectedSlugs, slug]);
            event.currentTarget.value = "";
          }}
        >
          <option value="">Add related experience…</option>
          {selectableOptions.map((option) => (
            <option key={option.slug} value={option.slug}>
              {option.title} ({option.slug})
            </option>
          ))}
        </select>
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={selectableOptions.length === 0}
          onClick={() => {
            const next = selectableOptions[0];
            if (!next) return;
            onChange([...selectedSlugs, next.slug]);
          }}
        >
          <Plus className="size-4" />
          Add first available
        </Button>
      </div>
    </div>
  );
}
