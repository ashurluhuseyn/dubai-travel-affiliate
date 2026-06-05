import { Accordion } from "@/components/shared/accordion";
import { Section } from "@/components/shared/section";
import { SectionHeader } from "@/components/shared/section-header";
import { getContactFaqs } from "@/data";

export function ContactFaq() {
  const faqs = getContactFaqs();
  const midpoint = Math.ceil(faqs.length / 2);
  const columns = [faqs.slice(0, midpoint), faqs.slice(midpoint)];

  return (
    <Section id="faq">
      <SectionHeader
        label="Answers"
        title="Frequently Asked Questions"
        href="/contact#faq"
        linkLabel="View All FAQs"
      />
      <div className="grid gap-5 md:grid-cols-2">
        {columns.map((column, index) => (
          <Accordion key={index} items={column} />
        ))}
      </div>
    </Section>
  );
}
