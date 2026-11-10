import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Bell, Lock, Star } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

/*
 * PAGAMENTOS ONLINE + GOOGLE REVIEWS numa só secção (10/11/2026, Diogo).
 * Mais simples: dois cartões lado a lado — à esquerda os pagamentos, à
 * direita o Google —, cada um com o título, três linhas e o mesmo desenho de
 * antes, em pequeno (o botão de pagar com os logótipos; o telemóvel com o
 * contador de avaliações e a «+1» a chegar). Substitui PagamentosOnline e
 * GoogleReviews na página inicial.
 */
const LOGOS = [["visa", "Visa"], ["mastercard", "Mastercard"], ["applepay", "Apple Pay"], ["googlepay", "Google Pay"], ["mbway", "MB WAY"]];
const PAGAR = ["Menos faltas: quem já pagou aparece", "O dinheiro vai direto para a tua conta", "Metade ou tudo — tu decides"];
const GOOGLE = ["O link vai sozinho depois de cada corte", "Mais estrelas, mais confiança", "Sobes no Google Maps"];
const INICIO = 128;

function Lista({ itens }) {
  return (
    <ul className="pg-lista">
      {itens.map(t => <li key={t}><span className="pg-v"><Check size={12} strokeWidth={3} /></span>{t}</li>)}
    </ul>
  );
}

export default function PagamentosEGoogle() {
  const ref = useRef(null);
  const [visivel, setVisivel] = useState(false);
  const [total, setTotal] = useState(INICIO);
  const [onda, setOnda] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") { setVisivel(true); return; }
    const io = new IntersectionObserver(([e]) => setVisivel(e.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  useEffect(() => {
    if (!visivel || window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => { setTotal(n => (n >= INICIO + 9 ? INICIO : n + 1)); setOnda(o => o + 1); }, 2600);
    return () => clearInterval(t);
  }, [visivel]);

  return (
    <section id="pagamentos" ref={ref} className="cv-wrap cv-sec pg" aria-labelledby="pg-titulo">
      <style>{`
.pg-topo{text-align:center;margin-bottom:34px}
.pg-grelha{display:grid;grid-template-columns:1fr 1fr;gap:20px}
.pg-cartao{display:flex;flex-direction:column;gap:16px;padding:28px;border-radius:24px;background:var(--cv-card,#fff);border:1px solid var(--cv-linha);box-shadow:0 24px 60px -40px rgba(36,32,28,.35);overflow:hidden}
.pg-cartao .cv-olho{margin:0}
.pg-cartao h3{font-family:var(--font-heading);font-weight:400;font-size:clamp(1.5rem,2.4vw,1.9rem);line-height:1.15;margin:0}
.pg-lista{list-style:none;margin:0;padding:0;display:grid;gap:10px}
.pg-lista li{display:flex;gap:10px;align-items:center;font-size:1rem;font-weight:600;color:var(--cv-ink)}
.pg-v{width:22px;height:22px;border-radius:50%;background:var(--cv-amarelo);color:var(--cv-ink);display:grid;place-items:center;flex-shrink:0}
.pg-visual{position:relative;height:250px;margin-top:auto;border-radius:18px;background:var(--cv-ground,#F6F3EE)}
.pg-pagar{position:absolute;left:50%;top:22px;transform:translateX(-50%);width:min(290px,86%);padding:16px;border-radius:18px;background:#fff;border:1px solid var(--cv-linha);box-shadow:0 18px 40px -24px rgba(36,32,28,.35);display:grid;gap:10px}
.pg-pagar-linha{display:flex;justify-content:space-between;font-size:.9rem;color:var(--cv-ink-2)}.pg-pagar-linha b{color:var(--cv-ink)}
.pg-pagar-botao{display:flex;align-items:center;justify-content:center;gap:7px;padding:11px;border-radius:999px;background:var(--cv-ink);color:var(--cv-card,#fff);font-weight:700;font-size:.9rem}
.pg-pagar .po-logos{margin:0;grid-template-columns:repeat(5,minmax(0,1fr));gap:5px}
.pg-pagar .po-logo{height:30px;padding:0 4px;border-radius:7px}.pg-pagar .po-logo img{max-height:15px}
.pg-visual .pod-aviso{right:14px;bottom:14px}
.pg-google .grs-tel{inset:6% 18%;width:64%;height:88%}
.pg-google .grs-mancha{inset:10% 22% 6% 22%}
.pg-google .grs-contador{right:12px;top:14px}
.pg-google .grs-nova{left:12px;bottom:14px}
.pg-cartao .pg-mais{display:inline-flex;align-items:center;gap:6px;font-weight:700;color:var(--cv-ink);text-decoration:none}
.pg-cartao .pg-mais:hover{text-decoration:underline}
.pg-gratis{display:inline-block;margin-left:8px;padding:3px 9px;border-radius:999px;background:var(--cv-amarelo);font-size:.75rem;font-weight:800;color:var(--cv-ink);vertical-align:2px}
@media (max-width:860px){.pg-grelha{grid-template-columns:1fr}.pg-cartao{padding:22px}}
`}</style>

      <ScrollReveal>
        <div className="pg-topo">
          <p className="cv-olho">Mais faturação</p>
          <h2 id="pg-titulo" className="cv-h2" style={{ margin: "0 auto" }}>Recebe antes. <span className="cv-marca">Aparece primeiro.</span></h2>
        </div>
      </ScrollReveal>

      <div className="pg-grelha">
        {/* ESQUERDA — pagamentos online */}
        <ScrollReveal>
          <div className="pg-cartao">
            <p className="cv-olho">Pagamentos online</p>
            <h3>O cliente paga ao marcar.</h3>
            <Lista itens={PAGAR} />
            <div className="pg-visual" aria-hidden="true">
              <div className="pg-pagar">
                <div className="pg-pagar-linha"><span>Corte + barba</span><b>25,00 €</b></div>
                <div className="pg-pagar-botao"><Lock size={14} /> Pagar e marcar</div>
                <div className="po-logos">{LOGOS.map(([id, nome]) => <span key={id} className="po-logo" title={nome}><img src={`/pagamentos/${id}.png`} alt="" loading="lazy" /></span>)}</div>
              </div>
              <div className="pod-aviso">
                <span className="pod-aviso-ico"><Bell size={16} /></span>
                <span><b>Nova marcação · paga online</b>Corte + barba · sáb 11:30</span>
              </div>
            </div>
            <Link to="/pagamentos-online" className="pg-mais">Saber mais <ArrowRight size={16} /></Link>
          </div>
        </ScrollReveal>

        {/* DIREITA — avaliações no Google */}
        <ScrollReveal delay={0.1}>
          <div className="pg-cartao">
            <p className="cv-olho">Google Reviews <span className="pg-gratis">Grátis</span></p>
            <h3>Mais avaliações no Google.</h3>
            <Lista itens={GOOGLE} />
            <div className={`pg-visual pg-google grs-visual${visivel ? " vivo" : ""}`} aria-hidden="true">
              <div className="grs-mancha" />
              <img className="grs-tel" src="/google-reviews/telemovel.webp" width="900" height="862" alt="" loading="lazy" />
              <div className="grs-contador">
                <span className="grs-estrelas">{[0, 1, 2, 3, 4].map(i => <Star key={i} size={12} fill="currentColor" strokeWidth={0} />)}</span>
                <b key={total} className="grs-num">{total}</b><span>avaliações</span>
              </div>
              <div key={onda} className="grs-nova">
                <span className="grs-nova-mais">+1</span>
                <span>Nova avaliação<span className="grs-estrelas">{[0, 1, 2, 3, 4].map(i => <Star key={i} size={10} fill="currentColor" strokeWidth={0} />)}</span></span>
              </div>
            </div>
            <Link to="/comecar" className="pg-mais">Começar grátis <ArrowRight size={16} /></Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
