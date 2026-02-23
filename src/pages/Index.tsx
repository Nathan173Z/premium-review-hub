import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useProducts } from "@/hooks/useProducts";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import CategoryFilter from "@/components/CategoryFilter";
import ProductGrid from "@/components/ProductGrid";
import { Loader2 } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const { products, loading, error } = useProducts();
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProducts = useMemo(() => {
    if (activeCategory === "all") return products;
    return products.filter((p) => p.category === activeCategory);
  }, [activeCategory, products]);

  const heroProduct = products[0];
  const onViewDetails = (id: string) => navigate(`/produto/${id}`);

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

  return (
    <div className="min-h-screen bg-background">
      <Header variant="dark" />
      <HeroSection product={heroProduct} onViewDetails={onViewDetails} />
      <CategoryFilter activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
      <ProductGrid products={filteredProducts} onViewDetails={onViewDetails} />
      <Footer />
    </div>
  );
};

export default Index;
