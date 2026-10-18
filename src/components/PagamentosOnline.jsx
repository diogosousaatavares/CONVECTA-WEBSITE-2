import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CalendarCheck, Landmark, SlidersHorizontal, Smartphone, Check, Bell, Lock } from "lucide-react";
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

        {/* Ao lado, o passo de pagar desenhado em código (não é imagem):
            o que o cliente vê ao marcar e o aviso que chega ao barbeiro. */}
        <ScrollReveal delay={0.1}>
          <div className="pod" aria-hidden="true">
            <div className="pod-tel">
              <div className="pod-ilha" />
              <div className="pod-passo">Passo 3 de 3 · Confirmar</div>
              <div className="pod-casa">Barbearia Central</div>
              <div className="pod-linha"><span>Corte + barba</span><b>25,00 €</b></div>
              <div className="pod-linha"><span>Sábado, 24 out · 11:30</span><span>com Rui</span></div>
              <div className="pod-pag">
                <div className="pod-pag-t">Pagamento</div>
                <div className="pod-opcoes">
                  <span className="on"><i><Check size={12} strokeWidth={3} /></i>Pagar já · 25,00 €</span>
                  <span><i />Pagar na loja</span>
                </div>
                <div className="pod-logos">
                  {LOGOS.map(([id, nome]) => <img key={id} src={`/pagamentos/${id}.png`} alt="" loading="lazy" />)}
                </div>
              </div>
              <div className="pod-botao"><Lock size={15} /> Pagar 25,00 € e marcar</div>
              <div className="pod-seguro">Pagamento seguro com <b>Stripe</b></div>
            </div>
            <div className="pod-aviso">
              <span className="pod-aviso-ico"><Bell size={16} /></span>
              <span><b>Nova marcação · paga online</b>Corte + barba · sáb 11:30 · 25,00 €</span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
