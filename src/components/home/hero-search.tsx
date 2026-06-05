"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRight, Search } from "lucide-react";

import { Button } from "@/components/ui/button";

export function HeroSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) {
      router.push("/destinations");
      return;
    }
    router.push(`/destinations?search=${encodeURIComponent(trimmed)}`);
  };

  return (
    <form
      className="mt-8 flex w-full max-w-xl flex-col gap-3 rounded-2xl border border-border/70 bg-luxury-charcoal/70 p-3 backdrop-blur-xl sm:flex-row sm:items-center sm:rounded-full sm:pl-6"
      role="search"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-1 items-center gap-3">
        <Search className="size-5 shrink-0 text-luxury-gold-muted" />
        <input
          type="search"
          aria-label="Search experiences"
          placeholder="Search desert safaris, yachts, dining…"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
        />
      </div>
      <Button type="submit" size="lg" className="rounded-full transition-luxury">
        Explore
        <ArrowRight className="size-4" />
      </Button>
    </form>
  );
}
