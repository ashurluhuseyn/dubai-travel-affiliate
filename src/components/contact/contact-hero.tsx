import Image from "next/image";
import { Breadcrumb } from "@/components/shared/breadcrumb";
import { Container } from "@/components/shared/container";

const breadcrumbItems = [{ label: "Home", href: "/" }, { label: "Contact Us" }];

export function ContactHero() {
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
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-luxury-black via-luxury-black/80 to-luxury-black/30" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-luxury-black via-transparent to-luxury-black/50" />

      <Container>
        <Breadcrumb items={breadcrumbItems} />

        <div className="mt-10 max-w-2xl">
          <p className="label-luxury">Get in Touch</p>
          <h1 className="mt-3 font-heading text-4xl leading-[1.05] text-foreground text-balance md:text-5xl lg:text-6xl">
            Contact <span className="gold-gradient-text">Us</span>
          </h1>
          <p className="mt-5 max-w-xl text-muted-foreground md:text-lg">
            Found something that needs correcting, have a useful source, or
            want to discuss a future partnership? Send Caspaya an email.
          </p>
        </div>
      </Container>
    </section>
  );
}
