import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type FilterSectionProps = {
  value: string;
  title: string;
  children: React.ReactNode;
};

export function FilterSection({ value, title, children }: FilterSectionProps) {
  return (
    <AccordionItem value={value} className="border-border/60">
      <AccordionTrigger className="py-4 text-sm font-medium text-foreground hover:no-underline">
        {title}
      </AccordionTrigger>
      <AccordionContent>{children}</AccordionContent>
    </AccordionItem>
  );
}
