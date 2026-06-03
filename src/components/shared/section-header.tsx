import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  label: string;
  title: string;
  description?: string;
  href?: string;
  linkLabel?: string;
  className?: string;
  align?: "left" | "center";
};

export function SectionHeader({
  label,
  title,
  description,
  href,
  linkLabel = "View all",
  className,
  align = "left",
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-10 md:mb-12",
        align === "center" && "text-center",
        className
      )}
    >
      <p className="label-luxury">{label}</p>
      <div
        className={cn(
          "mt-3 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",
          align === "center" && "sm:flex-col sm:items-center"
        )}
      >
        <div className={cn("max-w-2xl", align === "center" && "mx-auto")}>
          <h2 className="font-heading text-3xl text-foreground md:text-4xl lg:text-5xl text-balance">
            {title}
          </h2>
          {description && (
            <p className="mt-3 text-muted-foreground md:text-lg">{description}</p>
          )}
        </div>
        {href && (
          <Link
            href={href}
            className="group inline-flex shrink-0 items-center gap-2 text-sm text-luxury-gold-soft transition-luxury hover:text-luxury-gold"
          >
            {linkLabel}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        )}
      </div>
      <div className="gold-line mt-8 max-w-xs" />
    </div>
  );
}
