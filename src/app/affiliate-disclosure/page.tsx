import type { Metadata } from "next";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { LegalPage } from "@/components/legal/legal-page";
import { createPageMetadata } from "@/lib/site";

export const metadata: Metadata = createPageMetadata({
  title: "Affiliate Disclosure",
  description:
    "How Caspaya will disclose and handle affiliate relationships when commercial travel links are introduced.",
  path: "/affiliate-disclosure",
});

const sections = [
  {
    title: "Current status",
    paragraphs: [
      "Caspaya does not currently have active affiliate booking partners or live affiliate offers. Existing editorial content is being prepared before applications are made to third-party travel platforms.",
    ],
  },
  {
    title: "How affiliate links may work in the future",
    paragraphs: [
      "If affiliate links are introduced, Caspaya may receive a commission when a visitor follows a clearly identified link and completes an eligible booking or purchase on a third-party website. This would normally be at no additional cost to the visitor.",
    ],
  },
  {
    title: "Clear disclosure",
    paragraphs: [
      "A disclosure will appear close to commercial links where it is useful to readers. Affiliate links will also be marked for search engines using appropriate link attributes. Caspaya will not describe a demo, placeholder, or inactive link as a live booking offer.",
    ],
  },
  {
    title: "Editorial independence",
    paragraphs: [
      "Potential commission does not guarantee positive coverage or determine factual conclusions. Caspaya aims to separate research and editorial judgement from commercial availability and will not invent personal experience, reviews, prices, or provider performance.",
    ],
  },
  {
    title: "Third-party responsibility",
    paragraphs: [
      "Future bookings, payments, confirmations, cancellations, refunds, fulfilment, and customer support will be handled by the third-party platform identified before the visitor leaves Caspaya. The third party's terms and policies will apply.",
    ],
  },
];

export default function AffiliateDisclosurePage() {
  return (
    <>
      <Header />
      <LegalPage
        title="Affiliate Disclosure"
        introduction="Caspaya believes commercial relationships should be easy to understand. This page describes the current position and the rules that will apply when affiliate links are introduced."
        updatedAt="2026-08-24"
        sections={sections}
      />
      <Footer />
    </>
  );
}
