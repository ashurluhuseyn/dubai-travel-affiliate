import {
  canWriteContent,
  requireAdmin,
} from "@/lib/cms/auth/require-admin";
import { createServerSupabaseClient } from "@/lib/cms/supabase/server";
import type { AdminRole, AdminSession } from "@/lib/cms/types";

export function canDeleteContent(role: AdminRole): boolean {
  return role === "super_admin";
}

export async function requireAdminWrite(): Promise<AdminSession> {
  const session = await requireAdmin({
    roles: ["super_admin", "editor"],
  });

  if (!canWriteContent(session.profile.role)) {
    throw new Error("You do not have permission to modify content.");
  }

  return session;
}

export async function requireAdminDelete(): Promise<AdminSession> {
  const session = await requireAdmin({
    roles: ["super_admin"],
  });

  if (!canDeleteContent(session.profile.role)) {
    throw new Error("Only super admins can delete content.");
  }

  return session;
}

export async function getAuthenticatedSupabase() {
  const supabase = await createServerSupabaseClient();
  return supabase;
}
