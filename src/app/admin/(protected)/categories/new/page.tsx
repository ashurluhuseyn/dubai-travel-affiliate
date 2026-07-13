import Link from "next/link";

import { CategoryForm } from "@/components/admin/categories/category-form";
import { requireAdmin } from "@/lib/cms/auth/require-admin";

export const dynamic = "force-dynamic";

export default async function NewCategoryPage() {
  await requireAdmin({ roles: ["super_admin", "editor"] });

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-muted-foreground">
          <Link href="/admin/categories" className="hover:underline">
            Categories
          </Link>
          <span className="mx-2">/</span>
          <span>New</span>
        </p>
        <h1 className="mt-2 font-heading text-3xl text-foreground">
          Create category
        </h1>
      </div>

      <CategoryForm mode="create" />
    </div>
  );
}
