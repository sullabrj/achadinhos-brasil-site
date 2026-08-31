/* Eventos de e-commerce do GA4 (add_to_cart, begin_checkout, purchase...).
   Sem isso o Google Ads nao tem sinal de venda pra otimizar: ele acaba
   otimizando por clique barato, que traz visita que nao compra.

   Tudo aqui e a prova de falha: se o gtag nao carregou (bloqueador de
   anuncio, rede lenta), as funcoes simplesmente nao fazem nada e a loja
   continua funcionando normalmente. */

const PEDIDO_KEY = "achadinhos_pedido_pendente";

function gaOn() {
  return typeof window.gtag === "function";
}

function gaEnviar(nome, params) {
  if (!gaOn()) return;
  try {
    window.gtag("event", nome, params || {});
  } catch (e) {
    /* nunca deixa a analise quebrar a loja */
  }
}

/* Monta o item no formato que o GA4 espera. */
function gaItem(p, qty) {
  if (!p) return null;
  return {
    item_id: p.id,
    item_name: p.name,
    item_category: p.categoryLabel || p.category,
    price: Number(p.price) || 0,
    quantity: Number(qty) || 1
  };
}

/* Itens do carrinho + valor total, usando o desconto do cupom quando houver. */
function gaCarrinho() {
  if (typeof getCart !== "function" || typeof getProductById !== "function") {
    return { items: [], valor: 0 };
  }
  let pct = 0;
  if (typeof getCupomAplicado === "function") {
    const c = getCupomAplicado();
    if (c && c.pct) pct = c.pct;
  }
  const items = [];
  let valor = 0;
  for (const linha of getCart()) {
    const p = getProductById(linha.id);
    if (!p) continue;
    const preco = +(Number(p.price) * (1 - pct)).toFixed(2);
    items.push({
      item_id: p.id,
      item_name: p.name,
      item_category: p.categoryLabel || p.category,
      price: preco,
      quantity: linha.qty
    });
    valor += preco * linha.qty;
  }
  return { items, valor: +valor.toFixed(2) };
}

function trackViewItem(p) {
  const item = gaItem(p, 1);
  if (!item) return;
  gaEnviar("view_item", { currency: "BRL", value: item.price, items: [item] });
}

function trackAddToCart(productId, qty) {
  if (typeof getProductById !== "function") return;
  const item = gaItem(getProductById(productId), qty);
  if (!item) return;
  gaEnviar("add_to_cart", {
    currency: "BRL",
    value: +(item.price * item.quantity).toFixed(2),
    items: [item]
  });
}

function trackViewCart() {
  const { items, valor } = gaCarrinho();
  if (!items.length) return;
  gaEnviar("view_cart", { currency: "BRL", value: valor, items });
}

/* Chamado no clique de "Finalizar compra", antes de ir pro Mercado Pago.
   Guarda o pedido pra conseguir disparar o purchase na volta — o site nao
   tem banco de dados, entao o resumo viaja no proprio navegador. */
function trackBeginCheckout(freteValor) {
  const { items, valor } = gaCarrinho();
  if (!items.length) return;
  const total = +(valor + (Number(freteValor) || 0)).toFixed(2);
  gaEnviar("begin_checkout", { currency: "BRL", value: valor, items });
  try {
    localStorage.setItem(
      PEDIDO_KEY,
      JSON.stringify({ items, valor: total, frete: Number(freteValor) || 0, ts: Date.now() })
    );
  } catch (e) {}
}

/* Chamado na pagina de pedido confirmado, na volta do Mercado Pago.
   So conta como venda (purchase) quando o Mercado Pago devolve o
   pagamento aprovado. PIX e boleto voltam como "pending": nesse caso
   registra um evento separado, senao a conta de vendas fica inflada com
   pedido que ainda nao foi pago. */
function trackPurchase() {
  let pedido = null;
  try {
    pedido = JSON.parse(localStorage.getItem(PEDIDO_KEY) || "null");
  } catch (e) {}
  if (!pedido || !pedido.items || !pedido.items.length) return;

  const q = new URLSearchParams(location.search);
  const status = (q.get("collection_status") || q.get("status") || "").toLowerCase();
  const txId =
    q.get("payment_id") || q.get("collection_id") || q.get("preference_id") || "s/ id " + pedido.ts;

  if (status === "approved") {
    gaEnviar("purchase", {
      transaction_id: String(txId),
      currency: "BRL",
      value: pedido.valor,
      shipping: pedido.frete,
      items: pedido.items
    });
  } else {
    gaEnviar("pedido_aguardando_pagamento", {
      transaction_id: String(txId),
      currency: "BRL",
      value: pedido.valor,
      status: status || "desconhecido",
      items: pedido.items
    });
  }
  try {
    localStorage.removeItem(PEDIDO_KEY);
  } catch (e) {}
}
