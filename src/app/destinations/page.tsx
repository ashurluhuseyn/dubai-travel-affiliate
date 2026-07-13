import type { Metadata } from "next";
import { Suspense } from "react";

import { DestinationsListing } from "@/components/destinations/destinations-listing";
import { PageLayout } from "@/components/layout/page-layout";
import { getPublicDestinationExperiences } from "@/lib/cms/content-source";
import { createPageMetadata } from "@/lib/site";

export const metadata: Metadata = createPageMetadata({
  title: "Browse Dubai Experiences & Tours",
  description:
    "Browse 1000+ handpicked luxury Dubai experiences. Filter by category, price, duration, rating, and availability to find your perfect adventure.",
  path: "/destinations",
});

function DestinationsListingFallback() {
  return (
    <div className="min-h-[50vh] pt-32" aria-hidden>
      <span className="sr-only">Loading experiences…</span>
    </div>
  );
}

export default async function DestinationsPage() {
  const experiences = await getPublicDestinationExperiences();

  return (
    <PageLayout>
      <Suspense fallback={<DestinationsListingFallback />}>
        <DestinationsListing experiences={experiences} />
      </Suspense>
    </PageLayout>
  );
}
