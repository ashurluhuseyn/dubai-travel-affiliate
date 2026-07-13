import Link from "next/link";

import { AdminForgotPasswordForm } from "@/components/admin/admin-forgot-password-form";

export const dynamic = "force-dynamic";

export default function AdminForgotPasswordPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <p className="text-xs font-medium uppercase tracking-widest text-luxury-gold-muted">
            Dubai Moments
          </p>
          <h1 className="mt-2 font-heading text-2xl text-foreground">
            Forgot Password
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Enter the email address for your admin account.
          </p>
        </div>

        <AdminForgotPasswordForm />

        <p className="text-center text-xs text-muted-foreground">
          <Link href="/admin/login" className="underline-offset-4 hover:underline">
            Back to sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
