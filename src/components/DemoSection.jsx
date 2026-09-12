import React from "react";
import { ArrowRight, Smartphone, LayoutDashboard } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { DEMO_CLIENTE_URL, DEMO_PAINEL_URL } from "@/lib/demo";

/*
 * A seccao da demonstracao.
 *
 * O que vende nao e o painel bonito nem a app bonita: e um cliente marcar no
 * telemovel e a marcacao aparecer no painel do barbeiro dois segundos depois.
 * Por isso a seccao nao descreve funcionalidades — descreve esse percurso, em
 * tres passos, e poe a porta ao lado.
 *
 * Dois botoes de proposito. Quem le como dono de barbearia quer ver o painel;
 * quem quer perceber "o que os meus clientes vao ver" quer a app. Um botao so
 * obrigava a escolher por eles.
 */
const PASSOS = [
  { n: "1", t: "Marca como cliente", d: "Abre a app, escolhe o serviço, o barbeiro e a hora. Três toques." },
  { n: "2", t: "Vê chegar ao painel", d: "A marcação entra na agenda do barbeiro nesse segundo, com aviso no telemóvel." },
  { n: "3", t: "Confirma, cobra, carimba", d: "Confirmas em dois toques, fechas a conta no checkout e o cartão de fidelidade ganha um carimbo." },
];

export default function DemoSection() {
  return (
    <section id="demonstracao" style={{ backgroundColor: "var(--cv-ground)", borderTop: "1px solid var(--cv-linha)" }} className="relative overflow-hidden py-16 lg:py-28">
      <div className="cv-wrap relative">
        <ScrollReveal>
          <div className="mb-10 lg:mb-14">
            <p className="cv-olho">Demonstração ao vivo · sem registo</p>
            <h2 className="cv-h2">Experimenta agora, com as tuas mãos.</h2>
            <p className="cv-texto" style={{ marginTop: 16 }}>
              Não é um vídeo. É a Convecta a funcionar. Marca como cliente e vê a marcação
              chegar ao painel do barbeiro.
            </p>
          </div>
        </ScrollReveal>

        {/* Os tres passos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 mb-10 lg:mb-14">
          {PASSOS.map((p, i) => (
            <ScrollReveal key={p.n} delay={i * 0.1} variant="fadeInUp">
              <div className="h-full" style={{ borderTop: "1px solid var(--cv-linha)", paddingTop: 20 }}>
                <div className="font-heading mb-3" style={{ color: "var(--cv-ink-3)", fontSize: "1.6rem", lineHeight: 1 }}>{p.n}</div>
                <h3 className="cv-h3">{p.t}</h3>
                <p className="cv-mini">{p.d}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* As duas portas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 max-w-4xl mx-auto">
          <ScrollReveal variant="fadeInUp">
            <a href={DEMO_CLIENTE_URL} target="_blank" rel="noopener"
              className="group flex items-center gap-5 rounded-2xl p-6 lg:p-7 transition-transform hover:-translate-y-0.5"
              style={{ background: "var(--cv-ink)", color: "#fff", borderRadius: 18 }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(255,255,255,0.12)" }}>
                <Smartphone size={22} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[11px] font-bold uppercase tracking-[0.14em] opacity-70">Começa aqui</div>
                <div className="font-heading text-xl lg:text-2xl leading-tight">Entrar como cliente</div>
                <div className="text-sm opacity-75 mt-1">A app que os teus clientes vão usar. Marca uma consulta.</div>
              </div>
              <ArrowRight size={22} className="shrink-0 transition-transform group-hover:translate-x-1" />
            </a>
          </ScrollReveal>
          <ScrollReveal variant="fadeInUp" delay={0.1}>
            <a href={DEMO_PAINEL_URL} target="_blank" rel="noopener"
              className="group flex items-center gap-5 rounded-2xl p-6 lg:p-7 transition-transform hover:-translate-y-0.5"
              style={{ background: "var(--cv-card)", border: "1px solid var(--cv-linha)", color: "var(--cv-ink)", borderRadius: 18 }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(254,233,109,0.3)", color: "var(--cv-amarelo-texto)" }}>
                <LayoutDashboard size={22} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="cv-olho" style={{ margin: 0 }}>O outro lado</div>
                <div className="font-heading text-xl lg:text-2xl leading-tight">Entrar como barbeiro</div>
                <div className="text-sm mt-1" style={{ color: "var(--cv-ink-2)" }}>O painel de gestão: agenda, caixa, clientes, relatórios.</div>
              </div>
              <ArrowRight size={22} className="shrink-0 transition-transform group-hover:translate-x-1" style={{ color: "var(--cv-ink-3)" }} />
            </a>
          </ScrollReveal>
        </div>

        <ScrollReveal>
          <p className="text-xs mt-8 max-w-xl leading-relaxed" style={{ color: "var(--cv-ink-3)" }}>
            É uma barbearia partilhada: quem estiver a experimentar ao mesmo tempo vê as marcações uns dos
            outros. Os dados voltam ao início de hora a hora. Pedimos-te o nome e um contacto à entrada —
            é só para falarmos contigo depois.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
