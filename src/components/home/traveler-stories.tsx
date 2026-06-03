import { Quote, Star } from "lucide-react";

import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeader } from "@/components/shared/section-header";
import { Card, CardContent } from "@/components/ui/card";
import { testimonials } from "@/data";

export function TravelerStories() {
  return (
    <section className="py-section">
      <Container>
        <SectionHeader
          align="center"
          label="Loved by Travelers"
          title="Traveler Stories"
          description="Real journeys, crafted by our concierge and remembered for a lifetime."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((item, index) => (
            <Reveal key={item.id} delay={index * 80}>
              <Card className="h-full border-border/60 bg-card">
                <CardContent className="flex h-full flex-col gap-4 p-6">
                  <Quote className="size-7 text-luxury-gold-muted" />
                  <div className="flex items-center gap-1">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="size-4 fill-luxury-gold text-luxury-gold"
                      />
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed text-luxury-white-muted">
                    “{item.quote}”
                  </p>
                  <div className="mt-auto flex items-center gap-3 border-t border-border/60 pt-4">
                    <span className="flex size-10 items-center justify-center rounded-full bg-luxury-gold/10 text-sm font-semibold text-luxury-gold">
                      {item.initials}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {item.author}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {item.role}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
