import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Globe, Shield, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from 'react-helmet-async';
import ScrollReveal from "@/components/ScrollReveal";
import CtaSection from "@/components/CtaSection";
import GradientTransition from "@/components/GradientTransition";
import AmbientParticles from "@/components/AmbientParticles";

const services = [
  {
    icon: Globe,
    title: "Website Completo",
    desc: "Website profissional, design moderno, versão mobile, publicação e entrega final. Tudo pronto a usar.",
  },
  {
    icon: Shield,
    title: "Website + Convecta Care",
    desc: "Manutenção contínua, pequenas alterações, suporte, acompanhamento, gestão técnica e monitorização geral do website.",
  },
];

const exclusions = [
  "Sem SEO avançado",
  "Sem gestão de redes sociais",
  "Sem campanhas publicitárias",
  "Sem branding completo",
  "Sem desenvolvimento de software complexo",
  "Sem alterações ilimitadas",
  "Sem marketing digital completo",
];

function ServiceCard({ service, index }) {
  const [open, setOpen] = useState(false);

  return (
    <ScrollReveal delay={index * 0.1}>
      <div
        className="border border-dark/5 bg-white rounded-sm overflow-hidden group hover:border-mustard/30 transition-all duration-300 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <div className="p-8 flex items-start justify-between gap-4">
          <div className="flex items-start gap-5">
            <div className="w-12 h-12 rounded-sm bg-mustard/10 flex items-center justify-center shrink-0 group-hover:bg-mustard/20 transition-colors">
              <service.icon size={22} className="text-dark" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="font-heading text-xl text-dark">{service.title}</h3>
              <AnimatePresence>
                {open && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-sm text-dark/50 leading-relaxed mt-3"
                  >
                    {service.desc}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>
          <ChevronDown
            size={20}
            className={`text-dark/30 shrink-0 mt-1 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          />
        </div>
      </div>
    </ScrollReveal>
  );
}

const schemaServicos = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Desenvolvimento de Websites Premium",
  "provider": {
    "@type": "Organization",
    "name": "Convecta",
    "url": "https://convecta.pt"
  },
  "serviceType": "Web Development",
  "description": "Desenvolvimento de websites profissionais, rápidos e orientados à conversão para empresas e negócios locais. Design personalizado, SEO e acompanhamento contínuo.",
  "areaServed": {
    "@type": "Country",
    "name": "Portugal"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Serviços Convecta",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Website Profissional",
          "description": "Website moderno, responsivo e otimizado para SEO e conversão."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Convecta Booking",
          "description": "Plataforma de gestão e agendamento online para barbearias."
        }
      }
    ]
  },
  "inLanguage": "pt-PT"
};

export default function Servicos() {
  return (
    <div>
      <Helmet>
        <title>Serviços — Websites Premium para Empresas | Convecta</title>
        <meta name="description" content="Desenvolvemos websites profissionais, rápidos e orientados à conversão para empresas e negócios locais. Design personalizado, SEO e acompanhamento contínuo." />
        <link rel="canonical" href="https://convecta.pt/servicos" />
        <script type="application/ld+json">
          {JSON.stringify(schemaServicos)}
        </script>
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
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/40 mb-4">Serviços</p>
            <h1 className="font-heading text-4xl lg:text-6xl text-white mb-4">
              Websites +{" "}
              <span style={{ color: "#fee96d" }}>Acompanhamento</span>
            </h1>
            <p className="text-lg text-white/50 max-w-xl mx-auto">
              Duas modalidades. Um objetivo: presença online profissional e acompanhada.
            </p>
          </motion.div>
        </div>
      </section>

      <GradientTransition from="#1a1a1a" to="#ffffff" />

      {/* Services */}
      <section className="bg-white py-24 lg:py-32">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col gap-4">
            {services.map((service, i) => (
              <ServiceCard key={i} service={service} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* What we don't do */}
      <section style={{ backgroundColor: "#f5f5f5" }} className="py-20 lg:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <ScrollReveal>
            <div className="bg-white p-8 lg:p-10 rounded-sm border-l-4" style={{ borderLeftColor: "#fee96d" }}>
              <h3 className="font-heading text-2xl text-dark mb-4">
                O que não está incluído — e porquê.
              </h3>
              <ul className="flex flex-col gap-2 mb-6">
                {exclusions.map((item, i) => (
                  <li key={i} className="text-dark/60 text-sm flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-dark/30" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-sm text-dark/80 font-medium italic mb-4">
                "O nosso foco é claro: websites e acompanhamento. Não dispersamos. É isso que nos torna próximos."
              </p>
              <div className="pt-3 border-t border-dark/10">
                <p className="text-xs text-dark/60">
                  Procuras uma solução específica para gerir a tua barbearia? Conhece a{" "}
                  <Link to="/booking" className="text-dark font-bold underline hover:text-mustard transition-colors">
                    App de gestão para barbearias — Convecta Booking
                  </Link>.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Pricing Modalities */}
      <section className="bg-white py-24 lg:py-32">
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <ScrollReveal>
            <h2 className="font-heading text-3xl lg:text-4xl text-dark text-center mb-16">
              Duas modalidades, um objetivo.
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {/* Card 1 */}
            <ScrollReveal delay={0}>
              <div className="rounded-sm p-8 lg:p-10 h-full flex flex-col" style={{ background: "rgba(255,255,255,0.6)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 8px 32px rgba(0,0,0,0.06)" }}>
                <h3 className="font-heading text-2xl text-dark mb-3">Website Completo</h3>
                <p className="text-sm text-dark/50 leading-relaxed mb-6 flex-1">
                  Website profissional, design moderno, versão mobile, publicação e entrega final. Para quem quer o site pronto, sem compromisso recorrente.
                </p>
                <Link
                  to="/contacto"
                  className="inline-flex items-center justify-center px-6 py-3 text-sm font-bold border border-dark/20 text-dark rounded-sm hover:border-dark transition-colors"
                >
                  Falar Connosco
                </Link>
              </div>
            </ScrollReveal>

            {/* Card 2 — Recommended */}
            <ScrollReveal delay={0.1}>
              <div className="rounded-sm p-8 lg:p-10 h-full flex flex-col relative" style={{ borderColor: "#fee96d", background: "rgba(255,255,255,0.7)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", border: "2px solid #fee96d", boxShadow: "0 8px 32px rgba(254,233,109,0.12)" }}>
                <span
                  className="absolute -top-3 right-6 px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-sm"
                  style={{ backgroundColor: "#fee96d", color: "#1a1a1a" }}
                >
                  Recomendado
                </span>
                <h3 className="font-heading text-2xl text-dark mb-3">Website + Convecta Care</h3>
                <p className="text-sm text-dark/50 leading-relaxed mb-2 flex-1">
                  Website + acompanhamento contínuo: manutenção, pequenas alterações, suporte, gestão técnica e monitorização geral.
                </p>
                <p className="text-xs text-dark/40 mb-6">Contrato mínimo 6 meses</p>
                <Link
                  to="/contacto"
                  className="btn-glow inline-flex items-center justify-center px-6 py-3 text-sm font-bold rounded-sm"
                  style={{ backgroundColor: "#fee96d", color: "#1a1a1a" }}
                >
                  Falar Connosco
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <GradientTransition from="#f5f5f5" to="#1a1a1a" />

      {/* CTA */}
      <CtaSection
        title="Queres saber qual a modalidade certa para o teu negócio?"
        buttonText="Falar Connosco"
      />
    </div>
  );
}