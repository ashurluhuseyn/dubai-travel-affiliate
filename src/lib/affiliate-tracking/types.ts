/** Row type matching supabase/migrations/003_affiliate_click_tracking.sql */

export type AffiliateClickRow = {
  id: string;
  experience_id: string | null;
  provider_id: string | null;
  experience_slug: string | null;
  experience_title: string | null;
  provider_name: string | null;
  source_path: string | null;
  referrer: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  clicked_at: string;
};

export type AffiliateClickInsert = {
  experience_id: string | null;
  provider_id: string;
  experience_slug: string;
  experience_title: string;
  provider_name: string;
  source_path: string | null;
  referrer: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
};

export type TrackableProvider = {
  id: string;
  provider_name: string;
  affiliate_url: string;
  is_active: boolean;
  experience: {
    id: string;
    slug: string;
    title: string;
    status: string;
  };
};
