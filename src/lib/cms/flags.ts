/** CMS feature flags — all default to false when unset. */

export function isCmsExperiencesEnabled(): boolean {
  return process.env.CMS_EXPERIENCES_ENABLED === "true";
}
