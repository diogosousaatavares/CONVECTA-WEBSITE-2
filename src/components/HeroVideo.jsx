import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown } from "lucide-react";
import BotaoComecar from "@/components/BotaoComecar";
import { PRECO_DESDE_TEXTO } from "@/lib/seo";

/*
 * O TOPO DA PÁGINA INICIAL EM VÍDEO (12/10/2026, pedido do Diogo).
 *
 * O ecrã inteiro é um vídeo do mundo real — barbearias, salões, unhas,
 * estética, a app no telemóvel, os folhetos —, escurecido de baixo para
 * cima e da esquerda, com o título por cima, em branco. Há dois vídeos:
 * o do computador (deitado, três quadros lado a lado) e o do telemóvel (em
 * pé). Escolhe-se um só, pelo tamanho do ecrã, para ninguém descarregar os
 * dois.
 *
 * Os ficheiros têm a versão no nome (-v1): as imagens e os vídeos do site
 * ficam uma semana na cache do browser, e um ficheiro trocado com o mesmo
 * nome não chegava a ninguém. Vídeo novo = nome novo.
 *
 * Sem som e em ciclo. O sobrolho por cima do título e o botão de parar
 * saíram a pedido do Diogo (12/10/2026). Quem pediu ao sistema menos
 * movimento, ou poupança de dados, recebe a fotografia parada; fora do ecrã
 * o vídeo pára sozinho.
 */
const VIDEO = {
  // v2 (12/10/2026): 1280 px e uma imagem-chave a cada 2 s — o de 1600 px
  // travava em computadores mais fracos.
  pc: { src: "/video/entrada-pc-v2.mp4", poster: "/video/entrada-pc-v2.jpg" },
  tlm: { src: "/video/entrada-tlm-v1.mp4", poster: "/video/entrada-tlm-v1.jpg" },
};

const CSS = `
.hv { position: relative; min-height: 100vh; min-height: 100svh; display: flex; align-items: flex-end; overflow: hidden; background: #14110e; color: #fff; isolation: isolate; }
.hv-fundo, .hv-video, .hv-veu { position: absolute; inset: 0; width: 100%; height: 100%; }
.hv-fundo { background: #14110e url(${VIDEO.pc.poster}) center / cover no-repeat; z-index: -3; }
.hv-video { object-fit: cover; z-index: -2; transform: translateZ(0); }
.hv-veu { z-index: -1; background:
  linear-gradient(90deg, rgba(14,12,10,.78) 0%, rgba(14,12,10,.45) 42%, rgba(14,12,10,.12) 70%, rgba(14,12,10,.25) 100%),
  linear-gradient(180deg, rgba(14,12,10,.55) 0%, rgba(14,12,10,0) 22%, rgba(14,12,10,0) 55%, rgba(14,12,10,.7) 100%); }
.hv-conteudo { width: 100%; padding-top: 120px; padding-bottom: 120px; }
.hv-h1 { font-family: var(--font-heading); font-weight: 400; font-size: clamp(2.6rem, 5vw, 4.6rem); line-height: 1.04; letter-spacing: -0.01em; margin: 0; color: #fff; max-width: 15ch; text-wrap: balance; }
.hv-h1 em { font-style: normal; color: var(--cv-amarelo); display: block; }
.hv-texto { margin: 22px 0 36px; max-width: 28ch; font-size: 1.05rem; line-height: 1.7; color: rgba(255,255,255,.85); }
.hv-acoes { display: flex; align-items: center; gap: 30px; flex-wrap: wrap; }
.hv-linha { display: inline-flex; align-items: center; gap: 7px; font-size: 15px; color: #fff; text-decoration: none; border-bottom: 1px solid rgba(255,255,255,.55); padding-bottom: 2px; }
.hv-linha:hover { border-bottom-color: #fff; }
.hv-nota { margin: 34px 0 0; font-size: 15px; color: rgba(255,255,255,.72); }
.hv-mais:focus-visible { outline: 2px solid var(--cv-amarelo); outline-offset: 3px; }
.hv-mais { position: absolute; left: 50%; bottom: 26px; transform: translateX(-50%); display: flex; flex-direction: column; align-items: center; gap: 4px; background: none; border: 0; color: rgba(255,255,255,.85); font: inherit; font-size: 12px; letter-spacing: .24em; text-transform: uppercase; cursor: pointer; }
.hv-mais svg { animation: hvDesce 2s ease-in-out infinite; }
@keyframes hvDesce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(5px); } }

@media (max-width: 767px) {
  .hv-fundo { background-image: url(${VIDEO.tlm.poster}); }
  .hv-veu { background: linear-gradient(180deg, rgba(14,12,10,.5) 0%, rgba(14,12,10,0) 18%, rgba(14,12,10,.1) 45%, rgba(14,12,10,.86) 78%, rgba(14,12,10,.92) 100%); }
  .hv-conteudo { padding-top: 0; padding-bottom: calc(96px + env(safe-area-inset-bottom, 0px)); }
  .hv-h1 { font-size: clamp(2.3rem, 10.5vw, 3rem); }
  .hv-texto, .hv-linha, .hv-nota { display: none; }
  .hv-acoes { margin-top: 26px; }
  .hv-mais { left: 24px; transform: none; flex-direction: row; gap: 10px; bottom: calc(32px + env(safe-area-inset-bottom, 0px)); }
}
@media (prefers-reduced-motion: reduce) { .hv-mais svg { animation: none; } }
html.hv-a-ver .cv-aurora { display: none; }
`;

export default function HeroVideo() {
  const ref = useRef(null);

  // Escolher o vídeo só no browser (a página é pré-gerada sem ele): o do
  // telemóvel abaixo de 768 px, o do computador acima.
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const tlm = window.matchMedia("(max-width: 767px)").matches;
    const qual = tlm ? VIDEO.tlm : VIDEO.pc;
    /*
     * No iPhone (12/10/2026) o vídeo ficava parado como uma fotografia.
     * Três razões, três respostas:
     *  - o Safari só deixa arrancar sozinho um vídeo SEM SOM, e o `muted`
     *    do React não chega a ser escrito no HTML: põe-se à mão;
     *  - quem tinha «Reduzir movimento» ligado recebia a fotografia, e já
     *    não há botão para o pôr a andar — passa a andar para toda a gente
     *    (é um vídeo de fundo, mudo e lento);
     *  - em Poupança de energia o iOS recusa o arranque automático: tenta-se
     *    outra vez no primeiro toque ou scroll, que o iOS já deixa.
     */
    v.muted = true;
    v.defaultMuted = true;
    v.setAttribute("muted", "");
    v.setAttribute("playsinline", "");
    v.setAttribute("webkit-playsinline", "");
    v.poster = qual.poster;
    if (navigator.connection?.saveData) { v.dataset.parado = "1"; return; }
    const tentar = () => v.play().catch(() => {});
    const aoTocar = () => { tentar(); tirar(); };
    const tirar = () => ["touchstart", "click", "scroll", "keydown"].forEach(e => window.removeEventListener(e, aoTocar));
    /*
     * O vídeo é fundo decorativo: a fotografia do topo (.hv-fundo) já está
     * no ecrã. Carregá-lo só DEPOIS de a página pintar — senão ~1,7 MB
     * competem com o que o cliente precisa de ver primeiro e atrasam tudo
     * (Speed Index). Espera-se pelo 'load' e por um momento parado.
     */
    let cancelado = false;
    const arrancar = () => {
      if (cancelado || !ref.current) return;
      const vv = ref.current;
      vv.src = qual.src;
      vv.play().catch(() => {
        ["touchstart", "click", "scroll", "keydown"].forEach(e => window.addEventListener(e, aoTocar, { passive: true, once: true }));
      });
      vv.addEventListener("canplay", tentar, { once: true });
    };
    const agendar = () => (window.requestIdleCallback ? requestIdleCallback(arrancar, { timeout: 2500 }) : setTimeout(arrancar, 1200));
    if (document.readyState === "complete") agendar();
    else window.addEventListener("load", agendar, { once: true });
    return () => { cancelado = true; tirar(); window.removeEventListener("load", agendar); };
  }, []);

  /*
   * Enquanto o topo está à vista, o fundo animado do site (as manchas
   * amarelas do AmbientBackground, que ficam tapadas pelo vídeo) não se
   * desenha — eram seis círculos enormes sempre a mexer, ao mesmo tempo
   * que o vídeo, e no computador travava. Quando o topo sai do ecrã, o
   * vídeo pára (não gasta nada lá em cima) e as manchas voltam.
   */
  useEffect(() => {
    const sec = ref.current?.parentElement;
    if (!sec || !("IntersectionObserver" in window)) return;
    const raiz = document.documentElement;
    const io = new IntersectionObserver(([e]) => {
      const v = ref.current;
      raiz.classList.toggle("hv-a-ver", e.isIntersecting);
      if (!v) return;
      if (!e.isIntersecting) v.pause();
      else if (v.dataset.parado !== "1") v.play().catch(() => {});
    }, { threshold: 0.05 });
    io.observe(sec);
    return () => { io.disconnect(); raiz.classList.remove("hv-a-ver"); };
  }, []);

  const verMais = () => {
    const alvo = document.getElementById("depois-do-topo");
    if (alvo) alvo.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="solucoes" className="hv">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="hv-fundo" aria-hidden="true" />
      <video ref={ref} className="hv-video" muted loop playsInline preload="none" aria-hidden="true" />
      <div className="hv-veu" aria-hidden="true" />

      <div className="cv-wrap hv-conteudo">
        <h1 className="hv-h1">
          Os teus clientes marcam sozinhos. <em>Tu só trabalhas.</em>
        </h1>

        <p className="hv-texto">Deixas de atender o telefone a meio de um cliente.</p>

        <div className="hv-acoes">
          <BotaoComecar grande origem="hero">Começar grátis</BotaoComecar>
          <Link
            className="hv-linha"
            to="/precos"
            onClick={() => { try { window.trackEvent?.("ver_precos_click", { origem: "hero" }); } catch {} }}
          >
            Ver os planos <ArrowRight size={15} />
          </Link>
        </div>

        <p className="hv-nota">
          Sem cartão para começar · 14 dias à experiência · Planos desde {PRECO_DESDE_TEXTO}/mês
        </p>
      </div>

      <button type="button" className="hv-mais" onClick={verMais}>
        Ver mais <ChevronDown size={18} />
      </button>
    </section>
  );
}
