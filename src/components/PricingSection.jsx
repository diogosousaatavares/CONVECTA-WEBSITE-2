import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import ScrollReveal from "@/components/ScrollReveal";
import { PLANOS, INCLUIDO_EM_TODOS } from "@/lib/seo";

/*
 * Os precos.
 *
 * Tres planos. A plataforma e a mesma nos tres; o que muda e quantos
 * profissionais cabem, e o website no Business. Por isso nao ha tabela de
 * comparacao com dez linhas de "sim, sim, sim": o que e diferente esta nos
 * cartoes, o que e igual esta dito uma vez em baixo.
 *
 * Os numeros saem de lib/seo.js. Nao se escreve um preco a mao aqui.
 */

function Cartao({ plano }) {
  const destaque = !!plano.destaque;
  return (
    <div style={{
      display: "flex", flexDirection: "column",
      background: "var(--cv-card)",
      border: destaque ? "1px solid var(--cv-ink)" : "1px solid var(--cv-linha)",
      borderRadius: 18, padding: "30px 26px 26px",
      boxShadow: destaque ? "0 24px 60px -44px rgba(36,32,28,0.5)" : "none",
    }}>
      <div style={{ height: 13, marginBottom: 12 }}>
        {destaque && (
          <span style={{ fontSize: 9.5, letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 600, color: "var(--cv-amarelo-texto)" }}>
            Mais escolhido
          </span>
        )}
      </div>

      <h3 className="cv-h3" style={{ fontSize: "1.2rem", marginBottom: 5 }}>{plano.nome}</h3>
      <p style={{ fontSize: "0.82rem", color: "var(--cv-ink-2)", margin: 0 }}>{plano.resumo}</p>

      <div style={{ fontFamily: "var(--font-heading)", fontSize: "2.6rem", lineHeight: 1, margin: "26px 0 0", fontVariantNumeric: "tabular-nums" }}>
        {plano.precoTexto}
        <span style={{ fontFamily: "inherit", fontSize: "0.85rem", color: "var(--cv-ink-2)", marginLeft: 6 }}>/ mês</span>
      </div>
      <p style={{ fontSize: "0.72rem", color: "var(--cv-ink-3)", margin: "9px 0 0" }}>
        Por barbearia, acresce IVA.
      </p>

      <div style={{ margin: "24px 0", paddingTop: 18, borderTop: "1px solid var(--cv-linha)", fontSize: "0.9rem", fontWeight: 600 }}>
        {plano.profissionaisTexto}
      </div>

      <ul style={{ listStyle: "none", padding: 0, margin: "0 0 26px", flex: 1 }}>
        <li style={{ fontSize: "0.85rem", color: "var(--cv-ink-2)", lineHeight: 1.6, paddingLeft: 16, position: "relative", marginBottom: 8 }}>
          <span style={{ position: "absolute", left: 0, top: "0.55em", width: 5, height: 5, borderRadius: "50%", background: "var(--cv-amarelo)" }} />
          A plataforma completa, sem cortes
        </li>
        {plano.website && (
          <li style={{ fontSize: "0.85rem", color: "var(--cv-ink-2)", lineHeight: 1.6, paddingLeft: 16, position: "relative" }}>
            <span style={{ position: "absolute", left: 0, top: "0.55em", width: 5, height: 5, borderRadius: "50%", background: "var(--cv-amarelo)" }} />
            <strong style={{ color: "var(--cv-ink)", fontWeight: 600 }}>Website da barbearia feito por nós</strong>
          </li>
        )}
      </ul>

      <Link
        to="/contacto"
        style={{
          display: "block", textAlign: "center", borderRadius: 100, padding: 12,
          fontSize: 13, fontWeight: 500, textDecoration: "none",
          background: destaque ? "var(--cv-ink)" : "transparent",
          color: destaque ? "#fff" : "var(--cv-ink)",
          border: destaque ? "1px solid var(--cv-ink)" : "1px solid var(--cv-linha)",
        }}
      >
        Falar sobre este plano
      </Link>
    </div>
  );
}

export default function PricingSection({ nivelTitulo = "h2" }) {
  const Titulo = nivelTitulo;
  return (
    <section id="precos" className="cv-wrap cv-sec">
      <ScrollReveal>
        <p className="cv-olho">Planos</p>
        <Titulo className="cv-h2">Escolhe pelo tamanho da tua equipa.</Titulo>
        <p className="cv-texto" style={{ marginTop: 16 }}>
          A plataforma é a mesma nos três — nada fica trancado. O que muda é quantos profissionais cabem.
        </p>
      </ScrollReveal>

      <div className="cv-planos">
        {PLANOS.map(plano => (
          <ScrollReveal key={plano.id} variant="fadeInUp">
            <Cartao plano={plano} />
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal>
        <div style={{ marginTop: 44, paddingTop: 30, borderTop: "1px solid var(--cv-linha)" }}>
          <p className="cv-olho">Em qualquer um dos três</p>
          <ul className="cv-incluido">
            {INCLUIDO_EM_TODOS.map(item => (
              <li key={item.texto}>
                {item.texto}
                {item.emBreve && <span className="cv-em-breve">Em breve</span>}
              </li>
            ))}
          </ul>
        </div>
      </ScrollReveal>
    </section>
  );
}
