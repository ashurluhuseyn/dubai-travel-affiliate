"use client";

import { Suspense } from "react";
import Link from "next/link";

import { AdminResetPasswordForm } from "@/components/admin/admin-reset-password-form";
import { siteConfig } from "@/lib/site";

function ResetPasswordFormFallback() {
  return (
    <p className="rounded-xl border border-border/60 bg-card/80 px-6 py-8 text-sm text-muted-foreground">
      Loading…
    </p>
  );
}

export function AdminResetPasswordPageContent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <p className="text-xs font-medium uppercase tracking-widest text-luxury-gold-muted">
            {siteConfig.name}
          </p>
          <h1 className="mt-2 font-heading text-2xl text-foreground">
            Reset Password
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Enter a new password for your admin account.
          </p>
        </div>

        <Suspense fallback={<ResetPasswordFormFallback />}>
          <AdminResetPasswordForm />
        </Suspense>

        <p className="text-center text-xs text-muted-foreground">
          <Link href="/admin/login" className="underline-offset-4 hover:underline">
            Back to sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
