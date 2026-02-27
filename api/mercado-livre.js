// Proxy para API do Mercado Livre - evita CORS no front-end
export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: "Parâmetro 'id' é obrigatório" });
  }

  try {
    const response = await fetch(
      `https://api.mercadolibre.com/items/${encodeURIComponent(id)}`
    );

    if (!response.ok) {
      return res.status(response.status).json({
        error: `API Mercado Livre retornou ${response.status}`,
      });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    console.error("Erro ao buscar item ML:", err);
    return res.status(500).json({ error: "Erro ao consultar API" });
  }
}
