"use client";

import { Slider } from "@/components/ui/slider";

const MIN = 0;
const MAX = 2000;

type PriceRangeFilterProps = {
  range: [number, number];
  onChange: (range: [number, number]) => void;
};

export function PriceRangeFilter({ range, onChange }: PriceRangeFilterProps) {
  const formatMax = (value: number) =>
    value >= MAX ? `$${MAX}+` : `$${value}`;

  return (
    <div className="flex flex-col gap-4">
      <Slider
        min={MIN}
        max={MAX}
        step={10}
        value={range}
        onValueChange={(value) => onChange([value[0], value[1]])}
        aria-label="Price range"
      />
      <div className="flex items-center gap-3">
        <div className="flex-1 rounded-lg border border-border/70 bg-luxury-black/30 px-3 py-2">
          <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
            Min
          </p>
          <p className="text-sm font-medium text-foreground">${range[0]}</p>
        </div>
        <div className="flex-1 rounded-lg border border-border/70 bg-luxury-black/30 px-3 py-2">
          <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
            Max
          </p>
          <p className="text-sm font-medium text-foreground">
            {formatMax(range[1])}
          </p>
        </div>
      </div>
    </div>
  );
}
