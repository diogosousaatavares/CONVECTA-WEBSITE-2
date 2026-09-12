import React from "react";
import { motion } from "framer-motion";

/*
 * Os dois videos do hero: o painel no portatil, a app do cliente no
 * telemovel. Sao o produto a funcionar — nao ha maqueta que valha isso.
 *
 * As molduras ficam escuras de proposito: um portatil e um telemovel sao
 * objetos escuros, e sobre o branco leem-se como produto, nao como "mais uma
 * caixa preta". As sombras e que sao suaves, para nao pesarem na pagina.
 */
export default function HeroDispositivos() {
  return (
    <div style={{ position: "relative", width: "100%", paddingBottom: 54 }}>
      {/* Portatil */}
      <div style={{ position: "relative", width: "100%" }}>
        <div style={{
          width: "100%", aspectRatio: "16 / 10", borderRadius: "12px 12px 0 0",
          background: "#0b0b0f", border: "1px solid rgba(36,32,28,0.12)", borderBottom: 0,
          boxShadow: "0 40px 80px -40px rgba(36,32,28,0.45)", overflow: "hidden",
        }}>
          <video src="/laptop-demo.mp4" poster="/laptop-demo.jpg" autoPlay loop muted playsInline
            preload="metadata" aria-label="O painel de gestão da Convecta a ser usado"
            style={{ width: "100%", height: "100%", objectFit: "fill", display: "block" }} />
        </div>
        {/* Base do portatil */}
        <div style={{
          width: "106%", marginLeft: "-3%", height: 13,
          background: "linear-gradient(180deg,#1d1d22 0%,#111116 100%)",
          borderRadius: "0 0 9px 9px", boxShadow: "0 14px 26px -14px rgba(36,32,28,0.4)",
        }}>
          <div style={{ width: 46, height: 3.5, background: "rgba(255,255,255,0.14)", borderRadius: 2, margin: "4px auto 0" }} />
        </div>
      </div>

      {/* Telemovel, encostado ao canto */}
      <div style={{ position: "absolute", right: "-6%", bottom: 0, width: "31%", minWidth: 128, maxWidth: 190 }}>
        <div style={{
          position: "relative", aspectRatio: "9 / 19.5", borderRadius: 26,
          border: "2px solid rgba(36,32,28,0.14)", background: "#0c0c10",
          boxShadow: "0 30px 60px -28px rgba(36,32,28,0.5)", overflow: "hidden",
        }}>
          <div style={{ position: "absolute", top: 7, left: "50%", transform: "translateX(-50%)", width: "26%", height: 9, background: "#000", borderRadius: 5, zIndex: 2 }} />
          <video src="/phone-demo.mp4" poster="/phone-demo.jpg" autoPlay loop muted playsInline
            preload="metadata" aria-label="A app de marcações do cliente, no telemóvel"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        </div>
      </div>

      {/* O sinal de que os dois lados sao o mesmo sistema */}
      <motion.div
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        style={{ position: "absolute", left: 0, bottom: 8, zIndex: 3 }}
      >
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 7,
          background: "var(--cv-card)", border: "1px solid var(--cv-linha)",
          borderRadius: 100, padding: "5px 12px",
        }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#34d399" }} />
          <span style={{ fontSize: 10.5, color: "var(--cv-ink-2)", fontWeight: 500 }}>Em sincronia</span>
        </div>
      </motion.div>
    </div>
  );
}
