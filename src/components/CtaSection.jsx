import React from "react";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { useContactModal } from "@/lib/ContactModalContext";
import BotaoComecar from "@/components/BotaoComecar";

/*
 * O ultimo apelo.
 *
 * Era uma faixa preta com particulas a flutuar. Passa a ser branco com um
 * risco em cima e muito espaco: e o fim da pagina, nao precisa de gritar.
 */
export default function CtaSection({ title, buttonText = "Falar connosco", href, to, secondaryText }) {
  const { open: abrirModal } = useContactModal();

  return (
    <section className="cv-wrap cv-sec" style={{ paddingTop: 96, paddingBottom: 104 }}>
      <ScrollReveal>
        <h2 className="cv-h2" style={{ marginBottom: 32 }}>{title}</h2>
        {/* `to` e uma rota nossa e leva o botao forte: e o fim da pagina,
            e quem chegou ate aqui leu tudo — e o momento de pedir. */}
        {to
          ? <BotaoComecar to={to} grande>{buttonText}</BotaoComecar>
          : href
            ? <a className="cv-btn" href={href} target="_blank" rel="noopener">{buttonText} <ArrowRight size={15} /></a>
            : <button className="cv-btn" onClick={abrirModal} style={{ cursor: "pointer", fontFamily: "inherit" }}>{buttonText} <ArrowRight size={15} /></button>}
        {secondaryText && (
          <div style={{ marginTop: 20 }}>
            <button onClick={abrirModal} className="cv-btn-linha" style={{ background: "none", border: 0, borderBottom: "1px solid var(--cv-linha)", cursor: "pointer", fontFamily: "inherit" }}>
              {secondaryText}
            </button>
          </div>
        )}
      </ScrollReveal>
    </section>
  );
}
