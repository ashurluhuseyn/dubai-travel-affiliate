import "server-only";

import { createPrivilegedSupabaseClient } from "@/lib/cms/supabase/privileged";

import type { TrackableProvider } from "./types";

/** Loads a provider and linked experience for the public redirect route. */
export async function fetchTrackableProvider(
  providerId: string
): Promise<TrackableProvider | null> {
  const supabase = createPrivilegedSupabaseClient();

  const { data, error } = await supabase
    .from("experience_providers")
    .select(
      `
        id,
        provider_name,
        affiliate_url,
        is_active,
        experience:experience_id (
          id,
          slug,
          title,
          status
        )
      `
    )
    .eq("id", providerId)
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  const experienceRaw = data.experience as
    | TrackableProvider["experience"]
    | TrackableProvider["experience"][]
    | null;
  const experience = Array.isArray(experienceRaw) ? experienceRaw[0] : experienceRaw;
  if (!experience) {
    return null;
  }

  return {
    id: data.id as string,
    provider_name: data.provider_name as string,
    affiliate_url: data.affiliate_url as string,
    is_active: data.is_active as boolean,
    experience,
  };
}
