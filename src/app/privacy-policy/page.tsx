import type { Metadata } from "next";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { LegalPage } from "@/components/legal/legal-page";
import { createPageMetadata } from "@/lib/site";

export const metadata: Metadata = createPageMetadata({
  title: "Privacy Policy",
  description:
    "How Caspaya handles information provided by visitors and data used for website operation and analytics.",
  path: "/privacy-policy",
});

const sections = [
  {
    title: "Information Caspaya may receive",
    items: [
      "Information you choose to include when you email Caspaya.",
      "Basic technical information recorded by hosting and security systems, such as IP address, browser type, requested page, and time of access.",
      "Aggregated website-use information when analytics is enabled.",
    ],
  },
  {
    title: "How information is used",
    items: [
      "To operate, secure, and improve the website.",
      "To respond to messages, corrections, source suggestions, and partnership enquiries.",
      "To understand which content is useful and identify technical problems.",
    ],
  },
  {
    title: "Analytics, cookies, and hosting",
    paragraphs: [
      "Caspaya may use Google Analytics when a measurement ID is configured. Analytics technologies can use cookies or similar identifiers to produce aggregated usage reports. The website is hosted using third-party infrastructure, which may process technical request logs to deliver and protect the service.",
      "You can restrict cookies through your browser settings. Doing so may affect some website functionality.",
    ],
  },
  {
    title: "Third-party links",
    paragraphs: [
      "Caspaya may link to external websites. Those services operate under their own privacy policies, and Caspaya does not control how they process information after you leave this website.",
    ],
  },
  {
    title: "Retention and disclosure",
    paragraphs: [
      "Information is kept only for as long as reasonably necessary for the purpose for which it was received, website security, or applicable record-keeping obligations. Caspaya does not sell personal information. Information may be disclosed to service providers that support website operation or when disclosure is required by law.",
    ],
  },
  {
    title: "Your choices",
    paragraphs: [
      "You may contact Caspaya to ask about information you previously submitted by email or to request a correction or deletion where reasonably applicable. Identity verification may be required before completing a request.",
    ],
  },
  {
    title: "Changes to this policy",
    paragraphs: [
      "This policy may be updated as the website, analytics setup, or commercial relationships change. The date shown at the top identifies the latest published version.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <LegalPage
        title="Privacy Policy"
        introduction="This policy explains the limited information Caspaya may receive when you visit the website or contact us."
        updatedAt="2026-08-24"
        sections={sections}
      />
      <Footer />
    </>
  );
}
