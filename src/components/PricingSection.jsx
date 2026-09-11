import React from "react";
import { motion } from "framer-motion";
import { Check, Shield, Zap, CalendarDays, ArrowRight, Headphones } from "lucide-react";
import { Link } from "react-router-dom";
import { PRECO_MENSAL_TEXTO } from "@/lib/seo";

/*
 * O preco.
 *
 * Um plano, um valor, escrito uma vez em lib/seo.js. "Plano personalizado —
 * fala connosco" era o que estava aqui antes: um dono de barbearia que ve
 * "fala connosco" onde devia estar um numero assume que e caro e fecha o
 * separador. O preco e baixo e e igual para toda a gente; e um argumento,
 * nao um segredo.
 */
const INCLUIDO = [
  "Site de marcações online com endereço próprio e a tua marca",
  "Agenda por barbeiro com notificações no telemóvel",
  "Confirmação em dois toques ou automática",
  "Cartão de fidelidade digital com corte grátis",
  "Clientes, histórico e aniversários",
  "Checkout, caixa diária e comissões por barbeiro",
  "Produtos, stock e fornecedores",
  "Relatórios e Excel mensal para o contabilista",
  "Atualizações incluídas, sem versões a comprar",
  "Suporte por telefone e WhatsApp, em dias úteis",
];

const GARANTIAS = [
  { icon: Shield, title: "Sem fidelização", desc: "Sem período mínimo. Cancelas quando quiseres." },
  { icon: Zap, title: "A funcionar no próprio dia", desc: "Em regra, a barbearia fica ativa no dia em que falamos." },
  { icon: Headphones, title: "Suporte em dias úteis", desc: "Resposta até 24 horas úteis, por quem fez a app." },
];

export default function PricingSection({ nivelTitulo = "h2" }) {
  const Titulo = nivelTitulo;
  return (
    <section id="precos" style={{ backgroundColor:"#F5F5F5" }} className="relative section-mobile-compact py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden hidden md:block">
        <div style={{ position:"absolute", left:"-6%", top:"15%", width:320, height:320, borderRadius:"50%", background:"radial-gradient(circle at 38% 32%,#ffffff 0%,#d8d8d8 100%)", boxShadow:"inset -20px -24px 60px rgba(0,0,0,0.1)", opacity:0.7 }} />
        <div style={{ position:"absolute", right:"-4%", bottom:"10%", width:200, height:200, borderRadius:"50%", border:"24px solid rgba(210,210,210,0.6)", filter:"blur(0.5px)" }} />
        <div style={{ position:"absolute", right:"5%", top:"-5%", width:100, height:220, borderRadius:80, background:"linear-gradient(155deg,#f0f0f0 0%,#c8c8c8 100%)", boxShadow:"inset -8px -12px 32px rgba(0,0,0,0.1)", transform:"rotate(-15deg)", opacity:0.6 }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div initial={{ opacity:0, y:28 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.6 }} className="text-center mb-10 lg:mb-14">
          <span style={{ display:"inline-block", backgroundColor:"#FEE96D", color:"#111111", fontSize:11, fontWeight:800, letterSpacing:"0.2em", padding:"6px 18px", borderRadius:100, marginBottom:18, textTransform:"uppercase" }}>Preço</span>
          <Titulo style={{ fontWeight:800, fontSize:"clamp(2rem,5vw,3.4rem)", color:"#111111", lineHeight:1.05, marginBottom:14, letterSpacing:"-0.02em" }}>Um preço. Para todas as barbearias.</Titulo>
          <p style={{ color:"#6B7280", fontSize:"1rem", maxWidth:560, margin:"0 auto", lineHeight:1.75 }}>
            Um barbeiro ou cinco, cem marcações ou mil: paga-se o mesmo. Sem comissões por marcação, sem taxa de adesão, sem fidelização.
          </p>
        </motion.div>

        <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.45 }} className="pricing-booking-grid" style={{ display:"grid", gridTemplateColumns:"0.9fr 1.1fr", gap:24, alignItems:"stretch" }}>
          <div className="pricing-booking-card-left" style={{ background:"#111", borderRadius:24, padding:"34px 30px", color:"#fff", minHeight:360, display:"flex", flexDirection:"column", justifyContent:"space-between" }}>
            <div>
              <div style={{ width:48, height:48, borderRadius:13, background:"rgba(254,233,109,0.16)", color:"#FEE96D", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:22 }}>
                <CalendarDays size={24} strokeWidth={1.5} />
              </div>
              <p style={{ color:"rgba(255,255,255,0.45)", fontSize:11, fontWeight:800, letterSpacing:"0.2em", textTransform:"uppercase", marginBottom:12 }}>Marcações online para barbearias</p>
              <h3 style={{ fontSize:"clamp(1.8rem,3vw,2.6rem)", lineHeight:1.08, fontWeight:800, margin:0 }}>Convecta Booking</h3>
              <p style={{ color:"rgba(255,255,255,0.62)", fontSize:"0.9rem", lineHeight:1.7, marginTop:16, maxWidth:390 }}>
                O site onde os teus clientes marcam e o painel onde geres a barbearia. Duas apps, uma mensalidade.
              </p>
            </div>
            <p style={{ color:"#FEE96D", fontSize:"0.78rem", fontWeight:700, margin:0, marginTop:16 }}>Agenda · Fidelidade · Caixa · Comissões · Stock · Relatórios</p>
          </div>

          <div className="pricing-booking-card-right" style={{ background:"#fff", borderRadius:24, padding:"32px 28px", border:"2px solid #FEE96D", boxShadow:"0 0 0 4px rgba(254,233,109,0.12)", display:"flex", flexDirection:"column" }}>
            <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:18 }}>
              <div style={{ width:42, height:42, borderRadius:11, backgroundColor:"rgba(254,233,109,0.25)", display:"flex", alignItems:"center", justifyContent:"center" }}><CalendarDays size={20} color="#b89e00" strokeWidth={1.5} /></div>
              <div><h3 style={{ fontSize:"1rem", fontWeight:700, color:"#111", margin:0 }}>Plano único</h3><p style={{ fontSize:"0.75rem", color:"#6B7280", margin:0, marginTop:2 }}>Por barbearia, tudo incluído.</p></div>
            </div>
            <div style={{ paddingBottom:18, marginBottom:18, borderBottom:"1px solid rgba(17,17,17,0.07)" }}>
              <div style={{ display:"flex", alignItems:"baseline", gap:8, flexWrap:"wrap" }}>
                <span style={{ fontSize:"2.8rem", fontWeight:800, color:"#111", letterSpacing:"-0.03em", lineHeight:1, fontVariantNumeric:"tabular-nums" }}>{PRECO_MENSAL_TEXTO}</span>
                <span style={{ fontSize:"0.95rem", color:"#6B7280", fontWeight:600 }}>/ mês</span>
              </div>
              <p style={{ color:"#6B7280", fontSize:"0.78rem", marginTop:8, lineHeight:1.5 }}>
                Sem taxa de adesão. Sem comissões por marcação. Sem fidelização. Acresce IVA à taxa legal, quando aplicável.
              </p>
            </div>
            <ul style={{ listStyle:"none", padding:0, margin:"0 0 24px", display:"flex", flexDirection:"column", gap:9, flex:1 }}>
              {INCLUIDO.map((feature) => (
                <li key={feature} style={{ display:"flex", alignItems:"flex-start", gap:9 }}>
                  <span style={{ width:18, height:18, borderRadius:"50%", backgroundColor:"rgba(254,233,109,0.25)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:1 }}><Check size={10} strokeWidth={3} color="#b89e00" /></span>
                  <span style={{ color:"#374151", fontSize:"0.84rem", lineHeight:1.45 }}>{feature}</span>
                </li>
              ))}
            </ul>
            <Link to="/contacto" style={{ textDecoration:"none" }}>
              <motion.button whileHover={{ scale:1.02, boxShadow:"0 8px 28px rgba(254,233,109,0.55)" }} whileTap={{ scale:0.98 }} style={{ width:"100%", padding:"12px 16px", borderRadius:12, border:"none", background:"#FEE96D", color:"#111", fontSize:"0.85rem", fontWeight:700, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:7, boxShadow:"0 4px 18px rgba(254,233,109,0.4)" }}>
                Quero isto na minha barbearia <ArrowRight size={13} />
              </motion.button>
            </Link>
            <p style={{ color:"#9CA3AF", fontSize:"0.72rem", textAlign:"center", marginTop:10, marginBottom:0 }}>Ou experimenta primeiro a demonstração, sem registo.</p>
          </div>
        </motion.div>

        <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.55, delay:0.3 }}
          className="trust-strip"
          style={{ background:"#fff", borderRadius:18, border:"1px solid rgba(17,17,17,0.07)", boxShadow:"0 4px 20px rgba(0,0,0,0.05)", display:"grid", gridTemplateColumns:"repeat(3,1fr)", marginTop:20 }}>
          {GARANTIAS.map((item,i) => (
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
