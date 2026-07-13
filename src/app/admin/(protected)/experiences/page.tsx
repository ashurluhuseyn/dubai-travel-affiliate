import Link from "next/link";

import { ExperienceDeleteButton } from "@/components/admin/experiences/experience-delete-button";
import { Button } from "@/components/ui/button";
import { canDeleteContent } from "@/lib/cms/auth/admin-mutations";
import { requireAdmin } from "@/lib/cms/auth/require-admin";
import { createServerSupabaseClient } from "@/lib/cms/supabase/server";
import { listExperiencesForAdmin } from "@/lib/cms/repositories/experiences";

export const dynamic = "force-dynamic";

type ExperiencesPageProps = {
  searchParams: Promise<{ q?: string; status?: string }>;
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export default async function AdminExperiencesPage({
  searchParams,
}: ExperiencesPageProps) {
  const session = await requireAdmin();
  const params = await searchParams;
  const supabase = await createServerSupabaseClient();

  const statusFilter =
    params.status === "draft" || params.status === "published"
      ? params.status
      : undefined;

  let experiences: Awaited<ReturnType<typeof listExperiencesForAdmin>> = [];
  let loadError: string | null = null;

  try {
    experiences = await listExperiencesForAdmin(supabase, {
      search: params.q,
      status: statusFilter,
    });
  } catch (error) {
    loadError =
      error instanceof Error ? error.message : "Failed to load experiences.";
  }

  const canDelete = canDeleteContent(session.profile.role);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl text-foreground">Experiences</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Manage experience content stored in Supabase.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/experiences/new">Create experience</Link>
        </Button>
      </div>

      <form className="flex flex-wrap items-end gap-3" method="get">
        <div className="min-w-[14rem] flex-1 space-y-1">
          <label htmlFor="q" className="text-sm font-medium">
            Search
          </label>
          <input
            id="q"
            name="q"
            defaultValue={params.q ?? ""}
            placeholder="Title or slug"
            className="h-9 w-full rounded-md border border-input bg-transparent px-2.5 text-sm"
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="status" className="text-sm font-medium">
            Status
          </label>
          <select
            id="status"
            name="status"
            defaultValue={params.status ?? "all"}
            className="h-9 rounded-md border border-input bg-transparent px-2.5 text-sm"
          >
            <option value="all">All statuses</option>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
        <Button type="submit" variant="outline">
          Apply
        </Button>
      </form>

      {loadError && (
        <p
          role="alert"
          className="rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive"
        >
          {loadError}
        </p>
      )}

      {!loadError && experiences.length === 0 && (
        <div className="rounded-xl border border-border/60 bg-card/40 px-6 py-10 text-center">
          <p className="text-muted-foreground">No experiences found.</p>
          <Button asChild className="mt-4">
            <Link href="/admin/experiences/new">Create your first experience</Link>
          </Button>
        </div>
      )}

      {!loadError && experiences.length > 0 && (
        <div className="overflow-x-auto rounded-xl border border-border/60">
          <table className="min-w-full text-sm">
            <thead className="border-b border-border/60 bg-card/60 text-left">
              <tr>
                <th className="px-4 py-3 font-medium">Title</th>
                <th className="px-4 py-3 font-medium">Slug</th>
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Highlight</th>
                <th className="px-4 py-3 font-medium">Updated</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {experiences.map((experience) => (
                <tr
                  key={experience.id}
                  className="border-b border-border/40 last:border-0"
                >
                  <td className="px-4 py-3 font-medium text-foreground">
                    {experience.title}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {experience.slug}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {experience.category_label ?? "—"}
                  </td>
                  <td className="px-4 py-3 capitalize">{experience.status}</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {experience.badge ??
                      (experience.recommended_score > 0
                        ? `Score ${experience.recommended_score}`
                        : "—")}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {formatDate(experience.updated_at)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Button asChild variant="outline" size="sm">
                        <Link href={`/admin/experiences/${experience.id}/edit`}>
                          Edit
                        </Link>
                      </Button>
                      <ExperienceDeleteButton
                        experienceId={experience.id}
                        title={experience.title}
                        canDelete={canDelete}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
