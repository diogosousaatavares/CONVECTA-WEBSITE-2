import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Layers, ArrowRight, ChevronDown, CalendarDays } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from 'react-helmet-async';
import ScrollReveal from "@/components/ScrollReveal";
import CtaSection from "@/components/CtaSection";
import PricingSection from "@/components/PricingSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import MarqueeStrip from "@/components/MarqueeStrip";
import AmbientParticles from "@/components/AmbientParticles";
import HeroCanvas from "@/components/HeroCanvas";
import GradientTransition from "@/components/GradientTransition";

const solutions = [
  {
    id: "agendamentos",
    icon: CalendarDays,
    eyebrow: "App do Cliente",
    title: "Marcações online, sem WhatsApp.",
    description: "O teu cliente reserva em 3 cliques, a qualquer hora. Tu recebes a marcação em tempo real, sem telefonemas nem mensagens.",
    features: ["Agenda por profissional", "Confirmação automática", "Sem comissões por marcação"],
    action: "Ver app do cliente",
    href: "/funcionalidades",
  },
  {
    id: "gestao",
    icon: Layers,
    eyebrow: "App do Admin",
    title: "Caixa, equipa e relatórios numa só plataforma.",
    description: "Receitas, comissões por profissional, inventário e fidelização — tudo integrado. Sabes sempre o que acontece na tua barbearia.",
    features: ["Controlo de caixa", "Relatórios financeiros", "Fidelização de clientes"],
    action: "Ver painel de administração",
    href: "/como-funciona",
  },
];

const processSteps = [
  { number: "01", title: "Demonstração", desc: "Mostramos-te a plataforma em direto, adaptada ao teu tipo de barbearia. Sem compromisso." },
  { number: "02", title: "Configuração", desc: "Criamos o teu perfil, adicionamos a equipa, serviços e horários. Tu acompanhas cada passo." },
  { number: "03", title: "Lançamento", desc: "A tua barbearia fica operacional em menos de 24 horas. Os teus clientes já podem marcar." },
  { number: "04", title: "Acompanhamento", desc: "Continuamos presentes. Suporte rápido, atualizações constantes e sem custos escondidos." },
];

const pillars = [
  { emoji: "💸", title: "Sem comissões", desc: "Ficas com 100% das tuas marcações" },
  { emoji: "🔓", title: "Sem fidelização", desc: "Cancelas quando quiseres" },
  { emoji: "⚡", title: "Pronto em 24h", desc: "Operacional no próprio dia" },
  { emoji: "🎧", title: "Suporte real", desc: "Resposta em menos de 24 horas" },
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
  { q: "Em quanto tempo a minha barbearia fica operacional?", a: "Em menos de 24 horas após a demonstração. Configuramos tudo contigo — equipa, serviços, horários — e a tua página de marcações fica ativa no próprio dia." },
  { q: "O que inclui o Convecta Booking?", a: "Agenda online, gestão de clientes, fidelização, caixa e relatórios para teres uma visão completa da tua barbearia." },
  { q: "O Booking funciona para a minha equipa?", a: "Sim. A plataforma foi pensada para simplificar o dia a dia da equipa e dar aos clientes uma marcação rápida e clara." },
  { q: "Porque escolher o Convecta Booking?", a: "Porque foi criado de raiz para barbearias em Portugal. Sem comissões por marcação, sem fidelização obrigatória, com suporte real e uma equipa presente depois do lançamento." },
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

function HeroDevices() {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'visible' }}>

      {/* ── Background glow ── */}
      <div style={{ position: 'absolute', top: '45%', left: '45%', transform: 'translate(-50%, -50%)', width: 560, height: 560, borderRadius: '50%', background: 'radial-gradient(circle, rgba(254,233,109,0.07) 0%, rgba(254,233,109,0.02) 50%, transparent 72%)', pointerEvents: 'none', zIndex: 0 }} />

      {/* ── Laptop / Admin Dashboard — fills most of the space ── */}
      <div style={{
        position: 'absolute', left: 0, top: 100,
        width: 520, height: 276,
        borderRadius: '14px 14px 0 0',
        background: '#0b0b0f',
        border: '1.5px solid rgba(255,255,255,0.08)',
        boxShadow: '0 40px 90px rgba(0,0,0,0.9), 0 0 60px rgba(254,233,109,0.05)',
        overflow: 'hidden', zIndex: 1,
      }}>
        <video
          src="/laptop-demo.mp4"
          autoPlay
          loop
          muted
          playsInline
          style={{ width: '100%', height: '100%', objectFit: 'fill', display: 'block' }}
        />
      </div>

      {/* ── Laptop base / keyboard ── */}
      <div style={{
        position: 'absolute', left: -18, top: 376,
        width: 556, height: 16,
        background: 'linear-gradient(180deg, #1a1a1f 0%, #0e0e12 100%)',
        borderRadius: '0 0 10px 10px',
        boxShadow: '0 8px 30px rgba(0,0,0,0.7)',
        zIndex: 1,
      }}>
        <div style={{ width: 50, height: 4, background: 'rgba(255,255,255,0.06)', borderRadius: 2, margin: '5px auto 0' }} />
      </div>

      {/* ── Phone (client app) — clearly to the right, minimal overlap ── */}
      <div style={{ position: 'absolute', left: 490, top: 60, zIndex: 3 }}>
        <div style={{
          width: 200, height: 440, borderRadius: 40,
          border: '2px solid rgba(255,255,255,0.1)',
          background: '#0c0c10',
          boxShadow: '0 40px 90px rgba(0,0,0,0.95), 0 0 0 1px rgba(255,255,255,0.04), 0 0 50px rgba(254,233,109,0.08)',
          overflow: 'hidden', position: 'relative',
        }}>
          {/* Dynamic island */}
          <div style={{ position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)', width: 50, height: 12, background: '#000', borderRadius: 6, zIndex: 10 }} />
          {/* Video */}
          <video
            src="/phone-demo.mp4"
            autoPlay
            loop
            muted
            playsInline
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </div>
      </div>

      {/* ── Sync indicator ── */}
      <motion.div
        animate={{ opacity: [0.45, 1, 0.45] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'absolute', left: 420, top: 345, zIndex: 4 }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(7,7,10,0.95)', border: '1px solid rgba(254,233,109,0.18)', borderRadius: 8, padding: '5px 10px', backdropFilter: 'blur(8px)' }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#34d399', boxShadow: '0 0 8px #34d399' }} />
          <span style={{ fontSize: 8, color: 'rgba(255,255,255,0.55)', fontWeight: 600 }}>Em sincronia</span>
        </div>
      </motion.div>

    </div>
  );
}


function SolutionVisual({ type }) {
  if (type === "agendamentos") {
    // App do Cliente — phone with booking interface
    return (
      <div aria-hidden="true" style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', padding: '20px 0', perspective: '800px' }}>
        <div style={{
          width: 145, height: 270,
          borderRadius: 24,
          border: '2px solid rgba(254,233,109,0.28)',
          background: 'linear-gradient(145deg, #1a1a1a 0%, #0d0d0d 100%)',
          boxShadow: '10px 20px 50px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04), 0 0 30px rgba(254,233,109,0.06)',
          transform: 'rotateY(-10deg) rotateX(5deg)',
          overflow: 'hidden',
          position: 'relative',
        }}>
          {/* Notch */}
          <div style={{ height: 24, background: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 42, height: 11, borderRadius: 6, background: '#1a1a1a' }} />
          </div>
          {/* Yellow header */}
          <div style={{ padding: '8px 10px 6px', background: '#fee96d' }}>
            <p style={{ fontSize: 7, fontWeight: 800, color: '#111', margin: 0, textTransform: 'uppercase', letterSpacing: '0.12em' }}>Convecta</p>
            <p style={{ fontSize: 10, fontWeight: 700, color: '#111', margin: '2px 0 0' }}>Fazer marcação</p>
          </div>
          {/* Content */}
          <div style={{ padding: '8px 9px 0' }}>
            <p style={{ fontSize: 6.5, color: 'rgba(255,255,255,0.32)', margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Serviço</p>
            {['Corte de cabelo', 'Barba', 'Corte + Barba'].map((s, i) => (
              <div key={i} style={{
                borderRadius: 6, padding: '5px 7px', marginBottom: 3,
                background: i === 0 ? 'rgba(254,233,109,0.1)' : 'rgba(255,255,255,0.04)',
                border: i === 0 ? '1px solid rgba(254,233,109,0.32)' : '1px solid transparent',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              }}>
                <span style={{ fontSize: 8, color: i === 0 ? '#fee96d' : 'rgba(255,255,255,0.38)', fontWeight: i === 0 ? 600 : 400 }}>{s}</span>
                {i === 0 && <div style={{ width: 10, height: 10, borderRadius: '50%', border: '1.5px solid #fee96d', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#fee96d' }} />
                </div>}
              </div>
            ))}
            <p style={{ fontSize: 6.5, color: 'rgba(255,255,255,0.32)', margin: '7px 0 4px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Horário</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 3 }}>
              {['09:00', '10:30', '14:00', '15:00', '16:30', '17:00'].map((t, i) => (
                <div key={i} style={{
                  padding: '4px 0', textAlign: 'center', borderRadius: 5,
                  background: i === 2 ? '#fee96d' : 'rgba(255,255,255,0.05)',
                  fontSize: 7, color: i === 2 ? '#111' : 'rgba(255,255,255,0.32)',
                  fontWeight: i === 2 ? 700 : 400,
                }}>{t}</div>
              ))}
            </div>
          </div>
          <div style={{ position: 'absolute', bottom: 10, left: 9, right: 9 }}>
            <div style={{ background: '#fee96d', borderRadius: 8, padding: '7px', textAlign: 'center' }}>
              <span style={{ fontSize: 8, fontWeight: 800, color: '#111', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Confirmar</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // App do Admin — management dashboard
  return (
    <div aria-hidden="true" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '20px 0', perspective: '800px', gap: 10 }}>
      {/* Laptop/dashboard screen */}
      <div style={{
        width: 240, height: 162,
        borderRadius: 10,
        border: '1.5px solid rgba(254,233,109,0.18)',
        background: '#1a1a1a',
        boxShadow: '10px 20px 50px rgba(0,0,0,0.55), 0 0 24px rgba(254,233,109,0.05)',
        transform: 'rotateY(8deg) rotateX(5deg)',
        overflow: 'hidden',
      }}>
        {/* Title bar */}
        <div style={{ height: 22, background: '#111', display: 'flex', alignItems: 'center', padding: '0 8px', gap: 4 }}>
          {['#ff5f57','#febc2e','#28c840'].map((c, i) => (
            <div key={i} style={{ width: 5, height: 5, borderRadius: '50%', background: c }} />
          ))}
          <span style={{ fontSize: 7, color: 'rgba(255,255,255,0.22)', marginLeft: 5 }}>Painel de gestão — Convecta</span>
        </div>
        {/* Stats row */}
        <div style={{ padding: '6px 8px', display: 'flex', gap: 5 }}>
          {[
            { label: 'Hoje', value: '12', unit: 'marcações', hi: true },
            { label: 'Receita', value: '€480', unit: 'este mês', hi: false },
            { label: 'Clientes', value: '248', unit: 'ativos', hi: false },
          ].map((stat, i) => (
            <div key={i} style={{
              flex: 1, borderRadius: 6,
              background: stat.hi ? 'rgba(254,233,109,0.09)' : 'rgba(255,255,255,0.04)',
              border: stat.hi ? '1px solid rgba(254,233,109,0.18)' : 'none',
              padding: '5px 6px',
            }}>
              <p style={{ fontSize: 6, color: 'rgba(255,255,255,0.3)', margin: '0 0 2px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{stat.label}</p>
              <p style={{ fontSize: 13, fontWeight: 800, color: stat.hi ? '#fee96d' : 'white', margin: '0 0 1px', lineHeight: 1 }}>{stat.value}</p>
              <p style={{ fontSize: 6, color: 'rgba(255,255,255,0.22)', margin: 0 }}>{stat.unit}</p>
            </div>
          ))}
        </div>
        {/* Appointments list */}
        <div style={{ padding: '0 8px' }}>
          <p style={{ fontSize: 6, color: 'rgba(255,255,255,0.28)', margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Próximas marcações</p>
          {[
            { time: '14:00', name: 'João Silva', service: 'Corte' },
            { time: '14:30', name: 'Miguel Costa', service: 'Barba' },
            { time: '15:00', name: 'André Santos', service: 'Corte + Barba' },
          ].map((a, i) => (
            <div key={i} style={{
              display: 'flex', gap: 5, alignItems: 'center', marginBottom: 3,
              padding: '3px 5px', borderRadius: 4,
              background: i === 0 ? 'rgba(254,233,109,0.06)' : 'transparent',
            }}>
              <span style={{ fontSize: 7, color: '#fee96d', fontWeight: 700, minWidth: 26 }}>{a.time}</span>
              <span style={{ fontSize: 7, color: 'rgba(255,255,255,0.6)', flex: 1 }}>{a.name}</span>
              <span style={{ fontSize: 6, color: 'rgba(255,255,255,0.28)', background: 'rgba(255,255,255,0.05)', padding: '1px 4px', borderRadius: 3 }}>{a.service}</span>
            </div>
          ))}
        </div>
        {/* Mini bar chart */}
        <div style={{ padding: '4px 8px 8px', display: 'flex', alignItems: 'flex-end', gap: 3, height: 36 }}>
          {[40, 65, 55, 80, 50, 90, 70].map((h, i) => (
            <div key={i} style={{
              flex: 1, borderRadius: '2px 2px 0 0',
              background: i === 5 ? '#fee96d' : 'rgba(255,255,255,0.08)',
              height: `${h}%`,
            }} />
          ))}
        </div>
      </div>
      {/* Laptop base */}
      <div style={{
        width: 260, height: 8,
        background: 'linear-gradient(180deg, #2a2a2a 0%, #1a1a1a 100%)',
        borderRadius: '0 0 8px 8px',
        transform: 'rotateY(8deg) rotateX(5deg)',
        boxShadow: '0 8px 20px rgba(0,0,0,0.4)',
      }} />
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
      "description": "O Convecta Booking é a plataforma de gestão para barbearias em Portugal — agendamentos online, fidelização de clientes, controlo de caixa e relatórios num só lugar.",
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
        <title>Convecta Booking — App de Marcações e Gestão para Barbearias</title>
        <meta name="description" content="A plataforma de gestão para barbearias em Portugal. Agendamentos online, cartão de fidelidade digital, controlo de caixa e relatórios — sem comissões por marcação." />
        <link rel="canonical" href="https://convecta.pt" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Convecta" />
        <meta property="og:locale" content="pt_PT" />
        <meta property="og:title" content="Convecta Booking — App de Marcações e Gestão para Barbearias" />
        <meta property="og:description" content="Agendamentos online, fidelização de clientes, caixa e relatórios. A plataforma de gestão para barbearias modernas em Portugal." />
        <meta property="og:url" content="https://convecta.pt" />
        <meta property="og:image" content="https://convecta.pt/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Convecta Booking — App de Marcações para Barbearias" />

        {/* Twitter / X */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@convecta" />
        <meta name="twitter:title" content="Convecta Booking — App de Marcações e Gestão para Barbearias" />
        <meta name="twitter:description" content="Agendamentos online, cartão de fidelidade digital, caixa e relatórios. O software de gestão para barbearias feito em Portugal." />
        <meta name="twitter:image" content="https://convecta.pt/og-image.jpg" />
        <meta name="twitter:image:alt" content="Convecta Booking — App de Marcações para Barbearias" />
        <script type="application/ld+json">
          {JSON.stringify(schemaOrg)}
        </script>
      </Helmet>

      {/* Hero */}
      <section id="solucoes" style={{ backgroundColor:"#111111" }} className="relative overflow-hidden pt-20 pb-10 lg:pb-16">
        <HeroCanvas />

        <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-[42%_58%] gap-10 lg:gap-0 items-start">

            {/* ── LEFT: Copy ── */}
            <motion.div
              initial={{ opacity:0, x:-40 }} animate={{ opacity:1, x:0 }}
              transition={{ duration:0.8, ease:"easeOut" }}
              className="flex flex-col lg:min-h-[540px]"
            >
              <div style={{ flex: 1 }}>
                {/* Eyebrow */}
                <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:22 }}>
                  <div style={{ width:28, height:1.5, background:'#fee96d', flexShrink:0 }} />
                  <p style={{ fontSize:10, fontWeight:700, letterSpacing:'0.22em', color:'rgba(255,255,255,0.38)', textTransform:'uppercase', margin:0 }}>
                    Software de gestão para barbearias
                  </p>
                </div>
                {/* H1 */}
                <h1 className="font-heading text-[1.85rem] md:text-4xl lg:text-[4.1rem] text-white leading-[0.97] mb-4 max-w-xl">
                  {"A plataforma que a tua barbearia precisava.".split(" ").map((word, i) => (
                    <motion.span key={i} initial={{ opacity:0, y:28 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5, delay:0.3+i*0.05, ease:"easeOut" }} className="inline-block mr-[0.25em]">
                      {word === "precisava." ? <span style={{ color:"#fee96d" }}>{word}</span> : word}
                    </motion.span>
                  ))}
                </h1>
                {/* Subtitle */}
                <p className="text-sm lg:text-[1.05rem] text-white/55 leading-relaxed mb-7 max-w-md">
                  Agenda online, gestão de caixa e fidelização de clientes — tudo numa plataforma simples, sem comissões por marcação.
                </p>
                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-3 mb-8 lg:mb-12">
                  <Link to="/contacto" className="btn-glow inline-flex items-center justify-center px-5 py-3 lg:px-8 lg:py-4 text-xs lg:text-sm font-bold uppercase tracking-wide rounded-sm" style={{ backgroundColor:"#fee96d", color:"#1a1a1a" }}>
                    Pedir Demonstração <ArrowRight size={14} className="ml-2" />
                  </Link>
                  <Link to="/funcionalidades" className="inline-flex items-center justify-center gap-2 px-5 py-3 lg:px-8 lg:py-4 text-xs lg:text-sm font-medium text-white/65 hover:text-white transition-colors">
                    Ver funcionalidades →
                  </Link>
                </div>
              </div>
              {/* Benefits strip — desktop only */}
              <div className="hidden lg:flex" style={{ flexDirection:'column', gap:14 }}>
                {[
                  { emoji:'📅', title:'Mais marcações', sub:'Mais clientes' },
                  { emoji:'📊', title:'Mais organização', sub:'Mais tempo para o que importa' },
                  { emoji:'❤️', title:'Mais fidelização', sub:'Clientes que voltam' },
                ].map(({ emoji, title, sub }) => (
                  <div key={title} style={{ display:'flex', alignItems:'center', gap:12 }}>
                    <div style={{ width:34, height:34, borderRadius:9, border:'1.5px solid rgba(254,233,109,0.2)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, fontSize:'1.1rem' }}>
                      {emoji}
                    </div>
                    <div>
                      <p style={{ fontSize:'0.83rem', fontWeight:700, color:'white', margin:0 }}>{title}</p>
                      <p style={{ fontSize:'0.72rem', color:'rgba(255,255,255,0.4)', margin:0 }}>{sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Benefits grid — mobile only (2×2) */}
              <div className="grid grid-cols-2 gap-3 lg:hidden">
                {[
                  { emoji:'📅', title:'Mais marcações', sub:'Mais clientes' },
                  { emoji:'📊', title:'Mais organização', sub:'Mais tempo para o que importa' },
                  { emoji:'❤️', title:'Mais fidelização', sub:'Clientes que voltam' },
                  { emoji:'🚀', title:'Resultados reais', sub:'Negócios em crescimento' },
                ].map(({ emoji, title, sub }) => (
                  <div key={title} style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:12, padding:'12px 10px', display:'flex', flexDirection:'column', alignItems:'center', textAlign:'center', gap:6 }}>
                    <div style={{ width:36, height:36, borderRadius:10, border:'1.5px solid rgba(254,233,109,0.25)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.2rem' }}>
                      {emoji}
                    </div>
                    <p style={{ fontSize:'0.78rem', fontWeight:700, color:'white', margin:0 }}>{title}</p>
                    <p style={{ fontSize:'0.65rem', color:'rgba(255,255,255,0.4)', margin:0, lineHeight:1.3 }}>{sub}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* ── RIGHT: Devices (desktop) ── */}
            <motion.div
              initial={{ opacity:0, scale:0.92 }} animate={{ opacity:1, scale:1 }}
              transition={{ duration:1, delay:0.25, ease:"easeOut" }}
              className="hidden lg:block"
              style={{ position:'relative', height:620 }}
            >
              <HeroDevices />

              {/* Social proof strip */}
              <motion.div
                initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
                transition={{ duration:0.6, delay:0.9 }}
                style={{ position:'absolute', bottom:-24, left:0, right:0, display:'flex', alignItems:'center', justifyContent:'space-between', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:14, padding:'12px 20px', backdropFilter:'blur(8px)' }}
              >
                {[
                  { value:'+100', label:'Barbearias' },
                  { value:'+50.000', label:'Marcações' },
                  { value:'4.9/5', label:'Satisfação' },
                ].map(({ value, label }, i) => (
                  <div key={i} style={{ display:'flex', flexDirection:'column', alignItems:'center' }}>
                    <p style={{ fontSize:'1.05rem', fontWeight:800, color:'#fee96d', margin:0, lineHeight:1 }}>{value}</p>
                    <p style={{ fontSize:'0.7rem', color:'rgba(255,255,255,0.4)', margin:'3px 0 0' }}>{label}</p>
                  </div>
                ))}
                <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                  <div style={{ display:'flex' }}>
                    {['#fee96d','#e0d060','#c8b950'].map((c,i) => (
                      <div key={i} style={{ width:26, height:26, borderRadius:'50%', background:c, border:'2px solid #111', marginLeft:i>0?-8:0, display:'flex', alignItems:'center', justifyContent:'center' }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2.2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                      </div>
                    ))}
                  </div>
                  <div>
                    <p style={{ fontSize:'0.75rem', fontWeight:700, color:'white', margin:0 }}>Negócios reais.</p>
                    <p style={{ fontSize:'0.68rem', color:'rgba(255,255,255,0.4)', margin:0 }}>Resultados reais.</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* ── MOBILE: Devices sobrepostos ── */}
            <motion.div
              initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }}
              transition={{ duration:0.8, delay:0.4, ease:"easeOut" }}
              className="block lg:hidden"
            >
              {/* Label above devices */}
              <div style={{ textAlign:'center', marginBottom:10 }}>
                <p style={{ fontFamily:"Georgia, 'Times New Roman', serif", fontSize:'0.95rem', color:'white', margin:0, lineHeight:1.4, fontStyle:'italic' }}>Duas apps. um só sistema.</p>
                <p style={{ fontSize:'0.65rem', color:'rgba(255,255,255,0.4)', margin:'5px 0 0', lineHeight:1.5 }}>Você gere. O seu cliente marca.</p>
              </div>

              {/* Device container */}
              <div style={{ position:'relative', height:300, width:'100%' }}>

              {/* Glow */}
              <div style={{ position:'absolute', top:'40%', left:'38%', transform:'translate(-50%,-50%)', width:280, height:280, borderRadius:'50%', background:'radial-gradient(circle, rgba(254,233,109,0.09) 0%, transparent 70%)', pointerEvents:'none', zIndex:0 }} />

              {/* Laptop — direita, atrás */}
              <div style={{
                position:'absolute', right:0, bottom:8,
                width:'74%', zIndex:1,
                borderRadius:'8px 8px 0 0',
                border:'1.5px solid rgba(255,255,255,0.08)',
                background:'#0b0b0f',
                boxShadow:'0 20px 60px rgba(0,0,0,0.85), 0 0 30px rgba(254,233,109,0.04)',
                overflow:'hidden',
              }}>
                <video src="/laptop-demo.mp4" autoPlay loop muted playsInline style={{ width:'100%', display:'block' }} />
              </div>
              {/* Laptop base */}
              <div style={{ position:'absolute', right:-4, bottom:0, width:'calc(74% + 8px)', height:8, background:'linear-gradient(180deg, #1a1a1f 0%, #0e0e12 100%)', borderRadius:'0 0 6px 6px', zIndex:1 }}>
                <div style={{ width:28, height:3, background:'rgba(255,255,255,0.06)', borderRadius:2, margin:'2px auto 0' }} />
              </div>

              {/* Telemóvel — esquerda, à frente */}
              <div style={{
                position:'absolute', left:0, top:16,
                width:'36%',
                aspectRatio:'384/848',
                borderRadius:26,
                border:'2px solid rgba(255,255,255,0.12)',
                background:'#0c0c10',
                boxShadow:'0 30px 70px rgba(0,0,0,0.9), 0 0 40px rgba(254,233,109,0.1)',
                overflow:'hidden', zIndex:2,
              }}>
                <div style={{ position:'absolute', top:7, left:'50%', transform:'translateX(-50%)', width:38, height:10, background:'#000', borderRadius:5, zIndex:10 }} />
                <video src="/phone-demo.mp4" autoPlay loop muted playsInline style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }} />
              </div>

              {/* Em sincronia badge */}
              <motion.div
                animate={{ opacity:[0.5,1,0.5] }}
                transition={{ duration:2.8, repeat:Infinity, ease:'easeInOut' }}
                style={{ position:'absolute', left:'30%', bottom:44, zIndex:4 }}
              >
                <div style={{ display:'flex', alignItems:'center', gap:5, background:'rgba(7,7,10,0.95)', border:'1px solid rgba(254,233,109,0.18)', borderRadius:7, padding:'4px 8px', backdropFilter:'blur(8px)' }}>
                  <div style={{ width:5, height:5, borderRadius:'50%', background:'#34d399', boxShadow:'0 0 6px #34d399' }} />
                  <span style={{ fontSize:7, color:'rgba(255,255,255,0.55)', fontWeight:600 }}>Em sincronia</span>
                </div>
              </motion.div>

              </div>{/* /device container */}
            </motion.div>

          </div>
        </div>
      </section>

            {/* Duas apps. Um só sistema. — Video Section */}
      <section style={{ backgroundColor:"#111111" }} className="pb-14 lg:pb-20">
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <ScrollReveal>
            <div className="text-center mb-8 lg:mb-12">
              <p style={{ fontFamily:"Georgia, 'Times New Roman', serif", fontStyle:'italic', fontSize:'clamp(1.3rem, 3.5vw, 2.4rem)', color:'white', lineHeight:1.2, margin:'0 0 10px', opacity:0.92 }}>
                Duas apps. Um só sistema.
              </p>
              <p style={{ fontSize:'clamp(0.78rem, 2vw, 0.95rem)', color:'rgba(255,255,255,0.38)', margin:0 }}>
                Tu geres. O teu cliente marca.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <div style={{
              borderRadius: 20,
              overflow: 'hidden',
              border: '1.5px solid rgba(255,255,255,0.08)',
              boxShadow: '0 40px 100px rgba(0,0,0,0.8), 0 0 60px rgba(254,233,109,0.04)',
              background: '#0b0b0f',
              aspectRatio: '16/9',
            }}>
              <video
                src="/duas-apps-video.mp4"
                autoPlay
                loop
                muted
                playsInline
                style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }}
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      <GradientTransition from="#111111" to="#ffffff" />

      {/* Why Convecta */}
      <section style={{ backgroundColor:"#f5f5f5" }} className="py-14 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center mb-10 lg:mb-14">
              <h2 className="font-heading text-2xl lg:text-4xl text-dark mb-4">
                O que é a <Keyword>Convecta</Keyword>
              </h2>
              <p className="text-sm lg:text-lg text-dark/60 leading-relaxed">
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
                    <span style={{ fontSize:'1.4rem', lineHeight:1 }}>{pillar.emoji}</span>
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
              <h2 className="font-heading text-2xl lg:text-5xl text-dark leading-tight">Do primeiro contacto ao crescimento.</h2>
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

      {/* Instagram CTA */}
      <section style={{ backgroundColor: "#0d0d0d" }} className="py-14 sm:py-20 lg:py-28 relative overflow-hidden border-t border-white/5">
        {/* Instagram color atmosphere */}
        <div style={{ position:'absolute', top:-100, right:-100, width:500, height:500, borderRadius:'50%', background:'radial-gradient(circle, rgba(188,24,136,0.08) 0%, transparent 65%)', pointerEvents:'none' }} />
        <div style={{ position:'absolute', bottom:-80, left:-80, width:400, height:400, borderRadius:'50%', background:'radial-gradient(circle, rgba(240,148,51,0.07) 0%, transparent 65%)', pointerEvents:'none' }} />
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">

            {/* LEFT: Copy */}
            <ScrollReveal>
              <div>
                {/* Eyebrow */}
                <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:28 }}>
                  <div style={{ width:28, height:1.5, background:'#fee96d', flexShrink:0 }} />
                  <p style={{ fontSize:10, fontWeight:700, letterSpacing:'0.22em', color:'rgba(255,255,255,0.38)', textTransform:'uppercase', margin:0 }}>
                    Redes Sociais
                  </p>
                </div>

                {/* Heading */}
                <h2 className="font-heading" style={{ fontSize:'clamp(2rem, 5.5vw, 4.8rem)', color:'white', lineHeight:1.0, margin:'0 0 18px', letterSpacing:'-0.02em' }}>
                  Segue-nos<br/>
                  no <span style={{ color:'#fee96d' }}>Instagram.</span>
                </h2>

                {/* Subtitle */}
                <p style={{ fontSize:'clamp(0.85rem, 2.5vw, 1.05rem)', color:'rgba(255,255,255,0.48)', lineHeight:1.75, margin:'0 0 28px', maxWidth:420 }}>
                  Dicas, novidades e exemplos reais para digitalizar o teu negócio.
                </p>

                {/* CTA */}
                <a
                  href="https://www.instagram.com/convectabooking"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-glow"
                  style={{
                    display:'inline-flex', alignItems:'center', gap:10,
                    padding:'12px 24px', borderRadius:8,
                    background:'#fee96d', color:'#111',
                    fontWeight:700, fontSize:'0.88rem',
                    textDecoration:'none', marginBottom:36,
                    transition:'transform 0.2s, box-shadow 0.2s',
                    boxShadow:'0 4px 24px rgba(254,233,109,0.3)',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform='scale(1.03)'; e.currentTarget.style.boxShadow='0 8px 32px rgba(254,233,109,0.45)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform='scale(1)'; e.currentTarget.style.boxShadow='0 4px 24px rgba(254,233,109,0.3)'; }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <circle cx="12" cy="12" r="4"/>
                    <circle cx="17.5" cy="6.5" r="0.5" fill="#111" stroke="none"/>
                  </svg>
                  Seguir no Instagram →
                </a>

                {/* Feature pills */}
                <div style={{ display:'flex', gap:20, flexWrap:'wrap' }}>
                  {[
                    { emoji:'🔔', label:'Novidades', sub:'Novas funcionalidades' },
                    { emoji:'💡', label:'Dicas', sub:'Para o teu negócio' },
                    { emoji:'👥', label:'Casos reais', sub:'Resultados de clientes' },
                  ].map(({ emoji, label, sub }) => (
                    <div key={label} style={{ display:'flex', alignItems:'flex-start', gap:10 }}>
                      <div style={{ width:32, height:32, borderRadius:8, border:'1.5px solid rgba(254,233,109,0.22)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:1, fontSize:'1rem' }}>
                        {emoji}
                      </div>
                      <div>
                        <p style={{ fontWeight:700, color:'white', margin:0, fontSize:'0.85rem' }}>{label}</p>
                        <p style={{ color:'rgba(255,255,255,0.38)', margin:0, fontSize:'0.72rem' }}>{sub}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* RIGHT: Instagram profile card */}
            <ScrollReveal delay={0.2}>
              <div style={{ position:'relative' }}>

                {/* Handwritten annotation — desktop only */}
                <div className="hidden lg:block" style={{ position:'absolute', right:-10, top:-40, zIndex:5, maxWidth:160 }}>
                  <p style={{ fontFamily:"Georgia, 'Times New Roman', serif", fontStyle:'italic', fontSize:'1rem', color:'white', lineHeight:1.45, margin:0, opacity:0.9 }}>
                    Conteúdo<br/>que faz sentido<br/>para o teu negócio.
                  </p>
                  <svg style={{ marginTop:8, display:'block' }} width="48" height="44" viewBox="0 0 48 44">
                    <path d="M38 4 Q22 18 12 38" stroke="#fee96d" strokeWidth="1.6" fill="none" strokeLinecap="round"/>
                    <path d="M8 34 L13 40 L18 33" stroke="#fee96d" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>

                {/* Card with Instagram gradient border — natural image proportions */}
                <div style={{
                  borderRadius:20,
                  background:'linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)',
                  padding:3,
                  boxShadow:'0 24px 70px rgba(0,0,0,0.6)',
                }}>
                  <div style={{ borderRadius:17, overflow:'hidden', background:'#fff' }}>
                    <img
                      src="/instagram-profile.jpg"
                      alt="Perfil Instagram Convecta"
                      style={{ width:'100%', height:'auto', display:'block' }}
                    />
                  </div>
                </div>

              </div>
            </ScrollReveal>

          </div>
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
              <h2 style={{ fontWeight:800, fontSize:"clamp(1.35rem,3.5vw,2.5rem)", color:"#111", lineHeight:1.1, letterSpacing:"-0.02em", marginBottom:8 }}>
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
                Ver todas as perguntas frequentes sobre o Convecta Booking <ArrowRight size={12} />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <CtaSection title="Pronto para modernizar a tua barbearia?" buttonText="Pedir Demonstração Gratuita" />
    </main>
  );
}
