import type { Metadata } from "next";
import Link from "next/link";

import { AdminPageHeader } from "@/components/admin/layout/admin-page-header";
import { isCmsExperiencesEnabled } from "@/lib/cms/flags";
import { requireAdmin } from "@/lib/cms/auth/require-admin";
import { getAffiliateDashboardSummary } from "@/lib/cms/repositories/analytics";
import { createServerSupabaseClient } from "@/lib/cms/supabase/server";

export const metadata: Metadata = {
  title: "Dashboard",
};

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const session = await requireAdmin();
  const supabase = await createServerSupabaseClient();

  let affiliateSummary = { clicksToday: 0, clicksLast30Days: 0 };
  try {
    affiliateSummary = await getAffiliateDashboardSummary(supabase);
  } catch {
    affiliateSummary = { clicksToday: 0, clicksLast30Days: 0 };
  }

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Dashboard"
        subtitle="Manage published experiences, categories, and review outbound affiliate click activity."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <DashboardCard
          title="Signed in as"
          value={session.profile.email}
          detail={session.profile.role.replace("_", " ")}
        />
        <DashboardCard
          title="CMS experiences"
          value={isCmsExperiencesEnabled() ? "Enabled" : "Disabled"}
          detail={
            isCmsExperiencesEnabled()
              ? "Public reads use Supabase"
              : "Static src/data (default)"
          }
        />
        <article className="rounded-xl border border-border/60 bg-card/40 p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-luxury-gold-muted">
            Affiliate clicks
          </p>
          <p className="mt-2 font-heading text-xl text-foreground">
            {affiliateSummary.clicksToday} today
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            {affiliateSummary.clicksLast30Days} in the last 30 days
          </p>
          <Link
            href="/admin/analytics"
            className="mt-3 inline-block text-sm text-luxury-gold-soft hover:underline"
          >
            View analytics
          </Link>
        </article>
      </div>
    </div>
  );
}

function DashboardCard({
  title,
  value,
  detail,
}: {
  title: string;
  value: string;
  detail: string;
}) {
  return (
    <article className="rounded-xl border border-border/60 bg-card/40 p-5">
      <p className="text-xs font-medium uppercase tracking-wide text-luxury-gold-muted">
        {title}
      </p>
      <p className="mt-2 font-heading text-xl text-foreground">{value}</p>
      <p className="mt-1 text-sm text-muted-foreground">{detail}</p>
    </article>
  );
}
