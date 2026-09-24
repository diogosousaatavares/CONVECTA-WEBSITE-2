import React from "react";

/*
 * O fundo — as manchas amarelas por trás de tudo.
 *
 * ── Porque é que isto passou a ser uma lista ─────────────────────────────
 *
 * Eram seis <div> escritos à mão, cada um com o seu gradiente copiado. Seis
 * cópias da mesma ideia são seis sítios onde mexer quando o amarelo muda.
 * Agora é uma lista: a forma está num sítio só.
 *
 * ── E porque é que cada mancha ganhou uma classe ─────────────────────────
 *
 * São seis camadas do tamanho do ecrã, fixas, todas com uma animação que
 * nunca acaba. No computador não custa nada. Num telemóvel, seis camadas a
 * mexer para sempre é o telefone a aquecer no bolso enquanto alguém lê um
 * texto que nem se mexe — e as manchas nem se vêem num ecrã de 6 polegadas.
 *
 * A classe `cv-orbe` existe para o CSS poder dizer, no telemóvel: pára de
 * animar e apaga metade delas. Isso vive em index.css, ao pé das outras
 * regras de telemóvel, e não aqui — assim quem procura «o que muda no
 * telemóvel» encontra tudo no mesmo sítio.
 *
 * A ordem importa: as três primeiras são as que ficam no telemóvel, por
 * isso são as de cima — as que se apanham sem fazer scroll.
 */

const MANCHAS = [
  { d: 900, top: "-250px", left: "-200px", a: 0.13, meio: 0.04, fim: "70%", anim: "auroraFloat1 10s ease-in-out infinite" },
  { d: 600, top: "0vh", right: "-120px", a: 0.09, meio: 0.03, fim: "70%", anim: "auroraFloat2 12s ease-in-out infinite" },
  { d: 1000, top: "25vh", left: "50%", transform: "translateX(-50%)", a: 0.07, fim: "60%", anim: "auroraFloat3 14s ease-in-out infinite" },
  { d: 750, bottom: "-150px", right: "-130px", a: 0.11, meio: 0.03, fim: "70%", anim: "auroraFloat1 11s ease-in-out infinite 2s" },
  { d: 550, bottom: "5vh", left: "-100px", a: 0.08, fim: "65%", anim: "auroraFloat2 13s ease-in-out infinite 4s" },
  { d: 500, top: "55vh", left: "20%", a: 0.06, fim: "65%", anim: "auroraFloat4 16s ease-in-out infinite 6s" },
];

const gradiente = (m) =>
  m.meio
    ? `radial-gradient(circle, rgba(254,233,109,${m.a}) 0%, rgba(254,233,109,${m.meio}) ${m.fim === "70%" ? "45%" : "50%"}, transparent ${m.fim})`
    : `radial-gradient(circle, rgba(254,233,109,${m.a}) 0%, transparent ${m.fim})`;

export default function AmbientBackground() {
  return (
    <div
      className="cv-aurora"
      aria-hidden="true"
      style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}
    >
      {MANCHAS.map((m, i) => (
        <div
          key={i}
          className="cv-orbe"
          style={{
            position: "absolute",
            width: `${m.d}px`,
            height: `${m.d}px`,
            borderRadius: "50%",
            background: gradiente(m),
            top: m.top,
            bottom: m.bottom,
            left: m.left,
            right: m.right,
            transform: m.transform,
            animation: m.anim,
          }}
        />
      ))}
    </div>
  );
}
