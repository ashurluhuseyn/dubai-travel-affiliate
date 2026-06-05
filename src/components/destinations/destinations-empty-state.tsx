"use client";

import { SearchX } from "lucide-react";

import { Button } from "@/components/ui/button";

type DestinationsEmptyStateProps = {
  onClearFilters: () => void;
};

export function DestinationsEmptyState({
  onClearFilters,
}: DestinationsEmptyStateProps) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-border/60 bg-card px-6 py-16 text-center">
      <span className="inline-flex size-14 items-center justify-center rounded-full border border-luxury-gold-muted/30 bg-luxury-gold/10 text-luxury-gold">
        <SearchX className="size-6" aria-hidden />
      </span>
      <h2 className="mt-5 font-heading text-2xl text-foreground">
        No experiences found
      </h2>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        Try adjusting your search or filters to discover more Dubai experiences.
      </p>
      <Button
        type="button"
        onClick={onClearFilters}
        className="mt-6 rounded-full transition-luxury"
      >
        Clear Filters
      </Button>
    </div>
  );
}
