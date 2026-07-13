import Link from "next/link";

import { ExperienceForm } from "@/components/admin/experiences/experience-form";
import { requireAdmin } from "@/lib/cms/auth/require-admin";
import { listCategoriesForAdmin } from "@/lib/cms/repositories/categories";
import { createServerSupabaseClient } from "@/lib/cms/supabase/server";

export const dynamic = "force-dynamic";

export default async function NewExperiencePage() {
  await requireAdmin({ roles: ["super_admin", "editor"] });
  const supabase = await createServerSupabaseClient();
  const categories = await listCategoriesForAdmin(supabase);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-muted-foreground">
          <Link href="/admin/experiences" className="hover:underline">
            Experiences
          </Link>
          <span className="mx-2">/</span>
          <span>New</span>
        </p>
        <h1 className="mt-2 font-heading text-3xl text-foreground">
          Create experience
        </h1>
      </div>

      <ExperienceForm mode="create" categories={categories} />
    </div>
  );
}
