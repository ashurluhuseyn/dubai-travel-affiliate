import Link from "next/link";

import { logoutAction } from "@/app/admin/actions";
import { AdminNav } from "@/components/admin/admin-nav";
import { requireAdmin } from "@/lib/cms/auth/require-admin";

export const dynamic = "force-dynamic";

export default async function AdminProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await requireAdmin();

  return (
    <div className="min-h-screen">
      <header className="border-b border-border/60 bg-card/40">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div>
            <Link href="/admin" className="font-heading text-lg text-foreground">
              Dubai Moments Admin
            </Link>
            <p className="text-xs text-muted-foreground">
              {session.profile.display_name ?? session.profile.email} ·{" "}
              {session.profile.role.replace("_", " ")}
            </p>
          </div>
          <form action={logoutAction}>
            <button
              type="submit"
              className="rounded-md border border-border/70 px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:border-luxury-gold-muted/50 hover:text-foreground"
            >
              Sign out
            </button>
          </form>
        </div>
        <AdminNav />
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">{children}</main>
    </div>
  );
}
