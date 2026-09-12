import React from "react";

const defaultItems = [
  "Marcações Online",
  "0 % de Comissões",
  "Agenda por Barbeiro",
  "Notificações no Telemóvel",
  "Cartão de Fidelidade Digital",
  "Caixa e Comissões",
  "Excel para o Contabilista",
  "Desde 19,99 € por Mês",
  "Sem Fidelização",
  "Feito no Porto",
];

export default function MarqueeStrip({ items = defaultItems }) {
  // Duplicate items for seamless infinite loop
  const loopItems = [...items, ...items];

  return (
    <div
      className="relative w-full overflow-hidden py-5 border-y"
      style={{ backgroundColor: "#13131a", borderColor: "rgba(254,233,109,0.15)" }}
    >
      <div className="flex whitespace-nowrap" style={{ animation: "marquee-scroll 28s linear infinite" }}>
        {loopItems.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-8 px-8">
            <span className="font-heading text-base sm:text-lg text-white/90">{item}</span>
            <span style={{ color: "#fee96d" }} aria-hidden="true">
              ✦
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
