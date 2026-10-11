import React from "react";
import { motion } from "framer-motion";
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

const INCLUIDO = [
  { I: Bell, t: "O telemóvel toca a cada marcação" },
  { I: Palette, t: "O design é teu" },
  { I: Smartphone, t: "Fica no ecrã principal" },
  { I: BarChart3, t: "Relatórios e Excel" },
  { I: MessageCircle, t: "Avisos antes da marcação" },
  { I: Check, t: "Agenda, caixa, comissões, stock" },
];

/*
 * 11/10/2026: a demonstração ao vivo (um iframe com o painel inteiro) saiu —
 * carregava a app toda dentro do site e pesava mais do que a página. E a
 * lista com frases pequenas por baixo de cada título também: seis cartões,
 * um título cada, a entrar um a um. O que cada coisa faz está em
 * /funcionalidades, para quem quiser ler.
 */
const entrada = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  show: i => ({ opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, delay: 0.08 * i, ease: [0.16, 1, 0.3, 1] } }),
};

export default function PersonalizacaoDemo() {
  return (
    <section id="personalizacao" className="cv-wrap cv-sec">
      <ScrollReveal>
        <p className="cv-olho">Personalização</p>
        <h2 className="cv-h2">A app é do teu negócio. <span className="cv-marca">Não é nossa.</span></h2>
        <p className="cv-texto pd-sub">Tudo isto, em qualquer plano. O plano só muda quantos profissionais tens.</p>
      </ScrollReveal>

      <ul className="pd-cartoes">
        {INCLUIDO.map(({ I, t }, i) => (
          <motion.li className="pd-cartao" key={t} custom={i}
            variants={entrada} initial="hidden" whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300, damping: 24 }}>
            <span className="pd-cartao-ico"><I size={22} strokeWidth={1.8} /></span>
            <span className="pd-cartao-t">{t}</span>
          </motion.li>
        ))}
      </ul>

      <div className="pd-fim">
        <BotaoComecar origem="personalizacao">Quero a minha</BotaoComecar>
      </div>
    </section>
  );
}
