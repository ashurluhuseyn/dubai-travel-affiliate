import { AdminPageHeader } from "@/components/admin/layout/admin-page-header";
import { CategoryForm } from "@/components/admin/categories/category-form";
import { requireAdmin } from "@/lib/cms/auth/require-admin";

export const dynamic = "force-dynamic";

export default async function NewCategoryPage() {
  await requireAdmin({ roles: ["super_admin", "editor"] });

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Create category"
        breadcrumbs={[
          { label: "Categories", href: "/admin/categories" },
          { label: "New" },
        ]}
      />

      <CategoryForm mode="create" />
    </div>
  );
}
