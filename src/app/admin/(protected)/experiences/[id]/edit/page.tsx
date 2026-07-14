import { notFound } from "next/navigation";

import { AdminPageHeader } from "@/components/admin/layout/admin-page-header";
import { ExperienceForm } from "@/components/admin/experiences/experience-form";
import { canWriteContent, requireAdmin } from "@/lib/cms/auth/require-admin";
import { listCategoriesForAdmin } from "@/lib/cms/repositories/categories";
import {
  getExperienceByIdForAdmin,
  listExperiencePickerOptions,
  listProvidersForExperience,
} from "@/lib/cms/repositories/experiences";
import { createServerSupabaseClient } from "@/lib/cms/supabase/server";
import {
  experienceRowToFormValues,
  providerRowToInput,
} from "@/lib/cms/utils/experience-form-mapper";

export const dynamic = "force-dynamic";

type EditExperiencePageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ success?: string }>;
};

export default async function EditExperiencePage({
  params,
  searchParams,
}: EditExperiencePageProps) {
  const session = await requireAdmin();
  const { id } = await params;
  const query = await searchParams;
  const supabase = await createServerSupabaseClient();
  const canEdit = canWriteContent(session.profile.role);

  const [experience, providers, categories, experienceOptions] = await Promise.all([
    getExperienceByIdForAdmin(supabase, id),
    listProvidersForExperience(supabase, id),
    listCategoriesForAdmin(supabase),
    listExperiencePickerOptions(supabase),
  ]);

  if (!experience) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Edit experience"
        subtitle={experience.title}
        breadcrumbs={[
          { label: "Experiences", href: "/admin/experiences" },
          { label: "Edit" },
        ]}
      />

      {query.success === "created" && (
        <p
          role="status"
          className="rounded-lg border border-luxury-gold-muted/30 bg-luxury-gold/10 px-4 py-3 text-sm text-luxury-gold-soft"
        >
          Experience created successfully. You can continue editing below.
        </p>
      )}

      {canEdit ? (
        <ExperienceForm
          mode="edit"
          experienceId={experience.id}
          initialValues={experienceRowToFormValues(experience)}
          initialProviders={providers.map(providerRowToInput)}
          categories={categories}
          experienceOptions={experienceOptions}
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
