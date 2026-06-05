"use client";

import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import type { DestinationFilters, DestinationsFilterState } from "@/data";
import { cn } from "@/lib/utils";

import { FilterCheckboxGroup } from "./filter-checkbox-group";
import { FilterSection } from "./filter-section";
import { PriceRangeFilter } from "./price-range-filter";

type FilterSidebarProps = {
  filters: DestinationFilters;
  state: DestinationsFilterState;
  resultsCount: number;
  onCategoriesChange: (categories: string[]) => void;
  onPriceChange: (range: [number, number]) => void;
  onDurationsChange: (durations: string[]) => void;
  onRatingsChange: (ratings: string[]) => void;
  onAvailabilityChange: (availability: string[]) => void;
  onInstantChange: (instant: string[]) => void;
  onLanguagesChange: (languages: string[]) => void;
  onGroupSizesChange: (groupSizes: string[]) => void;
  onTourTypesChange: (tourTypes: string[]) => void;
  onPickupChange: (pickup: string[]) => void;
  onCancellationChange: (cancellation: string[]) => void;
  onClearFilters: () => void;
  className?: string;
};

export function FilterSidebar({
  filters,
  state,
  resultsCount,
  onCategoriesChange,
  onPriceChange,
  onDurationsChange,
  onRatingsChange,
  onAvailabilityChange,
  onInstantChange,
  onLanguagesChange,
  onGroupSizesChange,
  onTourTypesChange,
  onPickupChange,
  onCancellationChange,
  onClearFilters,
  className,
}: FilterSidebarProps) {
  return (
    <aside
      className={cn(
        "rounded-2xl border border-border/60 bg-card p-5 lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:self-start lg:overflow-y-auto",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-lg text-foreground">Filters</h2>
        <button
          type="button"
          onClick={onClearFilters}
          className="text-xs text-luxury-gold-soft transition-luxury hover:text-luxury-gold"
        >
          Clear All
        </button>
      </div>

      <Accordion
        type="multiple"
        defaultValue={["categories", "price", "duration", "rating"]}
        className="mt-2"
      >
        <FilterSection value="categories" title="Categories">
          <FilterCheckboxGroup
            name="categories"
            options={filters.categories}
            selected={state.categories}
            onChange={onCategoriesChange}
          />
        </FilterSection>

        <FilterSection value="price" title="Price Range">
          <PriceRangeFilter
            range={[state.priceMin, state.priceMax]}
            onChange={onPriceChange}
          />
        </FilterSection>

        <FilterSection value="duration" title="Duration">
          <FilterCheckboxGroup
            name="duration"
            options={filters.durations}
            selected={state.durations}
            onChange={onDurationsChange}
          />
        </FilterSection>

        <FilterSection value="rating" title="Rating">
          <FilterCheckboxGroup
            name="rating"
            options={filters.ratings}
            selected={state.ratings}
            onChange={onRatingsChange}
          />
        </FilterSection>

        <FilterSection value="availability" title="Availability">
          <FilterCheckboxGroup
            name="availability"
            options={filters.availability}
            selected={state.availability}
            onChange={onAvailabilityChange}
          />
        </FilterSection>

        <FilterSection value="instant" title="Instant Confirmation">
          <FilterCheckboxGroup
            name="instant"
            options={filters.instantConfirmation}
            selected={state.instantConfirmation}
            onChange={onInstantChange}
          />
        </FilterSection>

        <FilterSection value="language" title="Language">
          <FilterCheckboxGroup
            name="language"
            options={filters.languages}
            selected={state.languages}
            onChange={onLanguagesChange}
          />
        </FilterSection>

        <FilterSection value="group-size" title="Group Size">
          <FilterCheckboxGroup
            name="group-size"
            options={filters.groupSizes}
            selected={state.groupSizes}
            onChange={onGroupSizesChange}
          />
        </FilterSection>

        <FilterSection value="tour-type" title="Tour Type">
          <FilterCheckboxGroup
            name="tour-type"
            options={filters.tourTypes}
            selected={state.tourTypes}
            onChange={onTourTypesChange}
          />
        </FilterSection>

        <FilterSection value="other" title="Other Filters">
          <div className="flex flex-col gap-5">
            {filters.other.map((group) => (
              <div key={group.id}>
                <p className="mb-3 text-sm font-medium text-foreground">
                  {group.title}
                </p>
                <FilterCheckboxGroup
                  name={group.id}
                  options={group.options}
                  selected={
                    group.id === "pickup" ? state.pickup : state.cancellation
                  }
                  onChange={
                    group.id === "pickup" ? onPickupChange : onCancellationChange
                  }
                />
              </div>
            ))}
          </div>
        </FilterSection>
      </Accordion>

      <Button
        type="button"
        className="mt-6 w-full rounded-full transition-luxury"
        onClick={onClearFilters}
      >
        Show {resultsCount} Results
      </Button>
    </aside>
  );
}
