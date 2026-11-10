import React from "react";
import { Link } from "react-router-dom";
import { Check, X } from "lucide-react";
import Seo from "@/components/Seo";
import PricingSection from "@/components/PricingSection";
import ScrollReveal from "@/components/ScrollReveal";
import CtaSection from "@/components/CtaSection";
import BotaoComecar from "@/components/BotaoComecar";
import { migalhasLd, faqLd, softwareLd } from "@/lib/seo";
import BarraComecarFixa from "@/components/BarraComecarFixa";

/*
 * Precos.
 *
 * Tres planos, escritos em lib/seo.js. Esta pagina explica o que eles
 * incluem, o que nao incluem, e o que custa nao ter marcacoes online — que
 * e a comparacao que interessa a quem esta a decidir.
 */

const INCLUI = [
  "Site de marcações online com endereço próprio (o-teu-negocio.marcacoes.app)",
  "Painel de gestão para o telemóvel, tablet e computador",
  "Controlo total do design: cores, tipografia, logótipo, capa e galeria, mudados por ti no painel",
  "Notificações no telemóvel: tuas a cada marcação, do cliente a cada confirmação",
  "Cartão de fidelidade digital, caixa, comissões, stock, relatórios",
  "Excel mensal para o contabilista",
  "Alojamento e atualizações, sem custos extra",
  "Suporte por telefone e WhatsApp, em dias úteis",
];

const NAO_INCLUI = [
  "Funcionalidades extra que não precisas — o preço é feito com o que usas",
  "Um domínio próprio (o teu endereço em marcacoes.app está incluído)",
  "Gestão de redes sociais, publicidade ou produção de conteúdos",
];

const PERGUNTAS = [
  { q: "Porque é que não há preços na página?", a: "Porque não há duas barbearias iguais. O preço depende de quantos profissionais são e do que precisas — pagamentos online, website, gestão da equipa. Deixa o contacto e fazemos-te uma proposta à medida, sem compromisso." },
  { q: "E se a minha equipa crescer?", a: "Ajustamos o plano e continuas com os mesmos dados, a mesma agenda e o mesmo endereço. Não se recomeça nada." },
  { q: "Há comissões por marcação?", a: "Não. Zero. Cada marcação que entra é tua por inteiro. A Convecta ganha a mensalidade e mais nada." },
  { q: "Há fidelização ou período mínimo?", a: "No pagamento mensal não: cancelas quando quiseres. Se escolheres pagar o ano de uma vez, o compromisso é de doze meses — é o que paga o desconto. Se saíres, os teus dados são apagados a pedido." },
  { q: "Como se paga?", a: "Por mês ou por ano, com fatura. Os primeiros 14 dias são à experiência, sem cartão. Depois, pela Stripe: registas o cartão no painel e só aí começa a cobrança." },
  { q: "O preço inclui IVA?", a: "O preço da proposta é o que pagas. A Convecta está no regime de isenção de IVA (artigo 53.º do CIVA), por isso a fatura não acresce IVA — vem com a menção «IVA – regime de isenção»." },
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
        titulo="Preços — à medida da tua barbearia, sem comissões por marcação"
        descricao="O preço da Convecta é feito à medida de cada barbearia: depende de quantos profissionais são e do que precisas. Sem taxa de adesão, sem comissões por marcação e 14 dias grátis, sem cartão. Pede a tua proposta."
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
                      <span className="w-5 h-5 rounded-full bg-[var(--cv-amarelo)] flex items-center justify-center shrink-0 mt-0.5"><Check size={12} strokeWidth={3} color="#111" /></span>
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
            <p className="text-xs uppercase tracking-[0.25em] font-bold text-[var(--cv-amarelo-texto)] mb-4">Contas de quem trabalha</p>
            <h2 className="font-heading text-3xl lg:text-5xl text-ink mb-6 leading-tight">Quanto custa não ter marcações online?</h2>
            <div className="space-y-5 text-ink-2 text-base leading-relaxed">
              <p>
                Um corte de 15 € que fica por marcar porque o cliente escreveu no WhatsApp às 22h e tu só viste de manhã — e ele entretanto foi a outro lado — custa 15 €. Uma hora marcada duas vezes por engano, um cliente que apareceu e outro que teve de esperar, custa mais do que dinheiro.
              </p>
              <p>
                Nas plataformas de marcações que cobram comissão, cada cliente novo pode ficar-lhes com 20 % ou mais do serviço, e o cliente é "delas": vê a concorrência ao lado do teu negócio. Na Convecta, a mensalidade é fixa, o site é o do teu negócio, e o cliente é teu.
              </p>
              <p>
                A Convecta tem uma mensalidade fixa, feita à medida do que a tua barbearia precisa — e paga-se com as marcações que deixas de perder.
              </p>
            </div>
            <div className="mt-8">
              <BotaoComecar grande>Começar grátis</BotaoComecar>
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
                    <span className="text-[var(--cv-amarelo-texto)] group-open:rotate-180 transition-transform">↓</span>
                  </summary>
                  <p className="text-ink-2 text-sm mt-3 leading-relaxed">{p.a}</p>
                </details>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <CtaSection title="Zero comissões. Começa hoje, sem cartão." buttonText="Começar grátis" to="/comecar" secondaryText="ou fala connosco" />

      {/* No telemóvel esta página tem dez ecrãs: o botão tem de
          voltar sozinho quando o de cima já saiu de vista. */}
      <BarraComecarFixa />
    </div>
  );
}
