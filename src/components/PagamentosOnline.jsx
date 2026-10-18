import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CalendarCheck, Landmark, SlidersHorizontal, Smartphone } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

/*
 * PAGAMENTOS ONLINE na página inicial (15/10/2026; redesenhado a 18/10).
 *
 * A imagem primeiro — o cliente a pagar, o barbeiro a receber —, ao lado o
 * que interessa em quatro linhas, e «Saber mais», que abre a página
 * /pagamentos-online com tudo. Antes eram quatro cartões iguais e um botão.
 * Incluído no Profissional e no Business; no Essencial é um extra de
 * 4,99 €/mês (src/lib/extras.js do painel).
 */
const LOGOS = [
  ["visa", "Visa"], ["mastercard", "Mastercard"], ["applepay", "Apple Pay"],
  ["googlepay", "Google Pay"], ["mbway", "MB WAY"],
];

const VANTAGENS = [
  { Ic: CalendarCheck, t: "Menos faltas", d: "Quem já pagou aparece." },
  { Ic: Landmark, t: "O dinheiro é teu", d: "Vai direto para a tua conta. A Convecta não fica com nada." },
  { Ic: SlidersHorizontal, t: "Tu decides", d: "Metade ou tudo, e só nos serviços que escolheres." },
  { Ic: Smartphone, t: "Paga como quiser", d: "Cartão, Apple Pay, Google Pay ou MB WAY." },
];

export default function PagamentosOnline() {
  return (
    <section id="pagamentos" className="cv-wrap cv-sec po" aria-labelledby="po-titulo">
      <div className="po2">
        {/* Sem imagem (18/10/2026, pedido do Diogo). */}
        <ScrollReveal>
          <div className="po2-texto">
            <p className="cv-olho">Pagamentos online</p>
            <h2 id="po-titulo" className="cv-h2 po-titulo">
              O cliente paga ao marcar. <span className="cv-marca">Acabam as faltas.</span>
            </h2>
            <ul className="po2-lista">
              {VANTAGENS.map(({ Ic, t, d }) => (
                <li key={t}>
                  <span className="po-icone"><Ic size={18} strokeWidth={1.9} /></span>
                  <span><b>{t}.</b> {d}</span>
                </li>
              ))}
            </ul>
            <div className="po-logos" aria-label="Cartão, Apple Pay, Google Pay e MB WAY">
              {LOGOS.map(([id, nome]) => (
                <span key={id} className="po-logo" title={nome}><img src={`/pagamentos/${id}.png`} alt={nome} loading="lazy" /></span>
              ))}
            </div>
            <div className="po2-botoes">
              <Link to="/pagamentos-online" className="dt-cta">Saber mais <ArrowRight size={18} /></Link>
              <Link to="/comecar" className="pol-sec">Começar grátis</Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
