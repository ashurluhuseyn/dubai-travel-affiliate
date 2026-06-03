import Link from "next/link";
import { Mail, MapPin, Share2 } from "lucide-react";

import { Container } from "@/components/shared/container";
import { Separator } from "@/components/ui/separator";
import { footerLinks } from "@/lib/data/home";
import { siteConfig } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-luxury-charcoal">
      <Container className="py-section">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="font-heading text-2xl text-foreground md:text-3xl"
            >
              {siteConfig.name.split(" ")[0]}
              <span className="text-luxury-gold"> Luxe</span>
            </Link>
            <p className="mt-4 max-w-md text-muted-foreground">
              {siteConfig.description}
            </p>
            <div className="mt-6 flex flex-col gap-2 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <MapPin className="size-4 text-luxury-gold-muted" />
                Dubai, United Arab Emirates
              </span>
              <a
                href="mailto:hello@dubailuxe.travel"
                className="inline-flex items-center gap-2 transition-luxury hover:text-luxury-gold"
              >
                <Mail className="size-4 text-luxury-gold-muted" />
                hello@dubailuxe.travel
              </a>
            </div>
          </div>

          <div>
            <h3 className="label-luxury mb-4">Explore</h3>
            <ul className="space-y-3">
              {footerLinks.explore.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-luxury hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="label-luxury mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-luxury hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-10 bg-border" />

        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <a
            href="#"
            aria-label="Social media"
            className="text-muted-foreground transition-luxury hover:text-luxury-gold"
          >
            <Share2 className="size-5" />
          </a>
        </div>
      </Container>
    </footer>
  );
}
