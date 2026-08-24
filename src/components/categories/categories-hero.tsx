import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Breadcrumb } from "@/components/shared/breadcrumb";
import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";

const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "Categories" },
];

export function CategoriesHero() {
  return (
    <section className="pt-28 pb-10 lg:pt-36 lg:pb-16">
      <Container>
        <Breadcrumb items={breadcrumbItems} />

        <div className="mt-8 grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="animate-in fade-in slide-in-from-bottom-6 fill-mode-both duration-700">
            <h1 className="font-heading text-4xl leading-[1.05] text-foreground text-balance md:text-5xl lg:text-6xl">
              Explore Dubai by{" "}
              <span className="gold-gradient-text">Categories</span>
            </h1>
            <p className="mt-5 max-w-md text-muted-foreground md:text-lg">
              Browse broad themes for future Dubai guides, from desert
              landscapes and waterways to culture, dining, and city life.
            </p>
            <Button
              asChild
              size="lg"
              className="mt-8 rounded-full transition-luxury"
            >
              <Link href="/#experiences">
                Browse Experience Ideas
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-border/60 sm:aspect-[16/10] lg:aspect-[4/3]">
            <Image
              src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1400&q=85&fit=crop"
              alt="Dubai skyline illuminated at night"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-luxury-black/80 via-luxury-black/20 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-luxury-black/60 to-transparent lg:from-luxury-black/40" />
          </div>
        </div>
      </Container>
    </section>
  );
}
