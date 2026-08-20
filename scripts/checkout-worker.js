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
 *
 * Rota /test-preference (GET): gera uma preferência de TESTE usando o
 * secret MP_TEST_ACCESS_TOKEN (token de teste, sandbox) — só existe pra
 * validar a integração no checklist do Mercado Pago. Não mexe em dinheiro
 * real. Pode ser removida depois que a integração for aprovada.
 *
 * CORS: aceita os dois endereços onde o site pode estar no ar — o
 * domínio próprio (quando a migração acontecer) e o GitHub Pages atual.
 * Corrigido em 20/08 — antes só aceitava o domínio próprio, então o
 * checkout falhava com "Failed to fetch" enquanto o site estivesse no
 * GitHub Pages (endereço usado hoje).
 */

const ALLOWED_ORIGINS = [
  "https://lojaachadinhosbrasil.com.br",
  "https://sullabrj.github.io"
];
const WORKER_URL = "https://achadinhos-checkout.comercial-0a2.workers.dev";

function resolveOrigin(request) {
  const reqOrigin = request.headers.get("Origin") || "";
  return ALLOWED_ORIGINS.includes(reqOrigin) ? reqOrigin : ALLOWED_ORIGINS[0];
}

function siteBaseFor(origin) {
  // No GitHub Pages o site fica num subcaminho de projeto; no domínio
  // próprio fica na raiz — por isso o caminho muda conforme a origem.
  return origin === "https://sullabrj.github.io"
    ? `${origin}/achadinhos-brasil-site`
    : origin;
}

function corsHeaders(origin) {
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  };
}

function json(obj, status = 200, origin = ALLOWED_ORIGINS[0]) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders(origin) }
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const origin = resolveOrigin(request);
    const siteBase = siteBaseFor(origin);

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders(origin) });
    }

    // Webhook do Mercado Pago: só precisa responder 200 para confirmar recebimento.
    // (Próximo passo futuro: buscar o pagamento pelo id e atualizar pedido.)
    if (url.pathname === "/mp-webhook") {
      return new Response("ok", { status: 200 });
    }

    // Rota de teste (sandbox) usada só para validar a integração no painel do Mercado Pago.
    if (url.pathname === "/test-preference" && request.method === "GET") {
      if (!env.MP_TEST_ACCESS_TOKEN) {
        return json({ error: "MP_TEST_ACCESS_TOKEN não configurado" }, 500, origin);
      }

      const preference = {
        items: [
          { title: "Produto de teste", quantity: 1, unit_price: 10, currency_id: "BRL" }
        ],
        back_urls: {
          success: `${siteBase}/pages/pedido-confirmado.html`,
          failure: `${siteBase}/carrinho.html`,
          pending: `${siteBase}/pages/pedido-confirmado.html`
        },
        notification_url: `${WORKER_URL}/mp-webhook`
      };

      const mpResp = await fetch("https://api.mercadopago.com/checkout/preferences", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${env.MP_TEST_ACCESS_TOKEN}`
        },
        body: JSON.stringify(preference)
      });

      if (!mpResp.ok) {
        const errText = await mpResp.text();
        return json({ error: "Falha ao criar preferência de teste", detail: errText }, 502, origin);
      }

      const mpData = await mpResp.json();
      return json({ init_point: mpData.sandbox_init_point || mpData.init_point }, 200, origin);
    }

    if (request.method !== "POST") {
      return json({ error: "Método não permitido" }, 405, origin);
    }

    let body;
    try {
      body = await request.json();
    } catch (e) {
      return json({ error: "JSON inválido" }, 400, origin);
    }

    const items = Array.isArray(body.items) ? body.items : [];
    if (!items.length) {
      return json({ error: "Carrinho vazio" }, 400, origin);
    }

    const preference = {
      items: items.map((i) => ({
        title: String(i.title).slice(0, 256),
        quantity: Math.max(1, parseInt(i.quantity, 10) || 1),
        unit_price: Number(i.unit_price),
        currency_id: "BRL"
      })),
      back_urls: {
        success: `${siteBase}/pages/pedido-confirmado.html`,
        failure: `${siteBase}/carrinho.html`,
        pending: `${siteBase}/pages/pedido-confirmado.html`
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
      return json({ error: "Falha ao criar preferência", detail: errText }, 502, origin);
    }

    const mpData = await mpResp.json();
    return json({ init_point: mpData.init_point }, 200, origin);
  }
};
