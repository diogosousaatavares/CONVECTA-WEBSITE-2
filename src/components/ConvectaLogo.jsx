import React from "react";

/*
 * O logotipo.
 *
 * O ficheiro original tem o texto a branco: foi feito para fundo preto e num
 * fundo claro desaparece — fica so o C amarelo. Com o site a passar a branco,
 * a versao escura passa a ser a normal; a clara fica para quando houver
 * mesmo um fundo escuro por tras.
 */
const ESCURO = "/brand/convecta-logo-novo.png";
const CLARO = "/brand/convecta-logo-novo-claro.png";

export default function ConvectaLogo({ light = false, size = "default" }) {
  const altura = size === "small" ? "h-7" : "h-9";
  return (
    <img
      src={light ? CLARO : ESCURO}
      alt="Convecta"
      className={`${altura} w-auto`}
    />
  );
}
