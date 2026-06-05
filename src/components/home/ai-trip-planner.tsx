"use client";

import { Bot, Send, Sparkles } from "lucide-react";
import { useState } from "react";

import { Section } from "@/components/shared/section";
import { SectionHeader } from "@/components/shared/section-header";
import { Badge } from "@/components/ui/badge";
import { getChatPreview, getItinerary, getPlannerChips } from "@/data";
import { cn } from "@/lib/utils";

export function AiTripPlanner() {
  const chatPreview = getChatPreview();
  const itinerary = getItinerary();
  const plannerChips = getPlannerChips();
  const [prompt, setPrompt] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <Section id="planner">
      <SectionHeader
        align="center"
        label="Powered by AI"
        title="AI Trip Planner"
        description="Describe your dream trip and get a tailored Dubai itinerary in seconds."
      />

      <div className="grid items-start gap-6 lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          <div className="rounded-2xl border border-border/70 bg-luxury-charcoal/60 p-4 backdrop-blur-sm sm:p-6">
            <div className="flex items-center gap-3 border-b border-border/60 pb-4">
              <span className="flex size-9 items-center justify-center rounded-full bg-luxury-gold/10 text-luxury-gold">
                <Sparkles className="size-4" />
              </span>
              <div>
                <p className="text-sm font-medium text-foreground">
                  Dubai Concierge AI
                </p>
                <p className="text-xs text-luxury-gold-soft">Online now</p>
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-4">
              {chatPreview.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex gap-2.5",
                    message.role === "user" && "flex-row-reverse"
                  )}
                >
                  {message.role === "assistant" && (
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-luxury-gold/10 text-luxury-gold">
                      <Bot className="size-4" />
                    </span>
                  )}
                  <p
                    className={cn(
                      "max-w-[80%] rounded-2xl px-4 py-2.5 text-sm",
                      message.role === "assistant"
                        ? "rounded-tl-sm bg-luxury-elevated text-luxury-white-muted"
                        : "rounded-tr-sm bg-luxury-gold/15 text-foreground"
                    )}
                  >
                    {message.content}
                  </p>
                </div>
              ))}
            </div>

            <form
              className="mt-4 flex items-center gap-2 rounded-full border border-border/70 bg-luxury-black/40 py-2 pl-4 pr-2"
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                value={prompt}
                onChange={(event) => {
                  setPrompt(event.target.value);
                  setSubmitted(false);
                }}
                placeholder="Ask the concierge anything…"
                aria-label="Describe your dream Dubai trip"
                className="min-w-0 flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Send trip request"
                className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-luxury hover:opacity-90"
              >
                <Send className="size-4" />
              </button>
            </form>

            {submitted && (
              <p
                role="status"
                className="mt-3 rounded-xl border border-luxury-gold-muted/30 bg-luxury-gold/10 px-4 py-3 text-sm text-luxury-gold-soft"
              >
                AI Planner is launching soon. We&apos;re building personalized
                itineraries — check back shortly.
              </p>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {plannerChips.map((chip) => (
              <button
                key={chip}
                type="button"
                onClick={() => {
                  setPrompt(chip);
                  setSubmitted(false);
                }}
                className="rounded-full border border-border/70 bg-luxury-elevated/60 px-3.5 py-1.5 text-xs text-muted-foreground transition-luxury hover:border-luxury-gold-muted/40 hover:text-foreground"
              >
                {chip}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border/70 bg-luxury-charcoal/60 p-4 backdrop-blur-sm sm:p-6">
          <div className="flex items-center justify-between gap-3 border-b border-border/60 pb-4">
            <div>
              <p className="font-heading text-lg text-foreground">
                Your Itinerary
              </p>
              <p className="text-xs text-muted-foreground">
                Generated in seconds
              </p>
            </div>
            <Badge
              variant="outline"
              className="border-luxury-gold-muted/30 text-luxury-gold-soft"
            >
              3 days
            </Badge>
          </div>

          <ol className="mt-5 flex flex-col gap-5">
            {itinerary.map((day) => (
              <li key={day.id} className="flex gap-4">
                <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-luxury-gold/10 text-xs font-semibold text-luxury-gold">
                  {day.day.replace("Day ", "")}
                </span>
                <div className="flex-1">
                  <h3 className="font-heading text-base text-foreground">
                    {day.title}
                  </h3>
                  <ul className="mt-2 space-y-2">
                    {day.items.map((item) => (
                      <li
                        key={item.label}
                        className="flex items-center justify-between gap-3 rounded-lg border border-border/50 bg-luxury-black/30 px-3 py-2"
                      >
                        <span className="text-sm text-luxury-white-muted">
                          {item.label}
                        </span>
                        <span className="shrink-0 text-xs text-luxury-gold-soft">
                          {item.time}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}
