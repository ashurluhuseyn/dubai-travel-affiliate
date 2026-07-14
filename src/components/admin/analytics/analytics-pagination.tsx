import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  buildAnalyticsHref,
  type AnalyticsFilterValues,
} from "@/lib/affiliate-tracking/analytics-filters";

type AnalyticsPaginationProps = {
  filters: AnalyticsFilterValues;
  page: number;
  totalPages: number;
  total: number;
};

export function AnalyticsPagination({
  filters,
  page,
  totalPages,
  total,
}: AnalyticsPaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const previousHref =
    page > 1 ? buildAnalyticsHref(filters, { page: page - 1 }) : null;
  const nextHref =
    page < totalPages ? buildAnalyticsHref(filters, { page: page + 1 }) : null;

  return (
    <div className="mt-4 flex flex-col gap-3 border-t border-border/40 pt-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-muted-foreground">
        Page {page} of {totalPages} · {total} matching clicks
      </p>
      <div className="flex gap-2">
        {previousHref ? (
          <Button variant="outline" size="sm" className="rounded-full" asChild>
            <Link href={previousHref}>Previous</Link>
          </Button>
        ) : (
          <Button variant="outline" size="sm" className="rounded-full" disabled>
            Previous
          </Button>
        )}
        {nextHref ? (
          <Button variant="outline" size="sm" className="rounded-full" asChild>
            <Link href={nextHref}>Next</Link>
          </Button>
        ) : (
          <Button variant="outline" size="sm" className="rounded-full" disabled>
            Next
          </Button>
        )}
      </div>
    </div>
  );
}
