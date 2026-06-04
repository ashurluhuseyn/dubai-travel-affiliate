"use client";

import { useState } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import type { FilterOption } from "@/data";
import { cn } from "@/lib/utils";

type FilterCheckboxGroupProps = {
  /** Unique namespace so checkbox ids don't collide across groups */
  name: string;
  options: FilterOption[];
  defaultSelected?: string[];
};

export function FilterCheckboxGroup({
  name,
  options,
  defaultSelected = [],
}: FilterCheckboxGroupProps) {
  const [selected, setSelected] = useState<string[]>(defaultSelected);

  const toggle = (id: string) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((value) => value !== id) : [...prev, id]
    );

  return (
    <div className="flex flex-col gap-3">
      {options.map((option) => {
        const inputId = `${name}-${option.id}`;
        const checked = selected.includes(option.id);

        return (
          <div key={option.id} className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <Checkbox
                id={inputId}
                checked={checked}
                onCheckedChange={() => toggle(option.id)}
              />
              <label
                htmlFor={inputId}
                className={cn(
                  "cursor-pointer text-sm transition-luxury",
                  checked ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {option.label}
              </label>
            </div>
            {option.count > 0 && (
              <span className="text-xs text-luxury-white-subtle">
                {option.count.toLocaleString()}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
