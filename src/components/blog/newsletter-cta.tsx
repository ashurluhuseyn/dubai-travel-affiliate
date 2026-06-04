import { Mail } from "lucide-react";

import { Button } from "@/components/ui/button";

export function NewsletterCta() {
  return (
    <section
      aria-labelledby="newsletter-heading"
      className="relative overflow-hidden rounded-2xl border border-luxury-gold-muted/30 bg-luxury-charcoal p-6 md:p-10"
    >
      <div
        aria-hidden
        className="absolute -top-20 right-0 size-60 rounded-full bg-luxury-gold/10 blur-3xl"
      />
      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-4">
          <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-full border border-luxury-gold-muted/30 bg-luxury-gold/10 text-luxury-gold">
            <Mail className="size-5" aria-hidden />
          </span>
          <div>
            <h2
              id="newsletter-heading"
              className="font-heading text-2xl text-foreground"
            >
              Stay Updated
            </h2>
            <p className="mt-1 max-w-md text-sm text-muted-foreground">
              Subscribe to our newsletter and get the latest travel tips,
              exclusive deals, and inspiring stories from Dubai.
            </p>
          </div>
        </div>

        <form className="w-full max-w-md lg:w-auto">
          <div className="flex flex-col gap-3 sm:flex-row">
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              placeholder="Enter your email address"
              className="h-11 w-full rounded-full border border-border/70 bg-luxury-black/40 px-4 text-sm text-foreground transition-luxury placeholder:text-muted-foreground focus:border-luxury-gold-muted/60 focus:outline-none sm:w-64"
            />
            <Button
              type="submit"
              size="lg"
              className="shrink-0 rounded-full transition-luxury"
            >
              Subscribe
            </Button>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            No spam, unsubscribe at any time.
          </p>
        </form>
      </div>
    </section>
  );
}
