"use client";

import { useActionState } from "react";
import Link from "next/link";

import {
  requestPasswordResetAction,
  type PasswordResetRequestState,
} from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const initialState: PasswordResetRequestState = {};

export function AdminForgotPasswordForm() {
  const [state, formAction, isPending] = useActionState(
    requestPasswordResetAction,
    initialState
  );

  return (
    <Card className="border-border/60 bg-card/80">
      <CardHeader>
        <CardTitle>Reset your password</CardTitle>
        <CardDescription>
          We will email you a link to set a new password.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {state.success ? (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">{state.message}</p>
            <Button asChild variant="outline" className="w-full">
              <Link href="/admin/login">Back to sign in</Link>
            </Button>
          </div>
        ) : (
          <form action={formAction} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                disabled={isPending}
              />
            </div>
            {state.error && (
              <p role="alert" className="text-sm text-destructive">
                {state.error}
              </p>
            )}
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Sending…" : "Send reset link"}
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
