"use client";

import { useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { SortOption } from "@/data";

type ResultsToolbarProps = {
  resultsCount: number;
  sortOptions: SortOption[];
};

export function ResultsToolbar({
  resultsCount,
  sortOptions,
}: ResultsToolbarProps) {
  const [sort, setSort] = useState(sortOptions[0]?.id ?? "");

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-muted-foreground">
        Showing{" "}
        <span className="font-medium text-foreground">{resultsCount}</span>{" "}
        experiences
      </p>
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Sort by:</span>
        <Select value={sort} onValueChange={setSort}>
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
