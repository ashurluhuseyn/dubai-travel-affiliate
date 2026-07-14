import "server-only";

import { createPrivilegedSupabaseClient } from "@/lib/cms/supabase/privileged";

import type { AffiliateClickInsert } from "./types";

/** Inserts a click event using the privileged server client. Best-effort only. */
export async function recordAffiliateClick(
  payload: AffiliateClickInsert
): Promise<void> {
  const supabase = createPrivilegedSupabaseClient();

  const { error } = await supabase.from("affiliate_clicks").insert(payload);

  if (error) {
    console.error("[affiliate-tracking] Failed to record click:", error.message);
  }
}
