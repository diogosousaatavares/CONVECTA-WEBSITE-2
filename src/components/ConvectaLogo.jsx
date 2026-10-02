import React from "react";

/*
 * O logotipo.
 *
 * 02/10/2026: passou a ser a marca nova — simbolo e palavra, lado a lado,
 * com o amarelo #ffe45f. A versao antiga ficou em /brand/convecta-logo-novo*
 * e ja nao e usada em lado nenhum.
 *
 * Os ficheiros tem fundo transparente: funcionam tanto no #FBFAF8 do site
 * como por cima de uma fotografia. O `light` e para fundo escuro, onde a
 * palavra passa a branca — nao se inverte a imagem a mao, que tornava o
 * amarelo azul.
 *
 * O width e o height sao os do ficheiro, e nao uma decoracao: sem eles o
 * navegador nao sabe o espaco a reservar e a pagina salta quando a imagem
 * chega.
 */
const ESCURO = "/brand/convecta-marca.png";
const CLARO = "/brand/convecta-marca-claro.png";

export default function ConvectaLogo({ light = false, size = "default" }) {
  // Mais baixo no telemovel: a marca nova e mais larga do que a palavra
  // sozinha, e a 36px nao sobrava espaco para o menu ao lado.
  const altura = size === "small" ? "h-6" : "h-7 md:h-8";
  return (
    <img
      src={light ? CLARO : ESCURO}
      alt="Convecta"
      width="1214"
      height="200"
      className={`${altura} w-auto`}
    />
  );
}
