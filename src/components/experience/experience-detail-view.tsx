import { ConciergeBell } from "lucide-react";

import { BookingCard } from "@/components/experience/booking-card";
import { ExperienceFaq } from "@/components/experience/experience-faq";
import { ExperienceGallery } from "@/components/experience/experience-gallery";
import { ExperienceHeader } from "@/components/experience/experience-header";
import { ExperienceHighlights } from "@/components/experience/experience-highlights";
import { ExperienceIncluded } from "@/components/experience/experience-included";
import { ExperienceItinerary } from "@/components/experience/experience-itinerary";
import { HelpCard } from "@/components/experience/help-card";
import { ImportantInformation } from "@/components/experience/important-information";
import { RelatedExperiences } from "@/components/experience/related-experiences";
import { SecureSpotCard } from "@/components/experience/secure-spot-card";
import { Breadcrumb } from "@/components/shared/breadcrumb";
import { Container } from "@/components/shared/container";
import { ContactCta } from "@/components/shared/contact-cta";
import { Section } from "@/components/shared/section";
import type { Experience, RelatedExperience } from "@/data";

type ExperienceDetailViewProps = {
  experience: Experience;
  relatedExperiences: RelatedExperience[];
};

export function ExperienceDetailView({
  experience,
  relatedExperiences,
}: ExperienceDetailViewProps) {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Tours", href: "/destinations" },
    { label: experience.category, href: "/destinations" },
    { label: experience.title },
  ];

  return (
    <>
      <Container>
        <Breadcrumb items={breadcrumbItems} />

        <div className="mt-6 grid grid-cols-1 gap-8 lg:mt-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-10 xl:grid-cols-[minmax(0,1fr)_24rem]">
          <div className="space-y-10 lg:space-y-12">
            <ExperienceHeader experience={experience} />

            <ExperienceGallery
              title={experience.title}
              images={experience.images}
              badge={experience.badge}
              extraCount={experience.galleryExtraCount}
            />

            <ExperienceHighlights highlights={experience.highlights} />

            <ExperienceIncluded items={experience.includedItems} />

            <ExperienceItinerary stops={experience.itinerary} />

            <div className="grid gap-8 md:grid-cols-2 md:gap-10">
              <ImportantInformation items={experience.importantInfo} />
              <ExperienceFaq faqs={experience.faqs} />
            </div>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="space-y-5">
              <BookingCard
                price={experience.price}
                currency={experience.currency}
                priceUnit={experience.priceUnit}
                affiliateUrl={experience.affiliateUrl}
                freeCancellation={experience.freeCancellation}
                cancellationText={experience.cancellationText}
              />
              <SecureSpotCard
                instantConfirmation={experience.instantConfirmation}
                mobileTicket={experience.mobileTicket}
              />
              <HelpCard />
            </div>
          </aside>
        </div>

        <div className="mt-14 lg:mt-20">
          <RelatedExperiences experiences={relatedExperiences} />
        </div>
      </Container>

      <Section>
        <ContactCta
          icon={ConciergeBell}
          title="Still Have Questions?"
          description="Our Dubai experts are here to help you plan the perfect experience."
          actionLabel="Contact Our Experts"
          actionHref="/contact"
        />
      </Section>
    </>
  );
}
