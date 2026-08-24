import type { Metadata } from "next";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { LegalPage } from "@/components/legal/legal-page";
import { createPageMetadata } from "@/lib/site";

export const metadata: Metadata = createPageMetadata({
  title: "Terms & Conditions",
  description:
    "Terms governing access to Caspaya and the use of its independent travel-information content.",
  path: "/terms",
});

const sections = [
  {
    title: "Informational website",
    paragraphs: [
      "Caspaya publishes independent travel information and editorial content. Caspaya does not currently sell or operate tours, act as a booking agent, process payments, issue tickets, or manage cancellations and refunds.",
    ],
  },
  {
    title: "Travel information can change",
    paragraphs: [
      "Entry rules, opening hours, transport services, prices, availability, and other travel details can change without notice. Content is provided for general planning and should be checked directly with the relevant official authority or service provider before making a decision.",
    ],
  },
  {
    title: "Third-party websites and services",
    paragraphs: [
      "Links to third parties are provided for convenience or source attribution. If commercial links are introduced, any booking or purchase will take place under the third party's terms. Caspaya is not responsible for an external service's availability, representations, payments, fulfilment, customer support, or privacy practices.",
    ],
  },
  {
    title: "Acceptable use",
    items: [
      "Do not misuse the website, attempt unauthorised access, or interfere with its operation.",
      "Do not copy or republish substantial parts of Caspaya content without permission, except where permitted by law.",
      "Do not use the website in a way that infringes the rights of others or violates applicable law.",
    ],
  },
  {
    title: "Intellectual property",
    paragraphs: [
      "Caspaya's original text, branding, layout, and other original materials are protected by applicable intellectual-property rules. Third-party images, marks, and referenced materials remain the property of their respective owners and may be used under separate licences or permissions.",
    ],
  },
  {
    title: "No professional advice or guarantee",
    paragraphs: [
      "Content is not legal, immigration, financial, medical, or safety advice. Caspaya does not guarantee that every page is complete, error-free, or suitable for a particular trip. Use of the website and reliance on its content are at your own discretion.",
    ],
  },
  {
    title: "Changes and availability",
    paragraphs: [
      "Caspaya may update, correct, remove, or reorganise content and may change or suspend parts of the website. These terms may also be updated, with the latest version identified by the date above.",
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      <Header />
      <LegalPage
        title="Terms & Conditions"
        introduction="These terms explain the role of Caspaya and the conditions that apply when you use this website."
        updatedAt="2026-08-24"
        sections={sections}
      />
      <Footer />
    </>
  );
}
