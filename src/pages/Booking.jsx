import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, Smartphone, LayoutDashboard, CalendarDays, BellRing, CheckCircle2, Clock3,
  Users, UserCog, Wallet, Package, BarChart3, FileSpreadsheet, Settings, ShieldCheck,
  Globe, Stamp, Ban, MonitorSmartphone, ListChecks, Percent, Lock, Download,
} from "lucide-react";
import Seo from "@/components/Seo";
import ScrollReveal from "@/components/ScrollReveal";
import AmbientParticles from "@/components/AmbientParticles";
import GradientTransition from "@/components/GradientTransition";
import { SITE, PRECO_MENSAL_TEXTO, softwareLd, migalhasLd } from "@/lib/seo";

/*
 * Funcionalidades.
 *
 * Esta pagina descreve o que a Convecta Booking faz HOJE. Nao o que esta
 * planeado, nao o que o painel mostra num menu sem gravar nada — o que um
 * barbeiro pode confirmar na demonstracao ao vivo, agora. A lista foi
 * verificada contra o codigo do painel e do site do cliente.
 *
 * A pagina anterior era uma montra de seis videos que nunca existiram, com
 * texto de exemplo visivel ("coloca o teu ficheiro MP4…") e funcionalidades
 * que nao existem (lembretes, assinaturas, cupoes, alertas de stock). Um
 * dono de barbearia que lesse aquilo e abrisse a demonstracao a seguir
 * apanhava a mentira em dois minutos.
 */

// O que o cliente da barbearia ve e faz, no site dela.
const PARA_CLIENTES = [
  {
    icon: CalendarDays,
    titulo: "Marcações online, 24 horas por dia",
    texto: "O cliente abre o site da tua barbearia no telemóvel e marca em três toques: serviço, barbeiro, hora. Só vê as horas livres — as ocupadas nem aparecem. Marca às 23h de domingo, se quiser; a agenda é que decide.",
  },
  {
    icon: Globe,
    titulo: "Endereço próprio, com a tua marca",
    texto: `A tua barbearia tem o seu endereço em ${SITE.dominioApps} — o teu nome, o teu logótipo, as tuas cores, a tua foto de capa. O cliente vê a tua barbearia. A Convecta não aparece em lado nenhum.`,
  },
  {
    icon: MonitorSmartphone,
    titulo: "Sem instalar nada das lojas",
    texto: "Funciona no browser de qualquer telemóvel, iPhone ou Android. O cliente pode guardá-lo no ecrã principal e fica lá como uma app, com o teu ícone — sem App Store, sem Play Store, sem atualizações a pedir.",
  },
  {
    icon: BellRing,
    titulo: "Aviso no telemóvel do cliente",
    texto: "Quando confirmas a marcação — ou se tiveres de a cancelar — o cliente recebe uma notificação no telemóvel dele, com o serviço, o dia e a hora. Sem SMS, sem custos por mensagem.",
  },
  {
    icon: Clock3,
    titulo: "As minhas marcações e cancelar sozinho",
    texto: "O cliente vê as próximas marcações e o histórico. Pode cancelar sozinho até ao prazo que tu definires — duas horas antes, um dia, o que fizer sentido. Depois desse prazo, o site diz-lhe para te ligar.",
  },
  {
    icon: Stamp,
    titulo: "Cartão de fidelidade digital",
    texto: "Cada corte pago dá um carimbo. Ao chegar ao número que definires, o próximo corte é grátis — e o cliente usa-o na própria marcação, sem cartão de papel para perder. Tu vês no painel quem tem corte grátis antes de ele entrar.",
  },
];

// O que o barbeiro tem no painel, por area. Cada item existe e grava.
const PARA_BARBEIROS = [
  {
    icon: CalendarDays,
    titulo: "Agenda",
    itens: [
      "Agenda por barbeiro: cada coluna é um profissional, com vista do dia e em lista.",
      "O telemóvel toca a cada marcação nova, com o nome do cliente, o serviço e a hora.",
      "Confirmas com dois toques — ou ligas a confirmação automática e a marcação entra confirmada.",
      "Marcações manuais para quem liga ou entra pela porta; reagendar sem conflitos.",
      "Sem marcações sobrepostas: a base de dados não deixa dois clientes no mesmo barbeiro à mesma hora.",
      "Lista de espera para quem quer uma hora que já não há.",
      "Antecedência mínima e prazo de cancelamento definidos por ti.",
    ],
  },
  {
    icon: Users,
    titulo: "Clientes",
    itens: [
      "Ficha de cada cliente: contacto, histórico de visitas, o que gastou, quantos carimbos tem.",
      "Aniversários do mês, para mandares a mensagem certa no dia certo.",
      "Cada cliente só vê as suas marcações; tu vês todos os teus. Ninguém de fora vê nada.",
    ],
  },
  {
    icon: UserCog,
    titulo: "Equipa",
    itens: [
      "Cada barbeiro com o seu horário, os seus serviços e a sua agenda.",
      "Comissão em percentagem por barbeiro, guardada no momento do checkout com a taxa em vigor.",
      "Desempenho por profissional: serviços feitos, receita, comissão a pagar.",
    ],
  },
  {
    icon: Wallet,
    titulo: "Caixa e dinheiro",
    itens: [
      "Checkout no fim do serviço: método de pagamento, desconto se houver, gorjeta. Comissão e carimbo ficam feitos no mesmo toque.",
      "Abertura e fecho de caixa por dia, com entradas, saídas e histórico.",
      "Receitas por período e fluxo de caixa; conta-corrente por cliente e por barbeiro.",
      "Um corte grátis do cartão de fidelidade é cobrado a zero — o checkout sabe.",
    ],
  },
  {
    icon: Package,
    titulo: "Produtos e stock",
    itens: [
      "Produtos com preço de custo e de venda, stock atual e stock mínimo.",
      "Movimentos de entrada e saída, com histórico.",
      "Fornecedores.",
    ],
  },
  {
    icon: BarChart3,
    titulo: "Relatórios e contabilista",
    itens: [
      "Relatórios de marcações, clientes, profissionais, financeiro, serviços e produtos.",
      "Excel para o contabilista: escolhes o mês, carregas num botão. Sai o resumo (total, por método de pagamento, por barbeiro, por serviço) e todos os serviços prestados, linha a linha.",
    ],
  },
  {
    icon: Settings,
    titulo: "Definições",
    itens: [
      "Dados do negócio, horário, serviços e preços.",
      "Agenda: intervalo entre marcações, antecedência mínima, prazo de cancelamento, confirmação automática.",
      "Cartão de fidelidade: número de carimbos e validade.",
      "Tema e aparência: cores, logótipo e capa do site dos teus clientes.",
      "Notificações, utilizadores e segurança.",
    ],
  },
];

// O que ainda nao faz. Dito aqui para nao ser descoberto depois de assinar.
const AINDA_NAO = [
  {
    icon: Ban,
    titulo: "Lembretes por SMS ou WhatsApp",
    texto: "Hoje não há lembretes automáticos na véspera. As notificações no telemóvel (marcação recebida, confirmada, cancelada) existem e são grátis. Lembretes por WhatsApp custam dinheiro por mensagem; se os incluirmos, será como extra, com o preço à vista.",
  },
  {
    icon: Ban,
    titulo: "Pagamentos online pelo cliente",
    texto: "O cliente paga na barbearia, como sempre — dinheiro, MB Way, cartão, o que tu aceitares. A Convecta regista o método no checkout; não cobra ao cliente nem fica com nada.",
  },
  {
    icon: Ban,
    titulo: "Assinaturas, pacotes e cupões",
    texto: "Não fazem parte da app hoje. Quando fizerem, aparecem aqui primeiro — não vendemos o que ainda não gravou uma única marcação.",
  },
];

// Palavras que os donos de barbearia escrevem no Google. A pagina responde
// a cada uma com o que a Convecta faz, em portugues corrente — nao e uma
// lista de termos, e o que a app e.
const GARANTIAS = [
  { icon: Percent, titulo: "0 % de comissões", texto: "Mensalidade fixa. Cada marcação é tua, cada euro é teu." },
  { icon: Lock, titulo: "Dados na União Europeia", texto: "Guardados em servidores na Irlanda, isolados por barbearia." },
  { icon: ShieldCheck, titulo: "Sem marcações duplas", texto: "Garantido pela base de dados, não por uma regra no ecrã." },
  { icon: Download, titulo: "Os dados são teus", texto: "Excel quando quiseres; apagamos tudo a pedido se saíres." },
];

function Cartao({ icon: Icon, titulo, texto }) {
  return (
    <article className="h-full p-6 lg:p-7 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-[#fee96d]/40 transition-colors duration-300">
      <div className="w-11 h-11 rounded-xl bg-[#fee96d]/10 text-[#fee96d] flex items-center justify-center mb-4 border border-[#fee96d]/20">
        <Icon size={20} />
      </div>
      <h3 className="font-heading text-xl text-white mb-2 leading-snug">{titulo}</h3>
      <p className="text-white/60 text-sm leading-relaxed">{texto}</p>
    </article>
  );
}

export default function Funcionalidades() {
  const ld = [
    softwareLd(),
    migalhasLd([{ nome: "Início", caminho: "/" }, { nome: "Funcionalidades", caminho: "/funcionalidades" }]),
  ];

  return (
    <main id="main-content" style={{ backgroundColor: "#1a1a1a" }} className="booking-page text-white min-h-screen overflow-hidden selection:bg-[#fee96d] selection:text-[#1a1a1a]">
      <Seo
        titulo="Funcionalidades da app de marcações online para barbearias"
        descricao="Tudo o que a Convecta Booking faz: marcações online 24/7 pelo site da barbearia, agenda por barbeiro com notificações, confirmação automática, cartão de fidelidade digital, checkout, caixa, comissões, stock, relatórios e Excel para o contabilista."
        caminho="/funcionalidades"
        ld={ld}
      />

      {/* HERO */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-20 px-6 lg:px-12 overflow-hidden">
        <AmbientParticles count={10} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#fee96d]/10 blur-[140px] pointer-events-none rounded-full" />
        <div className="max-w-7xl mx-auto relative z-10">
          <nav aria-label="Caminho" className="text-xs text-white/40 mb-6 text-center">
            <Link to="/" className="hover:text-white/70 transition-colors">Início</Link>
            <span className="mx-2">/</span>
            <span className="text-white/60">Funcionalidades</span>
          </nav>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl mx-auto text-center">
            <p className="text-xs uppercase tracking-[0.25em] font-bold text-[#fee96d] mb-4">Convecta Booking · Funcionalidades</p>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-white mb-6 leading-tight">
              A app de marcações online para barbearias, por dentro.
            </h1>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed mb-4 max-w-2xl mx-auto font-light">
              A Convecta Booking tem duas partes: o site onde os teus clientes marcam e o painel onde tu geres a barbearia — agenda, clientes, caixa, comissões, stock, cartão de fidelidade e relatórios. Esta página diz o que existe e funciona hoje.
            </p>
            <p className="text-white/45 text-sm leading-relaxed mb-10 max-w-xl mx-auto">
              Não acredites em nós: cada frase aqui pode ser confirmada na demonstração ao vivo, sem registo e sem cartão.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a href={SITE.demoCliente} target="_blank" rel="noopener" className="btn-glow w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 text-sm font-bold uppercase tracking-wide rounded-sm" style={{ backgroundColor: "#fee96d", color: "#1a1a1a" }}>
                <Smartphone size={16} /> Marcar como cliente
              </a>
              <a href={SITE.demoPainel} target="_blank" rel="noopener" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 text-sm font-bold uppercase tracking-wide rounded-sm bg-white/10 text-white hover:bg-white/20 border border-white/20 transition-all">
                <LayoutDashboard size={16} /> Entrar no painel
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* GARANTIAS — a faixa que diz o que nao muda */}
      <section className="px-6 lg:px-12 pb-16 lg:pb-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {GARANTIAS.map((g, i) => (
            <ScrollReveal key={g.titulo} delay={i * 0.06} variant="fadeInUp">
              <div className="h-full p-5 rounded-xl bg-white/5 border border-[#fee96d]/20">
                <div className="flex items-center gap-2 text-[#fee96d] font-bold text-sm mb-1">
                  <g.icon size={18} /> <span>{g.titulo}</span>
                </div>
                <p className="text-white/60 text-xs leading-relaxed">{g.texto}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* PARA OS CLIENTES */}
      <section style={{ backgroundColor: "#141414" }} className="relative py-20 lg:py-28 px-6 lg:px-12 border-t border-white/5">
        <AmbientParticles count={6} />
        <div className="max-w-6xl mx-auto relative z-10">
          <ScrollReveal>
            <div className="max-w-3xl mb-10 lg:mb-14">
              <p className="text-xs uppercase tracking-[0.25em] font-bold text-[#fee96d] mb-4">1 · O site de marcações dos teus clientes</p>
              <h2 className="font-heading text-3xl lg:text-5xl text-white mb-4 leading-tight">Agendamento online que o teu cliente faz sozinho.</h2>
              <p className="text-white/60 text-base lg:text-lg leading-relaxed">
                Nada de mensagens no WhatsApp a perguntar "tens hora?". O cliente vê as horas livres e marca. Tu sabes no segundo seguinte.
              </p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PARA_CLIENTES.map((c, i) => (
              <ScrollReveal key={c.titulo} delay={i * 0.06} variant="fadeInUp">
                <Cartao {...c} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* PARA O BARBEIRO */}
      <section className="relative py-20 lg:py-28 px-6 lg:px-12 border-t border-white/5">
        <AmbientParticles count={6} />
        <div className="max-w-6xl mx-auto relative z-10">
          <ScrollReveal>
            <div className="max-w-3xl mb-10 lg:mb-14">
              <p className="text-xs uppercase tracking-[0.25em] font-bold text-[#fee96d] mb-4">2 · O painel de gestão da barbearia</p>
              <h2 className="font-heading text-3xl lg:text-5xl text-white mb-4 leading-tight">Software de gestão para barbearias que cabe no telemóvel.</h2>
              <p className="text-white/60 text-base lg:text-lg leading-relaxed">
                Abre no browser do telemóvel, do tablet ou do computador ao balcão. Tudo o que está abaixo grava na base de dados e aparece em todos os dispositivos.
              </p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {PARA_BARBEIROS.map((g, i) => (
              <ScrollReveal key={g.titulo} delay={i * 0.05} variant="fadeInUp">
                <article className="h-full p-6 lg:p-7 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#fee96d]/10 text-[#fee96d] flex items-center justify-center border border-[#fee96d]/20">
                      <g.icon size={18} />
                    </div>
                    <h3 className="font-heading text-2xl text-white">{g.titulo}</h3>
                  </div>
                  <ul className="space-y-2.5">
                    {g.itens.map((it) => (
                      <li key={it} className="flex items-start gap-3 text-sm text-white/70 leading-relaxed">
                        <CheckCircle2 size={16} className="text-[#fee96d] shrink-0 mt-0.5" />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <GradientTransition from="#1a1a1a" to="#ffffff" />

      {/* O QUE MUDA — texto corrido, para quem quer perceber (e para o Google) */}
      <section className="bg-white py-20 lg:py-28 px-6 lg:px-12">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <p className="text-xs uppercase tracking-[0.25em] font-bold text-dark/40 mb-4">3 · Na prática</p>
            <h2 className="font-heading text-3xl lg:text-5xl text-dark mb-8 leading-tight">O que muda numa barbearia com marcações online</h2>
            <div className="space-y-5 text-dark/70 text-base leading-relaxed">
              <p>
                <strong className="text-dark">Marcações online</strong> quer dizer que a agenda deixa de viver no teu telemóvel e nas conversas do WhatsApp. Passa a viver num sítio onde o cliente marca sozinho, a qualquer hora, e onde tu só tens de confirmar — ou nem isso, se ligares a confirmação automática. Cada marcação chega com nome, serviço e hora, e o teu telemóvel avisa-te.
              </p>
              <p>
                <strong className="text-dark">Agendamento automático</strong> não é o cliente ser atendido por um robô: é a agenda saber que horas estão livres, quanto dura cada serviço, que barbeiro está de folga e a que horas fechas — e só mostrar ao cliente o que realmente pode marcar. Duas pessoas não conseguem ficar com a mesma hora no mesmo barbeiro, nem que tentem ao mesmo segundo.
              </p>
              <p>
                <strong className="text-dark">Gestão</strong> é o que acontece depois do corte. No checkout registas como pagou, o desconto e a gorjeta; a comissão do barbeiro e o carimbo do cliente ficam feitos no mesmo toque. No fim do dia fechas a caixa. No fim do mês, o Excel do contabilista sai com um botão. Os produtos que vendes ao balcão saem do stock.
              </p>
              <p>
                Tudo isto por uma <strong className="text-dark">mensalidade fixa de {PRECO_MENSAL_TEXTO}</strong>, sem comissões por marcação, sem fidelização, para uma barbearia com um barbeiro ou com cinco. É um <strong className="text-dark">software de gestão para barbearias</strong> feito no Porto, por uma equipa pequena, que atende o telefone.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm">
              <Link to="/precos" className="inline-flex items-center gap-1.5 font-bold text-dark border-b-2 border-[#fee96d] py-1">Ver o preço <ArrowRight size={14} /></Link>
              <Link to="/como-funciona" className="inline-flex items-center gap-1.5 font-bold text-dark border-b-2 border-[#fee96d] py-1">Como funciona, passo a passo <ArrowRight size={14} /></Link>
              <Link to="/faq" className="inline-flex items-center gap-1.5 font-bold text-dark border-b-2 border-[#fee96d] py-1">Perguntas frequentes <ArrowRight size={14} /></Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <GradientTransition from="#ffffff" to="#1a1a1a" />

      {/* AINDA NAO */}
      <section className="relative py-20 lg:py-28 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="max-w-3xl mb-10">
              <p className="text-xs uppercase tracking-[0.25em] font-bold text-[#fee96d] mb-4">4 · Para não haver surpresas</p>
              <h2 className="font-heading text-3xl lg:text-5xl text-white mb-4 leading-tight">O que a Convecta ainda não faz.</h2>
              <p className="text-white/60 text-base lg:text-lg leading-relaxed">
                Preferimos que saibas antes de assinar do que descobrires depois. Isto é o que nos perguntam e ainda não temos.
              </p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {AINDA_NAO.map((c, i) => (
              <ScrollReveal key={c.titulo} delay={i * 0.06} variant="fadeInUp">
                <article className="h-full p-6 rounded-2xl bg-white/[0.03] border border-white/10">
                  <div className="w-10 h-10 rounded-xl bg-white/5 text-white/50 flex items-center justify-center mb-4 border border-white/10">
                    <c.icon size={18} />
                  </div>
                  <h3 className="font-heading text-xl text-white mb-2">{c.titulo}</h3>
                  <p className="text-white/55 text-sm leading-relaxed">{c.texto}</p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="relative py-24 lg:py-32 px-6 lg:px-12 border-t border-white/10 overflow-hidden">
        <AmbientParticles count={8} />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <ScrollReveal>
            <p className="text-xs uppercase tracking-[0.25em] font-bold text-[#fee96d] mb-4">Cinco minutos chegam</p>
            <h2 className="font-heading text-3xl sm:text-5xl lg:text-6xl text-white mb-6 leading-tight">
              Vê tudo isto a funcionar,<br /><span style={{ color: "#fee96d" }}>com as tuas próprias mãos.</span>
            </h2>
            <p className="text-white/70 text-base sm:text-xl font-light leading-relaxed max-w-2xl mx-auto mb-10">
              Marca uma consulta como cliente na barbearia de demonstração. Depois entra no painel e vê-a chegar. Sem registo, sem cartão, sem ninguém a ligar-te a meio.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href={SITE.demoCliente} target="_blank" rel="noopener" className="btn-glow w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 text-sm font-bold uppercase tracking-wide rounded-sm" style={{ backgroundColor: "#fee96d", color: "#1a1a1a" }}>
                <span>Experimentar a demonstração</span>
                <ArrowRight size={18} />
              </a>
              <Link to="/precos" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-xs font-bold uppercase tracking-wide rounded-sm bg-white/10 text-white hover:bg-white/20 border border-white/20 transition-all duration-200">
                <span>Ver o preço: {PRECO_MENSAL_TEXTO}/mês</span>
              </Link>
            </div>
            <p className="text-center text-white/40 text-xs mt-4">
              Preferes falar primeiro? <Link to="/contacto" className="text-white/60 underline underline-offset-2">Deixa-nos o teu contacto</Link>.
            </p>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
