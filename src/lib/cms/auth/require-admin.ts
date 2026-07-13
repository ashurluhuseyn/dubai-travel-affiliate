import { redirect } from "next/navigation";

import { isSupabaseConfigured } from "@/lib/cms/env";
import { createServerSupabaseClient } from "@/lib/cms/supabase/server";
import type { AdminProfile, AdminRole, AdminSession } from "@/lib/cms/types";

const WRITE_ROLES: AdminRole[] = ["super_admin", "editor"];

type RequireAdminOptions = {
  /** Roles allowed to access the route. Defaults to all admin roles. */
  roles?: AdminRole[];
  /** Where to send unauthenticated users. */
  loginPath?: string;
};

async function fetchAdminProfile(userId: string): Promise<AdminProfile | null> {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from("admin_profiles")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  return data as AdminProfile;
}

/**
 * Validates the current user with Supabase Auth (server-verified JWT via getUser),
 * then loads an active admin_profiles row. Redirects to login when unauthorized.
 */
export async function requireAdmin(
  options: RequireAdminOptions = {}
): Promise<AdminSession> {
  const loginPath = options.loginPath ?? "/admin/login";
  const allowedRoles = options.roles ?? ["super_admin", "editor", "viewer"];

  if (!isSupabaseConfigured()) {
    redirect(`${loginPath}?error=config`);
  }

  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect(loginPath);
  }

  const profile = await fetchAdminProfile(user.id);

  if (!profile?.is_active) {
    await supabase.auth.signOut();
    redirect(`${loginPath}?error=inactive`);
  }

  if (!allowedRoles.includes(profile.role)) {
    redirect(`${loginPath}?error=forbidden`);
  }

  return {
    user: {
      id: user.id,
      email: user.email,
    },
    profile,
  };
}

/** Returns the current admin session or null — does not redirect. */
export async function getAdminSession(): Promise<AdminSession | null> {
  if (!isSupabaseConfigured()) {
    return null;
  }

  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const profile = await fetchAdminProfile(user.id);

  if (!profile?.is_active) {
    return null;
  }

  return {
    user: {
      id: user.id,
      email: user.email,
    },
    profile,
  };
}

export function canWriteContent(role: AdminRole): boolean {
  return WRITE_ROLES.includes(role);
}
