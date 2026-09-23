import React from "react";
import ScrollReveal from "@/components/ScrollReveal";
import BotaoComecar from "@/components/BotaoComecar";

// O editor do painel («O Meu Site»), tal e qual, a mexer no site verdadeiro
// da barbearia de demonstração (convectacutts). Vive no painel (administrador.marcacoes.app/personalizar)
// e aparece aqui numa moldura: é o mesmo código, por isso nunca fica
// diferente do que o barbeiro vai ter. Não grava nada.
const DEMO = "https://administrador.marcacoes.app/personalizar";

export default function PersonalizacaoDemo() {
  return (
    <section id="personalizacao" className="cv-wrap cv-sec">
      <ScrollReveal>
        <p className="cv-olho">Personalização</p>
        <h2 className="cv-h2">A app é da tua barbearia. <span className="cv-marca">Não é nossa.</span></h2>
      </ScrollReveal>

      <div style={{ marginTop: 28, borderRadius: 22, overflow: "hidden", background: "#0B0B0C",
        border: "1px solid rgba(0,0,0,.12)", boxShadow: "0 30px 70px -30px rgba(0,0,0,.45)" }}>
        {/* Aberta logo: o loading="lazy" só a carrega quando a secção está perto do ecrã. */}
        <iframe className="pd-moldura" src={DEMO} title="Experimenta a personalização" loading="lazy" />
      </div>

      <div style={{ marginTop: 22, display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap" }}>
        <BotaoComecar origem="personalizacao">Quero a minha</BotaoComecar>
        <span style={{ fontSize: 13, color: "var(--cv-ink-3)" }}>O que mudares aqui não fica gravado. No teu painel, fica.</span>
      </div>
    </section>
  );
}
