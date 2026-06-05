"use client";

import Image from "next/image";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { useState } from "react";

import { CheckList } from "@/components/shared/check-list";
import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";

const planBenefits = [
  "Personalized recommendations",
  "Tailor-made itineraries",
  "Exclusive experiences",
  "Best price guarantee",
];

const fieldClasses =
  "h-11 w-full rounded-lg border border-border/70 bg-luxury-black/40 px-3 text-sm text-foreground transition-luxury placeholder:text-muted-foreground focus:border-luxury-gold-muted/60 focus:outline-none";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    event.currentTarget.reset();
  };

  return (
    <section
      aria-labelledby="contact-form-heading"
      className="border-y border-border/60 bg-luxury-charcoal/40 py-section"
    >
      <Container>
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
          <div className="rounded-2xl border border-border/60 bg-card p-6 md:p-8">
            <h2
              id="contact-form-heading"
              className="font-heading text-2xl text-foreground md:text-3xl"
            >
              Send Us a Message
            </h2>
            <div className="gold-line mt-4 max-w-[6rem]" />

            <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="first-name" className="sr-only">
                    First name
                  </label>
                  <input
                    id="first-name"
                    name="firstName"
                    type="text"
                    autoComplete="given-name"
                    placeholder="First Name"
                    className={fieldClasses}
                  />
                </div>
                <div>
                  <label htmlFor="last-name" className="sr-only">
                    Last name
                  </label>
                  <input
                    id="last-name"
                    name="lastName"
                    type="text"
                    autoComplete="family-name"
                    placeholder="Last Name"
                    className={fieldClasses}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Email Address"
                  className={fieldClasses}
                />
              </div>

              <div>
                <label htmlFor="subject" className="sr-only">
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="Subject"
                  className={fieldClasses}
                />
              </div>

              <div>
                <label htmlFor="message" className="sr-only">
                  Your message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Your Message"
                  className="w-full rounded-lg border border-border/70 bg-luxury-black/40 px-3 py-2.5 text-sm text-foreground transition-luxury placeholder:text-muted-foreground focus:border-luxury-gold-muted/60 focus:outline-none"
                />
              </div>

              {submitted && (
                <p
                  role="status"
                  className="rounded-xl border border-luxury-gold-muted/30 bg-luxury-gold/10 px-4 py-3 text-sm text-luxury-gold-soft"
                >
                  Thank you for your message. Our team will get back to you
                  shortly.
                </p>
              )}

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button
                  type="submit"
                  size="lg"
                  className="rounded-full transition-luxury"
                >
                  Send Message
                  <ArrowRight className="size-4" />
                </Button>
                <p className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                  <ShieldCheck
                    className="size-3.5 text-luxury-gold-muted"
                    aria-hidden
                  />
                  Your information is safe with us. We respect your privacy.
                </p>
              </div>
            </form>
          </div>

          <div className="overflow-hidden rounded-2xl border border-border/60 bg-card">
            <div className="relative aspect-[16/9]">
              <Image
                src="https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1000&q=85"
                alt="Lantern-lit luxury lounge overlooking the Dubai coastline"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/50 to-transparent" />
            </div>
            <div className="p-6 md:p-8">
              <h3 className="font-heading text-xl text-foreground md:text-2xl">
                Let&apos;s Plan Your Dubai Experience
              </h3>
              <p className="mt-3 text-sm text-muted-foreground md:text-base">
                Whether it&apos;s a thrilling adventure, a luxury escape, or a
                custom itinerary — we&apos;re here to make it happen.
              </p>
              <CheckList items={planBenefits} className="mt-5" gap="sm" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
