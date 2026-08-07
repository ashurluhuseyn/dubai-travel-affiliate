import Link from "next/link";

import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
};

export function Logo({ className }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        "font-heading text-xl tracking-wide transition-luxury hover:opacity-90 md:text-2xl",
        className
      )}
    >
      <span className="gold-gradient-text">{siteConfig.name}</span>
    </Link>
  );
}
