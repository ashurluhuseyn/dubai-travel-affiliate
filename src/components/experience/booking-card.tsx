"use client";

import { useState } from "react";
import { BadgeCheck, Calendar, ChevronDown, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";

type BookingCardProps = {
  price: string;
  priceUnit: string;
};

const guestOptions = [
  "1 Adult",
  "2 Adults",
  "3 Adults",
  "4 Adults",
  "Family (5+)",
];

const fieldClasses =
  "flex h-11 w-full items-center gap-2 rounded-lg border border-border/70 bg-luxury-black/40 px-3 text-sm text-foreground transition-luxury focus-within:border-luxury-gold-muted/60";

export function BookingCard({ price, priceUnit }: BookingCardProps) {
  const [guests, setGuests] = useState(guestOptions[1]);

  return (
    <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-lg shadow-black/20 md:p-6">
      <div className="flex items-baseline gap-1.5">
        <span className="text-sm text-muted-foreground">From</span>
        <span className="font-heading text-3xl text-luxury-gold">{price}</span>
        <span className="text-sm text-muted-foreground">/ {priceUnit}</span>
      </div>

      <p className="mt-2 inline-flex items-center gap-1.5 text-xs text-luxury-gold-soft">
        <BadgeCheck className="size-4" aria-hidden />
        Best Price Guarantee
      </p>

      <div className="mt-5 space-y-4">
        <div>
          <label
            htmlFor="booking-date"
            className="mb-1.5 block text-xs font-medium text-muted-foreground"
          >
            Select Date
          </label>
          <button
            id="booking-date"
            type="button"
            className={fieldClasses}
          >
            <Calendar className="size-4 shrink-0 text-luxury-gold-muted" aria-hidden />
            <span>May 25, 2025</span>
          </button>
        </div>

        <div>
          <label
            htmlFor="booking-guests"
            className="mb-1.5 block text-xs font-medium text-muted-foreground"
          >
            Guests
          </label>
          <div className="relative">
            <select
              id="booking-guests"
              value={guests}
              onChange={(event) => setGuests(event.target.value)}
              className="h-11 w-full appearance-none rounded-lg border border-border/70 bg-luxury-black/40 px-3 pr-9 text-sm text-foreground transition-luxury focus:border-luxury-gold-muted/60 focus:outline-none"
            >
              {guestOptions.map((option) => (
                <option key={option} value={option} className="bg-luxury-charcoal">
                  {option}
                </option>
              ))}
            </select>
            <ChevronDown
              aria-hidden
              className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-luxury-gold-muted"
            />
          </div>
        </div>

        <Button size="lg" className="w-full rounded-full transition-luxury">
          Check Availability
        </Button>
      </div>

      <p className="mt-4 flex items-start gap-2 text-xs text-muted-foreground">
        <RotateCcw className="mt-0.5 size-4 shrink-0 text-luxury-gold-muted" aria-hidden />
        <span>
          <span className="font-medium text-foreground">Free Cancellation</span>
          <br />
          Up to 24 hours in advance
        </span>
      </p>
    </div>
  );
}
