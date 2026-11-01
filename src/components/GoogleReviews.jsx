import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

/*
 * GOOGLE REVIEWS na página inicial (01/11/2026, Diogo).
 *
 * O suplemento novo: depois de cada corte, o cliente da barbearia recebe o
 * link para a avaliar no Google. As imagens são as do Diogo
 * (public/google-reviews: largo no computador, alto no telemóvel) e já trazem
 * as três vantagens escritas — por isso aqui só o título, o preço e o botão.
 * 2,99 €/mês, em qualquer plano (src/lib/extras.js do painel).
 */
export default function GoogleReviews() {
  return (
    <section id="google-reviews" className="cv-wrap cv-sec gr-site" aria-labelledby="gr-titulo">
      <ScrollReveal>
        <div className="gr-site-cab">
          <p className="cv-olho">Novo · Google Reviews</p>
          <h2 id="gr-titulo" className="cv-h2">
            Mais avaliações no Google. <span className="cv-marca">Sem teres de pedir.</span>
          </h2>
          <p className="gr-site-sub">Depois de cada corte, o teu cliente recebe o link para te avaliar no Google. Mais avaliações, mais confiança — e apareces primeiro quando procuram uma barbearia perto.</p>
        </div>
      </ScrollReveal>
      <ScrollReveal delay={0.08}>
        <picture>
          <source media="(max-width: 720px)" srcSet="/google-reviews/alto.webp" type="image/webp" />
          <source srcSet="/google-reviews/largo.webp" type="image/webp" />
          <img className="gr-site-img" src="/google-reviews/largo.jpg" width="1671" height="941" loading="lazy"
            alt="Google Reviews na Convecta: ganha mais confiança, atrai novos clientes e melhora o teu posicionamento no Google" />
        </picture>
      </ScrollReveal>
      <ScrollReveal delay={0.12}>
        <div className="gr-site-fim">
          <span className="gr-site-preco"><b>+2,99 €/mês</b> · em qualquer plano · desligas quando quiseres</span>
          <Link to="/comecar" className="dt-cta">Começar grátis <ArrowRight size={18} /></Link>
        </div>
      </ScrollReveal>
    </section>
  );
}
