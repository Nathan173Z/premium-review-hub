import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { itemIds } = await req.json();

    if (!itemIds || !Array.isArray(itemIds) || itemIds.length === 0) {
      return new Response(
        JSON.stringify({ error: "itemIds array is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const ML_ACCESS_TOKEN = Deno.env.get("ML_ACCESS_TOKEN");

    // Fetch each item individually
    const results = await Promise.allSettled(
      itemIds.map(async (id: string) => {
        const url = `https://api.mercadolibre.com/items/${id}`;
        const headers: Record<string, string> = { Accept: "application/json" };
        if (ML_ACCESS_TOKEN) {
          headers["Authorization"] = `Bearer ${ML_ACCESS_TOKEN}`;
        }
        const res = await fetch(url, { headers });
        if (!res.ok) {
          return { id, error: `Status ${res.status}` };
        }
        return res.json();
      })
    );

    const items = results.map((result, idx) => {
      if (result.status === "rejected") {
        return { id: itemIds[idx], error: "Fetch failed" };
      }

      const item = result.value;
      if (item.error) return item;

      const originalPrice = item.original_price ?? null;
      const currentPrice = item.price ?? 0;
      const discount =
        originalPrice && originalPrice > currentPrice
          ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
          : null;

      return {
        id: item.id,
        title: item.title,
        price: currentPrice,
        originalPrice,
        discount,
        currency: item.currency_id ?? "BRL",
        image: item.pictures?.[0]?.secure_url ?? item.secure_thumbnail,
        images: item.pictures?.map((p: any) => p.secure_url) ?? [],
        permalink: item.permalink,
        condition: item.condition,
      };
    });

    return new Response(JSON.stringify({ items }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    console.error("ML proxy error:", error);
    const msg = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
