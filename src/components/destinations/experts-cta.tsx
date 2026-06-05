import Link from "next/link";
import { Headphones } from "lucide-react";

import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";

export function ExpertsCta() {
  return (
    <section className="py-section">
      <Container>
        <div className="flex flex-col items-center gap-6 rounded-2xl border border-border/60 bg-luxury-charcoal px-6 py-8 text-center md:flex-row md:justify-between md:px-10 md:text-left">
          <div className="flex flex-col items-center gap-4 md:flex-row">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-full border border-luxury-gold-muted/30 bg-luxury-elevated text-luxury-gold">
              <Headphones className="size-5" />
            </span>
            <div>
              <h2 className="font-heading text-xl text-foreground md:text-2xl">
                Can&apos;t Find What You&apos;re Looking For?
              </h2>
              <p className="mt-1 max-w-xl text-sm text-muted-foreground">
                Our travel experts are ready to create a customized Dubai
                experience just for you.
              </p>
            </div>
          </div>
          <Button
            asChild
            size="lg"
            className="shrink-0 rounded-full transition-luxury"
          >
            <Link href="/contact">Contact Our Experts</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
