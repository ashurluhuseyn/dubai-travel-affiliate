import Image from "next/image";
import { Search } from "lucide-react";

import { Breadcrumb } from "@/components/shared/breadcrumb";
import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";

const breadcrumbItems = [{ label: "Home", href: "/" }, { label: "Blog" }];

type BlogHeroProps = {
  initialSearch?: string;
};

export function BlogHero({ initialSearch = "" }: BlogHeroProps) {
  return (
    <section className="relative isolate overflow-hidden pt-28 pb-14 lg:pt-32 lg:pb-20">
      <Image
        src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&q=85"
        alt="Dubai skyline at night"
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-luxury-black/75" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-luxury-black/80 via-luxury-black/55 to-luxury-black" />

      <Container>
        <Breadcrumb items={breadcrumbItems} />

        <div className="mx-auto mt-10 max-w-2xl text-center">
          <p className="label-luxury">Our Blog</p>
          <h1 className="mt-3 font-heading text-4xl text-foreground text-balance md:text-5xl lg:text-6xl">
            Dubai Travel Stories
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground md:text-lg">
            Carefully researched guides and practical planning notes for
            exploring Dubai with clearer, more useful information.
          </p>

          <form
            action="/blog"
            method="get"
            role="search"
            className="mx-auto mt-8 flex w-full max-w-lg items-center gap-2 rounded-full border border-border/70 bg-luxury-charcoal/70 p-2 pl-5 backdrop-blur-xl"
          >
            <Search
              className="size-5 shrink-0 text-luxury-gold-muted"
              aria-hidden
            />
            <input
              type="search"
              name="search"
              defaultValue={initialSearch}
              aria-label="Search articles"
              placeholder="Search articles…"
              className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
            <Button
              type="submit"
              size="icon"
              className="size-9 shrink-0 rounded-full transition-luxury"
              aria-label="Search"
            >
              <Search className="size-4" />
            </Button>
          </form>
        </div>
      </Container>
    </section>
  );
}
