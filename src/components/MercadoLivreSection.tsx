import { useState, useEffect } from "react";
import { ExternalLink, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

/* ============================================
 * IDs dos produtos no Mercado Livre
 * Substitua pelos IDs reais dos produtos que deseja exibir
 * Ex: MLB1234567890, MLB9876543210
 * ============================================ */
const ML_ITEM_IDS = ["MLB1055308620", "MLB1054107104"];

/* ============================================
 * Mapeamento: MLB_ID -> Seu link de afiliado
 * Adicione aqui os links de afiliado para cada produto
 * ============================================ */
/* Cole aqui o token de acesso do painel de desenvolvedor do Mercado Livre */
const ML_ACCESS_TOKEN =
  import.meta.env.VITE_ML_ACCESS_TOKEN ?? "YOUR_ACCESS_TOKEN";

const AFFILIATE_LINKS: Record<string, string> = {
  MLB1055308620: "https://www.mercadolivre.com.br/iphone-17-pro-max-256gb-laranja-cosmico-distribuidor-autorizado/p/MLB1055308620?pdp_filters=item_id%3AMLB4200316101&from=gshop&matt_tool=53984452&matt_internal_campaign_id=&matt_word=&matt_source=google&matt_campaign_id=22117557774&matt_ad_group_id=168627997570&matt_match_type=&matt_network=g&matt_device=c&matt_creative=728942948127&matt_keyword=&matt_ad_position=&matt_ad_type=pla&matt_merchant_id=735098660&matt_product_id=MLB1055308620-product&matt_product_partition_id=2387499719707&matt_target_id=pla-2387499719707&cq_src=google_ads&cq_cmp=22117557774&cq_net=g&cq_plt=gp&cq_med=pla&gad_source=1&gad_campaignid=22117557774&gbraid=0AAAAAD93qcBnGIskUBogS13sQJVNJv6-I&gclid=CjwKCAiA2PrMBhA4EiwAwpHyCzCiGYS_t0EIR-PzgYnDOTwHD_s5yAgYD9LXqSA3R_VCPzQWIIYqTxoCdn0QAvD_BwE",
  MLB1054107104: "https://www.mercadolivre.com.br/iphone-air-512gb-preto-espacial-somente-esim-distribuidor-autorizado/p/MLB1054107104?pdp_filters=item_id%3AMLB4200151873&matt_tool=38524122#origin=share&sid=share&wid=MLB4200151873",
};

/* ============================================
 * Tipagem da resposta da API do Mercado Livre
 * ============================================ */
interface MLItem {
  id: string;
  title: string;
  price: number;
  original_price: number | null;
  thumbnail: string;
  pictures: Array<{ secure_url: string }>;
  permalink?: string;
}

const API_BASE = "https://api.mercadolibre.com/items";

async function fetchMLItem(id: string): Promise<MLItem | null> {
  try {
    const res = await fetch(`${API_BASE}/${id}`, {
      headers: {
        Authorization: `Bearer ${ML_ACCESS_TOKEN}`,
      },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

function getAffiliateUrl(mlId: string): string {
  return AFFILIATE_LINKS[mlId] ?? `https://mercadolivre.com.br/p/${mlId}`;
}

function formatPrice(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

function calcDiscountPercent(original: number, current: number): number {
  if (original <= 0 || current >= original) return 0;
  return Math.round(((original - current) / original) * 100);
}

export default function MercadoLivreSection() {
  const [items, setItems] = useState<MLItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      const ids = ML_ITEM_IDS.filter(Boolean);
      if (ids.length === 0) {
        setLoading(false);
        return;
      }

      const results = await Promise.all(ids.map((id) => fetchMLItem(id)));
      if (cancelled) return;

      const valid = results.filter((r): r is MLItem => r !== null);
      setItems(valid);
      if (valid.length === 0 && ids.length > 0) {
        setError("Não foi possível carregar os produtos do Mercado Livre.");
      }
      setLoading(false);
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <section
        className="py-16 md:py-24"
        style={{ backgroundColor: "#0f172a" }}
      >
        <div className="container mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
            Ofertas do Mercado Livre
          </h2>
          <div className="flex flex-col items-center justify-center py-16 gap-4">
            <Loader2 size={40} className="animate-spin text-amber-400" />
            <p className="text-slate-300 text-lg">Carregando ofertas…</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section
        className="py-16 md:py-24"
        style={{ backgroundColor: "#0f172a" }}
      >
        <div className="container mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
            Ofertas do Mercado Livre
          </h2>
          <p className="text-amber-400/90 text-center py-8">{error}</p>
        </div>
      </section>
    );
  }

  if (items.length === 0) {
    return null;
  }

  return (
    <section
      className="py-16 md:py-24"
      style={{ backgroundColor: "#0f172a" }}
    >
      <div className="container mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
          Ofertas do Mercado Livre
        </h2>
        <p className="text-slate-400 text-sm md:text-base mb-8 max-w-2xl">
          Produtos selecionados com as melhores ofertas do dia.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((item) => {
            const affiliateUrl = getAffiliateUrl(item.id);
            const hasDiscount =
              item.original_price != null &&
              item.original_price > item.price;
            const discountPercent = hasDiscount
              ? calcDiscountPercent(item.original_price!, item.price)
              : 0;
            const imageUrl =
              item.pictures?.[0]?.secure_url ?? item.thumbnail ?? "";

            return (
              <article
                key={item.id}
                className="group bg-slate-800/60 rounded-2xl overflow-hidden border border-slate-700/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/20"
                style={{ boxShadow: "0 4px 24px -4px rgba(0,0,0,0.3)" }}
              >
                <div className="relative aspect-square overflow-hidden bg-slate-900/50">
                  <img
                    src={imageUrl}
                    alt={item.title}
                    className="w-full h-full object-contain p-6 transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  {hasDiscount && discountPercent > 0 && (
                    <span
                      className={cn(
                        "absolute top-3 left-3 px-3 py-1.5 rounded-lg text-xs font-bold",
                        "bg-amber-500 text-slate-900 shadow-lg"
                      )}
                    >
                      OFERTA DO DIA −{discountPercent}%
                    </span>
                  )}
                </div>

                <div className="p-5">
                  <h3 className="text-base font-semibold text-white line-clamp-2 mb-3 min-h-[2.5rem]">
                    {item.title}
                  </h3>

                  <div className="flex flex-wrap items-baseline gap-2 mb-4">
                    <span className="text-xl font-bold text-amber-400">
                      {formatPrice(item.price)}
                    </span>
                    {hasDiscount && item.original_price != null && (
                      <span className="text-sm text-slate-500 line-through">
                        {formatPrice(item.original_price)}
                      </span>
                    )}
                  </div>

                  <a
                    href={affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className={cn(
                      "w-full inline-flex items-center justify-center gap-2",
                      "bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold",
                      "py-3 px-4 rounded-xl transition-colors text-sm"
                    )}
                  >
                    Ver na Loja
                    <ExternalLink size={16} />
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
