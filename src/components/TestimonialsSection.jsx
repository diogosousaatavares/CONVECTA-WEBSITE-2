import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Dra. Ana Ferreira",
    role: "Directora Clínica — Sorriso Dental, Lisboa",
    rating: 5,
    text: "Desde que lançámos o novo website com a Convecta, as marcações online aumentaram de forma notável. O design é moderno, carrega rapidamente e os pacientes comentam que a imagem transmite confiança logo à primeira vista.",
    initial: "AF",
    dark: false,
  },
  {
    name: "Dr. Pedro Sousa",
    role: "Médico Dentista — Clínica Oral Premium, Porto",
    rating: 5,
    text: "Profissionalismo do início ao fim. A equipa da Convecta entendeu o posicionamento da nossa clínica e traduziu-o numa presença digital que nos representa a 100%. O retorno foi visível em menos de 30 dias.",
    initial: "PS",
    dark: true,
  },
  {
    name: "Dra. Marta Lopes",
    role: "Ortodontista — DenteSafe, Braga",
    rating: 5,
    text: "A melhor decisão para o meu consultório. Hoje os pacientes chegam diretamente pelo Google e pelo website — nunca foi tão fácil conseguir marcações. O suporte é sempre rápido e eficaz.",
    initial: "ML",
    dark: false,
  },
];

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const prev = () => setActive(p => p === 0 ? testimonials.length - 1 : p - 1);
  const next = () => setActive(p => p === testimonials.length - 1 ? 0 : p + 1);
  const t = testimonials[active];

  return (
    <section style={{ background:"#111111" }} className="relative py-16 lg:py-28 overflow-hidden">
      <div style={{ position:"absolute", top:-80, right:-60, width:300, height:300, borderRadius:"50%", background:"radial-gradient(circle,rgba(254,233,109,0.07) 0%,transparent 70%)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", bottom:-60, left:-60, width:260, height:260, borderRadius:"50%", background:"radial-gradient(circle,rgba(254,233,109,0.05) 0%,transparent 70%)", pointerEvents:"none" }} />

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12">
        <motion.div initial={{ opacity:0, y:28 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.6 }} className="text-center mb-10 lg:mb-14">
          <span style={{ display:"inline-block", backgroundColor:"rgba(254,233,109,0.12)", color:"#FEE96D", fontSize:11, fontWeight:800, letterSpacing:"0.2em", padding:"6px 18px", borderRadius:100, marginBottom:18, textTransform:"uppercase", border:"1px solid rgba(254,233,109,0.2)" }}>
            Casos / exemplos
          </span>
          <h2 style={{ fontWeight:800, fontSize:"clamp(1.8rem,4vw,3rem)", color:"#fff", lineHeight:1.1, marginBottom:14, letterSpacing:"-0.02em" }}>
            Soluções que já fazem diferença
          </h2>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:6, marginTop:8 }}>
            {[...Array(5)].map((_,i) => <Star key={i} size={16} fill="#FEE96D" color="#FEE96D" />)}
            <span style={{ color:"rgba(255,255,255,0.45)", fontSize:"0.82rem", marginLeft:6 }}>5.0 · Classificação dos clientes</span>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div key={active}
            initial={{ opacity:0, y:30, scale:0.97 }}
            animate={{ opacity:1, y:0, scale:1 }}
            exit={{ opacity:0, y:-20, scale:0.97 }}
            transition={{ duration:0.4, ease:"easeInOut" }}
            style={{ background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:24, padding:"36px 32px", backdropFilter:"blur(8px)", position:"relative", marginBottom:20 }}>
            <div className="hidden sm:block" style={{ position:"absolute", top:28, right:28, opacity:0.1 }}>
              <Quote size={48} color="#FEE96D" />
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:20 }}>
              <div style={{ width:48, height:48, borderRadius:"50%", background: t.dark ? "#111" : "#FEE96D", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:800, fontSize:"0.95rem", color: t.dark ? "#FEE96D" : "#111", flexShrink:0, border: t.dark ? "2px solid #FEE96D" : "none" }}>
                {t.initial}
              </div>
              <div>
                <p style={{ fontWeight:700, color:"#fff", fontSize:"0.92rem", margin:0 }}>{t.name}</p>
                <p style={{ color:"rgba(255,255,255,0.45)", fontSize:"0.76rem", margin:"3px 0 6px" }}>{t.role}</p>
                <div style={{ display:"flex", gap:3 }}>{[...Array(t.rating)].map((_,i) => <Star key={i} size={12} fill="#FEE96D" color="#FEE96D" />)}</div>
              </div>
            </div>
            <blockquote style={{ margin:0, color:"rgba(255,255,255,0.8)", fontSize:"1rem", lineHeight:1.8 }}>
              "{t.text}"
            </blockquote>
          </motion.div>
        </AnimatePresence>

        <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:16 }}>
          <motion.button whileHover={{ backgroundColor:"rgba(254,233,109,0.12)" }} whileTap={{ scale:0.9 }} onClick={prev}
            style={{ width:44, height:44, borderRadius:"50%", border:"1px solid rgba(255,255,255,0.15)", background:"transparent", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}>
            <ChevronLeft size={18} color="#fff" />
          </motion.button>
          <div style={{ display:"flex", gap:8 }}>
            {testimonials.map((_,i) => (
              <button key={i} onClick={() => setActive(i)}
                style={{ width:i===active?24:8, height:8, borderRadius:100, border:"none", background:i===active?"#FEE96D":"rgba(255,255,255,0.2)", transition:"all 0.3s ease", cursor:"pointer", padding:0 }} />
            ))}
          </div>
          <motion.button whileHover={{ backgroundColor:"rgba(254,233,109,0.12)" }} whileTap={{ scale:0.9 }} onClick={next}
            style={{ width:44, height:44, borderRadius:"50%", border:"1px solid rgba(255,255,255,0.15)", background:"transparent", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}>
            <ChevronRight size={18} color="#fff" />
          </motion.button>
        </div>
      </div>
    </section>
  );
}
