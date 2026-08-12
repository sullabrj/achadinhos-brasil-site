/* Checkout — dispara pro Cloudflare Worker (checkout-worker.js), que
   cria a preferência no Mercado Pago Checkout Pro usando o Access
   Token secreto (nunca exposto aqui no front-end). */

// TROCAR pela URL real do Worker depois do deploy na Cloudflare
// (ex.: https://achadinhos-checkout.SEU-SUBDOMINIO.workers.dev)
const CHECKOUT_WORKER_URL = "https://achadinhos-checkout.SEU-SUBDOMINIO.workers.dev";

async function iniciarCheckout() {
  const cart = getCart();
  if (!cart.length) return;

  const items = cart
    .map((i) => {
      const p = getProductById(i.id);
      if (!p) return null;
      return {
        id: p.id,
        title: p.name,
        quantity: i.qty,
        unit_price: p.price
      };
    })
    .filter(Boolean);

  const btn = document.getElementById("btn-checkout");
  if (btn) {
    btn.disabled = true;
    btn.textContent = "Redirecionando pro pagamento...";
  }

  try {
    const resp = await fetch(CHECKOUT_WORKER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items })
    });
    if (!resp.ok) throw new Error("Falha ao criar preferência de pagamento");
    const data = await resp.json();
    if (data.init_point) {
      window.location.href = data.init_point;
    } else {
      throw new Error("Resposta inválida do checkout");
    }
  } catch (err) {
    alert("Não foi possível iniciar o pagamento agora. Tente novamente em instantes ou fale com a gente pelo WhatsApp.");
    if (btn) {
      btn.disabled = false;
      btn.textContent = "Finalizar compra";
    }
  }
}
