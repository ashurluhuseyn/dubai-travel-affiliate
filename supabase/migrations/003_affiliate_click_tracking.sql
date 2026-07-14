-- Affiliate click tracking for outbound provider redirects

CREATE TABLE public.affiliate_clicks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  experience_id uuid REFERENCES public.experiences (id) ON DELETE SET NULL,
  provider_id uuid REFERENCES public.experience_providers (id) ON DELETE SET NULL,
  experience_slug text,
  experience_title text,
  provider_name text,
  source_path text,
  referrer text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  clicked_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX affiliate_clicks_clicked_at_idx
  ON public.affiliate_clicks (clicked_at DESC);

CREATE INDEX affiliate_clicks_experience_id_idx
  ON public.affiliate_clicks (experience_id);

CREATE INDEX affiliate_clicks_provider_id_idx
  ON public.affiliate_clicks (provider_id);

ALTER TABLE public.affiliate_clicks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins read affiliate clicks"
  ON public.affiliate_clicks
  FOR SELECT
  TO authenticated
  USING (public.is_active_admin());
