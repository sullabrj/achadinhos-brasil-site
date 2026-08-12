/* =====================================================================
   ACHADINHOS BRASIL — catálogo (modelo "Oferta Relâmpago")
   -----------------------------------------------------------------
   ATENÇÃO: os itens abaixo são AMOSTRA/placeholder (emoji no lugar de
   foto real, preço e estoque fictícios só pra estrutura funcionar).
   Antes de publicar de verdade: substituir por até ~8-12 itens reais
   (mais vendidos filtrados no painel da Dropi), com foto, preço e
   estoque VERDADEIROS — a regra da loja é nunca inventar estoque.
   ===================================================================== */

const PRODUCTS = [
  {
    id: "p1",
    name: "Conjunto de Potes Herméticos Organizadores (Kit 5un)",
    category: "casa",
    categoryLabel: "Casa e Decoração",
    price: 79.9,
    oldPrice: 129.9,
    emoji: "🥡",
    stock: 6,
    stockMax: 20,
    description: "Kit com 5 potes herméticos empilháveis, ideais para organizar a despensa e manter alimentos frescos por mais tempo."
  },
  {
    id: "p2",
    name: "Bolsa Transversal Feminina Couro Sintético",
    category: "moda",
    categoryLabel: "Moda e Vestuário",
    price: 89.9,
    oldPrice: 159.9,
    emoji: "👜",
    stock: 4,
    stockMax: 15,
    description: "Bolsa transversal compacta, alça ajustável, compartimento interno com zíper e bolso para celular."
  },
  {
    id: "p3",
    name: "Comedouro Duplo Inox Antiformiga para Pets",
    category: "pet",
    categoryLabel: "Pet Shop",
    price: 49.9,
    oldPrice: 84.9,
    emoji: "🐾",
    stock: 9,
    stockMax: 25,
    description: "Comedouro duplo em aço inox com base antiformiga, fácil de limpar, ideal para cães e gatos de pequeno/médio porte."
  },
  {
    id: "p4",
    name: "Kit Batom Matte + Base Líquida Cobertura Alta",
    category: "beleza",
    categoryLabel: "Saúde e Beleza",
    price: 39.9,
    oldPrice: 69.9,
    emoji: "💄",
    stock: 3,
    stockMax: 18,
    description: "Kit com batom matte longa duração e base líquida de cobertura alta, acabamento natural."
  }
];

const CATEGORIES = [
  { key: "casa", label: "Casa e Decoração" },
  { key: "moda", label: "Moda e Vestuário" },
  { key: "pet", label: "Pet Shop" },
  { key: "beleza", label: "Saúde e Beleza" },
  { key: "joias", label: "Joias e Acessórios" },
  { key: "infantil", label: "Infantil e Brinquedos" }
];

function formatBRL(value) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function discountPercent(p) {
  if (!p.oldPrice) return null;
  return Math.round((1 - p.price / p.oldPrice) * 100);
}

function stockPercent(p) {
  return Math.max(6, Math.min(100, Math.round((p.stock / p.stockMax) * 100)));
}

function getProductById(id) {
  return PRODUCTS.find((p) => p.id === id);
}

function productCardHTML(p) {
  const disc = discountPercent(p);
  const stockPct = stockPercent(p);
  const lowStock = p.stock <= Math.max(3, Math.round(p.stockMax * 0.25));
  return `
  <a class="product-card" href="produto.html?id=${p.id}">
    <div class="product-thumb">
      ${disc ? `<span class="badge-desconto">-${disc}%</span>` : ""}
      <span>${p.emoji}</span>
    </div>
    <div class="product-info">
      <span class="product-cat">${p.categoryLabel}</span>
      <span class="product-name">${p.name}</span>
      <div class="price-row">
        ${p.oldPrice ? `<span class="price-old">${formatBRL(p.oldPrice)}</span>` : ""}
        <span class="price-new">${formatBRL(p.price)}</span>
      </div>
      <div class="stock-wrap">
        <div class="stock-label">${lowStock ? `Só ${p.stock} em estoque!` : `${p.stock} disponíveis`}</div>
        <div class="stock-bar"><div class="stock-bar-fill" style="width:${stockPct}%"></div></div>
      </div>
    </div>
  </a>`;
}

function renderProductGrid(containerEl, products) {
  if (!products.length) {
    containerEl.innerHTML = `<div class="empty-state">Nenhum produto encontrado nessa categoria.</div>`;
    return;
  }
  containerEl.innerHTML = products.map(productCardHTML).join("");
}

/* ---------- Contador regressivo da Oferta Relâmpago ----------
   Guarda o horário-alvo no sessionStorage pra não "resetar" o
   contador toda vez que o cliente troca de página durante a visita.
   Duração padrão: 3 horas a partir da primeira visita da sessão. */
function initCountdown(elId, hours = 3) {
  const el = document.getElementById(elId);
  if (!el) return;

  const STORAGE_KEY = "achadinhos_flash_deadline";
  let deadline = sessionStorage.getItem(STORAGE_KEY);
  if (!deadline) {
    deadline = Date.now() + hours * 60 * 60 * 1000;
    sessionStorage.setItem(STORAGE_KEY, deadline);
  } else {
    deadline = Number(deadline);
  }

  function tick() {
    const diff = deadline - Date.now();
    if (diff <= 0) {
      // Oferta "renova" pra manter o gatilho de urgência ativo.
      sessionStorage.removeItem(STORAGE_KEY);
      return initCountdown(elId, hours);
    }
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    el.innerHTML = `
      <div class="box"><b>${String(h).padStart(2, "0")}</b><span>Horas</span></div>
      <div class="box"><b>${String(m).padStart(2, "0")}</b><span>Min</span></div>
      <div class="box"><b>${String(s).padStart(2, "0")}</b><span>Seg</span></div>
    `;
  }
  tick();
  setInterval(tick, 1000);
}

function renderCategoryPills(containerEl, activeKey) {
  containerEl.innerHTML = CATEGORIES.map(
    (c) => `<a class="cat-pill ${c.key === activeKey ? "active" : ""}" href="categoria.html?cat=${c.key}">${c.label}</a>`
  ).join("");
}
