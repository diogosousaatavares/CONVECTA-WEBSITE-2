import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check, X } from "lucide-react";
import Seo from "@/components/Seo";
import PricingSection from "@/components/PricingSection";
import ScrollReveal from "@/components/ScrollReveal";
import CtaSection from "@/components/CtaSection";
import { SITE, PLANOS, DESCONTO_ANUAL, PRECO_DESDE_TEXTO, migalhasLd, faqLd, softwareLd } from "@/lib/seo";

/*
 * Precos.
 *
 * Tres planos, escritos em lib/seo.js. Esta pagina explica o que eles
 * incluem, o que nao incluem, e o que custa nao ter marcacoes online — que
 * e a comparacao que interessa a quem esta a decidir.
 */

const INCLUI = [
  "Site de marcações online com endereço próprio (a-tua-barbearia.marcacoes.app)",
  "Painel de gestão para o telemóvel, tablet e computador",
  "Controlo total do design: cores, tipografia, logótipo, capa e galeria, mudados por ti no painel",
  "Notificações no telemóvel: tuas a cada marcação, do cliente a cada confirmação",
  "Cartão de fidelidade digital, caixa, comissões, stock, relatórios",
  "Excel mensal para o contabilista",
  "Alojamento e atualizações, sem custos extra",
  "Suporte por telefone e WhatsApp, em dias úteis",
];

const NAO_INCLUI = [
  "Pagamentos online pelo cliente — o cliente paga na barbearia, como sempre",
  "Um domínio próprio (o teu endereço em marcacoes.app está incluído)",
  "Gestão de redes sociais, publicidade ou produção de conteúdos",
];

const PERGUNTAS = [
  { q: "Qual é a diferença entre os três planos?", a: `A plataforma é exatamente a mesma nos três: agenda, clientes, caixa, comissões, produtos, stock, relatórios e fidelização. O que muda é quantos profissionais cabem — ${PLANOS.map(p => `${p.nome}, ${p.profissionaisTexto.toLowerCase()}, ${p.precoTexto}/mês`).join("; ")}. O Business inclui ainda um website da barbearia feito por nós. Não há limite de marcações em nenhum deles.` },
  { q: "E se a minha equipa crescer?", a: "Mudas de plano e continuas com os mesmos dados, a mesma agenda e o mesmo endereço. Não se recomeça nada." },
  { q: "Há comissões por marcação?", a: "Não. Zero. Cada marcação que entra é tua por inteiro. A Convecta ganha a mensalidade e mais nada." },
  { q: "Há fidelização ou período mínimo?", a: "No plano mensal não: cancelas quando quiseres. Se escolheres pagar o ano de uma vez, aí sim, o compromisso é de doze meses — é o que paga o desconto. Se saíres, os teus dados são apagados a pedido." },
  { q: "Como se paga?", a: `Por mês ou por ano, com fatura. No anual pagas os doze meses de uma vez com ${Math.round(DESCONTO_ANUAL * 100)} % de desconto — é o único caso em que há compromisso de um ano. No mensal cancelas quando quiseres. Combinamos o método contigo quando a barbearia fica ativa.` },
  { q: "O preço inclui IVA?", a: "O valor apresentado é sem IVA; acresce IVA à taxa legal em vigor, quando aplicável. A fatura discrimina tudo." },
];

export default function Precos() {
  const ld = [
    softwareLd(),
    migalhasLd([{ nome: "Início", caminho: "/" }, { nome: "Preços", caminho: "/precos" }]),
    faqLd(PERGUNTAS),
  ];

  return (
    <div className="pt-24" style={{ backgroundColor: "var(--cv-ground)" }}>
      <Seo
        titulo={`Preços — desde ${PRECO_DESDE_TEXTO}/mês, sem comissões por marcação`}
        descricao={`Três planos, desde ${PRECO_DESDE_TEXTO} por mês por barbearia: ${PLANOS.map(p => `${p.nome} ${p.precoTexto} (${p.profissionaisTexto.toLowerCase()})`).join(", ")}. A plataforma é a mesma nos três — marcações online, agenda, caixa, comissões, stock, relatórios e fidelização. Sem taxa de adesão, sem comissões por marcação, sem fidelização.`}
        caminho="/precos"
        ld={ld}
      />

      <PricingSection nivelTitulo="h1" />

      {/* O que inclui / o que nao inclui */}
      <section className="bg-white py-20 lg:py-28 px-6 lg:px-12">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <p className="text-xs uppercase tracking-[0.25em] font-bold text-ink-3 mb-4">Sem letras pequenas</p>
              <h2 className="font-heading text-3xl lg:text-5xl text-ink leading-tight">O que a mensalidade inclui — e o que não inclui</h2>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ScrollReveal variant="fadeInUp">
              <div className="h-full p-7 rounded-2xl border border-linha bg-light">
                <h3 className="font-heading text-2xl text-ink mb-4">Incluído</h3>
                <ul className="space-y-3">
                  {INCLUI.map((t) => (
                    <li key={t} className="flex items-start gap-3 text-sm text-ink-2 leading-relaxed">
                      <span className="w-5 h-5 rounded-full bg-[#fee96d] flex items-center justify-center shrink-0 mt-0.5"><Check size={12} strokeWidth={3} color="#111" /></span>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
            <ScrollReveal variant="fadeInUp" delay={0.1}>
              <div className="h-full p-7 rounded-2xl border border-linha bg-white">
                <h3 className="font-heading text-2xl text-ink mb-4">Não incluído (para não haver surpresas)</h3>
                <ul className="space-y-3">
                  {NAO_INCLUI.map((t) => (
                    <li key={t} className="flex items-start gap-3 text-sm text-ink-2 leading-relaxed">
                      <span className="w-5 h-5 rounded-full bg-[rgba(36,32,28,0.06)] flex items-center justify-center shrink-0 mt-0.5"><X size={12} strokeWidth={3} color="#111" /></span>
                      {t}
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-ink-3 mt-5 leading-relaxed">
                  Tudo o que a app faz hoje está descrito, sem exageros, na página de <Link to="/funcionalidades" className="underline underline-offset-2 text-ink-2">funcionalidades</Link>.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* A comparacao que interessa */}
      <section style={{ backgroundColor: "var(--cv-ground)" }} className="py-20 lg:py-28 px-6 lg:px-12 text-ink">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <p className="text-xs uppercase tracking-[0.25em] font-bold text-[#8A6D0A] mb-4">Contas de barbeiro</p>
            <h2 className="font-heading text-3xl lg:text-5xl text-ink mb-6 leading-tight">Quanto custa não ter marcações online?</h2>
            <div className="space-y-5 text-ink-2 text-base leading-relaxed">
              <p>
                Um corte de 15 € que fica por marcar porque o cliente escreveu no WhatsApp às 22h e tu só viste de manhã — e ele entretanto foi a outro lado — custa 15 €. Dois por mês pagam a Convecta. Uma hora marcada duas vezes por engano, um cliente que apareceu e outro que teve de esperar, custa mais do que dinheiro.
              </p>
              <p>
                Nas plataformas de marcações que cobram comissão, cada cliente novo pode ficar-lhes com 20 % ou mais do serviço, e o cliente é "delas": vê outras barbearias ao lado da tua. Na Convecta, a mensalidade é fixa, o site é o da tua barbearia, e o cliente é teu.
              </p>
              <p>
                O plano de entrada são {PRECO_DESDE_TEXTO} por mês — cerca de {(PLANOS[0].preco / 30).toFixed(2).replace(".", ",")} € por dia. Menos do que o café e o pastel que pagas a quem vem esperar por uma hora que afinal já estava dada.
              </p>
            </div>
            <div className="mt-8">
              <a href={SITE.demoCliente} target="_blank" rel="noopener" className="btn-glow inline-flex items-center gap-2 px-7 py-4 text-sm font-bold uppercase tracking-wide rounded-sm" style={{ backgroundColor: "var(--cv-ink)", color: "#fff", borderRadius: 100 }}>
                Experimentar a demonstração <ArrowRight size={16} />
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Perguntas sobre o preco */}
      <section className="bg-white py-20 px-6 lg:px-12">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <p className="text-xs uppercase tracking-[0.25em] font-bold text-ink-3 mb-2">Sobre o preço</p>
            <h2 className="font-heading text-3xl text-ink mb-8">Perguntas frequentes</h2>
            <div className="space-y-3">
              {PERGUNTAS.map((p) => (
                <details key={p.q} className="p-4 rounded-xl bg-light border border-linha group cursor-pointer">
                  <summary className="text-ink font-bold text-sm flex items-center justify-between gap-4">
                    <span>{p.q}</span>
                    <span className="text-[#8A6D0A] group-open:rotate-180 transition-transform">↓</span>
                  </summary>
                  <p className="text-ink-2 text-sm mt-3 leading-relaxed">{p.a}</p>
                </details>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <CtaSection title="Zero comissões. Experimenta primeiro." buttonText="Experimentar a demonstração" href={SITE.demoCliente} secondaryText="ou fala connosco" />
    </div>
  );
}
