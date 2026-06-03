import type { Metadata } from "next";

import { DestinationGrid } from "@/components/destinations/destination-grid";
import { DestinationsHero } from "@/components/destinations/destinations-hero";
import { DestinationsPagination } from "@/components/destinations/destinations-pagination";
import { DestinationsStats } from "@/components/destinations/destinations-stats";
import { ExpertsCta } from "@/components/destinations/experts-cta";
import { FilterSidebar } from "@/components/destinations/filter-sidebar";
import { ResultsToolbar } from "@/components/destinations/results-toolbar";
import { Container } from "@/components/shared/container";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import {
  getDestinationExperiences,
  getResultsCount,
  getSortOptions,
} from "@/data";

export const metadata: Metadata = {
  title: "Destinations",
  description:
    "Browse 1000+ handpicked luxury Dubai experiences — filter by category, price, duration, rating, and more.",
  alternates: { canonical: "/destinations" },
};

const TOTAL_PAGES = 8;

export default function DestinationsPage() {
  const experiences = getDestinationExperiences();
  const sortOptions = getSortOptions();
  const resultsCount = getResultsCount();

  return (
    <>
      <Header />
      <main>
        <DestinationsHero />
        <DestinationsStats />

        <Container className="py-section">
          <div className="grid gap-8 lg:grid-cols-[300px_minmax(0,1fr)]">
            <FilterSidebar />

            <div>
              <ResultsToolbar
                resultsCount={resultsCount}
                sortOptions={sortOptions}
              />
              <div className="mt-6">
                <DestinationGrid experiences={experiences} />
              </div>
              <DestinationsPagination totalPages={TOTAL_PAGES} />
            </div>
          </div>
        </Container>

        <ExpertsCta />
      </main>
      <Footer />
    </>
  );
}
