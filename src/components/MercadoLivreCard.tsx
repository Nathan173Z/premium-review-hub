import { useState } from "react";
import { ChevronLeft, ChevronRight, ExternalLink, Tag } from "lucide-react";
import { MLItem } from "@/hooks/useMercadoLivre";

interface MercadoLivreCardProps {
  item: MLItem;
}

const MercadoLivreCard = ({ item }: MercadoLivreCardProps) => {
  const [imgIdx, setImgIdx] = useState(0);
  const images = item.images.length > 0 ? item.images : [item.image];
  const hasMultiple = images.length > 1;

  const goPrev = (e: React.MouseEvent) => {
    e.preventDefault();
    setImgIdx((p) => (p === 0 ? images.length - 1 : p - 1));
  };
  const goNext = (e: React.MouseEvent) => {
    e.preventDefault();
    setImgIdx((p) => (p === images.length - 1 ? 0 : p + 1));
  };

  const formattedPrice = item.price.toLocaleString("pt-BR", {
    style: "currency",
    currency: item.currency,
  });

  const formattedOriginal = item.originalPrice
    ? item.originalPrice.toLocaleString("pt-BR", {
        style: "currency",
        currency: item.currency,
      })
    : null;

  return (
    <article
      className="group relative bg-card rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
      style={{ boxShadow: "var(--card-shadow)" }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.boxShadow = "var(--card-shadow-hover)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.boxShadow = "var(--card-shadow)")
      }
    >
      {/* Discount badge */}
      {item.discount && (
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1 bg-destructive text-destructive-foreground text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
          <Tag size={12} />
          OFERTA DO DIA — {item.discount}% OFF
        </div>
      )}

      {/* Image carousel */}
      <div className="relative aspect-square overflow-hidden bg-secondary">
        <img
          src={images[imgIdx]}
          alt={item.title}
          className="w-full h-full object-contain p-6 transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {hasMultiple && (
          <>
            <button
              onClick={goPrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm shadow-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background"
            >
              <ChevronLeft size={16} className="text-foreground" />
            </button>
            <button
              onClick={goNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm shadow-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background"
            >
              <ChevronRight size={16} className="text-foreground" />
            </button>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
              {images.map((_, i) => (
                <span
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full transition-colors ${
                    i === imgIdx ? "bg-primary" : "bg-foreground/20"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Content */}
      <div className="p-5 md:p-6">
        {item.condition && (
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {item.condition === "new" ? "Novo" : "Usado"}
          </span>
        )}
        <h3 className="text-base font-bold text-foreground mt-1 mb-3 line-clamp-2 group-hover:text-primary transition-colors">
          {item.title}
        </h3>

        {/* Pricing */}
        <div className="mb-4">
          {formattedOriginal && (
            <span className="block text-sm text-muted-foreground line-through">
              {formattedOriginal}
            </span>
          )}
          <span className="text-xl font-extrabold text-foreground">
            {formattedPrice}
          </span>
          {item.discount && (
            <span className="ml-2 text-sm font-bold text-green-500">
              -{item.discount}%
            </span>
          )}
        </div>

        {/* CTA */}
        <a
          href={item.affiliateLink}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-flex items-center justify-center gap-2 bg-[hsl(52,100%,50%)] text-gray-900 py-3 px-4 rounded-xl font-bold hover:bg-[hsl(52,100%,45%)] transition-colors text-sm"
        >
          <ExternalLink size={16} />
          Comprar no Mercado Livre
        </a>
      </div>
    </article>
  );
};

export default MercadoLivreCard;
