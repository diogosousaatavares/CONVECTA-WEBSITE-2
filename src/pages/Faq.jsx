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
import { DEMO_CLIENTE_URL } from "@/lib/demo";

const faqs = [
  {
    q: "O que é a Convecta Booking?",
    a: "É o sistema de marcações da tua barbearia: um site próprio onde os teus clientes marcam pelo telemóvel, e um painel onde tu geres a agenda, a caixa, os clientes e o cartão de fidelidade. Tudo com o nome e as cores da tua barbearia — o cliente nunca vê a Convecta, vê-te a ti.",
  },
  {
    q: "Posso experimentar antes de decidir?",
    a: "Sim, e sem falar com ninguém. Temos uma barbearia de demonstração aberta a toda a gente: entras como cliente, marcas uma consulta, e depois entras como barbeiro e vês essa marcação chegar ao painel. Não pede registo nem cartão — só o teu nome e um contacto, para falarmos contigo depois. Os dados voltam ao início de hora a hora.",
  },
  {
    q: "Como é que os meus clientes marcam?",
    a: "Pelo site da tua barbearia, no telemóvel, em três toques: serviço, barbeiro, hora. Não precisam de instalar nada de nenhuma loja — podem guardar o site no ecrã principal e fica lá como uma app, com o teu nome e o teu logótipo. Vêem só as horas livres; as ocupadas não aparecem.",
  },
  {
    q: "Como fico a saber que entrou uma marcação?",
    a: "O telemóvel toca. Recebes uma notificação com o nome do cliente, o serviço e a hora, e a marcação aparece na agenda nesse segundo. Confirmas com dois toques — ou ligas a confirmação automática e nem isso precisas. O cliente também é avisado quando confirmas, e lembrado no dia anterior.",
  },
  {
    q: "Podem entrar duas marcações à mesma hora?",
    a: "Não. Se dois clientes tentarem a mesma hora com o mesmo barbeiro no mesmo segundo, só um fica com ela — o outro é avisado na hora e escolhe outra. Isto é garantido pela base de dados, não por uma regra no ecrã que possa falhar.",
  },
  {
    q: "E se o cliente quiser desmarcar?",
    a: "Pode fazê-lo sozinho pelo site, até ao prazo que tu definires — duas horas antes, seis, um dia, o que fizer sentido na tua barbearia. Depois desse prazo, o site diz-lhe que só ligando para ti. Quando desmarca, a hora fica logo livre na agenda e recebes aviso.",
  },
  {
    q: "Como funciona o cartão de fidelidade?",
    a: "Cada corte pago dá um carimbo. Quando chega ao número que definires, o próximo é grátis — e o cliente usa-o na própria marcação, sem cartões de papel. Tu vês no painel quem tem corte grátis antes de ele entrar pela porta. Podes definir o número de carimbos e o prazo de validade.",
  },
  {
    q: "A caixa e as comissões?",
    a: "No fim de cada serviço fazes o checkout: método de pagamento, desconto se houver, gorjeta. A comissão do barbeiro é calculada e guardada nesse momento com a percentagem em vigor — mudar a percentagem amanhã não altera o que já foi feito hoje. Abres e fechas a caixa por dia, e cada barbeiro tem a sua conta.",
  },
  {
    q: "E o contabilista?",
    a: "No fim do mês escolhes o mês, carregas num botão e descarregas um Excel pronto a enviar: o resumo do mês (total, por método de pagamento, por barbeiro, por serviço) e a lista de todos os serviços prestados, linha a linha. Acabou o saco de talões.",
  },
  {
    q: "Quanto custa? Há comissões por marcação?",
    a: "Uma mensalidade fixa, sem comissões por marcação e sem fidelização — cancelas quando quiseres. O preço é o mesmo para todas as barbearias, tenhas um barbeiro ou cinco. Fala connosco e dizemos-te o valor sem rodeios.",
  },
  {
    q: "Quanto tempo até estar a funcionar?",
    a: "Criamos a tua barbearia, o teu endereço na internet e a tua conta, e afinamos as cores e o logótipo contigo. Carregas os serviços, os preços e a equipa — em regra fica a funcionar no próprio dia. Se já tens uma lista de clientes, ajudamos a passá-la.",
  },
  {
    q: "Preciso de instalar alguma coisa?",
    a: "Não. Tudo funciona no browser, no telemóvel ou no computador. O painel podes guardá-lo no ecrã do telemóvel como uma app, para o teres sempre à mão ao balcão.",
  },
  {
    q: "Os dados dos meus clientes estão seguros?",
    a: "Os dados ficam em servidores na União Europeia (Irlanda). Cada barbearia está isolada das outras: só tu vês os teus clientes e as tuas marcações, e cada cliente só vê as suas. Fazemos cópias de segurança, e se um dia quiseres sair, os teus dados são apagados a pedido.",
  },
  {
    q: "Já uso outra agenda. Vale a pena mudar?",
    a: "Se a tua agenda é o papel ou o WhatsApp, o que ganhas é o telemóvel a tocar a cada marcação e zero marcações em cima umas das outras. Se já usas outro sistema, experimenta a demonstração ao lado dele durante dez minutos — é a comparação mais honesta que te podemos oferecer.",
  },
  {
    q: "E se precisar de ajuda?",
    a: "Falas connosco por telefone ou WhatsApp. Somos uma equipa pequena e portuguesa: quem te atende é quem fez a app.",
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
        <title>Perguntas Frequentes — Convecta Booking | Convecta</title>
        <meta name="description" content="Como os teus clientes marcam, como ficas a saber, o que acontece com cancelamentos, fidelidade, caixa e contabilista. As respostas antes de experimentares a Convecta Booking." />
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
              O que os donos de barbearia nos perguntam antes de experimentar. Se a tua não estiver aqui, a demonstração responde a quase tudo.
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
        title="A resposta mais rápida é experimentar."
        buttonText="Experimentar a demonstração"
        href={DEMO_CLIENTE_URL}
        secondaryText="ou fala connosco"
      />
    </div>
  );
}