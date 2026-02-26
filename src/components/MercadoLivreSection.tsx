import { useMercadoLivre } from "@/hooks/useMercadoLivre";
import MercadoLivreCard from "./MercadoLivreCard";
import { Loader2 } from "lucide-react";

/**
 * ============================================================
 * CONFIGURAÇÃO: Edite as constantes abaixo para seus produtos
 * ============================================================
 *
 * ML_ITEM_IDS: Array com os IDs dos produtos do Mercado Livre
 *   - Encontre o ID na URL do produto: mercadolivre.com.br/MLB-XXXXXXXXX
 *   - Formato: "MLBXXXXXXXXX" (sem o hífen)
 *
 * AFFILIATE_LINKS: Objeto mapeando cada ID ao seu link de afiliado
 *   - Se não tiver link de afiliado, o link direto do produto será usado
 */
const ML_ITEM_IDS = [
  "MLB3467775930",
  "MLB3915392192",
  "MLB4539498028",
  // Adicione mais IDs aqui...
];

const AFFILIATE_LINKS: Record<string, string> = {
  // "MLBXXXXXXXXX": "https://seu-link-de-afiliado.com/...",
  // Adicione seus links de afiliado aqui...
};

const MercadoLivreSection = () => {
  const { items, loading, error } = useMercadoLivre(
    ML_ITEM_IDS,
    AFFILIATE_LINKS
  );

  if (loading) {
    return (
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-6 flex items-center justify-center gap-3">
          <Loader2 size={24} className="animate-spin text-primary" />
          <span className="text-muted-foreground">
            Buscando ofertas do Mercado Livre…
          </span>
        </div>
      </section>
    );
  }

  if (error || items.length === 0) return null;

  return (
    <section className="pb-16 md:pb-24">
      <div className="container mx-auto px-6">
        <div className="flex items-center gap-3 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Ofertas do Mercado Livre
          </h2>
          <span className="text-xs font-semibold uppercase tracking-wider bg-[hsl(52,100%,50%)] text-gray-900 px-3 py-1 rounded-full">
            AO VIVO
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {items.map((item) => (
            <MercadoLivreCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MercadoLivreSection;
