import { AdminShell } from "@/components/admin/layout/admin-shell";
import { requireAdmin } from "@/lib/cms/auth/require-admin";

export const dynamic = "force-dynamic";

export default async function AdminProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await requireAdmin();

  const user = {
    name: session.profile.display_name ?? session.profile.email,
    email: session.profile.email,
    role: session.profile.role,
  };

  return <AdminShell user={user}>{children}</AdminShell>;
}
