import { useParams, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useProducts } from "@/hooks/useProducts";
import Footer from "@/components/Footer";
import ProductDetail from "@/components/ProductDetail";
import { useEffect } from "react";

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products, loading, error } = useProducts();

  const product = products.find((p) => p.id === id);

  useEffect(() => {
    if (!loading && !error && id && !product) {
      navigate("/", { replace: true });
    }
  }, [loading, error, id, product, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
        <Loader2 size={40} className="animate-spin text-primary" />
        <p className="text-muted-foreground text-lg">Carregando…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4 px-6 text-center">
        <p className="text-destructive text-lg font-semibold">Erro ao carregar</p>
        <p className="text-muted-foreground text-sm max-w-md">{error}</p>
        <button onClick={() => navigate("/")} className="mt-4 text-primary underline">
          Voltar ao início
        </button>
      </div>
    );
  }
  if (!product) {
    return null;
  }

  return (
    <>
      <ProductDetail
        product={product}
        onBack={() => navigate("/")}
      />
      <Footer />
    </>
  );
};

export default ProductDetailPage;
