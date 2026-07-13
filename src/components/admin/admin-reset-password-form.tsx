"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { isSupabaseConfigured } from "@/lib/cms/env";
import { createBrowserSupabaseClient } from "@/lib/cms/supabase/client";

type RecoveryStatus = "loading" | "ready" | "invalid";

const MIN_PASSWORD_LENGTH = 8;

function ConfigErrorCard() {
  return (
    <Card className="border-border/60 bg-card/80">
      <CardContent className="pt-6">
        <p role="alert" className="text-sm text-destructive">
          Supabase is not configured. Set the required environment variables.
        </p>
      </CardContent>
    </Card>
  );
}

export function AdminResetPasswordForm() {
  if (!isSupabaseConfigured()) {
    return <ConfigErrorCard />;
  }

  return <AdminResetPasswordFormInner />;
}

function AdminResetPasswordFormInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<RecoveryStatus>("loading");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const supabase = createBrowserSupabaseClient();
    let isMounted = true;
    let recoveryReady = false;

    const markReady = () => {
      if (!isMounted) return;
      recoveryReady = true;
      setStatus("ready");
      setError(null);
    };

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY" || event === "SIGNED_IN") {
        if (
          event === "PASSWORD_RECOVERY" ||
          window.location.hash.includes("type=recovery")
        ) {
          markReady();
        }
      }
    });

    const verifyRecoverySession = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!isMounted || recoveryReady) return;

      if (user) {
        markReady();
      } else {
        setStatus("invalid");
      }
    };

    const init = async () => {
      const authError = searchParams.get("error_description");
      if (authError) {
        setError(decodeURIComponent(authError.replace(/\+/g, " ")));
        setStatus("invalid");
        return;
      }

      const code = searchParams.get("code");
      if (code) {
        const { error: exchangeError } =
          await supabase.auth.exchangeCodeForSession(code);

        window.history.replaceState({}, "", "/admin/reset-password");

        if (exchangeError) {
          setError(
            "This password reset link is invalid or has expired. Request a new one."
          );
          setStatus("invalid");
          return;
        }

        await verifyRecoverySession();
        return;
      }

      if (window.location.hash.includes("access_token")) {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }

      if (!recoveryReady) {
        await verifyRecoverySession();
      }
    };

    void init();

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [searchParams]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (password.length < MIN_PASSWORD_LENGTH) {
      setError(`Password must be at least ${MIN_PASSWORD_LENGTH} characters.`);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);

    try {
      const supabase = createBrowserSupabaseClient();
      const { error: updateError } = await supabase.auth.updateUser({
        password,
      });

      if (updateError) {
        setError(
          updateError.message ||
            "Unable to update your password. The link may have expired."
        );
        setIsSubmitting(false);
        return;
      }

      await supabase.auth.signOut();
      router.push("/admin/login?success=password_reset");
      router.refresh();
    } catch {
      setError("Unable to connect to Supabase. Please try again.");
      setIsSubmitting(false);
    }
  };

  if (status === "loading") {
    return (
      <Card className="border-border/60 bg-card/80">
        <CardContent className="pt-6">
          <p className="text-sm text-muted-foreground">
            Verifying your reset link…
          </p>
        </CardContent>
      </Card>
    );
  }

  if (status === "invalid") {
    return (
      <Card className="border-border/60 bg-card/80">
        <CardHeader>
          <CardTitle>Link unavailable</CardTitle>
          <CardDescription>
            This password reset link is invalid or has expired.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <p role="alert" className="text-sm text-destructive">
              {error}
            </p>
          )}
          <Button asChild className="w-full">
            <Link href="/admin/forgot-password">Request a new reset link</Link>
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            <Link
              href="/admin/login"
              className="underline-offset-4 hover:underline"
            >
              Back to sign in
            </Link>
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border/60 bg-card/80">
      <CardHeader>
        <CardTitle>Set a new password</CardTitle>
        <CardDescription>
          Choose a new password for your admin account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              New password
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              minLength={MIN_PASSWORD_LENGTH}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              disabled={isSubmitting}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="text-sm font-medium">
              Confirm new password
            </label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              required
              minLength={MIN_PASSWORD_LENGTH}
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              disabled={isSubmitting}
            />
          </div>
          {error && (
            <p role="alert" className="text-sm text-destructive">
              {error}
            </p>
          )}
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Updating password…" : "Update password"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
