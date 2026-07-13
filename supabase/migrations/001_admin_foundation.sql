-- Dubai Moments CMS — Phase 0 admin foundation
-- Run via Supabase CLI or SQL editor on your project.

-- ---------------------------------------------------------------------------
-- Trigger helper (no table dependencies)
-- ---------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- ---------------------------------------------------------------------------
-- Tables (dependency order: admin_profiles → categories → experiences → providers)
-- ---------------------------------------------------------------------------

CREATE TABLE public.admin_profiles (
  user_id uuid PRIMARY KEY REFERENCES auth.users (id) ON DELETE CASCADE,
  email text NOT NULL,
  display_name text,
  role text NOT NULL CHECK (role IN ('super_admin', 'editor', 'viewer')),
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  label text NOT NULL,
  description text,
  icon_key text,
  sort_order integer NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.experiences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  category_id uuid REFERENCES public.categories (id) ON DELETE SET NULL,
  location text,
  description text NOT NULL,
  long_description text,
  listing_image_url text,
  badge text,
  duration_label text,
  duration_hours numeric,
  group_size_label text,
  pickup_included boolean NOT NULL DEFAULT false,
  mobile_ticket boolean NOT NULL DEFAULT false,
  free_cancellation boolean NOT NULL DEFAULT false,
  meeting_point text,
  cancellation_policy text,
  languages text[] NOT NULL DEFAULT '{}',
  tour_type text,
  recommended_score integer NOT NULL DEFAULT 0,
  highlights jsonb NOT NULL DEFAULT '[]'::jsonb,
  included_items jsonb NOT NULL DEFAULT '[]'::jsonb,
  itinerary jsonb NOT NULL DEFAULT '[]'::jsonb,
  important_info jsonb NOT NULL DEFAULT '[]'::jsonb,
  faqs jsonb NOT NULL DEFAULT '[]'::jsonb,
  gallery jsonb NOT NULL DEFAULT '[]'::jsonb,
  cached_lowest_price numeric,
  cached_currency text NOT NULL DEFAULT 'AED',
  cached_rating numeric,
  cached_review_count integer,
  meta_title text,
  meta_description text,
  og_image_url text,
  canonical_path text,
  no_index boolean NOT NULL DEFAULT false,
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  published_at timestamptz,
  created_by uuid REFERENCES auth.users (id) ON DELETE SET NULL,
  updated_by uuid REFERENCES auth.users (id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.experience_providers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  experience_id uuid NOT NULL REFERENCES public.experiences (id) ON DELETE CASCADE,
  provider_name text NOT NULL,
  price numeric NOT NULL,
  currency text NOT NULL DEFAULT 'AED',
  rating numeric,
  review_count integer,
  cancellation_text text,
  instant_confirmation boolean NOT NULL DEFAULT false,
  mobile_ticket boolean NOT NULL DEFAULT false,
  description text,
  affiliate_url text NOT NULL,
  is_recommended boolean NOT NULL DEFAULT false,
  badge text,
  display_order integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- ---------------------------------------------------------------------------
-- Indexes
-- ---------------------------------------------------------------------------

CREATE INDEX admin_profiles_email_idx ON public.admin_profiles (email);
CREATE INDEX admin_profiles_role_active_idx ON public.admin_profiles (role, is_active);

CREATE INDEX categories_status_sort_idx ON public.categories (status, sort_order);
CREATE INDEX categories_slug_idx ON public.categories (slug);

CREATE INDEX experiences_slug_idx ON public.experiences (slug);
CREATE INDEX experiences_status_published_idx ON public.experiences (status, published_at DESC);
CREATE INDEX experiences_category_id_idx ON public.experiences (category_id);
CREATE INDEX experiences_recommended_score_idx ON public.experiences (recommended_score DESC);
CREATE INDEX experiences_cached_lowest_price_idx ON public.experiences (cached_lowest_price);

CREATE INDEX experience_providers_experience_order_idx
  ON public.experience_providers (experience_id, display_order);

CREATE INDEX experience_providers_experience_active_idx
  ON public.experience_providers (experience_id, is_active);

-- ---------------------------------------------------------------------------
-- RLS helper (depends on public.admin_profiles)
-- ---------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.is_active_admin(required_roles text[] DEFAULT ARRAY['super_admin', 'editor', 'viewer'])
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.admin_profiles ap
    WHERE ap.user_id = auth.uid()
      AND ap.is_active = true
      AND ap.role = ANY (required_roles)
  );
$$;

-- ---------------------------------------------------------------------------
-- Triggers (depend on tables + set_updated_at)
-- ---------------------------------------------------------------------------

CREATE TRIGGER admin_profiles_set_updated_at
  BEFORE UPDATE ON public.admin_profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER categories_set_updated_at
  BEFORE UPDATE ON public.categories
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER experiences_set_updated_at
  BEFORE UPDATE ON public.experiences
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER experience_providers_set_updated_at
  BEFORE UPDATE ON public.experience_providers
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------

ALTER TABLE public.admin_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experience_providers ENABLE ROW LEVEL SECURITY;

-- ---------------------------------------------------------------------------
-- RLS policies (last — depend on tables + is_active_admin)
-- ---------------------------------------------------------------------------

-- admin_profiles

CREATE POLICY "Admins can read admin profiles"
  ON public.admin_profiles
  FOR SELECT
  TO authenticated
  USING (public.is_active_admin());

CREATE POLICY "Super admins manage admin profiles"
  ON public.admin_profiles
  FOR ALL
  TO authenticated
  USING (public.is_active_admin(ARRAY['super_admin']))
  WITH CHECK (public.is_active_admin(ARRAY['super_admin']));

-- Users may read their own profile row (for login bootstrap before full admin check)
CREATE POLICY "Users can read own admin profile"
  ON public.admin_profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- categories

CREATE POLICY "Public read published categories"
  ON public.categories
  FOR SELECT
  TO anon, authenticated
  USING (status = 'published');

CREATE POLICY "Admins read all categories"
  ON public.categories
  FOR SELECT
  TO authenticated
  USING (public.is_active_admin());

CREATE POLICY "Editors create categories"
  ON public.categories
  FOR INSERT
  TO authenticated
  WITH CHECK (public.is_active_admin(ARRAY['super_admin', 'editor']));

CREATE POLICY "Editors update categories"
  ON public.categories
  FOR UPDATE
  TO authenticated
  USING (public.is_active_admin(ARRAY['super_admin', 'editor']))
  WITH CHECK (public.is_active_admin(ARRAY['super_admin', 'editor']));

CREATE POLICY "Super admins delete categories"
  ON public.categories
  FOR DELETE
  TO authenticated
  USING (public.is_active_admin(ARRAY['super_admin']));

-- experiences

CREATE POLICY "Public read published experiences"
  ON public.experiences
  FOR SELECT
  TO anon, authenticated
  USING (status = 'published');

CREATE POLICY "Admins read all experiences"
  ON public.experiences
  FOR SELECT
  TO authenticated
  USING (public.is_active_admin());

CREATE POLICY "Editors create experiences"
  ON public.experiences
  FOR INSERT
  TO authenticated
  WITH CHECK (public.is_active_admin(ARRAY['super_admin', 'editor']));

CREATE POLICY "Editors update experiences"
  ON public.experiences
  FOR UPDATE
  TO authenticated
  USING (public.is_active_admin(ARRAY['super_admin', 'editor']))
  WITH CHECK (public.is_active_admin(ARRAY['super_admin', 'editor']));

CREATE POLICY "Super admins delete experiences"
  ON public.experiences
  FOR DELETE
  TO authenticated
  USING (public.is_active_admin(ARRAY['super_admin']));

-- experience_providers

CREATE POLICY "Public read active providers for published experiences"
  ON public.experience_providers
  FOR SELECT
  TO anon, authenticated
  USING (
    is_active = true
    AND EXISTS (
      SELECT 1
      FROM public.experiences e
      WHERE e.id = experience_providers.experience_id
        AND e.status = 'published'
    )
  );

CREATE POLICY "Admins read all experience providers"
  ON public.experience_providers
  FOR SELECT
  TO authenticated
  USING (public.is_active_admin());

CREATE POLICY "Editors create experience providers"
  ON public.experience_providers
  FOR INSERT
  TO authenticated
  WITH CHECK (public.is_active_admin(ARRAY['super_admin', 'editor']));

CREATE POLICY "Editors update experience providers"
  ON public.experience_providers
  FOR UPDATE
  TO authenticated
  USING (public.is_active_admin(ARRAY['super_admin', 'editor']))
  WITH CHECK (public.is_active_admin(ARRAY['super_admin', 'editor']));

CREATE POLICY "Super admins delete experience providers"
  ON public.experience_providers
  FOR DELETE
  TO authenticated
  USING (public.is_active_admin(ARRAY['super_admin']));
