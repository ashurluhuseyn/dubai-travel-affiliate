import type { Metadata } from "next";
import { notFound } from "next/navigation";
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
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Breadcrumb } from "@/components/shared/breadcrumb";
import { Container } from "@/components/shared/container";
import { ContactCta } from "@/components/shared/contact-cta";
import { Section } from "@/components/shared/section";
import { getExperienceDetail, getExperienceSlugs } from "@/data";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getExperienceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const experience = getExperienceDetail(slug);

  if (!experience) {
    return { title: "Experience not found" };
  }

  return {
    title: experience.title,
    description: experience.description,
    openGraph: {
      title: experience.title,
      description: experience.description,
      images: experience.gallery[0] ? [experience.gallery[0].src] : undefined,
    },
  };
}

export default async function ExperienceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const experience = getExperienceDetail(slug);

  if (!experience) {
    notFound();
  }

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Experiences", href: "/#experiences" },
    { label: experience.category, href: "/#experiences" },
    { label: experience.title },
  ];

  return (
    <>
      <Header />
      <main className="pt-28 lg:pt-32">
        <Container>
          <Breadcrumb items={breadcrumbItems} />

          <div className="mt-6 grid grid-cols-1 gap-8 lg:mt-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-10 xl:grid-cols-[minmax(0,1fr)_24rem]">
            <div className="space-y-10 lg:space-y-12">
              <ExperienceHeader
                title={experience.title}
                rating={experience.rating}
                reviews={experience.reviews}
                description={experience.description}
                meta={experience.meta}
              />

              <ExperienceGallery
                title={experience.title}
                images={experience.gallery}
                badge={experience.badge}
                extraCount={experience.galleryExtraCount}
              />

              <ExperienceHighlights highlights={experience.highlights} />

              <ExperienceIncluded items={experience.included} />

              <ExperienceItinerary stops={experience.itinerary} />

              <div className="grid gap-8 md:grid-cols-2 md:gap-10">
                <ImportantInformation items={experience.importantInfo} />
                <ExperienceFaq sections={experience.faqSections} />
              </div>
            </div>

            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="space-y-5">
                <BookingCard
                  price={experience.price}
                  priceUnit={experience.priceUnit}
                  affiliateUrl={experience.affiliateUrl}
                />
                <SecureSpotCard />
                <HelpCard />
              </div>
            </aside>
          </div>

          <div className="mt-14 lg:mt-20">
            <RelatedExperiences experiences={experience.related} />
          </div>
        </Container>

        <Section>
          <ContactCta
            icon={ConciergeBell}
            title="Still Have Questions?"
            description="Our Dubai experts are here to help you plan the perfect experience."
            actionLabel="Contact Our Experts"
            actionHref="#contact"
          />
        </Section>
      </main>
      <Footer />
    </>
  );
}
