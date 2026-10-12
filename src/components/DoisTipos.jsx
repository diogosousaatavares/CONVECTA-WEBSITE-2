import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { PLANOS, ADICIONAL_SEGUNDO_NICHO_TEXTO } from "@/lib/seo";

/*
 * DOIS TIPOS NO MESMO ESPAÇO (12/10/2026).
 *
 * Uma barbearia e um salão na mesma loja. Em vez de uma tabela de contas,
 * mostra-se o que é: a app da barbearia + a app do salão = uma só app de
 * gestão, com o segundo tipo a metade. As duas imagens são sites a sério
 * (Rasta Village e Salão Bela), em public/dois-tipos/. Sem a imagem, fica
 * um ecrã da cor da casa com o nome — nunca uma imagem partida.
 */
const LADOS = [
  { src: "/dois-tipos/barbearia.jpg", nome: "Barbearia", cor: "#1C1814" },
  { src: "/dois-tipos/salao.jpg", nome: "Salão", cor: "#A0694B" },
];

function Telemovel({ src, nome, cor, i }) {
  const [semImagem, setSemImagem] = useState(false);
  return (
    <motion.figure className="dt-tel" initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 * i }}>
      <div className="dt-ecra" style={{ background: cor }}>
        {!semImagem && <img src={src} alt={`A app de marcações de ${nome.toLowerCase()}`} loading="lazy" onError={() => setSemImagem(true)} />}
      </div>
      <figcaption>{nome}</figcaption>
    </motion.figure>
  );
}

export default function DoisTipos({ anual = false }) {
  const pl = PLANOS.find(p => p.destaque) || PLANOS[1];
  const base = anual ? pl.precoMesAnualTexto : pl.precoTexto;
  const total = anual ? pl.precoMesAnualMistoTexto : pl.precoMistoTexto;
  return (
    <section id="misto" className="dt" aria-labelledby="dt-titulo">
      <p className="cv-olho" style={{ textAlign: "center", marginBottom: 12 }}>Dois tipos no mesmo espaço</p>
      <h3 id="dt-titulo" className="cv-h2 dt-titulo">
        Barbearia + salão = <span className="cv-marca">uma app de gestão.</span>
      </h3>

      <div className="dt-conta">
        <Telemovel {...LADOS[0]} i={0} />
        <span className="dt-sinal" aria-hidden="true">+</span>
        <Telemovel {...LADOS[1]} i={1} />
        <span className="dt-sinal" aria-hidden="true">=</span>
        <motion.div className="dt-resultado" initial={{ opacity: 0, scale: 0.94 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}>
          <span className="dt-um">1</span>
          <span className="dt-app">app de gestão</span>
          <span className="dt-desconto">−50 % no segundo tipo</span>
        </motion.div>
      </div>

      <p className="cv-texto dt-texto">
        O site tem duas frentes — o cliente escolhe se vem ao barbeiro ou ao salão. No painel geres cada lado à parte,
        com a mesma conta. Pagas o teu plano mais {ADICIONAL_SEGUNDO_NICHO_TEXTO} pelo segundo tipo:
        no {pl.nome}, {base} + metade = <strong>{total}/mês</strong>.
      </p>
      <div style={{ textAlign: "center", marginTop: 18 }}>
        <Link to="/comecar" className="dt-cta">Criar a conta com dois tipos</Link>
      </div>
    </section>
  );
}
