import type { DestinationExperience } from "@/types";

import { DestinationCard } from "./destination-card";

type DestinationGridProps = {
  experiences: DestinationExperience[];
};

export function DestinationGrid({ experiences }: DestinationGridProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {experiences.map((experience, index) => (
        <DestinationCard
          key={experience.id}
          experience={experience}
          priority={index < 3}
        />
      ))}
    </div>
  );
}
