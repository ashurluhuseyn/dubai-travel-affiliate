"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import {
  deleteCategoryAction,
  getCategoryUsageCountAction,
} from "@/app/admin/(protected)/categories/actions";
import { Button } from "@/components/ui/button";

type CategoryDeleteButtonProps = {
  categoryId: string;
  label: string;
  canDelete: boolean;
};

export function CategoryDeleteButton({
  categoryId,
  label,
  canDelete,
}: CategoryDeleteButtonProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [usageCount, setUsageCount] = useState<number | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!open) return;

    void getCategoryUsageCountAction(categoryId).then((result) => {
      if (result.error) {
        setError(result.error);
        return;
      }
      setUsageCount(result.count);
    });
  }, [open, categoryId]);

  if (!canDelete) {
    return (
      <span className="text-xs text-muted-foreground" title="Super admin only">
        —
      </span>
    );
  }

  const handleDelete = () => {
    startTransition(async () => {
      setError(null);
      const result = await deleteCategoryAction(categoryId);
      if (result.error) {
        setError(result.error);
        return;
      }
      setOpen(false);
      router.refresh();
    });
  };

  const blockedByUsage = usageCount !== null && usageCount > 0;

  return (
    <>
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="text-destructive hover:text-destructive"
        onClick={() => {
          setError(null);
          setUsageCount(null);
          setOpen(true);
        }}
      >
        Delete
      </Button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-category-title"
            className="w-full max-w-md rounded-xl border border-border/60 bg-card p-6 shadow-xl"
          >
            <h2
              id="delete-category-title"
              className="font-heading text-lg text-foreground"
            >
              Delete category?
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              This permanently deletes <strong>{label}</strong>. Experiences
              linked to this category must be reassigned first.
            </p>

            {usageCount === null && !error && (
              <p className="mt-3 text-sm text-muted-foreground">
                Checking linked experiences…
              </p>
            )}

            {usageCount !== null && usageCount > 0 && (
              <p role="alert" className="mt-3 text-sm text-destructive">
                Cannot delete: {usageCount} experience
                {usageCount === 1 ? "" : "s"} use this category. Reassign them
                before deleting.
              </p>
            )}

            {error && (
              <p role="alert" className="mt-3 text-sm text-destructive">
                {error}
              </p>
            )}

            <div className="mt-6 flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button
                type="button"
                variant="destructive"
                onClick={handleDelete}
                disabled={isPending || usageCount === null || blockedByUsage}
              >
                {isPending ? "Deleting…" : "Delete"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
