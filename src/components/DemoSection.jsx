import React from "react";
import { ArrowRight, Smartphone, LayoutDashboard } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import AmbientParticles from "@/components/AmbientParticles";
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
    <section id="demonstracao" style={{ backgroundColor: "#0d0d0d" }} className="relative overflow-hidden py-16 lg:py-28 border-t border-white/5">
      <AmbientParticles count={6} />
      <div className="max-w-6xl mx-auto px-6 lg:px-12 relative">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center mb-10 lg:mb-14">
            <span className="inline-block text-[11px] font-bold uppercase tracking-[0.18em] mb-4"
              style={{ color: "#fee96d" }}>
              Demonstração ao vivo · sem registo · sem cartão
            </span>
            <h2 className="font-heading text-3xl lg:text-5xl text-white mb-5 leading-tight">
              Experimenta as marcações online agora, com as tuas próprias mãos
            </h2>
            <p className="text-sm lg:text-lg text-white/55 leading-relaxed">
              Não é um vídeo nem uma apresentação. É a Convecta a funcionar, numa barbearia de
              demonstração aberta a toda a gente. Marca uma consulta como cliente, e depois vê-a
              chegar ao painel do barbeiro.
            </p>
          </div>
        </ScrollReveal>

        {/* Os tres passos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 mb-10 lg:mb-14">
          {PASSOS.map((p, i) => (
            <ScrollReveal key={p.n} delay={i * 0.1} variant="fadeInUp">
              <div className="h-full rounded-2xl p-6 lg:p-7"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div className="font-heading text-4xl mb-3" style={{ color: "#fee96d", lineHeight: 1 }}>{p.n}</div>
                <h3 className="font-heading text-lg lg:text-xl text-white mb-2">{p.t}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{p.d}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* As duas portas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 max-w-4xl mx-auto">
          <ScrollReveal variant="fadeInUp">
            <a href={DEMO_CLIENTE_URL} target="_blank" rel="noopener"
              className="group flex items-center gap-5 rounded-2xl p-6 lg:p-7 transition-transform hover:-translate-y-0.5"
              style={{ background: "#fee96d", color: "#1a1a1a" }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(26,26,26,0.1)" }}>
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
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(254,233,109,0.35)", color: "#fff" }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(254,233,109,0.12)", color: "#fee96d" }}>
                <LayoutDashboard size={22} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-white/45">O outro lado</div>
                <div className="font-heading text-xl lg:text-2xl leading-tight">Entrar como barbeiro</div>
                <div className="text-sm text-white/55 mt-1">O painel de gestão: agenda, caixa, clientes, relatórios.</div>
              </div>
              <ArrowRight size={22} className="shrink-0 transition-transform group-hover:translate-x-1" style={{ color: "#fee96d" }} />
            </a>
          </ScrollReveal>
        </div>

        <ScrollReveal>
          <p className="text-center text-xs text-white/35 mt-8 max-w-xl mx-auto leading-relaxed">
            É uma barbearia partilhada: quem estiver a experimentar ao mesmo tempo vê as marcações uns dos
            outros. Os dados voltam ao início de hora a hora. Pedimos-te o nome e um contacto à entrada —
            é só para falarmos contigo depois.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
