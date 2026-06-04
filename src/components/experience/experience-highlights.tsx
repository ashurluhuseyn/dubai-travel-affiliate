import { CheckList } from "@/components/shared/check-list";

type ExperienceHighlightsProps = {
  highlights: string[];
};

export function ExperienceHighlights({ highlights }: ExperienceHighlightsProps) {
  return (
    <section aria-labelledby="highlights-heading">
      <h2
        id="highlights-heading"
        className="font-heading text-xl text-foreground md:text-2xl"
      >
        Highlights
      </h2>
      <CheckList items={highlights} className="mt-5" />
    </section>
  );
}
