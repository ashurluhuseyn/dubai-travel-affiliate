import { Compass } from "lucide-react";

import { RelatedExperiences } from "@/components/experience/related-experiences";
import { ContactCta } from "@/components/shared/contact-cta";
import { Section } from "@/components/shared/section";
import type { RelatedExperience } from "@/data";

type HiddenGemsPageSectionsProps = {
  related: RelatedExperience[];
};

export function HiddenGemsPageSections({
  related,
}: HiddenGemsPageSectionsProps) {
  return (
    <>
      <Section>
        <RelatedExperiences
          experiences={related}
          title="Related Experiences"
        />
      </Section>

      <Section>
        <ContactCta
          icon={Compass}
          title="Want the local Dubai experience?"
          description="Get curated hidden spots, local tips and unique experiences selected for curious travelers."
          actionLabel="Get the Hidden Gems Guide"
          actionHref="/blog"
        />
      </Section>
    </>
  );
}
