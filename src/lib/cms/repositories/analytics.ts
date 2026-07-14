import type { SupabaseClient } from "@supabase/supabase-js";

import {
  ANALYTICS_RECENT_PAGE_SIZE,
  escapeIlikePattern,
  type AnalyticsFilterOptions,
  type ResolvedAnalyticsFilters,
} from "@/lib/affiliate-tracking/analytics-filters";
import {
  aggregateAffiliateAnalytics,
  aggregateAffiliateAnalyticsFromClicks,
  getAffiliateAnalyticsQueryStart,
} from "@/lib/affiliate-tracking/analytics";
import type { AffiliateClickRow } from "@/lib/affiliate-tracking/types";
import {
  addDaysToDateKey,
  ANALYTICS_TIME_ZONE,
  formatDateKeyInTimeZone,
  getStartOfDayInTimeZone,
  getStartOfNextDayInTimeZone,
  type TimeRange,
} from "@/lib/affiliate-tracking/timezone";

const AGGREGATE_COLUMNS =
  "clicked_at, experience_slug, experience_title, provider_name";
const RECENT_COLUMNS =
  "id, experience_id, provider_id, experience_slug, experience_title, provider_name, source_path, referrer, utm_source, utm_medium, utm_campaign, clicked_at";
const FILTER_OPTION_COLUMNS =
  "experience_slug, experience_title, provider_name, source_path, utm_source, utm_campaign";

function applyDimensionFilters<
  T extends {
    eq(column: string, value: string): T;
    ilike(column: string, pattern: string): T;
  },
>(query: T, filters: ResolvedAnalyticsFilters): T {
  let next = query;

  if (filters.experienceSlug) {
    next = next.eq("experience_slug", filters.experienceSlug);
  }
  if (filters.providerName) {
    next = next.eq("provider_name", filters.providerName);
  }
  if (filters.sourcePath) {
    next = next.ilike(
      "source_path",
      `%${escapeIlikePattern(filters.sourcePath)}%`
    );
  }
  if (filters.utmSource) {
    next = next.eq("utm_source", filters.utmSource);
  }
  if (filters.utmCampaign) {
    next = next.eq("utm_campaign", filters.utmCampaign);
  }

  return next;
}

function applyRangeFilters<
  T extends {
    gte(column: string, value: string): T;
    lt(column: string, value: string): T;
  },
>(query: T, range: TimeRange): T {
  return query
    .gte("clicked_at", range.start.toISOString())
    .lt("clicked_at", range.end.toISOString());
}

async function countClicksInRange(
  supabase: SupabaseClient,
  range: TimeRange,
  filters: ResolvedAnalyticsFilters
): Promise<number> {
  let query = supabase
    .from("affiliate_clicks")
    .select("id", { count: "exact", head: true });

  query = applyRangeFilters(query, range);
  query = applyDimensionFilters(query, filters);

  const { count, error } = await query;
  if (error) {
    throw new Error(error.message);
  }

  return count ?? 0;
}

async function fetchAggregateRows(
  supabase: SupabaseClient,
  range: TimeRange,
  filters: ResolvedAnalyticsFilters
): Promise<AffiliateClickRow[]> {
  let query = supabase.from("affiliate_clicks").select(AGGREGATE_COLUMNS);

  query = applyRangeFilters(query, range);
  query = applyDimensionFilters(query, filters);
  query = query.order("clicked_at", { ascending: false });

  const { data, error } = await query;
  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as AffiliateClickRow[];
}

async function fetchRecentClicksPage(
  supabase: SupabaseClient,
  range: TimeRange,
  filters: ResolvedAnalyticsFilters
): Promise<{ rows: AffiliateClickRow[]; total: number }> {
  const pageSize = ANALYTICS_RECENT_PAGE_SIZE;
  const from = (filters.page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase
    .from("affiliate_clicks")
    .select(RECENT_COLUMNS, { count: "exact" });

  query = applyRangeFilters(query, range);
  query = applyDimensionFilters(query, filters);
  query = query.order("clicked_at", { ascending: false }).range(from, to);

  const { data, count, error } = await query;
  if (error) {
    throw new Error(error.message);
  }

  return {
    rows: (data ?? []) as AffiliateClickRow[],
    total: count ?? 0,
  };
}

function uniqueSorted(values: string[]): string[] {
  return [...new Set(values.filter(Boolean))].sort((a, b) =>
    a.localeCompare(b)
  );
}

export async function fetchAnalyticsFilterOptions(
  supabase: SupabaseClient
): Promise<AnalyticsFilterOptions> {
  const { data, error } = await supabase
    .from("affiliate_clicks")
    .select(FILTER_OPTION_COLUMNS)
    .order("clicked_at", { ascending: false })
    .limit(2000);

  if (error) {
    throw new Error(error.message);
  }

  const rows = data ?? [];
  const experienceMap = new Map<string, string>();

  for (const row of rows) {
    if (row.experience_slug) {
      experienceMap.set(
        row.experience_slug,
        row.experience_title ?? row.experience_slug
      );
    }
  }

  return {
    experiences: [...experienceMap.entries()]
      .map(([slug, title]) => ({ slug, title }))
      .sort((a, b) => a.title.localeCompare(b.title)),
    providers: uniqueSorted(rows.map((row) => row.provider_name ?? "")),
    sourcePaths: uniqueSorted(rows.map((row) => row.source_path ?? "")),
    utmSources: uniqueSorted(rows.map((row) => row.utm_source ?? "")),
    utmCampaigns: uniqueSorted(rows.map((row) => row.utm_campaign ?? "")),
  };
}

export async function fetchAffiliateClicksSince(
  supabase: SupabaseClient,
  since: Date
): Promise<AffiliateClickRow[]> {
  const { data, error } = await supabase
    .from("affiliate_clicks")
    .select("*")
    .gte("clicked_at", since.toISOString())
    .order("clicked_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as AffiliateClickRow[];
}

export async function getFilteredAffiliateAnalytics(
  supabase: SupabaseClient,
  filters: ResolvedAnalyticsFilters,
  now = new Date()
) {
  const timeZone = ANALYTICS_TIME_ZONE;
  const todayEnd = getStartOfNextDayInTimeZone(now, timeZone);
  const todayKey = formatDateKeyInTimeZone(now, timeZone);
  const sevenDaysStart = addDaysToDateKey(todayKey, -6, timeZone);
  const thirtyDaysStart = addDaysToDateKey(todayKey, -29, timeZone);

  const referenceRanges = {
    today: {
      start: getStartOfDayInTimeZone(now, timeZone),
      end: todayEnd,
    },
    sevenDays: {
      start: sevenDaysStart,
      end: todayEnd,
    },
    thirtyDays: {
      start: thirtyDaysStart,
      end: todayEnd,
    },
  };

  const [
    selectedRangeClicks,
    aggregateRows,
    recentPage,
    filterOptions,
    clicksToday,
    clicksLast7Days,
    clicksLast30Days,
  ] = await Promise.all([
    countClicksInRange(supabase, filters.rangeWindow, filters),
    fetchAggregateRows(supabase, filters.rangeWindow, filters),
    fetchRecentClicksPage(supabase, filters.rangeWindow, filters),
    fetchAnalyticsFilterOptions(supabase),
    countClicksInRange(supabase, referenceRanges.today, filters),
    countClicksInRange(supabase, referenceRanges.sevenDays, filters),
    countClicksInRange(supabase, referenceRanges.thirtyDays, filters),
  ]);

  const summary = aggregateAffiliateAnalyticsFromClicks(aggregateRows, {
    now,
    timeZone,
    rangeWindow: filters.rangeWindow,
    rangePreset: filters.range,
    rangeLabel: filters.rangeLabel,
    selectedRangeClicks,
    recentClicks: recentPage.rows,
    recentClicksTotal: recentPage.total,
    page: filters.page,
    pageSize: ANALYTICS_RECENT_PAGE_SIZE,
  });

  return {
    summary: {
      ...summary,
      clicksToday,
      clicksLast7Days,
      clicksLast30Days,
    },
    filterOptions,
  };
}

export async function getAffiliateAnalyticsSummary(supabase: SupabaseClient) {
  const since = getAffiliateAnalyticsQueryStart();

  const clicks = await fetchAffiliateClicksSince(supabase, since);
  return aggregateAffiliateAnalytics(clicks);
}

export async function getAffiliateDashboardSummary(supabase: SupabaseClient) {
  const analytics = await getAffiliateAnalyticsSummary(supabase);
  return {
    clicksToday: analytics.clicksToday,
    clicksLast30Days: analytics.clicksLast30Days,
  };
}
