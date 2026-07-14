import {
  addDaysToDateKey,
  ANALYTICS_TIME_ZONE,
  dateKeyToStartOfDayUtc,
  formatDateKeyInTimeZone,
  getStartOfDayInTimeZone,
  getStartOfNextDayInTimeZone,
  type TimeRange,
} from "./timezone";

export type AnalyticsDateRangePreset = "today" | "7d" | "30d" | "custom";

export const DEFAULT_ANALYTICS_RANGE: AnalyticsDateRangePreset = "30d";
export const ANALYTICS_RECENT_PAGE_SIZE = 20;
export const MAX_CUSTOM_RANGE_DAYS = 366;

const DATE_KEY_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const EXPERIENCE_SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export type AnalyticsFilterValues = {
  range: AnalyticsDateRangePreset;
  customFrom: string | null;
  customTo: string | null;
  experienceSlug: string | null;
  providerName: string | null;
  sourcePath: string | null;
  utmSource: string | null;
  utmCampaign: string | null;
  page: number;
};

export type ResolvedAnalyticsFilters = AnalyticsFilterValues & {
  rangeWindow: TimeRange;
  rangeLabel: string;
};

export type AnalyticsFilterOptions = {
  experiences: { slug: string; title: string }[];
  providers: string[];
  sourcePaths: string[];
  utmSources: string[];
  utmCampaigns: string[];
};

function sanitizeText(
  value: string | null | undefined,
  maxLength: number
): string | null {
  if (value == null) {
    return null;
  }

  const trimmed = value.trim().replace(/[\u0000-\u001F\u007F]/g, "");
  if (!trimmed) {
    return null;
  }

  return trimmed.slice(0, maxLength);
}

function parseRangePreset(value: string | null | undefined): AnalyticsDateRangePreset {
  switch (value) {
    case "today":
    case "7d":
    case "30d":
    case "custom":
      return value;
    default:
      return DEFAULT_ANALYTICS_RANGE;
  }
}

function parsePage(value: string | null | undefined): number {
  const parsed = Number.parseInt(value ?? "1", 10);
  if (!Number.isFinite(parsed) || parsed < 1) {
    return 1;
  }

  return parsed;
}

function isValidDateKey(value: string): boolean {
  if (!DATE_KEY_PATTERN.test(value)) {
    return false;
  }

  const [year, month, day] = value.split("-").map(Number);
  const probe = new Date(Date.UTC(year, month - 1, day));
  return (
    probe.getUTCFullYear() === year &&
    probe.getUTCMonth() === month - 1 &&
    probe.getUTCDate() === day
  );
}

function daysBetweenDateKeys(from: string, to: string): number {
  const [fromYear, fromMonth, fromDay] = from.split("-").map(Number);
  const [toYear, toMonth, toDay] = to.split("-").map(Number);
  const fromMs = Date.UTC(fromYear, fromMonth - 1, fromDay);
  const toMs = Date.UTC(toYear, toMonth - 1, toDay);
  return Math.floor((toMs - fromMs) / (24 * 60 * 60 * 1000)) + 1;
}

export function listDateKeysInRange(
  range: TimeRange,
  timeZone = ANALYTICS_TIME_ZONE
): string[] {
  const keys: string[] = [];
  let cursor = formatDateKeyInTimeZone(range.start, timeZone);
  const lastKey = formatDateKeyInTimeZone(
    new Date(range.end.getTime() - 1),
    timeZone
  );

  while (cursor <= lastKey) {
    keys.push(cursor);
    if (cursor === lastKey) {
      break;
    }
    cursor = formatDateKeyInTimeZone(
      addDaysToDateKey(cursor, 1, timeZone),
      timeZone
    );
  }

  return keys;
}

export function getRangeLabel(
  preset: AnalyticsDateRangePreset,
  customFrom: string | null,
  customTo: string | null
): string {
  switch (preset) {
    case "today":
      return "Today";
    case "7d":
      return "Last 7 days";
    case "30d":
      return "Last 30 days";
    case "custom":
      if (customFrom && customTo) {
        return `${customFrom} to ${customTo}`;
      }
      return "Custom range";
    default:
      return "Last 30 days";
  }
}

export function resolveAnalyticsDateRange(
  filters: Pick<
    AnalyticsFilterValues,
    "range" | "customFrom" | "customTo"
  >,
  now = new Date(),
  timeZone = ANALYTICS_TIME_ZONE
): TimeRange {
  const todayKey = formatDateKeyInTimeZone(now, timeZone);
  const todayEnd = getStartOfNextDayInTimeZone(now, timeZone);

  switch (filters.range) {
    case "today":
      return {
        start: getStartOfDayInTimeZone(now, timeZone),
        end: todayEnd,
      };
    case "7d":
      return {
        start: addDaysToDateKey(todayKey, -6, timeZone),
        end: todayEnd,
      };
    case "custom": {
      const from = filters.customFrom;
      const to = filters.customTo;
      if (!from || !to || !isValidDateKey(from) || !isValidDateKey(to)) {
        return {
          start: addDaysToDateKey(todayKey, -29, timeZone),
          end: todayEnd,
        };
      }

      if (from > to || daysBetweenDateKeys(from, to) > MAX_CUSTOM_RANGE_DAYS) {
        return {
          start: addDaysToDateKey(todayKey, -29, timeZone),
          end: todayEnd,
        };
      }

      return {
        start: dateKeyToStartOfDayUtc(from, timeZone),
        end: addDaysToDateKey(to, 1, timeZone),
      };
    }
    case "30d":
    default:
      return {
        start: addDaysToDateKey(todayKey, -29, timeZone),
        end: todayEnd,
      };
  }
}

export function parseAnalyticsSearchParams(
  searchParams: Record<string, string | string[] | undefined>
): AnalyticsFilterValues {
  const read = (key: string) => {
    const value = searchParams[key];
    return Array.isArray(value) ? value[0] : value;
  };

  const range = parseRangePreset(read("range"));
  const customFromRaw = sanitizeText(read("from"), 10);
  const customToRaw = sanitizeText(read("to"), 10);
  const experienceRaw = sanitizeText(read("experience"), 120);
  const providerRaw = sanitizeText(read("provider"), 100);
  const sourceRaw = sanitizeText(read("source"), 500);
  const utmSourceRaw = sanitizeText(read("utm_source"), 100);
  const utmCampaignRaw = sanitizeText(read("utm_campaign"), 100);

  const customFrom =
    customFromRaw && isValidDateKey(customFromRaw) ? customFromRaw : null;
  const customTo =
    customToRaw && isValidDateKey(customToRaw) ? customToRaw : null;

  const experienceSlug =
    experienceRaw && EXPERIENCE_SLUG_PATTERN.test(experienceRaw)
      ? experienceRaw
      : null;

  return {
    range: range === "custom" && (!customFrom || !customTo) ? DEFAULT_ANALYTICS_RANGE : range,
    customFrom,
    customTo,
    experienceSlug,
    providerName: providerRaw,
    sourcePath: sourceRaw,
    utmSource: utmSourceRaw,
    utmCampaign: utmCampaignRaw,
    page: parsePage(read("page")),
  };
}

export function resolveAnalyticsFilters(
  filters: AnalyticsFilterValues,
  now = new Date(),
  timeZone = ANALYTICS_TIME_ZONE
): ResolvedAnalyticsFilters {
  const rangeWindow = resolveAnalyticsDateRange(filters, now, timeZone);

  return {
    ...filters,
    rangeWindow,
    rangeLabel: getRangeLabel(filters.range, filters.customFrom, filters.customTo),
  };
}

export function hasActiveAnalyticsFilters(
  filters: AnalyticsFilterValues
): boolean {
  return (
    filters.range !== DEFAULT_ANALYTICS_RANGE ||
    filters.experienceSlug != null ||
    filters.providerName != null ||
    filters.sourcePath != null ||
    filters.utmSource != null ||
    filters.utmCampaign != null ||
    filters.page > 1
  );
}

export function buildAnalyticsSearchParams(
  filters: AnalyticsFilterValues,
  overrides: Partial<AnalyticsFilterValues> = {}
): URLSearchParams {
  const merged: AnalyticsFilterValues = { ...filters, ...overrides };
  const params = new URLSearchParams();

  if (merged.range !== DEFAULT_ANALYTICS_RANGE) {
    params.set("range", merged.range);
  } else {
    params.set("range", merged.range);
  }

  if (merged.range === "custom") {
    if (merged.customFrom) {
      params.set("from", merged.customFrom);
    }
    if (merged.customTo) {
      params.set("to", merged.customTo);
    }
  }

  if (merged.experienceSlug) {
    params.set("experience", merged.experienceSlug);
  }
  if (merged.providerName) {
    params.set("provider", merged.providerName);
  }
  if (merged.sourcePath) {
    params.set("source", merged.sourcePath);
  }
  if (merged.utmSource) {
    params.set("utm_source", merged.utmSource);
  }
  if (merged.utmCampaign) {
    params.set("utm_campaign", merged.utmCampaign);
  }
  if (merged.page > 1) {
    params.set("page", String(merged.page));
  }

  return params;
}

export function buildAnalyticsHref(
  filters: AnalyticsFilterValues,
  overrides: Partial<AnalyticsFilterValues> = {}
): string {
  const params = buildAnalyticsSearchParams(filters, overrides);
  const query = params.toString();
  return query ? `/admin/analytics?${query}` : "/admin/analytics";
}

export function escapeIlikePattern(value: string): string {
  return value.replace(/[%_\\]/g, "\\$&");
}
