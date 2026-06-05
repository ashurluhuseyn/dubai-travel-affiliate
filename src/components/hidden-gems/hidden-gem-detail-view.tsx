import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, MapPin, Navigation, Package } from "lucide-react";

import { Container } from "@/components/shared/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { HiddenGemDetail } from "@/data";

type HiddenGemDetailViewProps = {
  gem: HiddenGemDetail;
};

export function HiddenGemDetailView({ gem }: HiddenGemDetailViewProps) {
  return (
    <article>
      <div className="relative aspect-[21/9] min-h-[16rem] overflow-hidden">
        <Image
          src={gem.image}
          alt={gem.imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-luxury-black/40 to-luxury-black/20" />
      </div>

      <Container className="py-section">
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="mb-6 -ml-2 text-muted-foreground hover:text-luxury-gold"
        >
          <Link href="/hidden-gems">
            <ArrowLeft className="size-4" />
            Back to Hidden Gems
          </Link>
        </Button>

        <header className="max-w-3xl">
          <Badge
            variant="outline"
            className="border-luxury-gold-muted/30 text-luxury-gold-soft"
          >
            {gem.badge}
          </Badge>
          <h1 className="mt-4 font-heading text-3xl leading-tight text-foreground text-balance md:text-5xl">
            {gem.title}
          </h1>
          <p className="mt-4 text-base text-muted-foreground md:text-lg">
            {gem.description}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5 text-luxury-gold-soft">
              <MapPin className="size-3.5" aria-hidden />
              {gem.location}
            </span>
            <span className="font-semibold text-luxury-gold-soft">{gem.price}</span>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {gem.tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="border-luxury-gold-muted/30 text-luxury-gold-soft"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </header>

        <section className="mt-10 max-w-3xl" aria-labelledby="highlights-heading">
          <h2
            id="highlights-heading"
            className="font-heading text-xl text-foreground md:text-2xl"
          >
            Highlights
          </h2>
          <ul className="mt-4 space-y-2">
            {gem.highlights.map((highlight) => (
              <li
                key={highlight}
                className="flex items-start gap-2 text-sm text-muted-foreground md:text-base"
              >
                <span
                  className="mt-2 size-1.5 shrink-0 rounded-full bg-luxury-gold"
                  aria-hidden
                />
                {highlight}
              </li>
            ))}
          </ul>
        </section>

        <div className="prose-luxury mt-10 max-w-3xl space-y-5 text-base leading-relaxed text-luxury-white-muted">
          {gem.content.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
        </div>

        <section
          className="mt-12 grid max-w-3xl gap-4 sm:grid-cols-3"
          aria-labelledby="tips-heading"
        >
          <h2 id="tips-heading" className="sr-only">
            Visitor tips
          </h2>
          <div className="rounded-xl border border-border/60 bg-card p-5">
            <span className="inline-flex size-9 items-center justify-center rounded-full border border-luxury-gold-muted/30 bg-luxury-gold/10 text-luxury-gold">
              <Clock className="size-4" aria-hidden />
            </span>
            <h3 className="mt-3 text-sm font-medium text-foreground">
              Best Time to Visit
            </h3>
            <p className="mt-1.5 text-sm text-muted-foreground">
              {gem.bestTimeToVisit}
            </p>
          </div>
          <div className="rounded-xl border border-border/60 bg-card p-5">
            <span className="inline-flex size-9 items-center justify-center rounded-full border border-luxury-gold-muted/30 bg-luxury-gold/10 text-luxury-gold">
              <Navigation className="size-4" aria-hidden />
            </span>
            <h3 className="mt-3 text-sm font-medium text-foreground">
              How to Get There
            </h3>
            <p className="mt-1.5 text-sm text-muted-foreground">
              {gem.howToGetThere}
            </p>
          </div>
          <div className="rounded-xl border border-border/60 bg-card p-5">
            <span className="inline-flex size-9 items-center justify-center rounded-full border border-luxury-gold-muted/30 bg-luxury-gold/10 text-luxury-gold">
              <Package className="size-4" aria-hidden />
            </span>
            <h3 className="mt-3 text-sm font-medium text-foreground">
              What to Bring
            </h3>
            <p className="mt-1.5 text-sm text-muted-foreground">
              {gem.whatToBring}
            </p>
          </div>
        </section>
      </Container>
    </article>
  );
}
