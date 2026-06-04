import { Accordion } from "@/components/shared/accordion";
import type { FaqSection } from "@/data";

type ExperienceFaqProps = {
  sections: FaqSection[];
};

export function ExperienceFaq({ sections }: ExperienceFaqProps) {
  return (
    <section aria-labelledby="faq-heading">
      <h2
        id="faq-heading"
        className="font-heading text-xl text-foreground md:text-2xl"
      >
        Good to Know
      </h2>
      <Accordion
        items={sections}
        defaultOpenId={sections[0]?.id}
        className="mt-5"
      />
    </section>
  );
}
