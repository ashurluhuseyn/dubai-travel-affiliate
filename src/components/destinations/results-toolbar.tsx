"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { DestinationsSortId, SortOption } from "@/data";

type ResultsToolbarProps = {
  resultsCount: number;
  sortOptions: SortOption[];
  sort: DestinationsSortId;
  onSortChange: (sort: DestinationsSortId) => void;
};

export function ResultsToolbar({
  resultsCount,
  sortOptions,
  sort,
  onSortChange,
}: ResultsToolbarProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-muted-foreground">
        <span className="font-medium text-foreground">{resultsCount}</span>{" "}
        experiences found
      </p>
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Sort by:</span>
        <Select value={sort} onValueChange={(value) => onSortChange(value as DestinationsSortId)}>
          <SelectTrigger className="w-[190px] rounded-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem key={option.id} value={option.id}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
