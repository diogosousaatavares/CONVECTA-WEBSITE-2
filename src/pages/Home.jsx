import React, { useEffect, useRef, useState, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { Layers, Eye, Shield, Sparkles, ArrowRight, ChevronDown, CalendarDays, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from 'react-helmet-async';
import ScrollReveal from "@/components/ScrollReveal";
import CtaSection from "@/components/CtaSection";
import PricingSection from "@/components/PricingSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import MarqueeStrip from "@/components/MarqueeStrip";
import AmbientParticles from "@/components/AmbientParticles";
import GradientTransition from "@/components/GradientTransition";
import AdminClienteShowcase from "@/components/AdminClienteShowcase";

const Hero3D = lazy(() => import('@/components/Hero3D'));
const solutions = [
  {
    id: "websites",
    icon: Globe,
    eyebrow: "Para empresas e negócios locais",
    title: "Websites premium que fazem a diferença.",
    description: "Estratégia, design e desenvolvimento para transformar a tua presença digital numa ferramenta de confiança e crescimento.",
    features: ["Design personalizado", "Mobile-first e rápido", "SEO e conversão"],
    action: "Conhecer Websites",
    href: "/servicos",
  },
  {
    id: "booking",
    icon: CalendarDays,
    eyebrow: "Para barbearias modernas",
    title: "Convecta Booking para gerir melhor.",
    description: "App de agendamentos online para barbearias — marcações, fidelização, caixa e relatórios numa plataforma portuguesa.",
    features: ["Agenda online", "Gestão de clientes", "Caixa e relatórios"],
    action: "Conhecer Booking",
    href: "/booking",
  },
];

const processSteps = [
  { number: "01", title: "Descobrimos", desc: "Percebemos o teu negócio, os teus objetivos e onde podemos criar mais impacto." },
  { number: "02", title: "Construímos", desc: "Desenhamos e implementamos uma solução clara, elegante e feita à tua medida." },
  { number: "03", title: "Lançamos", desc: "Colocamos tudo a funcionar com atenção ao detalhe, performance e simplicidade." },
  { number: "04", title: "Acompanhamos", desc: "Continuamos presentes para melhorar, apoiar e manter a tecnologia a trabalhar por ti." },
];

const pillars = [
  { icon: Layers, title: "Confiança", desc: "A base de toda a relação" },
  { icon: Eye, title: "Transparência", desc: "Clareza total em cada etapa" },
  { icon: Shield, title: "Simplicidade", desc: "Sem complicação nem excessos" },
  { icon: Sparkles, title: "Acompanhamento", desc: "Presentes depois da entrega" },
];

const faqItems = [
  {
    q: "O Convecta Booking é uma app de marcações para barbearias?",
    a: "Sim. O Convecta Booking é um software de gestão criado especificamente para barbearias em Portugal. Inclui agendamentos online, cartão de fidelidade digital, controlo de caixa e relatórios — tudo numa plataforma simples, sem comissões por marcação."
  },
  {
    q: "Como funciona o agendamento online para barbearia?",
    a: "O teu cliente acede à tua página personalizada, escolhe o serviço, o profissional e o horário disponível. Recebe confirmação automática por SMS ou e-mail. Tu vês a marcação em tempo real no painel de gestão."
  },
  { q: "Quanto tempo demora o website?", a: "Entre 1 a 2 semanas após recebermos todos os conteúdos necessários." },
  { q: "O que inclui o Convecta Booking?", a: "Agenda online, gestão de clientes, fidelização, caixa e relatórios para teres uma visão completa da tua barbearia." },
  { q: "O Booking funciona para a minha equipa?", a: "Sim. A plataforma foi pensada para simplificar o dia a dia da equipa e dar aos clientes uma marcação rápida e clara." },
  { q: "Porque escolher a Convecta?", a: "Porque não entregamos tecnologia e desaparecemos. Ficamos presentes, acompanhamos o negócio e ajudamos a solução a continuar a evoluir." },
];

function Keyword({ children }) {
  const ref = useRef(null);
  const [reveal, setReveal] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setReveal(true); observer.disconnect(); }
    }, { threshold: 0.5 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return (
    <span ref={ref} className={`kw-underline ${reveal ? "reveal" : ""}`} style={{ color: "#fee96d" }}>
      {children}
    </span>
  );
}

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div onClick={() => setOpen(!open)}
      style={{ borderRadius:16, border:"1.5px solid rgba(17,17,17,0.1)", background:"#fff", padding:"18px 22px", cursor:"pointer", userSelect:"none" }}>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:16 }}>
        <p style={{ fontWeight:700, color:"#111", fontSize:"0.92rem", margin:0, lineHeight:1.4 }}>{q}</p>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration:0.25 }} style={{ flexShrink:0 }}>
          <ChevronDown size={18} color="#6B7280" />
        </motion.div>
      </div>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ opacity:0, height:0 }} animate={{ opacity:1, height:"auto" }} exit={{ opacity:0, height:0 }} transition={{ duration:0.3, ease:"easeInOut" }} style={{ overflow:"hidden" }}>
            <p style={{ marginTop:12, color:"#6B7280", fontSize:"0.87rem", lineHeight:1.75, marginBottom:0 }}>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SolutionVisual({ type }) {
  if (type === "websites") {
    return (
      <div className="hero-device hero-laptop" aria-hidden="true">
        <div className="hero-device-screen">
          <span className="hero-device-brand">Convecta</span>
          <span className="hero-device-title">A tua marca.<br />Em outro nível.</span>
          <span className="hero-device-button">Saber mais</span>
        </div>
        <div className="hero-laptop-base" />
      </div>
    );
  }

  return (
    <div className="hero-device hero-booking" aria-hidden="true">
      <div className="hero-booking-phone">
        <strong>Agenda</strong>
        <span className="hero-booking-line" />
        <span className="hero-booking-line short" />
        <span className="hero-booking-line" />
        <span className="hero-booking-line short" />
      </div>
      <div className="hero-booking-calendar">
        <strong>Agenda</strong>
        {["João Silva", "Miguel Santos", "André Costa"].map((name, index) => (
          <div key={name} className={`hero-booking-event event-${index}`}>{name}<small> Corte de cabelo</small></div>
        ))}
      </div>
    </div>
  );
}

const schemaOrg = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://convecta.pt/#organization",
      "name": "Convecta",
      "url": "https://convecta.pt",
      "logo": {
        "@type": "ImageObject",
        "url": "https://convecta.pt/brand/convecta-logo.png"
      },
      "description": "A Convecta cria websites premium e o Convecta Booking — plataforma de gestão para barbearias com agendamentos online, fidelização e relatórios.",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "PT"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "availableLanguage": "Portuguese"
      },
      "sameAs": [
        "https://www.instagram.com/convecta"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://convecta.pt/#website",
      "url": "https://convecta.pt",
      "name": "Convecta",
      "publisher": {
        "@id": "https://convecta.pt/#organization"
      }
    }
  ]
};

export default function Home() {
  return (
    <main id="main-content">
      <Helmet>
        <title>Convecta — Websites e App de Marcações para Barbearias</title>
        <meta name="description" content="A Convecta cria websites premium e o Convecta Booking — app de gestão para barbearias. Soluções digitais feitas para negócios modernos em Portugal." />
        <link rel="canonical" href="https://convecta.pt" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Convecta" />
        <meta property="og:locale" content="pt_PT" />
        <meta property="og:title" content="Convecta — Websites e App de Marcações para Barbearias" />
        <meta property="og:description" content="Websites premium e app de gestão para barbearias. Marcações online, fidelização de clientes, caixa e relatórios num só lugar." />
        <meta property="og:url" content="https://convecta.pt" />
        <meta property="og:image" content="https://convecta.pt/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Convecta — Websites e App de Marcações para Barbearias" />

        {/* Twitter / X */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@convecta" />
        <meta name="twitter:title" content="Convecta — Websites e App de Marcações para Barbearias" />
        <meta name="twitter:description" content="Websites premium e app de gestão para barbearias. Marcações online, fidelização de clientes e relatórios num só lugar." />
        <meta name="twitter:image" content="https://convecta.pt/og-image.jpg" />
        <meta name="twitter:image:alt" content="Convecta — Websites e App de Marcações para Barbearias" />
        <script type="application/ld+json">
          {JSON.stringify(schemaOrg)}
        </script>
      </Helmet>

      {/* Hero */}
      <section id="solucoes" style={{ backgroundColor:"#111111" }} className="relative overflow-hidden pt-20 pb-5 lg:pb-6">
        <AmbientParticles count={10} />
        <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full py-10 lg:py-5">
          <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-10 items-center min-h-[390px] lg:min-h-[400px]">
            <motion.div initial={{ opacity:0, x:-40 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.8, ease:"easeOut" }}>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/40 mb-5">Soluções digitais para negócios</p>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-[4.2rem] text-white leading-[0.98] mb-5 max-w-2xl">
                {"Soluções digitais para negócios modernos.".split(" ").map((word, i) => (
                  <motion.span key={i} initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5, delay:0.3+i*0.05, ease:"easeOut" }} className="inline-block mr-[0.25em]">
                    {word === "modernos." ? <span style={{ color:"#fee96d" }}>{word}</span> : word}
                  </motion.span>
                ))}
              </h1>
              <p className="text-base lg:text-lg text-white/60 leading-relaxed mb-8 max-w-lg">
                Tecnologia pensada para dar mais presença, organização e crescimento ao teu negócio — num só lugar.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#solucoes"
                  className="btn-glow inline-flex items-center justify-center px-8 py-4 text-sm font-bold uppercase tracking-wide rounded-sm"
                  style={{ backgroundColor:"#fee96d", color:"#1a1a1a" }}
                >
                  Websites <ArrowRight size={16} className="ml-2" />
                </a>
                <a 
                  href="#booking" 
                  onClick={() => {
                    if (typeof window.trackEvent === 'function') {
                      window.trackEvent('cta_click', {
                        event_category: 'CTA',
                        event_label: 'home_to_booking',
                        value: 1
                      });
                    }
                  }}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-medium text-white/70 hover:text-mustard transition-colors"
                >
                  Convecta Booking →
                </a>
              </div>
            </motion.div>
            <motion.div initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }} transition={{ duration:1, delay:0.3, ease:"easeOut" }} className="hidden lg:block h-[430px]">
              <Suspense fallback={
                <div style={{ 
                  width: '100%', height: 430,
                  display: 'flex', alignItems: 'center', 
                  justifyContent: 'center' 
                }}>
                  <div style={{
                    width: 24, height: 24,
                    border: '2px solid rgba(254,233,109,0.2)',
                    borderTopColor: '#fee96d',
                    borderRadius: '50%',
                    animation: 'spin 0.8s linear infinite'
                  }} />
                </div>
              }>
                <Hero3D />
              </Suspense>
            </motion.div>
          </div>

          <div className="hero-solutions-grid mt-12 lg:mt-20">
            {solutions.map((solution, i) => (
              <ScrollReveal key={solution.id} delay={i * 0.12} variant="scaleIn" className="h-full">
                <article id={solution.id} className={`hero-solution-card ${i === 1 ? "hero-solution-card-booking" : ""}`}>
                  <div className="hero-solution-copy">
                    <div>
                      <p className="hero-solution-eyebrow">{i === 0 ? "Websites profissionais" : "Convecta Booking"}</p>
                      <h2>{i === 0 ? <>Websites que <span>fazem a diferença.</span></> : <>Marcações online, gestão de clientes e caixa — <span>simplificados.</span></>}</h2>
                      <p>{solution.description}</p>
                    </div>
                    <div>
                      <Link to={solution.href} className="hero-solution-button">{i === 1 ? "Ver app de marcações para barbearias" : solution.action} <ArrowRight size={14} /></Link>
                    </div>
                  </div>
                  <SolutionVisual type={solution.id} />
                </article>
              </ScrollReveal>
            ))}
          </div>
          <p className="text-center text-sm text-white/50 mt-6">
            Descobre como funciona o{" "}
            <Link to="/processo" className="text-[#fee96d] underline underline-offset-2">
              nosso processo de trabalho
            </Link>
            {" "}ou consulta os{" "}
            <Link to="/precos" className="text-[#fee96d] underline underline-offset-2">
              planos e preços
            </Link>
            .
          </p>
        </div>
      </section>

      <GradientTransition from="#111111" to="#ffffff" />

      {/* Why Convecta */}
      <section style={{ backgroundColor:"#f5f5f5" }} className="py-14 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center mb-10 lg:mb-14">
              <h2 className="font-heading text-3xl lg:text-4xl text-dark mb-4">
                O que é a <Keyword>Convecta</Keyword>
              </h2>
              <p className="text-base lg:text-lg text-dark/60 leading-relaxed">
                Tecnologia com intenção e acompanhamento contínuo. Criamos ferramentas digitais que fazem sentido para a forma como o teu negócio trabalha.
              </p>
            </div>
          </ScrollReveal>
          {/* 2×2 on mobile, 4-col on desktop */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8 max-w-6xl mx-auto">
            {pillars.map((pillar, i) => (
              <ScrollReveal key={i} delay={i * 0.1} variant="fadeInUp">
                <div className="p-5 lg:p-8 rounded-xl transition-all duration-300 group h-full"
                  style={{ background:"rgba(255,255,255,0.6)", backdropFilter:"blur(16px)", WebkitBackdropFilter:"blur(16px)", border:"1px solid rgba(0,0,0,0.08)", boxShadow:"0 8px 32px rgba(0,0,0,0.06)" }}>
                  <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-lg bg-mustard/10 flex items-center justify-center mb-4 group-hover:bg-mustard/20 transition-colors">
                    <pillar.icon size={20} style={{ color:"#1a1a1a" }} strokeWidth={1.5} />
                  </div>
                  <h3 className="font-heading text-lg lg:text-xl text-dark mb-1 lg:mb-2">{pillar.title}</h3>
                  <p className="text-xs lg:text-sm text-dark/50 leading-relaxed">{pillar.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section id="processo" className="bg-white py-14 lg:py-28">
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <ScrollReveal>
            <div className="text-center mb-12">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-dark/40 mb-4">Como funciona</p>
              <h2 className="font-heading text-3xl lg:text-5xl text-dark leading-tight">Do primeiro contacto ao crescimento.</h2>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {processSteps.map((step, i) => (
              <ScrollReveal key={step.number} delay={i * 0.1} variant="fadeInUp">
                <div className="border-t-2 border-dark/10 pt-5 h-full">
                  <p className="font-heading text-4xl text-dark/20 mb-7">{step.number}</p>
                  <h3 className="font-heading text-xl text-dark mb-2">{step.title}</h3>
                  <p className="text-sm text-dark/55 leading-relaxed">{step.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <GradientTransition from="#ffffff" to="#111111" />

      {/* Testimonials */}
      <div id="casos">
        <TestimonialsSection />
      </div>

      {/* Booking Admin & Cliente Showcase */}
      <section style={{ backgroundColor: "#1a1a1a" }} className="py-10 sm:py-16 lg:py-28 relative overflow-hidden border-t border-b border-white/5">
        <AmbientParticles count={8} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 text-center relative z-10">
          <ScrollReveal>
            <p className="text-xs uppercase tracking-[0.25em] font-bold text-[#fee96d] mb-3 sm:mb-4">
              Convecta Booking · Sistema de Gestão & Reservas
            </p>
            <h2 className="font-heading text-2xl sm:text-5xl lg:text-6xl text-white mb-3 sm:mb-6 leading-tight max-w-4xl mx-auto">
              Um painel para gerir.<br />
              <span style={{ color: "#fee96d" }}>Uma app para reservar.</span>
            </h2>
            <p className="text-white/70 text-xs sm:text-lg leading-relaxed mb-6 sm:mb-10 max-w-2xl mx-auto font-light">
              O dono tem controlo total sobre a operação — agendas, relatórios e clientes. O teu cliente faz a marcação online em segundos sem instalar nada.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <AdminClienteShowcase />
          </ScrollReveal>

          <ScrollReveal delay={0.25}>
            <div className="mt-4 sm:mt-8 flex justify-center">
              <Link
                to="/booking"
                className="btn-glow inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:px-8 sm:py-4 text-xs sm:text-sm font-bold uppercase tracking-wide rounded-sm"
                style={{ backgroundColor: "#fee96d", color: "#1a1a1a" }}
              >
                <span>Conhecer o Convecta Booking</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Marquee */}
      <MarqueeStrip />

      {/* Pricing */}
      <PricingSection />

      {/* FAQ mini-section */}
      <section style={{ backgroundColor:"#ffffff" }} className="py-14 lg:py-28">
        <div className="max-w-2xl mx-auto px-6 lg:px-12">
          <ScrollReveal>
            <div className="text-center mb-10">
              <span style={{ display:"inline-block", backgroundColor:"rgba(254,233,109,0.18)", color:"#b89e00", fontSize:11, fontWeight:800, letterSpacing:"0.2em", padding:"6px 18px", borderRadius:100, marginBottom:16, textTransform:"uppercase" }}>FAQ</span>
              <h2 style={{ fontWeight:800, fontSize:"clamp(1.7rem,3.5vw,2.5rem)", color:"#111", lineHeight:1.1, letterSpacing:"-0.02em", marginBottom:8 }}>
                Perguntas frequentes
              </h2>
              <p style={{ color:"#6B7280", fontSize:"0.92rem", lineHeight:1.7 }}>
                Tudo o que precisa de saber antes de começar.
              </p>
            </div>
          </ScrollReveal>
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            {faqItems.map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.07}>
                <FaqItem q={item.q} a={item.a} />
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal>
            <div className="text-center mt-8">
              <Link to="/faq" style={{ display:"inline-flex", alignItems:"center", gap:6, color:"#111", fontWeight:700, fontSize:"0.86rem", textDecoration:"none", borderBottom:"1.5px solid #FEE96D", padding:"12px 0", minHeight:"44px" }}>
                Ver todas as perguntas frequentes sobre websites e app para barbearias <ArrowRight size={12} />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <CtaSection title="Pronto para dar ao teu negócio a solução certa?" buttonText="Falar sobre o meu negócio" />
    </main>
  );
}
