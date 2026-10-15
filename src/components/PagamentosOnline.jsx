import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CalendarCheck, Landmark, SlidersHorizontal, Smartphone } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

/*
 * PAGAMENTOS ONLINE (15/10/2026).
 *
 * O cliente paga ao marcar — metade ou tudo, nos serviços que o dono
 * escolher. O dinheiro cai na conta Stripe do negócio; a Convecta não fica
 * com nada. Incluído no Profissional e no Business; no Essencial é um extra
 * de 4,99 €/mês (src/lib/extras.js do painel).
 */
const LOGOS = [
  ["visa", "Visa"], ["mastercard", "Mastercard"], ["applepay", "Apple Pay"],
  ["googlepay", "Google Pay"], ["mbway", "MB WAY"],
];

const VANTAGENS = [
  { Ic: CalendarCheck, t: "Menos faltas", d: "Quem já pagou aparece. E se faltar, o que pagou fica contigo." },
  { Ic: Landmark, t: "O dinheiro é teu", d: "Cai na tua conta e passa para o teu banco. A Convecta não fica com nada." },
  { Ic: SlidersHorizontal, t: "Tu decides", d: "Metade ou o serviço todo, e só nos serviços que escolheres." },
  { Ic: Smartphone, t: "Paga como quiser", d: "Cartão, Apple Pay, Google Pay ou MB WAY, em segundos." },
];

export default function PagamentosOnline() {
  return (
    <section id="pagamentos" className="cv-wrap cv-sec po" aria-labelledby="po-titulo">
      <ScrollReveal>
        <p className="cv-olho">Pagamentos online</p>
        <h2 id="po-titulo" className="cv-h2 po-titulo">
          O cliente paga ao marcar. <span className="cv-marca">Acabam as faltas.</span>
        </h2>
        <div className="po-logos" aria-label="Cartão, Apple Pay, Google Pay e MB WAY">
          {LOGOS.map(([id, nome]) => (
            <img key={id} src={`/pagamentos/${id}.png`} alt={nome} height="32" loading="lazy" className={`po-logo po-logo-${id}`} />
          ))}
        </div>
      </ScrollReveal>

      <div className="po-grelha">
        {VANTAGENS.map(({ Ic, t, d }, i) => (
          <ScrollReveal key={t} delay={0.06 * i}>
            <div className="po-cartao">
              <span className="po-icone"><Ic size={22} strokeWidth={1.8} /></span>
              <h3>{t}</h3>
              <p className="cv-mini">{d}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal>
        <div style={{ textAlign: "center", marginTop: 36 }}>
          <Link to="/comecar" className="dt-cta">Começar <ArrowRight size={18} /></Link>
        </div>
      </ScrollReveal>
    </section>
  );
}
