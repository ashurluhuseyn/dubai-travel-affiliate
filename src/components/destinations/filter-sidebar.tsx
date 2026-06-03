import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { getDestinationFilters, getResultsCount } from "@/data";
import { cn } from "@/lib/utils";

import { FilterCheckboxGroup } from "./filter-checkbox-group";
import { FilterSection } from "./filter-section";
import { PriceRangeFilter } from "./price-range-filter";

type FilterSidebarProps = {
  className?: string;
};

export function FilterSidebar({ className }: FilterSidebarProps) {
  const filters = getDestinationFilters();
  const resultsCount = getResultsCount();

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
            defaultSelected={["all"]}
          />
        </FilterSection>

        <FilterSection value="price" title="Price Range">
          <PriceRangeFilter />
        </FilterSection>

        <FilterSection value="duration" title="Duration">
          <FilterCheckboxGroup
            name="duration"
            options={filters.durations}
            defaultSelected={["any"]}
          />
        </FilterSection>

        <FilterSection value="rating" title="Rating">
          <FilterCheckboxGroup
            name="rating"
            options={filters.ratings}
            defaultSelected={["any"]}
          />
        </FilterSection>

        <FilterSection value="availability" title="Availability">
          <FilterCheckboxGroup
            name="availability"
            options={filters.availability}
            defaultSelected={["any"]}
          />
        </FilterSection>

        <FilterSection value="instant" title="Instant Confirmation">
          <FilterCheckboxGroup
            name="instant"
            options={filters.instantConfirmation}
            defaultSelected={["any"]}
          />
        </FilterSection>

        <FilterSection value="language" title="Language">
          <FilterCheckboxGroup
            name="language"
            options={filters.languages}
            defaultSelected={["any"]}
          />
        </FilterSection>

        <FilterSection value="group-size" title="Group Size">
          <FilterCheckboxGroup
            name="group-size"
            options={filters.groupSizes}
            defaultSelected={["any"]}
          />
        </FilterSection>

        <FilterSection value="tour-type" title="Tour Type">
          <FilterCheckboxGroup
            name="tour-type"
            options={filters.tourTypes}
            defaultSelected={["all"]}
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
                  defaultSelected={["any"]}
                />
              </div>
            ))}
          </div>
        </FilterSection>
      </Accordion>

      <Button className="mt-6 w-full rounded-full transition-luxury">
        Show {resultsCount} Results
      </Button>
    </aside>
  );
}
