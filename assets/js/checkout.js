/* Checkout — dispara pro Cloudflare Worker (checkout-worker.js), que

   cria a preferência no Mercado Pago Checkout Pro usando o Access
   Token secreto (nunca exposto aqui no front-end).

   Também coleta os dados de entrega (nome, telefone, CPF, endereço)
   ANTES de mandar pro Mercado Pago — sem isso não dá pra montar o
   pedido de verdade no fornecedor depois que o pagamento é aprovado. */

// TROCAR pela URL real do Worker depois do deploy na Cloudflare
// (ex.: https://achadinhos-checkout.SEU-SUBDOMINIO.workers.dev)
const CHECKOUT_WORKER_URL = "https://achadinhos-checkout.comercial-0a2.workers.dev";

/* ---------- Cupom de boas-vindas ----------
   Desconto simples aplicado no carrinho, sem backend — por isso não dá
   pra garantir de verdade "só na 1ª compra" (qualquer um pode usar mais
   de uma vez). Por honestidade, o cupom é chamado só de "boas-vindas" no
   site, nunca de "exclusivo pra quem nunca comprou". */
const COUPONS = { BEMVINDO10: 0.1 };
const CUPOM_KEY = "achadinhos_cupom";

function getCupomAplicado() {
  try {
    const c = JSON.parse(sessionStorage.getItem(CUPOM_KEY));
    if (c && COUPONS[c.code] === c.pct) return c;
  } catch (e) {
    // sessionStorage indisponível ou dado corrompido: segue sem cupom.
  }
  return null;
}

function aplicarCupom(codigoRaw) {
  const codigo = String(codigoRaw || "").trim().toUpperCase();
  if (!codigo) return { ok: false, msg: "Digite um código de cupom." };
  const pct = COUPONS[codigo];
  if (!pct) return { ok: false, msg: "Cupom inválido ou expirado." };
  sessionStorage.setItem(CUPOM_KEY, JSON.stringify({ code: codigo, pct }));
  return { ok: true, pct };
}

function validarCPF(cpfRaw) {
  const cpf = String(cpfRaw || "").replace(/\D/g, "");
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
  let soma = 0;
  for (let i = 0; i < 9; i++) soma += parseInt(cpf[i], 10) * (10 - i);
  let resto = (soma * 10) % 11;
  if (resto === 10) resto = 0;
  if (resto !== parseInt(cpf[9], 10)) return false;
  soma = 0;
  for (let i = 0; i < 10; i++) soma += parseInt(cpf[i], 10) * (11 - i);
  resto = (soma * 10) % 11;
  if (resto === 10) resto = 0;
  return resto === parseInt(cpf[10], 10);
}

function coletarDadosEntrega() {
  const val = (id) => (document.getElementById(id)?.value || "").trim();
  const dados = {
    nome: val("cli-nome"),
    telefone: val("cli-telefone"),
    cpf: val("cli-cpf"),
    cep: val("cli-cep"),
    endereco: val("cli-endereco"),
    numero: val("cli-numero"),
    complemento: val("cli-complemento"),
    bairro: val("cli-bairro"),
    cidade: val("cli-cidade"),
    estado: val("cli-estado").toUpperCase()
  };

  const erros = [];
  if (!dados.nome || dados.nome.length < 3) erros.push("nome completo");
  if (!dados.telefone || dados.telefone.replace(/\D/g, "").length < 10) erros.push("telefone/WhatsApp válido");
  if (!validarCPF(dados.cpf)) erros.push("CPF válido");
  if (!dados.cep || dados.cep.replace(/\D/g, "").length !== 8) erros.push("CEP válido");
  if (!dados.endereco) erros.push("endereço");
  if (!dados.numero) erros.push("número");
  if (!dados.bairro) erros.push("bairro");
  if (!dados.cidade) erros.push("cidade");
  if (!dados.estado || dados.estado.length !== 2) erros.push("estado (UF)");

  return { dados, erros };
}

/* =====================================================================
   FRETE — cotação no Melhor Envio (27/08/2026)
   Regra da casa: o frete é do cliente, a loja não paga frete. O carrinho
   cota de verdade pelo CEP antes de deixar finalizar a compra; sem opção
   escolhida o botão de pagamento não libera.
   A conta e o token do Melhor Envio ficam no Worker (secret da
   Cloudflare) — o navegador nunca vê token nenhum, só chama /frete.
   ===================================================================== */

const FRETE_STATE = { opcoes: [], escolhido: null, cepCotado: "" };

/* Monta UMA caixa pro pedido inteiro a partir das medidas de cada item
   (SHIPPING, em catalog.js): soma os pesos, usa o maior comprimento e a
   maior largura do conjunto e empilha as alturas. É a aproximação que a
   maioria das lojas usa — não é a caixa ótima, mas nunca cota a menos,
   que é o erro que custaria dinheiro. */
function montarPacote(cart) {
  let peso = 0, comprimento = 16, largura = 11, altura = 0;
  cart.forEach((i) => {
    const pk = typeof pacoteDoProduto === "function"
      ? pacoteDoProduto(i.id)
      : { peso: 0.3, comprimento: 16, largura: 11, altura: 2 };
    const q = Math.max(1, parseInt(i.qty, 10) || 1);
    peso += pk.peso * q;
    comprimento = Math.max(comprimento, pk.comprimento);
    largura = Math.max(largura, pk.largura);
    altura += pk.altura * q;
  });
  return {
    peso: Math.round(peso * 1000) / 1000,
    comprimento: Math.max(16, Math.round(comprimento)),
    largura: Math.max(11, Math.round(largura)),
    altura: Math.max(2, Math.round(altura))
  };
}

async function cotarFrete(cepBruto) {
  const cep = String(cepBruto || "").replace(/\D/g, "");
  const cart = getCart();
  if (cep.length !== 8) return { erro: "Digite um CEP com 8 números." };
  if (!cart.length) return { erro: "Seu carrinho está vazio." };

  const resp = await fetch(`${CHECKOUT_WORKER_URL}/frete`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cep, pacote: montarPacote(cart), valor: cartTotal() })
  });
  let data = {};
  try { data = await resp.json(); } catch (e) { data = {}; }
  if (!resp.ok) return { erro: data.error || "Não foi possível calcular o frete agora." };

  FRETE_STATE.opcoes = Array.isArray(data.opcoes) ? data.opcoes : [];
  FRETE_STATE.escolhido = null;
  FRETE_STATE.cepCotado = cep;
  return { opcoes: FRETE_STATE.opcoes };
}

function escolherFrete(id) {
  FRETE_STATE.escolhido = FRETE_STATE.opcoes.find((o) => String(o.id) === String(id)) || null;
  return FRETE_STATE.escolhido;
}

function freteEscolhido() {
  return FRETE_STATE.escolhido;
}

function limparFrete() {
  FRETE_STATE.opcoes = [];
  FRETE_STATE.escolhido = null;
  FRETE_STATE.cepCotado = "";
}

async function iniciarCheckout() {
  const cart = getCart();
  if (!cart.length) return;

  const { dados: customer, erros } = coletarDadosEntrega();
  const errorEl = document.getElementById("delivery-form-error");
  if (erros.length) {
    if (errorEl) {
      errorEl.style.display = "block";
      errorEl.textContent = `Confere esses campos antes de continuar: ${erros.join(", ")}.`;
      errorEl.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    return;
  }
  if (errorEl) errorEl.style.display = "none";

  const frete = freteEscolhido();
  if (!frete) {
    if (errorEl) {
      errorEl.style.display = "block";
      errorEl.textContent = "Calcule o frete pelo seu CEP e escolha uma opção de entrega antes de finalizar.";
      errorEl.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    return;
  }

  const cupom = getCupomAplicado();
  const desconto = cupom ? cupom.pct : 0;
  const items = cart
    .map((i) => {
      const p = getProductById(i.id);
      if (!p) return null;
      const precoComDesconto = desconto ? Math.round(p.price * (1 - desconto) * 100) / 100 : p.price;
      return {
        id: p.id,
        title: p.name,
        quantity: i.qty,
        unit_price: precoComDesconto
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
      body: JSON.stringify({ items, customer, frete: { nome: `${frete.empresa} ${frete.nome}`.trim(), preco: frete.preco } })
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
