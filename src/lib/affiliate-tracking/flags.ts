import "server-only";

/** Affiliate redirects remain unavailable until real partners are approved. */
export function areAffiliateRedirectsEnabled(): boolean {
  return process.env.AFFILIATE_REDIRECTS_ENABLED === "true";
}
