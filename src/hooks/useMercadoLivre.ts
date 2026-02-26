import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface MLItem {
  id: string;
  title: string;
  price: number;
  originalPrice: number | null;
  discount: number | null;
  currency: string;
  image: string;
  images: string[];
  permalink: string;
  condition: string;
  affiliateLink?: string;
}

export function useMercadoLivre(
  itemIds: string[],
  affiliateLinks?: Record<string, string>
) {
  const [items, setItems] = useState<MLItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!itemIds.length) {
      setItems([]);
      setLoading(false);
      return;
    }

    const fetchItems = async () => {
      setLoading(true);
      setError(null);

      try {
        const { data, error: fnError } = await supabase.functions.invoke(
          "mercadolivre-proxy",
          { body: { itemIds } }
        );

        if (fnError) throw new Error(fnError.message);

        const enriched: MLItem[] = (data.items ?? [])
          .filter((i: any) => !i.error)
          .map((item: MLItem) => ({
            ...item,
            affiliateLink: affiliateLinks?.[item.id] ?? item.permalink,
          }));

        setItems(enriched);
      } catch (err: any) {
        console.error("useMercadoLivre error:", err);
        setError(err.message ?? "Erro ao buscar produtos do Mercado Livre");
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [JSON.stringify(itemIds)]);

  return { items, loading, error };
}
