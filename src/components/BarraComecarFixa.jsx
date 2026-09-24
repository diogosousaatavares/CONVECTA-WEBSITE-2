import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { PRECO_DESDE_TEXTO } from "@/lib/seo";

/*
 * O botão que não sai do ecrã, no telemóvel.
 *
 * No computador o «Começar grátis» está sempre na barra de cima. No telemóvel
 * a barra tem só o menu, e a partir do primeiro scroll o botão desaparece —
 * a pessoa lê tudo, convence-se, e não tem onde carregar. Esta barra aparece
 * quando o topo sai de vista e fica no fundo, onde o polegar está.
 *
 * ── Duas maneiras de saber quando aparecer ───────────────────────────────
 *
 * Com `alvo`, vigia-se esse elemento (o herói da página inicial tem id
 * «solucoes»): enquanto ele estiver à vista não há barra, para não haver
 * dois botões iguais no mesmo ecrã. É o modo certo, porque a barra aparece
 * exactamente quando o outro botão desaparece.
 *
 * Sem `alvo` — ou quando o elemento não existe — usa-se a altura do scroll.
 * As páginas longas (preços, funcionalidades, como funciona, perguntas) não
 * têm um id no herói, e estar certo a 600 px vale infinitamente mais do que
 * estar perfeito em nenhuma delas: numa página de dez ecrãs, quem lê até ao
 * meio não tem nada em que carregar.
 */
export default function BarraComecarFixa({ alvo }) {
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const el = alvo ? document.getElementById(alvo) : null;

    if (el && typeof IntersectionObserver !== "undefined") {
      const obs = new IntersectionObserver(([e]) => setVisivel(!e.isIntersecting), { threshold: 0.05 });
      obs.observe(el);
      return () => obs.disconnect();
    }

    // Sem alvo: 600 px é pouco mais do que um ecrã de telemóvel — já passou
    // o primeiro botão, e ainda falta quase tudo por ler.
    const aoRolar = () => setVisivel(window.scrollY > 600);
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, [alvo]);

  // O WhatsApp flutuante sobe para não ficar por baixo desta barra, e o
  // corpo da página ganha espaço em baixo para o rodapé não ficar tapado.
  useEffect(() => {
    document.body.classList.toggle("cv-com-barra", visivel);
    return () => document.body.classList.remove("cv-com-barra");
  }, [visivel]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .cv-barra-fixa {
          position: fixed; left: 0; right: 0; bottom: 0; z-index: 55;
          display: flex; align-items: center; justify-content: space-between; gap: 12px;
          padding: 10px 16px calc(10px + env(safe-area-inset-bottom));
          background: rgba(251,250,248,.94); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
          border-top: 1px solid var(--cv-linha);
          transform: translateY(110%); transition: transform .28s ease;
        }
        .cv-barra-fixa.on { transform: translateY(0); }
        .cv-barra-fixa small { font-size: 12px; color: var(--cv-ink-2); line-height: 1.3; }
        .cv-barra-fixa a {
          display: inline-flex; align-items: center; gap: 8px; flex-shrink: 0;
          padding: 12px 18px; border-radius: 999px; text-decoration: none;
          background: var(--cv-amarelo); color: var(--cv-amarelo-texto); font-weight: 700; font-size: 14px;
        }
        body.cv-com-barra .cv-wa-flutuante { bottom: calc(78px + env(safe-area-inset-bottom)); }
        @media (min-width: 900px) { .cv-barra-fixa { display: none; } }
        @media (prefers-reduced-motion: reduce) { .cv-barra-fixa { transition: none; } }
      ` }} />
      <div className={`cv-barra-fixa${visivel ? " on" : ""}`} aria-hidden={!visivel}>
        <small>Sem cartão para começar<br />Desde {PRECO_DESDE_TEXTO}/mês</small>
        <Link
          to="/comecar"
          tabIndex={visivel ? 0 : -1}
          onClick={() => { try { window.trackEvent?.("comecar_click", { origem: "barra-fixa" }); } catch {} }}
        >
          Começar grátis <ArrowRight size={16} />
        </Link>
      </div>
    </>
  );
}
