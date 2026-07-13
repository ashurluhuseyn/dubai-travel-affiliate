/** Expects `.env.local` via `node --env-file=.env.local` in npm scripts. */
export function getSeedEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const secretKey = process.env.SUPABASE_SECRET_KEY;

  if (!url || !secretKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SECRET_KEY in .env.local"
    );
  }

  return {
    url,
    secretKey,
  };
}

export function isDryRun(argv: string[]): boolean {
  return argv.includes("--dry-run");
}
