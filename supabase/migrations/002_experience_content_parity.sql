-- Experience content parity: gallery extra count + ordered related experience slugs
-- Safe to rerun after a failed attempt (columns/constraints added partially).

CREATE OR REPLACE FUNCTION public.jsonb_is_string_array(value jsonb)
RETURNS boolean
LANGUAGE sql
IMMUTABLE
STRICT
AS $$
  SELECT
    jsonb_typeof(value) = 'array'
    AND NOT EXISTS (
      SELECT 1
      FROM jsonb_array_elements(value) AS elem
      WHERE jsonb_typeof(elem) <> 'string'
    );
$$;

ALTER TABLE public.experiences
  ADD COLUMN IF NOT EXISTS gallery_extra_count integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS related_experience_slugs jsonb NOT NULL DEFAULT '[]'::jsonb;

ALTER TABLE public.experiences
  DROP CONSTRAINT IF EXISTS experiences_gallery_extra_count_nonneg;

ALTER TABLE public.experiences
  ADD CONSTRAINT experiences_gallery_extra_count_nonneg
    CHECK (gallery_extra_count >= 0);

ALTER TABLE public.experiences
  DROP CONSTRAINT IF EXISTS experiences_related_experience_slugs_is_array;

ALTER TABLE public.experiences
  ADD CONSTRAINT experiences_related_experience_slugs_is_array
    CHECK (public.jsonb_is_string_array(related_experience_slugs));
