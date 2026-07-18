# Experience media storage

Dubai Moments stores optional admin-uploaded experience images in Supabase Storage while continuing to support existing external image URLs.

## Bucket and access model

- **Bucket id:** `experience-media`
- **Visibility:** public read
- **Write access:** active admins only (`super_admin`, `editor`) through Storage RLS
- **Public read:** anonymous users can read objects from the public bucket
- **Migration:** `supabase/migrations/004_experience_media_storage.sql`

The bucket allows:

- JPEG, PNG, WebP, AVIF
- Maximum file size: 10 MB
- SVG uploads are rejected

Normal media CRUD uses the authenticated admin Supabase client and RLS. `SUPABASE_SECRET_KEY` is not used for uploads or deletions.

## Database fields (unchanged)

Experience media continues to use the existing columns:

| Column | Purpose |
|--------|---------|
| `listing_image_url` | Cover/listing image URL |
| `gallery` | JSON array of `{ src, alt }` |
| `gallery_extra_count` | Extra gallery overlay count |

No schema changes were required for media storage.

## Upload flow

1. Admin selects files in the experience create/edit form.
2. Client calls `createExperienceMediaUploadAction` (server action).
3. Server verifies active-admin write access and validates slug, MIME type, size, and extension.
4. Server generates a safe path such as `experiences/{slug}/{uuid}.{ext}` and creates a signed upload URL.
5. Client uploads directly with `uploadToSignedUrl` using the browser Supabase client.
6. The returned public URL is written into `listing_image_url` or appended to `gallery`.

Create mode works before the experience row exists. Uploads only require a valid slug namespace.

## External URLs

Existing seeded Unsplash or partner URLs remain valid:

- Manual URL entry is still available under the cover image advanced field.
- Gallery manager supports external URL rows.
- Public pages render both Supabase Storage URLs and external URLs.
- Cleanup never attempts to delete external URLs.

## Deletion and cleanup

- Removing an image from the form updates the saved experience first.
- Managed Storage files are deleted only after a successful database update or experience delete.
- Replacing a managed cover/gallery image saves the new URL first, then removes unreferenced managed files.
- Experience deletion performs best-effort Storage cleanup and does not fail if cleanup errors occur.
- Cleanup logs errors server-side without exposing secrets.

## Local testing

1. Apply the migration manually in Supabase SQL editor or CLI:

```bash
supabase db push
# or run the SQL in supabase/migrations/004_experience_media_storage.sql
```

2. Ensure `.env.local` contains:

```env
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=...
```

3. Sign in as an active admin and open:

- `/admin/experiences/new`
- `/admin/experiences/[id]/edit`

4. Enter a title/slug, upload a cover image and gallery images, save, then verify:

- Public experience page renders uploaded images
- `/destinations` listing card uses `listing_image_url`
- External URLs still render when pasted manually

5. Run automated checks:

```bash
npm run lint
npm run build
npm test
```

## Production verification

1. Apply `004_experience_media_storage.sql` to production Supabase.
2. Confirm the `experience-media` bucket exists and is public.
3. Upload one cover image and one gallery image for a test experience.
4. Confirm public pages render the new URLs.
5. Confirm existing external URLs on seeded experiences are unchanged.
6. Delete or replace an uploaded image and confirm the old managed object is removed while external URLs remain untouched.

## Rollback

1. Revert the application deploy to the previous release.
2. Existing database URLs continue to work for both external and Storage URLs.
3. Optionally keep the bucket in place; no data migration is required to roll back app code.
4. To remove Storage policies/bucket manually, drop the policies from `004_experience_media_storage.sql` and delete the bucket in Supabase Storage settings.
