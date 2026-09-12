import React from "react";
import { motion } from "framer-motion";
import { Check, Shield, Zap, ArrowRight, Headphones, Users, Globe, Palette, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { PLANOS, INCLUIDO_EM_TODOS } from "@/lib/seo";

/*
 * Os precos.
 *
 * Tres planos. A plataforma e a mesma nos tres — agenda, clientes, caixa,
 * comissoes, stock, relatorios, fidelizacao. O que muda e quantos
 * profissionais cabem, e o website no Business.
 *
 * Por isso nao ha uma tabela de comparacao com vinte linhas de "sim, sim,
 * sim": isso nao informa ninguem e nao cabe num telemovel. O que e diferente
 * esta nos cartoes; o que e igual esta dito uma vez, em baixo.
 *
 * Os numeros nao se escrevem aqui: saem de lib/seo.js.
 */

const GARANTIAS = [
  { icon: Shield, title: "Sem fidelização", desc: "Sem período mínimo. Cancelas quando quiseres." },
  { icon: Zap, title: "A funcionar no próprio dia", desc: "Em regra, a barbearia fica ativa no dia em que falamos." },
  { icon: Headphones, title: "Suporte em dias úteis", desc: "Resposta até 24 horas úteis, por quem fez a app." },
];

function Cartao({ plano }) {
  const destaque = !!plano.destaque;
  const secundario = destaque ? "rgba(255,255,255,0.62)" : "#6B7280";
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        background: destaque ? "#111" : "#fff",
        color: destaque ? "#fff" : "#111",
        borderRadius: 24,
        padding: "32px 26px 28px",
        border: destaque ? "2px solid #FEE96D" : "1px solid rgba(17,17,17,0.1)",
        boxShadow: destaque ? "0 0 0 5px rgba(254,233,109,0.16)" : "0 4px 20px rgba(0,0,0,0.05)",
      }}
    >
      {destaque && (
        <span style={{
          position: "absolute", top: -13, left: "50%", transform: "translateX(-50%)",
          background: "#FEE96D", color: "#111", fontSize: 10, fontWeight: 800,
          letterSpacing: "0.16em", textTransform: "uppercase",
          padding: "5px 14px", borderRadius: 100, whiteSpace: "nowrap",
        }}>Mais escolhido</span>
      )}

      <h3 style={{ fontSize: "1.05rem", fontWeight: 800, margin: 0 }}>{plano.nome}</h3>
      <p style={{ fontSize: "0.78rem", margin: "4px 0 0", color: secundario }}>{plano.resumo}</p>

      <div style={{ display: "flex", alignItems: "baseline", gap: 7, flexWrap: "wrap", margin: "20px 0 0" }}>
        <span style={{ fontSize: "2.5rem", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>{plano.precoTexto}</span>
        <span style={{ fontSize: "0.9rem", fontWeight: 600, color: secundario }}>/ mês</span>
      </div>
      <p style={{ fontSize: "0.72rem", margin: "8px 0 0", color: destaque ? "rgba(255,255,255,0.45)" : "#9CA3AF" }}>
        Por barbearia. Acresce IVA à taxa legal, quando aplicável.
      </p>

      <div style={{
        display: "flex", alignItems: "center", gap: 9,
        margin: "20px 0", padding: "12px 14px", borderRadius: 12,
        background: destaque ? "rgba(254,233,109,0.14)" : "rgba(254,233,109,0.22)",
      }}>
        <Users size={16} strokeWidth={1.8} color={destaque ? "#FEE96D" : "#b89e00"} />
        <span style={{ fontSize: "0.85rem", fontWeight: 700 }}>{plano.profissionaisTexto}</span>
      </div>

      <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px", display: "flex", flexDirection: "column", gap: 9, flex: 1 }}>
        <li style={{ display: "flex", alignItems: "flex-start", gap: 9 }}>
          <span style={{ width: 18, height: 18, borderRadius: "50%", background: "rgba(254,233,109,0.25)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
            <Check size={10} strokeWidth={3} color="#b89e00" />
          </span>
          <span style={{ fontSize: "0.84rem", lineHeight: 1.45, color: destaque ? "rgba(255,255,255,0.82)" : "#374151" }}>
            A plataforma completa, sem cortes
          </span>
        </li>
        {plano.website && (
          <li style={{ display: "flex", alignItems: "flex-start", gap: 9 }}>
            <span style={{ width: 18, height: 18, borderRadius: "50%", background: "rgba(254,233,109,0.25)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
              <Globe size={10} strokeWidth={2.6} color="#b89e00" />
            </span>
            <span style={{ fontSize: "0.84rem", lineHeight: 1.45, color: destaque ? "rgba(255,255,255,0.82)" : "#374151" }}>
              <strong>Website da barbearia feito por nós</strong>, dentro do sistema Convecta
            </span>
          </li>
        )}
      </ul>

      <Link to="/contacto" style={{ textDecoration: "none", marginTop: "auto" }}>
        <motion.button
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          style={{
            width: "100%", padding: "12px 16px", borderRadius: 12,
            border: destaque ? "none" : "1.5px solid #111",
            background: destaque ? "#FEE96D" : "transparent",
            color: "#111", fontSize: "0.85rem", fontWeight: 700, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
          }}
        >
          Falar sobre este plano <ArrowRight size={13} />
        </motion.button>
      </Link>
    </div>
  );
}

/* As duas coisas que o Diogo quer ditas com todas as letras. */
const DESTAQUES = [
  {
    icon: Palette,
    titulo: "O design é teu, e mudas quando quiseres",
    texto: "No teu painel escolhes as cores, a tipografia, o logótipo, a capa e as fotos da galeria — e vês o resultado num telemóvel antes de publicar. Não é um pedido que nos fazes: é um botão que carregas.",
  },
  {
    icon: MessageCircle,
    titulo: "Avisos por WhatsApp",
    texto: "Cada cliente recebe um lembrete no WhatsApp 24 horas antes da marcação. Menos faltas, sem ninguém ter de andar a mandar mensagens à mão.",
  },
];

export default function PricingSection({ nivelTitulo = "h2" }) {
  const Titulo = nivelTitulo;
  const whatsappEmBreve = INCLUIDO_EM_TODOS.some(i => i.emBreve && /WhatsApp/i.test(i.texto));

  return (
    <section id="precos" style={{ backgroundColor: "#F5F5F5" }} className="relative section-mobile-compact py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden hidden md:block">
        <div style={{ position: "absolute", left: "-6%", top: "15%", width: 320, height: 320, borderRadius: "50%", background: "radial-gradient(circle at 38% 32%,#ffffff 0%,#d8d8d8 100%)", boxShadow: "inset -20px -24px 60px rgba(0,0,0,0.1)", opacity: 0.7 }} />
        <div style={{ position: "absolute", right: "-4%", bottom: "10%", width: 200, height: 200, borderRadius: "50%", border: "24px solid rgba(210,210,210,0.6)", filter: "blur(0.5px)" }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12 lg:mb-16">
          <span style={{ display: "inline-block", backgroundColor: "#FEE96D", color: "#111111", fontSize: 11, fontWeight: 800, letterSpacing: "0.2em", padding: "6px 18px", borderRadius: 100, marginBottom: 18, textTransform: "uppercase" }}>Preços</span>
          <Titulo style={{ fontWeight: 800, fontSize: "clamp(2rem,5vw,3.4rem)", color: "#111111", lineHeight: 1.05, marginBottom: 14, letterSpacing: "-0.02em" }}>
            Escolhe pelo tamanho da tua equipa.
          </Titulo>
          <p style={{ color: "#6B7280", fontSize: "1rem", maxWidth: 620, margin: "0 auto", lineHeight: 1.75 }}>
            A plataforma é a mesma nos três planos — nada fica trancado. O que muda é quantos profissionais cabem. Sem comissões por marcação, sem taxa de adesão, sem fidelização.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }}
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(270px,1fr))", gap: 20, alignItems: "stretch" }}
        >
          {PLANOS.map(plano => <Cartao key={plano.id} plano={plano} />)}
        </motion.div>

        {/* As duas promessas que se querem lidas, nao procuradas numa lista. */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 20, marginTop: 28 }}
        >
          {DESTAQUES.map(d => (
            <div key={d.titulo} style={{ background: "#fff", borderRadius: 20, border: "1px solid rgba(17,17,17,0.08)", padding: "26px 24px" }}>
              <div style={{ width: 42, height: 42, borderRadius: 12, background: "rgba(254,233,109,0.25)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                <d.icon size={20} strokeWidth={1.6} color="#b89e00" />
              </div>
              <h3 style={{ fontSize: "1rem", fontWeight: 800, color: "#111", margin: "0 0 8px", display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                {d.titulo}
                {whatsappEmBreve && d.icon === MessageCircle && (
                  <span style={{ fontSize: "0.64rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: "#8a7400", background: "rgba(254,233,109,0.4)", padding: "3px 8px", borderRadius: 100 }}>Em breve</span>
                )}
              </h3>
              <p style={{ color: "#6B7280", fontSize: "0.86rem", lineHeight: 1.65, margin: 0 }}>{d.texto}</p>
            </div>
          ))}
        </motion.div>

        {/* O que e igual em todos: dito uma vez, em vez de tres colunas de "sim". */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.15 }}
          style={{ background: "#fff", borderRadius: 24, border: "1px solid rgba(17,17,17,0.08)", padding: "30px 28px", marginTop: 20 }}
        >
          <h3 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#111", margin: "0 0 4px" }}>Em qualquer um dos três planos</h3>
          <p style={{ fontSize: "0.82rem", color: "#6B7280", margin: "0 0 22px" }}>Sem módulos por comprar à parte, sem versão reduzida.</p>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "11px 26px" }}>
            {INCLUIDO_EM_TODOS.map(item => (
              <li key={item.texto} style={{ display: "flex", alignItems: "flex-start", gap: 9 }}>
                <span style={{ width: 18, height: 18, borderRadius: "50%", background: "rgba(254,233,109,0.25)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                  <Check size={10} strokeWidth={3} color="#b89e00" />
                </span>
                <span style={{ color: "#374151", fontSize: "0.86rem", lineHeight: 1.45 }}>
                  {item.texto}
                  {item.emBreve && (
                    <span style={{ marginLeft: 7, fontSize: "0.66rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: "#8a7400", background: "rgba(254,233,109,0.35)", padding: "2px 7px", borderRadius: 100, whiteSpace: "nowrap" }}>Em breve</span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.25 }}
          className="trust-strip"
          style={{ background: "#fff", borderRadius: 18, border: "1px solid rgba(17,17,17,0.07)", boxShadow: "0 4px 20px rgba(0,0,0,0.05)", display: "grid", gridTemplateColumns: "repeat(3,1fr)", marginTop: 20 }}>
          {GARANTIAS.map((item, i) => (
            <div key={i} style={{ padding: "20px 22px", display: "flex", alignItems: "center", gap: 14, borderRight: i < 2 ? "1px solid rgba(17,17,17,0.07)" : "none" }}>
              <div style={{ width: 36, height: 36, borderRadius: 9, border: "1.5px solid rgba(17,17,17,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <item.icon size={16} color="#111" strokeWidth={1.5} />
              </div>
              <div>
                <p style={{ fontWeight: 700, color: "#111", fontSize: "0.85rem", margin: 0, marginBottom: 2 }}>{item.title}</p>
                <p style={{ color: "#6B7280", fontSize: "0.75rem", margin: 0 }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
