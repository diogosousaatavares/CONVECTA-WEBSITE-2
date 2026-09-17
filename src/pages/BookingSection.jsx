import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Smartphone, PhoneCall, Store, ListChecks, Share2, CalendarCheck, BellRing, Wallet, Stamp, FileSpreadsheet, LayoutDashboard } from "lucide-react";
import Seo from "@/components/Seo";
import BotaoComecar from "@/components/BotaoComecar";
import CtaSection from "@/components/CtaSection";
import ScrollReveal from "@/components/ScrollReveal";
import { SITE, PRECO_DESDE_TEXTO, migalhasLd, faqLd } from "@/lib/seo";

/*
 * Como funciona.
 *
 * Do primeiro clique na demonstracao ate ao Excel do contabilista no fim do
 * mes. E uma sequencia real — por isso e numerada. Cada passo diz quem faz o
 * que e quanto tempo demora, sem "2 a 3 dias de configuracao" inventados.
 *
 * (O ficheiro chama-se BookingSection por heranca do site antigo; a rota e
 * /como-funciona.)
 */

const PASSOS = [
  {
    icon: Smartphone,
    n: "01",
    titulo: "Crias a tua barbearia",
    quem: "Tu · 2 minutos",
    texto: `Dizes quantos barbeiros são, o nome da barbearia e o teu email. O plano escolhe-se sozinho pelo tamanho da equipa. O site nasce logo, com o teu nome, em a-tua-barbearia.${SITE.dominioApps}. Sem cartão.`,
    link: { to: "/comecar", label: "Começar grátis" },
  },
  {
    icon: ListChecks,
    n: "02",
    titulo: "Montas a casa",
    quem: "Tu · 15 minutos, no painel",
    texto: "Barbeiros com os seus horários, serviços com duração e preço, o logótipo e as cores, o horário de abertura. Podes fazer tudo isto antes de dar o cartão — e ver o site a mudar enquanto escreves.",
  },
  {
    icon: Store,
    n: "03",
    titulo: "Registas o cartão",
    quem: "Tu · 1 minuto, na Stripe",
    texto: "Quando quiseres começar a receber marcações, registas o cartão. Tens 7 dias à experiência e só depois é cobrado. Se cancelares até lá, não pagas nada — e cancelas sozinho no painel, sem telefonemas.",
  },
  {
    icon: PhoneCall,
    n: "04",
    titulo: "Ligas as notificações no telemóvel",
    quem: "Tu · 2 minutos",
    texto: "Pões a app no ecrã principal e autorizas as notificações. É isto que faz o telemóvel tocar quando um cliente marca. O painel avisa-te enquanto não estiver feito.",
  },
  {
    icon: Share2,
    n: "05",
    titulo: "Partilhas o link",
    quem: "Tu · 1 minuto",
    texto: "Pões o endereço na bio do Instagram, no perfil do Google, na mensagem automática do WhatsApp, num autocolante ao balcão. A partir daí os clientes marcam sozinhos, a qualquer hora.",
  },
  {
    icon: CalendarCheck,
    n: "06",
    titulo: "O dia a dia trata-se sozinho",
    quem: "Todos os dias",
    texto: "A marcação entra, o telemóvel toca, confirmas com dois toques (ou nem isso, com a confirmação automática), o cliente é avisado, cortas, fazes o checkout, o carimbo cai no cartão. No fim do mês, o Excel do contabilista sai com um botão.",
  },
];

// Um dia numa barbearia com a Convecta. Horas plausiveis, nada de metricas
// inventadas — e a sequencia que a app faz, contada a horas.
const UM_DIA = [
  { hora: "08:50", icon: Wallet, texto: "Abres a caixa no painel com o fundo do dia." },
  { hora: "09:12", icon: BellRing, texto: "Toca o telemóvel: o Rui marcou corte + barba às 11:00 com o Miguel. A hora fica logo ocupada para toda a gente." },
  { hora: "09:13", icon: CalendarCheck, texto: "Dois toques: Confirmar. O Rui recebe a notificação no telemóvel dele." },
  { hora: "10:40", icon: Smartphone, texto: "Uma cliente cancela sozinha a marcação das 15:00 — ainda está dentro do prazo que definiste. A hora volta a ficar livre e és avisado." },
  { hora: "11:35", icon: Wallet, texto: "Fim do serviço do Rui: checkout, MB Way, sem desconto, 1 € de gorjeta. A comissão do Miguel e o carimbo do Rui ficam registados no mesmo toque." },
  { hora: "16:20", icon: Stamp, texto: "O Tiago chega ao décimo carimbo. Na próxima marcação, o corte é grátis e o site já sabe." },
  { hora: "19:30", icon: FileSpreadsheet, texto: "Fechas a caixa com o valor que contaste e as notas do dia. No dia 1, o Excel do mês inteiro vai para o contabilista." },
];

const PERGUNTAS = [
  { q: "Preciso de saber de informática?", a: "Não. Se sabes usar o WhatsApp, sabes usar o painel. E a configuração inicial fazemo-la contigo ao telefone." },
  { q: "Tenho de instalar alguma coisa?", a: "Não. O painel abre no browser do telemóvel ou do computador, e podes guardá-lo no ecrã principal como uma app. Os teus clientes também não instalam nada." },
  { q: "E se já tenho clientes marcados noutro sítio?", a: "Podes começar a receber marcações novas na Convecta e ir fechando as antigas onde estão. Marcações feitas ao telefone lanças à mão no painel, em segundos." },
  { q: "Quanto custa e quando começo a pagar?", a: `Desde ${PRECO_DESDE_TEXTO} por mês, por barbearia, conforme o número de profissionais. Sem taxa de adesão e sem comissões por marcação. A mensalidade começa quando a tua barbearia fica ativa.` },
];

export default function ComoFunciona() {
  const ld = [
    migalhasLd([{ nome: "Início", caminho: "/" }, { nome: "Como funciona", caminho: "/como-funciona" }]),
    faqLd(PERGUNTAS),
  ];

  return (
    <main id="main-content" style={{ backgroundColor: "var(--cv-ground)" }} className="booking-page text-ink min-h-screen">
      <Seo
        titulo="Como funciona: do registo às marcações online na tua barbearia"
        descricao="Seis passos, sem burocracia: crias a tua barbearia em dois minutos, montas serviços e equipa, registas o cartão com 7 dias à experiência, ligas as notificações, partilhas o link e os clientes começam a marcar online. Desde 19,99 €/mês, sem comissões."
        caminho="/como-funciona"
        ld={ld}
      />

      {/* HERO */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-20 px-6 lg:px-12 text-center overflow-hidden border-b border-linha">
        <div className="max-w-4xl mx-auto relative z-10">
          <nav aria-label="Caminho" className="text-xs text-ink-3 mb-6">
            <Link to="/" className="hover:text-ink-2 transition-colors">Início</Link>
            <span className="mx-2">/</span>
            <span className="text-ink-2">Como funciona</span>
          </nav>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#8A6D0A] mb-4">Convecta Booking · Como funciona</p>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-ink mb-6 leading-tight">
              Do registo à primeira marcação online.
            </h1>
            <p className="text-ink-2 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl mx-auto font-light">
              Não há proposta comercial, orçamento nem semanas de "implementação". Há uma chamada de 15 minutos e uma barbearia criada, em regra, no próprio dia. Isto é o caminho todo.
            </p>
            <BotaoComecar grande>Começar grátis</BotaoComecar>
          </motion.div>
        </div>
      </section>

      {/* OS SEIS PASSOS */}
      <section style={{ backgroundColor: "var(--cv-card)" }} className="py-20 lg:py-28 px-6 lg:px-12">
        <div className="max-w-5xl mx-auto">
          <ol className="space-y-5">
            {PASSOS.map((p, i) => (
              <ScrollReveal key={p.n} delay={i * 0.05} variant="fadeInUp">
                <li className="grid grid-cols-[auto_1fr] gap-5 lg:gap-8 p-6 lg:p-8 rounded-2xl bg-card border border-linha">
                  <div className="flex flex-col items-center gap-3">
                    <span className="font-heading text-3xl text-[#8A6D0A] leading-none">{p.n}</span>
                    <div className="w-10 h-10 rounded-xl bg-[#fee96d]/10 text-[#8A6D0A] flex items-center justify-center border border-[#fee96d]/20">
                      <p.icon size={18} />
                    </div>
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] uppercase tracking-[0.18em] font-bold text-ink-3 mb-1">{p.quem}</p>
                    <h2 className="font-heading text-2xl lg:text-3xl text-ink mb-2 leading-snug">{p.titulo}</h2>
                    <p className="text-ink-2 text-sm lg:text-base leading-relaxed">{p.texto}</p>
                    {p.link && (
                      <Link to={p.link.to} className="inline-flex items-center gap-1.5 mt-3 text-sm font-bold text-[#8A6D0A] hover:text-ink transition-colors">
                        {p.link.label} <ArrowRight size={14} />
                      </Link>
                    )}
                  </div>
                </li>
              </ScrollReveal>
            ))}
          </ol>

          <ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10">
              <div className="p-6 rounded-2xl border border-linha bg-card">
                <h3 className="font-heading text-xl text-ink mb-3">O que precisas de ter</h3>
                <ul className="space-y-2 text-sm text-ink-2">
                  {["Um telemóvel ou computador com browser", "A lista de serviços, com duração e preço", "O horário da barbearia e de cada barbeiro", "O logótipo, se tiveres (senão, o nome chega)"].map((t) => (
                    <li key={t} className="flex items-start gap-2.5"><Check size={15} className="text-[#8A6D0A] shrink-0 mt-0.5" /> {t}</li>
                  ))}
                </ul>
              </div>
              <div className="p-6 rounded-2xl border border-[#fee96d]/25 bg-[#fee96d]/[0.05]">
                <h3 className="font-heading text-xl text-ink mb-3">O que a Convecta trata</h3>
                <ul className="space-y-2 text-sm text-ink-2">
                  {[`O teu endereço em ${SITE.dominioApps} e o alojamento`, "O site dos teus clientes e o painel, com a tua marca", "As atualizações — sem custos extra, sem versões a comprar", "Suporte por telefone e WhatsApp, por quem fez a app"].map((t) => (
                    <li key={t} className="flex items-start gap-2.5"><Check size={15} className="text-[#8A6D0A] shrink-0 mt-0.5" /> {t}</li>
                  ))}
                </ul>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* UM DIA */}
      <section className="bg-white py-20 lg:py-28 px-6 lg:px-12">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <p className="text-xs uppercase tracking-[0.25em] font-bold text-ink-3 mb-4">Depois de lançar</p>
            <h2 className="font-heading text-3xl lg:text-5xl text-ink mb-4 leading-tight">Um dia com marcações online na barbearia</h2>
            <p className="text-ink-2 text-base leading-relaxed mb-10">
              Nomes e horas inventados; o que a app faz em cada momento é exatamente isto.
            </p>
          </ScrollReveal>
          <ol className="relative border-l-2 border-linha ml-3 space-y-8">
            {UM_DIA.map((m, i) => (
              <ScrollReveal key={m.hora} delay={i * 0.04}>
                <li className="pl-8 relative">
                  <span className="absolute -left-[11px] top-1 w-5 h-5 rounded-full bg-[#fee96d] border-2 border-white flex items-center justify-center">
                    <m.icon size={10} color="#111" />
                  </span>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-ink-3 mb-1 tabular-nums">{m.hora}</p>
                  <p className="text-ink-2 text-sm lg:text-base leading-relaxed">{m.texto}</p>
                </li>
              </ScrollReveal>
            ))}
          </ol>
          <ScrollReveal>
            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm">
              <Link to="/funcionalidades" className="inline-flex items-center gap-1.5 font-bold text-ink border-b-2 border-[#fee96d] py-1">Todas as funcionalidades <ArrowRight size={14} /></Link>
              <Link to="/comecar" className="inline-flex items-center gap-1.5 font-bold text-ink border-b-2 border-[#fee96d] py-1"><LayoutDashboard size={14} /> Criar a minha barbearia</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* PERGUNTAS */}
      <section className="py-20 px-6 lg:px-12">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-[0.25em] font-bold text-[#8A6D0A] mb-2">Antes de começar</p>
          <h2 className="font-heading text-3xl text-ink mb-8">O que costumam perguntar nesta fase</h2>
          <div className="space-y-4">
            {PERGUNTAS.map((p) => (
              <details key={p.q} className="p-4 rounded-xl bg-card border border-linha group cursor-pointer">
                <summary className="text-ink font-bold text-sm flex items-center justify-between gap-4">
                  <span>{p.q}</span>
                  <span className="text-[#8A6D0A] group-open:rotate-180 transition-transform">↓</span>
                </summary>
                <p className="text-ink-2 text-sm mt-3 leading-relaxed font-light">{p.a}</p>
              </details>
            ))}
          </div>
          <p className="text-sm text-ink-3 mt-6">
            Mais respostas nas <Link to="/faq" className="text-[#8A6D0A] underline underline-offset-2">perguntas frequentes</Link>.
          </p>
        </div>
      </section>

      <CtaSection title="O primeiro passo demora dois minutos." buttonText="Começar grátis" to="/comecar" secondaryText="ou fala connosco primeiro" />
    </main>
  );
}
