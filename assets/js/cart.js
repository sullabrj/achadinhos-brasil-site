/* Carrinho — 100% no navegador (localStorage). Nenhum dado sai daqui
   até o cliente clicar em "Finalizar compra" (aí sim vai pro Worker). */

const CART_KEY = "achadinhos_cart";

function getCart() {
  let cart;
  try {
    cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch (e) {
    return [];
  }
  if (!Array.isArray(cart)) return [];
  // Descarta itens de produtos que saíram do catálogo (fornecedor removido).
  // Sem isso o contador do carrinho conta um item que não aparece na lista
  // nem entra no total — o cliente vê "3" e só encontra 2 produtos.
  if (typeof getProductById !== "function") return cart;
  const validos = cart.filter((i) => i && getProductById(i.id));
  if (validos.length !== cart.length) {
    try { localStorage.setItem(CART_KEY, JSON.stringify(validos)); } catch (e) {}
  }
  return validos;
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadge();
}

function addToCart(productId, qty = 1) {
  const cart = getCart();
  const existing = cart.find((i) => i.id === productId);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ id: productId, qty });
  }
  saveCart(cart);
  if (typeof trackAddToCart === "function") trackAddToCart(productId, qty);
}

function updateCartQty(productId, qty) {
  let cart = getCart();
  if (qty <= 0) {
    cart = cart.filter((i) => i.id !== productId);
  } else {
    const item = cart.find((i) => i.id === productId);
    if (item) item.qty = qty;
  }
  saveCart(cart);
}

function removeFromCart(productId) {
  const cart = getCart().filter((i) => i.id !== productId);
  saveCart(cart);
}

function cartCount() {
  return getCart().reduce((sum, i) => sum + i.qty, 0);
}

function cartTotal() {
  return getCart().reduce((sum, i) => {
    const p = getProductById(i.id);
    return p ? sum + p.price * i.qty : sum;
  }, 0);
}

function updateCartBadge() {
  const badge = document.querySelector(".cart-badge");
  if (badge) badge.textContent = cartCount();
  if (document.getElementById("cart-drawer") && document.getElementById("cart-drawer").classList.contains("open")) {
    renderCartDrawerContents();
  }
}

/* ---------- Carrinho em drawer ----------
   Só uma prévia rápida: mostra o que já tem no carrinho (localStorage)
   sem precisar sair da página. "Finalizar compra" leva pra carrinho.html,
   que continua sendo a página real de checkout — nada do fluxo de
   pagamento muda aqui. */
function cartDrawerItemHTML(item, product) {
  if (!product) return "";
  return `
  <div class="cart-drawer-item" data-item-id="${product.id}">
    <div class="cart-drawer-thumb">${productThumbInner(product)}</div>
    <div>
      <div class="cart-drawer-name">${product.name}</div>
      <div class="cart-drawer-qty">
        <button type="button" data-qty-down="${product.id}" aria-label="Diminuir quantidade">−</button>
        <span>${item.qty}</span>
        <button type="button" data-qty-up="${product.id}" aria-label="Aumentar quantidade">+</button>
      </div>
      <button type="button" class="cart-drawer-remove" data-remove="${product.id}">remover</button>
    </div>
    <div class="cart-drawer-price">${formatBRL(product.price * item.qty)}</div>
  </div>`;
}

function renderCartDrawerContents() {
  const body = document.getElementById("cart-drawer-body");
  const totalEl = document.getElementById("cart-drawer-total-value");
  if (!body) return;
  const cart = getCart();
  if (!cart.length) {
    body.innerHTML = `<div class="cart-drawer-empty">Seu carrinho está vazio.<br>Que tal dar uma olhada nas ofertas?</div>`;
  } else {
    body.innerHTML = cart
      .map((item) => cartDrawerItemHTML(item, getProductById(item.id)))
      .join("");
  }
  if (totalEl) totalEl.textContent = formatBRL(cartTotal());
}

function openCartDrawer() {
  renderCartDrawerContents();
  const overlay = document.getElementById("cart-overlay");
  const drawer = document.getElementById("cart-drawer");
  if (overlay) overlay.classList.add("open");
  if (drawer) drawer.classList.add("open");
}

function closeCartDrawer() {
  const overlay = document.getElementById("cart-overlay");
  const drawer = document.getElementById("cart-drawer");
  if (overlay) overlay.classList.remove("open");
  if (drawer) drawer.classList.remove("open");
}

function injectCartDrawer() {
  if (document.getElementById("cart-drawer")) return;

  const overlay = document.createElement("div");
  overlay.className = "cart-overlay";
  overlay.id = "cart-overlay";

  const drawer = document.createElement("div");
  drawer.className = "cart-drawer";
  drawer.id = "cart-drawer";
  drawer.innerHTML = `
    <div class="cart-drawer-header">
      <h3>Seu carrinho</h3>
      <button type="button" class="cart-drawer-close" id="cart-drawer-close" aria-label="Fechar carrinho">✕</button>
    </div>
    <div class="cart-drawer-body" id="cart-drawer-body"></div>
    <div class="cart-drawer-footer">
      <div class="cart-drawer-total">
        <span>Total</span>
        <span id="cart-drawer-total-value">${formatBRL(0)}</span>
      </div>
      <a href="carrinho.html" class="btn btn-block">Finalizar compra</a>
      <button type="button" class="btn btn-outline btn-block" id="cart-drawer-continue" style="margin-top:8px;">Continuar comprando</button>
    </div>
  `;

  document.body.appendChild(overlay);
  document.body.appendChild(drawer);

  overlay.addEventListener("click", closeCartDrawer);
  document.getElementById("cart-drawer-close").addEventListener("click", closeCartDrawer);
  document.getElementById("cart-drawer-continue").addEventListener("click", closeCartDrawer);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeCartDrawer(); });

  drawer.addEventListener("click", (e) => {
    const up = e.target.closest("[data-qty-up]");
    const down = e.target.closest("[data-qty-down]");
    const remove = e.target.closest("[data-remove]");
    if (up) {
      const cart = getCart();
      const item = cart.find((i) => i.id === up.dataset.qtyUp);
      if (item) updateCartQty(item.id, item.qty + 1);
      renderCartDrawerContents();
    } else if (down) {
      const cart = getCart();
      const item = cart.find((i) => i.id === down.dataset.qtyDown);
      if (item) updateCartQty(item.id, item.qty - 1);
      renderCartDrawerContents();
    } else if (remove) {
      removeFromCart(remove.dataset.remove);
      renderCartDrawerContents();
    }
  });

  document.querySelectorAll(".cart-link").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      openCartDrawer();
    });
  });
}

/* ---------- Quick-add nos cards de produto ----------
   Delegação de evento pra pegar os botões "+" que o catalog.js gera
   dentro dos cards, sem precisar religar nada a cada renderProductGrid. */
function wireQuickAdd() {
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".quick-add");
    if (!btn) return;
    e.preventDefault();
    const id = btn.dataset.addId;
    addToCart(id, 1);
    btn.classList.add("added");
    btn.textContent = "✓";
    setTimeout(() => {
      btn.classList.remove("added");
      btn.textContent = "+";
    }, 900);
    openCartDrawer();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartBadge();
  injectCartDrawer();
  wireQuickAdd();
});
