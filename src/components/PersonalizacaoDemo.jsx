import React from "react";
import { Bell, Palette, Smartphone, BarChart3, MessageCircle, Check } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import BotaoComecar from "@/components/BotaoComecar";

/*
 * A app da barbearia, num telemóvel, a sério — e ao lado dela o que vem
 * incluído.
 *
 * Era o editor inteiro do painel numa moldura grande e escura. Quem chega a
 * convecta.pt não quer um editor: quer ver a app e perceber, em dois
 * segundos, que a pode pintar como quiser. Ficou só o telemóvel, e por cima
 * dele o interruptor «Tocar para mudar».
 *
 * À direita vive agora o que estava na secção seguinte, em texto. Eram três
 * capturas de ecrã grandes, uma por baixo da outra, a dizer o mesmo que uma
 * linha diz — e deixavam meia página em branco ao lado do telemóvel.
 *
 * O `?so=telemovel` é o mesmo código do painel a desenhar só essa parte, por
 * isso continua a não poder ficar diferente do que o barbeiro vai ter. Não
 * grava nada.
 */
const DEMO = "https://administrador.marcacoes.app/personalizar?so=telemovel";

const INCLUIDO = [
  { I: Bell, t: "O telemóvel toca a cada marcação", d: "No segundo em que o cliente marca, com o nome, o serviço e a hora." },
  { I: Palette, t: "O design é teu", d: "Cores, tipografia, logótipo e capa. Mudas tu, no painel, quando quiseres." },
  { I: Smartphone, t: "Fica no ecrã principal", d: "A tua e a dos teus clientes. Sem lojas de aplicações." },
  { I: BarChart3, t: "Relatórios", d: "Receita, ocupação, serviços e Excel para o contabilista." },
  { I: MessageCircle, t: "Avisos antes do corte", d: "No telemóvel do cliente, ou email. Sem custo por mensagem." },
  { I: Check, t: "E o resto todo", d: "Agenda, clientes, caixa, comissões, produtos, stock, fidelização." },
];

export default function PersonalizacaoDemo() {
  return (
    <section id="personalizacao" className="cv-wrap cv-sec">
      <ScrollReveal>
        <p className="cv-olho">Personalização</p>
        <h2 className="cv-h2">A app é da tua barbearia. <span className="cv-marca">Não é nossa.</span></h2>
      </ScrollReveal>

      <div className="pd-grelha">
        {/* Sem moldura, sem fundo e sem sombra: o telemóvel já tem a dele. */}
        <iframe className="pd-telemovel" src={DEMO} scrolling="no"
          title="A app da barbearia, para experimentar" loading="lazy" />

        <ScrollReveal variant="fadeInUp">
          <div className="pd-lado">
            <h3 className="cv-h2" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", marginBottom: 10 }}>
              Tudo isto. Em qualquer plano.
            </h3>
            <p className="cv-texto" style={{ marginBottom: 26 }}>
              Não há versão reduzida nem módulos à parte. O plano só muda quantos profissionais tens.
            </p>
            <ul className="pd-itens">
              {INCLUIDO.map(({ I, t, d }) => (
                <li className="pd-item" key={t}>
                  <span className="at-ico"><I size={18} strokeWidth={1.7} /></span>
                  <span>
                    <strong className="pd-item-t">{t}</strong>
                    <span className="pd-item-d">{d}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>
      </div>

      <div className="pd-fim">
        <BotaoComecar origem="personalizacao">Quero a minha</BotaoComecar>
        <span>O que mudares aqui não fica gravado. No teu painel, fica.</span>
      </div>
    </section>
  );
}
