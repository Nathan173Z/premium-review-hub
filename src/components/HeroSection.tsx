import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Product } from "@/data/products";
import { getProductImages } from "@/lib/utils";
import { RatingStars } from "@/components/ui/rating-stars";

interface HeroSectionProps {
  product: Product;
  onViewDetails: (id: string) => void;
}

const HeroSection = ({ product, onViewDetails }: HeroSectionProps) => {
  const images = getProductImages(product);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800">
      <div className="container mx-auto px-6 py-16 md:py-20">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Coluna Esquerda — Textos */}
          <div className="flex flex-col justify-center order-2 md:order-1">
            <span className="inline-block self-start mb-4 px-3 py-1 rounded-full bg-white/10 text-white text-sm font-medium backdrop-blur-sm">
              ★ Escolha do Editor
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-4 leading-tight tracking-tight">
              {product.title}
            </h1>
            <p className="text-lg md:text-xl text-white/70 mb-6 leading-relaxed max-w-lg">
              {product.shortDesc}
            </p>
            <div className="flex items-center gap-6 mb-8">
              <div className="flex items-center gap-2">
                <RatingStars
                  rating={product.rating ?? 0}
                  size={18}
                  filledClassName="fill-yellow-400 text-yellow-400"
                  emptyClassName="text-white/30"
                />
                <span className="text-white/60 text-sm">{product.rating ?? 0}</span>
              </div>
              <span className="text-2xl font-bold text-white">
                R$ {(product.price ?? 0).toLocaleString("pt-BR")}
              </span>
            </div>
            <button
              onClick={() => onViewDetails(product.id)}
              className="group inline-flex self-start items-center gap-3 bg-white text-gray-900 px-8 py-4 rounded-full text-lg font-semibold transition-all hover:shadow-lg hover:scale-105 active:scale-100"
            >
              Ler Review Completo
              <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Coluna Direita — Imagem */}
          <div className="flex items-center justify-center order-1 md:order-2">
            <img
              src={images[currentImageIndex] ?? ""}
              alt={product.title}
              className="w-full h-[350px] md:h-[500px] object-contain drop-shadow-2xl transition-opacity duration-700"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
