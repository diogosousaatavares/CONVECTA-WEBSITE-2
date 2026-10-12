import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

/*
 * DOIS TIPOS NO MESMO ESPAÇO (12/10/2026).
 *
 * Uma barbearia e um salão na mesma loja. Em vez de uma tabela de contas,
 * mostra-se o que é, com os ícones das apps: a app da barbearia + a app do
 * salão = uma só app de gestão, com o segundo tipo a metade. Os ícones são
 * de clientes a sério (Rasta Village e Salão Bela), em public/dois-tipos/.
 */
const entrada = i => ({
  initial: { opacity: 0, y: 18, scale: 0.94 },
  whileInView: { opacity: 1, y: 0, scale: 1 },
  viewport: { once: true },
  transition: { duration: 0.5, delay: 0.12 * i, ease: [0.16, 1, 0.3, 1] },
});

function Icone({ src, nome, legenda, i }) {
  return (
    <motion.figure className="dt-app" {...entrada(i)}>
      <img className="dt-icone" src={src} alt={`Ícone da app ${nome}`} width="512" height="512" loading="lazy" />
      <figcaption><b>{nome}</b><span>{legenda}</span></figcaption>
    </motion.figure>
  );
}

export default function DoisTipos() {
  return (
    <section id="misto" className="dt" aria-labelledby="dt-titulo">
      <p className="cv-olho" style={{ textAlign: "center", marginBottom: 12 }}>Dois tipos no mesmo espaço</p>
      <h3 id="dt-titulo" className="cv-h2 dt-titulo">
        Barbearia + salão = <span className="cv-marca">uma app de gestão.</span>
      </h3>

      <div className="dt-conta">
        <Icone src="/dois-tipos/barbearia.png" nome="Barbearia" legenda="a app dos cortes" i={0} />
        <motion.span className="dt-sinal" aria-hidden="true" {...entrada(1)}>+</motion.span>
        <Icone src="/dois-tipos/salao.png" nome="Salão" legenda="a app da estética" i={2} />
        <motion.span className="dt-sinal" aria-hidden="true" {...entrada(3)}>=</motion.span>
        <motion.figure className="dt-app dt-resultado" {...entrada(4)}>
          <img className="dt-icone" src="/dois-tipos/convecta.png" alt="Ícone da app Convecta" width="512" height="512" loading="lazy" />
          <figcaption><b>1 app de gestão</b><span>dois tipos, uma conta</span></figcaption>
        </motion.figure>
      </div>

      <p className="cv-texto dt-texto">
        O site tem duas frentes — o cliente escolhe se vem ao barbeiro ou ao salão.<br />
        No painel geres cada lado à parte, com a mesma conta, e o plano vale por área: no Essencial, 1 barbeiro e 1 esteticista.
      </p>
      <div style={{ textAlign: "center", marginTop: 26 }}>
        <Link to="/comecar?tipo=misto" className="dt-cta">Criar a conta com dois tipos <ArrowRight size={18} /></Link>
      </div>
    </section>
  );
}
