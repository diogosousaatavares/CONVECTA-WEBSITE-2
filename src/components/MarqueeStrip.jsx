import React from "react";

const defaultItems = [
  "Marcações Online",
  "Sem Comissões por Marcação",
  "Agenda por Profissional",
  "Gestão de Clientes",
  "Controlo de Caixa",
  "Fidelização Digital",
  "Relatórios em Tempo Real",
  "Pronto em 24 Horas",
  "Suporte Real",
  "Sem Fidelização Obrigatória",
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

      <style>{`
        @keyframes marquee-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="marquee-scroll"] { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
