import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <section className="py-section">
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-luxury-gold-muted/30 bg-luxury-charcoal px-6 py-14 text-center md:px-12 md:py-20">
          <div
            aria-hidden
            className="absolute -top-24 left-1/2 size-72 -translate-x-1/2 rounded-full bg-luxury-gold/10 blur-3xl"
          />
          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full border border-luxury-gold-muted/30 bg-luxury-black/40 px-4 py-1.5 text-xs text-luxury-gold-soft">
              <Sparkles className="size-4" />
              AI-Powered Planning
            </span>
            <h2 className="mx-auto mt-6 max-w-2xl font-heading text-3xl text-foreground text-balance md:text-5xl">
              Let AI Plan Your Perfect{" "}
              <span className="gold-gradient-text">Dubai Experience</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground md:text-lg">
              Tell us your style and dates — we&apos;ll craft a complete luxury
              itinerary in seconds. No fees, no commitment.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="rounded-full transition-luxury"
              >
                <Link href="#planner">
                  Start planning free
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full border-border/80 bg-transparent transition-luxury hover:bg-luxury-elevated"
              >
                <Link href="#experiences">Browse experiences</Link>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
