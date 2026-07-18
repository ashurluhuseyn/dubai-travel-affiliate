-- Experience media storage bucket + admin-only write policies

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'experience-media',
  'experience-media',
  true,
  10485760,
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/avif']::text[]
)
ON CONFLICT (id) DO UPDATE
SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

-- Drop existing policies when re-running locally
DROP POLICY IF EXISTS "Active admins upload experience media" ON storage.objects;
DROP POLICY IF EXISTS "Active admins update experience media" ON storage.objects;
DROP POLICY IF EXISTS "Active admins delete experience media" ON storage.objects;
DROP POLICY IF EXISTS "Active admins list experience media" ON storage.objects;
DROP POLICY IF EXISTS "Public read experience media" ON storage.objects;

CREATE POLICY "Active admins upload experience media"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'experience-media'
    AND public.is_active_admin(ARRAY['super_admin', 'editor'])
  );

CREATE POLICY "Active admins update experience media"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'experience-media'
    AND public.is_active_admin(ARRAY['super_admin', 'editor'])
  )
  WITH CHECK (
    bucket_id = 'experience-media'
    AND public.is_active_admin(ARRAY['super_admin', 'editor'])
  );

CREATE POLICY "Active admins delete experience media"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'experience-media'
    AND public.is_active_admin(ARRAY['super_admin', 'editor'])
  );

CREATE POLICY "Active admins list experience media"
  ON storage.objects
  FOR SELECT
  TO authenticated
  USING (
    bucket_id = 'experience-media'
    AND public.is_active_admin()
  );

CREATE POLICY "Public read experience media"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'experience-media');
