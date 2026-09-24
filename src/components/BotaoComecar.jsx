import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

/*
 * O botão que paga o site.
 *
 * Há uma regra simples numa página que quer converter: **um** botão manda, e
 * vê-se de longe. O que estava aqui antes era um botão preto a mandar para a
 * demonstração — e a demonstração já não existe.
 *
 * Três coisas fazem-no destacar, e nenhuma delas é gritar:
 *
 *   1. É o único elemento amarelo cheio acima da dobra. A cor da marca usada
 *      uma vez só é um sinal; usada em cinco sítios é decoração.
 *   2. Tem um brilho que respira devagar. Movimento lento na periferia da
 *      visão puxa o olho sem incomodar — ao contrário de um piscar, que o
 *      cérebro aprende a ignorar em segundos.
 *   3. Um reflexo atravessa-o de tempos a tempos, como luz num objecto real.
 *
 * `prefers-reduced-motion` desliga as duas animações. Quem pediu ao sistema
 * para parar de mexer as coisas tem razões — enjoo, vertigens, epilepsia — e
 * um botão bonito não vale isso. Fica o brilho, parado.
 */

const CSS = `
@keyframes cvRespira {
  0%, 100% { box-shadow: 0 0 0 0 rgba(254,233,109,.45), 0 10px 30px -12px rgba(254,233,109,.55); }
  50%      { box-shadow: 0 0 0 14px rgba(254,233,109,0), 0 16px 40px -12px rgba(254,233,109,.75); }
}
@keyframes cvReflexo {
  0%   { transform: translateX(-130%) skewX(-18deg); }
  55%  { transform: translateX(240%)  skewX(-18deg); }
  100% { transform: translateX(240%)  skewX(-18deg); }
}
.cv-comecar {
  position: relative; overflow: hidden; isolation: isolate;
  display: inline-flex; align-items: center; gap: 10px;
  padding: 16px 30px; border-radius: 100px;
  font-size: 1rem; font-weight: 700; letter-spacing: -0.01em;
  text-decoration: none; border: 0; cursor: pointer; font-family: inherit;
  background: var(--cv-amarelo); color: var(--cv-amarelo-texto);
  animation: cvRespira 2.8s ease-in-out infinite;
  transition: transform .18s ease, filter .18s ease;
}
.cv-comecar::after {
  content: ""; position: absolute; inset: 0 auto 0 0; z-index: -1;
  width: 38%; background: linear-gradient(90deg, transparent, rgba(255,255,255,.75), transparent);
  animation: cvReflexo 4.2s ease-in-out infinite;
}
.cv-comecar:hover { transform: translateY(-2px); filter: brightness(1.04); }
.cv-comecar:active { transform: translateY(0); }
.cv-comecar:focus-visible { outline: 3px solid var(--cv-ink); outline-offset: 3px; }
.cv-comecar-grande { padding: 19px 36px; font-size: 1.06rem; }

@media (prefers-reduced-motion: reduce) {
  .cv-comecar { animation: none; box-shadow: 0 10px 30px -12px rgba(254,233,109,.6); }
  .cv-comecar::after { animation: none; display: none; }
  .cv-comecar:hover { transform: none; }
}
`;

export default function BotaoComecar({ children = "Começar grátis", grande = false, to = "/comecar", origem = "", onClick, ...resto }) {
  // Cada clique fica registado com o sitio de onde veio (hero, precos,
  // fecho...). E o que diz qual dos botoes esta a pagar o site.
  const aoClicar = (e) => {
    try { window.trackEvent?.("comecar_click", { origem: origem || (typeof window !== "undefined" ? window.location.pathname : "") }); } catch {}
    onClick?.(e);
  };
  return (
    <>
      {/* Em linha de propósito: o site é pré-desenhado no build, e regras que
          só chegassem depois do javascript arrancar davam um salto visível na
          primeira pintura — logo no botão que mais interessa. */}
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <Link to={to} onClick={aoClicar} className={`cv-comecar${grande ? " cv-comecar-grande" : ""}`} {...resto}>
        {children} <ArrowRight size={18} strokeWidth={2.5} />
      </Link>
    </>
  );
}
