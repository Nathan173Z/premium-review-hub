import { Star, ArrowUpRight } from "lucide-react";
import { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
  onViewDetails: (id: string) => void;
}

const ProductCard = ({ product, onViewDetails }: ProductCardProps) => {
  return (
    <article
      onClick={() => onViewDetails(product.id)}
      className="group bg-card rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1"
      style={{ boxShadow: "var(--card-shadow)" }}
      onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "var(--card-shadow-hover)")}
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "var(--card-shadow)")}
    >
      <div className="aspect-square overflow-hidden bg-secondary">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="p-5 md:p-6">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {product.category}
        </span>
        <h3 className="text-lg font-bold text-foreground mt-1 mb-2 group-hover:text-primary transition-colors">
          {product.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {product.shortDesc}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-border"}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">{product.rating}</span>
          </div>
          <span className="text-lg font-bold text-foreground">
            R$ {product.price.toLocaleString("pt-BR")}
          </span>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm font-medium text-primary group-hover:underline">
            Ver Detalhes
          </span>
          <ArrowUpRight size={16} className="text-primary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
