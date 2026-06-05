"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

type DestinationsPaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export function DestinationsPagination({
  page,
  totalPages,
  onPageChange,
}: DestinationsPaginationProps) {
  if (totalPages <= 1) return null;

  const leadingPages = Array.from(
    { length: Math.min(3, totalPages) },
    (_, index) => index + 1
  );
  const showEllipsis = totalPages > 4;
  const showLast = totalPages > 3;

  const baseButton =
    "flex size-9 items-center justify-center rounded-full border text-sm transition-luxury";

  return (
    <nav
      className="mt-10 flex items-center justify-center gap-2"
      aria-label="Pagination"
    >
      <button
        type="button"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        aria-label="Previous page"
        className={cn(
          baseButton,
          "border-border/70 text-muted-foreground hover:border-luxury-gold-muted/40 hover:text-foreground disabled:pointer-events-none disabled:opacity-40"
        )}
      >
        <ChevronLeft className="size-4" />
      </button>

      {leadingPages.map((value) => (
        <button
          key={value}
          type="button"
          onClick={() => onPageChange(value)}
          aria-current={page === value ? "page" : undefined}
          className={cn(
            baseButton,
            page === value
              ? "border-transparent bg-primary text-primary-foreground"
              : "border-border/70 text-muted-foreground hover:border-luxury-gold-muted/40 hover:text-foreground"
          )}
        >
          {value}
        </button>
      ))}

      {showEllipsis && (
        <span className="px-1 text-sm text-muted-foreground">…</span>
      )}

      {showLast && (
        <button
          type="button"
          onClick={() => onPageChange(totalPages)}
          aria-current={page === totalPages ? "page" : undefined}
          className={cn(
            baseButton,
            page === totalPages
              ? "border-transparent bg-primary text-primary-foreground"
              : "border-border/70 text-muted-foreground hover:border-luxury-gold-muted/40 hover:text-foreground"
          )}
        >
          {totalPages}
        </button>
      )}

      <button
        type="button"
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        aria-label="Next page"
        className={cn(
          baseButton,
          "border-border/70 text-muted-foreground hover:border-luxury-gold-muted/40 hover:text-foreground disabled:pointer-events-none disabled:opacity-40"
        )}
      >
        <ChevronRight className="size-4" />
      </button>
    </nav>
  );
}
