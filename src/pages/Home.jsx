import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Seo from "@/components/Seo";
import ScrollReveal from "@/components/ScrollReveal";
import CtaSection from "@/components/CtaSection";
import PricingSection from "@/components/PricingSection";
import MarqueeStrip from "@/components/MarqueeStrip";
import HeroCanvas from "@/components/HeroCanvas";
import GradientTransition from "@/components/GradientTransition";
import DemoSection from "@/components/DemoSection";
import { SITE, PRECO_MENSAL_TEXTO, organizacaoLd, websiteLd, softwareLd } from "@/lib/seo";
import { DEMO_CLIENTE_URL } from "@/lib/demo";

const processSteps = [
  { number: "01", title: "Experimentas", desc: "Entras na barbearia de demonstração: marcas como cliente, vês chegar como barbeiro. Cinco minutos, sem registo." },
  { number: "02", title: "Falamos", desc: "Quinze minutos ao telefone ou no WhatsApp: barbeiros, serviços, horários, prazo de cancelamento, carimbos. Sem orçamento — o preço é um só." },
  { number: "03", title: "Lançamos", desc: "Criamos a tua barbearia, o teu endereço em marcacoes.app, o painel e as cores. Em regra, fica a funcionar no próprio dia." },
  { number: "04", title: "Acompanhamos", desc: "Suporte por telefone e WhatsApp, por quem fez a app. Atualizações incluídas na mensalidade, sem custos escondidos." },
];

const pillars = [
  { emoji: "💸", title: "Sem comissões", desc: `Mensalidade fixa de ${PRECO_MENSAL_TEXTO}. Cada corte marcado é 100 % teu.` },
  { emoji: "🔓", title: "Sem fidelização", desc: "Sem período mínimo de permanência. Cancelas quando quiseres." },
  { emoji: "⚡", title: "A funcionar no próprio dia", desc: "Criamos a tua barbearia, o endereço e a conta. Em regra, no mesmo dia." },
  { emoji: "🎧", title: "Suporte por quem fez a app", desc: "Telefone ou WhatsApp, em dias úteis. Uma equipa pequena, do Porto." },
];

const faqItems = [
  {
    q: "A Convecta é uma app de marcações online para barbearias?",
    a: "Sim. A Convecta Booking é um software de marcações online e de gestão criado para barbearias em Portugal: os clientes marcam pelo site da barbearia e o barbeiro gere agenda, clientes, caixa, comissões, stock, cartão de fidelidade e relatórios num painel só. Sem comissões por marcação."
  },
  {
    q: "Como funciona o agendamento online numa barbearia?",
    a: "O cliente abre o site da tua barbearia no telemóvel, escolhe o serviço, o barbeiro e uma hora livre. A marcação entra na tua agenda nesse segundo e o teu telemóvel recebe uma notificação. Confirmas com dois toques — ou ligas a confirmação automática — e o cliente é avisado no telemóvel dele."
  },
  { q: "Quanto custa?", a: `${PRECO_MENSAL_TEXTO} por mês, por barbearia, tudo incluído: site de marcações com endereço próprio, painel de gestão, notificações, cartão de fidelidade, caixa, relatórios, Excel para o contabilista e suporte. Sem taxa de adesão, sem comissões por marcação, sem fidelização.` },
  { q: "Em quanto tempo a minha barbearia fica a funcionar?", a: "Em regra, no próprio dia. Criamos a tua barbearia, o endereço e a conta de acesso; os serviços, preços e equipa carregas tu — ou carregamos contigo ao telefone, em vinte minutos." },
  { q: "Os meus clientes precisam de instalar uma app?", a: "Não. O site de marcações abre no browser de qualquer telemóvel e pode ser guardado no ecrã principal, onde fica como uma app com o nome e o logótipo da tua barbearia. A Convecta não aparece." },
  { q: "Posso experimentar antes de decidir?", a: "Sim, agora mesmo e sem falar com ninguém. Temos uma barbearia de demonstração aberta a toda a gente: marcas como cliente e vês a marcação chegar ao painel do barbeiro. Os dados voltam ao início de hora a hora." },
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



export default function Home() {
  return (
    <main id="main-content">
      <Seo
        titulo="Convecta — Marcações online e gestão para barbearias"
        descricao={SITE.descricao}
        caminho="/"
        ld={[organizacaoLd(), websiteLd(), softwareLd()]}
      />

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
                    Marcações online e gestão para barbearias
                  </p>
                </div>
                {/* H1 */}
                <h1 className="font-heading text-[1.85rem] md:text-4xl lg:text-[4.1rem] text-white leading-[0.97] mb-4 max-w-xl">
                  {/* Cada palavra anima por si; o espaço entre elas é um espaço a
                      sério, para o Google ler "Os teus clientes" e não "Osteusclientes". */}
                  {"Os teus clientes marcam sozinhos. Tu só cortas.".split(" ").map((word, i) => (
                    <React.Fragment key={i}>
                      <motion.span initial={{ opacity:0, y:28 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5, delay:0.3+i*0.05, ease:"easeOut" }} className="inline-block">
                        {i >= 4 ? <span style={{ color:"#fee96d" }}>{word}</span> : word}
                      </motion.span>
                      {" "}
                    </React.Fragment>
                  ))}
                </h1>
                {/* Subtitle */}
                <p className="text-sm lg:text-[1.05rem] text-white/55 leading-relaxed mb-7 max-w-md">
                  A Convecta é a app de marcações online e o software de gestão para barbearias em Portugal. Os clientes marcam pelo site da tua barbearia, o telemóvel toca, e a agenda, a caixa, as comissões e o cartão de fidelidade ficam tratados no mesmo sítio. {PRECO_MENSAL_TEXTO}/mês, sem comissões por marcação.
                </p>
                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-3 mb-8 lg:mb-12">
                  {/* "Pedir demonstracao" levava ao formulario de contacto: pedia-se e
                      esperava-se. Agora a demonstracao abre-se sozinha, e o botao
                      diz isso. Quem preferir falar primeiro tem o segundo botao. */}
                  <a href={DEMO_CLIENTE_URL} target="_blank" rel="noopener" className="btn-glow inline-flex items-center justify-center px-5 py-3 lg:px-8 lg:py-4 text-xs lg:text-sm font-bold uppercase tracking-wide rounded-sm" style={{ backgroundColor:"#fee96d", color:"#1a1a1a" }}>
                    Experimentar a demonstração <ArrowRight size={14} className="ml-2" />
                  </a>
                  <Link to="/contacto" className="inline-flex items-center justify-center gap-2 px-5 py-3 lg:px-8 lg:py-4 text-xs lg:text-sm font-medium text-white/65 hover:text-white transition-colors">
                    Falar connosco →
                  </Link>
                </div>
              </div>
              {/* Benefits strip — desktop only */}
              <div className="hidden lg:flex" style={{ flexDirection:'column', gap:14 }}>
                {[
                  { emoji:'📅', title:'Marcações 24 horas por dia', sub:'O cliente marca sozinho, só vê horas livres' },
                  { emoji:'🔔', title:'O telemóvel toca a cada marcação', sub:'Confirmas em dois toques — ou automaticamente' },
                  { emoji:'🎟️', title:'Cartão de fidelidade digital', sub:'Carimbos e corte grátis, sem papel' },
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
                  { emoji:'📅', title:'Marcações 24h', sub:'O cliente marca sozinho' },
                  { emoji:'🔔', title:'O telemóvel toca', sub:'A cada marcação nova' },
                  { emoji:'🎟️', title:'Fidelidade digital', sub:'Carimbos e corte grátis' },
                  { emoji:'💸', title:'0 % comissões', sub:`${PRECO_MENSAL_TEXTO}/mês, fixo` },
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
                  { value:PRECO_MENSAL_TEXTO, label:'por mês, tudo incluído' },
                  { value:'0 %', label:'comissões por marcação' },
                  { value:'3 toques', label:'para o cliente marcar' },
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
                    <p style={{ fontSize:'0.75rem', fontWeight:700, color:'white', margin:0 }}>Feito no Porto.</p>
                    <p style={{ fontSize:'0.68rem', color:'rgba(255,255,255,0.4)', margin:0 }}>Suporte por quem fez a app.</p>
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
                <p style={{ fontFamily:"Georgia, 'Times New Roman', serif", fontSize:'0.95rem', color:'white', margin:0, lineHeight:1.4, fontStyle:'italic' }}>Duas apps, um só sistema.</p>
                <p style={{ fontSize:'0.65rem', color:'rgba(255,255,255,0.4)', margin:'5px 0 0', lineHeight:1.5 }}>Tu geres. O teu cliente marca.</p>
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

      {/* A demonstracao: logo a seguir ao hero, antes de explicar o que e a
          Convecta. Quem chega ao site quer ver, nao ler. */}
      <DemoSection />

            <GradientTransition from="#0d0d0d" to="#ffffff" />

      {/* Why Convecta */}
      <section style={{ backgroundColor:"#f5f5f5" }} className="py-14 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center mb-10 lg:mb-14">
              <h2 className="font-heading text-2xl lg:text-4xl text-dark mb-4">
                O que é a <Keyword>Convecta</Keyword>
              </h2>
              <p className="text-sm lg:text-lg text-dark/60 leading-relaxed">
                Um software de gestão para barbearias feito em Portugal: agendamento online para os teus clientes e um painel para ti — agenda, caixa, comissões, stock, cartão de fidelidade e relatórios. Uma mensalidade fixa, sem comissões por marcação.
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
              <h2 className="font-heading text-2xl lg:text-5xl text-dark leading-tight">Da demonstração à primeira marcação online.</h2>
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
                  Bastidores, novidades da app e as barbearias que já marcam com a Convecta.
                </p>

                {/* CTA */}
                <a
                  href={SITE.instagram}
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
                    { emoji:'🔔', label:'Novidades', sub:'Cada funcionalidade nova' },
                    { emoji:'💡', label:'Dicas', sub:'Para encher a agenda' },
                    { emoji:'✂️', label:'Barbearias', sub:'Quem já usa a Convecta' },
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
                      alt="Perfil de Instagram da Convecta (@convecta.pt)"
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
                O que os donos de barbearia nos perguntam antes de experimentar.
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
                Ver todas as perguntas frequentes sobre marcações online <ArrowRight size={12} />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <CtaSection title="Pronto para ter marcações online na tua barbearia?" buttonText="Experimentar a demonstração" href={DEMO_CLIENTE_URL} secondaryText="ou fala connosco" />
    </main>
  );
}
