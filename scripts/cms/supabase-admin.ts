import { createClient, type SupabaseClient } from "@supabase/supabase-js";

import { getSeedEnv } from "./env";

export function createSeedSupabaseClient(): SupabaseClient {
  const { url, secretKey } = getSeedEnv();

  return createClient(url, secretKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
