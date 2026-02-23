import { useState } from "react";
import { Star, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
  onViewDetails: (id: string) => void;
}

const ProductCard = ({ product, onViewDetails }: ProductCardProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = product.images ?? ((product as any).image ? [(product as any).image] : []);
  const hasMultiple = images.length > 1;

  const goPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <article
      onClick={() => onViewDetails(product.id)}
      className="group bg-card rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1"
      style={{ boxShadow: "var(--card-shadow)" }}
      onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "var(--card-shadow-hover)")}
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "var(--card-shadow)")}
    >
      <div className="relative aspect-square overflow-hidden bg-secondary">
        <img
          src={images[currentIndex]}
          alt={product.title}
          className="w-full h-full object-contain p-6 transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {hasMultiple && (
          <>
            <button
              onClick={goPrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm shadow-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
            >
              <ChevronLeft size={16} className="text-foreground" />
            </button>
            <button
              onClick={goNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm shadow-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
            >
              <ChevronRight size={16} className="text-foreground" />
            </button>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
              {images.map((_, i) => (
                <span
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full transition-colors ${
                    i === currentIndex ? "bg-primary" : "bg-foreground/20"
                  }`}
                />
              ))}
            </div>
          </>
        )}
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
        <div className="flex items-center gap-2 mb-4">
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
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-primary group-hover:underline">
            Ver Detalhes
          </span>
          <ArrowUpRight size={16} className="text-primary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
        <div className="flex gap-2">
          <a
            href={product.affiliateLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex-1 inline-flex items-center justify-center gap-1 bg-primary text-primary-foreground py-2.5 px-3 rounded-lg font-bold hover:bg-primary/90 transition-colors text-xs"
          >
            Ver na Amazon
          </a>
          <a
            href={(product as any).mlLink ?? "#"}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex-1 inline-flex items-center justify-center gap-1 bg-[hsl(52,100%,50%)] text-gray-900 py-2.5 px-3 rounded-lg font-bold hover:bg-[hsl(52,100%,45%)] transition-colors text-xs"
          >
            Ver no Mercado Livre
          </a>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
