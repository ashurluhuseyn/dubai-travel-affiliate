/** Formats a numeric price with currency symbol for display. */
export function formatPrice(price: number, currency: string): string {
  const symbol = currency === "USD" ? "$" : currency;
  return `${symbol}${price}`;
}
