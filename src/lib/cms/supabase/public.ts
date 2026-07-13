import { createClient } from "@supabase/supabase-js";

import { getPublicSupabaseEnv } from "@/lib/cms/env";

/** Anonymous public Supabase client — publishable key only, no session cookies. */
export function createPublicSupabaseClient() {
  const { NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY } =
    getPublicSupabaseEnv();

  return createClient(NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
