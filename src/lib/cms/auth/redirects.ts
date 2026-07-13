/** Redirect target for Supabase password recovery emails (admin CMS). */
export function getAdminResetPasswordRedirectUrl(): string {
  if (process.env.NEXT_PUBLIC_ADMIN_RESET_PASSWORD_URL) {
    return process.env.NEXT_PUBLIC_ADMIN_RESET_PASSWORD_URL;
  }

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "http://localhost:3000";

  return `${siteUrl}/admin/reset-password`;
}
