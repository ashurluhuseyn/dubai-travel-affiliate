"use client";

import { useState } from "react";
import { Heart } from "lucide-react";

import { cn } from "@/lib/utils";

type FavoriteButtonProps = {
  /** Accessible label, e.g. the experience title. */
  label: string;
  size?: "sm" | "md";
  className?: string;
};

/** Toggleable heart used as an image overlay. Local state only (mock). */
export function FavoriteButton({
  label,
  size = "md",
  className,
}: FavoriteButtonProps) {
  const [saved, setSaved] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setSaved((value) => !value)}
      aria-pressed={saved}
      aria-label={saved ? `Remove ${label} from favorites` : `Save ${label} to favorites`}
      className={cn(
        "inline-flex items-center justify-center rounded-full border border-border/60 bg-luxury-black/50 text-foreground backdrop-blur-sm transition-luxury hover:border-luxury-gold-muted/50 hover:text-luxury-gold",
        size === "md" ? "size-10" : "size-8",
        className
      )}
    >
      <Heart
        className={cn(
          "transition-luxury",
          size === "md" ? "size-5" : "size-4",
          saved && "fill-luxury-gold text-luxury-gold"
        )}
        aria-hidden
      />
    </button>
  );
}
