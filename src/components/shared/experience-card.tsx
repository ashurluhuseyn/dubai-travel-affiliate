import Image from "next/image";
import Link from "next/link";
import { MapPin, Star } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { Experience } from "@/data";
import { cn } from "@/lib/utils";

type ExperienceCardProps = {
  experience: Experience;
  className?: string;
  priority?: boolean;
};

export function ExperienceCard({
  experience,
  className,
  priority = false,
}: ExperienceCardProps) {
  return (
    <Card
      className={cn(
        "group gap-0 overflow-hidden border-border/60 bg-card py-0 transition-luxury hover:-translate-y-1 hover:border-luxury-gold-muted/40 hover:shadow-xl hover:shadow-luxury-gold/5",
        className
      )}
    >
      <Link href={experience.href} className="flex h-full flex-col">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={experience.image}
            alt={experience.imageAlt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-luxury-slow group-hover:scale-105"
            priority={priority}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/80 via-luxury-black/15 to-transparent" />
          <Badge
            variant="secondary"
            className="absolute left-3 top-3 border-luxury-gold-muted/30 bg-luxury-black/60 text-luxury-gold-soft backdrop-blur-sm"
          >
            {experience.category}
          </Badge>
          <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-luxury-black/60 px-2.5 py-1 text-xs font-medium text-luxury-white backdrop-blur-sm">
            <Star className="size-3 fill-luxury-gold text-luxury-gold" />
            {experience.rating.toFixed(1)}
          </span>
        </div>

        <CardContent className="flex flex-1 flex-col gap-2 p-5">
          <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
            <MapPin className="size-3.5 text-luxury-gold-muted" />
            {experience.location}
          </span>
          <h3 className="font-heading text-lg leading-snug text-foreground transition-luxury group-hover:text-luxury-gold">
            {experience.title}
          </h3>
          <div className="mt-auto flex items-end justify-between pt-3">
            <span className="text-xs text-muted-foreground">
              {experience.reviews.toLocaleString()} reviews
            </span>
            <span className="text-sm">
              <span className="text-muted-foreground">from </span>
              <span className="font-semibold text-luxury-gold-soft">
                {experience.price}
              </span>
            </span>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
