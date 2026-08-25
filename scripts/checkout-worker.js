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
 * AVISO AUTOMÁTICO DE PEDIDO PAGO (23/08, trocado de e-mail pra
 * WhatsApp no mesmo dia por decisão do usuário, e da WhatsApp Cloud
 * API oficial da Meta pro CallMeBot logo em seguida — a API oficial
 * exigia app no Meta Business + template aprovado, trabalho demais
 * pra esse caso): como a Dropi não tem API pública pra criar pedido
 * automaticamente (confirmado por engenharia reversa — o pagamento ao
 * fornecedor é sempre um PIX manual, não dá pra automatizar), o
 * Worker manda uma mensagem de WhatsApp assim que um pagamento é
 * aprovado, com todos os dados (cliente + endereço + itens) pra
 * montar o pedido manual na Dropi rapidinho. Usa o CallMeBot
 * (https://callmebot.com) — serviço gratuito e não-oficial, mensagem
 * de texto livre (sem template pré-aprovado), só manda pro número que
 * ativou o bot. Configuração pelo celular do usuário (feita fora
 * daqui): salvar o contato do CallMeBot (+34 644 51 95 23), mandar
 * "I allow callmebot to send me messages" pra ele no WhatsApp, e
 * esperar a resposta com a API key.
 * Secrets necessários:
 *   wrangler secret put CALLMEBOT_PHONE   (número que ativou o bot, formato 55DDDNÚMERO)
 *   wrangler secret put CALLMEBOT_APIKEY  (chave que o bot manda de volta)
 *
 * AVISO POR E-MAIL (reativado 25/08, 2º canal além do WhatsApp — agora
 * com um Gmail dedicado da marca, achadinhosbrasilloja@gmail.com, em
 * vez do e-mail comercial da SULLAB): usa a API da Resend
 * (https://resend.com), plano grátis, remetente padrão sem precisar
 * verificar domínio próprio (onboarding@resend.dev só consegue mandar
 * pro e-mail dono da própria conta Resend — por isso a conta Resend
 * deve ser criada com o mesmo Gmail que vai receber o aviso).
 * Secrets necessários:
 *   wrangler secret put RESEND_API_KEY  (gerada em resend.com/api-keys)
 *   wrangler secret put NOTIFY_EMAIL    (achadinhosbrasilloja@gmail.com)
 * Sem esses 2 secrets configurados, o envio de e-mail é ignorado
 * silenciosamente (não quebra o checkout nem o aviso por WhatsApp).
 *
 * Como o site não tem banco de dados, os dados do cliente (nome,
 * telefone, CPF, endereço) e um resumo dos itens viajam dentro do
 * campo "external_reference" da preferência do Mercado Pago — esse
 * campo é sempre devolvido junto com o pagamento na API deles, então
 * dá pra recuperar tudo sem precisar guardar nada em lugar nenhum.
 *
 * LIMITAÇÃO CONHECIDA: o Mercado Pago pode reenviar o mesmo webhook
 * mais de uma vez (retry) — sem banco de dados não dá pra deduplicar
 * de forma 100% confiável, então em casos raros pode chegar o mesmo
 * aviso de WhatsApp duplicado. Não é grave (só reenvia o mesmo
 * pedido), mas fica registrado aqui caso vire problema de verdade no
 * futuro.
 *
 * Rota /test-preference (GET): gera uma preferência de TESTE usando o
 * secret MP_TEST_ACCESS_TOKEN (token de teste, sandbox) — só existe pra
 * validar a integração no checklist do Mercado Pago. Não mexe em dinheiro
 * real. Pode ser removida depois que a integração for aprovada.
 *
 * CORS: aceita os endereços onde o site pode estar no ar — domínio
 * próprio com www (produção atual), domínio próprio sem www (apex,
 * caso o redirect do GitHub Pages não tenha acontecido ainda) e o
 * GitHub Pages antigo (fallback/teste).
 */

const ALLOWED_ORIGINS = [
  "https://www.lojaachadinhosbrasil.com.br",
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

function formatBRLServer(n) {
  return (Number(n) || 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

// Empacota os dados do cliente + resumo dos itens de forma compacta pra
// caber no external_reference da preferência do Mercado Pago.
function buildOrderRef(customer, items) {
  const ref = {
    n: String(customer.nome || "").slice(0, 80),
    t: String(customer.telefone || "").slice(0, 20),
    c: String(customer.cpf || "").replace(/\D/g, "").slice(0, 11),
    cep: String(customer.cep || "").replace(/\D/g, "").slice(0, 8),
    e: String(customer.endereco || "").slice(0, 100),
    num: String(customer.numero || "").slice(0, 15),
    cpl: String(customer.complemento || "").slice(0, 60),
    b: String(customer.bairro || "").slice(0, 60),
    ci: String(customer.cidade || "").slice(0, 60),
    uf: String(customer.estado || "").slice(0, 2),
    it: items.slice(0, 20).map((i) => ({
      t: String(i.title).slice(0, 60),
      q: i.quantity,
      p: i.unit_price
    }))
  };
  return JSON.stringify(ref);
}

async function notificarPedidoAprovado(payment, env) {
  if (!env.CALLMEBOT_PHONE || !env.CALLMEBOT_APIKEY) return;

  let pedido = {};
  try {
    pedido = JSON.parse(payment.external_reference || "{}");
  } catch (e) {
    pedido = {};
  }

  const itens = Array.isArray(pedido.it) ? pedido.it : [];
  const itensTexto =
    itens.map((i) => `${i.q}x ${i.t} (${formatBRLServer(i.p)})`).join(", ").slice(0, 300) ||
    "itens não identificados — confira no painel do Mercado Pago";

  const dataAprovado = payment.date_approved
    ? new Date(payment.date_approved).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })
    : "";

  const enderecoTexto = `${pedido.e || "-"}, ${pedido.num || "-"}${pedido.cpl ? " - " + pedido.cpl : ""}, ${pedido.b || "-"}, ${pedido.ci || "-"}/${pedido.uf || "-"}, CEP ${pedido.cep || "-"}`;

  const texto = [
    `🛒 Novo pedido pago - Achadinhos Brasil`,
    `Pagamento #${payment.id} - ${formatBRLServer(payment.transaction_amount)}${dataAprovado ? " (aprovado em " + dataAprovado + ")" : ""}`,
    `Cliente: ${pedido.n || "(nome não informado)"}`,
    `Tel/WhatsApp: ${pedido.t || "-"}`,
    `CPF: ${pedido.c || "-"}`,
    `Endereço: ${enderecoTexto}`,
    `Itens: ${itensTexto}`
  ].join("\n");

  const url = `https://api.callmebot.com/whatsapp.php?phone=${encodeURIComponent(env.CALLMEBOT_PHONE)}&text=${encodeURIComponent(texto)}&apikey=${encodeURIComponent(env.CALLMEBOT_APIKEY)}`;
  await fetch(url);
}

async function notificarPorEmail(payment, env) {
  if (!env.RESEND_API_KEY || !env.NOTIFY_EMAIL) return;

  let pedido = {};
  try {
    pedido = JSON.parse(payment.external_reference || "{}");
  } catch (e) {
    pedido = {};
  }

  const itens = Array.isArray(pedido.it) ? pedido.it : [];
  const itensHtml =
    itens.map((i) => `<li>${i.q}x ${i.t} — ${formatBRLServer(i.p)}</li>`).join("") ||
    "<li>itens não identificados — confira no painel do Mercado Pago</li>";

  const dataAprovado = payment.date_approved
    ? new Date(payment.date_approved).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })
    : "";

  const enderecoTexto = `${pedido.e || "-"}, ${pedido.num || "-"}${pedido.cpl ? " - " + pedido.cpl : ""}, ${pedido.b || "-"}, ${pedido.ci || "-"}/${pedido.uf || "-"}, CEP ${pedido.cep || "-"}`;

  const html = `
    <h2>🛒 Novo pedido pago — Achadinhos Brasil</h2>
    <p><b>Pagamento #${payment.id}</b> — ${formatBRLServer(payment.transaction_amount)}${dataAprovado ? " (aprovado em " + dataAprovado + ")" : ""}</p>
    <p><b>Cliente:</b> ${pedido.n || "(nome não informado)"}<br>
    <b>Tel/WhatsApp:</b> ${pedido.t || "-"}<br>
    <b>CPF:</b> ${pedido.c || "-"}</p>
    <p><b>Endereço:</b> ${enderecoTexto}</p>
    <p><b>Itens:</b></p>
    <ul>${itensHtml}</ul>
  `;

  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${env.RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: "Achadinhos Brasil <onboarding@resend.dev>",
        to: [env.NOTIFY_EMAIL],
        subject: `Novo pedido pago — ${formatBRLServer(payment.transaction_amount)}`,
        html
      })
    });
  } catch (e) {
    // nunca deixa o webhook falhar por causa do aviso — só não avisa dessa vez.
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const origin = resolveOrigin(request);
    const siteBase = siteBaseFor(origin);

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders(origin) });
    }

    // Webhook do Mercado Pago: identifica o pagamento (JSON body no formato
    // novo, ou query params no formato IPN antigo), busca os detalhes na API
    // deles e, se estiver aprovado, manda o WhatsApp de aviso com os dados do
    // pedido. Sempre responde 200 rápido — mesmo se o aviso falhar — pra não
    // entrar num loop de reenvio do Mercado Pago.
    if (url.pathname === "/mp-webhook") {
      let paymentId = url.searchParams.get("data.id") || url.searchParams.get("id");

      if (!paymentId && request.method === "POST") {
        try {
          const body = await request.json();
          if (body?.data?.id) paymentId = body.data.id;
          else if (body?.id && (body.type === "payment" || body.topic === "payment")) paymentId = body.id;
        } catch (e) {
          // corpo vazio ou não-JSON: sem problema, só não dá pra identificar agora.
        }
      }

      if (paymentId && env.MP_ACCESS_TOKEN) {
        try {
          const payResp = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
            headers: { Authorization: `Bearer ${env.MP_ACCESS_TOKEN}` }
          });
          if (payResp.ok) {
            const payment = await payResp.json();
            if (payment.status === "approved") {
              await Promise.all([
                notificarPedidoAprovado(payment, env),
                notificarPorEmail(payment, env)
              ]);
            }
          }
        } catch (e) {
          // nunca deixa o webhook falhar por causa do aviso — só não avisa dessa vez.
        }
      }

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

    const customer = body.customer && typeof body.customer === "object" ? body.customer : {};
    const camposFaltando = [];
    if (!customer.nome) camposFaltando.push("nome");
    if (!customer.telefone) camposFaltando.push("telefone");
    if (!customer.cpf) camposFaltando.push("CPF");
    if (!customer.cep) camposFaltando.push("CEP");
    if (!customer.endereco) camposFaltando.push("endereço");
    if (!customer.numero) camposFaltando.push("número");
    if (!customer.bairro) camposFaltando.push("bairro");
    if (!customer.cidade) camposFaltando.push("cidade");
    if (!customer.estado) camposFaltando.push("estado");
    if (camposFaltando.length) {
      return json({ error: `Dados de entrega incompletos: ${camposFaltando.join(", ")}` }, 400, origin);
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
      notification_url: `${WORKER_URL}/mp-webhook`,
      external_reference: buildOrderRef(customer, items)
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

