"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { deleteExperienceAction } from "@/app/admin/(protected)/experiences/actions";
import { Button } from "@/components/ui/button";

type ExperienceDeleteButtonProps = {
  experienceId: string;
  title: string;
  canDelete: boolean;
};

export function ExperienceDeleteButton({
  experienceId,
  title,
  canDelete,
}: ExperienceDeleteButtonProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

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
      const result = await deleteExperienceAction(experienceId);
      if (result.error) {
        setError(result.error);
        return;
      }
      setOpen(false);
      router.refresh();
    });
  };

  return (
    <>
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="text-destructive hover:text-destructive"
        onClick={() => setOpen(true)}
      >
        Delete
      </Button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-experience-title"
            className="w-full max-w-md rounded-xl border border-border/60 bg-card p-6 shadow-xl"
          >
            <h2
              id="delete-experience-title"
              className="font-heading text-lg text-foreground"
            >
              Delete experience?
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              This permanently deletes <strong>{title}</strong> and all of its
              provider offers. This action cannot be undone.
            </p>
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
                disabled={isPending}
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
