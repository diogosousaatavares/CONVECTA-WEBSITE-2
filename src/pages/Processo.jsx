import React from "react";
import { motion } from "framer-motion";
import { Lightbulb, Wrench, Rocket, HeartHandshake, CreditCard, Eye as EyeIcon, Zap, ArrowRight } from "lucide-react";
import { Helmet } from 'react-helmet-async';
import ScrollReveal from "@/components/ScrollReveal";
import CtaSection from "@/components/CtaSection";
import GradientTransition from "@/components/GradientTransition";
import CountUp from "@/components/CountUp";
import AmbientParticles from "@/components/AmbientParticles";

const phases = [
  {
    num: "01",
    icon: Lightbulb,
    title: "Primeiro Contacto",
    desc: "Falamos do teu negócio, das tuas necessidades e do que faz sentido construir.",
  },
  {
    num: "02",
    icon: EyeIcon,
    title: "Apresentação da Proposta",
    desc: "Recebes uma proposta clara, sem compromisso, com prazos e valores definidos.",
  },
  {
    num: "03",
    icon: Wrench,
    title: "Receção dos Materiais Necessários",
    desc: "Textos, imagens e logótipo — tudo o que precisamos para começar.",
  },
  {
    num: "04",
    icon: Zap,
    title: "Desenvolvimento do Website",
    desc: "Construímos o teu website, com design moderno e versão mobile.",
  },
  {
    num: "05",
    icon: ArrowRight,
    title: "Revisões e Validação Final",
    desc: "Vês, ajustamos e validas. Tudo à tua medida antes de publicar.",
  },
  {
    num: "06",
    icon: Rocket,
    title: "Publicação",
    desc: "O website fica online, pronto a receber visitantes e clientes.",
  },
  {
    num: "07",
    icon: HeartHandshake,
    title: "Início do Acompanhamento Convecta Care",
    desc: "Começa o acompanhamento contínuo: manutenção, suporte e monitorização.",
  },
];

const expectations = [
  {
    icon: EyeIcon,
    title: "Confiança",
    desc: "Uma relação transparente, sem promessas vazias.",
  },
  {
    icon: Zap,
    title: "Rapidez",
    desc: "Da aprovação à publicação em 1 a 2 semanas.",
  },
  {
    icon: ArrowRight,
    title: "Acompanhamento",
    desc: "O projeto não termina na entrega. Começa aí.",
  },
];

export default function Processo() {
  return (
    <div>
      <Helmet>
        <title>Como Trabalhamos — Processo e Metodologia | Convecta</title>
        <meta name="description" content="Descobrimos, construímos, lançamos e acompanhamos. Conhece o processo da Convecta para criar soluções digitais que funcionam." />
        <link rel="canonical" href="https://convecta.pt/processo" />
      </Helmet>

      {/* Hero */}
      <section style={{ backgroundColor: "#1a1a1a" }} className="pt-32 pb-20 lg:pt-40 lg:pb-28 relative overflow-hidden">
        <AmbientParticles count={6} />
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/40 mb-4">Processo</p>
            <h1 className="font-heading text-4xl lg:text-6xl text-white mb-4">
              Como funciona, do{" "}
              <span style={{ color: "#fee96d" }}>início ao fim.</span>
            </h1>
            <p className="text-lg text-white/50 max-w-xl mx-auto">
              Sem surpresas. Sem linguagem técnica. Sem abandono após entrega.
            </p>
          </motion.div>
        </div>
      </section>

      <GradientTransition from="#1a1a1a" to="#ffffff" />

      {/* Timeline */}
      <section className="bg-white py-24 lg:py-32">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-dark/10 hidden md:block" />

            <div className="flex flex-col gap-12 md:gap-16">
              {phases.map((phase, i) => (
                <ScrollReveal key={i} delay={i * 0.1}>
                  <div className="flex gap-6 md:gap-8 items-start relative">
                    {/* Number circle */}
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 text-sm font-bold relative z-10"
                      style={{ backgroundColor: "#fee96d", color: "#1a1a1a" }}
                    >
                      {phase.num}
                    </div>

                    <div className="pt-1">
                      <div className="flex items-center gap-3 mb-2">
                        <phase.icon size={18} className="text-dark/40" strokeWidth={1.5} />
                        <h3 className="font-heading text-xl lg:text-2xl text-dark">{phase.title}</h3>
                      </div>
                      <p className="text-sm text-dark/50 leading-relaxed max-w-md">{phase.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Payment detail */}
      <section style={{ backgroundColor: "#f5f5f5" }} className="py-12">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <ScrollReveal>
            <div className="flex items-center gap-4 justify-center">
              <CreditCard size={20} className="text-dark/40" />
              <p className="text-sm text-dark/60">
                Pagamento dividido: <span className="font-semibold text-dark">50% no início</span> · <span className="font-semibold text-dark">50% na entrega</span>
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Expectations */}
      <section className="bg-white py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <ScrollReveal>
            <h2 className="font-heading text-3xl lg:text-4xl text-dark text-center mb-6">
              Porquê a Convecta
            </h2>
            <p className="text-lg text-dark/50 text-center max-w-2xl mx-auto mb-16 italic leading-relaxed">
              "Muitos profissionais entregam o website e desaparecem. A Convecta aposta na continuidade, acompanhamento e relação de longo prazo com os seus clientes."
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-4xl mx-auto">
            {expectations.map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="text-center p-6 rounded-sm" style={{ background: "rgba(255,255,255,0.6)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", border: "1px solid rgba(0,0,0,0.08)" }}>
                  <div className="w-14 h-14 rounded-full border border-dark/10 flex items-center justify-center mx-auto mb-5">
                    <item.icon size={22} className="text-dark/60" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-heading text-xl text-dark mb-2">{item.title}</h3>
                  <p className="text-sm text-dark/50 leading-relaxed">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <GradientTransition from="#ffffff" to="#1a1a1a" />

      {/* CTA */}
      <CtaSection title="Pronto para começar?" />
    </div>
  );
}