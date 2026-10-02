import React from "react";
import ScrollReveal from "@/components/ScrollReveal";
import BotaoComecar from "@/components/BotaoComecar";

/*
 * A app da barbearia, num telemóvel, a sério.
 *
 * Era o editor inteiro do painel metido numa moldura grande e escura: sete
 * separadores, cartões de controlo, e o telemóvel ao lado. Quem chega a
 * convecta.pt não quer um editor — quer ver a app e perceber, em dois
 * segundos, que a pode pintar como quiser.
 *
 * Agora é só o telemóvel, e por cima dele o interruptor «Tocar para mudar».
 * Quem quiser experimentar liga-o e toca numa parte do site; quem não quiser
 * fica a olhar para a app da barbearia, que é o que interessa.
 *
 * O `?so=telemovel` é o mesmo código do painel a desenhar só essa parte, por
 * isso continua a não poder ficar diferente do que o barbeiro vai ter. Não
 * grava nada.
 */
const DEMO = "https://administrador.marcacoes.app/personalizar?so=telemovel";

export default function PersonalizacaoDemo() {
  return (
    <section id="personalizacao" className="cv-wrap cv-sec">
      <ScrollReveal>
        <p className="cv-olho">Personalização</p>
        <h2 className="cv-h2">A app é da tua barbearia. <span className="cv-marca">Não é nossa.</span></h2>
      </ScrollReveal>

      {/* Sem moldura, sem fundo e sem sombra: o telemóvel já tem a dele.
          Mais uma caixa à volta era a caixa a mais. */}
      <iframe className="pd-telemovel" src={DEMO} title="A app da barbearia, para experimentar" loading="lazy" />

      <div style={{ marginTop: 18, display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap", justifyContent: "center" }}>
        <BotaoComecar origem="personalizacao">Quero a minha</BotaoComecar>
        <span style={{ fontSize: 15, color: "var(--cv-ink-3)" }}>O que mudares aqui não fica gravado. No teu painel, fica.</span>
      </div>
    </section>
  );
}
