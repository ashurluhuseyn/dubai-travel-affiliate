import Link from "next/link";

import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
};

export function Logo({ className }: LogoProps) {
  const [prefix, suffix] = siteConfig.name.split(" ");

  return (
    <Link
      href="/"
      className={cn(
        "font-heading text-xl tracking-wide text-foreground transition-luxury hover:text-luxury-gold md:text-2xl",
        className
      )}
    >
      {prefix}
      {suffix ? (
        <>
          {" "}
          <span className="text-luxury-gold">{suffix}</span>
        </>
      ) : null}
    </Link>
  );
}
