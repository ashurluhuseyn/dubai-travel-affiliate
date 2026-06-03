import { Bot, Send, Sparkles } from "lucide-react";

import { Container } from "@/components/shared/container";
import { SectionHeader } from "@/components/shared/section-header";
import { Badge } from "@/components/ui/badge";
import { chatPreview, itinerary, plannerChips } from "@/data";
import { cn } from "@/lib/utils";

export function AiTripPlanner() {
  return (
    <section id="planner" className="scroll-mt-24 py-section">
      <Container>
        <SectionHeader
          align="center"
          label="Powered by AI"
          title="AI Trip Planner"
          description="Describe your dream trip and get a tailored Dubai itinerary in seconds."
        />

        <div className="grid items-start gap-6 lg:grid-cols-2">
          {/* Chat column */}
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

              <div className="mt-4 flex items-center gap-2 rounded-full border border-border/70 bg-luxury-black/40 py-2 pl-4 pr-2">
                <span className="flex-1 truncate text-sm text-muted-foreground">
                  Ask the concierge anything…
                </span>
                <span
                  aria-hidden
                  className="flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground"
                >
                  <Send className="size-4" />
                </span>
              </div>
            </div>

            {/* Suggestion chips */}
            <div className="flex flex-wrap gap-2">
              {plannerChips.map((chip) => (
                <span
                  key={chip}
                  className="cursor-default rounded-full border border-border/70 bg-luxury-elevated/60 px-3.5 py-1.5 text-xs text-muted-foreground transition-luxury hover:border-luxury-gold-muted/40 hover:text-foreground"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>

          {/* Itinerary result column */}
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
      </Container>
    </section>
  );
}
