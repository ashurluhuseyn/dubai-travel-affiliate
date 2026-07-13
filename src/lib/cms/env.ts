import { z } from "zod";

const publicSupabaseSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: z.string().min(1),
});

const secretSupabaseSchema = z.object({
  SUPABASE_SECRET_KEY: z.string().min(1),
});

export function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  return Boolean(url && key);
}

/** Validates public Supabase env vars — required for admin auth and CMS clients. */
export function getPublicSupabaseEnv() {
  const parsed = publicSupabaseSchema.safeParse({
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  });

  if (!parsed.success) {
    throw new Error(
      "Missing Supabase configuration. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY."
    );
  }

  return parsed.data;
}

/** Validates secret key — server-only privileged operations. */
export function getSecretSupabaseEnv() {
  const parsed = secretSupabaseSchema.safeParse({
    SUPABASE_SECRET_KEY: process.env.SUPABASE_SECRET_KEY,
  });

  if (!parsed.success) {
    throw new Error(
      "Missing SUPABASE_SECRET_KEY. Required for privileged server maintenance only."
    );
  }

  return parsed.data;
}
