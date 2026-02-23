import { Link, useNavigate } from "react-router-dom";
import { useProducts } from "@/hooks/useProducts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, ArrowLeft, Plus } from "lucide-react";

const AdminPage = () => {
  const navigate = useNavigate();
  const { products, loading, error } = useProducts();

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
        <p className="text-destructive text-lg font-semibold">Erro ao carregar produtos</p>
        <p className="text-muted-foreground text-sm max-w-md">{error}</p>
        <Button onClick={() => window.location.reload()} variant="outline">
          Tentar novamente
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" asChild>
                <Link to="/">
                  <ArrowLeft size={20} />
                </Link>
              </Button>
              <h1 className="text-2xl font-bold text-foreground" style={{ fontFamily: "var(--font-display)" }}>
                Admin
              </h1>
            </div>
            <Button asChild>
              <Link to="/admin/produto/novo" className="inline-flex items-center gap-2">
                <Plus size={18} />
                Novo Produto
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {products.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16 text-center">
              <p className="text-muted-foreground text-lg mb-4">Nenhum produto cadastrado ainda.</p>
              <Button asChild>
                <Link to="/admin/produto/novo" className="inline-flex items-center gap-2">
                  <Plus size={18} />
                  Cadastrar primeiro produto
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            <p className="text-sm text-muted-foreground">
              {products.length} produto{products.length !== 1 ? "s" : ""} cadastrado{products.length !== 1 ? "s" : ""}
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <Card
                  key={product.id}
                  className="cursor-pointer transition-shadow hover:shadow-md"
                  onClick={() => navigate(`/produto/${product.id}`)}
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base line-clamp-2">{product.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span className="capitalize">{product.category}</span>
                      <span className="font-medium text-foreground">
                        R$ {(product.price ?? 0).toLocaleString("pt-BR")}
                      </span>
                    </div>
                    <Button variant="outline" size="sm" className="mt-4 w-full" asChild>
                      <Link to={`/produto/${product.id}`} onClick={(e) => e.stopPropagation()}>
                        Ver no site
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminPage;
