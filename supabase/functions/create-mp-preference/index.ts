import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const MP_ACCESS_TOKEN = Deno.env.get("MP_ACCESS_TOKEN");
    if (!MP_ACCESS_TOKEN) {
      throw new Error("MP_ACCESS_TOKEN is not configured");
    }

    const { title, quantity, unit_price, currency_id, back_urls } = await req.json();

    if (!title || !unit_price) {
      return new Response(
        JSON.stringify({ error: "title and unit_price are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const preference = {
      items: [
        {
          title,
          quantity: quantity ?? 1,
          unit_price,
          currency_id: currency_id ?? "BRL",
        },
      ],
      back_urls: back_urls ?? {
        success: "https://id-preview--b6233550-b63c-4c4c-ac3c-80de4550475a.lovable.app/?status=success",
        failure: "https://id-preview--b6233550-b63c-4c4c-ac3c-80de4550475a.lovable.app/?status=failure",
        pending: "https://id-preview--b6233550-b63c-4c4c-ac3c-80de4550475a.lovable.app/?status=pending",
      },
      auto_return: "approved",
    };

    const response = await fetch("https://api.mercadopago.com/checkout/preferences", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${MP_ACCESS_TOKEN}`,
      },
      body: JSON.stringify(preference),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Mercado Pago API error:", data);
      return new Response(
        JSON.stringify({ error: "Failed to create preference", details: data }),
        { status: response.status, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ init_point: data.init_point, id: data.id }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
