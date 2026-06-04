import Image from "next/image";

import { CheckList } from "@/components/shared/check-list";
import { Section } from "@/components/shared/section";
import { aboutMissionBenefits, aboutMissionImage, aboutMissionParagraph } from "@/data";

export function OurMission() {
  return (
    <Section>
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <div>
          <p className="label-luxury">Our Mission</p>
          <h2 className="mt-3 font-heading text-3xl text-foreground text-balance md:text-4xl">
            To Inspire, Connect &amp; Create{" "}
            <span className="gold-gradient-text">Memories</span>
          </h2>
          <p className="mt-5 text-muted-foreground md:text-lg">
            {aboutMissionParagraph}
          </p>
          <CheckList items={aboutMissionBenefits} className="mt-7" />
        </div>

        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border/60">
          <Image
            src={aboutMissionImage.src}
            alt={aboutMissionImage.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/50 to-transparent" />
        </div>
      </div>
    </Section>
  );
}
