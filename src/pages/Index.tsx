import { useState, useMemo } from "react";
import { useProducts } from "@/hooks/useProducts";
import HeroSection from "@/components/HeroSection";
import CategoryFilter from "@/components/CategoryFilter";
import ProductGrid from "@/components/ProductGrid";
import ProductDetail from "@/components/ProductDetail";
import { Loader2 } from "lucide-react";
import MercadoLivreSection from "@/components/MercadoLivreSection";

const Index = () => {
  const { products, loading, error } = useProducts();
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    if (activeCategory === "all") return products;
    return products.filter((p) => p.category === activeCategory);
  }, [activeCategory, products]);

  const selectedProduct = useMemo(
    () => products.find((p) => p.id === selectedProductId) ?? null,
    [selectedProductId, products]
  );

  const heroProduct = products[0];

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
        <Loader2 size={40} className="animate-spin text-primary" />
        <p className="text-muted-foreground text-lg">Carregando produtos…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4 px-6 text-center">
        <p className="text-destructive text-lg font-semibold">Erro ao carregar produtos</p>
        <p className="text-muted-foreground text-sm max-w-md">{error}</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground text-lg">Nenhum produto cadastrado ainda.</p>
      </div>
    );
  }

  if (selectedProduct) {
    return (
      <ProductDetail
        product={selectedProduct}
        onBack={() => setSelectedProductId(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-50 px-6 py-5">
        <div className="container mx-auto flex items-center justify-between">
          <span className="text-xl font-bold text-primary-foreground tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
            TechReview
          </span>
          <nav className="hidden md:flex items-center gap-8">
            <span className="text-sm text-primary-foreground/70 hover:text-primary-foreground cursor-pointer transition-colors">Reviews</span>
            <span className="text-sm text-primary-foreground/70 hover:text-primary-foreground cursor-pointer transition-colors">Guias</span>
            <span className="text-sm text-primary-foreground/70 hover:text-primary-foreground cursor-pointer transition-colors">Sobre</span>
          </nav>
        </div>
      </header>

      <HeroSection product={heroProduct} onViewDetails={setSelectedProductId} />
      <CategoryFilter activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
      <ProductGrid products={filteredProducts} onViewDetails={setSelectedProductId} />
      <MercadoLivreSection />

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm text-muted-foreground">
            © 2026 TechReview. Links de afiliados — podemos receber comissão por compras qualificadas.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
