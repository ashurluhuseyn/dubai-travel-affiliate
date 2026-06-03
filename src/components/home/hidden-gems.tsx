import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";

import { Container } from "@/components/shared/container";
import { SectionHeader } from "@/components/shared/section-header";
import { hiddenGems } from "@/data";
import { cn } from "@/lib/utils";

const spanClasses: Record<string, string> = {
  tall: "sm:row-span-2",
  wide: "sm:col-span-2",
  default: "",
};

export function HiddenGems() {
  return (
    <section id="hidden-gems" className="scroll-mt-24 py-section">
      <Container>
        <SectionHeader
          align="center"
          label="Off the Beaten Path"
          title="Hidden Gems"
          description="Secret spots and local favorites that most travelers never discover."
        />
        <div className="grid auto-rows-[200px] grid-cols-1 gap-4 sm:auto-rows-[210px] sm:grid-cols-2 lg:grid-cols-4">
          {hiddenGems.map((gem) => (
            <Link
              key={gem.id}
              href={gem.href}
              className={cn(
                "group relative overflow-hidden rounded-2xl border border-border/60",
                spanClasses[gem.span]
              )}
            >
              <Image
                src={gem.image}
                alt={gem.imageAlt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-luxury-slow group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/90 via-luxury-black/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-5">
                <div>
                  <span className="inline-flex items-center gap-1.5 text-xs text-luxury-gold-soft">
                    <MapPin className="size-3.5" />
                    {gem.location}
                  </span>
                  <h3 className="mt-1 font-heading text-xl text-foreground">
                    {gem.title}
                  </h3>
                </div>
                <ArrowUpRight className="size-5 shrink-0 text-luxury-white-muted transition-luxury group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-luxury-gold" />
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
