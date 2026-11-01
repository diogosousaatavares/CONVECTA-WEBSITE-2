import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Star, TrendingUp, MapPin } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

/*
 * GOOGLE REVIEWS na página inicial (01/11/2026, Diogo).
 *
 * «Para não parecer uma imagem solta»: o texto e as três vantagens são HTML
 * (não vêm escritos na imagem); da imagem do Diogo fica só o telemóvel,
 * recortado (public/google-reviews/telemovel.webp), em cima de uma mancha
 * amarela que respira. Dinamismo: o telemóvel flutua, chegam avaliações
 * novas («+1 ★★★★★») e o contador sobe — é a ideia do suplemento a
 * acontecer à frente de quem lê. Tudo pára com «reduzir movimento».
 * 2,99 €/mês, em qualquer plano (src/lib/extras.js do painel).
 */
const VANTAGENS = [
  { Ic: Star, t: "Ganha mais confiança", d: "Quem vê muitas estrelas marca sem medo." },
  { Ic: TrendingUp, t: "Atrai novos clientes", d: "Mais avaliações, mais gente a escolher-te." },
  { Ic: MapPin, t: "Sobe no Google Maps", d: "Apareces primeiro quando procuram uma barbearia perto." },
];
const INICIO = 128;

export default function GoogleReviews() {
  const ref = useRef(null);
  const [visivel, setVisivel] = useState(false);
  const [total, setTotal] = useState(INICIO);
  const [onda, setOnda] = useState(0);   // muda a cada avaliação nova (reinicia a animação do aviso)

  // Só anima quando a secção está à vista.
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") { setVisivel(true); return; }
    const io = new IntersectionObserver(([e]) => setVisivel(e.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  useEffect(() => {
    if (!visivel) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => { setTotal(n => (n >= INICIO + 9 ? INICIO : n + 1)); setOnda(o => o + 1); }, 2600);
    return () => clearInterval(t);
  }, [visivel]);

  return (
    <section id="google-reviews" ref={ref} className="cv-wrap cv-sec grs" aria-labelledby="grs-titulo">
      <div className="grs-grelha">
        <div className="grs-texto">
          <ScrollReveal>
            <p className="cv-olho">Novo · Google Reviews</p>
            <h2 id="grs-titulo" className="cv-h2">
              Mais avaliações no Google. <span className="cv-marca">Sem teres de pedir.</span>
            </h2>
            <p className="grs-sub">Depois de cada corte, o teu cliente recebe o link para te avaliar no Google. Tu não tens de fazer nada.</p>
          </ScrollReveal>
          <ul className="grs-lista">
            {VANTAGENS.map(({ Ic, t, d }, i) => (
              <ScrollReveal key={t} delay={0.08 + i * 0.08}>
                <li>
                  <span className="grs-ico"><Ic size={20} strokeWidth={2} /></span>
                  <span><b>{t}</b><small>{d}</small></span>
                </li>
              </ScrollReveal>
            ))}
          </ul>
          <ScrollReveal delay={0.32}>
            <div className="grs-fim">
              <Link to="/comecar" className="dt-cta">Começar grátis <ArrowRight size={18} /></Link>
              <span className="grs-preco"><b>+2,99 €/mês</b> · em qualquer plano</span>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.1}>
          <div className={`grs-visual${visivel ? " vivo" : ""}`} aria-hidden="true">
            <div className="grs-mancha" />
            <img className="grs-tel" src="/google-reviews/telemovel.webp" width="900" height="862" alt="" loading="lazy" />
            {/* o contador de avaliações a subir */}
            <div className="grs-contador">
              <span className="grs-estrelas">{[0, 1, 2, 3, 4].map(i => <Star key={i} size={13} fill="currentColor" strokeWidth={0} />)}</span>
              <b key={total} className="grs-num">{total}</b><span>avaliações</span>
            </div>
            {/* a avaliação nova que chega */}
            <div key={onda} className="grs-nova">
              <span className="grs-nova-mais">+1</span>
              <span>Nova avaliação<span className="grs-estrelas">{[0, 1, 2, 3, 4].map(i => <Star key={i} size={11} fill="currentColor" strokeWidth={0} />)}</span></span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
