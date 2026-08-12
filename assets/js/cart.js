/* Carrinho — 100% no navegador (localStorage). Nenhum dado sai daqui
   até o cliente clicar em "Finalizar compra" (aí sim vai pro Worker). */

const CART_KEY = "achadinhos_cart";

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch (e) {
    return [];
  }
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
}

document.addEventListener("DOMContentLoaded", updateCartBadge);
