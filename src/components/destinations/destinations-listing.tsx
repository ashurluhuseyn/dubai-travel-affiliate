"use client";

import { useCallback, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { DestinationGrid } from "@/components/destinations/destination-grid";
import { DestinationsEmptyState } from "@/components/destinations/destinations-empty-state";
import { DestinationsHero } from "@/components/destinations/destinations-hero";
import { DestinationsPagination } from "@/components/destinations/destinations-pagination";
import { DestinationsStats } from "@/components/destinations/destinations-stats";
import { ExpertsCta } from "@/components/destinations/experts-cta";
import { FilterSidebar } from "@/components/destinations/filter-sidebar";
import { ResultsToolbar } from "@/components/destinations/results-toolbar";
import { Container } from "@/components/shared/container";
import {
  getDestinationExperiences,
  getDestinationFilters,
  getSortOptions,
  type DestinationsFilterState,
} from "@/data";
import {
  filterExperiences,
  filtersToSearchParams,
  hasActiveFilters,
  parseFiltersFromSearchParams,
  sortExperiences,
} from "@/lib/destinations-filters";

const TOTAL_PAGES = 8;

function getToggledId(previous: string[], next: string[]): string | undefined {
  const added = next.find((id) => !previous.includes(id));
  if (added) return added;
  return previous.find((id) => !next.includes(id));
}

function toggleWithDefault(
  selected: string[],
  id: string,
  defaultId: string
): string[] {
  if (id === defaultId) return [defaultId];
  const withoutDefault = selected.filter((value) => value !== defaultId);
  const next = withoutDefault.includes(id)
    ? withoutDefault.filter((value) => value !== id)
    : [...withoutDefault, id];
  return next.length === 0 ? [defaultId] : next;
}

function toggleSingleSelect(
  selected: string[],
  id: string,
  defaultId: string
): string[] {
  if (id === defaultId) return [defaultId];
  return selected.includes(id) && selected.length === 1 ? [defaultId] : [id];
}

function normalizeMultiSelect(
  previous: string[],
  next: string[],
  defaultId: string
): string[] {
  const toggledId = getToggledId(previous, next);
  if (!toggledId) return previous;
  return toggleWithDefault(previous, toggledId, defaultId);
}

export function DestinationsListing() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const allExperiences = getDestinationExperiences();
  const filterConfig = getDestinationFilters();
  const sortOptions = getSortOptions();

  const filters = useMemo(
    () => parseFiltersFromSearchParams(searchParams),
    [searchParams]
  );

  const updateFilters = useCallback(
    (patch: Partial<DestinationsFilterState>) => {
      const next = { ...filters, ...patch };
      const params = filtersToSearchParams(next);
      const query = params.toString();
      router.replace(query ? `/destinations?${query}` : "/destinations", {
        scroll: false,
      });
    },
    [filters, router]
  );

  const clearFilters = useCallback(() => {
    router.replace("/destinations", { scroll: false });
  }, [router]);

  const filteredExperiences = useMemo(() => {
    const filtered = filterExperiences(allExperiences, filters);
    return sortExperiences(filtered, filters.sort);
  }, [allExperiences, filters]);

  const activeFilters = hasActiveFilters(filters);

  const handleListChange = (
    key: keyof DestinationsFilterState,
    previous: string[],
    next: string[],
    defaultId: string,
    mode: "multi" | "single" = "multi",
    clearShowcase = false
  ) => {
    const toggledId = getToggledId(previous, next);
    if (!toggledId) return;

    const value =
      mode === "single"
        ? toggleSingleSelect(previous, toggledId, defaultId)
        : normalizeMultiSelect(previous, next, defaultId);

    updateFilters({
      [key]: value,
      ...(clearShowcase ? { showcaseCategory: null } : {}),
    } as Partial<DestinationsFilterState>);
  };

  return (
    <>
      <DestinationsHero
        key={filters.q}
        initialQuery={filters.q}
        onSearchSubmit={(q) => updateFilters({ q })}
      />
      <DestinationsStats />

      <Container className="py-section">
        <div className="grid gap-8 lg:grid-cols-[300px_minmax(0,1fr)]">
          <FilterSidebar
            filters={filterConfig}
            state={filters}
            resultsCount={filteredExperiences.length}
            onClearFilters={clearFilters}
            onCategoriesChange={(next) =>
              handleListChange(
                "categories",
                filters.categories,
                next,
                "all",
                "multi",
                true
              )
            }
            onPriceChange={([priceMin, priceMax]) =>
              updateFilters({ priceMin, priceMax })
            }
            onDurationsChange={(next) =>
              handleListChange("durations", filters.durations, next, "any")
            }
            onRatingsChange={(next) =>
              handleListChange("ratings", filters.ratings, next, "any", "single")
            }
            onAvailabilityChange={(next) =>
              handleListChange(
                "availability",
                filters.availability,
                next,
                "any",
                "single"
              )
            }
            onInstantChange={(next) =>
              handleListChange(
                "instantConfirmation",
                filters.instantConfirmation,
                next,
                "any",
                "single"
              )
            }
            onLanguagesChange={(next) =>
              handleListChange("languages", filters.languages, next, "any")
            }
            onGroupSizesChange={(next) =>
              handleListChange(
                "groupSizes",
                filters.groupSizes,
                next,
                "any",
                "single"
              )
            }
            onTourTypesChange={(next) =>
              handleListChange("tourTypes", filters.tourTypes, next, "all")
            }
            onPickupChange={(next) =>
              handleListChange("pickup", filters.pickup, next, "any", "single")
            }
            onCancellationChange={(next) =>
              handleListChange(
                "cancellation",
                filters.cancellation,
                next,
                "any",
                "single"
              )
            }
          />

          <div>
            <ResultsToolbar
              resultsCount={filteredExperiences.length}
              sortOptions={sortOptions}
              sort={filters.sort}
              onSortChange={(sort) => updateFilters({ sort })}
            />

            <div className="mt-6">
              {filteredExperiences.length > 0 ? (
                <DestinationGrid experiences={filteredExperiences} />
              ) : (
                <DestinationsEmptyState onClearFilters={clearFilters} />
              )}
            </div>

            {filteredExperiences.length > 0 && !activeFilters && (
              <DestinationsPagination totalPages={TOTAL_PAGES} />
            )}
          </div>
        </div>
      </Container>

      <ExpertsCta />
    </>
  );
}
