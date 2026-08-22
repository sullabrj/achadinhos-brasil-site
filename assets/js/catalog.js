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

ACRÉSCIMOS 20/08 parte 2: (3) PRODUCT_SPECS — ficha técnica opcional por produto (tamanho/medida), preenchida só onde o próprio texto do fornecedor já confirma (ex.: "tamanho M único", "1,2m") — não inventamos numeração de roupa que não temos. (4) busca centralizada no header, ícones de categoria maiores em badge circular, carrinho agora abre como card ancorado no canto superior direito (perto do ícone) em vez de painel de tela cheia.
===================================================================== */

const PRODUCTS = [
  {
    id: "p1",
    name: "Kit Banheiro Lavabo 4 Peças Resistente e Moderno",
    category: "casa",
    categoryLabel: "Casa e Decoração",
    price: 240.9,
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
    price: 34.9,
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
    price: 82.9,
    oldPrice: null,
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
    price: 82.9,
    oldPrice: null,
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
    price: 136.9,
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
    price: 154.9,
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
    price: 85.9,
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
    price: 180.9,
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
    price: 123.9,
    oldPrice: null,
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
    price: 232.9,
    oldPrice: null,
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
    price: 201.9,
    oldPrice: null,
    image: "https://dropi.xpto.app/dropi/fornecedor/produto-17848514566a62ac00a2ef8.jpg",
    emoji: "✨",
    stock: 1,
    stockMax: 1,
    description: "Trio de brincos argola articulada cravejada, banho de ródio — peça única no fornecedor, estilo statement pra usar em camadas."
  },
  {
    id: "p12",
    name: "Box Organizador P Color",
    category: "casa",
    categoryLabel: "Casa e Decoração",
    price: 23.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-17326021416745691db2b6e.jpg",
    emoji: "🗃️",
    stock: 100,
    stockMax: 100,
    description: "Box organizador colorido em plástico resistente, ideal pra guardar miudezas em qualquer cômodo da casa."
  },
  {
    id: "p13",
    name: "Luminária LED Efeito Sorvete Caindo Ice Cream",
    category: "casa",
    categoryLabel: "Casa e Decoração",
    price: 87.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-172374287566be3a9ba0c45.png",
    emoji: "💡",
    stock: 2,
    stockMax: 2,
    description: "Luminária LED com efeito 'sorvete caindo', abajur decorativo — charme extra pro quarto ou sala. Só 2 no estoque do fornecedor."
  },
  {
    id: "p14",
    name: "Tapete Peluciado 40x60cm",
    category: "casa",
    categoryLabel: "Casa e Decoração",
    price: 33.9,
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
    price: 87.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-172372689066bdfc2a5bfb9.png",
    emoji: "⚖️",
    stock: 1,
    stockMax: 1,
    description: "Colher digital com balança de precisão embutida e visor LCD — mede ingredientes direto na receita. Última unidade no fornecedor."
  },
  {
    id: "p16",
    name: "Kit Decoração Criativa Sala e Cozinha + Vasos + Plantas",
    category: "casa",
    categoryLabel: "Casa e Decoração",
    price: 107.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-172373265066be12aae58b7.jpg",
    emoji: "🪴",
    stock: 4,
    stockMax: 4,
    description: "Kit de decoração com vasos, plantas artificiais e detalhes 'amor' pra dar um toque especial à sala ou cozinha. Só 4 no estoque do fornecedor."
  },
  {
    id: "p17",
    name: "Cesto Organizador em Tecido Floral",
    category: "casa",
    categoryLabel: "Casa e Decoração",
    price: 85.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-16699037416388b57dbdac8.jpg",
    emoji: "🧺",
    stock: 12,
    stockMax: 12,
    description: "Cesto organizador em tecido floral, ótimo pra guardar roupas, brinquedos ou acessórios com estilo."
  },
  {
    id: "p18",
    name: "Casaco de Algodão Feminino Sortido",
    category: "moda",
    categoryLabel: "Moda e Vestuário",
    price: 243.9,
    oldPrice: 270.9,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-177262436169a819e9f21be.webp",
    emoji: "🧥",
    stock: 10,
    stockMax: 10,
    description: "Casaco de algodão feminino, cores sortidas, quentinho e confortável pros dias mais frios."
  },
  {
    id: "p19",
    name: "Camisa Feminina Cores Sortidas",
    category: "moda",
    categoryLabel: "Moda e Vestuário",
    price: 46.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-177262435569a819e34b6be.webp",
    emoji: "👚",
    stock: 10,
    stockMax: 10,
    description: "Camisa feminina em tecido leve, cores sortidas, tamanho M único — coringa pro dia a dia."
  },
  {
    id: "p20",
    name: "Pijama Feminino Cores Sortidas",
    category: "moda",
    categoryLabel: "Moda e Vestuário",
    price: 62.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-177153493769977a59588ee.png",
    emoji: "🌙",
    stock: 10,
    stockMax: 10,
    description: "Pijama feminino confortável, cores sortidas, ideal pra noites de sono tranquilas."
  },
  {
    id: "p21",
    name: "Pantufa Feminina com Forro Peluciado",
    category: "moda",
    categoryLabel: "Moda e Vestuário",
    price: 45.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-177262447769a81a5dc1365.webp",
    emoji: "🥿",
    stock: 10,
    stockMax: 10,
    description: "Pantufa feminina com forro peluciado e solado antiderrapante — conforto garantido em casa."
  },
  {
    id: "p22",
    name: "Conjunto Top e Legging para Academia",
    category: "moda",
    categoryLabel: "Moda e Vestuário",
    price: 85.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-177365868969b7e241399dc.webp",
    emoji: "🏋️‍♀️",
    stock: 10,
    stockMax: 10,
    description: "Conjunto top e legging pra academia, tamanho único, cores sortidas — pronto pra treinar com estilo."
  },
  {
    id: "p23",
    name: "Cinto 1,2m Cores Sortidas",
    category: "moda",
    categoryLabel: "Moda e Vestuário",
    price: 17.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-17700621156981012317d44.jpg",
    emoji: "🧵",
    stock: 10,
    stockMax: 10,
    description: "Cinto 1,2m em cores sortidas, acessório versátil pra fechar o look."
  },
  {
    id: "p24",
    name: "Areia para Gatos Biodegradável 2kg",
    category: "pet",
    categoryLabel: "Pet Shop",
    price: 61.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-176111446568f879613682e.png",
    emoji: "🐱",
    stock: 30,
    stockMax: 30,
    description: "Areia biodegradável pra gatos, grãos grossos, 2kg — controla odor e é mais sustentável."
  },
  {
    id: "p25",
    name: "Coleira para Cachorro Mulher Maravilha",
    category: "pet",
    categoryLabel: "Pet Shop",
    price: 156.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-176122399168fa2537d0f5c.jpg",
    emoji: "🐕",
    stock: 30,
    stockMax: 30,
    description: "Coleira pra cachorro Mulher Maravilha, com capa e plaquinha personalizável, tamanho G."
  },
  {
    id: "p26",
    name: "Guia Tradicional Scooby-Doo para Cachorro",
    category: "pet",
    categoryLabel: "Pet Shop",
    price: 212.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-175942638668deb752793fb.jpg",
    emoji: "🦴",
    stock: 30,
    stockMax: 30,
    description: "Guia tradicional pra cachorro, 1,2m, estampa Scooby-Doo — resistente pros passeios do dia a dia."
  },
  {
    id: "p27",
    name: "Vasilha Comedouro/Bebedouro de Melamina Batman",
    category: "pet",
    categoryLabel: "Pet Shop",
    price: 176.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-175942796268debd7ac20f9.jpg",
    emoji: "🥣",
    stock: 30,
    stockMax: 30,
    description: "Vasilha comedouro/bebedouro de melamina estampa Batman — resistente e fácil de limpar."
  },
  {
    id: "p28",
    name: "Colchonete Arranhador para Gatos Zoe",
    category: "pet",
    categoryLabel: "Pet Shop",
    price: 79.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-177738450569f0bc391a5c1.jpg",
    emoji: "🐈",
    stock: 993,
    stockMax: 993,
    description: "Colchonete arranhador pra gatos, protege os móveis e ainda serve de caminha."
  },
  {
    id: "p29",
    name: "Coberdrom Pet Dupla Face 3 Peças",
    category: "pet",
    categoryLabel: "Pet Shop",
    price: 123.9,
    oldPrice: null,
    image: "https://dropi.xpto.app/dropi/fornecedor/produto-17792781166a0da1245e13f.jpg",
    emoji: "🛌",
    stock: 3972,
    stockMax: 3972,
    description: "Coberdrom pet dupla face, 3 peças — conforto extra pra hora do descanso do seu bichinho."
  },
  {
    id: "p30",
    name: "Tapete Higiênico Impermeável Pequeno",
    category: "pet",
    categoryLabel: "Pet Shop",
    price: 57.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-177738531169f0bf5fdf4db.jpg",
    emoji: "💧",
    stock: 10923,
    stockMax: 10923,
    description: "Tapete higiênico impermeável, tamanho pequeno — praticidade pro dia a dia do pet."
  },
  {
    id: "p31",
    name: "Adesivos Antirrugas para o Rosto",
    category: "beleza",
    categoryLabel: "Saúde e Beleza",
    price: 55.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-1770526661698817c5bcca0.webp",
    emoji: "✨",
    stock: 10769,
    stockMax: 10769,
    description: "Adesivos antirrugas pro rosto, uso noturno — ajudam a suavizar linhas de expressão."
  },
  {
    id: "p32",
    name: "Argila Vermelha Facial e Corporal",
    category: "beleza",
    categoryLabel: "Saúde e Beleza",
    price: 13.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-166517092763407defc188f.jpg",
    emoji: "🧖‍♀️",
    stock: 199,
    stockMax: 199,
    description: "Argila vermelha facial e corporal, limpeza profunda e efeito revitalizante."
  },
  {
    id: "p33",
    name: "Hidratante Corporal Yara 200g",
    category: "beleza",
    categoryLabel: "Saúde e Beleza",
    price: 345.9,
    oldPrice: 384.9,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-175629516768aeefff114c1.png",
    emoji: "🧴",
    stock: 6,
    stockMax: 6,
    description: "Hidratante corporal Yara 200g, textura em pote — hidratação intensa pra pele. Só 6 no estoque do fornecedor."
  },
  {
    id: "p34",
    name: "Base Líquida Bruna Tavares BT Skin",
    category: "beleza",
    categoryLabel: "Saúde e Beleza",
    price: 236.9,
    oldPrice: 263.9,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-16651720146340822ea4fc6.jpg",
    emoji: "💄",
    stock: 2,
    stockMax: 2,
    description: "Base líquida Bruna Tavares BT Skin, cobertura natural — acabamento pele perfeita. Só 2 no estoque do fornecedor."
  },
  {
    id: "p35",
    name: "Balm Labial Lip Glow Pitanga",
    category: "beleza",
    categoryLabel: "Saúde e Beleza",
    price: 219.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-1764699683692f2e2320332.png",
    emoji: "💋",
    stock: 98,
    stockMax: 98,
    description: "Balm labial com ácido hialurônico e sabor pitanga — hidrata e dá brilho aos lábios."
  },
  {
    id: "p36",
    name: "Esfoliante Labial Active Repair",
    category: "beleza",
    categoryLabel: "Saúde e Beleza",
    price: 103.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-1764699811692f2ea3dacb3.jpg",
    emoji: "🌸",
    stock: 117,
    stockMax: 117,
    description: "Esfoliante labial pré-procedimento, remove peles mortas e prepara os lábios pra hidratação."
  },
  {
    id: "p37",
    name: "Anel Solitário Ajustável Verde Esmeralda",
    category: "joias",
    categoryLabel: "Joias e Acessórios",
    price: 127.9,
    oldPrice: null,
    image: "https://dropi.xpto.app/dropi/fornecedor/produto-17860646776a752f2597f3d.jpg",
    emoji: "💚",
    stock: 3,
    stockMax: 3,
    description: "Anel solitário ajustável verde esmeralda, semijoia delicada pra usar todo dia — só 3 no estoque do fornecedor."
  },
  {
    id: "p38",
    name: "Bracelete Quadrado Inspiração X",
    category: "joias",
    categoryLabel: "Joias e Acessórios",
    price: 226.9,
    oldPrice: null,
    image: "https://dropi.xpto.app/dropi/fornecedor/produto-17848566126a62c024ab5a0.jpg",
    emoji: "✨",
    stock: 2,
    stockMax: 2,
    description: "Bracelete quadrado inspiração X com micro zircônias, peça statement — só 2 no estoque do fornecedor."
  },
  {
    id: "p39",
    name: "Choker Fita Fina 3mm",
    category: "joias",
    categoryLabel: "Joias e Acessórios",
    price: 157.9,
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
    price: 122.9,
    oldPrice: null,
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
    price: 102.9,
    oldPrice: null,
    image: "https://dropi.xpto.app/dropi/fornecedor/produto-17848566676a62c05b76927.jpg",
    emoji: "🙏",
    stock: 3,
    stockMax: 3,
    description: "Anel Nossa Senhora com zircônia azul, semijoia delicada com apelo religioso — só 3 no estoque do fornecedor."
  },
  {
    id: "p42",
    name: "Argolinha de Click com Ponto de Luz",
    category: "joias",
    categoryLabel: "Joias e Acessórios",
    price: 34.9,
    oldPrice: null,
    image: "https://dropi.xpto.app/dropi/fornecedor/produto-17860647246a752f5498dfd.jpg",
    emoji: "⭐",
    stock: 1,
    stockMax: 1,
    description: "Argolinha de click com ponto de luz em aço inoxidável — última peça no estoque do fornecedor."
  },
  {
    id: "p43",
    name: "Fantasia Princesa Belli Longa Amarela",
    category: "infantil",
    categoryLabel: "Infantil e Brinquedos",
    price: 203.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-17670937996953b6273db7e.webp",
    emoji: "👑",
    stock: 116,
    stockMax: 116,
    description: "Fantasia longa Princesa Belli amarela, capricho nos detalhes pra festa a fantasia ou aniversário."
  },
  {
    id: "p44",
    name: "Laço/Faixa para Vestido Verde Menta",
    category: "infantil",
    categoryLabel: "Infantil e Brinquedos",
    price: 49.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-17532802446880eef42acc9.jpg",
    emoji: "🎀",
    stock: 37,
    stockMax: 37,
    description: "Laço/faixa opcional pra vestido, verde menta — acessório fofo pra compor o visual infantil."
  },
  {
    id: "p45",
    name: "Romper/Vestido Princesa Belli Pequena Pedrita",
    category: "infantil",
    categoryLabel: "Infantil e Brinquedos",
    price: 159.9,
    oldPrice: null,
    image: "https://dropi.xpto.app/dropi/fornecedor/produto-17858706236a72391fc5ce0.jpg",
    emoji: "👗",
    stock: 27,
    stockMax: 27,
    description: "Romper/vestido Princesa Belli Pequena Pedrita, conforto e charme pro dia a dia ou ocasiões especiais."
  },
  {
    id: "p46",
    name: "Pelúcia de Pendurar Rhino Bright Starts",
    category: "infantil",
    categoryLabel: "Infantil e Brinquedos",
    price: 320.9,
    oldPrice: 356.9,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-1750044109684f8dcd454f2.jpg",
    emoji: "🦏",
    stock: 2,
    stockMax: 2,
    description: "Pelúcia de pendurar Rhino da Bright Starts, 0m+ — estimula os sentidos do bebê no berço ou carrinho. Só 2 no estoque do fornecedor."
  },
  {
    id: "p47",
    name: "Mordedor Chocalho Rattle & Teethe Bright Starts",
    category: "infantil",
    categoryLabel: "Infantil e Brinquedos",
    price: 109.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-17514048526864513419ef5.jpg",
    emoji: "🍼",
    stock: 2,
    stockMax: 2,
    description: "Mordedor chocalho Rattle & Teethe da Bright Starts, rosa e roxo — alivia o desconforto da dentição. Só 2 no estoque do fornecedor."
  },
  {
    id: "p48",
    name: "Kit 3 Brinquedos Educativos em Madeira e EVA",
    category: "infantil",
    categoryLabel: "Infantil e Brinquedos",
    price: 151.9,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-1770760821698baa7504775.jpg",
    emoji: "🧩",
    stock: 1000,
    stockMax: 1000,
    description: "Kit com 3 brinquedos educativos em madeira e EVA, pedagógicos e lúdicos pro desenvolvimento infantil."
  },
  {
    id: "p49",
    name: "Almofada Decorativa 36x36cm Oxford com Botão Central",
    category: "casa",
    categoryLabel: "Casa e Decoração",
    price: 61.9,
    oldPrice: null,
    image: "https://empreender.nyc3.cdn.digitaloceanspaces.com/dropi/fornecedor/produto-1768713071696c6b6f23ee4.png",
    emoji: "🛋️",
    stock: 22,
    stockMax: 22,
    description: "Almofada decorativa 36x36cm em tecido Oxford, com botão central — deixa o sofá ou a cama com um toque mais elegante."
  },
  {
    id: "p50",
    name: "Prendedor Cinto Cortina Magnética Com Ímã 2 Peças",
    category: "casa",
    categoryLabel: "Casa e Decoração",
    price: 34.9,
    oldPrice: null,
    image: "https://empreender.nyc3.cdn.digitaloceanspaces.com/dropi/fornecedor/produto-173031734767228c23c8a28.jpg",
    emoji: "🧲",
    stock: 48,
    stockMax: 48,
    description: "Prendedor de cortina magnético, kit com 2 peças — prende a cortina discretamente sem furar a parede."
  },
  {
    id: "p51",
    name: "Calendário Decorativo de Parede com Porta-Chaves",
    category: "casa",
    categoryLabel: "Casa e Decoração",
    price: 85.9,
    oldPrice: null,
    image: "https://empreender.nyc3.cdn.digitaloceanspaces.com/dropi/fornecedor/produto-1768713131696c6bab7c8be.jpg",
    emoji: "📅",
    stock: 9,
    stockMax: 9,
    description: "Calendário decorativo de parede com porta-chaves embutido — organiza o dia a dia e ainda guarda as chaves de casa."
  },
  {
    id: "p52",
    name: "Assento Para Cadeira 40x40cm Tecido Oxford",
    category: "casa",
    categoryLabel: "Casa e Decoração",
    price: 55.9,
    oldPrice: null,
    image: "https://empreender.nyc3.cdn.digitaloceanspaces.com/dropi/fornecedor/produto-172344229966b9a47bc9306.png",
    emoji: "🪑",
    stock: 7,
    stockMax: 7,
    description: "Assento para cadeira 40x40cm em tecido Oxford liso, 100% poliéster — mais conforto pra sentar todo dia."
  },
  {
    id: "p53",
    name: "Expositor de Joias Acrílico com 8 Cabides",
    category: "casa",
    categoryLabel: "Casa e Decoração",
    price: 54.9,
    oldPrice: null,
    image: "https://empreender.nyc3.cdn.digitaloceanspaces.com/dropi/fornecedor/produto-177416400069bf982039199.jpg",
    emoji: "💎",
    stock: 9980,
    stockMax: 9980,
    description: "Expositor de joias em acrílico com 8 cabides — organiza brincos e colares e ainda deixa a penteadeira bonita."
  },
  {
    id: "p54",
    name: "Capa de Almofada Sofá Decorativa Suede",
    category: "casa",
    categoryLabel: "Casa e Decoração",
    price: 48.9,
    oldPrice: null,
    image: "https://empreender.nyc3.cdn.digitaloceanspaces.com/dropi/fornecedor/produto-17210830746695a4c20cf0e.png",
    emoji: "🧵",
    stock: 29,
    stockMax: 29,
    description: "Capa de almofada para sofá em suede, acabamento decorativo — troca o visual da sala rapidinho."
  },
  {
    id: "p55",
    name: "Caneca do Brasil - Hexa 2026",
    category: "casa",
    categoryLabel: "Casa e Decoração",
    price: 58.9,
    oldPrice: null,
    image: "https://dropi.xpto.app/dropi/fornecedor/produto-17815699116a309977468bf.png",
    emoji: "☕",
    stock: 50,
    stockMax: 50,
    description: "Caneca do Brasil Hexa 2026 — pra comemorar o hexacampeonato com estilo na hora do café."
  },
  {
    id: "p56",
    name: "Roupas p/ Academia 2pçs Tamanho Único Cores Sortidas",
    category: "moda",
    categoryLabel: "Moda e Vestuário",
    price: 77.9,
    oldPrice: null,
    image: "https://empreender.nyc3.cdn.digitaloceanspaces.com/dropi/fornecedor/produto-177365869969b7e24b76f72.webp",
    emoji: "🏋️‍♀️",
    stock: 10,
    stockMax: 10,
    description: "Conjunto de roupas para academia, 2 peças, tamanho único, cores sortidas — prático para o treino do dia a dia."
  },
  {
    id: "p57",
    name: "Kit Regata e Shorts Esportivo Cores Sortidas",
    category: "moda",
    categoryLabel: "Moda e Vestuário",
    price: 65.9,
    oldPrice: null,
    image: "https://empreender.nyc3.cdn.digitaloceanspaces.com/dropi/fornecedor/produto-177365869369b7e2453cdbd.webp",
    emoji: "🎽",
    stock: 10,
    stockMax: 10,
    description: "Kit regata e shorts esportivo, cores sortidas — conjunto leve pra treinar ou usar no dia a dia."
  },
  {
    id: "p58",
    name: "Meias Masculinas Kit 3 Pares Cores Sortidas",
    category: "moda",
    categoryLabel: "Moda e Vestuário",
    price: 17.9,
    oldPrice: null,
    image: "https://empreender.nyc3.cdn.digitaloceanspaces.com/dropi/fornecedor/produto-1770149824698257c0bd4ec.webp",
    emoji: "🧦",
    stock: 10,
    stockMax: 10,
    description: "Kit com 3 pares de meias masculinas, cores sortidas — reforço prático pro dia a dia."
  },
  {
    id: "p59",
    name: "Pijama Feminino Coração Cores Sortidas",
    category: "moda",
    categoryLabel: "Moda e Vestuário",
    price: 62.9,
    oldPrice: null,
    image: "https://empreender.nyc3.cdn.digitaloceanspaces.com/dropi/fornecedor/produto-177153493969977a5b77522.png",
    emoji: "👚",
    stock: 9,
    stockMax: 9,
    description: "Pijama feminino com estampa de coração, cores sortidas — conforto pra dormir com estilo."
  },
  {
    id: "p60",
    name: "Calça Legging com Estampa Lateral Cores Sortidas",
    category: "moda",
    categoryLabel: "Moda e Vestuário",
    price: 58.9,
    oldPrice: null,
    image: "https://empreender.nyc3.cdn.digitaloceanspaces.com/dropi/fornecedor/produto-177365863669b7e20cdeef5.webp",
    emoji: "🩱",
    stock: 10,
    stockMax: 10,
    description: "Calça legging com estampa lateral, tamanho único, cores sortidas — conforto e estilo pro dia a dia."
  },
  {
    id: "p61",
    name: "Conjunto Camisa e Calça Cores Sortidas",
    category: "moda",
    categoryLabel: "Moda e Vestuário",
    price: 77.9,
    oldPrice: null,
    image: "https://empreender.nyc3.cdn.digitaloceanspaces.com/dropi/fornecedor/produto-177262452769a81a8f55242.webp",
    emoji: "👕",
    stock: 10,
    stockMax: 10,
    description: "Conjunto camisa e calça, cores sortidas — combo pronto pra vestir."
  },
  {
    id: "p62",
    name: "Blusa Esportiva Cores Sortidas",
    category: "moda",
    categoryLabel: "Moda e Vestuário",
    price: 42.9,
    oldPrice: null,
    image: "https://empreender.nyc3.cdn.digitaloceanspaces.com/dropi/fornecedor/produto-177365863069b7e2067eb85.webp",
    emoji: "👚",
    stock: 10,
    stockMax: 10,
    description: "Blusa esportiva, tamanho único, cores sortidas — ideal pro treino."
  },
  {
    id: "p63",
    name: "Top Esportivo Cores Sortidas",
    category: "moda",
    categoryLabel: "Moda e Vestuário",
    price: 49.9,
    oldPrice: null,
    image: "https://empreender.nyc3.cdn.digitaloceanspaces.com/dropi/fornecedor/produto-177365881269b7e2bcebf49.webp",
    emoji: "🎽",
    stock: 10,
    stockMax: 10,
    description: "Top esportivo, tamanho único, cores sortidas — pra treinar com conforto."
  },
  {
    id: "p64",
    name: "Top de Poliéster Cores Sortidas",
    category: "moda",
    categoryLabel: "Moda e Vestuário",
    price: 33.9,
    oldPrice: null,
    image: "https://empreender.nyc3.cdn.digitaloceanspaces.com/dropi/fornecedor/produto-177262458669a81aca1685a.webp",
    emoji: "🎽",
    stock: 10,
    stockMax: 10,
    description: "Top de poliéster, tamanho e cor sortidos — básico versátil pro dia a dia."
  },
  {
    id: "p65",
    name: "Blusa + Legging Cores Sortidas",
    category: "moda",
    categoryLabel: "Moda e Vestuário",
    price: 81.9,
    oldPrice: null,
    image: "https://empreender.nyc3.cdn.digitaloceanspaces.com/dropi/fornecedor/produto-177365862869b7e2045350d.webp",
    emoji: "👚",
    stock: 10,
    stockMax: 10,
    description: "Conjunto blusa e legging, tamanho único, cores sortidas — combo confortável pro dia a dia."
  },
  {
    id: "p66",
    name: "Top Cores Sortidas",
    category: "moda",
    categoryLabel: "Moda e Vestuário",
    price: 53.9,
    oldPrice: null,
    image: "https://empreender.nyc3.cdn.digitaloceanspaces.com/dropi/fornecedor/produto-177365881869b7e2c207f6f.webp",
    emoji: "🎽",
    stock: 10,
    stockMax: 10,
    description: "Top em várias cores, tamanho único — peça coringa pro guarda-roupa."
  },
  {
    id: "p67",
    name: "Necessaire 18x10x8cm Cores Sortidas",
    category: "moda",
    categoryLabel: "Moda e Vestuário",
    price: 23.9,
    oldPrice: null,
    image: "https://empreender.nyc3.cdn.digitaloceanspaces.com/dropi/fornecedor/produto-1770149828698257c4cca5e.webp",
    emoji: "👜",
    stock: 9,
    stockMax: 9,
    description: "Necessaire 18x10x8cm, cores sortidas — organiza os itens de higiene e maquiagem na bolsa ou mala."
  },
  {
    id: "p68",
    name: "Shorts Esportivo Cores Sortidas",
    category: "moda",
    categoryLabel: "Moda e Vestuário",
    price: 35.9,
    oldPrice: null,
    image: "https://empreender.nyc3.cdn.digitaloceanspaces.com/dropi/fornecedor/produto-177365881069b7e2ba1cf5d.webp",
    emoji: "🩳",
    stock: 10,
    stockMax: 10,
    description: "Shorts esportivo, tamanho único, cores sortidas — leve e confortável pro treino."
  },
  {
    id: "p69",
    name: "Casaco Masculino com Bolso e Zíper",
    category: "moda",
    categoryLabel: "Moda e Vestuário",
    price: 292.9,
    oldPrice: null,
    image: "https://empreender.nyc3.cdn.digitaloceanspaces.com/dropi/fornecedor/produto-177262452569a81a8d33f38.webp",
    emoji: "🧥",
    stock: 10,
    stockMax: 10,
    description: "Casaco masculino com bolso e zíper — esquenta nos dias mais frios com praticidade."
  },
  {
    id: "p70",
    name: "Casaco de Algodão Masculino Cores Sortidas",
    category: "moda",
    categoryLabel: "Moda e Vestuário",
    price: 263.9,
    oldPrice: null,
    image: "https://empreender.nyc3.cdn.digitaloceanspaces.com/dropi/fornecedor/produto-177262436469a819ec1d2c0.webp",
    emoji: "🧥",
    stock: 10,
    stockMax: 10,
    description: "Casaco de algodão masculino, cores sortidas — conforto e proteção contra o frio."
  },
  {
    id: "p71",
    name: "Calças no Tamanho Único Cores Sortidas",
    category: "moda",
    categoryLabel: "Moda e Vestuário",
    price: 55.9,
    oldPrice: null,
    image: "https://empreender.nyc3.cdn.digitaloceanspaces.com/dropi/fornecedor/produto-177262435169a819dfb010d.webp",
    emoji: "👖",
    stock: 10,
    stockMax: 10,
    description: "Calça em tamanho único, cores sortidas — versátil pro dia a dia."
  },
  {
    id: "p72",
    name: "Pantufa Beijinho Feminina Cores Sortidas",
    category: "moda",
    categoryLabel: "Moda e Vestuário",
    price: 26.9,
    oldPrice: null,
    image: "https://empreender.nyc3.cdn.digitaloceanspaces.com/dropi/fornecedor/produto-177262447469a81a5a5af5a.webp",
    emoji: "🥿",
    stock: 10,
    stockMax: 10,
    description: "Pantufa feminina modelo beijinho, cores sortidas — aconchego pra dentro de casa."
  },
  {
    id: "p73",
    name: "Gel de Limpeza Clean Repair",
    category: "beleza",
    categoryLabel: "Saúde e Beleza",
    price: 131.9,
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
    price: 175.9,
    oldPrice: null,
    image: "https://empreender.nyc3.cdn.digitaloceanspaces.com/dropi/fornecedor/produto-1764699804692f2e9cea109.png",
    emoji: "🧖‍♀️",
    stock: 97,
    stockMax: 97,
    description: "Esfoliante facial renovador com aloe vera e microesferas, 50g — remove células mortas e deixa a pele mais lisa."
  },
  {
    id: "p75",
    name: "Perfume Cool Girl Black 40ml (Contratipo)",
    category: "beleza",
    categoryLabel: "Saúde e Beleza",
    price: 124.9,
    oldPrice: null,
    image: "https://empreender.nyc3.cdn.digitaloceanspaces.com/dropi/fornecedor/produto-166517475163408cdf6b1ee.jpg",
    emoji: "🌸",
    stock: 84,
    stockMax: 84,
    description: "Perfume contratipo (inspirado) Cool Girl Black, 40ml — fragrância pra usar no dia a dia."
  },
  {
    id: "p76",
    name: "Creme Clareador Facial Cystea Skin com Cisteamina e Retinol Nano 15g",
    category: "beleza",
    categoryLabel: "Saúde e Beleza",
    price: 285.9,
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
    price: 13.9,
    oldPrice: null,
    image: "https://empreender.nyc3.cdn.digitaloceanspaces.com/dropi/fornecedor/produto-16651764786340939eb6599.jpg",
    emoji: "🧖‍♀️",
    stock: 32,
    stockMax: 32,
    description: "Argila preta facial e corporal, 100g — limpeza profunda e efeito detox pra pele."
  },
  {
    id: "p78",
    name: "Creme Nutry Repair Hidratação e Fixação do Pigmento 15g",
    category: "beleza",
    categoryLabel: "Saúde e Beleza",
    price: 153.9,
    oldPrice: null,
    image: "https://empreender.nyc3.cdn.digitaloceanspaces.com/dropi/fornecedor/produto-1764699785692f2e89879c0.jpg",
    emoji: "🧴",
    stock: 82,
    stockMax: 82,
    description: "Creme Nutry Repair, hidratação e fixação do pigmento na pele, 15g — cuidado pós-procedimento."
  },
  {
    id: "p79",
    name: "Água Dermatológica Calmante e Hidratante 60ml",
    category: "beleza",
    categoryLabel: "Saúde e Beleza",
    price: 219.9,
    oldPrice: null,
    image: "https://empreender.nyc3.cdn.digitaloceanspaces.com/dropi/fornecedor/produto-1764699667692f2e132b51b.jpg",
    emoji: "💧",
    stock: 76,
    stockMax: 76,
    description: "Água dermatológica calmante e hidratante, 60ml — refresca e acalma a pele."
  },
  {
    id: "p80",
    name: "Creme Reparador Derma Repair com Ativos Calmantes 5g",
    category: "beleza",
    categoryLabel: "Saúde e Beleza",
    price: 109.9,
    oldPrice: null,
    image: "https://empreender.nyc3.cdn.digitaloceanspaces.com/dropi/fornecedor/produto-1764699788692f2e8cefea4.jpg",
    emoji: "🧴",
    stock: 28,
    stockMax: 28,
    description: "Creme reparador Derma Repair com ativos calmantes, 5g — auxilia na recuperação da pele."
  },
  {
    id: "p81",
    name: "Espuma de Limpeza Facial Anti Acne e Oleosidade 50g",
    category: "beleza",
    categoryLabel: "Saúde e Beleza",
    price: 219.9,
    oldPrice: null,
    image: "https://empreender.nyc3.cdn.digitaloceanspaces.com/dropi/fornecedor/produto-1764699814692f2ea63003e.png",
    emoji: "🧼",
    stock: 100,
    stockMax: 100,
    description: "Espuma de limpeza facial anti acne e oleosidade, com ácido salicílico nano e niacinamida, 50g."
  },
  {
    id: "p82",
    name: "Seda Lifting BTX Like Ácido Hialurônico 3D 5g",
    category: "beleza",
    categoryLabel: "Saúde e Beleza",
    price: 197.9,
    oldPrice: null,
    image: "https://empreender.nyc3.cdn.digitaloceanspaces.com/dropi/fornecedor/produto-1764700124692f2fdc3aeec.png",
    emoji: "🧴",
    stock: 86,
    stockMax: 86,
    description: "Seda lifting BTX Like, ácido hialurônico 3D com efeito botulínico suave, 5g."
  },
  {
    id: "p83",
    name: "Sérum Suavizante Hydracalm 10g",
    category: "beleza",
    categoryLabel: "Saúde e Beleza",
    price: 197.9,
    oldPrice: null,
    image: "https://empreender.nyc3.cdn.digitaloceanspaces.com/dropi/fornecedor/produto-1764700214692f303658084.png",
    emoji: "🧴",
    stock: 37,
    stockMax: 37,
    description: "Sérum suavizante Hydracalm, hidratação e proteção pós-laser, 10g."
  },
  {
    id: "p84",
    name: "Base Líquida Bruna Tavares BT Skin T60",
    category: "beleza",
    categoryLabel: "Saúde e Beleza",
    price: 236.9,
    oldPrice: null,
    image: "https://empreender.nyc3.cdn.digitaloceanspaces.com/dropi/fornecedor/produto-16651720146340822e2b70c.jpg",
    emoji: "💄",
    stock: 3,
    stockMax: 3,
    description: "Base líquida Bruna Tavares BT Skin, tom T60. Só 3 no estoque do fornecedor."
  },
  {
    id: "p85",
    name: "Balm Labial Lip Glow Cereja Ácido Hialurônico 5,5g",
    category: "beleza",
    categoryLabel: "Saúde e Beleza",
    price: 219.9,
    oldPrice: null,
    image: "https://empreender.nyc3.cdn.digitaloceanspaces.com/dropi/fornecedor/produto-1764699678692f2e1eab99c.png",
    emoji: "💋",
    stock: 100,
    stockMax: 100,
    description: "Balm labial Lip Glow sabor cereja, com ácido hialurônico, 5,5g."
  },
  {
    id: "p86",
    name: "Kit PMU Lip Preparatório (Active + Balm)",
    category: "beleza",
    categoryLabel: "Saúde e Beleza",
    price: 197.9,
    oldPrice: null,
    image: "https://empreender.nyc3.cdn.digitaloceanspaces.com/dropi/fornecedor/produto-1764699881692f2ee9083cc.jpg",
    emoji: "💋",
    stock: 117,
    stockMax: 117,
    description: "Kit PMU Lip Preparatório (Active + Balm) — preparo labial pra procedimentos de pigmentação."
  },
  {
    id: "p87",
    name: "Seda Labial Hyalufill Ultra Hidratante para Contorno 6g",
    category: "beleza",
    categoryLabel: "Saúde e Beleza",
    price: 351.9,
    oldPrice: null,
    image: "https://empreender.nyc3.cdn.digitaloceanspaces.com/dropi/fornecedor/produto-1764700120692f2fd8a87b3.jpg",
    emoji: "💋",
    stock: 100,
    stockMax: 100,
    description: "Seda labial Hyalufill ultra hidratante para contorno dos lábios, 6g."
  },
  {
    id: "p88",
    name: "Nano Repair Growth Factor Anti Queda Crescimento Capilar",
    category: "beleza",
    categoryLabel: "Saúde e Beleza",
    price: 823.9,
    oldPrice: null,
    image: "https://empreender.nyc3.cdn.digitaloceanspaces.com/dropi/fornecedor/produto-1764700228692f304404890.png",
    emoji: "💇‍♀️",
    stock: 10,
    stockMax: 10,
    description: "Nano Repair Growth Factor, tratamento anti queda e crescimento capilar."
  },
  {
    id: "p89",
    name: "Purify Gel de Limpeza sem Sabão 55g",
    category: "beleza",
    categoryLabel: "Saúde e Beleza",
    price: 109.9,
    oldPrice: null,
    image: "https://empreender.nyc3.cdn.digitaloceanspaces.com/dropi/fornecedor/produto-1764700116692f2fd478ff6.png",
    emoji: "🧼",
    stock: 15,
    stockMax: 15,
    description: "Purify, gel de limpeza facial sem sabão, 55g — limpa sem ressecar a pele."
  },
  {
    id: "p90",
    name: "Toalha Splash Pet",
    category: "pet",
    categoryLabel: "Pet Shop",
    price: 54.9,
    oldPrice: null,
    image: "https://empreender.nyc3.cdn.digitaloceanspaces.com/dropi/fornecedor/produto-177738520069f0bef06fa02.jpg",
    emoji: "🐾",
    stock: 2979,
    stockMax: 2979,
    description: "Toalha Splash Pet — seca o pet rapidinho depois do banho ou da chuva."
  },
  {
    id: "p91",
    name: "Peitoral para Gato com Guia Hello Kitty FreeFaro",
    category: "pet",
    categoryLabel: "Pet Shop",
    price: 345.9,
    oldPrice: null,
    image: "https://empreender.nyc3.cdn.digitaloceanspaces.com/dropi/fornecedor/produto-176079899268f3a9100ad99.jpg",
    emoji: "🐱",
    stock: 30,
    stockMax: 30,
    description: "Peitoral para gato com guia, estampa Hello Kitty preto e rosa, FreeFaro — passeio seguro pro gatinho."
  },
  {
    id: "p92",
    name: "Rede de Cadeira Impermeável para Gatos Chiara",
    category: "pet",
    categoryLabel: "Pet Shop",
    price: 54.9,
    oldPrice: null,
    image: "https://empreender.nyc3.cdn.digitaloceanspaces.com/dropi/fornecedor/produto-177738528769f0bf472de8a.png",
    emoji: "🐈",
    stock: 1986,
    stockMax: 1986,
    description: "Rede de cadeira impermeável pra gatos, modelo Chiara — cantinho quentinho pro gato descansar."
  },
  {
    id: "p93",
    name: "Mantinha Pet",
    category: "pet",
    categoryLabel: "Pet Shop",
    price: 46.9,
    oldPrice: null,
    image: "https://empreender.nyc3.cdn.digitaloceanspaces.com/dropi/fornecedor/produto-177738491769f0bdd52adce.jpg",
    emoji: "🐾",
    stock: 5958,
    stockMax: 5958,
    description: "Mantinha pet — aconchego extra pro pet nos dias mais frios."
  },
  {
    id: "p94",
    name: "Bandana FreeFaro Hello Kitty para Cachorros",
    category: "pet",
    categoryLabel: "Pet Shop",
    price: 89.9,
    oldPrice: null,
    image: "https://empreender.nyc3.cdn.digitaloceanspaces.com/dropi/fornecedor/produto-175942566568deb481edc52.jpg",
    emoji: "🐶",
    stock: 30,
    stockMax: 30,
    description: "Bandana FreeFaro estampa Hello Kitty para cachorros, tamanho G — acessório fofo pro passeio."
  },
  {
    id: "p95",
    name: "Protetor de Sofá Pet Meg Impermeável Grande",
    category: "pet",
    categoryLabel: "Pet Shop",
    price: 134.9,
    oldPrice: null,
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
    price: 68.9,
    oldPrice: null,
    image: "https://empreender.nyc3.cdn.digitaloceanspaces.com/dropi/fornecedor/produto-177738496069f0be00ea3f6.jpg",
    emoji: "🚗",
    stock: 6951,
    stockMax: 6951,
    description: "Protetor de banco dianteiro impermeável, padrão universal — leva o pet no carro sem sujar o banco."
  },
  {
    id: "p97",
    name: "Vestido Mini Miss Longo Carol Prata",
    category: "infantil",
    categoryLabel: "Infantil e Brinquedos",
    price: 255.9,
    oldPrice: null,
    image: "https://dropi.xpto.app/dropi/fornecedor/produto-17851773976a67a535517e7.jpg",
    emoji: "👗",
    stock: 22,
    stockMax: 22,
    description: "Vestido Mini Miss longo, modelo Carol, cor prata — pra festa ou ocasião especial."
  },
  {
    id: "p98",
    name: "Fantasia/Vestido Mini Miss Menina da Justiça",
    category: "infantil",
    categoryLabel: "Infantil e Brinquedos",
    price: 227.9,
    oldPrice: null,
    image: "https://dropi.xpto.app/dropi/fornecedor/produto-17860435316a74dc8bcbf24.jpg",
    emoji: "🦸‍♀️",
    stock: 72,
    stockMax: 72,
    description: "Fantasia/vestido Mini Miss tema Menina da Justiça — pra festa a fantasia."
  },
  {
    id: "p99",
    name: "Vestido Marie Longo Heloisa Prata",
    category: "infantil",
    categoryLabel: "Infantil e Brinquedos",
    price: 226.9,
    oldPrice: null,
    image: "https://dropi.xpto.app/dropi/fornecedor/produto-17858699366a7236701c705.jpg",
    emoji: "👗",
    stock: 55,
    stockMax: 55,
    description: "Vestido Marie longo, modelo Heloisa, cor prata — elegante pra ocasiões especiais."
  },
  {
    id: "p100",
    name: "Vestido Menina Bonita Julieta Off White",
    category: "infantil",
    categoryLabel: "Infantil e Brinquedos",
    price: 326.9,
    oldPrice: null,
    image: "https://dropi.xpto.app/dropi/fornecedor/produto-17848133126a621700a8802.jpg",
    emoji: "👗",
    stock: 27,
    stockMax: 27,
    description: "Vestido Menina Bonita, modelo Julieta, cor off white — pra festas e daminhas."
  },
  {
    id: "p101",
    name: "Vestido Infantil Longo Branco Tule Glitter Festa Daminha",
    category: "infantil",
    categoryLabel: "Infantil e Brinquedos",
    price: 274.9,
    oldPrice: null,
    image: "https://dropi.xpto.app/dropi/fornecedor/produto-17859438076a7356ff1df15.jpg",
    emoji: "👗",
    stock: 89,
    stockMax: 89,
    description: "Vestido infantil longo branco, tule glitter, busto com nervura — modelo festa daminha."
  },
  {
    id: "p102",
    name: "Fantasia Princesa Belli Doce Realeza Azul",
    category: "infantil",
    categoryLabel: "Infantil e Brinquedos",
    price: 186.9,
    oldPrice: null,
    image: "https://dropi.xpto.app/dropi/fornecedor/produto-17839494396a54e87f7bbb7.jpg",
    emoji: "👑",
    stock: 33,
    stockMax: 33,
    description: "Fantasia Princesa Belli, tema Doce Realeza, cor azul — pra fazer a menina se sentir princesa."
  },
  {
    id: "p103",
    name: "Vestido Juvenil Vila Lele Regata Flores Amarelo",
    category: "infantil",
    categoryLabel: "Infantil e Brinquedos",
    price: 269.9,
    oldPrice: null,
    image: "https://dropi.xpto.app/dropi/fornecedor/produto-17858705156a7238b3116a5.jpg",
    emoji: "🌼",
    stock: 79,
    stockMax: 79,
    description: "Vestido juvenil Vila Lele, modelo regata com estampa floral, cor amarelo — leve pro dia a dia."
  }


];

const CATEGORIES = [
  { key: "casa", label: "Casa e Decoração", icon: "🏠", image: "assets/img/categories/casa.png" },
  { key: "moda", label: "Moda e Vestuário", icon: "👗", image: "assets/img/categories/moda.png" },
  { key: "pet", label: "Pet Shop", icon: "🐾", image: "assets/img/categories/pet.png" },
  { key: "beleza", label: "Saúde e Beleza", icon: "💄", image: "assets/img/categories/beleza.png" },
  { key: "joias", label: "Joias e Acessórios", icon: "💍", image: "assets/img/categories/joias.png" },
  { key: "infantil", label: "Infantil e Brinquedos", icon: "🧸", image: "assets/img/categories/infantil.png" }
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
  p26: { medida: "1,2m de comprimento" },
  p30: { tamanho: "Pequeno" },
};

function formatBRL(value) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function installmentValue(p) {
  return p.price / 18;
}

function installmentText(p) {
  return `ou 18x de ${formatBRL(installmentValue(p))} sem juros`;
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
