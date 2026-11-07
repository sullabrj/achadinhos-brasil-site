"""Gera as páginas de vendas do Guia de Cortes e do Catálogo de Serviços.
Rodar da raiz do repositório: python3 scripts/gerar_paginas_vendas.py
"""
import html

PIXEL = "30156663417254394"

CSS = """
*{box-sizing:border-box}html{scroll-behavior:smooth}
body{margin:0;font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;background:var(--bg);color:var(--ink);line-height:1.55;font-size:17px;padding-bottom:84px}
img,video{display:block;max-width:100%}
.w{max-width:620px;margin:0 auto;padding:0 18px}
.hero{position:relative;background:var(--dark);color:#fff;overflow:hidden}
.hero .bg{width:100%;height:330px;object-fit:cover;object-position:50% 30%;opacity:.95}
.hero .tx{position:relative;margin-top:-70px;padding:0 18px 34px;max-width:620px;margin-left:auto;margin-right:auto}
.hero .tx:before{content:"";position:absolute;inset:-60px 0 0 0;background:linear-gradient(180deg,rgba(0,0,0,0),var(--dark) 70px);z-index:-1}
.kick{font-size:12px;font-weight:800;letter-spacing:2px;text-transform:uppercase;color:var(--acc)}
h1{font-size:34px;line-height:1.08;margin:10px 0 12px;letter-spacing:-.5px}
h1 span,h2 span{color:var(--acc)}
.hero p{color:#e9e6e1;margin:0 0 16px}
.pills{display:flex;flex-wrap:wrap;gap:8px;margin:0 0 20px}
.pills b{border:1.5px solid var(--acc);border-radius:99px;padding:6px 12px;font-size:14px}
.btn{display:block;text-align:center;background:var(--acc);color:var(--btxt);font-weight:800;font-size:18px;padding:17px 18px;border-radius:14px;text-decoration:none;box-shadow:0 10px 24px rgba(0,0,0,.18)}
.note{font-size:13px;color:#bdb8b0;text-align:center;margin-top:10px}
section{padding:40px 0}
section.alt{background:var(--alt)}
h2{font-size:27px;line-height:1.12;margin:8px 0 14px;letter-spacing:-.3px}
.vid video{width:100%;max-width:340px;margin:0 auto;border-radius:18px;background:#000;box-shadow:0 18px 40px rgba(0,0,0,.22)}
ul.x,ul.ok{list-style:none;padding:0;margin:0}
ul.x li,ul.ok li{position:relative;padding:0 0 12px 34px}
ul.x li:before{content:"✕";position:absolute;left:0;top:1px;width:22px;height:22px;border-radius:50%;background:#e8e4de;color:#7a7268;font-size:12px;display:flex;align-items:center;justify-content:center}
ul.ok li:before{content:"✓";position:absolute;left:0;top:1px;width:22px;height:22px;border-radius:50%;background:var(--acc);color:var(--btxt);font-size:13px;font-weight:900;display:flex;align-items:center;justify-content:center}
.shot{border-radius:16px;overflow:hidden;box-shadow:0 14px 34px rgba(0,0,0,.16)}
.grid3{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin:18px 0}
.grid3 img{border-radius:10px;aspect-ratio:4/5;object-fit:cover;width:100%}
.chips{display:flex;flex-wrap:wrap;gap:6px}
.chips span{background:var(--card);border:1px solid var(--line);border-radius:8px;padding:5px 9px;font-size:14px}
.cards{display:grid;gap:12px}
.card{background:var(--card);border:1px solid var(--line);border-radius:14px;padding:16px}
.card b{display:block;font-size:17px;margin-bottom:3px}
.card small{color:var(--mut);font-size:15px}
.price{background:var(--card);border:2px solid var(--acc2);border-radius:18px;padding:26px 20px;text-align:center}
.price .old{color:var(--mut);text-decoration:line-through}
.price .new{font-size:52px;font-weight:900;color:var(--acc2);line-height:1.05;margin:4px 0}
.price .sm{color:var(--mut);font-size:15px;margin-bottom:18px}
.price ul{text-align:left;margin:0 0 20px}
details{background:var(--card);border:1px solid var(--line);border-radius:12px;padding:14px 16px;margin-bottom:10px}
summary{font-weight:700;cursor:pointer}
details p{margin:10px 0 0;color:var(--mut)}
footer{padding:28px 18px 40px;text-align:center;font-size:14px;color:var(--mut)}
footer a{color:inherit}
.sticky{position:fixed;left:0;right:0;bottom:0;padding:10px 14px calc(10px + env(safe-area-inset-bottom));background:rgba(255,255,255,.92);backdrop-filter:blur(8px);border-top:1px solid var(--line);z-index:9}
.sticky .btn{max-width:560px;margin:0 auto;padding:14px;font-size:17px}
"""


def page(p):
    e = html.escape
    li = lambda xs, c: f'<ul class="{c}">' + "".join(f"<li>{x}</li>" for x in xs) + "</ul>"
    faq = "".join(f"<details><summary>{q}</summary><p>{a}</p></details>" for q, a in p["faq"])
    return f"""<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex">
<title>{e(p['title'])}</title>
<meta name="description" content="{e(p['desc'])}">
<link rel="canonical" href="https://www.lojaachadinhosbrasil.com.br/{p['slug']}/">
<meta property="og:title" content="{e(p['title'])}"><meta property="og:description" content="{e(p['desc'])}">
<meta property="og:image" content="https://www.lojaachadinhosbrasil.com.br/{p['slug']}/img/capa.jpg">
<link rel="preload" as="image" href="img/hero.jpg">
<style>:root{{{p['vars']}}}{CSS}{p.get('css','')}</style>
<script>!function(f,b,e,v,n,t,s){{if(f.fbq)return;n=f.fbq=function(){{n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)}};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','{PIXEL}');fbq('track','PageView');</script>
</head><body>
<header class="hero"><img class="bg" src="img/hero.jpg" alt="{e(p['hero_alt'])}">
<div class="tx"><div class="kick">{p['kick']}</div><h1>{p['h1']}</h1><p>{p['sub']}</p>
<div class="pills">{''.join(f'<b>{x}</b>' for x in p['pills'])}</div>
<a class="btn" href="{p['url']}">{p['cta']}</a><div class="note">Pagamento único · acesso na hora · garantia de 7 dias</div></div></header>

<section class="vid"><div class="w" style="text-align:center"><div class="kick" style="color:var(--acc2)">Veja em {p['vid_s']} segundos</div><h2>{p['vid_h']}</h2>
<video src="img/video.mp4" poster="img/video.jpg" controls playsinline preload="metadata"></video></div></section>

<section class="alt"><div class="w"><div class="kick" style="color:var(--acc2)">{p['pain_k']}</div><h2>{p['pain_h']}</h2>{li(p['pain'],'x')}</div></section>

<section><div class="w"><div class="kick" style="color:var(--acc2)">Veja por dentro</div><h2>{p['inside_h']}</h2><p style="color:var(--mut);margin-top:0">{p['inside_p']}</p>
<div class="shot"><img loading="lazy" src="img/por-dentro.jpg" alt="{e(p['inside_alt'])}"></div></div></section>

{p['extra']}

<section class="alt"><div class="w"><div class="kick" style="color:var(--acc2)">O que você recebe</div><h2>{p['get_h']}</h2>{li(p['get'],'ok')}
<h2 style="margin-top:30px;font-size:23px">Para quem é</h2>{li(p['who'],'ok')}</div></section>

<section id="comprar"><div class="w"><div class="price">
<div class="old">de {p['old']}</div><div class="new">{p['price']}</div><div class="sm">Pagamento único, sem mensalidade</div>
{li(p['box'],'ok')}
<a class="btn" href="{p['url']}">{p['cta']}</a>
<div class="note" style="color:var(--mut)">Compra segura pela Kiwify · Pix ou cartão</div></div></div></section>

<section style="padding-top:0"><div class="w"><h2>Dúvidas comuns</h2>{faq}</div></section>

<footer>{p['name']} · Suporte: <a href="https://wa.me/5524999593100">WhatsApp (24) 99959-3100</a> · <a href="mailto:achadinhosbrasilloja@gmail.com">achadinhosbrasilloja@gmail.com</a><br>{p['foot']}</footer>
<div class="sticky"><a class="btn" href="{p['url']}">{p['cta']}</a></div>
<script>
fbq('track','ViewContent',{{content_name:'{p['name']}',value:{p['value']},currency:'BRL'}});
window.PV={{produto:'{p['name']}',preco:'{p['price']}',url:'{p['url']}',capa:'img/capa.jpg',cor:'{p['pvc']}',corTexto:'{p['pvt']}'}};
</script>
<script src="/pv.js" defer></script>
</body></html>
"""


GUIA = dict(
    slug="guia-de-cortes", pvc="#F2A33A", pvt="#1c1300", name="Guia Visual de Cortes", value="29.9",
    url="https://pay.kiwify.com.br/fzBVsk8",
    title="Guia Visual: 20 Cortes na Máquina, pente por pente",
    desc="20 cortes na máquina com foto real, desenho da cabeça, pentes usados e número de passadas. PDF de 45 páginas que abre no celular.",
    vars="--dark:#0F1115;--bg:#F6F3EE;--alt:#ECE7DF;--ink:#16181d;--mut:#5f646d;--acc:#F2A33A;--acc2:#C8761C;--btxt:#1c1300;--card:#fff;--line:#e2ddd4",
    hero_alt="Cliente de perfil com degradê baixo na cadeira da barbearia",
    kick="Guia visual · cortes na máquina",
    h1="Teu degradê fica com <span>linha marcada?</span>",
    sub="20 cortes na máquina, pente por pente: foto real, desenho da cabeça e quantas passadas dar em cada região. Do jeito que o cliente pede na cadeira.",
    pills=["20 cortes", "45 páginas", "+ Kit Marketing grátis"],
    cta="Quero o guia por R$ 29,90", price="R$ 29,90", old="R$ 49,90",
    vid_s="22", vid_h="O passo a passo que você vai ter na mão",
    pain_k="Acontece contigo?", pain_h="Errar o degradê custa cliente.",
    pain=["Fica aquela linha entre uma faixa e outra e você não sabe sumir com ela.",
          "Não tem certeza de qual pente usar em cada altura.",
          "O cliente pede o corte pelo nome e você trava.",
          "Refaz o acabamento, perde tempo e o cliente sai desconfiado."],
    inside_h="Cada corte em <span>2 páginas</span>",
    inside_p="Página 1: foto real, pentes em milímetros e o desenho da cabeça com o sentido da passada. Página 2: o passo a passo com número de passadas, o erro mais comum e como corrigir.",
    inside_alt="Páginas reais do guia: degradê baixo com foto, desenho e passo a passo",
    extra="""<section style="padding-top:0"><div class="w"><div class="kick" style="color:var(--acc2)">Os 20 cortes</div><h2>Os mais pedidos na cadeira</h2>
<div class="grid3"><img loading="lazy" src="img/c1.jpg" alt="Degradê baixo"><img loading="lazy" src="img/c2.jpg" alt="Corte social com degradê"><img loading="lazy" src="img/c3.jpg" alt="Corte com degradê"></div>
<div class="chips"><span>Degradê baixo</span><span>Degradê médio</span><span>Degradê alto</span><span>Navalhado</span><span>Social</span><span>Americano</span><span>Disfarçado</span><span>Militar</span><span>Um pente só</span><span>Raspado</span><span>Risquinho</span><span>Pezinho</span><span>Flat top</span><span>Moicano</span><span>Burst fade</span><span>Undercut</span><span>Infantil</span><span>Barba degradê</span><span>Afro baixo</span><span>Nudred</span></div>
<p style="font-size:14px;color:var(--mut)">Mostra no celular para o cliente escolher o corte antes de sentar.</p></div></section>

<section id="bonus" style="background:var(--dark);color:#fff"><div class="w"><div class="kick">Bônus grátis</div><h2>Bônus grátis: <span>Kit Marketing da Barbearia</span></h2>
<p style="color:#d9d4cc;margin-top:0">Comprou o guia, leva junto o kit para divulgar tua barbearia e encher a agenda. Tudo editável no Canva grátis: troca nome, telefone, fotos e preços em poucos minutos.</p>
<div class="shot" style="margin:18px 0 22px"><img loading="lazy" src="img/bonus-kit.jpg" alt="Kit Marketing da Barbearia: tabela de preços, posts, stories e cartão fidelidade"></div>
<ul class="ok"><li><b>Tabela de preços</b> com os 20 cortes: versão A3 para a parede e versão para o Instagram.</li><li><b>30 posts de feed</b>: antes e depois, corte da semana, promoção do dia fraco, agenda aberta e dicas.</li><li><b>15 stories</b>: horários livres hoje, última vaga, feriado e Pix.</li><li><b>Cartão fidelidade</b> (10 cortes = 1 grátis) e <b>cartão de visita</b> prontos para a gráfica.</li><li><b>Placas</b>: Aceitamos Pix, horário de funcionamento e Agende pelo WhatsApp.</li><li><b>Guia de 2 páginas</b>: como importar no Canva e editar pelo celular.</li></ul>
<p style="font-size:14px;color:#bdb8b0;margin:6px 0 0">Vem na área de membros junto com o guia, sem custo a mais.</p></div></section>""",
    get_h="45 páginas, direto ao ponto",
    get=["Catálogo com os 20 cortes mais pedidos para mostrar ao cliente.",
         "Para cada corte: foto real, desenho da cabeça com as faixas de cada pente e o sentido da passada.",
         "Pentes em milímetros, nível de dificuldade e tempo médio.",
         "Passo a passo com número de passadas por região, o erro mais comum e como corrigir.",
         "Tabela de pentes, os 5 movimentos da máquina e checklist para liberar o cliente sem retrabalho."],
    who=["Quem está começando e quer acertar o degradê.",
         "Quem corta em casa e quer cobrar como profissional.",
         "Quem já corta e quer parar de errar na transição."],
    box=["Guia em PDF com 45 páginas", "Os 20 cortes, pente por pente", "Bônus grátis: Kit Marketing da Barbearia (editável no Canva)", "Acesso na hora, no seu e-mail", "Garantia de 7 dias: não gostou, devolvemos"],
    faq=[("Como recebo?", "Logo depois do pagamento chega no seu e-mail o acesso ao guia em PDF. Pagou no Pix, libera na hora."),
         ("Abre no celular?", "Sim. É um PDF que abre em qualquer celular, sem instalar nada."),
         ("Como recebo o bônus?", "O Kit Marketing da Barbearia fica na área de membros, junto com o guia. Os arquivos abrem no Canva grátis, pelo celular ou computador."),
         ("Serve para quem está começando?", "Sim. Cada corte tem nível de dificuldade e começa pelo básico: qual pente, onde passar e quantas vezes."),
         ("Precisa de máquina específica?", "Não. Funciona com qualquer máquina que tenha o jogo de pentes. O guia mostra o tamanho em milímetros de cada pente."),
         ("Tem mensalidade?", "Não. É pagamento único de R$ 29,90."),
         ("E se eu não gostar?", "Você tem 7 dias de garantia. Pede o reembolso e devolvemos o valor inteiro.")],
    foot="As fotos mostram exemplos dos cortes do guia.",
)

CATALOGO = dict(
    slug="catalogo-de-servicos", pvc="#1F6E5A", pvt="#ffffff", name="Catálogo de Serviços", value="19.9",
    url="https://pay.kiwify.com.br/iElAMqD",
    title="Catálogo de Serviços editável no Canva — 4 modelos",
    desc="Catálogo pronto com seus serviços, preços, combos e regras. 4 modelos de 8 páginas para editar no Canva e mandar em PDF no WhatsApp.",
    vars="--dark:#16191a;--bg:#F5F2EC;--alt:#EAE5DC;--ink:#1a1c1d;--mut:#5f6461;--acc:#6FD3B5;--acc2:#1F6E5A;--btxt:#0c2a22;--card:#fff;--line:#e0dbd2",
    hero_alt="Profissional de beleza atendendo uma cliente",
    kick="Catálogo de serviços · editável no Canva",
    h1="Ainda manda seus preços <span>soltos no WhatsApp?</span>",
    sub="Catálogo pronto com seus serviços, preços, combos e regras. Você troca nome, fotos e valores no Canva e manda o PDF para a cliente.",
    pills=["4 modelos", "8 páginas cada", "R$ 19,90"],
    cta="Quero o catálogo por R$ 19,90", price="R$ 19,90", old="R$ 39,90",
    vid_s="20", vid_h="Do print bagunçado ao catálogo profissional",
    pain_k="Parece com você?", pain_h="Preço solto no WhatsApp passa amadorismo.",
    pain=["Toda cliente nova pergunta o preço e você digita tudo de novo.",
          "Manda print da tabela tirado do celular, cortado e sem padrão.",
          "A cliente não sabe dos combos e acaba pedindo só o mais barato.",
          "Atraso, falta e sinal viram discussão porque as regras não estão escritas."],
    inside_h="As 8 páginas de <span>cada modelo</span>",
    inside_p="Capa, sobre você, serviços e preços, combos, agendamento e regras, formas de pagamento e contato com QR Code.",
    inside_alt="Páginas do catálogo: capa, serviços e preços, combos e regras",
    extra="""<section style="padding-top:0"><div class="w"><div class="shot"><img loading="lazy" src="img/modelos.jpg" alt="Os 4 modelos: nail designer, lash e brow, estética e barbearia"></div>
<h2 style="margin-top:28px;font-size:23px">Como funciona</h2>
<ol style="padding-left:20px;margin:0"><li>Você recebe os 4 arquivos na hora (PowerPoint editável e PDF).</li><li>Importa no Canva grátis em 1 minuto, com passo a passo incluso.</li><li>Troca nome, fotos, preços e cores.</li><li>Baixa em PDF e manda no WhatsApp ou imprime.</li></ol></div></section>""",
    get_h="4 modelos prontos para personalizar",
    get=["Nail designer: alongamento, esmaltação em gel, manutenção.",
         "Lash e brow: extensão, lifting, design de sobrancelha.",
         "Estética: limpeza de pele, massagem, depilação.",
         "Barbearia: cortes, barba e combos.",
         "Passo a passo para editar no Canva grátis."],
    who=["Manicure, nail designer, lash, sobrancelha e esteticista.",
         "Barbeiro que quer mostrar a tabela de um jeito profissional.",
         "Quem quer vender mais combos e deixar as regras claras."],
    box=["4 modelos com 8 páginas cada", "Arquivos editáveis + PDF", "Acesso na hora, no seu e-mail", "Garantia de 7 dias: não gostou, devolvemos"],
    faq=[("Preciso pagar o Canva?", "Não. O Canva gratuito já abre e edita os modelos."),
         ("Dá para editar no celular?", "Dá, pelo aplicativo do Canva. No computador fica mais rápido, mas não é obrigatório."),
         ("Como recebo?", "Logo depois do pagamento chega no seu e-mail o acesso aos arquivos. Pagou no Pix, libera na hora."),
         ("Posso trocar as cores e as fotos?", "Pode. Nome, fotos, preços, textos e cores ficam do seu jeito."),
         ("Tem mensalidade?", "Não. É pagamento único de R$ 19,90."),
         ("E se eu não gostar?", "Você tem 7 dias de garantia. Pede o reembolso e devolvemos o valor inteiro.")],
    foot="Os nomes e valores dos modelos são exemplos para você trocar.",
    css=".hero .bg{height:auto;opacity:1}.hero .tx{margin-top:0;padding-top:22px}.hero .tx:before{display:none}",
)

if __name__ == "__main__":
    for p in (GUIA, CATALOGO):
        with open(f"{p['slug']}/index.html", "w", encoding="utf-8") as f:
            f.write(page(p))
        print("ok", p["slug"])
