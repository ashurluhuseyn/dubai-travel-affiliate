import type { Metadata } from "next";
import { Sparkles } from "lucide-react";

import { ContactFaq } from "@/components/contact/contact-faq";
import { ContactForm } from "@/components/contact/contact-form";
import { ContactHero } from "@/components/contact/contact-hero";
import { ContactMethods } from "@/components/contact/contact-methods";
import { PageLayout } from "@/components/layout/page-layout";
import { ContactCta } from "@/components/shared/contact-cta";
import { Section } from "@/components/shared/section";
import { createPageMetadata } from "@/lib/site";

export const metadata: Metadata = createPageMetadata({
  title: "Contact Us",
  description:
    "Have a question or want to plan a custom Dubai experience? Reach our travel experts via WhatsApp, email, or phone — available 24/7 to help you.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <PageLayout>
      <ContactHero />
      <ContactMethods />
      <ContactForm />
      <ContactFaq />

      <Section>
        <ContactCta
          icon={Sparkles}
          title="Ready to Create Unforgettable Moments in Dubai?"
          description="Our travel experts are just a message away. Let's turn your dream trip into reality."
          actionLabel="Plan Your Experience"
          actionHref="/destinations"
        />
      </Section>
    </PageLayout>
  );
}
