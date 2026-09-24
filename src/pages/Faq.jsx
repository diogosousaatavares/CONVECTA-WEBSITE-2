import React from "react";
import { motion } from "framer-motion";
import Seo from "@/components/Seo";
import ScrollReveal from "@/components/ScrollReveal";
import CtaSection from "@/components/CtaSection";
import { PLANOS, faqLd, migalhasLd } from "@/lib/seo";
import BarraComecarFixa from "@/components/BarraComecarFixa";

const faqs = [
  {
    q: "O que é a Convecta Booking?",
    a: "É a app de marcações online e o software de gestão da tua barbearia: um site próprio onde os teus clientes marcam pelo telemóvel, e um painel onde tu geres a agenda, a caixa, as comissões, o stock, os clientes e o cartão de fidelidade. Tudo com o nome e as cores da tua barbearia — o cliente nunca vê a Convecta, vê-te a ti.",
  },
  {
    q: "Posso experimentar antes de decidir?",
    a: "Sim, e sem falar com ninguém. Crias a tua barbearia em dois minutos — o site nasce logo com o teu nome — e montas os serviços, os horários e as cores sem dar cartão nenhum. Quando quiseres começar a receber marcações, registas o cartão e tens 7 dias à experiência. Se cancelares até lá, não pagas nada, e cancelas sozinho no painel.",
  },
  {
    q: "Como é que os meus clientes marcam?",
    a: "Pelo site da tua barbearia, no telemóvel, em três toques: serviço, barbeiro, hora. Não precisam de instalar nada de nenhuma loja — podem guardar o site no ecrã principal e fica lá como uma app, com o teu nome e o teu logótipo. Vêem só as horas livres; as ocupadas não aparecem.",
  },
  {
    q: "Como fico a saber que entrou uma marcação?",
    a: "O telemóvel toca. Recebes uma notificação com o nome do cliente, o serviço e a hora, e a marcação aparece na agenda nesse segundo. Confirmas com dois toques — ou ligas a confirmação automática e nem isso precisas. O cliente também recebe uma notificação no telemóvel quando confirmas. Antes do corte, o cliente recebe um aviso por notificação e por email, sem custo por mensagem. Lembretes por SMS ou WhatsApp não existem — dizemo-lo aqui para não o descobrires depois.",
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
    a: "No fim de cada serviço fazes o checkout: método de pagamento, desconto se houver, gorjeta. A comissão do barbeiro é calculada e guardada nesse momento com a percentagem em vigor — mudar a percentagem amanhã não altera o que já foi feito hoje. Abres e fechas a caixa por dia, e cada barbeiro tem a sua conta-corrente com o que fez e o que há a pagar.",
  },
  {
    q: "E o contabilista?",
    a: "No fim do mês escolhes o mês, carregas num botão e descarregas um Excel pronto a enviar: o resumo do mês (total, por método de pagamento, por barbeiro, por serviço) e a lista de todos os serviços prestados, linha a linha. Acabou o saco de talões.",
  },
  {
    q: "Quanto custa? Há comissões por marcação?",
    a: `Três planos, pelo tamanho da equipa: ${PLANOS.map(p => `${p.nome} ${p.precoTexto}/mês (${p.profissionaisTexto.toLowerCase()})`).join(", ")}. A plataforma é a mesma nos três e não há limite de marcações em nenhum. Sem comissões por marcação, sem taxa de adesão e sem fidelização — cancelas quando quiseres. Acresce IVA à taxa legal, quando aplicável.`,
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
    a: "Os dados ficam em servidores na União Europeia (Irlanda). Cada barbearia está isolada das outras: só tu vês os teus clientes e as tuas marcações, e cada cliente só vê as suas. Guardamos cópias de segurança, e se um dia quiseres sair, os teus dados são apagados a pedido — ou levas o Excel antes.",
  },
  {
    q: "Já uso outra agenda. Vale a pena mudar?",
    a: "Se a tua agenda é o papel ou o WhatsApp, o que ganhas é o telemóvel a tocar a cada marcação e zero marcações em cima umas das outras. Se já usas outro sistema, monta a tua barbearia aqui em dois minutos e compara os dois lado a lado durante os 7 dias — é a comparação mais honesta que te podemos oferecer.",
  },
  {
    q: "E se precisar de ajuda?",
    a: "Falas connosco por telefone ou WhatsApp, em dias úteis. Somos uma equipa pequena, do Porto: quem te atende é quem fez a app.",
  },
  {
    q: "Serve para um salão de cabeleireiro ou um estúdio de barbeiro a solo?",
    a: "A Convecta foi feita para barbearias, e é para elas que vamos continuar a fazê-la. Um barbeiro a solo usa-a exatamente da mesma forma — a agenda tem uma coluna em vez de quatro. Um salão que marque por serviço, profissional e hora também funciona; fala connosco antes, para confirmarmos que faz sentido.",
  },
  {
    q: "Que endereço têm os meus clientes para marcar?",
    a: "O nome da tua barbearia em marcacoes.app — por exemplo, a-tua-barbearia.marcacoes.app. É esse link que pões na bio do Instagram, no perfil do Google e na mensagem automática do WhatsApp. Abre no browser, sem instalar nada, e pode ficar no ecrã do telemóvel como uma app com o teu ícone.",
  },
  {
    q: "Marcações automáticas: o cliente fica logo com a hora ou tenho de aprovar?",
    a: "Tu decides. Com a confirmação automática ligada, a marcação entra confirmada e o cliente é avisado nesse segundo. Desligada, entra como pendente, o teu telemóvel toca e confirmas com dois toques. Em qualquer dos casos a hora fica bloqueada para toda a gente no momento em que o cliente marca.",
  },
];

export default function Faq() {
  return (
    <div>
      <Seo
        titulo="Perguntas frequentes sobre marcações online para barbearias"
        descricao="Como os teus clientes marcam online, como ficas a saber, cancelamentos, cartão de fidelidade, caixa, comissões, contabilista, preços (desde 19,99 €/mês) e segurança dos dados. As respostas antes de criares a tua barbearia na Convecta."
        caminho="/faq"
        ld={[faqLd(faqs), migalhasLd([{ nome: "Início", caminho: "/" }, { nome: "Perguntas frequentes", caminho: "/faq" }])]}
      />

      {/* Hero */}
      <section style={{ backgroundColor: "var(--cv-ground)" }} className="pt-32 pb-20 lg:pt-40 lg:pb-28 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-ink-3 mb-4">FAQ</p>
            <h1 className="font-heading text-4xl lg:text-6xl text-ink mb-4">
              Perguntas <span className="cv-marca">frequentes</span>
            </h1>
            <p className="text-lg text-ink-2 max-w-xl mx-auto">
              O que os donos de barbearia nos perguntam antes de experimentar. Se a tua não estiver aqui, criar a tua barbearia responde a quase tudo — e não custa nada.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="bg-white py-24 lg:py-32">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <ScrollReveal>
            {/* <details> em vez do acordeao do Radix: as respostas ficam no
                HTML que o Google le (o acordeao so as desenhava ao abrir, e o
                FAQPage do schema deixava de bater certo com a pagina). */}
            <h2 className="sr-only">Perguntas e respostas</h2>
            <div className="w-full">
              {faqs.map((faq, i) => (
                <details key={i} className="border-b border-linha group">
                  <summary className="text-left font-heading text-lg text-ink py-6 cursor-pointer list-none flex items-start justify-between gap-4 hover:text-ink-2">
                    <span>{faq.q}</span>
                    <span className="text-[var(--cv-amarelo-texto)] group-open:rotate-180 transition-transform mt-1 shrink-0">↓</span>
                  </summary>
                  <p className="text-sm text-ink-2 leading-relaxed pb-6 m-0">{faq.a}</p>
                </details>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <CtaSection
        title="A resposta mais rápida é criar a tua."
        buttonText="Começar grátis"
        to="/comecar"
        secondaryText="ou fala connosco"
      />

      {/* No telemóvel esta página tem oito ecrãs: o botão tem de
          voltar sozinho quando o de cima já saiu de vista. */}
      <BarraComecarFixa />
    </div>
  );
}