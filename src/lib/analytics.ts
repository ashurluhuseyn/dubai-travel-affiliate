/** GA4 measurement ID from `NEXT_PUBLIC_GA_ID` (e.g. `G-XXXXXXXXXX`). */
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID?.trim();

/** True when a valid GA4 measurement ID is configured. */
export const isGaEnabled =
  typeof GA_MEASUREMENT_ID === "string" &&
  /^G-[A-Z0-9]+$/i.test(GA_MEASUREMENT_ID);

type GtagParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function gtag(...args: unknown[]) {
  if (!isGaEnabled || typeof window === "undefined") return;
  window.gtag?.(...args);
}

/** Sends a page view for client-side navigations. */
export function pageview(url: string) {
  if (!GA_MEASUREMENT_ID) return;
  gtag("config", GA_MEASUREMENT_ID, {
    page_path: url,
  });
}

/** Sends a custom GA4 event. */
export function trackEvent(
  action: string,
  params?: GtagParams
) {
  gtag("event", action, params);
}
