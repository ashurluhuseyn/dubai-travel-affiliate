"use client";

import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  type AnalyticsFilterOptions,
  type AnalyticsFilterValues,
  DEFAULT_ANALYTICS_RANGE,
  hasActiveAnalyticsFilters,
} from "@/lib/affiliate-tracking/analytics-filters";
import { ANALYTICS_TIME_ZONE } from "@/lib/affiliate-tracking/timezone";
import { cn } from "@/lib/utils";

type AnalyticsFiltersFormProps = {
  filters: AnalyticsFilterValues;
  options: AnalyticsFilterOptions;
};

const selectClassName =
  "flex h-10 w-full rounded-md border border-border/60 bg-card/20 px-3 py-2 text-sm text-foreground outline-none transition-luxury focus-visible:border-luxury-gold-muted/50 focus-visible:ring-2 focus-visible:ring-luxury-gold/20";

function fieldClassName(active: boolean) {
  return cn(
    selectClassName,
    active && "border-luxury-gold-muted/50 bg-luxury-black/30"
  );
}

export function AnalyticsFiltersForm({
  filters,
  options,
}: AnalyticsFiltersFormProps) {
  const [range, setRange] = useState(filters.range);
  const showCustomDates = range === "custom";

  return (
    <section className="rounded-xl border border-border/60 bg-card/40 p-5 md:p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <h2 className="font-heading text-lg text-foreground">Filters</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            All ranges use {ANALYTICS_TIME_ZONE}. Results update server-side.
          </p>
        </div>
        {hasActiveAnalyticsFilters(filters) && (
          <p className="text-xs font-medium uppercase tracking-wide text-luxury-gold-muted">
            Filters active
          </p>
        )}
      </div>

      <form
        method="get"
        action="/admin/analytics"
        className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3"
      >
        <label className="space-y-2">
          <span className="text-sm font-medium text-foreground">Date range</span>
          <select
            name="range"
            value={range}
            onChange={(event) =>
              setRange(event.target.value as AnalyticsFilterValues["range"])
            }
            className={fieldClassName(filters.range !== DEFAULT_ANALYTICS_RANGE)}
          >
            <option value="today">Today</option>
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="custom">Custom range</option>
          </select>
        </label>

        {showCustomDates && (
          <>
            <label className="space-y-2">
              <span className="text-sm font-medium text-foreground">From</span>
              <Input
                type="date"
                name="from"
                defaultValue={filters.customFrom ?? ""}
                className={cn(
                  filters.customFrom &&
                    "border-luxury-gold-muted/50 bg-luxury-black/30"
                )}
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium text-foreground">To</span>
              <Input
                type="date"
                name="to"
                defaultValue={filters.customTo ?? ""}
                className={cn(
                  filters.customTo &&
                    "border-luxury-gold-muted/50 bg-luxury-black/30"
                )}
              />
            </label>
          </>
        )}

        <label className="space-y-2">
          <span className="text-sm font-medium text-foreground">Experience</span>
          <select
            name="experience"
            defaultValue={filters.experienceSlug ?? ""}
            className={fieldClassName(Boolean(filters.experienceSlug))}
          >
            <option value="">All experiences</option>
            {options.experiences.map((experience) => (
              <option key={experience.slug} value={experience.slug}>
                {experience.title}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-foreground">Provider</span>
          <select
            name="provider"
            defaultValue={filters.providerName ?? ""}
            className={fieldClassName(Boolean(filters.providerName))}
          >
            <option value="">All providers</option>
            {options.providers.map((provider) => (
              <option key={provider} value={provider}>
                {provider}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-foreground">Source path</span>
          <Input
            name="source"
            defaultValue={filters.sourcePath ?? ""}
            placeholder="Contains path, e.g. /experiences/"
            className={cn(
              filters.sourcePath &&
                "border-luxury-gold-muted/50 bg-luxury-black/30"
            )}
            list="analytics-source-paths"
          />
          <datalist id="analytics-source-paths">
            {options.sourcePaths.map((sourcePath) => (
              <option key={sourcePath} value={sourcePath} />
            ))}
          </datalist>
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-foreground">UTM source</span>
          <Input
            name="utm_source"
            defaultValue={filters.utmSource ?? ""}
            placeholder="Exact match"
            className={cn(
              filters.utmSource &&
                "border-luxury-gold-muted/50 bg-luxury-black/30"
            )}
            list="analytics-utm-sources"
          />
          <datalist id="analytics-utm-sources">
            {options.utmSources.map((value) => (
              <option key={value} value={value} />
            ))}
          </datalist>
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-foreground">UTM campaign</span>
          <Input
            name="utm_campaign"
            defaultValue={filters.utmCampaign ?? ""}
            placeholder="Exact match"
            className={cn(
              filters.utmCampaign &&
                "border-luxury-gold-muted/50 bg-luxury-black/30"
            )}
            list="analytics-utm-campaigns"
          />
          <datalist id="analytics-utm-campaigns">
            {options.utmCampaigns.map((value) => (
              <option key={value} value={value} />
            ))}
          </datalist>
        </label>

        <div className="flex flex-wrap items-end gap-3 md:col-span-2 xl:col-span-3">
          <Button type="submit" className="min-h-10 rounded-full px-6">
            Apply filters
          </Button>
          <Button
            type="button"
            variant="outline"
            className="min-h-10 rounded-full px-6"
            asChild
          >
            <Link href="/admin/analytics">Reset</Link>
          </Button>
        </div>
      </form>
    </section>
  );
}
