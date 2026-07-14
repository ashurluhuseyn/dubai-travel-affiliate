import type { AnalyticsDateRangePreset } from "./analytics-filters";
import { listDateKeysInRange } from "./analytics-filters";
import type { AffiliateClickRow } from "./types";
import {
  addDaysToDateKey,
  ANALYTICS_TIME_ZONE,
  countInstantsInRange,
  formatDateKeyInTimeZone,
  getStartOfDayInTimeZone,
  getStartOfNextDayInTimeZone,
  type TimeRange,
} from "./timezone";

export { ANALYTICS_TIME_ZONE } from "./timezone";

export type AffiliateAnalyticsSummary = {
  rangePreset: AnalyticsDateRangePreset;
  rangeLabel: string;
  selectedRangeClicks: number;
  clicksToday: number;
  clicksLast7Days: number;
  clicksLast30Days: number;
  topExperiences: { key: string; label: string; count: number }[];
  topProviders: { key: string; label: string; count: number }[];
  recentClicks: AffiliateClickRow[];
  recentClicksPagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
  dailyClicks: { date: string; count: number }[];
};

type AggregateOptions = {
  now?: Date;
  timeZone?: string;
  rangeWindow: TimeRange;
  rangePreset: AnalyticsDateRangePreset;
  rangeLabel: string;
  selectedRangeClicks: number;
  recentClicks: AffiliateClickRow[];
  recentClicksTotal: number;
  page: number;
  pageSize: number;
};

function countClicksInRange(
  clicks: AffiliateClickRow[],
  range: TimeRange
): number {
  return countInstantsInRange(
    clicks.map((click) => new Date(click.clicked_at)),
    range
  );
}

function topCounts(
  clicks: AffiliateClickRow[],
  keySelector: (click: AffiliateClickRow) => string,
  labelSelector: (click: AffiliateClickRow) => string,
  limit = 5
) {
  const counts = new Map<string, { label: string; count: number }>();

  for (const click of clicks) {
    const key = keySelector(click);
    if (!key) continue;

    const existing = counts.get(key);
    if (existing) {
      existing.count += 1;
    } else {
      counts.set(key, { label: labelSelector(click), count: 1 });
    }
  }

  return [...counts.entries()]
    .map(([key, value]) => ({ key, label: value.label, count: value.count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}

/** Start of the 30-day reporting window in UTC for unfiltered dashboard queries. */
export function getAffiliateAnalyticsQueryStart(
  now = new Date(),
  timeZone = ANALYTICS_TIME_ZONE
): Date {
  const todayKey = formatDateKeyInTimeZone(now, timeZone);
  return addDaysToDateKey(todayKey, -29, timeZone);
}

export function aggregateAffiliateAnalyticsFromClicks(
  clicks: AffiliateClickRow[],
  options: AggregateOptions
): AffiliateAnalyticsSummary {
  const {
    now = new Date(),
    timeZone = ANALYTICS_TIME_ZONE,
    rangeWindow,
    rangePreset,
    rangeLabel,
    selectedRangeClicks,
    recentClicks,
    recentClicksTotal,
    page,
    pageSize,
  } = options;

  const todayStart = getStartOfDayInTimeZone(now, timeZone);
  const todayEnd = getStartOfNextDayInTimeZone(now, timeZone);
  const todayKey = formatDateKeyInTimeZone(now, timeZone);
  const sevenDaysStart = addDaysToDateKey(todayKey, -6, timeZone);
  const thirtyDaysStart = addDaysToDateKey(todayKey, -29, timeZone);

  const dailyMap = new Map<string, number>();
  for (const dateKey of listDateKeysInRange(rangeWindow, timeZone)) {
    dailyMap.set(dateKey, 0);
  }

  for (const click of clicks) {
    const clickedAt = new Date(click.clicked_at);
    const key = formatDateKeyInTimeZone(clickedAt, timeZone);
    if (dailyMap.has(key)) {
      dailyMap.set(key, (dailyMap.get(key) ?? 0) + 1);
    }
  }

  const totalPages = Math.max(1, Math.ceil(recentClicksTotal / pageSize));

  return {
    rangePreset,
    rangeLabel,
    selectedRangeClicks,
    clicksToday: countClicksInRange(clicks, {
      start: todayStart,
      end: todayEnd,
    }),
    clicksLast7Days: countClicksInRange(clicks, {
      start: sevenDaysStart,
      end: todayEnd,
    }),
    clicksLast30Days: countClicksInRange(clicks, {
      start: thirtyDaysStart,
      end: todayEnd,
    }),
    topExperiences: topCounts(
      clicks,
      (click) => click.experience_slug ?? "unknown",
      (click) => click.experience_title ?? click.experience_slug ?? "Unknown"
    ),
    topProviders: topCounts(
      clicks,
      (click) => click.provider_name ?? "unknown",
      (click) => click.provider_name ?? "Unknown"
    ),
    recentClicks,
    recentClicksPagination: {
      page,
      pageSize,
      total: recentClicksTotal,
      totalPages,
    },
    dailyClicks: [...dailyMap.entries()].map(([date, count]) => ({ date, count })),
  };
}

export function aggregateAffiliateAnalytics(
  clicks: AffiliateClickRow[],
  now = new Date(),
  timeZone = ANALYTICS_TIME_ZONE
): AffiliateAnalyticsSummary {
  const todayKey = formatDateKeyInTimeZone(now, timeZone);
  const rangeWindow = {
    start: addDaysToDateKey(todayKey, -29, timeZone),
    end: getStartOfNextDayInTimeZone(now, timeZone),
  };

  return aggregateAffiliateAnalyticsFromClicks(clicks, {
    now,
    timeZone,
    rangeWindow,
    rangePreset: "30d",
    rangeLabel: "Last 30 days",
    selectedRangeClicks: countClicksInRange(clicks, rangeWindow),
    recentClicks: [...clicks]
      .sort(
        (a, b) =>
          new Date(b.clicked_at).getTime() - new Date(a.clicked_at).getTime()
      )
      .slice(0, 20),
    recentClicksTotal: clicks.length,
    page: 1,
    pageSize: 20,
  });
}
