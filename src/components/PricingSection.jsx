import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Check, Shield, Zap, CalendarDays, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const bookingFeatures = [
  "Sistema de marcações online",
  "Agenda por profissional",
  "Gestão de clientes e histórico",
  "Fidelização de clientes",
  "Caixa e relatórios",
  "Suporte e acompanhamento",
];

const bottomFeatures = [
  { icon: Shield, title: "Sem fidelização", desc: "Cancela quando quiser." },
  { icon: Zap, title: "Suporte rápido", desc: "Resposta em 24h úteis." },
  { icon: CalendarDays, title: "Pronto em 24h", desc: "Conta ativa no próprio dia." },
];

function TiltCard({ children, style, className }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 150, damping: 20 });
  const sy = useSpring(y, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(sy, [-0.5, 0.5], [3, -3]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-3, 3]);
  return (
    <motion.div
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - r.left) / r.width - 0.5);
        y.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", ...style }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className={className}
    >
      {children}
    </motion.div>
  );
}


export default function PricingSection() {
  return (
    <section id="precos" style={{ backgroundColor:"#F5F5F5" }} className="relative section-mobile-compact py-24 lg:py-32 overflow-hidden">
      {/* Decorative blobs — hidden on mobile via media query below */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden hidden md:block">
        <div style={{ position:"absolute", left:"-6%", top:"15%", width:320, height:320, borderRadius:"50%", background:"radial-gradient(circle at 38% 32%,#ffffff 0%,#d8d8d8 100%)", boxShadow:"inset -20px -24px 60px rgba(0,0,0,0.1)", opacity:0.7 }} />
        <div style={{ position:"absolute", right:"-4%", bottom:"10%", width:200, height:200, borderRadius:"50%", border:"24px solid rgba(210,210,210,0.6)", filter:"blur(0.5px)" }} />
        <div style={{ position:"absolute", right:"5%", top:"-5%", width:100, height:220, borderRadius:80, background:"linear-gradient(155deg,#f0f0f0 0%,#c8c8c8 100%)", boxShadow:"inset -8px -12px 32px rgba(0,0,0,0.1)", transform:"rotate(-15deg)", opacity:0.6 }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div initial={{ opacity:0, y:28 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.6 }} className="text-center mb-10 lg:mb-14">
          <span style={{ display:"inline-block", backgroundColor:"#FEE96D", color:"#111111", fontSize:11, fontWeight:800, letterSpacing:"0.2em", padding:"6px 18px", borderRadius:100, marginBottom:18, textTransform:"uppercase" }}>Planos</span>
          <h2 style={{ fontWeight:800, fontSize:"clamp(2rem,5vw,3.4rem)", color:"#111111", lineHeight:1.05, marginBottom:14, letterSpacing:"-0.02em" }}>Tabela de Preços</h2>
          <p style={{ color:"#6B7280", fontSize:"1rem", maxWidth:560, margin:"0 auto", lineHeight:1.75 }}>
            Sem comissões por marcação. Sem fidelização obrigatória. Começa quando quiseres.
          </p>
        </motion.div>

        {/* Main grid — Booking only */}
        <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.45 }} className="pricing-booking-grid" style={{ display:"grid", gridTemplateColumns:"0.9fr 1.1fr", gap:24, alignItems:"stretch" }}>
            <div className="pricing-booking-card-left" style={{ background:"#111", borderRadius:24, padding:"34px 30px", color:"#fff", minHeight:360, display:"flex", flexDirection:"column", justifyContent:"space-between" }}>
              <div>
                <div style={{ width:48, height:48, borderRadius:13, background:"rgba(254,233,109,0.16)", color:"#FEE96D", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:22 }}>
                  <CalendarDays size={24} strokeWidth={1.5} />
                </div>
                <p style={{ color:"rgba(255,255,255,0.45)", fontSize:11, fontWeight:800, letterSpacing:"0.2em", textTransform:"uppercase", marginBottom:12 }}>Para negócios de marcações</p>
                <h3 style={{ fontSize:"clamp(1.8rem,3vw,2.6rem)", lineHeight:1.08, fontWeight:800, margin:0 }}>Convecta Booking</h3>
                <p style={{ color:"rgba(255,255,255,0.62)", fontSize:"0.9rem", lineHeight:1.7, marginTop:16, maxWidth:390 }}>O sistema de marcações e agendamentos para gerir clientes, equipa e operação num só lugar.</p>
              </div>
              <p style={{ color:"#FEE96D", fontSize:"0.78rem", fontWeight:700, margin:0, marginTop:16 }}>Agenda. Fidelização. Caixa. Relatórios.</p>
            </div>
            <div className="pricing-booking-card-right" style={{ background:"#fff", borderRadius:24, padding:"32px 28px", border:"2px solid #FEE96D", boxShadow:"0 0 0 4px rgba(254,233,109,0.12)", display:"flex", flexDirection:"column" }}>
              <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:18 }}>
                <div style={{ width:42, height:42, borderRadius:11, backgroundColor:"rgba(254,233,109,0.25)", display:"flex", alignItems:"center", justifyContent:"center" }}><CalendarDays size={20} color="#b89e00" strokeWidth={1.5} /></div>
                <div><h3 style={{ fontSize:"1rem", fontWeight:700, color:"#111", margin:0 }}>Convecta Booking</h3><p style={{ fontSize:"0.75rem", color:"#6B7280", margin:0, marginTop:2 }}>Plano para o teu negócio.</p></div>
              </div>
              <div style={{ paddingBottom:18, marginBottom:18, borderBottom:"1px solid rgba(17,17,17,0.07)" }}>
                <span style={{ fontSize:"2.1rem", fontWeight:800, color:"#111", letterSpacing:"-0.03em", lineHeight:1 }}>Plano personalizado</span>
                <p style={{ color:"#6B7280", fontSize:"0.8rem", marginTop:5 }}>Fala connosco para conhecer a solução</p>
              </div>
              <ul style={{ listStyle:"none", padding:0, margin:"0 0 24px", display:"flex", flexDirection:"column", gap:10, flex:1 }}>
                {bookingFeatures.map((feature) => <li key={feature} style={{ display:"flex", alignItems:"center", gap:9 }}><span style={{ width:18, height:18, borderRadius:"50%", backgroundColor:"rgba(254,233,109,0.25)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}><Check size={10} strokeWidth={3} color="#b89e00" /></span><span style={{ color:"#374151", fontSize:"0.84rem" }}>{feature}</span></li>)}
              </ul>
              <Link to="/contacto" style={{ textDecoration:"none" }}><motion.button whileHover={{ scale:1.02, boxShadow:"0 8px 28px rgba(254,233,109,0.55)" }} whileTap={{ scale:0.98 }} style={{ width:"100%", padding:"12px 16px", borderRadius:12, border:"none", background:"#FEE96D", color:"#111", fontSize:"0.85rem", fontWeight:700, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:7, boxShadow:"0 4px 18px rgba(254,233,109,0.4)" }}>Pedir demonstração <ArrowRight size={13} /></motion.button></Link>
            </div>
          </motion.div>

        {/* Trust strip — single col on mobile via CSS class */}
        <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.55, delay:0.3 }}
          className="trust-strip"
          style={{ background:"#fff", borderRadius:18, border:"1px solid rgba(17,17,17,0.07)", boxShadow:"0 4px 20px rgba(0,0,0,0.05)", display:"grid", gridTemplateColumns:"repeat(3,1fr)", marginTop:20 }}>
          {bottomFeatures.map((item,i) => (
            <div key={i} style={{ padding:"20px 22px", display:"flex", alignItems:"center", gap:14, borderRight:i<2?"1px solid rgba(17,17,17,0.07)":"none" }}>
              <div style={{ width:36, height:36, borderRadius:9, border:"1.5px solid rgba(17,17,17,0.1)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                <item.icon size={16} color="#111" strokeWidth={1.5} />
              </div>
              <div>
                <p style={{ fontWeight:700, color:"#111", fontSize:"0.85rem", margin:0, marginBottom:2 }}>{item.title}</p>
                <p style={{ color:"#6B7280", fontSize:"0.75rem", margin:0 }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
