import { Accordion } from "@/components/shared/accordion";
import type { ExperienceFaq } from "@/data";

type ExperienceFaqProps = {
  faqs: ExperienceFaq[];
};

export function ExperienceFaq({ faqs }: ExperienceFaqProps) {
  const items = faqs.map((faq, index) => ({
    id: `faq-${index}`,
    title: faq.question,
    content: faq.answer,
  }));

  return (
    <section aria-labelledby="faq-heading">
      <h2
        id="faq-heading"
        className="font-heading text-xl text-foreground md:text-2xl"
      >
        Good to Know
      </h2>
      <Accordion
        items={items}
        defaultOpenId={items[0]?.id}
        className="mt-5"
      />
    </section>
  );
}
