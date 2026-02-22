import { ArrowRight, Star } from "lucide-react";
import { Product } from "@/data/products";

interface HeroSectionProps {
  product: Product;
  onViewDetails: (id: string) => void;
}

const HeroSection = ({ product, onViewDetails }: HeroSectionProps) => {
  const imageSrc = product.images?.[0] ?? (product as any).image ?? "";

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800">
      <div className="container mx-auto px-6 py-16 md:py-20">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Coluna Esquerda — Textos */}
          <div className="flex flex-col justify-center order-2 md:order-1">
            <span className="inline-block self-start mb-4 px-3 py-1 rounded-full bg-white/10 text-white text-sm font-medium backdrop-blur-sm">
              ★ Escolha do Editor
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
              {product.title}
            </h1>
            <p className="text-lg md:text-xl text-white/70 mb-6 leading-relaxed max-w-lg">
              {product.shortDesc}
            </p>
            <div className="flex items-center gap-6 mb-8">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-white/30"}
                  />
                ))}
                <span className="ml-2 text-white/60 text-sm">{product.rating}</span>
              </div>
              <span className="text-2xl font-bold text-white">
                R$ {product.price.toLocaleString("pt-BR")}
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
              src={imageSrc}
              alt={product.title}
              className="w-full h-[350px] md:h-[500px] object-contain mix-blend-lighten drop-shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
