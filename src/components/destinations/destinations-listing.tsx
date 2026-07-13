"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
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
  getDestinationFilters,
  getSortOptions,
  type DestinationExperience,
  type DestinationsFilterState,
} from "@/data";
import {
  clampPage,
  DESTINATION_GRID_XL_MEDIA,
  destinationPageSize,
  destinationTotalPages,
  paginateResults,
} from "@/lib/destination-pagination";
import {
  filterExperiences,
  filtersToSearchParams,
  parseFiltersFromSearchParams,
  parsePageParam,
  sortExperiences,
} from "@/lib/destinations-filters";

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

function useDestinationPageSize(): number {
  const [pageSize, setPageSize] = useState(6);

  useEffect(() => {
    const media = window.matchMedia(DESTINATION_GRID_XL_MEDIA);
    const update = () => setPageSize(destinationPageSize(media.matches));
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return pageSize;
}

type DestinationsListingProps = {
  experiences: DestinationExperience[];
};

export function DestinationsListing({ experiences }: DestinationsListingProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const allExperiences = experiences;
  const filterConfig = getDestinationFilters();
  const sortOptions = getSortOptions();
  const pageSize = useDestinationPageSize();

  const filters = useMemo(
    () => parseFiltersFromSearchParams(searchParams),
    [searchParams]
  );

  const currentPage = useMemo(
    () => parsePageParam(searchParams),
    [searchParams]
  );

  const navigateWithParams = useCallback(
    (params: URLSearchParams) => {
      const query = params.toString();
      router.replace(query ? `/destinations?${query}` : "/destinations", {
        scroll: false,
      });
    },
    [router]
  );

  const updateFilters = useCallback(
    (patch: Partial<DestinationsFilterState>) => {
      const next = { ...filters, ...patch };
      const params = filtersToSearchParams(next, 1);
      navigateWithParams(params);
    },
    [filters, navigateWithParams]
  );

  const updatePage = useCallback(
    (page: number) => {
      const params = filtersToSearchParams(filters, page);
      navigateWithParams(params);
    },
    [filters, navigateWithParams]
  );

  const clearFilters = useCallback(() => {
    router.replace("/destinations", { scroll: false });
  }, [router]);

  const filteredExperiences = useMemo(() => {
    const filtered = filterExperiences(allExperiences, filters);
    return sortExperiences(filtered, filters.sort);
  }, [allExperiences, filters]);

  const totalPages = destinationTotalPages(
    filteredExperiences.length,
    pageSize
  );

  const page = clampPage(currentPage, totalPages);

  useEffect(() => {
    if (filteredExperiences.length > 0 && currentPage !== page) {
      updatePage(page);
    }
  }, [currentPage, page, filteredExperiences.length, updatePage]);

  const paginatedExperiences = useMemo(
    () => paginateResults(filteredExperiences, page, pageSize),
    [filteredExperiences, page, pageSize]
  );

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
                <DestinationGrid experiences={paginatedExperiences} />
              ) : (
                <DestinationsEmptyState onClearFilters={clearFilters} />
              )}
            </div>

            {filteredExperiences.length > 0 && (
              <DestinationsPagination
                page={page}
                totalPages={totalPages}
                onPageChange={updatePage}
              />
            )}
          </div>
        </div>
      </Container>

      <ExpertsCta />
    </>
  );
}
