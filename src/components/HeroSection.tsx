import { ArrowRight, Star } from "lucide-react";
import { Product } from "@/data/products";

interface HeroSectionProps {
  product: Product;
  onViewDetails: (id: string) => void;
}

const HeroSection = ({ product, onViewDetails }: HeroSectionProps) => {
  return (
    <section className="relative h-[85vh] min-h-[600px] overflow-hidden">
      <img
        src={product.images[0]}
        alt={product.title}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div
        className="absolute inset-0"
        style={{ background: "var(--hero-gradient)" }}
      />
      <div className="absolute inset-0 flex items-end">
        <div className="container mx-auto px-6 pb-16 md:pb-24">
          <div className="max-w-2xl">
            <span className="inline-block mb-4 px-3 py-1 rounded-full bg-primary/20 text-primary-foreground text-sm font-medium backdrop-blur-sm">
              ★ Escolha do Editor
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-4 leading-tight">
              {product.title}
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80 mb-6 leading-relaxed max-w-lg">
              {product.shortDesc}
            </p>
            <div className="flex items-center gap-6 mb-8">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-primary-foreground/30"}
                  />
                ))}
                <span className="ml-2 text-primary-foreground/70 text-sm">{product.rating}</span>
              </div>
              <span className="text-2xl font-bold text-primary-foreground">
                R$ {product.price.toLocaleString("pt-BR")}
              </span>
            </div>
            <button
              onClick={() => onViewDetails(product.id)}
              className="group inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 rounded-full text-lg font-semibold transition-all hover:shadow-lg hover:scale-105 active:scale-100"
              style={{ boxShadow: "var(--glow-primary)" }}
            >
              Ler Review Completo
              <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
