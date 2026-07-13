import Link from "next/link";
import { redirect } from "next/navigation";

import { AdminLoginForm } from "@/components/admin/admin-login-form";
import { getAdminSession } from "@/lib/cms/auth/require-admin";

export const dynamic = "force-dynamic";

type LoginPageProps = {
  searchParams: Promise<{ error?: string; success?: string }>;
};

const ERROR_MESSAGES: Record<string, string> = {
  inactive: "Your admin account is inactive. Contact a super admin.",
  forbidden: "You do not have permission to access that page.",
  config: "Supabase is not configured. Set the required environment variables.",
};

const SUCCESS_MESSAGES: Record<string, string> = {
  password_reset:
    "Your password has been updated. Sign in with your new password.",
};

export default async function AdminLoginPage({ searchParams }: LoginPageProps) {
  const session = await getAdminSession();

  if (session) {
    redirect("/admin");
  }

  const params = await searchParams;
  const queryError = params.error ? ERROR_MESSAGES[params.error] : undefined;
  const querySuccess = params.success
    ? SUCCESS_MESSAGES[params.success]
    : undefined;

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <p className="text-xs font-medium uppercase tracking-widest text-luxury-gold-muted">
            Dubai Moments
          </p>
          <h1 className="mt-2 font-heading text-2xl text-foreground">
            Admin Sign In
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Authorized staff only. There is no public signup.
          </p>
        </div>

        {queryError && (
          <p
            role="alert"
            className="rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive"
          >
            {queryError}
          </p>
        )}

        {querySuccess && (
          <p
            role="status"
            className="rounded-lg border border-luxury-gold-muted/30 bg-luxury-gold/10 px-4 py-3 text-sm text-luxury-gold-soft"
          >
            {querySuccess}
          </p>
        )}

        <AdminLoginForm />

        <p className="text-center text-xs text-muted-foreground">
          <Link href="/" className="underline-offset-4 hover:underline">
            Back to public site
          </Link>
        </p>
      </div>
    </div>
  );
}
