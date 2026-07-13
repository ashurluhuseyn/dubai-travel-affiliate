import "server-only";

import { createClient } from "@supabase/supabase-js";

import { getPublicSupabaseEnv, getSecretSupabaseEnv } from "@/lib/cms/env";

/**
 * Privileged Supabase client — secret key, server-only.
 * Reserved for future migrations and maintenance. Do not use for normal admin CRUD.
 */
export function createPrivilegedSupabaseClient() {
  const { NEXT_PUBLIC_SUPABASE_URL } = getPublicSupabaseEnv();
  const { SUPABASE_SECRET_KEY } = getSecretSupabaseEnv();

  return createClient(NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SECRET_KEY, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
