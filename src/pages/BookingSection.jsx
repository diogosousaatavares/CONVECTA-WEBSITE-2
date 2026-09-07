import React, { useState } from "react";
import { ArrowRight, CalendarDays, Check, LineChart, Users, CreditCard, Heart, Package, Tag, Scissors, Clock3, Repeat2 } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from 'react-helmet-async';
import CtaSection from "@/components/CtaSection";
import AdminClienteShowcase from "@/components/AdminClienteShowcase";
import AmbientParticles from "@/components/AmbientParticles";
import { useContactModal } from "@/lib/ContactModalContext";

const sections = {
  funcionalidades: {
    eyebrow: "Convecta Booking · Funcionalidades",
    title: <>Funcionalidades do App de Marcações<br /><span>para Barbearias</span></>,
    intro: "Seis módulos pensados para eliminar processos manuais e dar-te uma visão clara do negócio a qualquer momento.",
    cards: [
      { title: "Agenda & Marcações", desc: "Sistema de agendamentos online para barbearias — o teu cliente marca em segundos, tu recebes a confirmação em tempo real.", icon: CalendarDays },
      { title: "Cartão de Fidelidade Digital", desc: "A cada corte, o cliente acumula carimbos num cartão animado personalizado com as tuas cores. A recompensa é configurável.", icon: Heart },
      { title: "Relatórios Financeiros", desc: "Receita por período, comissões por profissional, ranking de serviços e funil de marcações. Gestão financeira da tua barbearia com dados reais.", icon: LineChart },
      { title: "Gestão de Inventário", desc: "Produtos com preço de custo e venda, controlo de stock, alertas de nível baixo e histórico de movimentos integrado com o checkout.", icon: Package },
      { title: "Assinaturas & Pacotes", desc: "Cria planos mensais para os teus clientes mais fiéis. Gere renovações e benefícios exclusivos sem burocracia adicional.", icon: Repeat2 },
      { title: "Promoções & Cupões", desc: "Lança promoções de percentagem ou valor fixo, define períodos de validade e distribui cupões aplicados automaticamente no checkout.", icon: Tag },
    ],
  },
  "admin-cliente": {
    eyebrow: "Convecta Booking · Admin & Cliente",
    title: <>Um painel para gerir.<br /><span>Uma app para reservar.</span></>,
    intro: "Duas plataformas complementares — o dono tem controlo total, o cliente tem uma experiência de reserva profissional.",
    cards: [
      { title: "Agenda por profissional", desc: "Vista global e individual de cada profissional, com drag-and-drop e checkout integrado.", icon: CalendarDays },
      { title: "Checkout e comissões", desc: "Regista serviços, produtos e pagamentos. As comissões calculam-se automaticamente.", icon: CreditCard },
      { title: "Dashboard financeiro", desc: "Receita, ticket médio, ocupação e previsões — em tempo real, sem exportações.", icon: LineChart },
      { title: "Perfil e histórico do cliente", desc: "Cada cliente tem um perfil com o histórico completo de visitas, preferências e notas.", icon: Users },
      { title: "Fidelização digital", desc: "Cartão de fidelidade animado, personalizado com as cores da tua barbearia.", icon: Heart },
      { title: "Marcações online em segundos", desc: "O cliente escolhe serviço, profissional e hora. A confirmação chega automaticamente.", icon: Clock3 },
    ],
  },
  "como-funciona": {
    eyebrow: "Convecta Booking · Como funciona",
    title: <>Da configuração à<br /><span>operação completa.</span></>,
    intro: "Três fases simples. A tua barbearia está operacional em menos de uma semana.",
    cards: [
      { title: "Configuração inicial (2–3 dias)", desc: "Definimos profissionais, serviços, horários e preços. Personalizamos o cartão de fidelidade com a tua identidade.", icon: SettingsIcon },
      { title: "Publicação do link personalizado", desc: "A app de cliente fica disponível com o teu URL próprio. Os clientes registam-se e marcam de imediato.", icon: ArrowRight },
      { title: "Marcações em tempo real", desc: "O painel de admin recebe cada marcação instantaneamente. A equipa vê a agenda atualizada.", icon: CalendarDays },
      { title: "Relatórios para crescer", desc: "Com dados reais da operação, tomas decisões com clareza — promoções, stock, comissões.", icon: LineChart },
    ],
  },
  demonstracao: {
    eyebrow: "Convecta Booking · Demonstração",
    title: <>Vê o Booking<br /><span>em funcionamento.</span></>,
    intro: "Mostramos-te a plataforma completa adaptada ao dia a dia da tua barbearia — sem compromisso.",
    cards: [
      { title: "Demonstração personalizada", desc: "Não é uma apresentação genérica. Mostramos o produto aplicado ao teu tipo de barbearia.", icon: Users },
      { title: "Resposta em menos de 24 horas", desc: "Entramos em contacto no próprio dia ou no dia útil seguinte ao teu pedido.", icon: Clock3 },
      { title: "Sem compromisso", desc: "Podes ver tudo antes de decidir. Não há contratos nem obrigações na demonstração.", icon: Check },
      { title: "Configuração acompanhada", desc: "Se avançares, acompanhamos todo o processo de configuração e lançamento.", icon: Scissors },
    ],
  },
};

function RepeatIcon(props) { return <span {...props}><Check size={20} /></span>; }
function SettingsIcon(props) { return <span {...props}><Package size={20} /></span>; }

export default function BookingSection() {
  const { section = "funcionalidades" } = useParams();
  const content = sections[section] || sections.funcionalidades;
  const { open: openModal } = useContactModal();
  const [formSent, setFormSent] = useState(false);

  const isAdminCliente = section === "admin-cliente";

  return (
    <main id="main-content" style={{ backgroundColor: "#1a1a1a" }} className="booking-page text-white min-h-screen">
      <Helmet>
        <title>Convecta Booking — Funcionalidades | App para Barbearias</title>
        <meta name="description" content="Explora todas as funcionalidades do Convecta Booking: agenda online, fidelização, caixa e relatórios para barbearias." />
        <link rel="canonical" href="https://convecta.pt/booking/funcionalidades" />
        <meta property="og:title" content="Convecta Booking — Funcionalidades" />
        <meta property="og:description" content="Tudo o que a tua barbearia precisa: marcações online, fidelização digital, caixa e relatórios financeiros." />
        <meta property="og:url" content="https://convecta.pt/booking/funcionalidades" />
        <meta property="og:image" content="https://convecta.pt/og-image-booking.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://convecta.pt/og-image-booking.jpg" />
      </Helmet>

      {/* HERO SECTION */}
      <section style={{ backgroundColor: "#1a1a1a" }} className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 px-6 lg:px-12 text-center overflow-hidden border-b border-white/5">
        <AmbientParticles count={10} />
        
        <div className="max-w-5xl mx-auto relative z-10">
          <nav aria-label="Breadcrumb" className="text-xs text-white/40 mb-4">
            <Link to="/" className="hover:text-white/70 transition-colors">Início</Link>
            <span className="mx-2">/</span>
            <Link to="/booking" className="hover:text-white/70 transition-colors">
              Convecta Booking
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white/60">{section}</span>
          </nav>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#fee96d] mb-4">
              {content.eyebrow}
            </p>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {content.title}
            </h1>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl mx-auto font-light">
              {content.intro}
            </p>
            <button 
              onClick={openModal} 
              className="btn-glow inline-flex items-center gap-2 px-8 py-4 text-sm font-bold uppercase tracking-wide rounded-sm"
              style={{ backgroundColor: "#fee96d", color: "#1a1a1a" }}
            >
              Pedir demonstração <ArrowRight size={16} />
            </button>
          </motion.div>

          {/* MOSTRA O MOCKUP 3D INSPIRADO NA FOTO QUANDO ESTÁ NA ABA ADMIN & CLIENTE */}
          {isAdminCliente && (
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
              <AdminClienteShowcase />
            </motion.div>
          )}
        </div>
      </section>

      {/* CARDS DA SECTOR */}
      <section style={{ backgroundColor: "#141414" }} className="py-20 px-6 lg:px-12">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.cards.map((card, index) => {
              const Icon = card.icon;
              return (
              <motion.article 
                key={card.title} 
                initial={{ opacity: 0, y: 15 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ delay: index * 0.06 }} 
                className="p-6 rounded-2xl bg-white/[0.04] border border-white/10 relative group hover:border-[#fee96d]/40 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-[#fee96d]/10 text-[#fee96d] flex items-center justify-center mb-4 border border-[#fee96d]/20">
                  <Icon size={20} />
                </div>
                <span className="text-xs font-mono text-[#fee96d]">0{index + 1}</span>
                <h2 className="font-heading text-xl font-bold text-white my-2">{card.title}</h2>
                <p className="text-white/60 text-xs sm:text-sm leading-relaxed font-light">{card.desc}</p>
                <Check size={16} className="text-[#fee96d] absolute bottom-6 right-6 opacity-60" />
              </motion.article>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-12 pt-8 border-t border-white/10">
            <Link to="/booking" className="inline-flex items-center gap-2 text-sm font-bold text-[#fee96d] hover:text-white transition-colors">
              <ArrowRight size={15} className="rotate-180" /> Voltar à visão geral
            </Link>
            <div className="flex items-center gap-4">
              <Link to="/precos" className="text-sm font-semibold text-white/70 hover:text-white transition-colors">
                Ver preços
              </Link>
              <button 
                onClick={openModal} 
                className="btn-glow px-6 py-3 text-xs font-bold uppercase tracking-wide rounded-sm"
                style={{ backgroundColor: "#fee96d", color: "#1a1a1a" }}
              >
                Falar sobre o Booking
              </button>
            </div>
          </div>
        </div>
      </section>

      {section === "demonstracao" && (
        <section style={{ backgroundColor: "#1a1a1a" }} className="py-20 px-6 lg:px-12 border-t border-white/10">
          <div className="max-w-3xl mx-auto">
            <div className="p-8 sm:p-12 rounded-3xl bg-white/[0.04] border border-white/10">
              <p className="text-xs uppercase tracking-[0.25em] font-bold text-[#fee96d] mb-2">Agendar demonstração</p>
              <h2 className="font-heading text-3xl font-bold text-white mb-3">Vamos mostrar-te como funciona.</h2>
              <p className="text-white/60 text-sm mb-8 font-light">Deixa os teus dados e indica-nos quando é melhor falar contigo.</p>
              {formSent ? (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-medium flex items-center gap-3">
                  <Check size={18} /> Pedido recebido. Entraremos em contacto em menos de 24 horas.
                </div>
              ) : (
                <form onSubmit={(event) => { 
                  event.preventDefault(); 
                  if (typeof window.trackEvent === 'function') {
                    window.trackEvent('demo_request', {
                      event_category: 'Conversao',
                      event_label: 'formulario_demo',
                      value: 1
                    });
                  }
                  setFormSent(true); 
                }} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <label htmlFor="campo-nome" className="text-xs font-medium text-white/80 space-y-1 block">
                      <span>Nome</span>
                      <input id="campo-nome" required placeholder="O teu nome" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#fee96d] focus:ring-offset-1 focus:ring-offset-black" />
                    </label>
                    <label htmlFor="campo-barbearia" className="text-xs font-medium text-white/80 space-y-1 block">
                      <span>Barbearia</span>
                      <input id="campo-barbearia" required placeholder="Nome da barbearia" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#fee96d] focus:ring-offset-1 focus:ring-offset-black" />
                    </label>
                    <label htmlFor="campo-email" className="text-xs font-medium text-white/80 space-y-1 block">
                      <span>Email</span>
                      <input id="campo-email" required type="email" placeholder="email@exemplo.pt" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#fee96d] focus:ring-offset-1 focus:ring-offset-black" />
                    </label>
                    <label htmlFor="campo-telefone" className="text-xs font-medium text-white/80 space-y-1 block">
                      <span>Telefone</span>
                      <input id="campo-telefone" type="tel" placeholder="+351 ..." className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#fee96d] focus:ring-offset-1 focus:ring-offset-black" />
                    </label>
                  </div>
                  <label htmlFor="campo-horario" className="text-xs font-medium text-white/80 space-y-1 block">
                    <span>Horário preferido</span>
                    <select id="campo-horario" defaultValue="" className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#fee96d] focus:ring-offset-1 focus:ring-offset-black">
                      <option value="" disabled>Escolher horário</option>
                      <option>Manhã</option>
                      <option>Tarde</option>
                      <option>Final do dia</option>
                    </select>
                  </label>
                  <button type="submit" className="btn-glow w-full py-4 rounded-xl bg-[#fee96d] text-black font-bold text-sm uppercase tracking-wide mt-4">
                    Quero uma demonstração <ArrowRight size={16} className="inline ml-2" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      )}

      <section style={{ backgroundColor: "#1a1a1a" }} className="py-20 px-6 lg:px-12 border-t border-white/10">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-[0.25em] font-bold text-[#fee96d] mb-2">Perguntas frequentes</p>
          <h2 className="font-heading text-3xl font-bold text-white mb-8">Ainda tens dúvidas?</h2>
          <div className="space-y-4">
            <details className="p-4 rounded-xl bg-white/5 border border-white/10 group cursor-pointer">
              <summary className="text-white font-bold text-sm flex items-center justify-between">
                <span>Os clientes precisam de instalar uma app?</span>
                <span className="text-[#fee96d] group-open:rotate-180 transition-transform">↓</span>
              </summary>
              <p className="text-white/60 text-xs sm:text-sm mt-3 leading-relaxed font-light">
                Não. A experiência funciona no browser, em qualquer dispositivo, sem downloads.
              </p>
            </details>
            <details className="p-4 rounded-xl bg-white/5 border border-white/10 group cursor-pointer">
              <summary className="text-white font-bold text-sm flex items-center justify-between">
                <span>Posso gerir vários profissionais?</span>
                <span className="text-[#fee96d] group-open:rotate-180 transition-transform">↓</span>
              </summary>
              <p className="text-white/60 text-xs sm:text-sm mt-3 leading-relaxed font-light">
                Sim. Cada profissional pode ter horários, serviços e agenda próprios.
              </p>
            </details>
            <details className="p-4 rounded-xl bg-white/5 border border-white/10 group cursor-pointer">
              <summary className="text-white font-bold text-sm flex items-center justify-between">
                <span>O Convecta Booking substitui o meu sistema atual?</span>
                <span className="text-[#fee96d] group-open:rotate-180 transition-transform">↓</span>
              </summary>
              <p className="text-white/60 text-xs sm:text-sm mt-3 leading-relaxed font-light">
                O Booking centraliza agenda, clientes, caixa, stock, fidelização e relatórios numa só operação.
              </p>
            </details>
            <details className="p-4 rounded-xl bg-white/5 border border-white/10 group cursor-pointer">
              <summary className="text-white font-bold text-sm flex items-center justify-between">
                <span>Como conheço os preços?</span>
                <span className="text-[#fee96d] group-open:rotate-180 transition-transform">↓</span>
              </summary>
              <p className="text-white/60 text-xs sm:text-sm mt-3 leading-relaxed font-light">
                Os planos dependem da dimensão e necessidades da barbearia. Consulta a página de preços ou pede uma demonstração.
              </p>
            </details>
          </div>
        </div>
      </section>

      <CtaSection title="Pronto para simplificar a tua barbearia?" buttonText="Pedir demonstração" />
      <div className="text-center pb-12 text-sm text-white/40">
        <Link to="/booking" className="text-[#fee96d] underline underline-offset-2">
          ← Voltar ao Convecta Booking
        </Link>
        {" · "}
        <Link to="/precos" className="text-[#fee96d] underline underline-offset-2">
          Ver preços
        </Link>
      </div>
    </main>
  );
}
