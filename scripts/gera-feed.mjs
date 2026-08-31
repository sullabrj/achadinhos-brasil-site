#!/usr/bin/env node
/**
 * gera-feed.mjs
 * ---------------------------------------------------------------------
 * Gera o feed de produtos do Google Merchant Center (feed.tsv na raiz do
 * site) lendo o proprio assets/js/catalog.js. Roda sozinho depois de todo
 * sync da Dropi, entao o preco e a disponibilidade que o Google anuncia
 * sao SEMPRE os mesmos que estao no site.
 *
 * Por que isso importa: no anuncio de Pesquisa o preco fica escrito no
 * texto e envelhece sozinho (foi o que quebrou a campanha antiga, que
 * anunciava R$ 236,90 num produto de R$ 88,90). No Shopping o preco vem
 * do feed - se o feed acompanha o catalogo, nunca mais desalinha.
 *
 * Produto que sai do catalogo some do feed e o Google para de anuncia-lo.
 * Produto com stock 0 vai como "out of stock" e tambem deixa de aparecer.
 *
 * Uso: node scripts/gera-feed.mjs [--catalog <path>] [--out <path>]
 * ---------------------------------------------------------------------
 */

import fs from "node:fs";
import path from "node:path";

const SITE = "https://www.lojaachadinhosbrasil.com.br";
const MARCA = "Achadinhos Brasil";

function arg(nome, padrao) {
  const i = process.argv.indexOf(nome);
  return i > -1 && process.argv[i + 1] ? process.argv[i + 1] : padrao;
}

const raiz = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const CATALOGO = arg("--catalog", path.join(raiz, "assets/js/catalog.js"));
const SAIDA = arg("--out", path.join(raiz, "feed.tsv"));

/* Campos do Merchant Center. identifier_exists=no porque produto de
   dropshipping nao tem GTIN/MPN proprio. */
const COLUNAS = [
  "id", "title", "description", "link", "image_link", "availability",
  "price", "condition", "brand", "identifier_exists", "product_type"
];

/* TSV nao aceita tab nem quebra de linha dentro do campo. */
function limpa(v) {
  return String(v == null ? "" : v).replace(/[\t\r\n]+/g, " ").trim();
}

function lerProdutos(src) {
  const re = new RegExp(
    'id: "(p\\d+)",\\s*\\n\\s*name: "((?:[^"\\\\]|\\\\.)*)",\\s*\\n' +
    '\\s*category: "(\\w+)",\\s*\\n\\s*categoryLabel: "([^"]*)",\\s*\\n' +
    '\\s*price: ([\\d.]+),\\s*\\n\\s*oldPrice: ([^,]+),\\s*\\n' +
    '\\s*image: "([^"]*)",\\s*\\n\\s*emoji: "([^"]*)",\\s*\\n' +
    '\\s*stock: (\\d+),\\s*\\n\\s*stockMax: (\\d+),\\s*\\n' +
    '\\s*description: "((?:[^"\\\\]|\\\\.)*)"',
    "g"
  );
  const out = [];
  let m;
  while ((m = re.exec(src)) !== null) {
    const desescapa = (t) => t.replace(/\\"/g, '"').replace(/\\\\/g, "\\");
    out.push({
      id: m[1],
      name: desescapa(m[2]),
      categoryLabel: m[4],
      price: Number(m[5]),
      image: m[7],
      stock: Number(m[9]),
      description: desescapa(m[11])
    });
  }
  return out;
}

const src = fs.readFileSync(CATALOGO, "utf8");
const produtos = lerProdutos(src);

const totalNoCatalogo = (src.match(/id: "p\d+"/g) || []).length;
if (produtos.length !== totalNoCatalogo) {
  console.error(
    `ERRO: li ${produtos.length} produtos mas o catalogo tem ${totalNoCatalogo}. ` +
    `Alguma entrada esta fora do formato esperado - feed NAO gerado pra nao ` +
    `subir catalogo pela metade no Google.`
  );
  process.exit(1);
}
if (!produtos.length) {
  console.error("ERRO: nenhum produto lido do catalogo - feed nao gerado.");
  process.exit(1);
}

const linhas = [COLUNAS.join("\t")];
for (const p of produtos) {
  const linha = {
    id: p.id,
    title: limpa(p.name).slice(0, 150),
    description: limpa(p.description).slice(0, 5000) || limpa(p.name),
    link: `${SITE}/produto.html?id=${p.id}`,
    image_link: p.image,
    availability: p.stock > 0 ? "in stock" : "out of stock",
    price: `${p.price.toFixed(2)} BRL`,
    condition: "new",
    brand: MARCA,
    identifier_exists: "no",
    product_type: limpa(p.categoryLabel)
  };
  linhas.push(COLUNAS.map((c) => limpa(linha[c])).join("\t"));
}

fs.writeFileSync(SAIDA, linhas.join("\n") + "\n", "utf8");

const disponiveis = produtos.filter((p) => p.stock > 0).length;
console.log(
  `feed gerado: ${produtos.length} produtos (${disponiveis} in stock, ` +
  `${produtos.length - disponiveis} out of stock) -> ${path.relative(raiz, SAIDA)}`
);
