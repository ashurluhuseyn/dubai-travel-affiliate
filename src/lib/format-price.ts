/** Formats a numeric price with currency symbol for display. */
export function formatPrice(price: number, currency: string): string {
  if (currency === "USD") return `$${price}`;
  if (currency === "AED") return `AED ${price}`;
  return `${currency} ${price}`;
}

/** Formats a listing-style price label, e.g. "From AED 290". */
export function formatFromPrice(price: number, currency: string): string {
  return `From ${formatPrice(price, currency)}`;
}
