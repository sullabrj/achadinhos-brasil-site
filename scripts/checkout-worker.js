/**
 * Cloudflare Worker — cria uma preferência de pagamento no Mercado Pago
 * Checkout Pro e devolve o link (init_point) pro front-end redirecionar.
 * Também recebe as notificações Webhook do Mercado Pago em /mp-webhook.
 *
 * O Access Token de PRODUÇÃO do Mercado Pago fica como SECRET da
 * Cloudflare (nunca neste arquivo). Configurar com:
 *   wrangler secret put MP_ACCESS_TOKEN
 * (O comando vai pedir o token no terminal na hora — não fica salvo em
 * nenhum arquivo de texto).
 */

const ALLOWED_ORIGIN = "https://lojaachadinhosbrasil.com.br";
const WORKER_URL = "https://achadinhos-checkout.comercial-0a2.workers.dev";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders() });
    }

    // Webhook do Mercado Pago: só precisa responder 200 para confirmar recebimento.
    // (Próximo passo futuro: buscar o pagamento pelo id e atualizar pedido.)
    if (url.pathname === "/mp-webhook") {
      return new Response("ok", { status: 200 });
    }

    if (request.method !== "POST") {
      return json({ error: "Método não permitido" }, 405);
    }

    let body;
    try {
      body = await request.json();
    } catch (e) {
      return json({ error: "JSON inválido" }, 400);
    }

    const items = Array.isArray(body.items) ? body.items : [];
    if (!items.length) {
      return json({ error: "Carrinho vazio" }, 400);
    }

    const preference = {
      items: items.map((i) => ({
        title: String(i.title).slice(0, 256),
        quantity: Math.max(1, parseInt(i.quantity, 10) || 1),
        unit_price: Number(i.unit_price),
        currency_id: "BRL"
      })),
      back_urls: {
        success: `${ALLOWED_ORIGIN}/pages/pedido-confirmado.html`,
        failure: `${ALLOWED_ORIGIN}/carrinho.html`,
        pending: `${ALLOWED_ORIGIN}/pages/pedido-confirmado.html`
      },
      auto_return: "approved",
      notification_url: `${WORKER_URL}/mp-webhook`
    };

    const mpResp = await fetch("https://api.mercadopago.com/checkout/preferences", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${env.MP_ACCESS_TOKEN}`
      },
      body: JSON.stringify(preference)
    });

    if (!mpResp.ok) {
      const errText = await mpResp.text();
      return json({ error: "Falha ao criar preferência", detail: errText }, 502);
    }

    const mpData = await mpResp.json();
    return json({ init_point: mpData.init_point });
  }
};

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  };
}

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders() }
  });
}
