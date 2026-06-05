"use client";

import { useRef, useState } from "react";
import { BadgeCheck, Calendar, ChevronDown, RotateCcw } from "lucide-react";

import { AffiliateButton } from "@/components/shared/affiliate-button";
import { formatPrice } from "@/lib/format-price";

function toDateInputValue(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function openDatePicker(input: HTMLInputElement) {
  input.focus();
  if (typeof input.showPicker === "function") {
    try {
      input.showPicker();
    } catch {
      // showPicker may throw outside a direct user gesture; focus still works.
    }
  }
}

const dateInputClasses =
  "h-11 min-w-0 flex-1 cursor-pointer appearance-none border-0 bg-transparent text-sm text-foreground focus:outline-none [color-scheme:dark] [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-80";

type BookingCardProps = {
  price: number;
  currency: string;
  priceUnit: string;
  affiliateUrl: string;
  freeCancellation: boolean;
  cancellationText: string;
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

export function BookingCard({
  price,
  currency,
  priceUnit,
  affiliateUrl,
  freeCancellation,
  cancellationText,
}: BookingCardProps) {
  const dateInputRef = useRef<HTMLInputElement>(null);
  const today = toDateInputValue(new Date());
  const [selectedDate, setSelectedDate] = useState(today);
  const [guests, setGuests] = useState(guestOptions[1]);
  const formattedPrice = formatPrice(price, currency);

  const handleDateFieldClick = () => {
    if (dateInputRef.current) {
      openDatePicker(dateInputRef.current);
    }
  };

  return (
    <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-lg shadow-black/20 md:p-6">
      <div className="flex items-baseline gap-1.5">
        <span className="text-sm text-muted-foreground">From</span>
        <span className="font-heading text-3xl text-luxury-gold">
          {formattedPrice}
        </span>
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
          <div className={fieldClasses} onClick={handleDateFieldClick}>
            <Calendar
              className="size-4 shrink-0 text-luxury-gold-muted"
              aria-hidden
            />
            <input
              ref={dateInputRef}
              id="booking-date"
              type="date"
              value={selectedDate}
              min={today}
              onChange={(event) => setSelectedDate(event.target.value)}
              onClick={(event) => {
                event.stopPropagation();
                openDatePicker(event.currentTarget);
              }}
              className={dateInputClasses}
            />
          </div>
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

        <AffiliateButton
          href={affiliateUrl}
          size="lg"
          className="w-full rounded-full transition-luxury"
        >
          Check Availability
        </AffiliateButton>
      </div>

      {freeCancellation && (
        <p className="mt-4 flex items-start gap-2 text-xs text-muted-foreground">
          <RotateCcw className="mt-0.5 size-4 shrink-0 text-luxury-gold-muted" aria-hidden />
          <span>
            <span className="font-medium text-foreground">Free Cancellation</span>
            <br />
            {cancellationText}
          </span>
        </p>
      )}
    </div>
  );
}
