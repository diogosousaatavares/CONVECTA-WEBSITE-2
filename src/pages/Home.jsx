import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Seo from "@/components/Seo";
import ScrollReveal from "@/components/ScrollReveal";
import CtaSection from "@/components/CtaSection";
import PricingSection from "@/components/PricingSection";
import DemoSection from "@/components/DemoSection";
import { SITE, PRECO_DESDE_TEXTO, PLANOS, organizacaoLd, websiteLd, softwareLd } from "@/lib/seo";
import { DEMO_CLIENTE_URL } from "@/lib/demo";

/*
 * A pagina inicial.
 *
 * Tinha onze blocos e cinco fundos pretos, e dizia a mesma coisa seis vezes:
 * "sem comissoes" aparecia nos pilares, nas perguntas, no paragrafo de SEO,
 * em duas filas de numeros e no rodape. Passa a dizer cada coisa uma vez, no
 * sitio onde pesa, sobre branco.
 *
 * Regra deste ficheiro: se uma frase ja foi dita noutro bloco, sai.
 */

const PASSOS = [
  { n: "01", t: "Experimentas", d: "Entras na barbearia de demonstração e marcas como cliente. Cinco minutos, sem registo." },
  { n: "02", t: "Falamos", d: "Quinze minutos: serviços, equipa, horários, regras de cancelamento." },
  { n: "03", t: "Lançamos", d: "Criamos a barbearia e o endereço. Em regra, no próprio dia." },
  { n: "04", t: "Mandas tu", d: "Serviços, preços, equipa, horários, cores e fotos — tudo no teu painel." },
];

const PILARES = [
  { t: "Marcações 24 horas", d: "O cliente escolhe serviço, profissional e hora. Só vê horas livres." },
  { t: "O telemóvel toca", d: "A cada marcação nova. Confirmas em dois toques, ou deixas confirmar sozinho." },
  { t: "O design é teu", d: "Cores, tipografia, logótipo, capa e fotos. Mudas no painel e vês antes de publicar." },
];

const PERGUNTAS = [
  {
    q: "A Convecta é uma app de marcações online para barbearias?",
    a: "Sim. Os clientes marcam pelo site da barbearia e o barbeiro gere agenda, clientes, caixa, comissões, stock, cartão de fidelidade e relatórios num painel só. Sem comissões por marcação.",
  },
  {
    q: "O meu cliente precisa de instalar alguma app?",
    a: "Não. Abre o link da tua barbearia no telemóvel e marca. Se quiser, guarda o site no ecrã principal e fica com um ícone, como uma app.",
  },
  {
    q: "Quanto custa?",
    a: `Três planos, pelo tamanho da equipa: ${PLANOS.map(p => `${p.nome} ${p.precoTexto}/mês (${p.profissionaisTexto.toLowerCase()})`).join(", ")}. A plataforma é a mesma nos três.`,
  },
  {
    q: "Consigo mudar o aspeto da minha página?",
    a: "Consegues, sozinho e quando quiseres: cores, tipografia, logótipo, capa, fotos e o que aparece. Vês o resultado num telemóvel antes de publicar.",
  },
  {
    q: "E se eu já tiver clientes e histórico?",
    a: "Trazemo-los connosco. Entregas a lista como a tiveres — folha de cálculo, agenda em papel fotografada — e nós carregamos.",
  },
];

function Pergunta({ q, a }) {
  const [aberta, setAberta] = useState(false);
  return (
    <div
      onClick={() => setAberta(!aberta)}
      style={{ borderTop: "1px solid var(--cv-linha)", padding: "20px 0", cursor: "pointer", userSelect: "none" }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
        <p style={{ fontWeight: 500, color: "var(--cv-ink)", fontSize: "0.98rem", margin: 0, lineHeight: 1.45 }}>{q}</p>
        <motion.div animate={{ rotate: aberta ? 180 : 0 }} transition={{ duration: 0.25 }} style={{ flexShrink: 0 }}>
          <ChevronDown size={17} color="var(--cv-ink-3)" />
        </motion.div>
      </div>
      <AnimatePresence initial={false}>
        {aberta && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.28, ease: "easeInOut" }} style={{ overflow: "hidden" }}>
            <p className="cv-texto" style={{ marginTop: 12, marginBottom: 0, fontSize: "0.92rem" }}>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* O telemovel do hero, desenhado a linha. Antes era uma caixa preta com
   um canvas por tras; aqui e um contorno, e mostra o que interessa: a
   pagina onde o cliente marca. */
function Telemovel() {
  const servicos = [
    ["Corte de cabelo", "30 min", "15,00 €"],
    ["Corte + barba", "45 min", "22,00 €"],
    ["Barba", "20 min", "9,00 €"],
  ];
  return (
    <div style={{
      justifySelf: "center", width: 272, aspectRatio: "9 / 18.5",
      border: "1px solid var(--cv-linha)", borderRadius: 34, background: "var(--cv-card)",
      padding: "14px 13px", boxShadow: "0 30px 70px -40px rgba(36,32,28,0.35)",
    }}>
      <div style={{ height: 5, width: 64, background: "var(--cv-linha)", borderRadius: 100, margin: "2px auto 18px" }} />
      <div style={{ fontFamily: "var(--font-heading)", fontSize: 17, color: "var(--cv-ink)" }}>A tua barbearia</div>
      <div style={{ fontSize: 11, color: "var(--cv-ink-2)", marginBottom: 18 }}>Marcações online</div>
      <div style={{ fontSize: 9.5, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--cv-ink-3)" }}>Serviços</div>
      {servicos.map(([nome, dur, preco]) => (
        <div key={nome} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "11px 0", borderTop: "1px solid var(--cv-linha)", fontSize: 11.5 }}>
          <span style={{ color: "var(--cv-ink-2)" }}>{nome}<br /><span style={{ color: "var(--cv-ink-3)" }}>{dur}</span></span>
          <span style={{ color: "var(--cv-ink)", fontWeight: 600 }}>{preco}</span>
        </div>
      ))}
      <div style={{ marginTop: 16, background: "var(--cv-amarelo)", color: "var(--cv-ink)", borderRadius: 100, padding: 11, textAlign: "center", fontSize: 12, fontWeight: 600 }}>
        Marcar agora
      </div>
    </div>
  );
}

export default function Home() {
  const ld = [organizacaoLd(), websiteLd(), softwareLd()];

  return (
    <div className="cv">
      <Seo
        titulo="Convecta — Marcações online e gestão para barbearias"
        descricao={SITE.descricao}
        caminho="/"
        ld={ld}
      />

      {/* ── 1. Hero ─────────────────────────────────────────────── */}
      <section id="solucoes" className="cv-wrap" style={{ paddingTop: 96, paddingBottom: 88 }}>
        <div className="cv-hero-grid">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 26 }}>
              <span style={{ width: 26, height: 1, background: "var(--cv-ink-3)", display: "block" }} />
              <p className="cv-olho" style={{ margin: 0 }}>Marcações online e gestão para barbearias</p>
            </div>

            <h1 className="cv-h1">
              Os teus clientes marcam sozinhos. <span className="cv-marca">Tu só cortas.</span>
            </h1>

            <p className="cv-texto" style={{ margin: "22px 0 32px", maxWidth: "44ch" }}>
              A agenda, os clientes, a caixa, as comissões e o cartão de fidelidade no mesmo sítio.
              Os clientes marcam pelo site da tua barbearia, e o teu telemóvel toca.
            </p>

            <div style={{ display: "flex", alignItems: "center", gap: 22, flexWrap: "wrap" }}>
              <a className="cv-btn" href={DEMO_CLIENTE_URL} target="_blank" rel="noopener">
                Experimentar a demonstração <ArrowRight size={15} />
              </a>
              <Link className="cv-btn-linha" to="/precos">Ver os planos</Link>
            </div>

            <p style={{ marginTop: 30, fontSize: 13, color: "var(--cv-ink-3)" }}>
              Sem registo para experimentar · Planos desde {PRECO_DESDE_TEXTO}/mês
            </p>
          </motion.div>

          <Telemovel />
        </div>
      </section>

      {/* ── 2. O que é ──────────────────────────────────────────── */}
      <section className="cv-wrap cv-sec">
        <ScrollReveal>
          <p className="cv-olho">O que é</p>
          <h2 className="cv-h2">Duas apps. Um só sistema.</h2>
          <p className="cv-texto" style={{ marginTop: 16 }}>
            Uma página onde o teu cliente marca, e um painel onde geres tudo — agenda, caixa,
            comissões, stock, fidelização e relatórios. Feitos para trabalhar juntos.
          </p>
        </ScrollReveal>
        <div className="cv-tres">
          {PILARES.map((p, i) => (
            <ScrollReveal key={p.t} delay={i * 0.08} variant="fadeInUp">
              <div>
                <h3 className="cv-h3">{p.t}</h3>
                <p className="cv-mini">{p.d}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── 3. A demonstração ───────────────────────────────────── */}
      <DemoSection />

      {/* ── 4. Como funciona ────────────────────────────────────── */}
      <section id="processo" className="cv-wrap cv-sec">
        <ScrollReveal>
          <p className="cv-olho">Como funciona</p>
          <h2 className="cv-h2">Da demonstração à primeira marcação.</h2>
        </ScrollReveal>
        <div className="cv-passos">
          {PASSOS.map((p, i) => (
            <ScrollReveal key={p.n} delay={i * 0.08} variant="fadeInUp">
              <div>
                <p style={{ fontFamily: "var(--font-heading)", fontSize: "1.6rem", color: "var(--cv-ink-3)", margin: "0 0 14px" }}>{p.n}</p>
                <h3 className="cv-h3">{p.t}</h3>
                <p className="cv-mini">{p.d}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── 5. Planos ───────────────────────────────────────────── */}
      <PricingSection />

      {/* ── 6. Perguntas ────────────────────────────────────────── */}
      <section className="cv-wrap cv-sec">
        <ScrollReveal>
          <p className="cv-olho">Perguntas</p>
          <h2 className="cv-h2">O que nos perguntam antes de experimentar.</h2>
        </ScrollReveal>
        <div style={{ marginTop: 40, maxWidth: 720 }}>
          {PERGUNTAS.map(p => <Pergunta key={p.q} {...p} />)}
          <div style={{ borderTop: "1px solid var(--cv-linha)", paddingTop: 22 }}>
            <Link className="cv-btn-linha" to="/faq">Ver todas as perguntas</Link>
          </div>
        </div>
      </section>

      {/* ── 7. Último apelo ─────────────────────────────────────── */}
      <CtaSection
        title="Pronto para deixar os teus clientes marcarem sozinhos?"
        buttonText="Experimentar a demonstração"
        href={DEMO_CLIENTE_URL}
        secondaryText="ou fala connosco"
      />
    </div>
  );
}
