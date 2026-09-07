import React from "react";
import { motion } from "framer-motion";
import { Helmet } from 'react-helmet-async';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ScrollReveal from "@/components/ScrollReveal";
import CtaSection from "@/components/CtaSection";
import GradientTransition from "@/components/GradientTransition";
import AmbientParticles from "@/components/AmbientParticles";

const faqs = [
  {
    q: "Quanto tempo demora o website?",
    a: "Normalmente entre 1 a 2 semanas após recebermos todos os teus conteúdos (textos, imagens, logótipo).",
  },
  {
    q: "O que preciso de fornecer?",
    a: "Textos, imagens e logótipo do teu negócio. Se precisares de ajuda com os textos, podemos orientar-te.",
  },
  {
    q: "O que inclui o Convecta Care?",
    a: "Manutenção contínua, pequenas alterações, suporte, acompanhamento, gestão técnica e monitorização geral do website.",
  },
  {
    q: "Posso pedir alterações depois da entrega?",
    a: "Sim. No plano Convecta Care podes pedir pequenas alterações — textos, contactos, horários, imagens e promoções simples.",
  },
  {
    q: "Existe fidelização?",
    a: "O Convecta Care tem um contrato mínimo de 6 meses. Após esse período, podes cancelar com aviso prévio.",
  },
  {
    q: "E se já tiver website?",
    a: "Avaliamos o teu site atual e, se fizer sentido, renovamos ou construímos um novo a partir de zero.",
  },
  {
    q: "Porque escolher a Convecta?",
    a: "Porque não entregamos e desaparecemos. Criamos websites modernos e mantemo-nos presentes, com acompanhamento e suporte contínuos.",
  },
];

const schemaFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map((faq) => ({
    "@type": "Question",
    "name": faq.q,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.a,
    }
  }))
};

export default function Faq() {
  return (
    <div>
      <Helmet>
        <title>Perguntas Frequentes — Websites e Convecta Booking | Convecta</title>
        <meta name="description" content="Respostas às perguntas mais comuns sobre websites, Convecta Booking, prazos, preços e acompanhamento. Tudo o que precisas de saber antes de começar." />
        <link rel="canonical" href="https://convecta.pt/faq" />
        <script type="application/ld+json">
          {JSON.stringify(schemaFaq)}
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
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/40 mb-4">FAQ</p>
            <h1 className="font-heading text-4xl lg:text-6xl text-white mb-4">
              Perguntas <span style={{ color: "#fee96d" }}>frequentes</span>
            </h1>
            <p className="text-lg text-white/50 max-w-xl mx-auto">
              Se tens dúvidas, outros também tiveram. Aqui estão as respostas.
            </p>
          </motion.div>
        </div>
      </section>

      <GradientTransition from="#1a1a1a" to="#ffffff" />

      {/* FAQ Accordion */}
      <section className="bg-white py-24 lg:py-32">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <ScrollReveal>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="border-b border-dark/10">
                  <AccordionTrigger className="text-left font-heading text-lg text-dark py-6 hover:no-underline hover:text-dark/70">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-dark/60 leading-relaxed pb-6">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </ScrollReveal>
        </div>
      </section>

      <GradientTransition from="#ffffff" to="#1a1a1a" />

      {/* CTA */}
      <CtaSection
        title="Ainda tens dúvidas? Fala connosco diretamente."
        buttonText="Falar Connosco"
      />
    </div>
  );
}