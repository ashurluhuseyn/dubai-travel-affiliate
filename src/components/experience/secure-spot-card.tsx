import { ShieldCheck, Smartphone, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const items: { icon: LucideIcon; label: string }[] = [
  { icon: Zap, label: "Instant Confirmation" },
  { icon: Smartphone, label: "Mobile Ticket Accepted" },
  { icon: ShieldCheck, label: "Secure Payment" },
];

export function SecureSpotCard() {
  return (
    <div className="rounded-2xl border border-border/60 bg-card p-5 md:p-6">
      <h2 className="font-heading text-lg text-foreground">Secure Your Spot</h2>
      <p className="mt-1 text-xs text-muted-foreground">Only takes 2 minutes</p>

      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item.label} className="flex items-center gap-3 text-sm">
            <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-luxury-gold-muted/30 bg-luxury-gold/10 text-luxury-gold">
              <item.icon className="size-4" aria-hidden />
            </span>
            <span className="text-muted-foreground">{item.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
