import type { AffiliateAnalyticsSummary } from "@/lib/affiliate-tracking/analytics";
import { ANALYTICS_TIME_ZONE } from "@/lib/affiliate-tracking/analytics";
import type { AnalyticsFilterValues } from "@/lib/affiliate-tracking/analytics-filters";
import { dateKeyToRepresentativeInstant } from "@/lib/affiliate-tracking/timezone";

import { AnalyticsPagination } from "./analytics-pagination";

type AnalyticsSummaryProps = {
  summary: AffiliateAnalyticsSummary;
};

function formatDateTime(value: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: ANALYTICS_TIME_ZONE,
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function formatDayLabel(value: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: ANALYTICS_TIME_ZONE,
    month: "short",
    day: "numeric",
  }).format(dateKeyToRepresentativeInstant(value, ANALYTICS_TIME_ZONE));
}

export function AnalyticsSummaryCards({ summary }: AnalyticsSummaryProps) {
  const cards = [
    { label: summary.rangeLabel, value: summary.selectedRangeClicks },
    { label: "Clicks today", value: summary.clicksToday },
    { label: "Last 7 days", value: summary.clicksLast7Days },
    { label: "Last 30 days", value: summary.clicksLast30Days },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <article
          key={card.label}
          className="rounded-xl border border-border/60 bg-card/40 p-5"
        >
          <p className="text-xs font-medium uppercase tracking-wide text-luxury-gold-muted">
            {card.label}
          </p>
          <p className="mt-2 font-heading text-3xl text-foreground">{card.value}</p>
        </article>
      ))}
    </div>
  );
}

export function DailyClicksChart({ summary }: AnalyticsSummaryProps) {
  const maxCount = Math.max(...summary.dailyClicks.map((day) => day.count), 1);

  return (
    <section className="rounded-xl border border-border/60 bg-card/40 p-6">
      <h2 className="font-heading text-lg text-foreground">
        Daily clicks ({summary.rangeLabel.toLowerCase()})
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Timezone: {ANALYTICS_TIME_ZONE}
      </p>
      <div className="mt-6 flex h-48 items-end gap-1 overflow-x-auto">
        {summary.dailyClicks.map((day) => (
          <div key={day.date} className="flex min-w-0 flex-1 flex-col items-center gap-2">
            <div
              className="w-full rounded-t bg-luxury-gold/70"
              style={{
                height: `${Math.max((day.count / maxCount) * 100, day.count > 0 ? 8 : 2)}%`,
              }}
              title={`${formatDayLabel(day.date)}: ${day.count}`}
            />
            <span className="hidden text-[10px] text-muted-foreground sm:block">
              {formatDayLabel(day.date)}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

export function TopLists({ summary }: AnalyticsSummaryProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <section className="rounded-xl border border-border/60 bg-card/40 p-6">
        <h2 className="font-heading text-lg text-foreground">Top experiences</h2>
        {summary.topExperiences.length === 0 ? (
          <p className="mt-4 text-sm text-muted-foreground">
            No matching clicks in this range.
          </p>
        ) : (
          <ul className="mt-4 space-y-3">
            {summary.topExperiences.map((item) => (
              <li
                key={item.key}
                className="flex items-center justify-between gap-3 text-sm"
              >
                <span className="truncate text-foreground">{item.label}</span>
                <span className="shrink-0 text-muted-foreground">{item.count}</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="rounded-xl border border-border/60 bg-card/40 p-6">
        <h2 className="font-heading text-lg text-foreground">Top providers</h2>
        {summary.topProviders.length === 0 ? (
          <p className="mt-4 text-sm text-muted-foreground">
            No matching clicks in this range.
          </p>
        ) : (
          <ul className="mt-4 space-y-3">
            {summary.topProviders.map((item) => (
              <li
                key={item.key}
                className="flex items-center justify-between gap-3 text-sm"
              >
                <span className="truncate text-foreground">{item.label}</span>
                <span className="shrink-0 text-muted-foreground">{item.count}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

type RecentClicksTableProps = AnalyticsSummaryProps & {
  filters: AnalyticsFilterValues;
};

export function RecentClicksTable({
  summary,
  filters,
}: RecentClicksTableProps) {
  const { recentClicksPagination: pagination } = summary;

  return (
    <section className="rounded-xl border border-border/60 bg-card/40 p-6">
      <h2 className="font-heading text-lg text-foreground">Recent clicks</h2>
      {summary.recentClicks.length === 0 ? (
        <p className="mt-4 text-sm text-muted-foreground">
          No clicks match the current filters.
        </p>
      ) : (
        <>
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="pb-3 pr-4 font-medium">Time</th>
                  <th className="pb-3 pr-4 font-medium">Experience</th>
                  <th className="pb-3 pr-4 font-medium">Provider</th>
                  <th className="pb-3 pr-4 font-medium">Source</th>
                </tr>
              </thead>
              <tbody>
                {summary.recentClicks.map((click) => (
                  <tr key={click.id} className="border-t border-border/40">
                    <td className="py-3 pr-4 whitespace-nowrap text-muted-foreground">
                      {formatDateTime(click.clicked_at)}
                    </td>
                    <td className="py-3 pr-4">{click.experience_title ?? "—"}</td>
                    <td className="py-3 pr-4">{click.provider_name ?? "—"}</td>
                    <td className="py-3 pr-4 text-muted-foreground">
                      {click.source_path ?? "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <AnalyticsPagination
            filters={filters}
            page={pagination.page}
            totalPages={pagination.totalPages}
            total={pagination.total}
          />
        </>
      )}
    </section>
  );
}

export function AnalyticsEmptyState() {
  return (
    <div className="rounded-xl border border-border/60 bg-card/40 p-8 text-center">
      <h2 className="font-heading text-xl text-foreground">No affiliate clicks yet</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Tracked clicks appear here after visitors use Check Availability on a CMS
        provider card.
      </p>
    </div>
  );
}

export function AnalyticsFilteredEmptyState({
  rangeLabel,
}: {
  rangeLabel: string;
}) {
  return (
    <div className="rounded-xl border border-border/60 bg-card/40 p-8 text-center">
      <h2 className="font-heading text-xl text-foreground">No matching clicks</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        No affiliate clicks match the current filters for {rangeLabel.toLowerCase()}.
        Try widening the date range or clearing filters.
      </p>
    </div>
  );
}

export function AnalyticsErrorState({ message }: { message: string }) {
  return (
    <div
      role="alert"
      className="rounded-xl border border-destructive/40 bg-destructive/10 p-6 text-sm text-destructive"
    >
      {message}
    </div>
  );
}
