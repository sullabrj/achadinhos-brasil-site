/* Checkout em 2 passos + Clarity, compartilhado pelas páginas de vendas.
   Cada página define antes deste script:
   window.PV = {produto, preco, url, capa, cor, corTexto} */
(function () {
  var P = window.PV || {};
  // Microsoft Clarity
  (function (c, l, a, r, i, t, y) {
    c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
    t = l.createElement(r); t.async = 1; t.src = "https://www.clarity.ms/tag/" + i;
    y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
  })(window, document, "clarity", "script", "z9zzqjrn35");
  try { clarity("set", "produto", P.produto || ""); } catch (e) {}

  function fb() { try { if (window.fbq) fbq.apply(null, arguments); } catch (e) {} }
  function cl(ev) { try { clarity("event", ev); } catch (e) {} }
  var qs = location.search.slice(1);

  var css = "\
.pv-ov{position:fixed;inset:0;background:rgba(10,12,14,.55);opacity:0;pointer-events:none;transition:opacity .25s;z-index:50}\
.pv-ov.on{opacity:1;pointer-events:auto}\
.pv-sh{position:fixed;left:0;right:0;bottom:0;z-index:51;background:#fff;color:#16181d;border-radius:22px 22px 0 0;max-width:560px;margin:0 auto;padding:10px 20px calc(22px + env(safe-area-inset-bottom));transform:translateY(105%);transition:transform .32s cubic-bezier(.2,.8,.2,1);font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;max-height:92vh;overflow:auto;box-shadow:0 -20px 50px rgba(0,0,0,.25)}\
.pv-sh.on{transform:none}\
.pv-grab{width:44px;height:5px;border-radius:9px;background:#d9d6d0;margin:2px auto 14px}\
.pv-x{position:absolute;right:12px;top:10px;border:0;background:#f1efeb;width:34px;height:34px;border-radius:50%;font-size:18px;cursor:pointer;color:#555}\
.pv-steps{display:flex;gap:8px;padding-right:44px;font-size:12px;font-weight:700;letter-spacing:.5px;text-transform:uppercase;color:#9a958d;margin-bottom:14px}\
.pv-steps b{flex:1;border-top:3px solid #e6e2db;padding-top:6px}\
.pv-steps b.a{border-color:var(--pvc);color:#16181d}\
.pv-sum{display:flex;gap:12px;align-items:center;background:#f6f4f0;border-radius:14px;padding:10px;margin-bottom:16px}\
.pv-sum img{width:58px;height:58px;object-fit:cover;border-radius:10px}\
.pv-sum div{flex:1;font-size:14px;line-height:1.3}\
.pv-sum strong{display:block;font-size:15px}\
.pv-sum em{font-style:normal;font-weight:900;font-size:19px;color:#16181d}\
.pv-sh h3{margin:0 0 4px;font-size:21px}\
.pv-sh p.s{margin:0 0 14px;color:#6b6760;font-size:14px}\
.pv-sh label{display:block;font-size:13px;font-weight:700;margin:10px 0 5px}\
.pv-sh input{width:100%;font-size:17px;padding:13px 14px;border:1.5px solid #dcd8d1;border-radius:12px;outline:none;background:#fff;color:#16181d}\
.pv-sh input:focus{border-color:var(--pvc)}\
.pv-go{width:100%;margin-top:16px;border:0;border-radius:14px;padding:17px;font-size:18px;font-weight:800;background:var(--pvc);color:var(--pvt);cursor:pointer}\
.pv-err{color:#b3261e;font-size:13px;min-height:18px;margin-top:6px}\
.pv-trust{display:flex;justify-content:center;flex-wrap:wrap;gap:6px 14px;margin-top:12px;font-size:12.5px;color:#6b6760}\
.pv-skip{display:block;text-align:center;margin-top:10px;font-size:13px;color:#8a857d}\
.rv{opacity:0;transform:translateY(18px);transition:opacity .6s ease,transform .6s ease}.rv.in{opacity:1;transform:none}\
@media (prefers-reduced-motion:reduce){.rv{opacity:1;transform:none;transition:none}.pv-sh,.pv-ov{transition:none}}";
  var st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);
  document.documentElement.style.setProperty("--pvc", P.cor || "#222");
  document.documentElement.style.setProperty("--pvt", P.corTexto || "#fff");

  var ov = document.createElement("div"); ov.className = "pv-ov";
  var sh = document.createElement("div"); sh.className = "pv-sh"; sh.setAttribute("role", "dialog"); sh.setAttribute("aria-label", "Finalizar compra");
  sh.innerHTML =
    '<div class="pv-grab"></div><button class="pv-x" aria-label="Fechar">×</button>' +
    '<div class="pv-steps"><b class="a">1 · Seus dados</b><b>2 · Pagamento</b></div>' +
    '<div class="pv-sum"><img alt="" src="' + (P.capa || "") + '"><div><strong>' + (P.produto || "") + '</strong>Acesso na hora · garantia de 7 dias</div><em>' + (P.preco || "") + "</em></div>" +
    "<h3>Para onde enviamos o acesso?</h3><p class=\"s\">Depois você só escolhe Pix ou cartão no pagamento seguro.</p>" +
    '<form novalidate><label for="pv-n">Nome</label><input id="pv-n" name="name" autocomplete="name" required>' +
    '<label for="pv-e">E-mail (o acesso chega aqui)</label><input id="pv-e" name="email" type="email" inputmode="email" autocomplete="email" required>' +
    '<label for="pv-p">WhatsApp</label><input id="pv-p" name="phone" type="tel" inputmode="tel" autocomplete="tel" placeholder="(21) 99999-9999" required>' +
    '<div class="pv-err" aria-live="polite"></div><button class="pv-go" type="submit">Ir para o pagamento →</button></form>' +
    '<div class="pv-trust"><span>🔒 Pagamento seguro Kiwify</span><span>Pix ou cartão</span><span>Garantia de 7 dias</span></div>' +
    '<a class="pv-skip" href="#">Prefiro preencher direto no pagamento</a>';
  document.body.appendChild(ov); document.body.appendChild(sh);

  function abrir(e) { if (e) e.preventDefault(); ov.classList.add("on"); sh.classList.add("on"); cl("abriu_checkout"); fb("track", "InitiateCheckout", { content_name: P.produto, value: parseFloat(String(P.preco||"").replace(/[^\d,]/g,"").replace(",",".")) || 0, currency: "BRL" }); fb("trackCustom", "CliqueComprar", { produto: P.produto }); setTimeout(function () { try { sh.querySelector("#pv-n").focus({ preventScroll: true }); } catch (e) {} }, 320); }
  function fechar() { ov.classList.remove("on"); sh.classList.remove("on"); }
  ov.onclick = fechar; sh.querySelector(".pv-x").onclick = fechar;
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") fechar(); });

  function destino(extra) {
    var u = P.url, ps = [];
    if (extra) for (var k in extra) if (extra[k]) ps.push(k + "=" + encodeURIComponent(extra[k]));
    if (qs) ps.push(qs);
    return u + (ps.length ? (u.indexOf("?") < 0 ? "?" : "&") + ps.join("&") : "");
  }
  sh.querySelector(".pv-skip").onclick = function (e) { e.preventDefault(); cl("pulou_dados"); location.href = destino(); };

  var tel = sh.querySelector("#pv-p");
  tel.addEventListener("input", function () {
    var d = tel.value.replace(/\D/g, "").slice(0, 11), o = d;
    if (d.length > 2) o = "(" + d.slice(0, 2) + ") " + d.slice(2);
    if (d.length > 7) o = "(" + d.slice(0, 2) + ") " + d.slice(2, 7) + "-" + d.slice(7);
    tel.value = o;
  });
  sh.querySelector("form").onsubmit = function (e) {
    e.preventDefault();
    var n = this.name.value.trim(), m = this.email.value.trim(), p = tel.value.replace(/\D/g, ""), er = sh.querySelector(".pv-err");
    if (n.length < 3) { er.textContent = "Digite seu nome."; return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(m)) { er.textContent = "Confira o e-mail: é por ele que chega o acesso."; return; }
    var ddds = "11 12 13 14 15 16 17 18 19 21 22 24 27 28 31 32 33 34 35 37 38 41 42 43 44 45 46 47 48 49 51 53 54 55 61 62 63 64 65 66 67 68 69 71 73 74 75 77 79 81 82 83 84 85 86 87 88 89 91 92 93 94 95 96 97 98 99";
    if (p.length !== 11 || p.charAt(2) !== "9" || ddds.indexOf(p.slice(0, 2)) < 0 || /^(\d)\1+$/.test(p.slice(2))) { er.textContent = "Confira o WhatsApp: DDD + 9 + número (11 dígitos). O suporte fala com você por ele."; return; }
    er.textContent = "";
    fb("track", "Lead", { content_name: P.produto });
    cl("preencheu_dados");
    var b = this.querySelector(".pv-go"); b.textContent = "Abrindo o pagamento…"; b.disabled = true;
    location.href = destino({ name: n, email: m, phone: p, region: "br" });
  };

  document.querySelectorAll('a[href*="pay.kiwify.com.br"]').forEach(function (a) { a.addEventListener("click", abrir); });

  // Revelar seções ao rolar
  var els = document.querySelectorAll("section .w > *");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add("in"); io.unobserve(x.target); } }); }, { rootMargin: "0px 0px -8% 0px" });
    els.forEach(function (el) { el.classList.add("rv"); io.observe(el); });
  }
  // Marca quando assiste o vídeo
  document.querySelectorAll("video").forEach(function (v) { v.addEventListener("play", function () { cl("assistiu_video"); }, { once: true }); });
})();
