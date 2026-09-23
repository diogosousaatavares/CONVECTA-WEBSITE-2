import React, { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import BotaoComecar from "@/components/BotaoComecar";

// O editor do painel («O Meu Site»), tal e qual, a mexer no site verdadeiro
// da barbearia de demonstração (convectacutts). Vive no painel (administrador.marcacoes.app/personalizar)
// e aparece aqui numa moldura: é o mesmo código, por isso nunca fica
// diferente do que o barbeiro vai ter. Não grava nada.
const DEMO = "https://administrador.marcacoes.app/personalizar";

export default function PersonalizacaoDemo() {
  // Só se carrega quando a pessoa pede: são duas apps a abrir, e quem não
  // chega a esta secção não tem de pagar esse peso.
  const [aberta, setAberta] = useState(false);

  return (
    <section id="personalizacao" className="cv-wrap cv-sec">
      <ScrollReveal>
        <p className="cv-olho">Personalização</p>
        <h2 className="cv-h2">A app é da tua barbearia. <span className="cv-marca">Não é nossa.</span></h2>
        <p className="cv-texto" style={{ marginTop: 16, maxWidth: 640 }}>
          Nas apps de marcações que já conheces, o teu cliente marca ao lado da concorrência.
          Aqui vê o teu nome, o teu logótipo e as tuas cores — e és tu que escolhes cada peça.
          Experimenta o editor que vais ter no teu painel, num site de barbearia a funcionar:
          toca num título, num botão, num ícone, e muda-lhe a cor.
        </p>
      </ScrollReveal>

      <div style={{ marginTop: 28, borderRadius: 22, overflow: "hidden", background: "#0B0B0C",
        border: "1px solid rgba(0,0,0,.12)", boxShadow: "0 30px 70px -30px rgba(0,0,0,.45)" }}>
        {aberta ? (
          <iframe className="pd-moldura" src={DEMO} title="Experimenta a personalização" loading="lazy" />
        ) : (
          <div style={{ display: "grid", placeItems: "center", textAlign: "center", padding: "72px 20px", color: "#EDE8DF" }}>
            <div style={{ maxWidth: 440 }}>
              <p style={{ fontSize: 13, letterSpacing: ".18em", textTransform: "uppercase", color: "#FEE96D", margin: 0 }}>Demonstração ao vivo</p>
              <p style={{ fontSize: 22, fontWeight: 700, margin: "12px 0 8px", color: "#fff" }}>O editor do teu painel, aqui mesmo</p>
              <p style={{ fontSize: 14.5, color: "#B9B2A6", margin: "0 0 22px", lineHeight: 1.55 }}>
                Cores, fundo, tipografia, textos e cada peça do site, com o telemóvel a mudar enquanto mexes. Nada é gravado.
              </p>
              <button type="button" onClick={() => setAberta(true)}
                style={{ background: "#FEE96D", color: "#141210", border: 0, borderRadius: 12, padding: "14px 24px",
                  fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
                Experimentar agora
              </button>
            </div>
          </div>
        )}
      </div>

      <div style={{ marginTop: 22, display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap" }}>
        <BotaoComecar origem="personalizacao">Quero a minha</BotaoComecar>
        <span style={{ fontSize: 13, color: "var(--cv-ink-3)" }}>O que mudares aqui não fica gravado. No teu painel, fica.</span>
      </div>
    </section>
  );
}
