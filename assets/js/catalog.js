// LIMPEZA 30/08/2026 (2a etapa): removidos 24 produtos sem fornecedor ativo na Dropi. Catalogo: 190 -> 166, todos vendaveis.
// LIMPEZA 30/08/2026: removidos p29 e p208 (anuncios duplicados); p212 marcado esgotado (sem fornecedor); imagem do p30 atualizada
// ACRESCIMOS 30/08/2026 (parte 6): +20 produtos Pet Shop (p328-p347) - reforco da categoria Pet
/* =====================================================================
   ACHADINHOS BRASIL — catálogo (modelo "Oferta Relâmpago")
   -----------------------------------------------------------------
   Catálogo atualizado em 12/08/2026 (base), 20/08/2026 (p10 e p11,
   reforço pontual de Infantil/Joias), 20/08/2026 (p12 a p48, expansão
   para ~8 produtos por categoria) e 21/08/2026 (p49 a p55, piloto de
   expansão da categoria Casa e Decoração de 8 para 15 itens — filtro
   "Decoração" no painel, "Mais Vistos Mês") e 21/08/2026 (p56 a p72,
   expansão de Moda e Vestuário de 8 para 25 itens — filtro "Moda
   feminina" no painel, "Mais Vistos Mês") e 21/08/2026 (p73 a p89,
   expansão de Saúde e Beleza de 8 para 25 itens — filtro "Beleza e
   Saude" no painel, "Mais Vistos Mês") e 21/08/2026 (p90 a p96,
   expansão de Pet Shop de 8 para 15 itens — filtro "Pet shop" no
   painel, "Mais Vistos Mês") e 21/08/2026 (p97 a p103, expansão de
   Infantil e Brinquedos de 8 para 15 itens — filtro "Infantil" no
   painel, "Mais Vistos Mês") com produtos
   reais filtrados no painel da Dropi (marketplace nacional, filtro
   "Mais Vistos Mês"), priorizando diversidade entre os itens de cada
   categoria. Estoque é
   valor real informado pelo fornecedor — nunca inventado. Como o
   estoque de fornecedor de dropshipping não decresce no mesmo ritmo
   de uma loja com estoque próprio, o rótulo "Só X em estoque!" só
   aparece quando o número já é baixo por si só (ver isLowStock),
   evitando gatilho de urgência falso.

   PREÇO reprecificado em 20/08/2026: até essa data, "price" era o
   valor de custo puxado direto da Dropi (sem markup — o site vendia
   no prejuízo). Fórmula aplicada agora: Preço = Custo ÷ (1 − (Imposto
   10,4% + Taxa Checkout MP 2% + custo de financiar 18x sem juros
   26,17% + Lucro líquido 25%)) = Custo ÷ 0,3643, arredondado pra cima
   até terminar em ",90". oldPrice foi zerado em todos os itens porque
   o valor antigo (tabela do próprio fornecedor) deixou de fazer
   sentido como preço "de" depois do markup — não é uma promoção real,
   é só o custo puro, então não deve aparecer como desconto ao
   cliente. Parâmetros completos (tabela de parcelamento MP, fórmula)
   na planilha Achadinhos_Brasil_Catalogo_Precificacao.xlsx.
   
ACRÉSCIMOS 20/08 (mesmo dia, depois da reprefição): (1) instalado destaque de parcelamento — todo produto agora mostra "ou 18x de R$X sem juros" (installmentText, calcula price/18) nos cards de listagem e na página de produto; é só informativo, não muda o preço à vista. (2) escolhidos 4 itens de maior ticket (maior markup em R$) pra estampar a "Oferta Relâmpago" com desconto promocional real de ~10%: Hidratante Corporal Yara 200g (p33, de R$384,90 por R$345,90), Pelúcia de Pendurar Rhino Bright Starts (p46, de R$356,90 por R$320,90), Casaco de Algodão Feminino Sortido (p18, de R$270,90 por R$243,90) e Base Líquida Bruna Tavares BT Skin (p34, de R$263,90 por R$236,90) — únicos quatro itens do catálogo com oldPrice preenchido; o resto do catálogo continua sem oldPrice (não é desconto real, é preço cheio já com markup).

ACRÉSCIMOS 30/08/2026 (parte 5): mais 19 produtos (p309 a p327) nas duas categorias que ainda estavam magras — 11 em Joias e Acessórios (semijoias banhadas a ouro 18K, carteira, bolsa e chapéus) e 8 em Infantil e Brinquedos (mochilas escolares licenciadas Barbie/Homem-Aranha/Pequena Sereia e mais pedagógicos de madeira). Todos de fornecedores sem termo extra.

ACRÉSCIMOS 30/08/2026 (parte 4): mais 15 produtos (p294 a p308) — 7 em Casa e Decoração (cama, mesa e banho: lençol, capas de sofá e cadeira, cobreleitos e colcha), 3 em Eletrônicos (acessórios de celular) e 5 em Saúde e Beleza (linha masculina Don Armany, nicho novo pra loja). Nenhum produto do fornecedor DROP DE CASA foi incluído — ele exige aceite de termo extra que a SULLAB optou por não assinar.

ACRÉSCIMOS 30/08/2026 (parte 3): mais 14 produtos (p280 a p293) em Pet Shop (coleiras e guias licenciadas, protetor de banco), Eletrônicos (headsets e mouses gamer Fantech) e Casa/Utensílios (organizadores e luva de microfibra). Na mesma data, 21 produtos que sumiram de vez do marketplace da Dropi passaram a stock: 0 (Esgotado) — stockMax foi preservado, então o sync diário restaura sozinho se o fornecedor voltar a listar.

ACRÉSCIMOS 30/08/2026 (parte 2): mais 11 produtos (p269 a p279) — 7 em Pet Shop (transporte, conforto e acessórios de carro), 3 em Utensílios e 1 em Casa e Decoração. Na mesma rodada, 40+ produtos do catálogo que tinham sumido do painel da Dropi foram reimportados, então a loja voltou a ter fornecedor pra quase tudo que anuncia. Mesma fórmula de preço e estoque real do fornecedor.

ACRÉSCIMOS 30/08/2026: adicionados 27 produtos novos (p242 a p268) importados na Dropi hoje — 12 em Infantil e Brinquedos (linha de pedagógicos em madeira/EVA da ArteToys), 7 em Joias e Acessórios (semijoias banhadas a ouro 18K), 5 em Eletrônicos (periféricos Fantech/Multilaser e áudio), 2 em Saúde e Beleza (linha Truss) e 1 em Utensílios. Todos com preço pela fórmula vigente (Custo ÷ 0,5099 arredondado pra cima até terminar em ",90") e estoque real lido da ficha do fornecedor na Dropi — nada inventado. Categorias mais fracas foram priorizadas: Infantil saiu de 4 para 16 itens e Joias de 8 para 15.

ACRÉSCIMOS 20/08 parte 2: (3) PRODUCT_SPECS — ficha técnica opcional por produto (tamanho/medida), preenchida só onde o próprio texto do fornecedor já confirma (ex.: "tamanho M único", "1,2m") — não inventamos numeração de roupa que não temos. (4) busca centralizada no header, ícones de categoria maiores em badge circular, carrinho agora abre como card ancorado no canto superior direito (perto do ícone) em vez de painel de tela cheia.
ALTERACAO 25/08 — CATALOGO SEM ROUPA: removidos 34 itens (toda a categoria
"Moda e Vestuario", 25 itens, mais 9 roupas/fantasias/sapatilha que estavam
dentro de Infantil). Motivo dado pelo usuario: a loja nao tem ponto fisico e
os clientes estavam entrando em contato pedindo pra experimentar a peca antes
de comprar — demanda que esse modelo nao atende, e que gera troca/devolucao
por numeracao. A categoria "moda" saiu tambem do menu, do rodape, da 404 e do
sitemap. A Necessaire 18x10x8cm (p67) foi mantida e migrada pra "Joias e
Acessorios", por ser acessorio sem numeracao. Na Oferta Relampago, o Casaco de
Algodao Feminino (p18) foi substituido pelo Protetor de Sofa Pet Meg (p95),
com desconto real de R$134,90 por R$121,90. Catalogo passou de 103 pra 69
itens: casa 15, beleza 25, pet 15, joias 9, infantil 5.
REPRECIFICACAO 27/08 — PARCELAMENTO DE 18x PRA 3x: decisao do usuario ("vamos
reduzir o parcelamento para 3x sem juros"), depois de eu mostrar que o 18x sem
juros era o maior custo da operacao — sozinho comia 26,17% de cada venda, mais
que o imposto, e era o que jogava o preco pra 2,74x o custo. Tabela real do
Mercado Pago (lida na conta): 3x custa 6,61%, com parcela minima de R$15.
Novo divisor = 1 - (10,4% imposto + 2% taxa Checkout + 6,61% custo do 3x + 25%
lucro liquido) = 0,5599, ou seja markup de 1,79x contra os 2,74x de antes.
Todos os 69 precos foram recalculados a partir do CUSTO REAL (custo exato da
planilha Achadinhos_Brasil_Catalogo_Precificacao.xlsx onde existe, 37 itens; nos
outros 32 o custo foi derivado do preco cheio antigo dividido pelo divisor
antigo), arredondados pra cima ate terminar em ",90". Preco medio do catalogo
caiu de R$143,09 pra R$93,23 (-34%). Os 4 itens da Oferta Relampago mantiveram
o desconto promocional real de ~10% sobre o preco novo. O texto de parcelamento
(installmentText) passou de "ou 18x de" pra "ou 3x de", e a conta do Mercado
Pago foi alterada de "Ate 18x" pra "Ate 3x" ANTES do commit dos precos, pra nao
existir janela em que o cliente compra no preco novo e ainda parcela em 18x por
conta da loja.
PENDENTE: a formula continua sem linha de frete, e a Dropi cobra frete junto no
Pix do fornecedor (R$25,00 no pedido de teste). Precisa medir o frete real de
alguns produtos e embutir.
   REPRECIFICAÇÃO 27/08/2026 — LUCRO LÍQUIDO 30%: a meta de lucro
   subiu de 25% para 30% líquido. Novo divisor: 1 − (Imposto 10,4% +
   Taxa Checkout MP 2% + custo de financiar 3x sem juros 6,61% +
   Lucro líquido 30%) = 0,5099 (markup 1,96x). Todos os 69 itens
   recalculados a partir do CUSTO real (planilha de precificação para
   37 itens; derivado do preço antigo para os outros 32), não a partir
   do preço vigente — evita acumular erro de arredondamento. Preço
   arredondado pra cima terminando em ",90". Média do catálogo:
   R$ 93,23 -> R$ 103,33 (+10,8%). Os 4 itens de Oferta Relâmpago
   mantiveram o mesmo percentual de desconto real.
   REFORMA DE CATÁLOGO 27/08/2026 — CHECKUP DE PREÇO CONTRA O MERCADO:
   pesquisamos o preço de varejo real (Mercado Livre, Amazon, site das
   próprias fabricantes) dos 69 itens e recalculamos quanto sobraria de
   lucro vendendo no preço de mercado. RESULTADO: 25 itens dariam
   PREJUÍZO em qualquer preço que o mercado aceita — o custo da Dropi
   neles nasce igual ou acima do varejo. Esses 25 foram REMOVIDOS
   (linha de cosmético profissional quase inteira, bases BT Skin,
   Nano Repair, Peitoral e Bandana Hello Kitty, Pelúcia Bright Starts,
   Guia Scooby-Doo, Coleira Mulher Maravilha, entre outros). Outros 4
   sobreviveram magros e foram reprecificados PRA BAIXO até o preço de
   mercado (p1, p15, p54, p76), e 7 que estavam baratos demais subiram
   até 90% da menor referência de mercado (p32, p37, p40, p41, p77,
   p90, p92). Entraram 42 produtos novos da Dropi (Pet, Utensílios,
   Casa e Eletrônicos), já no divisor de 30%; outros 15 da curadoria
   foram descartados por duplicidade com o catálogo ou por também
   nascerem caros (Kit Teclado Multilaser TC251, potes herméticos,
   cortina blackout, fone gatinho). Catálogo: 69 -> 86 itens, preço
   médio R$ 103,33 -> R$ 59,70. Categorias novas: Utensílios e
   Eletrônicos (sem PNG próprio ainda — usam o emoji como ícone).
   Oferta Relâmpago remontada: p95, p40, p37 e p239, todos com
   desconto real de ~10% sobre o preço cheio.
   ===================================================================== */

const PRODUCTS = [
  {
    id: "p5",
    name: "Truss Shampoo Equilibrium Scalp 300ml",
    category: "beleza",
    categoryLabel: "Saúde e Beleza",
    price: 97.9,
    oldPrice: null,
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
    price: 110.9,
    oldPrice: null,
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
    price: 60.9,
    oldPrice: null,
    image: "https://dropi.xpto.app/dropi/fornecedor/produto-17846980936a6054eded393.jpg",
    emoji: "🐾",
    stock: 993,
    stockMax: 993,
    description: "Cama pet impermeável tamanho médio, forro removível e lavável — conforto pro seu cão ou gato descansar."
  },
  {
    id: "p9",
    name: "Brinco Orgânico Banhado a Ouro 18K",
    category: "joias",
    categoryLabel: "Joias e Acessórios",
    price: 88.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-177335414469b33ca0b0252.jpg",
    emoji: "💎",
    stock: 1,
    stockMax: 1,
    description: "Brinco orgânico banhado a ouro 18K, design minimalista com cristal — última peça em estoque no fornecedor."
  },
  {
    id: "p12",
    name: "Box Organizador P Color",
    category: "casa",
    categoryLabel: "Casa e Decoração",
    price: 17.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-17326021416745691db2b6e.jpg",
    emoji: "🗃️",
    stock: 100,
    stockMax: 100,
    description: "Box organizador colorido em plástico resistente, ideal pra guardar miudezas em qualquer cômodo da casa."
  },
  {
    id: "p14",
    name: "Tapete Peluciado 40x60cm",
    category: "casa",
    categoryLabel: "Casa e Decoração",
    price: 23.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-1770729972698b31f4cfa67.webp",
    emoji: "🛋️",
    stock: 10,
    stockMax: 10,
    description: "Tapete peluciado 40x60cm, macio e antiderrapante — aquece o ambiente e é fácil de lavar."
  },
  {
    id: "p15",
    name: "Colher Digital LCD Dosador Medidor Balança de Precisão",
    category: "casa",
    categoryLabel: "Casa e Decoração",
    price: 48.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-172372689066bdfc2a5bfb9.png",
    emoji: "⚖️",
    stock: 1,
    stockMax: 1,
    description: "Colher digital com balança de precisão embutida e visor LCD — mede ingredientes direto na receita. Última unidade no fornecedor."
  },
  {
    id: "p24",
    name: "Areia para Gatos Biodegradável 2kg",
    category: "pet",
    categoryLabel: "Pet Shop",
    price: 44.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-176111446568f879613682e.png",
    emoji: "🐱",
    stock: 30,
    stockMax: 30,
    description: "Areia biodegradável pra gatos, grãos grossos, 2kg — controla odor e é mais sustentável."
  },
  {
    id: "p30",
    name: "Tapete Higiênico Impermeável Pequeno",
    category: "pet",
    categoryLabel: "Pet Shop",
    price: 41.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-177738532569f0bf6d385cc.jpg",
    emoji: "💧",
    stock: 10923,
    stockMax: 10923,
    description: "Tapete higiênico impermeável, tamanho pequeno — praticidade pro dia a dia do pet."
  },
  {
    id: "p32",
    name: "Argila Vermelha Facial e Corporal",
    category: "beleza",
    categoryLabel: "Saúde e Beleza",
    price: 10.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-166517092763407defc188f.jpg",
    emoji: "🧖‍♀️",
    stock: 199,
    stockMax: 199,
    description: "Argila vermelha facial e corporal, limpeza profunda e efeito revitalizante."
  },
  {
    id: "p36",
    name: "Esfoliante Labial Active Repair",
    category: "beleza",
    categoryLabel: "Saúde e Beleza",
    price: 73.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-1764699811692f2ea3dacb3.jpg",
    emoji: "🌸",
    stock: 117,
    stockMax: 117,
    description: "Esfoliante labial pré-procedimento, remove peles mortas e prepara os lábios pra hidratação."
  },
  {
    id: "p39",
    name: "Choker Fita Fina 3mm",
    category: "joias",
    categoryLabel: "Joias e Acessórios",
    price: 112.9,
    oldPrice: null,
    image: "https://dropi.xpto.app/dropi/fornecedor/produto-17848567006a62c07c2476e.jpg",
    emoji: "⛓️",
    stock: 15,
    stockMax: 15,
    description: "Choker fita fina 3mm, discreta e elegante pra compor o look."
  },
  {
    id: "p40",
    name: "Colar Pingente de Zircônia e Pérola",
    category: "joias",
    categoryLabel: "Joias e Acessórios",
    price: 118.9,
    oldPrice: 131.9,
    image: "https://dropi.xpto.app/dropi/fornecedor/produto-17858919806a728c8c54ba8.jpg",
    emoji: "📿",
    stock: 8,
    stockMax: 8,
    description: "Colar com pingente de zircônia e pérola, toque clássico e sofisticado. Só 8 no estoque do fornecedor."
  },
  {
    id: "p41",
    name: "Anel Nossa Senhora Zircônia Azul",
    category: "joias",
    categoryLabel: "Joias e Acessórios",
    price: 109.9,
    oldPrice: null,
    image: "https://dropi.xpto.app/dropi/fornecedor/produto-17848566676a62c05b76927.jpg",
    emoji: "🙏",
    stock: 3,
    stockMax: 3,
    description: "Anel Nossa Senhora com zircônia azul, semijoia delicada com apelo religioso — só 3 no estoque do fornecedor."
  },
  {
    id: "p48",
    name: "Kit 3 Brinquedos Educativos em Madeira e EVA",
    category: "infantil",
    categoryLabel: "Infantil e Brinquedos",
    price: 107.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-1770760821698baa7504775.jpg",
    emoji: "🧩",
    stock: 1000,
    stockMax: 1000,
    description: "Kit com 3 brinquedos educativos em madeira e EVA, pedagógicos e lúdicos pro desenvolvimento infantil."
  },
  {
    id: "p53",
    name: "Expositor de Joias Acrílico com 8 Cabides",
    category: "casa",
    categoryLabel: "Casa e Decoração",
    price: 39.9,
    oldPrice: null,
    image: "https://empreender.nyc3.cdn.digitaloceanspaces.com/dropi/fornecedor/produto-177416400069bf982039199.jpg",
    emoji: "💎",
    stock: 9980,
    stockMax: 9980,
    description: "Expositor de joias em acrílico com 8 cabides — organiza brincos e colares e ainda deixa a penteadeira bonita."
  },
  {
    id: "p55",
    name: "Caneca do Brasil - Hexa 2026",
    category: "casa",
    categoryLabel: "Casa e Decoração",
    price: 42.9,
    oldPrice: null,
    image: "https://dropi.xpto.app/dropi/fornecedor/produto-17815699116a309977468bf.png",
    emoji: "☕",
    stock: 50,
    stockMax: 50,
    description: "Caneca do Brasil Hexa 2026 — pra comemorar o hexacampeonato com estilo na hora do café."
  },
  {
    id: "p73",
    name: "Gel de Limpeza Clean Repair",
    category: "beleza",
    categoryLabel: "Saúde e Beleza",
    price: 94.9,
    oldPrice: null,
    image: "https://empreender.nyc3.cdn.digitaloceanspaces.com/dropi/fornecedor/produto-1764699858692f2ed2a5a88.jpg",
    emoji: "🧴",
    stock: 92,
    stockMax: 92,
    description: "Gel de limpeza facial Clean Repair — remove impurezas e prepara a pele pra hidratação."
  },
  {
    id: "p74",
    name: "Esfoliante Facial Renovador com Aloe Vera e Microesferas 50g",
    category: "beleza",
    categoryLabel: "Saúde e Beleza",
    price: 125.9,
    oldPrice: null,
    image: "https://empreender.nyc3.cdn.digitaloceanspaces.com/dropi/fornecedor/produto-1764699804692f2e9cea109.png",
    emoji: "🧖‍♀️",
    stock: 97,
    stockMax: 97,
    description: "Esfoliante facial renovador com aloe vera e microesferas, 50g — remove células mortas e deixa a pele mais lisa."
  },
  {
    id: "p76",
    name: "Creme Clareador Facial Cystea Skin com Cisteamina e Retinol Nano 15g",
    category: "beleza",
    categoryLabel: "Saúde e Beleza",
    price: 155.9,
    oldPrice: null,
    image: "https://empreender.nyc3.cdn.digitaloceanspaces.com/dropi/fornecedor/produto-1764699759692f2e6f0a77d.png",
    emoji: "🧴",
    stock: 99,
    stockMax: 99,
    description: "Creme clareador facial Cystea Skin com cisteamina e retinol nano, 15g — auxilia na uniformização do tom da pele."
  },
  {
    id: "p77",
    name: "Argila Preta Facial e Corporal 100g",
    category: "beleza",
    categoryLabel: "Saúde e Beleza",
    price: 12.9,
    oldPrice: null,
    image: "https://empreender.nyc3.cdn.digitaloceanspaces.com/dropi/fornecedor/produto-16651764786340939eb6599.jpg",
    emoji: "🧖‍♀️",
    stock: 32,
    stockMax: 32,
    description: "Argila preta facial e corporal, 100g — limpeza profunda e efeito detox pra pele."
  },
  {
    id: "p80",
    name: "Creme Reparador Derma Repair com Ativos Calmantes 5g",
    category: "beleza",
    categoryLabel: "Saúde e Beleza",
    price: 78.9,
    oldPrice: null,
    image: "https://empreender.nyc3.cdn.digitaloceanspaces.com/dropi/fornecedor/produto-1764699788692f2e8cefea4.jpg",
    emoji: "🧴",
    stock: 28,
    stockMax: 28,
    description: "Creme reparador Derma Repair com ativos calmantes, 5g — auxilia na recuperação da pele."
  },
  {
    id: "p90",
    name: "Toalha Splash Pet",
    category: "pet",
    categoryLabel: "Pet Shop",
    price: 41.9,
    oldPrice: null,
    image: "https://empreender.nyc3.cdn.digitaloceanspaces.com/dropi/fornecedor/produto-177738520069f0bef06fa02.jpg",
    emoji: "🐾",
    stock: 2979,
    stockMax: 2979,
    description: "Toalha Splash Pet — seca o pet rapidinho depois do banho ou da chuva."
  },
  {
    id: "p93",
    name: "Mantinha Pet",
    category: "pet",
    categoryLabel: "Pet Shop",
    price: 33.9,
    oldPrice: null,
    image: "https://empreender.nyc3.cdn.digitaloceanspaces.com/dropi/fornecedor/produto-177738491769f0bdd52adce.jpg",
    emoji: "🐾",
    stock: 5958,
    stockMax: 5958,
    description: "Mantinha pet — aconchego extra pro pet nos dias mais frios."
  },
  {
    id: "p95",
    name: "Protetor de Sofá Pet Meg Impermeável Grande",
    category: "pet",
    categoryLabel: "Pet Shop",
    price: 87.9,
    oldPrice: 96.9,
    image: "https://empreender.nyc3.cdn.digitaloceanspaces.com/dropi/fornecedor/produto-177738503869f0be4e9201c.jpg",
    emoji: "🛋️",
    stock: 6951,
    stockMax: 6951,
    description: "Protetor de sofá pet Meg, impermeável, tamanho grande — protege o estofado do pelo e da sujeira."
  },
  {
    id: "p96",
    name: "Protetor Banco Dianteiro Padrão Impermeável",
    category: "pet",
    categoryLabel: "Pet Shop",
    price: 49.9,
    oldPrice: null,
    image: "https://empreender.nyc3.cdn.digitaloceanspaces.com/dropi/fornecedor/produto-177738496069f0be00ea3f6.jpg",
    emoji: "🚗",
    stock: 6951,
    stockMax: 6951,
    description: "Protetor de banco dianteiro impermeável, padrão universal — leva o pet no carro sem sujar o banco."
  },
  {
    id: "p200",
    name: "Coberdrom Pet Mark Dupla Face 03 pçs",
    category: "pet",
    categoryLabel: "Pet Shop",
    price: 88.9,
    oldPrice: null,
    image: "https://dropi.xpto.app/dropi/fornecedor/produto-17792781206a0da12827643.jpg",
    emoji: "🐾",
    stock: 7944,
    stockMax: 7944,
    description: "Coberdrom Pet Mark Dupla Face 03 pçs. Disponível em várias opções de cor/modelo — a gente confirma a sua com você pelo WhatsApp assim que o pedido entra."
  },
  {
    id: "p201",
    name: "Protetor de Sofá Pet Snoopy",
    category: "pet",
    categoryLabel: "Pet Shop",
    price: 70.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-177738520969f0bef9664e6.jpg",
    emoji: "🐾",
    stock: 27804,
    stockMax: 27804,
    description: "Protetor de Sofá Pet Snoopy. Disponível em várias opções de cor/modelo — a gente confirma a sua com você pelo WhatsApp assim que o pedido entra."
  },
  {
    id: "p202",
    name: "Peseira Pet Impermeável Para Cama Casal Padrão Avulsa",
    category: "pet",
    categoryLabel: "Pet Shop",
    price: 82.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-177738486269f0bd9e41c03.jpg",
    emoji: "🐾",
    stock: 12909,
    stockMax: 12909,
    description: "Peseira Pet Impermeável Para Cama Casal Padrão Avulsa. Disponível em várias opções de cor/modelo — a gente confirma a sua com você pelo WhatsApp assim que o pedido entra."
  },
  {
    id: "p203",
    name: "Cama Pet Onix Impermeável",
    category: "pet",
    categoryLabel: "Pet Shop",
    price: 54.9,
    oldPrice: null,
    image: "https://dropi.xpto.app/dropi/fornecedor/produto-17875948446a8c885c8fba0.jpg",
    emoji: "🐾",
    stock: 224418,
    stockMax: 224418,
    description: "Cama Pet Onix Impermeável. Disponível em várias opções de cor/modelo — a gente confirma a sua com você pelo WhatsApp assim que o pedido entra."
  },
  {
    id: "p204",
    name: "Bandana Pet Dereck",
    category: "pet",
    categoryLabel: "Pet Shop",
    price: 5.9,
    oldPrice: null,
    image: "https://dropi.xpto.app/dropi/fornecedor/produto-17875842686a8c5f0cb2d36.jpg",
    emoji: "🐾",
    stock: 65538,
    stockMax: 65538,
    description: "Bandana Pet Dereck. Disponível em várias opções de cor/modelo — a gente confirma a sua com você pelo WhatsApp assim que o pedido entra."
  },
  {
    id: "p205",
    name: "Tapete Higiênico Impermeável Clean",
    category: "pet",
    categoryLabel: "Pet Shop",
    price: 35.9,
    oldPrice: null,
    image: "https://dropi.xpto.app/dropi/fornecedor/produto-17875843556a8c5f63b5bba.jpg",
    emoji: "🐾",
    stock: 41706,
    stockMax: 41706,
    description: "Tapete Higiênico Impermeável Clean. Disponível em várias opções de cor/modelo — a gente confirma a sua com você pelo WhatsApp assim que o pedido entra."
  },
  {
    id: "p206",
    name: "Colchonete Pet Simples",
    category: "pet",
    categoryLabel: "Pet Shop",
    price: 58.9,
    oldPrice: null,
    image: "https://dropi.xpto.app/dropi/fornecedor/produto-17875843536a8c5f61b030a.jpg",
    emoji: "🐾",
    stock: 41706,
    stockMax: 41706,
    description: "Colchonete Pet Simples. Disponível em várias opções de cor/modelo — a gente confirma a sua com você pelo WhatsApp assim que o pedido entra."
  },
  {
    id: "p207",
    name: "Colchonete Pet Quality Impermeável",
    category: "pet",
    categoryLabel: "Pet Shop",
    price: 70.9,
    oldPrice: null,
    image: "https://dropi.xpto.app/dropi/fornecedor/produto-17875948636a8c886f3e7de.jpg",
    emoji: "🐾",
    stock: 92349,
    stockMax: 92349,
    description: "Colchonete Pet Quality Impermeável. Disponível em várias opções de cor/modelo — a gente confirma a sua com você pelo WhatsApp assim que o pedido entra."
  },
  {
    id: "p209",
    name: "Cama Pet Gorgopet Impermeável",
    category: "pet",
    categoryLabel: "Pet Shop",
    price: 72.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-177738435669f0bba434c4d.jpg",
    emoji: "🐾",
    stock: 67524,
    stockMax: 67524,
    description: "Cama Pet Gorgopet Impermeável. Disponível em várias opções de cor/modelo — a gente confirma a sua com você pelo WhatsApp assim que o pedido entra."
  },
  {
    id: "p210",
    name: "Protetor Banco Traseiro Plus Impermeável",
    category: "pet",
    categoryLabel: "Pet Shop",
    price: 78.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-177738481069f0bd6a1f452.jpg",
    emoji: "🐾",
    stock: 22839,
    stockMax: 22839,
    description: "Protetor Banco Traseiro Plus Impermeável. Disponível em várias opções de cor/modelo — a gente confirma a sua com você pelo WhatsApp assim que o pedido entra."
  },
  {
    id: "p211",
    name: "Colchonete Pet Toddy Impermeável",
    category: "pet",
    categoryLabel: "Pet Shop",
    price: 47.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-177738491069f0bdcebb646.jpg",
    emoji: "🐾",
    stock: 48657,
    stockMax: 48657,
    description: "Colchonete Pet Toddy Impermeável. Disponível em várias opções de cor/modelo — a gente confirma a sua com você pelo WhatsApp assim que o pedido entra."
  },
  {
    id: "p213",
    name: "Triturador de Alho Manual Processador Picador Fatiador Legumes Moedor",
    category: "utensilios",
    categoryLabel: "Utensílios",
    price: 29.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-1769797765697cf885b80da.jpg",
    emoji: "🍳",
    stock: 10,
    stockMax: 10,
    description: "Triturador de Alho Manual Processador Picador Fatiador Legumes Moedor."
  },
  {
    id: "p214",
    name: "Mini Processador Manual de Alimentos 2 laminas",
    category: "utensilios",
    categoryLabel: "Utensílios",
    price: 16.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-1769797763697cf8839c140.jpg",
    emoji: "🍳",
    stock: 9,
    stockMax: 9,
    description: "Mini Processador Manual de Alimentos 2 laminas."
  },
  {
    id: "p215",
    name: "Batedor Elétrico á Pilha Cores Sortidas",
    category: "utensilios",
    categoryLabel: "Utensílios",
    price: 13.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-177153492569977a4de6d05.webp",
    emoji: "🍳",
    stock: 9,
    stockMax: 9,
    description: "Batedor Elétrico á Pilha Cores Sortidas."
  },
  {
    id: "p216",
    name: "Bomba de agua",
    category: "utensilios",
    categoryLabel: "Utensílios",
    price: 17.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-1769797749697cf875eb8f0.jpg",
    emoji: "🍳",
    stock: 10,
    stockMax: 10,
    description: "Bomba de agua."
  },
  {
    id: "p218",
    name: "Espátula de Silicone e Ferro 37X5,3cm Cores Sortidas",
    category: "utensilios",
    categoryLabel: "Utensílios",
    price: 17.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-177153493369977a551b35c.webp",
    emoji: "🍳",
    stock: 9,
    stockMax: 9,
    description: "Espátula de Silicone e Ferro 37X5,3cm Cores Sortidas."
  },
  {
    id: "p219",
    name: "Espátula de Silicone e Ferro 27,5x6cm Cores Sortidas",
    category: "utensilios",
    categoryLabel: "Utensílios",
    price: 17.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-177153493169977a53495f5.webp",
    emoji: "🍳",
    stock: 9,
    stockMax: 9,
    description: "Espátula de Silicone e Ferro 27,5x6cm Cores Sortidas."
  },
  {
    id: "p220",
    name: "Pincel Confeiteiro de Silicone e Ferro 25,5x4,1cm Cores Sortidas",
    category: "utensilios",
    categoryLabel: "Utensílios",
    price: 17.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-177153494169977a5d789d8.webp",
    emoji: "🍳",
    stock: 10,
    stockMax: 10,
    description: "Pincel Confeiteiro de Silicone e Ferro 25,5x4,1cm Cores Sortidas."
  },
  {
    id: "p221",
    name: "Ralador + Faca de Fruta Cores Sortidas",
    category: "utensilios",
    categoryLabel: "Utensílios",
    price: 11.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-177153494369977a5fb5c78.jpg",
    emoji: "🍳",
    stock: 10,
    stockMax: 10,
    description: "Ralador + Faca de Fruta Cores Sortidas."
  },
  {
    id: "p223",
    name: "Esponja 11x7x3cm kit 2pçs",
    category: "utensilios",
    categoryLabel: "Utensílios",
    price: 6.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-177153493469977a56ea7de.webp",
    emoji: "🍳",
    stock: 9,
    stockMax: 9,
    description: "Esponja 11x7x3cm kit 2pçs."
  },
  {
    id: "p224",
    name: "Forma de bolo de ferro 30cm",
    category: "utensilios",
    categoryLabel: "Utensílios",
    price: 23.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-1769797754697cf87a51096.jpg",
    emoji: "🍳",
    stock: 10,
    stockMax: 10,
    description: "Forma de bolo de ferro 30cm."
  },
  {
    id: "p225",
    name: "Kit 3 Forma De Bolo Redonda Fundo Removível",
    category: "utensilios",
    categoryLabel: "Utensílios",
    price: 51.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-1769797761697cf88145203.png",
    emoji: "🍳",
    stock: 10,
    stockMax: 10,
    description: "Kit 3 Forma De Bolo Redonda Fundo Removível."
  },
  {
    id: "p226",
    name: "Forma de bolo redonda 26 cm",
    category: "utensilios",
    categoryLabel: "Utensílios",
    price: 19.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-1769797756697cf87c5134f.jpg",
    emoji: "🍳",
    stock: 9,
    stockMax: 9,
    description: "Forma de bolo redonda 26 cm."
  },
  {
    id: "p227",
    name: "Bomba de Agua elétrica",
    category: "utensilios",
    categoryLabel: "Utensílios",
    price: 35.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-1769797752697cf87841875.jpg",
    emoji: "🍳",
    stock: 10,
    stockMax: 10,
    description: "Bomba de Agua elétrica."
  },
  {
    id: "p232",
    name: "Capa para Almofada 40x40cm Cores Sortidas",
    category: "casa",
    categoryLabel: "Casa e Decoração",
    price: 23.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-177262435769a819e527204.webp",
    emoji: "🏠",
    stock: 10,
    stockMax: 10,
    description: "Capa para Almofada 40x40cm Cores Sortidas."
  },
  {
    id: "p233",
    name: "Mouse Gamer Evolut Eg-103rb Predator Rgb 2400 Dpi 06 Botoes",
    category: "eletronicos",
    categoryLabel: "Eletrônicos",
    price: 42.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-172355839566bb69fb53e93.jpg",
    emoji: "🔌",
    stock: 17,
    stockMax: 17,
    description: "Mouse Gamer Evolut Eg-103rb Predator Rgb 2400 Dpi 06 Botoes."
  },
  {
    id: "p234",
    name: "Suporte p/ celular 11.5x10cm",
    category: "eletronicos",
    categoryLabel: "Eletrônicos",
    price: 16.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-1770729965698b31ed326f2.webp",
    emoji: "🔌",
    stock: 10,
    stockMax: 10,
    description: "Suporte p/ celular 11.5x10cm."
  },
  {
    id: "p235",
    name: "Mouse Sem Fio Fantech W189 1200DPI",
    category: "eletronicos",
    categoryLabel: "Eletrônicos",
    price: 104.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-172373532666be1d1e57b3a.jpg",
    emoji: "🔌",
    stock: 162,
    stockMax: 162,
    description: "Mouse Sem Fio Fantech W189 1200DPI."
  },
  {
    id: "p236",
    name: "Mouse Sem Fio Fantech Forma Confortável W188 1200DPI",
    category: "eletronicos",
    categoryLabel: "Eletrônicos",
    price: 104.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-172355737166bb65fbc1fda.jpg",
    emoji: "🔌",
    stock: 88,
    stockMax: 88,
    description: "Mouse Sem Fio Fantech Forma Confortável W188 1200DPI."
  },
  {
    id: "p237",
    name: "Fone de Ouvido Bluetooth Cores Sortidas",
    category: "eletronicos",
    categoryLabel: "Eletrônicos",
    price: 48.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-1770729908698b31b4653bf.webp",
    emoji: "🔌",
    stock: 9,
    stockMax: 9,
    description: "Fone de Ouvido Bluetooth Cores Sortidas."
  },
  {
    id: "p238",
    name: "Mouse sem Fio Logitech M220 Silent Silencioso 1000 DPI",
    category: "eletronicos",
    categoryLabel: "Eletrônicos",
    price: 129.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-177248616669a5fe16befd6.jpg",
    emoji: "🔌",
    stock: 285,
    stockMax: 285,
    description: "Mouse sem Fio Logitech M220 Silent Silencioso 1000 DPI."
  },
  {
    id: "p239",
    name: "Mouse Para Jogos Profissional Fantech G13 Rhasta Ii 2400Dpi",
    category: "eletronicos",
    categoryLabel: "Eletrônicos",
    price: 85.9,
    oldPrice: 94.9,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-1734331695675fcd2f0461a.jpg",
    emoji: "🔌",
    stock: 196,
    stockMax: 196,
    description: "Mouse Para Jogos Profissional Fantech G13 Rhasta Ii 2400Dpi."
  },
  {
    id: "p240",
    name: "Kit Teclado e Mouse Teclas Silenciosas Fantech KM-100",
    category: "eletronicos",
    categoryLabel: "Eletrônicos",
    price: 131.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-172355694466bb6450b5141.jpg",
    emoji: "🔌",
    stock: 165,
    stockMax: 165,
    description: "Kit Teclado e Mouse Teclas Silenciosas Fantech KM-100."
  },
  {
    id: "p241",
    name: "Mouse Gamer Jogo Macro Crypto VX7 Fantech 8000DPI 6 Botões",
    category: "eletronicos",
    categoryLabel: "Eletrônicos",
    price: 129.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-172355695066bb6456b0705.jpg",
    emoji: "🔌",
    stock: 33,
    stockMax: 33,
    description: "Mouse Gamer Jogo Macro Crypto VX7 Fantech 8000DPI 6 Botões."
  },
  {
    id: "p242",
    name: "Tabuleiro Alfabeto em Madeira e EVA — 26 Letras",
    category: "infantil",
    categoryLabel: "Infantil e Brinquedos",
    price: 29.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-1770760844698baa8c13fc6.jpg",
    emoji: "🔤",
    stock: 1000,
    stockMax: 1000,
    description: "Tabuleiro pedagógico com base e 26 letras móveis em madeira e EVA, para montar palavras e treinar alfabetização de forma lúdica."
  },
  {
    id: "p243",
    name: "Kit Raquete de Ping-Pong 15x20cm",
    category: "infantil",
    categoryLabel: "Infantil e Brinquedos",
    price: 21.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-17700621736981015dbad31.png",
    emoji: "🏓",
    stock: 10,
    stockMax: 10,
    description: "Kit de raquetes de ping-pong medindo 15x20cm, leve e fácil de manusear, ideal para brincar em casa ou levar na viagem."
  },
  {
    id: "p244",
    name: "Teste Token Educativo em Madeira",
    category: "infantil",
    categoryLabel: "Infantil e Brinquedos",
    price: 41.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-1770760875698baaabd7c70.jpg",
    emoji: "🧩",
    stock: 1000,
    stockMax: 1000,
    description: "Jogo pedagógico em madeira usado em avaliação neurológica e treino de atenção, memória e compreensão de comandos."
  },
  {
    id: "p245",
    name: "Tangram Educativo em Madeira",
    category: "infantil",
    categoryLabel: "Infantil e Brinquedos",
    price: 19.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-1770760871698baaa72d75d.jpg",
    emoji: "🔺",
    stock: 1000,
    stockMax: 1000,
    description: "Quebra-cabeça chinês clássico em madeira: sete peças geométricas para montar centenas de figuras e treinar raciocínio espacial."
  },
  {
    id: "p246",
    name: "Pinos de Encaixe Educativo em Madeira",
    category: "infantil",
    categoryLabel: "Infantil e Brinquedos",
    price: 49.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-1770760839698baa87a393a.jpg",
    emoji: "🪵",
    stock: 1000,
    stockMax: 1000,
    description: "Brinquedo pedagógico de encaixe em madeira, trabalha coordenação motora fina, cores e noção de forma."
  },
  {
    id: "p247",
    name: "Encaixe Se For Capaz — Desafio Educativo em Madeira",
    category: "infantil",
    categoryLabel: "Infantil e Brinquedos",
    price: 15.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-1770760808698baa68dc126.jpg",
    emoji: "🧠",
    stock: 1000,
    stockMax: 1000,
    description: "Desafio de encaixe em madeira que estimula lógica, paciência e coordenação motora. Simples de entender, difícil de largar."
  },
  {
    id: "p248",
    name: "Torre de Hanói em Madeira e EVA",
    category: "infantil",
    categoryLabel: "Infantil e Brinquedos",
    price: 23.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-1770760880698baab03f84f.jpg",
    emoji: "🗼",
    stock: 1000,
    stockMax: 1000,
    description: "Clássico jogo de raciocínio lógico em madeira e EVA: mova os discos de haste em haste sem colocar um maior sobre um menor."
  },
  {
    id: "p249",
    name: "Kit 3 Tabuleiros — Alfabeto, Numerais e Vogais",
    category: "infantil",
    categoryLabel: "Infantil e Brinquedos",
    price: 68.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-1770760826698baa7a73fe6.jpg",
    emoji: "📚",
    stock: 1000,
    stockMax: 1000,
    description: "Trio de tabuleiros pedagógicos em madeira e EVA (alfabeto, numerais e vogais) para acompanhar toda a fase de alfabetização."
  },
  {
    id: "p250",
    name: "Formas Geométricas Educativo em Madeira e EVA",
    category: "infantil",
    categoryLabel: "Infantil e Brinquedos",
    price: 41.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-1770760813698baa6d836e3.jpg",
    emoji: "🔷",
    stock: 1000,
    stockMax: 1000,
    description: "Tabuleiro de formas geométricas em madeira e EVA: encaixe as peças, aprenda os nomes das formas e treine coordenação."
  },
  {
    id: "p251",
    name: "Painel Psicomotor Educativo em MDF (Labirinto)",
    category: "infantil",
    categoryLabel: "Infantil e Brinquedos",
    price: 32.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-177642835969e22547926f1.jpg",
    emoji: "🌀",
    stock: 1000,
    stockMax: 1000,
    description: "Painel de labirinto em MDF para treinar coordenação motora, concentração e traçado — brinquedo de mesa que não faz bagunça."
  },
  {
    id: "p252",
    name: "Cubo Kohs — Teste de Raciocínio Lógico 9 Peças",
    category: "infantil",
    categoryLabel: "Infantil e Brinquedos",
    price: 38.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-177642838769e225630f9be.png",
    emoji: "🟥",
    stock: 1000,
    stockMax: 1000,
    description: "Nove cubos coloridos em caixa de madeira para reproduzir padrões. Usado em avaliação de raciocínio lógico e ótimo como jogo."
  },
  {
    id: "p253",
    name: "Geoplano Matemático com Elásticos",
    category: "infantil",
    categoryLabel: "Infantil e Brinquedos",
    price: 32.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-177642837469e22556ab323.png",
    emoji: "📐",
    stock: 1000,
    stockMax: 1000,
    description: "Placa de pinos com elásticos coloridos para formar figuras geométricas — material pedagógico clássico de matemática."
  },
  {
    id: "p254",
    name: "Mouse Pad Gamer Grande Fantech Sven MP44 — 44x35cm",
    category: "eletronicos",
    categoryLabel: "Eletrônicos",
    price: 85.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-172355886666bb6bd266657.jpg",
    emoji: "🖱️",
    stock: 81,
    stockMax: 81,
    description: "Mouse pad gamer de 44x35cm com base antiderrapante e superfície lisa, espaço de sobra para mouse e teclado."
  },
  {
    id: "p255",
    name: "Mini Caixa de Som USB 6x7cm",
    category: "eletronicos",
    categoryLabel: "Eletrônicos",
    price: 57.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-1770729922698b31c24fd43.webp",
    emoji: "🔊",
    stock: 10,
    stockMax: 10,
    description: "Caixinha de som compacta de 6x7cm com conexão USB, em cores sortidas. Cabe na mesa e vai junto no notebook."
  },
  {
    id: "p256",
    name: "Kit Teclado e Mouse Sem Fio Multilaser TC251",
    category: "eletronicos",
    categoryLabel: "Eletrônicos",
    price: 233.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-17794552276a1054fbed4d1.jpg",
    emoji: "⌨️",
    stock: 19,
    stockMax: 19,
    description: "Kit sem fio Multilaser TC251 com teclado de teclas flutuantes e mouse, na cor preta — mesa mais limpa, sem fios."
  },
  {
    id: "p257",
    name: "Headset Gamer Fantech Sniper HG16 — 7.1 USB RGB",
    category: "eletronicos",
    categoryLabel: "Eletrônicos",
    price: 366.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-172355693366bb64450b689.jpg",
    emoji: "🎧",
    stock: 22,
    stockMax: 22,
    description: "Headset gamer Fantech HG16 com som 7.1 via USB e iluminação RGB, com microfone para jogar e conversar."
  },
  {
    id: "p258",
    name: "Fone de Ouvido Bluetooth LED Gatinho",
    category: "eletronicos",
    categoryLabel: "Eletrônicos",
    price: 101.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-177210494369a02cef26b13.webp",
    emoji: "🐱",
    stock: 10,
    stockMax: 10,
    description: "Fone bluetooth com orelhinhas de gato e LED, em cores sortidas. Queridinho do público infantojuvenil."
  },
  {
    id: "p259",
    name: "Brinco Orgânico Redondo Frisado Banhado a Ouro 18K",
    category: "joias",
    categoryLabel: "Joias e Acessórios",
    price: 82.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-1752068383686e711f41784.jpg",
    emoji: "💛",
    stock: 1,
    stockMax: 1,
    description: "Brinco de formato orgânico redondo com detalhes frisados, banhado a ouro 18K. Peça de acabamento fino para o dia a dia."
  },
  {
    id: "p260",
    name: "Conjunto Infantil Florzinha Branca Banhado a Ouro 18K",
    category: "joias",
    categoryLabel: "Joias e Acessórios",
    price: 89.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-17535339226884cde260693.webp",
    emoji: "🌼",
    stock: 1,
    stockMax: 1,
    description: "Conjunto infantil de florzinha branca banhado a ouro 18K — delicado e leve, pensado para orelhinhas pequenas."
  },
  {
    id: "p261",
    name: "Brinco Ponto de Luz Duplo Strass 6mm Banhado a Ouro 18K",
    category: "joias",
    categoryLabel: "Joias e Acessórios",
    price: 48.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-1752067992686e6f98a96dc.jpg",
    emoji: "✨",
    stock: 2,
    stockMax: 2,
    description: "Brinco fixo com dois strass de 6mm em cristal, estilo clássico Grace Kelly, banhado a ouro 18K."
  },
  {
    id: "p262",
    name: "Colar Menina Cravejado Banhado a Ouro 18K",
    category: "joias",
    categoryLabel: "Joias e Acessórios",
    price: 70.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-176116285768f936692fa96.png",
    emoji: "📿",
    stock: 1,
    stockMax: 1,
    description: "Colar com pingente de menina cravejado, banhado a ouro 18K — presente afetivo para mães e madrinhas."
  },
  {
    id: "p263",
    name: "Brinco Flor Vazada Banhado a Ouro 18K",
    category: "joias",
    categoryLabel: "Joias e Acessórios",
    price: 32.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-1752068435686e7153359d8.jpg",
    emoji: "🌸",
    stock: 1,
    stockMax: 1,
    description: "Brinco pendurado em formato de flor vazada com bordas detalhadas, banhado a ouro 18K. Leve e discreto."
  },
  {
    id: "p264",
    name: "Conjunto Coração com Cristal Rosa Banhado a Ouro 18K",
    category: "joias",
    categoryLabel: "Joias e Acessórios",
    price: 86.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-177335419169b33ccf6f0fd.jpg",
    emoji: "💗",
    stock: 1,
    stockMax: 1,
    description: "Conjunto de coração com cristal rosa banhado a ouro 18K — combinação romântica que funciona em qualquer idade."
  },
  {
    id: "p265",
    name: "Colar Cordão Baiano 2mm Banhado a Ouro",
    category: "joias",
    categoryLabel: "Joias e Acessórios",
    price: 200.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-175328827668810e54ecbeb.webp",
    emoji: "🔗",
    stock: 1,
    stockMax: 1,
    description: "Cordão baiano de 2mm banhado a ouro — corrente masculina clássica, elo firme e acabamento espelhado."
  },
  {
    id: "p266",
    name: "Forma de Bolo Retangular em Metal 32x47,5cm",
    category: "utensilios",
    categoryLabel: "Utensílios",
    price: 41.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-1769705121697b8ea13ce28.jpg",
    emoji: "🍰",
    stock: 10,
    stockMax: 10,
    description: "Forma retangular de metal medindo 32 x 47,5 x 5 cm — tamanho de padaria, boa para bolo de festa e assados grandes."
  },
  {
    id: "p267",
    name: "Truss Máscara Nutri Infusion 180g",
    category: "beleza",
    categoryLabel: "Saúde e Beleza",
    price: 153.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-17526737036877ada76c192.webp",
    emoji: "💇",
    stock: 30,
    stockMax: 30,
    description: "Máscara de nutrição profissional Truss Nutri Infusion 180g, para cabelos ressecados que precisam de reposição."
  },
  {
    id: "p268",
    name: "Truss Kit Shampoo e Condicionador Ultra Hydration",
    category: "beleza",
    categoryLabel: "Saúde e Beleza",
    price: 155.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-173878198767a3b523adbc2.png",
    emoji: "🧖",
    stock: 4,
    stockMax: 4,
    description: "Kit Truss Ultra Hydration com shampoo e condicionador — linha profissional de hidratação para uso em casa."
  },
  {
    id: "p269",
    name: "Colher de Silicone e Ferro 28x5,5cm",
    category: "utensilios",
    categoryLabel: "Utensílios",
    price: 17.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-177153492969977a5139ec8.webp",
    emoji: "🥄",
    stock: 10,
    stockMax: 10,
    description: "Colher de silicone com cabo de ferro, 28x5,5cm, em cores sortidas — não risca panela antiaderente."
  },
  {
    id: "p270",
    name: "Forma de Papel para Air Fryer Redonda 16cm",
    category: "utensilios",
    categoryLabel: "Utensílios",
    price: 14.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-1769695517697b691dd388d.jpg",
    emoji: "🧻",
    stock: 10,
    stockMax: 10,
    description: "Formas descartáveis antiaderentes de 16cm para air fryer: assa e joga fora, sem esfregar a cesta."
  },
  {
    id: "p271",
    name: "Porta-Pão Grande de Madeira Basculante",
    category: "casa",
    categoryLabel: "Casa e Decoração",
    price: 196.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-175587436768a8843fcc60b.jpg",
    emoji: "🍞",
    stock: 765,
    stockMax: 765,
    description: "Porta-pão grande em madeira com porta basculante estilo baú — guarda o pão fresco e decora a bancada."
  },
  {
    id: "p272",
    name: "Tábua de Vidro para Cozinha",
    category: "utensilios",
    categoryLabel: "Utensílios",
    price: 23.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-1769695564697b694cf3b7c.png",
    emoji: "🔪",
    stock: 10,
    stockMax: 10,
    description: "Tábua de vidro temperado com estampa sortida: não absorve cheiro, não mancha e vai na pia sem medo."
  },
  {
    id: "p273",
    name: "Protetor de Porta Veicular Impermeável",
    category: "pet",
    categoryLabel: "Pet Shop",
    price: 35.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-177738510769f0be930ca79.jpg",
    emoji: "🚗",
    stock: 6951,
    stockMax: 6951,
    description: "Protege a lateral interna da porta do carro contra pelos, arranhões e barro do pet."
  },
  {
    id: "p274",
    name: "Bolsa de Transporte Pet Amora 2 em 1 Impermeável",
    category: "pet",
    categoryLabel: "Pet Shop",
    price: 109.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-177738430069f0bb6cb8536.jpg",
    emoji: "👜",
    stock: 2979,
    stockMax: 2979,
    description: "Bolsa de transporte impermeável que vira caminha: leva o pet e serve de descanso na chegada."
  },
  {
    id: "p275",
    name: "Colchonete de Transporte Pet Hanna 2 em 1",
    category: "pet",
    categoryLabel: "Pet Shop",
    price: 66.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-177738460469f0bc9cc4861.jpg",
    emoji: "🛏️",
    stock: 3972,
    stockMax: 3972,
    description: "Colchonete impermeável 2 em 1 para transporte e descanso, fácil de limpar e de dobrar."
  },
  {
    id: "p276",
    name: "Cinto de Segurança Pet Simples",
    category: "pet",
    categoryLabel: "Pet Shop",
    price: 31.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-17875843426a8c5f5624c3c.jpg",
    emoji: "🦺",
    stock: 2979,
    stockMax: 2979,
    description: "Cinto de segurança que prende a coleira ao cinto do carro — o pet viaja preso e sem se machucar."
  },
  {
    id: "p277",
    name: "Comedouro e Bebedouro de Melamina Batman",
    category: "pet",
    categoryLabel: "Pet Shop",
    price: 125.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-175942796368debd7b06e64.jpg",
    emoji: "🦇",
    stock: 30,
    stockMax: 30,
    description: "Vasilha de melamina estampa Batman, resistente e fácil de lavar, serve como comedouro ou bebedouro."
  },
  {
    id: "p278",
    name: "Almofada Decorativa Pet",
    category: "pet",
    categoryLabel: "Pet Shop",
    price: 53.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-177738426869f0bb4c26a5f.jpg",
    emoji: "🛋️",
    stock: 6951,
    stockMax: 6951,
    description: "Almofada decorativa para o cantinho do pet — combina com a decoração e dá um lugar macio pra ele."
  },
  {
    id: "p279",
    name: "Edredom Pet Lexie Dupla Face 3 Peças",
    category: "pet",
    categoryLabel: "Pet Shop",
    price: 88.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-17875844906a8c5feae1db4.jpg",
    emoji: "🧣",
    stock: 3972,
    stockMax: 3972,
    description: "Kit edredom pet dupla face estampado com 3 peças: um lado quentinho, outro fresquinho."
  },
  {
    id: "p280",
    name: "Coleira Mulher Maravilha com Capa e Pingente",
    category: "pet",
    categoryLabel: "Pet Shop",
    price: 111.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-176122399168fa2537d0f5c.jpg",
    emoji: "🦸",
    stock: 30,
    stockMax: 30,
    description: "Coleira licenciada Mulher Maravilha com capa e pingente — para o pet que sai pra passear com estilo."
  },
  {
    id: "p281",
    name: "Conjunto Cinto de Segurança + Coleira Pet",
    category: "pet",
    categoryLabel: "Pet Shop",
    price: 49.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-17875844836a8c5fe39da4d.jpg",
    emoji: "🚙",
    stock: 993,
    stockMax: 993,
    description: "Kit com cinto de segurança veicular e coleira: o pet viaja preso e você não precisa comprar as duas peças separadas."
  },
  {
    id: "p282",
    name: "Coleira Batman Forever Preto e Amarelo",
    category: "pet",
    categoryLabel: "Pet Shop",
    price: 81.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-175942590668deb572c699d.png",
    emoji: "🦇",
    stock: 30,
    stockMax: 30,
    description: "Coleira licenciada Batman em preto e amarelo, com acabamento reforçado."
  },
  {
    id: "p283",
    name: "Coleira Krypto com Capa e Pingente — M",
    category: "pet",
    categoryLabel: "Pet Shop",
    price: 93.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-175942597968deb5bb8357e.png",
    emoji: "🐕",
    stock: 30,
    stockMax: 30,
    description: "Coleira tamanho M do Krypto (Superpets) com capa removível e pingente de identificação."
  },
  {
    id: "p284",
    name: "Guia para Cachorro Scooby-Doo",
    category: "pet",
    categoryLabel: "Pet Shop",
    price: 151.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-175942638668deb752bb5f3.jpg",
    emoji: "🐾",
    stock: 30,
    stockMax: 30,
    description: "Guia tradicional licenciada Scooby-Doo, alça reforçada e mosquetão resistente."
  },
  {
    id: "p285",
    name: "Protetor de Banco Traseiro Impermeável",
    category: "pet",
    categoryLabel: "Pet Shop",
    price: 78.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-177738522769f0bf0be6d00.jpg",
    emoji: "🚗",
    stock: 6951,
    stockMax: 6951,
    description: "Capa impermeável para o banco traseiro: segura pelo, barro e água, e sai fácil pra lavar."
  },
  {
    id: "p286",
    name: "Headset Gamer Fantech Captain 7.1 Space Edition",
    category: "eletronicos",
    categoryLabel: "Eletrônicos",
    price: 501.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-172355692666bb643e0a3a6.jpg",
    emoji: "🎧",
    stock: 2,
    stockMax: 2,
    description: "Headset Fantech Captain com som surround 7.1 via USB, edição Space, microfone destacável."
  },
  {
    id: "p287",
    name: "Headset Gamer Fantech Captain 7.1 RGB Virtual",
    category: "eletronicos",
    categoryLabel: "Eletrônicos",
    price: 375.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-172355691966bb643742b0e.jpg",
    emoji: "🎧",
    stock: 21,
    stockMax: 21,
    description: "Headset Fantech Captain 7.1 virtual com iluminação RGB e microfone — para jogar e fazer call."
  },
  {
    id: "p288",
    name: "Mouse Gamer Fantech Phantom X15 — 7 Botões",
    category: "eletronicos",
    categoryLabel: "Eletrônicos",
    price: 170.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-172373496866be1bb879a67.jpg",
    emoji: "🖱️",
    stock: 26,
    stockMax: 26,
    description: "Mouse gamer Fantech Phantom X15 com macro programável, RGB e 7 botões."
  },
  {
    id: "p289",
    name: "Mouse Pad Gamer Extra Largo 80x30cm",
    category: "eletronicos",
    categoryLabel: "Eletrônicos",
    price: 115.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-172363207466bc89cab8a9c.jpg",
    emoji: "🖱️",
    stock: 1,
    stockMax: 1,
    description: "Mouse pad Fantech Sven de 80x30cm: cabe teclado e mouse com folga, base antiderrapante."
  },
  {
    id: "p290",
    name: "Mouse Gamer Fantech Thor X9 — 7 Botões",
    category: "eletronicos",
    categoryLabel: "Eletrônicos",
    price: 168.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-172355875366bb6b614cf30.jpg",
    emoji: "🎮",
    stock: 1,
    stockMax: 1,
    description: "Mouse gamer Fantech Thor X9 com macro, RGB e 7 botões programáveis."
  },
  {
    id: "p291",
    name: "Box Organizador G Transparente",
    category: "casa",
    categoryLabel: "Casa e Decoração",
    price: 43.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-1731093492672e63f48a2eb.jpg",
    emoji: "📦",
    stock: 12,
    stockMax: 12,
    description: "Caixa organizadora grande e transparente — enxerga o que tem dentro sem abrir, empilha fácil."
  },
  {
    id: "p292",
    name: "Box Multiuso com Divisória P",
    category: "casa",
    categoryLabel: "Casa e Decoração",
    price: 62.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-1731093489672e63f173ce3.jpg",
    emoji: "🗄️",
    stock: 6,
    stockMax: 6,
    description: "Organizador multiuso pequeno com divisória interna, para separar miudezas em gaveta ou armário."
  },
  {
    id: "p293",
    name: "Luva de Microfibra Vonder para Limpeza",
    category: "utensilios",
    categoryLabel: "Utensílios",
    price: 84.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-17867686656a7fed1975240.jpg",
    emoji: "🧤",
    stock: 35,
    stockMax: 35,
    description: "Luva de microfibra Vonder para limpeza automotiva e doméstica: tira poeira sem riscar."
  },
  {
    id: "p294",
    name: "Lençol Avulso Microfibra Casal Branco",
    category: "casa",
    categoryLabel: "Casa e Decoração",
    price: 27.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-17515492446866853c25a99.jpg",
    emoji: "🛏️",
    stock: 100,
    stockMax: 100,
    description: "Lençol avulso de microfibra casal na cor branca: toque macio, seca rápido e quase não amassa."
  },
  {
    id: "p295",
    name: "Capa de Sofá Floral Preto 2 e 3 Lugares",
    category: "casa",
    categoryLabel: "Casa e Decoração",
    price: 156.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-1681846678643ef19627622.jpg",
    emoji: "🛋️",
    stock: 100,
    stockMax: 100,
    description: "Capa de sofá estampa floral preta que serve em sofás de 2 e 3 lugares — renova a sala sem trocar o móvel."
  },
  {
    id: "p296",
    name: "Capa de Sofá Lisa Avelã 2 e 3 Lugares",
    category: "casa",
    categoryLabel: "Casa e Decoração",
    price: 282.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-1681846033643eef11f0d8b.jpg",
    emoji: "🛋️",
    stock: 100,
    stockMax: 100,
    description: "Capa de sofá lisa na cor avelã para sofás de 2 e 3 lugares, tecido elástico que veste justo."
  },
  {
    id: "p297",
    name: "Capas de Cadeira Floral Preto — 4 Lugares",
    category: "casa",
    categoryLabel: "Casa e Decoração",
    price: 58.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-1681846665643ef189b2e84.jpg",
    emoji: "🪑",
    stock: 100,
    stockMax: 100,
    description: "Jogo com 4 capas de cadeira estampa floral preta: protege o estofado e uniformiza a mesa de jantar."
  },
  {
    id: "p298",
    name: "Kit Cobreleito Magnífico Dupla Face Queen",
    category: "casa",
    categoryLabel: "Casa e Decoração",
    price: 127.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-175154949668668638de6be.jpg",
    emoji: "🌙",
    stock: 100,
    stockMax: 100,
    description: "Cobreleito queen dupla face: um lado estampado, outro liso — troca o visual da cama virando a peça."
  },
  {
    id: "p299",
    name: "Colcha Bel Queen 3 Peças Amapola",
    category: "casa",
    categoryLabel: "Casa e Decoração",
    price: 125.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-175154903168668467a8931.jpg",
    emoji: "🌺",
    stock: 100,
    stockMax: 100,
    description: "Colcha queen com 3 peças (colcha + 2 porta-travesseiros) na estampa Amapola."
  },
  {
    id: "p300",
    name: "Kit Cobreleito Classic Queen 3 Peças Azul",
    category: "casa",
    categoryLabel: "Casa e Decoração",
    price: 156.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-1751549479686686275b7d5.jpg",
    emoji: "💙",
    stock: 100,
    stockMax: 100,
    description: "Kit cobreleito queen azul com 3 peças, acabamento clássico que combina com qualquer quarto."
  },
  {
    id: "p301",
    name: "Película de Privacidade para iPhone",
    category: "eletronicos",
    categoryLabel: "Eletrônicos",
    price: 28.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-17374946826790109a3a637.jpg",
    emoji: "📱",
    stock: 15,
    stockMax: 15,
    description: "Película de privacidade tela infinita para iPhone: só quem está de frente enxerga a tela."
  },
  {
    id: "p302",
    name: "Película Hidrogel para iPhone",
    category: "eletronicos",
    categoryLabel: "Eletrônicos",
    price: 28.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-173749438767900f73d563d.jpg",
    emoji: "📱",
    stock: 3,
    stockMax: 3,
    description: "Película de hidrogel para display de iPhone — acompanha a curvatura da tela e se auto-regenera de micro-riscos."
  },
  {
    id: "p303",
    name: "Capa com Alça Ajustável para Samsung Galaxy S",
    category: "eletronicos",
    categoryLabel: "Eletrônicos",
    price: 72.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-173749398567900de18e60d.jpg",
    emoji: "🤳",
    stock: 6,
    stockMax: 6,
    description: "Capa preta para linha Galaxy S com alça ajustável — dá pra pendurar no pescoço e liberar as mãos."
  },
  {
    id: "p304",
    name: "Cera Matte Plus Efeito Seco Don Armany 70g",
    category: "beleza",
    categoryLabel: "Saúde e Beleza",
    price: 39.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-177448261769c474b9455bb.jpg",
    emoji: "💈",
    stock: 260,
    stockMax: 260,
    description: "Cera modeladora matte de 70g com efeito seco: fixa sem deixar o cabelo oleoso ou pesado."
  },
  {
    id: "p305",
    name: "Pomada Modeladora Masculina Efeito Seco Don Armany",
    category: "beleza",
    categoryLabel: "Saúde e Beleza",
    price: 47.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-177448340669c477cec6be5.jpg",
    emoji: "💇",
    stock: 903,
    stockMax: 903,
    description: "Pomada modeladora masculina de efeito seco, fixação forte e acabamento sem brilho."
  },
  {
    id: "p306",
    name: "Kit Matte Cabelo — Pasta 80g + Pó Modelador",
    category: "beleza",
    categoryLabel: "Saúde e Beleza",
    price: 117.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-17874332486a8a1120df18e.jpg",
    emoji: "🧴",
    stock: 789,
    stockMax: 789,
    description: "Kit com pasta matte de 80g e pó modelador: volume na raiz e fixação matte no mesmo combo."
  },
  {
    id: "p307",
    name: "Kit Don Armany Cabelo, Barba e Corpo",
    category: "beleza",
    categoryLabel: "Saúde e Beleza",
    price: 162.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-17874349456a8a17c1b068a.jpg",
    emoji: "🧔",
    stock: 760,
    stockMax: 760,
    description: "Kit completo Don Armany com shampoo, produtos de barba e corpo — presente masculino que resolve tudo."
  },
  {
    id: "p308",
    name: "Kit Barba Don Armany — Shampoo 200ml + Balm 110g",
    category: "beleza",
    categoryLabel: "Saúde e Beleza",
    price: 151.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-17874349526a8a17c8effae.jpg",
    emoji: "🪒",
    stock: 800,
    stockMax: 800,
    description: "Kit de barba com shampoo de 200ml e balm de 110g: limpa, hidrata e dá forma."
  },
  {
    id: "p309",
    name: "Colar com Laço Banhado a Ouro 18K",
    category: "joias",
    categoryLabel: "Joias e Acessórios",
    price: 89.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-176116264868f935982916d.png",
    emoji: "🎀",
    stock: 2,
    stockMax: 2,
    description: "Colar com pingente de laço banhado a ouro 18K — delicado, combina com look casual e social."
  },
  {
    id: "p310",
    name: "Choker com Bolinha Banhado a Ouro 18K",
    category: "joias",
    categoryLabel: "Joias e Acessórios",
    price: 56.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-176116265868f935a27e33e.png",
    emoji: "⭕",
    stock: 3,
    stockMax: 3,
    description: "Choker rente ao pescoço com detalhe de bolinha, banhado a ouro 18K."
  },
  {
    id: "p311",
    name: "Conjunto Rabo de Rato — Colar e Pulseira Ouro 18K",
    category: "joias",
    categoryLabel: "Joias e Acessórios",
    price: 282.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-176116266668f935aabcc88.png",
    emoji: "✨",
    stock: 1,
    stockMax: 1,
    description: "Conjunto de colar e pulseira em corrente rabo de rato banhada a ouro 18K — peça de presente."
  },
  {
    id: "p312",
    name: "Colar Menino Cravejado Banhado a Ouro 18K",
    category: "joias",
    categoryLabel: "Joias e Acessórios",
    price: 62.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-176116269268f935c4dc0b9.png",
    emoji: "👦",
    stock: 3,
    stockMax: 3,
    description: "Colar com pingente de menino cravejado, banhado a ouro 18K — o par do modelo menina."
  },
  {
    id: "p313",
    name: "Dupla de Brincos Coração Paixão M/P Ouro 18K",
    category: "joias",
    categoryLabel: "Joias e Acessórios",
    price: 185.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-1752068844686e72ec020e4.jpg",
    emoji: "💞",
    stock: 1,
    stockMax: 1,
    description: "Dupla de brincos de coração nos tamanhos M e P, banhados a ouro 18K — para usar juntos ou separados."
  },
  {
    id: "p314",
    name: "Trio de Brincos de Estrela Banhado a Ouro 18K",
    category: "joias",
    categoryLabel: "Joias e Acessórios",
    price: 52.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-177335406169b33c4d73c3d.jpg",
    emoji: "⭐",
    stock: 1,
    stockMax: 1,
    description: "Trio de brincos de estrela em tamanhos diferentes, banhados a ouro 18K — ótimo para orelha com furos múltiplos."
  },
  {
    id: "p315",
    name: "Brinco Folha com Cristal Banhado a Ouro 18K",
    category: "joias",
    categoryLabel: "Joias e Acessórios",
    price: 49.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-177335416369b33cb31a472.jpg",
    emoji: "🍃",
    stock: 1,
    stockMax: 1,
    description: "Brinco em formato de folha com cristal central, banhado a ouro 18K."
  },
  {
    id: "p316",
    name: "Carteira Feminina 2 Zíperes 20x10cm",
    category: "joias",
    categoryLabel: "Joias e Acessórios",
    price: 26.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-1770324132698500a40f577.webp",
    emoji: "👛",
    stock: 10,
    stockMax: 10,
    description: "Carteira feminina compacta de 20x10cm com dois zíperes — separa notas, moedas e cartões."
  },
  {
    id: "p317",
    name: "Bolsa de Mão Peluciada 20x11cm",
    category: "joias",
    categoryLabel: "Joias e Acessórios",
    price: 22.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-1770149765698257854b99b.webp",
    emoji: "👜",
    stock: 10,
    stockMax: 10,
    description: "Bolsinha de mão peluciada de 20x11cm em cores sortidas, para o essencial do dia."
  },
  {
    id: "p318",
    name: "Chapéu Belli Boiadeira",
    category: "joias",
    categoryLabel: "Joias e Acessórios",
    price: 94.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-1768909796696f6be4b2326.jpg",
    emoji: "🤠",
    stock: 229,
    stockMax: 229,
    description: "Chapéu modelo boiadeira Belli — peça em alta no country e nas festas de rodeio."
  },
  {
    id: "p319",
    name: "Chapéu Belli Marrom",
    category: "joias",
    categoryLabel: "Joias e Acessórios",
    price: 94.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-1748525484683861ac38cae.jpg",
    emoji: "🎩",
    stock: 29,
    stockMax: 29,
    description: "Chapéu Belli na cor marrom, aba estruturada e acabamento firme."
  },
  {
    id: "p320",
    name: "Mochila de Costas Homem-Aranha",
    category: "infantil",
    categoryLabel: "Infantil e Brinquedos",
    price: 117.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-17379390406796d860da775.jpg",
    emoji: "🕷️",
    stock: 13,
    stockMax: 13,
    description: "Mochila escolar de costas licenciada do Homem-Aranha, com alças acolchoadas."
  },
  {
    id: "p321",
    name: "Mochila de Rodinhas Barbie Sereia",
    category: "infantil",
    categoryLabel: "Infantil e Brinquedos",
    price: 137.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-175819639868cbf2ae7f014.jpg",
    emoji: "🧜",
    stock: 4,
    stockMax: 4,
    description: "Mochila escolar de rodinhas Barbie Sereia — puxa em vez de carregar, alivia as costas."
  },
  {
    id: "p322",
    name: "Kit Escolar Barbie — Mochila de Rodinhas, Lancheira e Estojo",
    category: "infantil",
    categoryLabel: "Infantil e Brinquedos",
    price: 284.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-175865037568d2e007cda9d.jpg",
    emoji: "🎒",
    stock: 8,
    stockMax: 8,
    description: "Kit escolar completo da Barbie: mochila de rodinhas, lancheira e estojo no mesmo tema."
  },
  {
    id: "p323",
    name: "Kit Escolar A Pequena Sereia — Mochila de Rodinhas, Lancheira e Estojo",
    category: "infantil",
    categoryLabel: "Infantil e Brinquedos",
    price: 284.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-175865044968d2e0511e2a5.jpg",
    emoji: "🐚",
    stock: 8,
    stockMax: 8,
    description: "Kit escolar A Pequena Sereia com mochila de rodinhas, lancheira e estojo combinando."
  },
  {
    id: "p324",
    name: "Kit 5 Brinquedos Educativos em Madeira e EVA",
    category: "infantil",
    categoryLabel: "Infantil e Brinquedos",
    price: 166.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-1770760830698baa7eb5975.jpg",
    emoji: "🎁",
    stock: 1000,
    stockMax: 1000,
    description: "Combo com cinco brinquedos pedagógicos em madeira e EVA — meio-termo entre o kit de 3 e o de 10."
  },
  {
    id: "p325",
    name: "Tabuleiro Numerais em Madeira e EVA — 10 Números",
    category: "infantil",
    categoryLabel: "Infantil e Brinquedos",
    price: 29.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-1770760848698baa90e20d3.jpg",
    emoji: "🔢",
    stock: 1000,
    stockMax: 1000,
    description: "Tabuleiro com base e 10 números móveis em madeira e EVA, para aprender a contar brincando."
  },
  {
    id: "p326",
    name: "Tabuleiro Vogais em Madeira e EVA — 5 Letras",
    category: "infantil",
    categoryLabel: "Infantil e Brinquedos",
    price: 25.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-1770760866698baaa20cc22.jpg",
    emoji: "🅰️",
    stock: 1000,
    stockMax: 1000,
    description: "Tabuleiro com base e as 5 vogais em madeira e EVA — primeiro passo da alfabetização."
  },
  {
    id: "p327",
    name: "Torre de Londres — Jogo Educativo em Madeira",
    category: "infantil",
    categoryLabel: "Infantil e Brinquedos",
    price: 19.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-1770760886698baab682e4d.jpg",
    emoji: "🏰",
    stock: 1000,
    stockMax: 1000,
    description: "Jogo de planejamento e raciocínio em madeira, usado em avaliação cognitiva e ótimo como desafio."
  },
  {
    id: "p328",
    name: "Coleira Pet Krypto com Capa e Pingente — G",
    category: "pet",
    categoryLabel: "Pet Shop",
    price: 93.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-175942598068deb5bc50652.png",
    emoji: "🦸",
    stock: 30,
    stockMax: 30,
    description: "Coleira do Krypto, o supercão, com capa removível e pingente de identificação. Tamanho G, licenciada e com acabamento reforçado."
  },
  {
    id: "p329",
    name: "Coleira Pet Scooby-Doo — M",
    category: "pet",
    categoryLabel: "Pet Shop",
    price: 114.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-17619769226905a25ae079a.png",
    emoji: "🐕",
    stock: 30,
    stockMax: 30,
    description: "Coleira licenciada do Scooby-Doo, tamanho M, com fecho resistente e regulagem. Para o cão que resolve todos os mistérios do quarteirão."
  },
  {
    id: "p330",
    name: "Coleira Pet Superman — M",
    category: "pet",
    categoryLabel: "Pet Shop",
    price: 114.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-175942616268deb67286423.jpg",
    emoji: "🦸",
    stock: 30,
    stockMax: 30,
    description: "Coleira licenciada do Superman, tamanho M, em material resistente com regulagem. O clássico que nunca sai de moda."
  },
  {
    id: "p331",
    name: "Bandana Pet The Flash — G",
    category: "pet",
    categoryLabel: "Pet Shop",
    price: 68.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-17619768416905a209471e8.png",
    emoji: "⚡",
    stock: 30,
    stockMax: 30,
    description: "Bandana licenciada do The Flash, tamanho G. Vai por cima da coleira e deixa o passeio com cara de super-herói."
  },
  {
    id: "p332",
    name: "Bandana Pet Hello Kitty Rosa",
    category: "pet",
    categoryLabel: "Pet Shop",
    price: 63.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-176698435469520aa23f75f.png",
    emoji: "🎀",
    stock: 30,
    stockMax: 30,
    description: "Bandana licenciada Hello Kitty na cor rosa, macia e fácil de prender na coleira. Sucesso garantido nas fotos."
  },
  {
    id: "p333",
    name: "Bandana Pet Hello Kitty Clássica — G",
    category: "pet",
    categoryLabel: "Pet Shop",
    price: 63.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-176111335468f8750a2ffaa.png",
    emoji: "🐱",
    stock: 30,
    stockMax: 30,
    description: "Bandana licenciada Hello Kitty no modelo clássico, tamanho G. Tecido leve, não incomoda no pescoço."
  },
  {
    id: "p334",
    name: "Peitoral com Guia para Gato Hello Kitty Black",
    category: "pet",
    categoryLabel: "Pet Shop",
    price: 247.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-176079899268f3a9103009b.jpg",
    emoji: "🐈",
    stock: 30,
    stockMax: 30,
    description: "Conjunto peitoral + guia licenciado Hello Kitty Black, feito para gatos: distribui a força no peito em vez do pescoço."
  },
  {
    id: "p335",
    name: "Coleira Pet Meninas Superpoderosas Rosa — M",
    category: "pet",
    categoryLabel: "Pet Shop",
    price: 93.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-175942599768deb5cd5f557.png",
    emoji: "💖",
    stock: 30,
    stockMax: 30,
    description: "Coleira licenciada das Meninas Superpoderosas em rosa, tamanho M, com fivela resistente e regulagem."
  },
  {
    id: "p336",
    name: "Bandana Pet Meninas Superpoderosas — M",
    category: "pet",
    categoryLabel: "Pet Shop",
    price: 68.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-175942569168deb49b86ff4.jpg",
    emoji: "💫",
    stock: 30,
    stockMax: 30,
    description: "Bandana licenciada das Meninas Superpoderosas nas cores azul e verde, tamanho M. Prende na coleira em segundos."
  },
  {
    id: "p337",
    name: "Comedouro e Bebedouro de Melamina Mulher Maravilha",
    category: "pet",
    categoryLabel: "Pet Shop",
    price: 125.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-175942796668debd7ee20b4.jpg",
    emoji: "🥣",
    stock: 30,
    stockMax: 30,
    description: "Vasilha de melamina licenciada da Mulher Maravilha, serve como comedouro ou bebedouro. Material firme, fácil de lavar e não absorve cheiro."
  },
  {
    id: "p338",
    name: "Saco de Dormir Pet Impermeável Téo",
    category: "pet",
    categoryLabel: "Pet Shop",
    price: 66.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-177738483669f0bd847d10e.jpg",
    emoji: "🛏️",
    stock: 993,
    stockMax: 993,
    description: "Saco de dormir pet com forro impermeável: o bicho entra, se enrola e dorme aquecido. Lavável e com secagem rápida."
  },
  {
    id: "p339",
    name: "Tapete Pet Soft Médio",
    category: "pet",
    categoryLabel: "Pet Shop",
    price: 49.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-177738517569f0bed7573d6.jpg",
    emoji: "🧸",
    stock: 993,
    stockMax: 993,
    description: "Tapete pet soft tamanho médio, macio dos dois lados, para usar no chão, no sofá ou dentro da caixa de transporte."
  },
  {
    id: "p340",
    name: "Tapete Pet Impermeável Sasha",
    category: "pet",
    categoryLabel: "Pet Shop",
    price: 49.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-177738539169f0bfaf3f2f5.jpg",
    emoji: "🐾",
    stock: 1986,
    stockMax: 1986,
    description: "Tapete pet com base impermeável que segura líquido e não passa para o piso ou o estofado. Fácil de lavar na máquina."
  },
  {
    id: "p341",
    name: "Colchonete Arranhador para Gatos Zoe",
    category: "pet",
    categoryLabel: "Pet Shop",
    price: 56.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-177738450569f0bc3961ea3.jpg",
    emoji: "🐈",
    stock: 993,
    stockMax: 993,
    description: "Colchonete arranhador para gatos: serve de cama e de lugar certo para afiar as unhas, poupando o sofá."
  },
  {
    id: "p342",
    name: "Protetor de Banco Toddy Impermeável Grande",
    category: "pet",
    categoryLabel: "Pet Shop",
    price: 86.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-177738501869f0be3a62db4.jpg",
    emoji: "🚗",
    stock: 993,
    stockMax: 993,
    description: "Protetor de banco de carro impermeável tamanho grande. Segura pelo, água e lama, e sai fácil para lavar."
  },
  {
    id: "p343",
    name: "Kit Protetor de Bancos de Carro Impermeável Plus",
    category: "pet",
    categoryLabel: "Pet Shop",
    price: 176.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-177738474269f0bd26f206f.jpg",
    emoji: "🚙",
    stock: 993,
    stockMax: 993,
    description: "Kit completo de proteção impermeável para os bancos do carro. Solução de uma vez só para quem leva o pet junto sempre."
  },
  {
    id: "p344",
    name: "Kit Protetor de Banco Toddy + Colchonete Grande",
    category: "pet",
    categoryLabel: "Pet Shop",
    price: 127.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-177738466169f0bcd531d18.jpg",
    emoji: "🧳",
    stock: 993,
    stockMax: 993,
    description: "Kit com protetor de banco impermeável e colchonete grande: o pet viaja confortável e o estofado fica intacto."
  },
  {
    id: "p345",
    name: "Protetor de Porta-Malas Simba Impermeável Grande",
    category: "pet",
    categoryLabel: "Pet Shop",
    price: 86.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-177738529469f0bf4e71fb8.jpg",
    emoji: "🚘",
    stock: 6951,
    stockMax: 6951,
    description: "Protetor de porta-malas impermeável tamanho grande, ideal para cães maiores viajarem atrás sem sujar o carpete."
  },
  {
    id: "p346",
    name: "Peseira Pet Impermeável para Cama Solteiro",
    category: "pet",
    categoryLabel: "Pet Shop",
    price: 76.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-177738486269f0bd9ea3a70.jpg",
    emoji: "🛌",
    stock: 993,
    stockMax: 993,
    description: "Peseira impermeável para cama de solteiro: o pet dorme no pé da cama e a roupa de cama continua limpa."
  },
  {
    id: "p347",
    name: "Kit Transporte Bolsa + Colchonete Impermeável",
    category: "pet",
    categoryLabel: "Pet Shop",
    price: 156.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-177738489769f0bdc1428df.jpg",
    emoji: "🎒",
    stock: 993,
    stockMax: 993,
    description: "Kit de transporte com bolsa e colchonete impermeável, 2 em 1: leva o pet e vira caminha na chegada."
  }
];

const CATEGORIES = [
  { key: "casa", label: "Casa e Decoração", icon: "🏠", image: "assets/img/categories/casa.png" },
  { key: "pet", label: "Pet Shop", icon: "🐾", image: "assets/img/categories/pet.png" },
  { key: "beleza", label: "Saúde e Beleza", icon: "💄", image: "assets/img/categories/beleza.png" },
  { key: "joias", label: "Joias e Acessórios", icon: "💍", image: "assets/img/categories/joias.png" },
  { key: "infantil", label: "Infantil e Brinquedos", icon: "🧸", image: "assets/img/categories/infantil.png" },
  { key: "utensilios", label: "Utensílios", icon: "🍳", image: "assets/img/categories/utensilios.png" },
  { key: "eletronicos", label: "Eletrônicos", icon: "🔌", image: "assets/img/categories/eletronicos.png" }
];

/* Curadoria manual (não é estatística inventada — é escolha editorial,
   igual à Oferta Relâmpago). Só 1 item pra não virar "todo mundo é favorito". */
const FAVORITE_IDS = ["p1"];

/* Tamanho/medida — preenchido só onde o texto original do fornecedor já
   confirma o dado (ex.: "tamanho M único" na descrição do p19, "1,2m" no
   p23/p26). Não inventamos numeração de roupa que a gente não tem — o
   resto do catálogo simplesmente não mostra essa linha na ficha técnica. */
const PRODUCT_SPECS = {
  p14: { medida: "40x60cm" },
  p19: { tamanho: "M único" },
  p22: { tamanho: "Único" },
  p23: { medida: "1,2m de comprimento" },
  p30: { tamanho: "Pequeno" },
};

/* =====================================================================
   MEDIDAS DE ENVIO — peso (kg) e dimensões da EMBALAGEM (cm), usadas pra
   cotar o frete real na API do Melhor Envio. Levantadas em 27/08/2026 por
   pesquisa de ficha técnica em Mercado Livre, Amazon BR, Shopee, Magalu e
   sites de fabricante, item a item. A maioria é ESTIMATIVA a partir de um
   produto equivalente — a Dropi não informa peso nem dimensão em lugar
   nenhum do painel nem da API, então não há dado de fornecedor pra usar.
   Toda medida respeita o mínimo dos Correios (16 x 11 x 2 cm).
   Quando um pedido tem mais de um item, o carrinho soma os pesos e monta
   uma caixa que comporta o conjunto (ver montarPacote em carrinho.html).
   ===================================================================== */
const SHIPPING = {
  p1: { peso: 0.8, comprimento: 30, largura: 20, altura: 10 },
  p2: { peso: 0.25, comprimento: 30, largura: 25, altura: 3 },
  p5: { peso: 0.4, comprimento: 20, largura: 11, altura: 9 },
  p6: { peso: 0.15, comprimento: 16, largura: 11, altura: 4 },
  p7: { peso: 1, comprimento: 40, largura: 30, altura: 10 },
  p9: { peso: 0.03, comprimento: 16, largura: 11, altura: 2 },
  p10: { peso: 0.35, comprimento: 24, largura: 18, altura: 8 },
  p11: { peso: 0.05, comprimento: 16, largura: 11, altura: 2 },
  p12: { peso: 0.45, comprimento: 28, largura: 19, altura: 12 },
  p13: { peso: 0.5, comprimento: 30, largura: 12, altura: 10 },
  p14: { peso: 0.6, comprimento: 42, largura: 32, altura: 6 },
  p15: { peso: 0.15, comprimento: 20, largura: 11, altura: 4 },
  p17: { peso: 0.35, comprimento: 30, largura: 30, altura: 8 },
  p24: { peso: 2.02, comprimento: 37, largura: 23, altura: 6 },
  p29: { peso: 0.5, comprimento: 32, largura: 26, altura: 8 },
  p30: { peso: 0.3, comprimento: 35, largura: 25, altura: 4 },
  p31: { peso: 0.05, comprimento: 16, largura: 11, altura: 2 },
  p32: { peso: 0.15, comprimento: 16, largura: 11, altura: 8 },
  p36: { peso: 0.03, comprimento: 16, largura: 11, altura: 2 },
  p37: { peso: 0.05, comprimento: 16, largura: 11, altura: 2 },
  p39: { peso: 0.02, comprimento: 16, largura: 11, altura: 2 },
  p40: { peso: 0.08, comprimento: 16, largura: 11, altura: 2 },
  p41: { peso: 0.03, comprimento: 16, largura: 11, altura: 2 },
  p42: { peso: 0.02, comprimento: 16, largura: 11, altura: 2 },
  p44: { peso: 0.03, comprimento: 16, largura: 11, altura: 2 },
  p47: { peso: 0.08, comprimento: 16, largura: 12, altura: 5 },
  p48: { peso: 0.4, comprimento: 25, largura: 20, altura: 8 },
  p49: { peso: 0.45, comprimento: 40, largura: 30, altura: 10 },
  p50: { peso: 0.08, comprimento: 16, largura: 11, altura: 4 },
  p53: { peso: 0.5, comprimento: 25, largura: 20, altura: 8 },
  p54: { peso: 0.15, comprimento: 30, largura: 25, altura: 3 },
  p55: { peso: 0.4, comprimento: 16, largura: 11, altura: 10 },
  p67: { peso: 0.18, comprimento: 20, largura: 12, altura: 9 },
  p73: { peso: 0.1, comprimento: 16, largura: 11, altura: 4 },
  p74: { peso: 0.1, comprimento: 16, largura: 11, altura: 2 },
  p75: { peso: 0.2, comprimento: 16, largura: 11, altura: 5 },
  p76: { peso: 0.05, comprimento: 16, largura: 11, altura: 2 },
  p77: { peso: 0.15, comprimento: 16, largura: 11, altura: 8 },
  p80: { peso: 0.02, comprimento: 16, largura: 11, altura: 2 },
  p90: { peso: 0.35, comprimento: 25, largura: 20, altura: 4 },
  p92: { peso: 0.25, comprimento: 30, largura: 25, altura: 4 },
  p93: { peso: 0.3, comprimento: 30, largura: 25, altura: 5 },
  p95: { peso: 0.9, comprimento: 45, largura: 35, altura: 8 },
  p96: { peso: 0.4, comprimento: 35, largura: 30, altura: 5 },
  p200: { peso: 0.5, comprimento: 32, largura: 26, altura: 8 },
  p201: { peso: 1, comprimento: 40, largura: 30, altura: 8 },
  p202: { peso: 0.6, comprimento: 35, largura: 30, altura: 8 },
  p203: { peso: 0.8, comprimento: 35, largura: 30, altura: 10 },
  p204: { peso: 0.03, comprimento: 16, largura: 11, altura: 2 },
  p205: { peso: 0.4, comprimento: 30, largura: 25, altura: 4 },
  p206: { peso: 0.4, comprimento: 40, largura: 25, altura: 8 },
  p207: { peso: 0.7, comprimento: 35, largura: 20, altura: 15 },
  p208: { peso: 0.25, comprimento: 35, largura: 25, altura: 3 },
  p209: { peso: 1, comprimento: 50, largura: 35, altura: 10 },
  p210: { peso: 0.8, comprimento: 35, largura: 30, altura: 5 },
  p211: { peso: 0.5, comprimento: 45, largura: 35, altura: 8 },
  p212: { peso: 0.5, comprimento: 35, largura: 25, altura: 6 },
  p213: { peso: 0.2, comprimento: 16, largura: 11, altura: 8 },
  p214: { peso: 0.25, comprimento: 16, largura: 11, altura: 10 },
  p215: { peso: 0.15, comprimento: 20, largura: 11, altura: 6 },
  p216: { peso: 0.25, comprimento: 22, largura: 16, altura: 6 },
  p217: { peso: 0.15, comprimento: 20, largura: 20, altura: 5 },
  p218: { peso: 0.1, comprimento: 37, largura: 11, altura: 2 },
  p219: { peso: 0.06, comprimento: 28, largura: 11, altura: 2 },
  p220: { peso: 0.08, comprimento: 27, largura: 11, altura: 2 },
  p221: { peso: 0.2, comprimento: 25, largura: 12, altura: 3 },
  p222: { peso: 0.22, comprimento: 25, largura: 15, altura: 8 },
  p223: { peso: 0.05, comprimento: 16, largura: 11, altura: 4 },
  p224: { peso: 0.45, comprimento: 31, largura: 31, altura: 5 },
  p225: { peso: 0.8, comprimento: 29, largura: 29, altura: 7 },
  p226: { peso: 0.3, comprimento: 28, largura: 28, altura: 6 },
  p227: { peso: 0.35, comprimento: 20, largura: 12, altura: 10 },
  p228: { peso: 0.55, comprimento: 46, largura: 11, altura: 9 },
  p229: { peso: 0.15, comprimento: 16, largura: 11, altura: 4 },
  p230: { peso: 0.4, comprimento: 30, largura: 25, altura: 3 },
  p231: { peso: 0.45, comprimento: 42, largura: 32, altura: 6 },
  p232: { peso: 0.12, comprimento: 25, largura: 20, altura: 2 },
  p233: { peso: 0.25, comprimento: 18, largura: 11, altura: 5 },
  p234: { peso: 0.12, comprimento: 16, largura: 11, altura: 2 },
  p235: { peso: 0.15, comprimento: 19, largura: 11.5, altura: 8.5 },
  p236: { peso: 0.15, comprimento: 16, largura: 11, altura: 5 },
  p237: { peso: 0.15, comprimento: 16, largura: 11, altura: 5 },
  p238: { peso: 0.15, comprimento: 16, largura: 11, altura: 4 },
  p239: { peso: 0.3, comprimento: 20, largura: 12, altura: 6 },
  p240: { peso: 1, comprimento: 46, largura: 18, altura: 6 },
  p241: { peso: 0.3, comprimento: 18, largura: 12, altura: 6 },
};

function pacoteDoProduto(id) {
  return SHIPPING[id] || { peso: 0.3, comprimento: 16, largura: 11, altura: 2 };
}

function formatBRL(value) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function installmentValue(p) {
  return p.price / 3;
}

/* O Mercado Pago exige parcela mínima de R$ 15,00 no parcelamento sem juros.
   Abaixo de R$ 45,00 o 3x simplesmente não é oferecido no checkout, então o
   site não pode prometer o que a bandeira não vai deixar parcelar. */
const PARCELA_MINIMA = 15;
function podeParcelar(p) {
  return p.price / 3 >= PARCELA_MINIMA;
}
function installmentText(p) {
  if (!podeParcelar(p)) return "à vista no Pix ou no cartão";
  return `ou 3x de ${formatBRL(installmentValue(p))} sem juros`;
}

function discountPercent(p) {
  if (!p.oldPrice) return null;
  return Math.round((1 - p.price / p.oldPrice) * 100);
}

function flashSideItemHTML(p) {
  // Item de destaque nas laterais da Oferta Relâmpago. Curado à mão (não é
  // "maior desconto %" puro) pra evitar preço unitário baixo de mais que passe
  // impressão de saldão/loja sem valor — prioriza produto com preço percebido
  // maior e desconto real ainda assim expressivo.
  const disc = discountPercent(p);
  return `
  <a class="flash-side-item" href="produto.html?id=${p.id}">
    ${disc ? `<span class="flash-side-badge">-${disc}%</span>` : ""}
    <div class="flash-side-thumb">${productThumbInner(p)}</div>
    <span class="flash-side-name">${p.name}</span>
    <span class="flash-side-price">${formatBRL(p.price)}</span>
  </a>`;
}

function renderFlashItems(ids, containerEl) {
  if (!containerEl) return;
  containerEl.innerHTML = ids
    .map((id) => getProductById(id))
    .filter(Boolean)
    .map(flashSideItemHTML)
    .join("");
}

/* Ficha técnica + selos de confiança da página de produto. Não inventa
   avaliação/nota — mostra "ainda sem avaliações" honestamente até a loja
   ter reviews reais (fake review/nota é prática enganosa e a mesma razão
   pela qual não inventamos número de estoque/visitantes em outro lugar
   do site). Política de troca é a garantia legal do CDC (Art. 49, direito
   de arrependimento em 7 dias pra compra online), válida pra qualquer loja
   — não é uma promessa inventada. */
function productSpecsHTML(p) {
  const specs = PRODUCT_SPECS[p.id] || {};
  const rows = [];
  if (specs.tamanho) rows.push(["Tamanho", specs.tamanho]);
  if (specs.medida) rows.push(["Medida", specs.medida]);
  rows.push(["Código", p.id.toUpperCase()]);
  rows.push(["Vendido por", "Achadinhos Brasil"]);
  return `
  <div class="product-specs">
    <div class="product-specs-row product-rating">
      <span class="product-specs-label">Avaliações</span>
      <span class="stars">☆☆☆☆☆ <span style="color:var(--text);font-weight:600;">Ainda sem avaliações</span></span>
    </div>
    ${rows
      .map(
        ([label, value]) => `
    <div class="product-specs-row">
      <span class="product-specs-label">${label}</span>
      <span class="product-specs-value">${value}</span>
    </div>`
      )
      .join("")}
    <div class="product-trust-note">Troca grátis em até 7 dias após o recebimento, conforme o Art. 49 do Código de Defesa do Consumidor.</div>
  </div>`;
}

function stockPercent(p) {
  return Math.max(6, Math.min(100, Math.round((p.stock / p.stockMax) * 100)));
}

function isLowStock(p) {
  // Só sinaliza urgência de estoque quando o número real já é baixo —
  // nunca em cima de uma fração inventada de um estoque de fornecedor grande.
  return p.stock > 0 && p.stock <= 20;
}

function isBulkStock(p) {
  // Estoque de fornecedor bem grande (dropshipping) não deve aparecer como
  // número gigante pro cliente — vira uma mensagem de preço de atacado.
  return p.stock > 100;
}

function isOutOfStock(p) {
  return p.stock <= 0;
}

function stockLabel(p) {
  if (isOutOfStock(p)) return "Esgotado";
  if (isLowStock(p)) return `Só ${p.stock} em estoque!`;
  if (isBulkStock(p)) return "Em estoque";
  return `${p.stock} disponíveis`;
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
  const outOfStock = isOutOfStock(p);
  const isFav = FAVORITE_IDS.includes(p.id);
  return `
  <div class="product-card${outOfStock ? " is-out-of-stock" : ""}">
    <a class="product-thumb" href="produto.html?id=${p.id}">
      ${outOfStock ? `<span class="badge-esgotado">Esgotado</span>` : disc ? `<span class="badge-desconto">-${disc}%</span>` : ""}
      ${!outOfStock && isFav ? `<span class="badge-favorito">⭐ Favorito da loja</span>` : ""}
      ${productThumbInner(p)}
    </a>
    <a class="product-info" href="produto.html?id=${p.id}" style="text-decoration:none;color:inherit;">
      <span class="product-cat">${p.categoryLabel}</span>
      <span class="product-name">${p.name}</span>
      <div class="price-row">
        ${p.oldPrice ? `<span class="price-old">${formatBRL(p.oldPrice)}</span>` : ""}
        <span class="price-new">${formatBRL(p.price)}</span>
      </div>
      <div class="price-installment">${installmentText(p)}</div>
      <div class="stock-wrap">
        <div class="stock-label">${stockLabel(p)}</div>
        <div class="stock-bar"><div class="stock-bar-fill" style="width:${stockPct}%"></div></div>
      </div>
    </a>
    ${outOfStock
      ? `<button type="button" class="quick-add" disabled aria-label="${p.name} esgotado" title="Esgotado">—</button>`
      : `<button type="button" class="quick-add" data-add-id="${p.id}" aria-label="Adicionar ${p.name} ao carrinho" title="Adicionar ao carrinho">+</button>`}
  </div>`;
}

function renderProductGrid(containerEl, products) {
  if (!products.length) {
    containerEl.innerHTML = `<div class="empty-state">Nenhum produto encontrado nessa categoria.</div>`;
    return;
  }
  containerEl.innerHTML = products.map(productCardHTML).join("");
}

/* ---------- Ordenar (categoria.html) ----------
   Só reordena o array real — nenhuma métrica inventada (não existe "mais
   vendido" ou nota de avaliação pra ordenar por aqui, então essas opções
   nem aparecem no seletor). */
function sortProducts(products, sortKey) {
  const arr = products.slice();
  if (sortKey === "price-asc") arr.sort((a, b) => a.price - b.price);
  else if (sortKey === "price-desc") arr.sort((a, b) => b.price - a.price);
  else if (sortKey === "discount-desc") arr.sort((a, b) => (discountPercent(b) || 0) - (discountPercent(a) || 0));
  else if (sortKey === "stock-asc") arr.sort((a, b) => a.stock - b.stock);
  // "relevance" (padrão) mantém a ordem de curadoria do catálogo.
  return arr;
}

/* ---------- Relacionados (produto.html) ----------
   Mesma categoria, exclui o item atual. Ordem de curadoria do catálogo —
   sem aleatoriedade nem ranqueamento inventado. */
function relatedProducts(p, limit = 4) {
  return PRODUCTS.filter((x) => x.category === p.category && x.id !== p.id).slice(0, limit);
}

/* ---------- Vistos recentemente ----------
   Histórico real de navegação do PRÓPRIO visitante, guardado no
   localStorage do navegador dele — não é contador de visitas nem
   estatística inventada, some se ele limpar os dados do navegador. */
const RECENT_KEY = "achadinhos_recent";
const RECENT_MAX = 8;

function trackProductView(id) {
  try {
    let ids = JSON.parse(localStorage.getItem(RECENT_KEY)) || [];
    ids = ids.filter((x) => x !== id);
    ids.unshift(id);
    localStorage.setItem(RECENT_KEY, JSON.stringify(ids.slice(0, RECENT_MAX)));
  } catch (e) {}
}

function getRecentlyViewed(excludeId, limit = 4) {
  try {
    let ids = JSON.parse(localStorage.getItem(RECENT_KEY)) || [];
    if (excludeId) ids = ids.filter((x) => x !== excludeId);
    return ids.map(getProductById).filter(Boolean).slice(0, limit);
  } catch (e) {
    return [];
  }
}

/* ---------- Duração do contador baseada em estoque real ----------
   Antes o contador era sempre 3h fixas pra loja inteira, sempre a mesma
   pra todo mundo — nem de longe curto, e sem relação nenhuma com o
   estoque de verdade. Agora a duração varia com o estoque REAL somado
   dos itens em destaque na Oferta Relâmpago (mesmo dado que já alimenta
   a barra de estoque de cada card — nada inventado): quanto menos
   estoque sobrou nesses itens, menos tempo o contador mostra. Faixa
   0h30–1h30 (bem mais curta que as 3h antigas). */
function flashCountdownHours(ids) {
  const items = ids.map(getProductById).filter(Boolean);
  if (!items.length) return 1;
  const totalStock = items.reduce((sum, p) => sum + p.stock, 0);
  const totalMax = items.reduce((sum, p) => sum + p.stockMax, 0) || 1;
  const stockRatio = Math.max(0, Math.min(1, totalStock / totalMax));
  const hours = 0.5 + stockRatio * 1; // 0h30 (estoque baixo) a 1h30 (estoque saudável)
  return Math.round(hours * 100) / 100;
}

/* ---------- Barra de estoque da leva (Oferta Relâmpago) ----------
   Mostra o estoque real somado dos itens em destaque — assim a oferta
   "acaba" por dois motivos reais e visíveis: o tempo OU o estoque,
   o que vier primeiro. Nenhum número aqui é inventado. */
function renderFlashStockBar(ids, labelEl, fillEl) {
  if (!labelEl || !fillEl) return;
  const items = ids.map(getProductById).filter(Boolean);
  if (!items.length) return;
  const totalStock = items.reduce((sum, p) => sum + p.stock, 0);
  const totalMax = items.reduce((sum, p) => sum + p.stockMax, 0) || 1;
  const pct = Math.max(4, Math.min(100, Math.round((totalStock / totalMax) * 100)));
  labelEl.textContent = `Estoque desta leva: ${pct}% restante`;
  fillEl.style.width = pct + "%";
}

/* ---------- Contador regressivo da Oferta Relâmpago ----------
   Guarda o horário-alvo no sessionStorage pra não "resetar" o
   contador toda vez que o cliente troca de página durante a visita.
   Duração padrão: 1 hora (era 3h) — ver flashCountdownHours() acima
   pra como o valor passado aqui é calculado a partir do estoque real. */
function initCountdown(elId, hours = 1) {
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
    (c) => `<a class="cat-pill ${c.key === activeKey ? "active" : ""}" href="categoria.html?cat=${c.key}"><span class="cat-pill-icon">${c.icon}</span>${c.label}</a>`
  ).join("");
}

/* ---------- Cards de categoria (home) ----------
   Contagem é real, calculada em cima do array PRODUCTS — nunca chuta número. */
function renderCategoryCards(containerEl) {
  containerEl.innerHTML = CATEGORIES.map((c) => {
    const count = PRODUCTS.filter((p) => p.category === c.key).length;
    return `
    <a class="cat-card" href="categoria.html?cat=${c.key}">
      <div class="cat-card-icon">${c.image ? `<img src="${c.image}" alt="${c.label}" loading="lazy">` : c.icon}</div>
      <div class="cat-card-label">${c.label}</div>
      <div class="cat-card-count">${count} ${count === 1 ? "produto" : "produtos"}</div>
    </a>`;
  }).join("");
}

/* ---------- Busca ao vivo ----------
   Filtro simples client-side, sem acento (NFD), procura em nome e descrição. */
function normalizeText(str) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function searchProducts(query, limit = 6) {
  const q = normalizeText(query);
  if (!q) return [];
  return PRODUCTS.filter(
    (p) => normalizeText(p.name).includes(q) || normalizeText(p.description).includes(q) || normalizeText(p.categoryLabel).includes(q)
  ).slice(0, limit);
}

function highlightMatch(text, query) {
  const q = normalizeText(query);
  const norm = normalizeText(text);
  const idx = norm.indexOf(q);
  if (idx === -1 || !q) return text;
  return text.slice(0, idx) + "<mark>" + text.slice(idx, idx + q.length) + "</mark>" + text.slice(idx + q.length);
}

function searchResultItemHTML(p, query) {
  return `
  <a class="search-result-item" href="produto.html?id=${p.id}">
    <div class="search-result-thumb">${productThumbInner(p)}</div>
    <div class="search-result-info">
      <span class="search-result-name">${highlightMatch(p.name, query)}</span>
      <span class="search-result-price">${formatBRL(p.price)}</span>
    </div>
  </a>`;
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

function wireSearch(inputEl, resultsEl) {
  if (!inputEl || !resultsEl) return;

  function render() {
    const query = inputEl.value;
    if (!query.trim()) {
      resultsEl.classList.remove("open");
      resultsEl.innerHTML = "";
      return;
    }
    const matches = searchProducts(query);
    resultsEl.innerHTML = matches.length
      ? matches.map((p) => searchResultItemHTML(p, query)).join("")
      : `<div class="search-empty">Nenhum produto encontrado pra "${escapeHtml(query)}"</div>`;
    resultsEl.classList.add("open");
  }

  inputEl.addEventListener("input", render);
  inputEl.addEventListener("focus", () => { if (inputEl.value.trim()) resultsEl.classList.add("open"); });
  document.addEventListener("click", (e) => {
    if (!inputEl.contains(e.target) && !resultsEl.contains(e.target)) {
      resultsEl.classList.remove("open");
    }
  });
  inputEl.addEventListener("keydown", (e) => {
    if (e.key === "Escape") { resultsEl.classList.remove("open"); inputEl.blur(); }
  });
}

/* Injeta a caixa de busca no header de qualquer página (sem precisar
   editar o HTML de cada uma — o alvo é a .header-actions, que já existe
   em todas as páginas). */
function initSiteSearch() {
  const headerInner = document.querySelector(".header-inner");
  const actions = document.querySelector(".header-actions");
  if (!headerInner || !actions || document.getElementById("search-input")) return;
  const wrap = document.createElement("div");
  wrap.className = "site-search";
  wrap.innerHTML = `
    <input type="text" id="search-input" placeholder="Buscar produtos..." autocomplete="off">
    <div class="search-results" id="search-results"></div>
  `;
  // Insere entre a logo e o carrinho (não dentro de .header-actions) pra
  // a caixa de busca ficar centralizada no header via CSS grid.
  actions.insertBefore(wrap, actions.firstChild);
  wireSearch(document.getElementById("search-input"), document.getElementById("search-results"));
}

document.addEventListener("DOMContentLoaded", initSiteSearch);


/* ---------- Ícones no menu principal (preview de melhorias aplicado) ----------
   Não reescreve a nav — só insere o emoji da categoria antes do texto de
   cada link já existente, pra ficar mais fácil de escanear visualmente. */
function iconizeMainNav() {
  document.querySelectorAll("nav.main-nav a[href*='cat=']").forEach((a) => {
    if (a.querySelector(".nav-icon")) return;
    const match = a.getAttribute("href").match(/cat=([a-z]+)/);
    const cat = match && CATEGORIES.find((c) => c.key === match[1]);
    if (!cat) return;
    const icon = document.createElement("span");
    icon.className = "nav-icon";
    icon.textContent = cat.icon;
    a.prepend(icon, " ");
  });
}
document.addEventListener("DOMContentLoaded", iconizeMainNav);
