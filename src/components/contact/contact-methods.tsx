import Link from "next/link";
import { ArrowRight, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { SectionHeader } from "@/components/shared/section-header";
import { getContactMethods, type ContactMethodIconKey } from "@/data";

const methodIcons: Record<ContactMethodIconKey, LucideIcon> = {
  whatsapp: MessageCircle,
  email: Mail,
  phone: Phone,
  location: MapPin,
};

export function ContactMethods() {
  const methods = getContactMethods();

  return (
    <Section>
      <SectionHeader label="Reach Out" title="Get in Touch" />
      <div className="grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2">
        {methods.map((method, index) => {
          const Icon = methodIcons[method.icon];
          return (
            <Reveal key={method.id} delay={index * 60}>
              <div className="flex h-full flex-col gap-3 rounded-xl border border-border/60 bg-card p-6 transition-luxury hover:-translate-y-1 hover:border-luxury-gold-muted/40">
                <span className="inline-flex size-12 items-center justify-center rounded-full border border-luxury-gold-muted/30 bg-luxury-gold/10 text-luxury-gold">
                  <Icon className="size-5" aria-hidden />
                </span>
                <h3 className="font-heading text-lg text-foreground">
                  {method.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {method.description}
                </p>
                <Link
                  href={method.href}
                  className="group mt-auto inline-flex items-center gap-1.5 pt-2 text-sm text-luxury-gold-soft transition-luxury hover:text-luxury-gold"
                >
                  {method.actionLabel}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
