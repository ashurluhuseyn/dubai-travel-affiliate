"use server";

import { redirect } from "next/navigation";

import { getAdminResetPasswordRedirectUrl } from "@/lib/cms/auth/redirects";
import { isSupabaseConfigured } from "@/lib/cms/env";
import { createServerSupabaseClient } from "@/lib/cms/supabase/server";
import type { AdminProfile } from "@/lib/cms/types";

export type LoginState = {
  error?: string;
};

export type PasswordResetRequestState = {
  error?: string;
  success?: boolean;
  message?: string;
};

async function verifyActiveAdmin(userId: string): Promise<AdminProfile | null> {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from("admin_profiles")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  if (error || !data?.is_active) {
    return null;
  }

  return data as AdminProfile;
}

export async function loginAction(
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  if (!isSupabaseConfigured()) {
    return { error: "Supabase is not configured for this environment." };
  }

  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  const supabase = await createServerSupabaseClient();

  const { error: signInError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (signInError) {
    return { error: "Invalid email or password." };
  }

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    await supabase.auth.signOut();
    return { error: "Unable to verify your session. Please try again." };
  }

  const profile = await verifyActiveAdmin(user.id);

  if (!profile) {
    await supabase.auth.signOut();
    return {
      error: "You do not have access to the admin panel.",
    };
  }

  redirect("/admin");
}

export async function logoutAction() {
  if (!isSupabaseConfigured()) {
    redirect("/admin/login");
  }

  const supabase = await createServerSupabaseClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export async function requestPasswordResetAction(
  _prevState: PasswordResetRequestState,
  formData: FormData
): Promise<PasswordResetRequestState> {
  if (!isSupabaseConfigured()) {
    return { error: "Supabase is not configured for this environment." };
  }

  const email = String(formData.get("email") ?? "").trim();

  if (!email) {
    return { error: "Email is required." };
  }

  const supabase = await createServerSupabaseClient();

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: getAdminResetPasswordRedirectUrl(),
  });

  if (error) {
    return { error: "Unable to send a reset email. Please try again." };
  }

  return {
    success: true,
    message:
      "If an account exists for that email, a password reset link has been sent.",
  };
}
