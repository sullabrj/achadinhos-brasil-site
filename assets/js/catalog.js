/* ==================================================================
   ACHADINHOS BRASIL — catálogo (modelo "Oferta Relâmpago")
   -----------------------------------------------------------------
   Catálogo atualizado em 12/08/2026 (base) e 20/08/2026 (p10 e p11,
   reforço pontual de Infantil/Joias) com produtos reais filtrados no
   painel da Dropi (marketplace nacional, filtro "Mais Vistos Mês"),
   um a dois por categoria principal da loja. Preço, desconto (quando
   existe de verdade no fornecedor) e estoque são os valores reais
   informados pelo fornecedor no momento da curadoria — nunca
   inventados. Como o estoque de fornecedor de dropshipping não
   decresce no mesmo ritmo de uma loja com estoque próprio, o rótulo
   "Só X em estoque!" só aparece quando o número já é baixo por si só
   (ver isLowStock), evitando gatilho de urgência falso.
   ===================================================================== */

const PRODUCTS = [
  {
    id: "p1",
    name: "Kit Banheiro Lavabo 4 Peças Resistente e Moderno",
    category: "casa",
    categoryLabel: "Casa e Decoração",
    price: 87.5,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-1768713762696c6e22a08f9.jpg",
    emoji: "🧼",
    stock: 14,
    stockMax: 14,
    description: "Kit lavabo com 4 peças resistentes: saboneteira líquida, potes organizadores e lixeira, acabamento moderno pra combinar com qualquer banheiro."
  },
  {
    id: "p2",
    name: "Cortina de Pia Cozinha 100% PVC Impermeável",
    category: "casa",
    categoryLabel: "Casa e Decoração",
    price: 12.53,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-17210832876695a59701832.jpg",
    emoji: "🪟",
    stock: 1978,
    stockMax: 1978,
    description: "Cortina para pia de cozinha 100% PVC, impermeável — protege o gabinete embaixo da pia contra umidade, respingos e mofo."
  },
  {
    id: "p3",
    name: "Calça Legging Fitness Poliamida Suplex",
    category: "moda",
    categoryLabel: "Moda e Vestuário",
    price: 29.9,
    oldPrice: 69.9,
    image: "https://dropi.xpto.app/dropi/fornecedor/produto-17819637676a369bf7e2729.png",
    emoji: "🏃‍♀️",
    stock: 5026,
    stockMax: 5026,
    description: "Calça legging fitness em poliamida suplex, tecido colorido de alta compressão, sem transparência — ideal pro treino."
  },
  {
    id: "p4",
    name: "Calça Legging Cintura Alta Cinza Mesclado",
    category: "moda",
    categoryLabel: "Moda e Vestuário",
    price: 29.9,
    oldPrice: 59.9,
    image: "https://dropi.xpto.app/dropi/fornecedor/produto-17809326686a26e03c82e13.jpg",
    emoji: "👖",
    stock: 6057,
    stockMax: 6057,
    description: "Calça legging cintura alta, cinza mesclado, sem transparência — conforto pro dia a dia ou pra malhar."
  },
  {
    id: "p5",
    name: "Truss Shampoo Equilibrium Scalp 300ml",
    category: "beleza",
    categoryLabel: "Saúde e Beleza",
    price: 49.6,
    oldPrice: 79.99,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-175440215968920d6f709e8.png",
    emoji: "🧴",
    stock: 50,
    stockMax: 50,
    description: "Shampoo profissional Truss Equilibrium Scalp 300ml, equilibra a oleosidade do couro cabeludo e prepara pro tratamento."
  },
  {
    id: "p6",
    name: "Truss Óleo Nutri Infusion 60ml",
    category: "beleza",
    categoryLabel: "Saúde e Beleza",
    price: 56.07,
    oldPrice: 69.99,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-17526736546877ad767e93e.webp",
    emoji: "💧",
    stock: 20,
    stockMax: 20,
    description: "Óleo capilar Truss Nutri Infusion 60ml, finalizador nutritivo que dá brilho e reduz o frizz sem pesar no cabelo."
  },
  {
    id: "p7",
    name: "Cama Pet Atacadão Impermeável Média",
    category: "pet",
    categoryLabel: "Pet Shop",
    price: 31.0,
    oldPrice: null,
    image: "https://dropi.xpto.app/dropi/fornecedor/produto-17846980936a6054eded393.jpg",
    emoji: "🐾",
    stock: 993,
    stockMax: 993,
    description: "Cama pet impermeável tamanho médio, forro removível e lavável — conforto pro seu cão ou gato descansar."
  },
  {
    id: "p8",
    name: "Sapatilha Infantil StarPink Cristal Branco",
    category: "infantil",
    categoryLabel: "Infantil e Brinquedos",
    price: 65.9,
    oldPrice: null,
    image: "https://dropi.xpto.app/dropi/fornecedor/produto-17851772456a67a49de41eb.jpg",
    emoji: "🩰",
    stock: 62,
    stockMax: 62,
    description: "Sapatilha infantil StarPink com aplique de cristal, cabedal branco — ideal pro dia a dia ou ocasiões especiais."
  },
  {
    id: "p9",
    name: "Brinco Orgânico Banhado a Ouro 18K",
    category: "joias",
    categoryLabel: "Joias e Acessórios",
    price: 44.91,
    oldPrice: 49.9,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-177335414469b33ca0b0252.jpg",
    emoji: "💎",
    stock: 1,
    stockMax: 1,
    description: "Brinco orgânico banhado a ouro 18K, design minimalista com cristal — última peça em estoque no fornecedor."
  },
  {
    id: "p10",
    name: "Boneca Sparkle Party com Acessórios Surpresa",
    category: "infantil",
    categoryLabel: "Infantil e Brinquedos",
    price: 84.57,
    oldPrice: 85.35,
    image: "https://dropi.xpto.app/dropi/fornecedor/produto-17848410606a628364e3d6f.jpg",
    emoji: "🎀",
    stock: 2,
    stockMax: 2,
    description: "Boneca Sparkle Party com acessórios surpresa colecionáveis, glitter pra lábios e corpo — só 2 no estoque do fornecedor."
  },
  {
    id: "p11",
    name: "Trio de Brincos Argola Articulada Cravejada",
    category: "joias",
    categoryLabel: "Joias e Acessórios",
    price: 73.45,
    oldPrice: null,
    image: "https://dropi.xpto.app/dropi/fornecedor/produto-17848514566a62ac00a2ef8.jpg",
    emoji: "✨",
    stock: 1,
    stockMax: 1,
    description: "Trio de brincos argola articulada cravejada, banho de ródio — peça única no fornecedor, estilo statement pra usar em camadas."
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

function isLowStock(p) {
  // Só sinaliza urgência de estoque quando o número real já é baixo —
  // nunca em cima de uma fração inventada de um estoque de fornecedor grande.
  return p.stock <= 20;
}

function getProductById(id) {
  return PRODUCTS.find((p) => p.id === id);
}

function productThumbInner(p) {
  return p.image
    ? `<img src="${p.image}" alt="${p.name}" loading="lazy">`
    : `<span>${p.emoji}</span>`;
}

function productCardHTML(p) {
  const disc = discountPercent(p);
  const stockPct = stockPercent(p);
  const lowStock = isLowStock(p);
  return `
  <a class="product-card" href="produto.html?id=${p.id}">
    <div class="product-thumb">
      ${disc ? `<span class="badge-desconto">-${disc}%</span>` : ""}
      ${productThumbInner(p)}
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
