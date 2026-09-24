import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Seo from "@/components/Seo";
import ScrollReveal from "@/components/ScrollReveal";
import CtaSection from "@/components/CtaSection";
import PricingSection from "@/components/PricingSection";
import FundoLinhas from "@/components/FundoLinhas";
import HeroDispositivos from "@/components/HeroDispositivos";
import AcessoTotal, { VideoApps } from "@/components/AcessoTotal";
import PersonalizacaoDemo from "@/components/PersonalizacaoDemo";
import BotaoComecar from "@/components/BotaoComecar";
import BarraComecarFixa from "@/components/BarraComecarFixa";
import { SITE, PRECO_DESDE_TEXTO, PLANOS, organizacaoLd, websiteLd, softwareLd } from "@/lib/seo";

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

const PERGUNTAS = [
  {
    q: "Já uso outra agenda. Vale a pena mudar?",
    a: "Se pagas comissão por marcação ou os teus clientes te encontram ao lado da concorrência, sim. Aqui o site é só teu e o preço é fixo. Os teus clientes e o histórico vêm connosco: entregas a lista como a tiveres — folha de cálculo, exportação da outra app, agenda em papel fotografada — e nós carregamos.",
  },
  {
    q: "E se o cliente quiser desmarcar?",
    a: "Desmarca sozinho pelo site, dentro do prazo que tu definires. Recebes o aviso no telemóvel e a hora volta a ficar livre para outro cliente marcar.",
  },
  {
    q: "Os dados dos meus clientes estão seguros?",
    a: "São teus e só teus: ficam numa base de dados protegida, com cópias automáticas, e exportas tudo para Excel quando quiseres. Não os vendemos nem os usamos para mais nada.",
  },
  {
    q: "Serve para quem trabalha sozinho?",
    a: "Serve — é para isso que existe o Essencial. A plataforma é a mesma dos planos maiores; só cabe um profissional.",
  },
  {
    q: "Quanto custa?",
    a: `Três planos, pelo tamanho da equipa: ${PLANOS.map(p => `${p.nome} ${p.precoTexto}/mês (${p.profissionaisTexto.toLowerCase()})`).join(", ")}. Sem comissões por marcação, e os primeiros 7 dias são grátis.`,
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
      <section id="solucoes" style={{ position: "relative", overflow: "hidden" }}>
        <FundoLinhas />
        <div className="cv-wrap" style={{ position: "relative", zIndex: 1, paddingTop: 96, paddingBottom: 88 }}>
        <div className="cv-hero-grid">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 26 }}>
              <span style={{ width: 26, height: 1, background: "var(--cv-ink-3)", display: "block" }} />
              <p className="cv-olho" style={{ margin: 0 }}>Marcações online e gestão para barbearias</p>
            </div>

            <h1 className="cv-h1">
              Os teus clientes marcam sozinhos. <span className="cv-marca">Tu só cortas.</span>
            </h1>

            {/* A frase de definicao: o H1 vende, esta explica. E a mesma frase
                em todo o lado (site, schema, perfis) — e o que separa esta
                Convecta das outras Convectas e o que uma IA cita. */}
            <p style={{ margin: "18px 0 0", fontSize: 14, lineHeight: 1.6, color: "var(--cv-ink)", maxWidth: "52ch", fontWeight: 500 }}>
              A Convecta Booking é um software de marcações online e gestão para barbearias em Portugal.
            </p>
            <p className="cv-texto" style={{ margin: "14px 0 32px", maxWidth: "44ch" }}>
              Deixas de atender o telefone a meio do corte. Os clientes marcam pelo site da
              tua barbearia, o telemóvel toca, e a agenda, a caixa e as comissões ficam no mesmo sítio.
            </p>

            <div style={{ display: "flex", alignItems: "center", gap: 22, flexWrap: "wrap" }}>
              <BotaoComecar grande origem="hero">Começar grátis</BotaoComecar>
              {/* A segunda saida volta a ser o preco. Durante um tempo foi a
                  demonstracao publica — VER o produto antes de dar dados, que e
                  o que um barbeiro desconfiado quer. Mas a demonstracao deixou
                  de existir, e um botao que promete mostrar uma barbearia a
                  funcionar e nao mostra nada custa mais do que nao ter botao
                  nenhum: quem carrega ali era exactamente quem estava quase. */}
              <Link
                className="cv-btn-linha"
                to="/precos"
                onClick={() => { try { window.trackEvent?.("ver_precos_click", { origem: "hero" }); } catch {} }}
              >
                Ver os planos <ArrowRight size={14} style={{ marginLeft: 6, verticalAlign: -2 }} />
              </Link>
            </div>

            {/* A linha por baixo do botao responde a pergunta que trava toda a
                gente no momento de carregar: "quanto e que isto me custa
                agora?". Dizer "nada" aqui vale mais do que qualquer adjectivo
                no proprio botao. */}
            <p style={{ marginTop: 30, fontSize: 13, color: "var(--cv-ink-3)" }}>
              Sem cartão para começar · 7 dias à experiência · Planos desde {PRECO_DESDE_TEXTO}/mês
            </p>
          </motion.div>

          <HeroDispositivos />
        </div>
        </div>
      </section>

      {/* ── 2. O vídeo: logo a seguir ao topo ─────────────────────── */}
      <VideoApps />

      {/* ── 3. Personalização — o ponto forte, para experimentar ──── */}
      <PersonalizacaoDemo />

      {/* ── 4. Acesso total (as provas) ─────────────────────────── */}
      <AcessoTotal />

      {/* ── 6. Planos ───────────────────────────────────────────── */}
      <PricingSection />

      {/* ── 7. Perguntas ────────────────────────────────────────── */}
      <section className="cv-wrap cv-sec">
        <ScrollReveal>
          <p className="cv-olho">Perguntas</p>
          <h2 className="cv-h2">O que nos perguntam antes de começar.</h2>
        </ScrollReveal>
        <div style={{ marginTop: 40, maxWidth: 720 }}>
          {PERGUNTAS.map(p => <Pergunta key={p.q} {...p} />)}
          <div style={{ borderTop: "1px solid var(--cv-linha)", paddingTop: 22 }}>
            <Link className="cv-btn-linha" to="/faq">Ver todas as perguntas</Link>
          </div>
        </div>
      </section>

      {/* ── 8. Último apelo ─────────────────────────────────────── */}
      <CtaSection
        title="Pronto para deixar os teus clientes marcarem sozinhos?"
        buttonText="Começar grátis"
        to="/comecar"
        secondaryText="ou manda-nos uma mensagem no WhatsApp"
        secondaryWhatsApp
      />

      <BarraComecarFixa alvo="solucoes" />
    </div>
  );
}
