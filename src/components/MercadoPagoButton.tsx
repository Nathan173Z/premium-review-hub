import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ExternalLink, Loader2 } from "lucide-react";

interface MercadoPagoButtonProps {
  title: string;
  unitPrice: number;
  quantity?: number;
}

const MercadoPagoButton = ({ title, unitPrice, quantity = 1 }: MercadoPagoButtonProps) => {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("create-mp-preference", {
        body: {
          title,
          unit_price: unitPrice,
          quantity,
        },
      });

      if (error) throw error;
      if (data?.init_point) {
        window.open(data.init_point, "_blank");
      }
    } catch (err) {
      console.error("Erro ao criar preferência MP:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className="w-full inline-flex items-center justify-center gap-2 bg-[hsl(195,100%,40%)] text-white px-6 py-3.5 rounded-full text-sm font-semibold transition-all hover:bg-[hsl(195,100%,35%)] hover:shadow-lg hover:scale-105 active:scale-100 disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {loading ? (
        <Loader2 size={16} className="animate-spin" />
      ) : (
        <ExternalLink size={16} />
      )}
      {loading ? "Processando…" : "Comprar com Mercado Pago"}
    </button>
  );
};

export default MercadoPagoButton;
