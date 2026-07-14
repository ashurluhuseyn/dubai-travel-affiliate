import Link from "next/link";

import { AdminPageHeader } from "@/components/admin/layout/admin-page-header";
import { CategoryDeleteButton } from "@/components/admin/categories/category-delete-button";
import { Button } from "@/components/ui/button";
import { canDeleteContent } from "@/lib/cms/auth/admin-mutations";
import { requireAdmin } from "@/lib/cms/auth/require-admin";
import { listCategoriesForAdmin } from "@/lib/cms/repositories/categories";
import { createServerSupabaseClient } from "@/lib/cms/supabase/server";

export const dynamic = "force-dynamic";

type CategoriesPageProps = {
  searchParams: Promise<{ q?: string }>;
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export default async function AdminCategoriesPage({
  searchParams,
}: CategoriesPageProps) {
  const session = await requireAdmin();
  const params = await searchParams;
  const supabase = await createServerSupabaseClient();

  let categories: Awaited<ReturnType<typeof listCategoriesForAdmin>> = [];
  let loadError: string | null = null;

  try {
    categories = await listCategoriesForAdmin(supabase, {
      search: params.q,
    });
  } catch (error) {
    loadError =
      error instanceof Error ? error.message : "Failed to load categories.";
  }

  const canDelete = canDeleteContent(session.profile.role);

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Categories"
        subtitle="Manage experience categories stored in Supabase."
        actions={
          <Button asChild>
            <Link href="/admin/categories/new">Create category</Link>
          </Button>
        }
      />

      <form className="flex flex-wrap items-end gap-3" method="get">
        <div className="min-w-[14rem] flex-1 space-y-1">
          <label htmlFor="q" className="text-sm font-medium">
            Search
          </label>
          <input
            id="q"
            name="q"
            defaultValue={params.q ?? ""}
            placeholder="Name (label) or slug"
            className="h-9 w-full rounded-md border border-input bg-transparent px-2.5 text-sm"
          />
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

      {!loadError && categories.length === 0 && (
        <div className="rounded-xl border border-border/60 bg-card/40 px-6 py-10 text-center">
          <p className="text-muted-foreground">No categories found.</p>
          <Button asChild className="mt-4">
            <Link href="/admin/categories/new">Create your first category</Link>
          </Button>
        </div>
      )}

      {!loadError && categories.length > 0 && (
        <div className="overflow-x-auto rounded-xl border border-border/60">
          <table className="min-w-full text-sm">
            <thead className="border-b border-border/60 bg-card/60 text-left">
              <tr>
                <th className="px-4 py-3 font-medium">Name (label)</th>
                <th className="px-4 py-3 font-medium">Slug</th>
                <th className="px-4 py-3 font-medium">Description</th>
                <th className="px-4 py-3 font-medium">Icon key</th>
                <th className="px-4 py-3 font-medium">Sort order</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Updated</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr
                  key={category.id}
                  className="border-b border-border/40 last:border-0"
                >
                  <td className="px-4 py-3 font-medium text-foreground">
                    {category.label}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {category.slug}
                  </td>
                  <td className="max-w-xs truncate px-4 py-3 text-muted-foreground">
                    {category.description ?? "—"}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {category.icon_key ?? "—"}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {category.sort_order}
                  </td>
                  <td className="px-4 py-3 capitalize">{category.status}</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {formatDate(category.updated_at)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Button asChild variant="outline" size="sm">
                        <Link href={`/admin/categories/${category.id}/edit`}>
                          Edit
                        </Link>
                      </Button>
                      <CategoryDeleteButton
                        categoryId={category.id}
                        label={category.label}
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
