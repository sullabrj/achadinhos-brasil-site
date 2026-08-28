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
function buildOrderRef(customer, items, frete) {
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
  if (frete) {
    ref.fr = { n: String(frete.nome || "").slice(0, 40), p: Number(frete.preco) || 0 };
  }
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
    `Itens: ${itensTexto}`,
    `Frete cobrado do cliente: ${pedido.fr ? pedido.fr.n + " - " + formatBRLServer(pedido.fr.p) : "não informado"}`
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


/* =====================================================================
   MELHOR ENVIO — OAuth2 e token de acesso (28/08/2026)
   O Melhor Envio não entrega token fixo: o app cadastrado na Área Dev
   (Client ID + Secret) autoriza uma vez pelo navegador e devolve um
   access_token de ~30 dias mais um refresh_token. Guardar isso exige
   um lugar que sobreviva ao reinício do Worker — por isso o binding
   KV `ME_TOKENS`. Sem KV, cai no secret MELHOR_ENVIO_TOKEN, que é o
   modo manual (vence em 30 dias e precisa ser trocado na mão).

   Secrets/variáveis esperados na Cloudflare:
     MELHOR_ENVIO_CLIENT_ID      (25713 — não é segredo, mas fica junto)
     MELHOR_ENVIO_CLIENT_SECRET  (secret)
     CEP_ORIGEM                  (CEP de onde sai a mercadoria)
     MELHOR_ENVIO_TOKEN          (opcional, só no modo manual sem KV)
   Binding opcional: KV namespace ME_TOKENS.

   Autorização (uma vez só): abrir /melhor-envio/auth no navegador,
   logar no Melhor Envio, autorizar. O /melhor-envio/callback grava o
   token no KV e a partir daí o Worker se vira sozinho.
   ===================================================================== */

const ME_BASE = "https://melhorenvio.com.br";
const ME_SCOPES = "shipping-calculate";
const ME_KEY = "melhor-envio-token";

function meRedirectUri(env) {
  return `${WORKER_URL}/melhor-envio/callback`;
}

async function meSalvarToken(env, data) {
  if (!env.ME_TOKENS) return;
  const registro = {
    access_token: data.access_token,
    refresh_token: data.refresh_token,
    // Renova com 2 dias de folga pra nunca falhar uma cotação no limite.
    expires_at: Date.now() + (Number(data.expires_in) || 2592000) * 1000 - 172800000
  };
  await env.ME_TOKENS.put(ME_KEY, JSON.stringify(registro));
  return registro;
}

async function meTrocarCodigo(env, params) {
  const resp = await fetch(`${ME_BASE}/oauth/token`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      client_id: env.MELHOR_ENVIO_CLIENT_ID,
      client_secret: env.MELHOR_ENVIO_CLIENT_SECRET,
      ...params
    })
  });
  const data = await resp.json();
  if (!resp.ok || !data.access_token) {
    throw new Error(`Melhor Envio recusou o token: ${JSON.stringify(data).slice(0, 200)}`);
  }
  return data;
}

async function meAccessToken(env) {
  // Modo manual: sem KV, usa o token colado à mão no secret.
  if (!env.ME_TOKENS) return env.MELHOR_ENVIO_TOKEN || null;

  const bruto = await env.ME_TOKENS.get(ME_KEY);
  if (!bruto) return env.MELHOR_ENVIO_TOKEN || null;

  let reg;
  try {
    reg = JSON.parse(bruto);
  } catch (e) {
    return env.MELHOR_ENVIO_TOKEN || null;
  }
  if (reg.access_token && Date.now() < Number(reg.expires_at || 0)) return reg.access_token;

  // Venceu (ou está perto): renova com o refresh_token e regrava.
  if (!reg.refresh_token) return null;
  try {
    const novo = await meTrocarCodigo(env, {
      grant_type: "refresh_token",
      refresh_token: reg.refresh_token
    });
    const salvo = await meSalvarToken(env, novo);
    return salvo ? salvo.access_token : novo.access_token;
  } catch (e) {
    return null;
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



    /* Passo 1 da autorização: manda o navegador pro Melhor Envio. Abrir
       uma vez só, logado na conta da loja. */
    if (url.pathname === "/melhor-envio/auth") {
      if (!env.MELHOR_ENVIO_CLIENT_ID) {
        return new Response("Falta MELHOR_ENVIO_CLIENT_ID no Worker.", { status: 503 });
      }
      const destino = new URL(`${ME_BASE}/oauth/authorize`);
      destino.searchParams.set("client_id", env.MELHOR_ENVIO_CLIENT_ID);
      destino.searchParams.set("redirect_uri", meRedirectUri(env));
      destino.searchParams.set("response_type", "code");
      destino.searchParams.set("state", "achadinhos");
      destino.searchParams.set("scope", ME_SCOPES);
      return Response.redirect(destino.toString(), 302);
    }

    /* Passo 2: o Melhor Envio devolve o código aqui; trocamos por
       access_token + refresh_token e gravamos no KV. */
    if (url.pathname === "/melhor-envio/callback") {
      const code = url.searchParams.get("code");
      if (!code) {
        return new Response("Autorização não veio com código. Tente de novo em /melhor-envio/auth", { status: 400 });
      }
      try {
        const data = await meTrocarCodigo(env, {
          grant_type: "authorization_code",
          redirect_uri: meRedirectUri(env),
          code
        });
        await meSalvarToken(env, data);
        const guardou = !!env.ME_TOKENS;
        return new Response(
          guardou
            ? "Pronto! O Melhor Envio foi autorizado e o token ficou guardado. Pode fechar esta aba."
            : "Autorizado, mas o Worker está sem o KV ME_TOKENS, então o token NÃO foi guardado. Crie o namespace e repita.",
          { status: 200, headers: { "Content-Type": "text/plain; charset=utf-8" } }
        );
      } catch (e) {
        return new Response(`Falha ao autorizar: ${e.message}`, { status: 502 });
      }
    }

    /* ------------------------------------------------------------------
       COTAÇÃO DE FRETE — Melhor Envio (rota POST /frete)
       Decisão do usuário em 27/08/2026: "tem que ser o cliente pagar o
       frete, nao pagamos frete". Até então o carrinho não tinha linha de
       frete nenhuma e a loja absorvia o que a Dropi cobra no Pix do
       fornecedor (R$ 25,00 no pedido de teste).
       O token do Melhor Envio é SECRET da Cloudflare, nunca fica aqui:
         wrangler secret put MELHOR_ENVIO_TOKEN
         wrangler secret put CEP_ORIGEM        (CEP de onde sai a mercadoria)
       Ambiente de produção da API: melhorenvio.com.br/api/v2.
       Body esperado: { cep, pacote:{peso,comprimento,largura,altura}, valor }
       Resposta: { opcoes: [{ id, nome, empresa, preco, prazo }] }
       ------------------------------------------------------------------ */
    if (url.pathname === "/frete" && request.method === "POST") {
      const meToken = await meAccessToken(env);
      if (!meToken || !env.CEP_ORIGEM) {
        return json({ error: "Cotação de frete ainda não configurada" }, 503, origin);
      }
      let fb;
      try {
        fb = await request.json();
      } catch (e) {
        return json({ error: "JSON inválido" }, 400, origin);
      }
      const cepDestino = String(fb.cep || "").replace(/\D/g, "");
      if (cepDestino.length !== 8) {
        return json({ error: "CEP inválido" }, 400, origin);
      }
      const pk = fb.pacote || {};
      const pacote = {
        // Mínimos dos Correios: 16 x 11 x 2 cm. O Melhor Envio recusa a
        // cotação se vier abaixo disso, então o piso é aplicado aqui também
        // e não só no front-end.
        height: Math.max(2, Number(pk.altura) || 2),
        width: Math.max(11, Number(pk.largura) || 11),
        length: Math.max(16, Number(pk.comprimento) || 16),
        weight: Math.max(0.05, Number(pk.peso) || 0.3)
      };
      const valorSegurado = Math.max(1, Number(fb.valor) || 1);

      let meResp, meData;
      try {
        meResp = await fetch("https://melhorenvio.com.br/api/v2/me/shipment/calculate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${meToken}`,
            "User-Agent": "Achadinhos Brasil (achadinhosbrasilloja@gmail.com)"
          },
          body: JSON.stringify({
            from: { postal_code: String(env.CEP_ORIGEM).replace(/\D/g, "") },
            to: { postal_code: cepDestino },
            package: pacote,
            options: { insurance_value: valorSegurado, receipt: false, own_hand: false },
            services: ""
          })
        });
        meData = await meResp.json();
      } catch (e) {
        return json({ error: "Não foi possível cotar o frete agora" }, 502, origin);
      }
      if (!Array.isArray(meData)) {
        return json({ error: "Resposta inesperada da transportadora" }, 502, origin);
      }

      const opcoes = meData
        .filter((o) => o && !o.error && o.price)
        .map((o) => ({
          id: String(o.id),
          nome: String(o.name || ""),
          empresa: String((o.company && o.company.name) || ""),
          preco: Number(o.price),
          // O Melhor Envio devolve o prazo em dias ÚTEIS, já somado o tempo
          // de postagem quando a conta tem esse ajuste configurado.
          prazo: Number(o.delivery_time) || null
        }))
        .sort((a, b) => a.preco - b.preco);

      if (!opcoes.length) {
        return json({ error: "Nenhuma transportadora atende esse CEP" }, 404, origin);
      }
      return json({ opcoes }, 200, origin);
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

    const frete = body.frete && typeof body.frete === "object" ? body.frete : null;
    if (!frete || !(Number(frete.preco) > 0)) {
      return json({ error: "Escolha uma opção de frete antes de finalizar" }, 400, origin);
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
      // Nome que aparece na FATURA do cartão do comprador (máx. 13 caracteres,
      // limite da própria API do Mercado Pago). Sem isso, a fatura mostra a
      // razão social da conta (SULLAB...), que o cliente não reconhece — causa
      // clássica de contestação/estorno. Não muda o nome do vendedor exibido
      // na tela de pagamento; esse vem do "Nome do negócio" cadastrado na
      // conta Mercado Pago e só pode ser trocado lá no painel.
      statement_descriptor: "ACHADINHOS",
      external_reference: buildOrderRef(customer, items, frete)
    };

    // O frete vai como "shipments.cost" e não como item da lista: assim ele
    // aparece separado na tela do Mercado Pago e no comprovante do cliente,
    // do jeito que ele espera ver.
    if (frete && Number(frete.preco) > 0) {
      preference.shipments = {
        mode: "not_specified",
        cost: Number(frete.preco)
      };
    }

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

