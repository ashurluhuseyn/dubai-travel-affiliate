import { ProviderOfferCard } from "@/components/experience/provider-offer-card";
import type { AffiliateProvider } from "@/data";
import {
  formatLowestProviderPrice,
  sortProvidersForDisplay,
} from "@/lib/experience-providers";
import { cn } from "@/lib/utils";

type ProviderComparisonProps = {
  providers: AffiliateProvider[];
  experienceSlug: string;
  priceUnit: string;
  className?: string;
};

export function ProviderComparison({
  providers,
  experienceSlug,
  priceUnit,
  className,
}: ProviderComparisonProps) {
  const sortedProviders = sortProvidersForDisplay(providers);

  return (
    <section
      aria-labelledby="provider-comparison-heading"
      className={cn(
        "rounded-2xl border border-border/60 bg-card p-5 shadow-lg shadow-black/20 md:p-6",
        className
      )}
    >
      <div className="mb-6">
        <h2
          id="provider-comparison-heading"
          className="font-heading text-xl text-foreground md:text-2xl"
        >
          Compare Booking Options
        </h2>
        <p className="mt-1.5 text-sm text-muted-foreground">
          {formatLowestProviderPrice(providers)} · {sortedProviders.length}{" "}
          {sortedProviders.length === 1 ? "provider" : "providers"} available
        </p>
      </div>

      <div className="space-y-5">
        {sortedProviders.map((provider) => (
          <ProviderOfferCard
            key={provider.id}
            provider={provider}
            experienceSlug={experienceSlug}
            priceUnit={priceUnit}
          />
        ))}
      </div>
    </section>
  );
}
