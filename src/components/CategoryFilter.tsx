import { Grid3X3, Headphones, Watch, Laptop, Zap } from "lucide-react";
import { categories } from "@/data/products";

const iconMap: Record<string, React.ElementType> = {
  Grid3X3,
  Headphones,
  Watch,
  Laptop,
  Zap,
};

interface CategoryFilterProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilter = ({ activeCategory, onCategoryChange }: CategoryFilterProps) => {
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
          Coleções
        </h2>
        <div className="flex flex-wrap gap-3">
          {categories.map((cat) => {
            const Icon = iconMap[cat.icon];
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onCategoryChange(cat.id)}
                className={`inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium transition-all ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "bg-card text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
                style={isActive ? { boxShadow: "var(--glow-primary)" } : { boxShadow: "var(--card-shadow)" }}
              >
                <Icon size={18} />
                {cat.name}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoryFilter;
