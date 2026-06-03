import { Mail, MessageCircle, Phone } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type HelpChannel = {
  icon: LucideIcon;
  label: string;
  href: string;
};

const channels: HelpChannel[] = [
  {
    icon: MessageCircle,
    label: "WhatsApp Us",
    href: "https://wa.me/971501234567",
  },
  { icon: Phone, label: "Call Us +971 50 123 4567", href: "tel:+971501234567" },
  { icon: Mail, label: "Email Us", href: "mailto:hello@dubailuxe.travel" },
];

export function HelpCard() {
  return (
    <div className="rounded-2xl border border-border/60 bg-card p-5 md:p-6">
      <h2 className="font-heading text-lg text-foreground">Need Help?</h2>
      <p className="mt-1 text-xs text-muted-foreground">
        Our travel experts are here to help
      </p>

      <ul className="mt-4 space-y-2">
        {channels.map((channel) => (
          <li key={channel.label}>
            <a
              href={channel.href}
              className="group flex items-center gap-3 rounded-lg px-1 py-1.5 text-sm text-muted-foreground transition-luxury hover:text-luxury-gold"
            >
              <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-luxury-gold-muted/30 bg-luxury-gold/10 text-luxury-gold">
                <channel.icon className="size-4" aria-hidden />
              </span>
              {channel.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
