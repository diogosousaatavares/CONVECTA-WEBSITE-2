import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown, Pause, Play } from "lucide-react";
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
 * Sem som, em ciclo, e com um botão para parar (é obrigatório para quem se
 * distrai com movimento). Quem pediu ao sistema menos movimento recebe a
 * fotografia parada, com o botão para o pôr a andar.
 */
const VIDEO = {
  pc: { src: "/video/entrada-pc-v1.mp4", poster: "/video/entrada-pc-v1.jpg" },
  tlm: { src: "/video/entrada-tlm-v1.mp4", poster: "/video/entrada-tlm-v1.jpg" },
};

const CSS = `
.hv { position: relative; min-height: 100vh; min-height: 100svh; display: flex; align-items: flex-end; overflow: hidden; background: #14110e; color: #fff; isolation: isolate; }
.hv-fundo, .hv-video, .hv-veu { position: absolute; inset: 0; width: 100%; height: 100%; }
.hv-fundo { background: #14110e url(${VIDEO.pc.poster}) center / cover no-repeat; z-index: -3; }
.hv-video { object-fit: cover; z-index: -2; }
.hv-veu { z-index: -1; background:
  linear-gradient(90deg, rgba(14,12,10,.78) 0%, rgba(14,12,10,.45) 42%, rgba(14,12,10,.12) 70%, rgba(14,12,10,.25) 100%),
  linear-gradient(180deg, rgba(14,12,10,.55) 0%, rgba(14,12,10,0) 22%, rgba(14,12,10,0) 55%, rgba(14,12,10,.7) 100%); }
.hv-conteudo { width: 100%; padding-top: 120px; padding-bottom: 120px; }
.hv-olho { display: flex; align-items: flex-start; gap: 11px; margin-bottom: 26px; max-width: 760px; }
.hv-olho span { width: 36px; height: 1px; background: rgba(255,255,255,.55); flex-shrink: 0; margin-top: 7px; }
.hv-olho p { margin: 0; font-size: 11.5px; letter-spacing: .22em; text-transform: uppercase; line-height: 1.75; color: rgba(255,255,255,.82); font-weight: 500; }
.hv-h1 { font-family: var(--font-heading); font-weight: 400; font-size: clamp(2.6rem, 5vw, 4.6rem); line-height: 1.04; letter-spacing: -0.01em; margin: 0; color: #fff; max-width: 15ch; text-wrap: balance; }
.hv-h1 em { font-style: normal; color: var(--cv-amarelo); display: block; }
.hv-texto { margin: 22px 0 36px; max-width: 28ch; font-size: 1.05rem; line-height: 1.7; color: rgba(255,255,255,.85); }
.hv-acoes { display: flex; align-items: center; gap: 30px; flex-wrap: wrap; }
.hv-linha { display: inline-flex; align-items: center; gap: 7px; font-size: 15px; color: #fff; text-decoration: none; border-bottom: 1px solid rgba(255,255,255,.55); padding-bottom: 2px; }
.hv-linha:hover { border-bottom-color: #fff; }
.hv-nota { margin: 34px 0 0; font-size: 15px; color: rgba(255,255,255,.72); }
.hv-pausa { position: absolute; right: 48px; bottom: 32px; width: 54px; height: 54px; border-radius: 50%; border: 1px solid rgba(255,255,255,.45); background: rgba(14,12,10,.25); color: #fff; display: flex; align-items: center; justify-content: center; cursor: pointer; backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px); }
.hv-pausa:hover { border-color: #fff; }
.hv-pausa:focus-visible, .hv-mais:focus-visible { outline: 2px solid var(--cv-amarelo); outline-offset: 3px; }
.hv-mais { position: absolute; left: 50%; bottom: 26px; transform: translateX(-50%); display: flex; flex-direction: column; align-items: center; gap: 4px; background: none; border: 0; color: rgba(255,255,255,.85); font: inherit; font-size: 12px; letter-spacing: .24em; text-transform: uppercase; cursor: pointer; }
.hv-mais svg { animation: hvDesce 2s ease-in-out infinite; }
@keyframes hvDesce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(5px); } }

@media (max-width: 767px) {
  .hv-fundo { background-image: url(${VIDEO.tlm.poster}); }
  .hv-veu { background: linear-gradient(180deg, rgba(14,12,10,.5) 0%, rgba(14,12,10,0) 18%, rgba(14,12,10,.1) 45%, rgba(14,12,10,.86) 78%, rgba(14,12,10,.92) 100%); }
  .hv-conteudo { padding-top: 0; padding-bottom: calc(96px + env(safe-area-inset-bottom, 0px)); }
  .hv-olho span { display: none; }
  .hv-olho p { font-size: 11px; letter-spacing: .2em; }
  .hv-olho { margin-bottom: 18px; }
  .hv-h1 { font-size: clamp(2.3rem, 10.5vw, 3rem); }
  .hv-texto, .hv-linha, .hv-nota { display: none; }
  .hv-acoes { margin-top: 26px; }
  .hv-pausa { right: 18px; bottom: auto; top: calc(92px + env(safe-area-inset-top, 0px)); width: 46px; height: 46px; }
  .hv-mais { left: 24px; transform: none; flex-direction: row; gap: 10px; bottom: calc(32px + env(safe-area-inset-bottom, 0px)); }
}
@media (prefers-reduced-motion: reduce) { .hv-mais svg { animation: none; } }
`;

export default function HeroVideo() {
  const ref = useRef(null);
  const [aAndar, setAAndar] = useState(true);

  // Escolher o vídeo só no browser (a página é pré-gerada sem ele): o do
  // telemóvel abaixo de 768 px, o do computador acima.
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const tlm = window.matchMedia("(max-width: 767px)").matches;
    const qual = tlm ? VIDEO.tlm : VIDEO.pc;
    v.poster = qual.poster;
    v.src = qual.src;
    const poupar = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      || navigator.connection?.saveData;
    if (poupar) { setAAndar(false); return; }
    v.play().catch(() => setAAndar(false));
  }, []);

  const alternar = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) { v.play().then(() => setAAndar(true)).catch(() => {}); }
    else { v.pause(); setAAndar(false); }
  };

  const verMais = () => {
    const alvo = document.getElementById("depois-do-topo");
    if (alvo) alvo.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="solucoes" className="hv">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="hv-fundo" aria-hidden="true" />
      <video ref={ref} className="hv-video" muted loop playsInline preload="auto" aria-hidden="true" />
      <div className="hv-veu" aria-hidden="true" />

      <div className="cv-wrap hv-conteudo">
        <div className="hv-olho">
          <span />
          <p>Marcações online e gestão para barbearias, salões e estética — ou dois tipos no mesmo espaço</p>
        </div>

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

      <button type="button" className="hv-pausa" onClick={alternar}
        aria-label={aAndar ? "Parar o vídeo" : "Pôr o vídeo a andar"}>
        {aAndar ? <Pause size={20} /> : <Play size={20} />}
      </button>

      <button type="button" className="hv-mais" onClick={verMais}>
        Ver mais <ChevronDown size={18} />
      </button>
    </section>
  );
}
