"use client";

import { useState } from "react";
import { Heart } from "lucide-react";

import { cn } from "@/lib/utils";

type SaveButtonProps = {
  className?: string;
  label?: string;
};

export function SaveButton({ className, label = "experience" }: SaveButtonProps) {
  const [saved, setSaved] = useState(false);

  return (
    <button
      type="button"
      aria-pressed={saved}
      aria-label={saved ? `Remove ${label} from saved` : `Save ${label}`}
      onClick={() => setSaved((value) => !value)}
      className={cn(
        "flex size-9 items-center justify-center rounded-full bg-luxury-black/60 backdrop-blur-sm transition-luxury hover:bg-luxury-black/80",
        className
      )}
    >
      <Heart
        className={cn(
          "size-4 transition-luxury",
          saved ? "fill-luxury-gold text-luxury-gold" : "text-luxury-white"
        )}
      />
    </button>
  );
}
