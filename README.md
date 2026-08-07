# Caspaya

B2C travel discovery and affiliate content platform currently focused on Dubai. Built with Next.js App Router, static data, and a Supabase-backed admin CMS.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the public site.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## Admin CMS setup (Phase 0)

The public site continues to use static files under `src/data`. Admin routes live at `/admin` and require Supabase Auth plus an `admin_profiles` row.

### 1. Environment variables

Copy the example file and fill in your Supabase project values:

```bash
cp .env.example .env.local
```

| Variable | Scope | Purpose |
|----------|-------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Public | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Public | Publishable (anon) key for browser + authenticated server client |
| `SUPABASE_SECRET_KEY` | **Server only** | Secret key for future migrations/maintenance — never import in Client Components |
| `CMS_EXPERIENCES_ENABLED` | Server | Set to `true` only when CMS experience reads are implemented (default: `false`) |
| `NEXT_PUBLIC_ADMIN_RESET_PASSWORD_URL` | Public | Password recovery redirect (default: `http://localhost:3000/admin/reset-password`) |

### 2. Configure Auth redirect URLs

In **Supabase Dashboard → Authentication → URL Configuration**, add this to **Redirect URLs**:

```
http://localhost:3000/admin/reset-password
```

For production, also add your live admin reset URL (for example `https://caspaya.com/admin/reset-password`) and set `NEXT_PUBLIC_ADMIN_RESET_PASSWORD_URL` accordingly.

### 3. Run the database migration

Apply the initial schema in your Supabase project:

```bash
# Option A: Supabase CLI
supabase db push

# Option B: Supabase Dashboard → SQL Editor
# Paste and run supabase/migrations/001_admin_foundation.sql
```

### 4. Create the first admin user

In the Supabase Dashboard:

1. **Authentication → Users → Add user** — create a user with email + password (disable public signup in Auth settings).
2. Copy the new user's UUID from the Users table.
3. In **SQL Editor**, insert an admin profile:

```sql
INSERT INTO public.admin_profiles (user_id, email, display_name, role)
VALUES (
  '<AUTH_USER_UUID>',
  'you@example.com',
  'Your Name',
  'super_admin'
);
```

### 5. Sign in

Visit [http://localhost:3000/admin/login](http://localhost:3000/admin/login) and sign in with the credentials from step 4.

### Password recovery

1. Open [http://localhost:3000/admin/forgot-password](http://localhost:3000/admin/forgot-password) and submit your admin email.
2. Click the link in the email — it redirects to `/admin/reset-password`.
3. Set a new password, then sign in at `/admin/login`.

Recovery emails use `redirectTo` from `NEXT_PUBLIC_ADMIN_RESET_PASSWORD_URL` (defaults to `http://localhost:3000/admin/reset-password`).

### Architecture notes

- **Public site:** unchanged; reads from `src/data` via existing query functions.
- **CMS layer:** `src/lib/cms/content-source.ts` switches to Supabase when `CMS_EXPERIENCES_ENABLED=true` (not implemented until Phase 1).
- **Admin auth:** Server Actions and layouts use `supabase.auth.getUser()` (JWT validated server-side) plus an active `admin_profiles` row — not `getSession()` alone.
- **RLS:** Normal admin CRUD will use the authenticated server client with Row Level Security; the secret key client is reserved for privileged maintenance in `src/lib/cms/supabase/privileged.ts`.

## Deploy on Vercel

Set the same environment variables in your Vercel project settings. Keep `CMS_EXPERIENCES_ENABLED=false` until Phase 1 is complete and tested.
