import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Check, Shield, Zap, Lock, Globe, CalendarDays, ArrowRight, TrendingUp, Users, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const features1 = [
  "Website profissional",
  "Design moderno",
  "Responsivo (mobile-first)",
  "Formulário de contacto",
  "SEO básico",
  "Entrega rápida",
];

const features2 = [
  "Tudo do plano Website",
  "Alterações ilimitadas de conteúdo",
  "Suporte prioritário",
  "Relatórios mensais",
  "Acompanhamento contínuo",
  "Segurança e backups",
];

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
  { icon: Lock, title: "100% Seguro", desc: "Os teus dados protegidos." },
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

function PhoneMockup() {
  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <motion.div animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        style={{ position:"absolute", left:-80, top:80, zIndex:10, background:"#fff", borderRadius:14, padding:"10px 14px", boxShadow:"0 8px 28px rgba(0,0,0,0.12)", minWidth:130 }}>
        <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4 }}>
          <div style={{ width:28, height:28, borderRadius:8, backgroundColor:"#FEE96D", display:"flex", alignItems:"center", justifyContent:"center" }}><TrendingUp size={14} color="#111" /></div>
          <span style={{ fontSize:"0.7rem", color:"#6B7280", fontWeight:600 }}>Mais Visibilidade</span>
        </div>
        <p style={{ fontSize:"1.3rem", fontWeight:800, color:"#111", margin:0 }}>+120%</p>
      </motion.div>

      <motion.div animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 0.5 }}
        style={{ position:"absolute", right:-75, top:160, zIndex:10, background:"#fff", borderRadius:14, padding:"10px 14px", boxShadow:"0 8px 28px rgba(0,0,0,0.12)", minWidth:120 }}>
        <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4 }}>
          <div style={{ width:28, height:28, borderRadius:8, backgroundColor:"#FEE96D", display:"flex", alignItems:"center", justifyContent:"center" }}><Users size={14} color="#111" /></div>
          <span style={{ fontSize:"0.7rem", color:"#6B7280", fontWeight:600 }}>Mais Clientes</span>
        </div>
        <p style={{ fontSize:"1.3rem", fontWeight:800, color:"#111", margin:0 }}>+64%</p>
      </motion.div>

      <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
        style={{ position:"absolute", left:-70, bottom:100, zIndex:10, background:"#fff", borderRadius:14, padding:"10px 14px", boxShadow:"0 8px 28px rgba(0,0,0,0.12)", minWidth:130 }}>
        <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4 }}>
          <div style={{ width:28, height:28, borderRadius:8, backgroundColor:"#FEE96D", display:"flex", alignItems:"center", justifyContent:"center" }}><Phone size={14} color="#111" /></div>
          <span style={{ fontSize:"0.7rem", color:"#6B7280", fontWeight:600 }}>Mais Contactos</span>
        </div>
        <p style={{ fontSize:"1.3rem", fontWeight:800, color:"#111", margin:0 }}>+87%</p>
      </motion.div>

      <div style={{ width:200, height:400, borderRadius:32, background:"#1a1a1a", padding:6, boxShadow:"0 30px 80px rgba(0,0,0,0.25)", position:"relative" }}>
        <div style={{ position:"absolute", top:10, left:"50%", transform:"translateX(-50%)", width:60, height:6, borderRadius:4, background:"#333", zIndex:2 }} />
        <div style={{ width:"100%", height:"100%", borderRadius:26, background:"#f8f8f8", overflow:"hidden", padding:"20px 12px 12px" }}>
          <div style={{ marginBottom:10 }}>
            <p style={{ fontSize:"0.6rem", fontWeight:800, color:"#111", margin:0 }}>Convecta</p>
            <p style={{ fontSize:"0.5rem", color:"#6B7280", margin:0 }}>Gestão · Hoje</p>
          </div>
          <div style={{ background:"#fff", borderRadius:10, padding:"8px", marginBottom:8, boxShadow:"0 2px 8px rgba(0,0,0,0.06)" }}>
            <p style={{ fontSize:"0.45rem", color:"#6B7280", margin:"0 0 6px" }}>Marcações</p>
            <svg width="100%" height="40" viewBox="0 0 160 40">
              <polyline points="0,35 25,28 50,20 75,25 100,10 130,15 160,5" fill="none" stroke="#FEE96D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <polyline points="0,35 25,28 50,20 75,25 100,10 130,15 160,5 160,40 0,40" fill="rgba(254,233,109,0.15)" stroke="none"/>
            </svg>
            <div style={{ display:"flex", gap:8, marginTop:4 }}>
              {[["€320+","Revenue"],["156k","Clicks"],["500+","Users"]].map(([v,l])=>(
                <div key={l}><p style={{ fontSize:"0.55rem", fontWeight:700, color:"#111", margin:0 }}>{v}</p><p style={{ fontSize:"0.4rem", color:"#6B7280", margin:0 }}>{l}</p></div>
              ))}
            </div>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:6 }}>
            <div style={{ background:"#fff", borderRadius:8, padding:"7px 8px", boxShadow:"0 2px 8px rgba(0,0,0,0.06)" }}>
              <p style={{ fontSize:"0.45rem", color:"#6B7280", margin:"0 0 3px" }}>Top Metric</p>
              <p style={{ fontSize:"0.75rem", fontWeight:800, color:"#111", margin:0 }}>+18.5%</p>
              <p style={{ fontSize:"0.38rem", color:"#16A34A", margin:0 }}>vs Last Week</p>
            </div>
            <div style={{ background:"#fff", borderRadius:8, padding:"7px 8px", boxShadow:"0 2px 8px rgba(0,0,0,0.06)" }}>
              <p style={{ fontSize:"0.45rem", color:"#6B7280", margin:"0 0 3px" }}>Conversão</p>
              <p style={{ fontSize:"0.75rem", fontWeight:800, color:"#111", margin:0 }}>4.2%</p>
              <svg width="100%" height="20" viewBox="0 0 50 20"><circle cx="25" cy="10" r="9" fill="none" stroke="#eee" strokeWidth="3"/><circle cx="25" cy="10" r="9" fill="none" stroke="#FEE96D" strokeWidth="3" strokeDasharray="23 57" strokeDashoffset="14" strokeLinecap="round"/></svg>
            </div>
          </div>
          <div style={{ background:"#fff", borderRadius:8, padding:"7px 8px", marginTop:6, boxShadow:"0 2px 8px rgba(0,0,0,0.06)" }}>
            <p style={{ fontSize:"0.45rem", color:"#6B7280", margin:"0 0 4px" }}>Novos Utilizadores</p>
            <p style={{ fontSize:"0.55rem", fontWeight:700, color:"#111", margin:"0 0 3px" }}>+50</p>
            <svg width="100%" height="18" viewBox="0 0 160 18"><polyline points="0,15 20,10 40,12 60,5 80,8 100,3 120,6 140,2 160,1" fill="none" stroke="#FEE96D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
        </div>
      </div>
      <div style={{ position:"absolute", bottom:-30, left:-20, zIndex:-1, width:80, height:160, borderRadius:50, background:"linear-gradient(155deg,#FEE96D 0%,#e8c800 100%)", boxShadow:"inset -6px -10px 24px rgba(0,0,0,0.15),6px 10px 30px rgba(254,233,109,0.4)", transform:"rotate(12deg)" }} />
    </div>
  );
}

export default function PricingSection() {
  const [activeSolution, setActiveSolution] = useState("websites");

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
            Escolhe a solução certa para o teu negócio. Websites e gestão de barbearias têm necessidades diferentes.
          </p>
        </motion.div>

        <div role="tablist" aria-label="Escolher solução" style={{ display:"flex", justifyContent:"center", marginBottom:24 }}>
          <div style={{ display:"inline-flex", padding:5, gap:4, borderRadius:14, background:"#e7e7e7", border:"1px solid rgba(17,17,17,0.08)", maxWidth:"100%" }}>
            {[{ id:"websites", label:"Convecta Websites", icon:Globe }, { id:"booking", label:"Convecta Booking", icon:CalendarDays }].map(({ id, label, icon: Icon }) => (
              <button key={id} role="tab" aria-selected={activeSolution === id} onClick={() => setActiveSolution(id)}
                style={{ display:"inline-flex", alignItems:"center", justifyContent:"center", gap:6, border:0, borderRadius:10, padding:"12px 14px", background:activeSolution === id ? "#111" : "transparent", color:activeSolution === id ? "#FEE96D" : "#555", fontSize:"0.78rem", fontWeight:800, cursor:"pointer", transition:"all 0.2s ease", whiteSpace:"nowrap" }}>
                <Icon size={14} className="shrink-0" /> {label}
              </button>
            ))}
          </div>
        </div>

        {/* Website pricing remains the original commercial offer. Booking has its own offer below. */}
        {activeSolution === "websites" && <motion.div initial={{ opacity:0, y:-10 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.5 }} style={{ display:"flex", justifyContent:"center", marginBottom:24 }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, backgroundColor:"#FEF2F2", border:"1.5px solid #FECACA", borderRadius:100, padding:"8px 16px", textAlign:"center", maxWidth:"100%" }}>
            <span style={{ fontSize:14, flexShrink:0 }}>🔥</span>
            <span style={{ color:"#DC2626", fontSize:"0.78rem", fontWeight:700, leadingHeight:1.3 }}>Poupa <strong>171€</strong> no pagamento inicial ao escolher Website + Care</span>
          </div>
        </motion.div>}

        {/* Main grid */}
        {activeSolution === "websites" ? <div className="pricing-main-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:24, alignItems:"start" }}>

          {/* Phone column — hidden on mobile via CSS */}
          <motion.div className="pricing-phone-col" initial={{ opacity:0, x:-30 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:0.6 }} style={{ paddingTop:8 }}>
            <h3 style={{ fontSize:"1.5rem", fontWeight:800, color:"#111", lineHeight:1.2, marginBottom:12 }}>
              Websites que geram resultados <span style={{ color:"#FEE96D", textDecoration:"underline", textDecorationStyle:"wavy", textUnderlineOffset:4 }}>reais.</span>
            </h3>
            <p style={{ color:"#6B7280", fontSize:"0.88rem", lineHeight:1.7, marginBottom:32 }}>Design estratégico, performance otimizada e foco na conversão.</p>
            <div style={{ display:"flex", justifyContent:"center" }}>
              <PhoneMockup />
            </div>
          </motion.div>

          {/* Card 1 */}
          <motion.div initial={{ opacity:0, y:40 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.55, delay:0.1 }}>
            <TiltCard style={{ perspective:1200, height:"100%" }}>
              <div style={{ background:"#fff", borderRadius:24, padding:"32px 28px", border:"1px solid rgba(17,17,17,0.08)", boxShadow:"0 2px 4px rgba(0,0,0,0.02),0 12px 40px rgba(0,0,0,0.07)", height:"100%", display:"flex", flexDirection:"column" }}>
                <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:18 }}>
                  <div style={{ width:42, height:42, borderRadius:11, backgroundColor:"rgba(17,17,17,0.06)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <Globe size={20} color="#111" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 style={{ fontSize:"1rem", fontWeight:700, color:"#111", margin:0 }}>Website</h3>
                    <p style={{ fontSize:"0.75rem", color:"#6B7280", margin:0, marginTop:2 }}>Website profissional personalizado.</p>
                  </div>
                </div>
                <div style={{ paddingBottom:18, marginBottom:18, borderBottom:"1px solid rgba(17,17,17,0.07)" }}>
                  <span style={{ fontSize:"2.6rem", fontWeight:800, color:"#111", letterSpacing:"-0.03em", lineHeight:1 }}>470€</span>
                  <p style={{ color:"#6B7280", fontSize:"0.8rem", marginTop:5 }}>Pagamento único</p>
                </div>
                <ul style={{ listStyle:"none", padding:0, margin:"0 0 24px", display:"flex", flexDirection:"column", gap:10, flex:1 }}>
                  {features1.map((f,i) => (
                    <li key={i} style={{ display:"flex", alignItems:"center", gap:9 }}>
                      <span style={{ width:18, height:18, borderRadius:"50%", backgroundColor:"rgba(254,233,109,0.25)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                        <Check size={10} strokeWidth={3} color="#b89e00" />
                      </span>
                      <span style={{ color:"#374151", fontSize:"0.84rem" }}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/contacto" style={{ textDecoration:"none" }}>
                  <motion.button whileHover={{ borderColor:"rgba(17,17,17,0.35)" }} whileTap={{ scale:0.98 }} style={{ width:"100%", padding:"12px 16px", borderRadius:12, border:"1.5px solid rgba(17,17,17,0.14)", background:"#fff", color:"#111", fontSize:"0.85rem", fontWeight:600, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:7 }}>
                    Falar connosco <ArrowRight size={13} />
                  </motion.button>
                </Link>
              </div>
            </TiltCard>
          </motion.div>

          {/* Card 2 */}
          <motion.div initial={{ opacity:0, y:40 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.55, delay:0.2 }} style={{ position:"relative" }}>
            <div style={{ position:"absolute", top:-16, left:"50%", transform:"translateX(-50%)", backgroundColor:"#FEE96D", color:"#111", fontSize:11, fontWeight:800, letterSpacing:"0.15em", padding:"7px 18px", borderRadius:100, whiteSpace:"nowrap", textTransform:"uppercase", boxShadow:"0 4px 18px rgba(254,233,109,0.5)", zIndex:10 }}>
              ★ Mais escolhido
            </div>
            <TiltCard style={{ perspective:1200, height:"100%" }}>
              <div style={{ background:"#fff", borderRadius:24, padding:"32px 28px", border:"2px solid #FEE96D", boxShadow:"0 2px 4px rgba(0,0,0,0.02),0 16px 50px rgba(0,0,0,0.09),0 0 0 4px rgba(254,233,109,0.12)", height:"100%", display:"flex", flexDirection:"column" }}>
                <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:18 }}>
                  <div style={{ width:42, height:42, borderRadius:11, backgroundColor:"rgba(254,233,109,0.25)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <Zap size={20} color="#b89e00" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 style={{ fontSize:"1rem", fontWeight:700, color:"#111", margin:0 }}>Website&nbsp;+&nbsp;Care</h3>
                    <p style={{ fontSize:"0.75rem", color:"#6B7280", margin:0, marginTop:2 }}>A solução completa com acompanhamento contínuo.</p>
                  </div>
                </div>
                <div style={{ paddingBottom:18, marginBottom:18, borderBottom:"1px solid rgba(17,17,17,0.07)" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:10, flexWrap:"wrap" }}>
                    <span style={{ fontSize:"2.6rem", fontWeight:800, color:"#111", letterSpacing:"-0.03em", lineHeight:1 }}>299€</span>
                    <span style={{ backgroundColor:"#DC2626", color:"#fff", fontSize:"0.68rem", fontWeight:800, padding:"3px 9px", borderRadius:100 }}>-171€ vs base</span>
                  </div>
                  <p style={{ color:"#6B7280", fontSize:"0.8rem", marginTop:5 }}>+ 39€/mês</p>
                </div>
                <ul style={{ listStyle:"none", padding:0, margin:"0 0 24px", display:"flex", flexDirection:"column", gap:10, flex:1 }}>
                  {features2.map((f,i) => (
                    <li key={i} style={{ display:"flex", alignItems:"center", gap:9 }}>
                      <span style={{ width:18, height:18, borderRadius:"50%", backgroundColor:"rgba(254,233,109,0.25)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                        <Check size={10} strokeWidth={3} color="#b89e00" />
                      </span>
                      <span style={{ color:"#374151", fontSize:"0.84rem" }}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/contacto" style={{ textDecoration:"none" }}>
                  <motion.button whileHover={{ scale:1.02, boxShadow:"0 8px 28px rgba(254,233,109,0.55)" }} whileTap={{ scale:0.98 }} style={{ width:"100%", padding:"12px 16px", borderRadius:12, border:"none", background:"#FEE96D", color:"#111", fontSize:"0.85rem", fontWeight:700, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:7, boxShadow:"0 4px 18px rgba(254,233,109,0.4)" }}>
                    Começar agora <ArrowRight size={13} />
                  </motion.button>
                </Link>
              </div>
            </TiltCard>
          </motion.div>
        </div> : (
          <motion.div initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.45 }} className="pricing-booking-grid" style={{ display:"grid", gridTemplateColumns:"0.9fr 1.1fr", gap:24, alignItems:"stretch" }}>
            <div className="pricing-booking-card-left" style={{ background:"#111", borderRadius:24, padding:"34px 30px", color:"#fff", minHeight:360, display:"flex", flexDirection:"column", justifyContent:"space-between" }}>
              <div>
                <div style={{ width:48, height:48, borderRadius:13, background:"rgba(254,233,109,0.16)", color:"#FEE96D", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:22 }}>
                  <CalendarDays size={24} strokeWidth={1.5} />
                </div>
                <p style={{ color:"rgba(255,255,255,0.45)", fontSize:11, fontWeight:800, letterSpacing:"0.2em", textTransform:"uppercase", marginBottom:12 }}>Para barbearias</p>
                <h3 style={{ fontSize:"clamp(1.8rem,3vw,2.6rem)", lineHeight:1.08, fontWeight:800, margin:0 }}>Convecta Booking</h3>
                <p style={{ color:"rgba(255,255,255,0.62)", fontSize:"0.9rem", lineHeight:1.7, marginTop:16, maxWidth:390 }}>O sistema de marcações e agendamentos para gerir clientes, equipa e operação num só lugar.</p>
              </div>
              <p style={{ color:"#FEE96D", fontSize:"0.78rem", fontWeight:700, margin:0, marginTop:16 }}>Agenda. Fidelização. Caixa. Relatórios.</p>
            </div>
            <div className="pricing-booking-card-right" style={{ background:"#fff", borderRadius:24, padding:"32px 28px", border:"2px solid #FEE96D", boxShadow:"0 0 0 4px rgba(254,233,109,0.12)", display:"flex", flexDirection:"column" }}>
              <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:18 }}>
                <div style={{ width:42, height:42, borderRadius:11, backgroundColor:"rgba(254,233,109,0.25)", display:"flex", alignItems:"center", justifyContent:"center" }}><CalendarDays size={20} color="#b89e00" strokeWidth={1.5} /></div>
                <div><h3 style={{ fontSize:"1rem", fontWeight:700, color:"#111", margin:0 }}>Convecta Booking</h3><p style={{ fontSize:"0.75rem", color:"#6B7280", margin:0, marginTop:2 }}>Plano para a tua barbearia.</p></div>
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
        )}

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
