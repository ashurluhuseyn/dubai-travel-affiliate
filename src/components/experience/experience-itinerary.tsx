import type { ExperienceItineraryItem } from "@/data";

type ExperienceItineraryProps = {
  stops: ExperienceItineraryItem[];
};

export function ExperienceItinerary({ stops }: ExperienceItineraryProps) {
  return (
    <section aria-labelledby="itinerary-heading">
      <h2
        id="itinerary-heading"
        className="font-heading text-xl text-foreground md:text-2xl"
      >
        Itinerary
      </h2>

      <ol className="mt-6 space-y-0">
        {stops.map((stop, index) => {
          const isLast = index === stops.length - 1;
          return (
            <li key={`${stop.time}-${stop.title}`} className="flex gap-4">
              <div className="flex flex-col items-center">
                <span
                  className="mt-1 inline-flex size-3 shrink-0 items-center justify-center rounded-full border border-luxury-gold bg-luxury-gold/20"
                  aria-hidden
                >
                  <span className="size-1.5 rounded-full bg-luxury-gold" />
                </span>
                {!isLast && (
                  <span
                    className="my-1 w-px flex-1 bg-gradient-to-b from-luxury-gold-muted/60 to-luxury-gold-muted/10"
                    aria-hidden
                  />
                )}
              </div>
              <div className={isLast ? "pb-0" : "pb-7"}>
                <p className="text-sm font-semibold text-luxury-gold-soft">
                  {stop.time}
                </p>
                <p className="mt-0.5 text-sm text-foreground">{stop.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {stop.description}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
