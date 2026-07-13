import type { Metadata } from "next";

import { isCmsExperiencesEnabled } from "@/lib/cms/flags";
import { requireAdmin } from "@/lib/cms/auth/require-admin";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function AdminDashboardPage() {
  const session = await requireAdmin();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-3xl text-foreground">Dashboard</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Phase 0 foundation is active. Content management screens will arrive in
          later phases. The public site continues to use static data.
        </p>
      </div>

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
              ? "Public reads will use Supabase when implemented"
              : "Static src/data (default)"
          }
        />
        <DashboardCard
          title="Public site"
          value="Unchanged"
          detail="All existing routes still serve static content"
        />
      </div>

      <section className="rounded-xl border border-border/60 bg-card/40 p-6">
        <h2 className="font-heading text-lg text-foreground">Next steps</h2>
        <ul className="mt-3 list-inside list-disc space-y-2 text-sm text-muted-foreground">
          <li>Run the SQL migration in your Supabase project</li>
          <li>Create an Auth user and matching admin_profiles row</li>
          <li>Phase 1: seed experiences and enable repository reads</li>
        </ul>
      </section>
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
