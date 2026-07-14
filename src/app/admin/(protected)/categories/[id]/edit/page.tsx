import { notFound } from "next/navigation";

import { AdminPageHeader } from "@/components/admin/layout/admin-page-header";
import { CategoryForm } from "@/components/admin/categories/category-form";
import { canWriteContent, requireAdmin } from "@/lib/cms/auth/require-admin";
import { getCategoryByIdForAdmin } from "@/lib/cms/repositories/categories";
import { createServerSupabaseClient } from "@/lib/cms/supabase/server";
import { categoryRowToFormValues } from "@/lib/cms/utils/category-form-mapper";

export const dynamic = "force-dynamic";

type EditCategoryPageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ success?: string }>;
};

export default async function EditCategoryPage({
  params,
  searchParams,
}: EditCategoryPageProps) {
  const session = await requireAdmin();
  const { id } = await params;
  const query = await searchParams;
  const supabase = await createServerSupabaseClient();
  const canEdit = canWriteContent(session.profile.role);

  const category = await getCategoryByIdForAdmin(supabase, id);

  if (!category) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Edit category"
        subtitle={category.label}
        breadcrumbs={[
          { label: "Categories", href: "/admin/categories" },
          { label: "Edit" },
        ]}
      />

      {query.success === "created" && (
        <p
          role="status"
          className="rounded-lg border border-luxury-gold-muted/30 bg-luxury-gold/10 px-4 py-3 text-sm text-luxury-gold-soft"
        >
          Category created successfully. You can continue editing below.
        </p>
      )}

      {canEdit ? (
        <CategoryForm
          mode="edit"
          categoryId={category.id}
          initialValues={categoryRowToFormValues(category)}
        />
      ) : (
        <p className="rounded-xl border border-border/60 bg-card/40 px-6 py-8 text-sm text-muted-foreground">
          Your role is read-only. Contact a super admin or editor to make
          changes.
        </p>
      )}
    </div>
  );
}
