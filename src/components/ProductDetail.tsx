import { useState } from "react";
import { ArrowLeft, Star, Check, X, ExternalLink, Swords, ShoppingCart } from "lucide-react";
import { Product } from "@/data/products";

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
}

const ProductDetail = ({ product, onBack }: ProductDetailProps) => {
  const [selectedAccessories, setSelectedAccessories] = useState<string[]>([]);

  const toggleAccessory = (id: string) => {
    setSelectedAccessories((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  const accessoryTotal = product.accessories
    .filter((a) => selectedAccessories.includes(a.id))
    .reduce((sum, a) => sum + a.price, 0);

  const totalInvestment = product.price + accessoryTotal;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <img
          src={product.images?.[0] ?? (product as any).image ?? ""}
          alt={product.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: "var(--hero-gradient)" }} />
        <button
          onClick={onBack}
          className="absolute top-6 left-6 z-10 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/80 backdrop-blur-md text-foreground text-sm font-medium hover:bg-card transition-colors"
          style={{ boxShadow: "var(--card-shadow)" }}
        >
          <ArrowLeft size={16} />
          Voltar
        </button>
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary-foreground/70">
            {product.category}
          </span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mt-2 mb-3">
            {product.title}
          </h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  className={i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-primary-foreground/30"}
                />
              ))}
              <span className="ml-1 text-primary-foreground/70">{product.rating}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content + Sticky Sidebar */}
      <div className="container mx-auto px-6 py-12 md:py-16">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Review */}
            <section className="mb-16">
              <h2 className="text-2xl font-bold text-foreground mb-6">Review Completo</h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {product.fullReview}
              </p>
            </section>

            {/* Pros & Cons */}
            <section className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card rounded-2xl p-6" style={{ boxShadow: "var(--card-shadow)" }}>
                <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <Check size={16} className="text-green-600" />
                  </div>
                  Prós
                </h3>
                <ul className="space-y-3">
                  {product.pros.map((pro, i) => (
                    <li key={i} className="flex items-start gap-3 text-muted-foreground">
                      <Check size={16} className="text-green-500 mt-0.5 shrink-0" />
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-card rounded-2xl p-6" style={{ boxShadow: "var(--card-shadow)" }}>
                <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                    <X size={16} className="text-red-500" />
                  </div>
                  Contras
                </h3>
                <ul className="space-y-3">
                  {product.cons.map((con, i) => (
                    <li key={i} className="flex items-start gap-3 text-muted-foreground">
                      <X size={16} className="text-red-400 mt-0.5 shrink-0" />
                      {con}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Specs */}
            <section className="mb-16">
              <h2 className="text-2xl font-bold text-foreground mb-6">Especificações</h2>
              <div className="bg-card rounded-2xl overflow-hidden" style={{ boxShadow: "var(--card-shadow)" }}>
                {Object.entries(product.specs).map(([key, value], i) => (
                  <div
                    key={key}
                    className={`flex justify-between items-center px-6 py-4 ${
                      i < Object.entries(product.specs).length - 1 ? "border-b border-border" : ""
                    }`}
                  >
                    <span className="text-muted-foreground font-medium">{key}</span>
                    <span className="text-foreground font-semibold">{value}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Comparison */}
            <section className="mb-16">
              <h2 className="text-2xl font-bold text-foreground mb-2 flex items-center gap-3">
                <Swords size={24} className="text-primary" />
                Duelo: vs {product.comparison.competitor}
              </h2>
              <p className="text-muted-foreground mb-6">Comparativo direto para eliminar dúvidas.</p>
              <div className="bg-card rounded-2xl overflow-hidden" style={{ boxShadow: "var(--card-shadow)" }}>
                <div className="grid grid-cols-3 gap-0 px-6 py-4 bg-secondary">
                  <span className="text-sm font-semibold text-muted-foreground">Recurso</span>
                  <span className="text-sm font-semibold text-primary text-center">{product.title}</span>
                  <span className="text-sm font-semibold text-muted-foreground text-center">{product.comparison.competitor}</span>
                </div>
                {product.comparison.items.map((item, i) => (
                  <div
                    key={i}
                    className={`grid grid-cols-3 gap-0 px-6 py-4 ${
                      i < product.comparison.items.length - 1 ? "border-b border-border" : ""
                    }`}
                  >
                    <span className="text-sm text-muted-foreground font-medium">{item.feature}</span>
                    <span className="text-sm text-foreground font-semibold text-center">{item.ours}</span>
                    <span className="text-sm text-muted-foreground text-center">{item.theirs}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Accessories / Setup Calculator */}
            <section className="mb-16">
              <h2 className="text-2xl font-bold text-foreground mb-2 flex items-center gap-3">
                <ShoppingCart size={24} className="text-primary" />
                Monte seu Setup Completo
              </h2>
              <p className="text-muted-foreground mb-6">Selecione acessórios para calcular o investimento total.</p>
              <div className="space-y-3">
                {product.accessories.map((acc) => {
                  const isSelected = selectedAccessories.includes(acc.id);
                  return (
                    <label
                      key={acc.id}
                      className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all ${
                        isSelected
                          ? "bg-primary/5 ring-2 ring-primary"
                          : "bg-card hover:bg-secondary"
                      }`}
                      style={!isSelected ? { boxShadow: "var(--card-shadow)" } : undefined}
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleAccessory(acc.id)}
                        className="sr-only"
                      />
                      <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-colors ${
                        isSelected ? "bg-primary border-primary" : "border-border"
                      }`}>
                        {isSelected && <Check size={14} className="text-primary-foreground" />}
                      </div>
                      <span className="text-2xl">{acc.image}</span>
                      <div className="flex-1">
                        <span className="text-foreground font-medium">{acc.name}</span>
                      </div>
                      <span className="text-foreground font-semibold">
                        R$ {acc.price.toLocaleString("pt-BR")}
                      </span>
                    </label>
                  );
                })}
              </div>
              <div className="mt-6 p-6 bg-card rounded-2xl" style={{ boxShadow: "var(--card-shadow)" }}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-muted-foreground">Produto</span>
                  <span className="text-foreground font-semibold">R$ {product.price.toLocaleString("pt-BR")}</span>
                </div>
                {accessoryTotal > 0 && (
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-muted-foreground">Acessórios ({selectedAccessories.length})</span>
                    <span className="text-foreground font-semibold">R$ {accessoryTotal.toLocaleString("pt-BR")}</span>
                  </div>
                )}
                <div className="border-t border-border mt-3 pt-3 flex justify-between items-center">
                  <span className="text-foreground font-bold text-lg">Investimento Total</span>
                  <span className="text-primary font-bold text-2xl">
                    R$ {totalInvestment.toLocaleString("pt-BR")}
                  </span>
                </div>
              </div>
            </section>
          </div>

          {/* Sticky Sidebar (Desktop) */}
          <div className="hidden lg:block w-80 shrink-0">
            <div className="sticky top-8">
              <div className="bg-card rounded-2xl p-6" style={{ boxShadow: "var(--card-shadow)" }}>
                <span className="text-sm text-muted-foreground">Investimento Total</span>
                <div className="text-3xl font-bold text-foreground mt-1 mb-1">
                  R$ {totalInvestment.toLocaleString("pt-BR")}
                </div>
                {accessoryTotal > 0 && (
                  <span className="text-sm text-muted-foreground">
                    Produto + {selectedAccessories.length} acessório{selectedAccessories.length > 1 ? "s" : ""}
                  </span>
                )}
                <a
                  href={product.affiliateLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-4 rounded-full text-base font-semibold transition-all hover:shadow-lg hover:scale-105 active:scale-100"
                  style={{ boxShadow: "var(--glow-primary)" }}
                >
                  <ExternalLink size={18} />
                  Ver Preço na Amazon
                </a>
                <p className="text-xs text-muted-foreground text-center mt-4">
                  Links de afiliado. Podemos receber comissão.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-lg border-t border-border px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <span className="text-xs text-muted-foreground block">Total</span>
            <span className="text-xl font-bold text-foreground">
              R$ {totalInvestment.toLocaleString("pt-BR")}
            </span>
          </div>
          <a
            href={product.affiliateLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full text-sm font-semibold transition-all hover:shadow-lg"
            style={{ boxShadow: "var(--glow-primary)" }}
          >
            <ExternalLink size={16} />
            Ver Preço na Amazon
          </a>
        </div>
      </div>
      {/* Spacer for mobile bottom bar */}
      <div className="lg:hidden h-20" />
    </div>
  );
};

export default ProductDetail;
