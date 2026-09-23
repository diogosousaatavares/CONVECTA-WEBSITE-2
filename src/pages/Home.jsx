import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown, MessageCircle, CalendarX, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Seo from "@/components/Seo";
import ScrollReveal from "@/components/ScrollReveal";
import CtaSection from "@/components/CtaSection";
import PricingSection from "@/components/PricingSection";
import FundoLinhas from "@/components/FundoLinhas";
import HeroDispositivos from "@/components/HeroDispositivos";
import AcessoTotal from "@/components/AcessoTotal";
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

const PASSOS = [
  { n: "01", t: "Crias a barbearia", d: "Quantos barbeiros são, o nome e o teu email. Dois minutos, sem cartão. O site nasce logo, com o teu nome." },
  { n: "02", t: "Montas a casa", d: "Serviços, preços, equipa, horários, cores e fotos — tudo no teu painel, e vês o site a mudar enquanto escreves." },
  { n: "03", t: "Ligas as marcações", d: "Quando estiver ao teu gosto, dás o cartão. Sete dias à experiência; cancelas quando quiseres." },
  { n: "04", t: "Os clientes marcam", d: "Partilhas o endereço no Instagram e no WhatsApp. O telemóvel toca a cada marcação." },
];

/*
 * Quase toda a gente que chega aqui ja marca de alguma forma. Falar-lhe da
 * forma que usa e falar-lhe da dor que tem — e mais do que listar funcoes.
 */
const ORIGENS = [
  {
    icone: MessageCircle,
    t: "Vens do WhatsApp ou do Instagram",
    d: "Cada marcação é uma conversa: «tens às 15?», «e às 16?», «afinal não posso». Aqui o cliente só vê horas livres e marca sozinho. Tu recebes a notificação, e a conversa acabou.",
  },
  {
    icone: BookOpen,
    t: "Vens de uma app com comissões",
    d: "Numa plataforma partilhada os teus clientes vêem a concorrência ao lado, e cada cliente novo pode custar-te uma comissão. Aqui o site é só teu, os clientes são teus, e o preço é fixo — sem comissão por marcação.",
  },
  {
    icone: CalendarX,
    t: "Vens da agenda em papel",
    d: "Funciona até ao dia em que alguém não aparece e ninguém avisou. Aqui o cliente recebe um lembrete antes do corte, desmarca sozinho se precisar, e a hora volta a ficar livre para outro.",
  },
];

const PILARES = [
  { t: "Marcações 24 horas", d: "O cliente escolhe serviço, profissional e hora. Só vê horas livres." },
  { t: "O telemóvel toca", d: "A cada marcação nova. Confirmas em dois toques, ou deixas confirmar sozinho." },
  { t: "O design é teu", d: "Cores, tipografia, logótipo, capa e fotos. Mudas no painel e vês antes de publicar." },
];

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

            <p className="cv-texto" style={{ margin: "22px 0 32px", maxWidth: "44ch" }}>
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

      {/* ── 2. Acesso total (as provas) ─────────────────────────── */}
      <AcessoTotal />

      {/* ── 2b. Personalização — o ponto forte, para experimentar ──── */}
      <PersonalizacaoDemo />

      {/* ── 3. O que é ──────────────────────────────────────────── */}
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

            {/* ── 5. Como funciona ────────────────────────────────────── */}
      <section id="processo" className="cv-wrap cv-sec">
        <ScrollReveal>
          <p className="cv-olho">Como funciona</p>
          <h2 className="cv-h2">Da conta à primeira marcação. Sem falar connosco.</h2>
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
        {/* Ha quem prefira fazer isto com alguem ao lado. E uma opcao, nao um
            passo — dito assim, quem quer ir sozinho nao se assusta. */}
        <p className="cv-mini" style={{ marginTop: 28 }}>
          Preferes que montemos contigo? <Link to="/contacto" style={{ color: "var(--cv-ink)", fontWeight: 600 }}>Marca 15 minutos</Link> — é grátis e sem compromisso.
        </p>
      </section>

      {/* ── 5b. De onde vens ────────────────────────────────────── */}
      <section className="cv-wrap cv-sec">
        <ScrollReveal>
          <p className="cv-olho">De onde vens</p>
          <h2 className="cv-h2">Já marcas de alguma maneira. Isto é o que muda.</h2>
        </ScrollReveal>
        <div className="cv-tres">
          {ORIGENS.map((o, i) => {
            const Icone = o.icone;
            return (
              <ScrollReveal key={o.t} delay={i * 0.08} variant="fadeInUp">
                <div>
                  <Icone size={22} style={{ color: "var(--cv-ink-3)", marginBottom: 12 }} />
                  <h3 className="cv-h3">{o.t}</h3>
                  <p className="cv-mini">{o.d}</p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

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
