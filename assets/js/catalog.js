/* =====================================================================
   ACHADINHOS BRASIL — catálogo (modelo "Oferta Relâmpago")
   -----------------------------------------------------------------
   Catálogo atualizado em 12/08/2026 (base), 20/08/2026 (p10 e p11,
   reforço pontual de Infantil/Joias) e 20/08/2026 (p12 a p48, expansão
   para ~8 produtos por categoria) com produtos reais filtrados no
   painel da Dropi (marketplace nacional, filtro "Mais Vistos Mês"),
   priorizando diversidade entre os itens de cada categoria. Preço, desconto (quando
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
  },
  {
    id: "p12",
    name: "Box Organizador P Color",
    category: "casa",
    categoryLabel: "Casa e Decoração",
    price: 8.69,
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
    price: 31.92,
    oldPrice: 39.9,
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
    price: 11.99,
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
    price: 31.99,
    oldPrice: 39.99,
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
    price: 39.12,
    oldPrice: 48.9,
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
    price: 31.13,
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
    price: 88.68,
    oldPrice: null,
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
    price: 16.92,
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
    price: 22.79,
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
    price: 16.58,
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
    price: 31.27,
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
    price: 6.35,
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
    price: 22.47,
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
    price: 56.83,
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
    price: 77.33,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-175942638668deb752793fb.jpg",
    emoji: "🦮",
    stock: 30,
    stockMax: 30,
    description: "Guia tradicional pra cachorro, 1,2m, estampa Scooby-Doo — resistente pros passeios do dia a dia."
  },
  {
    id: "p27",
    name: "Vasilha Comedouro/Bebedouro de Melamina Batman",
    category: "pet",
    categoryLabel: "Pet Shop",
    price: 64.11,
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
    price: 29.0,
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
    price: 45.0,
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
    price: 21.0,
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
    price: 20.2,
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
    price: 5.0,
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
    price: 139.99,
    oldPrice: null,
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
    price: 85.96,
    oldPrice: null,
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
    price: 79.92,
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
    price: 37.52,
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
    price: 46.45,
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
    price: 82.45,
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
    price: 57.45,
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
    price: 44.45,
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
    price: 37.45,
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
    price: 12.45,
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
    price: 74.0,
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
    price: 18.0,
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
    price: 58.0,
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
    price: 129.9,
    oldPrice: null,
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
    price: 39.9,
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
    price: 55.0,
    oldPrice: null,
    image: "https://empreender.nyc3.digitaloceanspaces.com/dropi/fornecedor/produto-1770760821698baa7504775.jpg",
    emoji: "🧩",
    stock: 1000,
    stockMax: 1000,
    description: "Kit com 3 brinquedos educativos em madeira e EVA, pedagógicos e lúdicos pro desenvolvimento infantil."
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

function isBulkStock(p) {
  // Estoque de fornecedor bem grande (dropshipping) não deve aparecer como
  // número gigante pro cliente — vira uma mensagem de preço de atacado.
  return p.stock > 100;
}

function stockLabel(p) {
  if (isLowStock(p)) return `Só ${p.stock} em estoque!`;
  if (isBulkStock(p)) return "Desconto de atacado — preço especial por quantidade";
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
        <div class="stock-label">${stockLabel(p)}</div>
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
