import { CheckList } from "@/components/shared/check-list";

type ImportantInformationProps = {
  items: string[];
};

export function ImportantInformation({ items }: ImportantInformationProps) {
  return (
    <section aria-labelledby="info-heading">
      <h2
        id="info-heading"
        className="font-heading text-xl text-foreground md:text-2xl"
      >
        Important Information
      </h2>
      <CheckList items={items} className="mt-5" gap="sm" />
    </section>
  );
}
