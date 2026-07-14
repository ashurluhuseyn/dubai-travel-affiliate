# Affiliate click tracking

Dubai Moments records outbound affiliate clicks through a server-only redirect route before sending visitors to the stored provider `affiliate_url`.

## How `/go/[providerId]` works

1. A CMS-backed provider card links to `/go/{uuid}?source_path=...&utm_*=...`.
2. The route validates that `providerId` is a UUID.
3. The provider is loaded from Supabase with its linked experience.
4. The provider must be **active**, the experience must be **published**, and the stored `affiliate_url` must use **http** or **https**.
5. A click row is inserted into `public.affiliate_clicks` using the privileged server client (`SUPABASE_SECRET_KEY`).
6. The visitor receives a **302 redirect** to the stored affiliate URL.
7. Redirect responses are **not cached** (`Cache-Control: no-store`).

The route never accepts an arbitrary destination URL from query parameters.

Static fallback providers (without Supabase UUIDs) continue linking directly to their stored mock affiliate URLs.

## Data collected

Each click stores:

- experience and provider foreign keys (nullable after deletion)
- experience slug/title snapshot
- provider name snapshot
- source path and referrer
- utm_source, utm_medium, utm_campaign
- clicked_at timestamp

We do **not** store:

- raw IP addresses
- email addresses
- authenticated user identity
- browser fingerprinting data

## Local testing

1. Apply migration `supabase/migrations/003_affiliate_click_tracking.sql`.
2. Ensure `.env.local` includes `SUPABASE_SECRET_KEY`.
3. Start the app: `npm run dev`
4. Open a published CMS experience detail page.
5. Click **Check Availability** on a CMS provider card.
6. Confirm the browser passes through `/go/{providerId}` and redirects to the stored affiliate URL.
7. Review counts at `/admin/analytics`.

Example manual URL (replace UUID):

```bash
open "http://localhost:3000/go/550e8400-e29b-41d4-a716-446655440000?source_path=/experiences/desert-safari-dune-bashing&utm_source=dubaimoments&utm_medium=affiliate&utm_campaign=experience-detail"
```

## Querying click totals

Admin UI:

- Dashboard summary card
- `/admin/analytics`

SQL examples:

```sql
SELECT count(*) FROM public.affiliate_clicks
WHERE clicked_at >= now() - interval '30 days';

SELECT experience_slug, count(*) AS clicks
FROM public.affiliate_clicks
WHERE clicked_at >= now() - interval '7 days'
GROUP BY experience_slug
ORDER BY clicks DESC;
```

RLS allows **active admins only** to read click rows. Public users cannot read or write the table directly.

## Replacing placeholder affiliate URLs

1. Sign in to `/admin/experiences`.
2. Edit an experience and open the provider editor.
3. Update each provider’s **Affiliate URL** field with the real partner link.
4. Save the experience.

The public site always redirects to the URL stored in Supabase. Tracking does not rewrite or invent partner links.
