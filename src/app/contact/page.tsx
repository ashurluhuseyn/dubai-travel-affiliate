import type { Metadata } from "next";
import { Sparkles } from "lucide-react";

import { ContactFaq } from "@/components/contact/contact-faq";
import { ContactForm } from "@/components/contact/contact-form";
import { ContactHero } from "@/components/contact/contact-hero";
import { ContactMethods } from "@/components/contact/contact-methods";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { ContactCta } from "@/components/shared/contact-cta";
import { Section } from "@/components/shared/section";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Have a question or want to plan a custom experience? Contact the Dubai Moments team — we're here to help you create unforgettable moments in Dubai.",
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
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
      </main>
      <Footer />
    </>
  );
}
