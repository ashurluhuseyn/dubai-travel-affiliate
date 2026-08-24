import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { DestinationExperience } from "@/data";

import { SaveButton } from "./save-button";

type DestinationCardProps = {
  experience: DestinationExperience;
  priority?: boolean;
};

export function DestinationCard({ experience, priority }: DestinationCardProps) {
  return (
    <Card className="group flex h-full flex-col gap-0 overflow-hidden border-border/60 bg-card py-0 transition-luxury hover:-translate-y-1 hover:border-luxury-gold-muted/40 hover:shadow-xl hover:shadow-luxury-gold/5">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Link href={experience.href} className="block h-full w-full">
          <Image
            src={experience.image}
            alt={experience.imageAlt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-luxury-slow group-hover:scale-105"
            priority={priority}
          />
        </Link>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-luxury-black/70 via-transparent to-luxury-black/10" />
        {experience.badge && (
          <Badge
            variant="secondary"
            className="pointer-events-none absolute left-3 top-3 border-luxury-gold-muted/30 bg-luxury-black/60 text-luxury-gold-soft backdrop-blur-sm"
          >
            {experience.badge}
          </Badge>
        )}
        <SaveButton className="absolute right-3 top-3" label={experience.title} />
      </div>

      <CardContent className="flex flex-1 flex-col gap-3 p-5">
        <Link href={experience.href}>
          <h3 className="font-heading text-lg leading-snug text-foreground transition-luxury group-hover:text-luxury-gold">
            {experience.title}
          </h3>
        </Link>

        <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
          <MapPin className="size-3.5 text-luxury-gold-muted" aria-hidden />
          {experience.location}
        </span>

        <p className="line-clamp-2 text-sm text-muted-foreground">
          {experience.description}
        </p>

        <div className="mt-auto flex items-center justify-between gap-3 pt-3">
          <Button asChild size="sm" className="rounded-full transition-luxury">
            <Link href={experience.href}>View Overview</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
