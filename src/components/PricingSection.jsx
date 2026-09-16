import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, Shield, Zap, ArrowRight, Headphones, Users, Globe, Bell } from "lucide-react";
import { Link } from "react-router-dom";
import { PLANOS, INCLUIDO_EM_TODOS, DESCONTO_ANUAL } from "@/lib/seo";
import { DEMO_CLIENTE_URL, DEMO_PAINEL_URL } from "@/lib/demo";
import FundoLinhas from "@/components/FundoLinhas";
import MarcaWhatsApp from "@/components/MarcaWhatsApp";

/*
 * Os precos.
 *
 * Tres planos. A plataforma e a mesma nos tres — agenda, clientes, caixa,
 * comissoes, stock, relatorios, fidelizacao, design. O que muda e quantos
 * profissionais cabem, e o website no Business.
 *
 * O botao mensal/anual nao inventa numeros: o desconto e os valores por ano
 * saem todos de lib/seo.js, para nao haver dois sitios a dizer coisas
 * diferentes sobre o mesmo preco.
 */

const GARANTIAS = [
  { icon: Shield, titulo: "Sem fidelização", texto: "No mensal cancelas quando quiseres.", textoAnual: "No anual o compromisso é de 12 meses — é o que paga o desconto." },
  { icon: Zap, titulo: "A funcionar no próprio dia", texto: "Em regra, ativa no dia em que falamos." },
  { icon: Headphones, titulo: "Suporte por quem fez a app", texto: "Resposta até 24 horas úteis." },
];

const PERCENTAGEM = Math.round(DESCONTO_ANUAL * 100);

/* ── o botao mensal / anual ─────────────────────────────────────── */
function Alternador({ anual, mudar }) {
  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 34 }}>
      <div
        role="group"
        aria-label="Escolher pagamento mensal ou anual"
        style={{
          display: "inline-flex", alignItems: "center", gap: 4, padding: 4,
          background: "var(--cv-card)", border: "1px solid var(--cv-linha)",
          borderRadius: 100, boxShadow: "0 10px 30px -22px rgba(36,32,28,0.5)",
        }}
      >
        {[false, true].map(op => {
          const ativo = anual === op;
          return (
            <button
              key={String(op)}
              type="button"
              onClick={() => mudar(op)}
              aria-pressed={ativo}
              style={{
                position: "relative", border: 0, cursor: "pointer", font: "inherit",
                borderRadius: 100, padding: "10px 20px", fontSize: 13.5, fontWeight: 600,
                background: ativo ? "var(--cv-ink)" : "transparent",
                color: ativo ? "#fff" : "var(--cv-ink-2)",
                display: "inline-flex", alignItems: "center", gap: 8,
                transition: "background 0.18s ease, color 0.18s ease",
              }}
            >
              {op ? "Anual" : "Mensal"}
              {op && (
                <span
                  style={{
                    fontSize: 10.5, fontWeight: 800, letterSpacing: "0.06em",
                    background: "var(--cv-amarelo)", color: "#24201C",
                    padding: "3px 8px", borderRadius: 100, whiteSpace: "nowrap",
                  }}
                >
                  −{PERCENTAGEM}%
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ── um cartao ──────────────────────────────────────────────────── */
function Cartao({ plano, anual, nivelNome = "h3" }) {
  const Nome = nivelNome;
  const destaque = !!plano.destaque;
  const valor = anual ? plano.precoMesAnualTexto : plano.precoTexto;

  return (
    <div
      style={{
        position: "relative",
        display: "flex", flexDirection: "column", width: "100%",
        background: "var(--cv-card)",
        borderRadius: 20,
        border: destaque ? "1.5px solid var(--cv-ink)" : "1px solid var(--cv-linha)",
        boxShadow: destaque
          ? "0 40px 80px -46px rgba(36,32,28,0.55), 0 0 0 6px rgba(254,233,109,0.42)"
          : "0 18px 44px -40px rgba(36,32,28,0.45)",
        overflow: "hidden",
        transform: destaque ? "translateY(-8px)" : "none",
      }}
    >
      {/* a faixa amarela: e isto que faz o plano do meio saltar a vista */}
      <div
        className={destaque ? "pr-faixa" : "pr-faixa pr-faixa-vazia"}
        style={{
          height: 38, display: "flex", alignItems: "center", justifyContent: "center",
          background: destaque ? "var(--cv-amarelo)" : "transparent",
          borderBottom: destaque ? "1px solid rgba(36,32,28,0.12)" : "1px solid transparent",
        }}
      >
        {destaque && (
          <span style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase", color: "#24201C" }}>
            ★ Mais escolhido
          </span>
        )}
      </div>

      <div style={{ padding: "26px 26px 26px", display: "flex", flexDirection: "column", flex: 1 }}>
        <Nome className="cv-h3" style={{ margin: 0 }}>{plano.nome}</Nome>
        <p style={{ fontSize: "0.84rem", color: "var(--cv-ink-2)", margin: "5px 0 0" }}>{plano.resumo}</p>

        <div style={{ display: "flex", alignItems: "baseline", gap: 7, flexWrap: "wrap", marginTop: 22 }}>
          <span style={{ fontFamily: "var(--font-heading)", fontSize: "2.6rem", lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>
            {valor}
          </span>
          <span style={{ fontSize: "0.88rem", color: "var(--cv-ink-2)" }}>/ mês</span>
        </div>

        <p style={{ fontSize: "0.76rem", color: anual ? "var(--cv-amarelo-texto)" : "var(--cv-ink-3)", margin: "10px 0 0", lineHeight: 1.55, minHeight: 34 }}>
          {anual
            ? <>Pago de uma vez: {plano.precoAnoTexto}/ano. Poupas {plano.poupancaAnoTexto}.</>
            : <>Ou {plano.precoMesAnualTexto}/mês se pagares o ano de uma vez.</>}
        </p>

        <div
          style={{
            display: "flex", alignItems: "center", gap: 9,
            margin: "20px 0 18px", padding: "11px 14px", borderRadius: 12,
            background: "rgba(254,233,109,0.3)",
          }}
        >
          <Users size={16} strokeWidth={1.8} color="var(--cv-amarelo-texto)" />
          <span style={{ fontSize: "0.86rem", fontWeight: 700 }}>{plano.profissionaisTexto}</span>
        </div>

        <ul style={{ listStyle: "none", padding: 0, margin: "0 0 22px", display: "flex", flexDirection: "column", gap: 9, flex: 1 }}>
          <Item>A plataforma completa, sem cortes</Item>
          <Item icone={Bell}>Avisos ao cliente antes do corte, sem custo por mensagem</Item>
          {plano.website && (
            <Item icone={Globe}><strong>Website da barbearia feito por nós</strong></Item>
          )}
        </ul>

        <Link to="/contacto" style={{ textDecoration: "none" }}>
          <motion.span
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              width: "100%", padding: "13px 16px", borderRadius: 100,
              background: destaque ? "var(--cv-ink)" : "transparent",
              color: destaque ? "#fff" : "var(--cv-ink)",
              border: destaque ? "1px solid var(--cv-ink)" : "1px solid var(--cv-linha)",
              fontSize: "0.86rem", fontWeight: 600, cursor: "pointer",
            }}
          >
            Começar com o {plano.nome} <ArrowRight size={14} />
          </motion.span>
        </Link>
      </div>
    </div>
  );
}

function Item({ children, icone: Icone }) {
  return (
    <li style={{ display: "flex", alignItems: "flex-start", gap: 9 }}>
      {Icone === MarcaWhatsApp ? (
        <span style={{ marginTop: 1 }}><MarcaWhatsApp tamanho={18} /></span>
      ) : (
        <span
          style={{
            width: 18, height: 18, borderRadius: "50%", background: "rgba(254,233,109,0.35)",
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1,
          }}
        >
          {Icone ? <Icone size={10} strokeWidth={2.6} color="var(--cv-amarelo-texto)" />
                 : <Check size={10} strokeWidth={3} color="var(--cv-amarelo-texto)" />}
        </span>
      )}
      <span style={{ fontSize: "0.85rem", lineHeight: 1.5, color: "var(--cv-ink-2)" }}>{children}</span>
    </li>
  );
}

/* ── a seccao ───────────────────────────────────────────────────── */
export default function PricingSection({ nivelTitulo = "h2" }) {
  const Titulo = nivelTitulo;
  // os titulos nao podem saltar niveis: h1 -> h2, h2 -> h3
  const NivelNome = nivelTitulo === "h1" ? "h2" : "h3";
  const [anual, setAnual] = useState(false);

  return (
    <section id="precos" className="cv-sec" style={{ position: "relative", overflow: "hidden" }}>
      <FundoLinhas />

      {/* as esferas: o mesmo 3D suave do resto do site */}
      <div aria-hidden="true" className="pr-esferas">
        <span className="pr-esfera pr-esfera-a" />
        <span className="pr-esfera pr-esfera-b" />
      </div>

      <div className="cv-wrap" style={{ position: "relative", zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }} style={{ textAlign: "center" }}>
          <p className="cv-olho" style={{ marginBottom: 14 }}>Planos</p>
          <Titulo className="cv-h2" style={{ margin: "0 auto", maxWidth: "18ch" }}>
            Escolhe pelo tamanho da tua equipa.
          </Titulo>
          <p className="cv-texto" style={{ margin: "16px auto 0", maxWidth: "54ch" }}>
            A plataforma é a mesma nos três — nada fica trancado. O que muda é quantos
            profissionais cabem.
          </p>
        </motion.div>

        <Alternador anual={anual} mudar={setAnual} />

        <div className="cv-planos" style={{ marginTop: 34 }}>
          {PLANOS.map(plano => (
            <motion.div
              key={plano.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              style={{ display: "flex" }}
            >
              <Cartao plano={plano} anual={anual} nivelNome={NivelNome} />
            </motion.div>
          ))}
        </div>

        <p style={{ textAlign: "center", fontSize: "0.76rem", color: "var(--cv-ink-3)", margin: "20px 0 0" }}>
          Preço por barbearia. Acresce IVA à taxa legal, quando aplicável.
          Sem comissões por marcação e sem taxa de adesão.
        </p>

        {/* o que e igual em todos: dito uma vez, em vez de tres colunas de "sim" */}
        <div
          style={{
            background: "var(--cv-card)", border: "1px solid var(--cv-linha)",
            borderRadius: 20, padding: "30px 28px", marginTop: 40,
          }}
        >
          {React.createElement(NivelNome, { className: "cv-h3", style: { margin: 0 } }, "Em qualquer um dos três")}
          <p style={{ fontSize: "0.84rem", color: "var(--cv-ink-2)", margin: "6px 0 22px" }}>
            Sem módulos à parte, sem versão reduzida.
          </p>
          <ul className="cv-incluido">
            {INCLUIDO_EM_TODOS.map(item => (
              <li key={item.texto}>
                {item.texto}
                {item.emBreve && <span className="cv-em-breve">Em breve</span>}
              </li>
            ))}
          </ul>
        </div>

        <div className="pr-garantias">
          {GARANTIAS.map(g => ({ ...g, texto: anual && g.textoAnual ? g.textoAnual : g.texto })).map(g => (
            <div key={g.titulo}>
              <div className="pr-garantia-ico"><g.icon size={16} strokeWidth={1.6} color="var(--cv-ink)" /></div>
              <div>
                <p style={{ fontWeight: 700, fontSize: "0.85rem", margin: 0 }}>{g.titulo}</p>
                <p style={{ color: "var(--cv-ink-2)", fontSize: "0.78rem", margin: "2px 0 0" }}>{g.texto}</p>
              </div>
            </div>
          ))}
        </div>

        {/* o apelo: antes de escolher um plano, entra e ve */}
        <div className="pr-apelo">
          <div>
            {React.createElement(NivelNome, { className: "cv-h3", style: { margin: 0 } }, "Não decidas às escuras.")}
            <p style={{ color: "var(--cv-ink-2)", fontSize: "0.9rem", margin: "6px 0 0", maxWidth: "42ch" }}>
              Entra na demonstração, marca como cliente e vê a marcação chegar ao painel.
              Sem registo e sem cartão.
            </p>
          </div>
          <div className="pr-apelo-botoes">
            <a className="cv-btn" href={DEMO_CLIENTE_URL} target="_blank" rel="noopener">
              Entrar como cliente <ArrowRight size={15} />
            </a>
            <a className="cv-btn-linha" href={DEMO_PAINEL_URL} target="_blank" rel="noopener">
              Ver o painel do barbeiro
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
