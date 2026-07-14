import { AdminPageHeader } from "@/components/admin/layout/admin-page-header";
import { ExperienceForm } from "@/components/admin/experiences/experience-form";
import { requireAdmin } from "@/lib/cms/auth/require-admin";
import { listCategoriesForAdmin } from "@/lib/cms/repositories/categories";
import { listExperiencePickerOptions } from "@/lib/cms/repositories/experiences";
import { createServerSupabaseClient } from "@/lib/cms/supabase/server";

export const dynamic = "force-dynamic";

export default async function NewExperiencePage() {
  await requireAdmin({ roles: ["super_admin", "editor"] });
  const supabase = await createServerSupabaseClient();
  const [categories, experienceOptions] = await Promise.all([
    listCategoriesForAdmin(supabase),
    listExperiencePickerOptions(supabase),
  ]);

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Create experience"
        breadcrumbs={[
          { label: "Experiences", href: "/admin/experiences" },
          { label: "New" },
        ]}
      />

      <ExperienceForm
        mode="create"
        categories={categories}
        experienceOptions={experienceOptions}
      />
    </div>
  );
}
