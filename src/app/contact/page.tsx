import type { Metadata } from "next";
import { ContactHero } from "@/components/contact/contact-hero";
import { ContactMethods } from "@/components/contact/contact-methods";
import { PageLayout } from "@/components/layout/page-layout";
import { createPageMetadata } from "@/lib/site";

export const metadata: Metadata = createPageMetadata({
  title: "Contact Us",
  description:
    "Contact Caspaya about its Dubai travel content, corrections, sources, or future partnerships.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <PageLayout>
      <ContactHero />
      <ContactMethods />
    </PageLayout>
  );
}
