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
 * Rota /simulate-test-payment (GET): faz um pagamento de teste completo
 * direto pela API do Mercado Pago (tokeniza um cartão de teste oficial e
 * chama /v1/payments), sem passar pelo checkout visual. Usa a Public Key
 * de teste (não é secreta, pode ficar aqui) e o secret MP_TEST_ACCESS_TOKEN.
 * Só existe pra validar a etapa "Testar a integração" do checklist do
 * Mercado Pago. Pode ser removida depois que a integração for aprovada.
 */

const ALLOWED_ORIGIN = "https://lojaachadinhosbrasil.com.br";
const WORKER_URL = "https://achadinhos-checkout.comercial-0a2.workers.dev";
const MP_TEST_PUBLIC_KEY = "APP_USR-8866706b-db92-40df-9817-442d4d3b37bc";

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

    // Rota de diagnóstico temporária: confirma sem expor o token se os dois
    // secrets foram colados nos campos certos (compara o sufixo numérico —
    // que é o ID da conta embutido no token — com o User ID mostrado no
    // painel do Mercado Pago). Remover depois de resolver o problema.
    if (url.pathname === "/debug-token-info" && request.method === "GET") {
      const testTok = env.MP_TEST_ACCESS_TOKEN || "";
      const liveTok = env.MP_ACCESS_TOKEN || "";
      return json({
        test_present: testTok.length > 0,
        test_len: testTok.length,
        test_prefix: testTok.slice(0, 8),
        test_suffix: testTok.split("-").pop(),
        live_present: liveTok.length > 0,
        live_len: liveTok.length,
        live_prefix: liveTok.slice(0, 8),
        live_suffix: liveTok.split("-").pop(),
        same_value: testTok !== "" && testTok === liveTok
      });
    }

    // Rota de teste (sandbox) usada só para validar a integração no painel do Mercado Pago.
    if (url.pathname === "/test-preference" && request.method === "GET") {
      if (!env.MP_TEST_ACCESS_TOKEN) {
        return json({ error: "MP_TEST_ACCESS_TOKEN não configurado" }, 500);
      }

      const preference = {
        items: [
          { title: "Produto de teste", quantity: 1, unit_price: 10, currency_id: "BRL" }
        ],
        back_urls: {
          success: `${ALLOWED_ORIGIN}/pages/pedido-confirmado.html`,
          failure: `${ALLOWED_ORIGIN}/carrinho.html`,
          pending: `${ALLOWED_ORIGIN}/pages/pedido-confirmado.html`
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
        return json({ error: "Falha ao criar preferência de teste", detail: errText }, 502);
      }

      const mpData = await mpResp.json();
      return json({ init_point: mpData.sandbox_init_point || mpData.init_point });
    }

    // Rota de teste: paga direto via API (sem checkout visual, sem login).
    if (url.pathname === "/simulate-test-payment" && request.method === "GET") {
      if (!env.MP_TEST_ACCESS_TOKEN) {
        return json({ error: "MP_TEST_ACCESS_TOKEN não configurado" }, 500);
      }

      // Cartão de teste oficial do Mercado Pago (Mastercard, aprovação simulada).
      const tokenResp = await fetch(
        `https://api.mercadopago.com/v1/card_tokens?public_key=${MP_TEST_PUBLIC_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            card_number: "5031433215406351",
            expiration_month: 11,
            expiration_year: 2030,
            security_code: "123",
            cardholder: {
              name: "APRO",
              identification: { type: "CPF", number: "12345678909" }
            }
          })
        }
      );

      if (!tokenResp.ok) {
        const errText = await tokenResp.text();
        return json({ error: "Falha ao tokenizar cartão de teste", detail: errText }, 502);
      }

      const tokenData = await tokenResp.json();

      const paymentResp = await fetch("https://api.mercadopago.com/v1/payments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${env.MP_TEST_ACCESS_TOKEN}`,
          "X-Idempotency-Key": crypto.randomUUID()
        },
        body: JSON.stringify({
          transaction_amount: 10,
          token: tokenData.id,
          description: "Produto de teste",
          installments: 1,
          payment_method_id: "master",
          payer: { email: "test_user_123456@testuser.com" }
        })
      });

      const paymentData = await paymentResp.json();
      return json({
        payment_status: paymentData.status,
        status_detail: paymentData.status_detail,
        payment_id: paymentData.id,
        raw: paymentData
      });
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
