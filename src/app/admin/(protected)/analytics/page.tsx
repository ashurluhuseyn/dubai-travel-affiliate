import type { Metadata } from "next";

import { AnalyticsFiltersForm } from "@/components/admin/analytics/analytics-filters-form";
import {
  AnalyticsErrorState,
  AnalyticsFilteredEmptyState,
  AnalyticsSummaryCards,
  DailyClicksChart,
  RecentClicksTable,
  TopLists,
} from "@/components/admin/analytics/analytics-panels";
import { AdminPageHeader } from "@/components/admin/layout/admin-page-header";
import {
  parseAnalyticsSearchParams,
  resolveAnalyticsFilters,
} from "@/lib/affiliate-tracking/analytics-filters";
import { requireAdmin } from "@/lib/cms/auth/require-admin";
import { getFilteredAffiliateAnalytics } from "@/lib/cms/repositories/analytics";
import { createServerSupabaseClient } from "@/lib/cms/supabase/server";

export const metadata: Metadata = {
  title: "Analytics",
};

export const dynamic = "force-dynamic";

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function AdminAnalyticsPage({ searchParams }: PageProps) {
  await requireAdmin();

  const rawSearchParams = await searchParams;
  const filters = parseAnalyticsSearchParams(rawSearchParams);
  const resolvedFilters = resolveAnalyticsFilters(filters);

  let summary;
  let filterOptions;
  let errorMessage: string | null = null;

  try {
    const supabase = await createServerSupabaseClient();
    const result = await getFilteredAffiliateAnalytics(supabase, resolvedFilters);
    summary = result.summary;
    filterOptions = result.filterOptions;
  } catch (error) {
    errorMessage =
      error instanceof Error ? error.message : "Unable to load affiliate analytics.";
  }

  if (errorMessage) {
    return (
      <div className="space-y-6">
        <AdminPageHeader title="Analytics" />
        <AnalyticsErrorState message={errorMessage} />
      </div>
    );
  }

  const hasMatchingResults = summary!.selectedRangeClicks > 0;

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Analytics"
        subtitle="Outbound affiliate click totals from the secure /go redirect route. No personal user data is stored."
      />

      <AnalyticsFiltersForm filters={filters} options={filterOptions!} />

      <AnalyticsSummaryCards summary={summary!} />

      {!hasMatchingResults ? (
        <AnalyticsFilteredEmptyState rangeLabel={summary!.rangeLabel} />
      ) : (
        <>
          <DailyClicksChart summary={summary!} />
          <TopLists summary={summary!} />
          <RecentClicksTable summary={summary!} filters={filters} />
        </>
      )}
    </div>
  );
}
