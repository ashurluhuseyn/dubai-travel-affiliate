import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { SectionHeader } from "@/components/shared/section-header";
import { Badge } from "@/components/ui/badge";
import { getLifestyleItems } from "@/data";
import { cn } from "@/lib/utils";

export function LuxuryLifestyle() {
  const lifestyleItems = getLifestyleItems();

  return (
    <Section id="lifestyle" muted>
      <SectionHeader
        align="center"
        label="Editorial Inspiration"
        title="Dubai Lifestyle Themes"
        description="Visual starting points for researching Dubai's leisure, dining, and city-life options."
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:auto-rows-[230px] lg:auto-rows-[240px]">
        {lifestyleItems.map((item, index) => (
          <Reveal
            key={item.id}
            delay={index * 80}
            className={cn(item.featured && "sm:col-span-2 sm:row-span-2")}
          >
            <Link
              href={item.href}
              className="group relative block h-full min-h-[230px] overflow-hidden rounded-2xl border border-border/60"
            >
              <Image
                src={item.image}
                alt={item.imageAlt}
                fill
                sizes={
                  item.featured
                    ? "(max-width: 640px) 100vw, 50vw"
                    : "(max-width: 640px) 100vw, 25vw"
                }
                className="object-cover transition-luxury-slow group-hover:scale-105"
                priority={item.featured}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/90 via-luxury-black/25 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-6">
                <Badge
                  variant="secondary"
                  className="w-fit border-luxury-gold-muted/30 bg-luxury-black/50 text-luxury-gold-soft backdrop-blur-sm"
                >
                  {item.tag}
                </Badge>
                <h3
                  className={cn(
                    "mt-3 font-heading text-foreground",
                    item.featured ? "text-2xl md:text-3xl" : "text-xl"
                  )}
                >
                  {item.title}
                </h3>
                <p className="mt-1 max-w-md text-sm text-muted-foreground">
                  {item.description}
                </p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-sm text-luxury-gold-soft transition-luxury group-hover:text-luxury-gold">
                  Discover more
                  <ArrowUpRight className="size-4" />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
