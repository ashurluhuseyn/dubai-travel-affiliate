import { CategoryCard } from "@/components/categories/category-card";
import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { SectionHeader } from "@/components/shared/section-header";
import { getCategoryShowcase } from "@/data";

export function CategoriesGrid() {
  const categories = getCategoryShowcase();

  return (
    <Section id="categories">
      <SectionHeader
        align="center"
        label="Browse Categories"
        title="What are you looking for?"
      />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category, index) => (
          <Reveal key={category.id} delay={index * 60}>
            <CategoryCard category={category} priority={index < 4} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
