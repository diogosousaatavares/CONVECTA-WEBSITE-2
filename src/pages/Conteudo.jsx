import React from "react";
import { useLocation } from "react-router-dom";
import Artigo from "@/components/Artigo";
import PageNotFound from "@/components/PaginaNaoEncontrada";
import { PAGINAS } from "@/conteudo/paginas";
import { ARTIGOS, BLOG_INDICE } from "@/conteudo/blog";

/*
 * Uma pagina de conteudo: encontra o objeto pelo caminho e desenha-o com o
 * Artigo. As rotas estao em App.jsx (uma por caminho, para o Router e a
 * pre-renderizacao saberem que existem) e em scripts/prerender.mjs.
 */
export const TODAS = [...PAGINAS, ...ARTIGOS, BLOG_INDICE];
export const CAMINHOS = TODAS.map((p) => p.caminho);

export default function Conteudo() {
  const { pathname } = useLocation();
  const caminho = pathname.replace(/\/+$/, "") || "/";
  const pagina = TODAS.find((p) => p.caminho === caminho);
  if (!pagina) return <PageNotFound />;
  return <Artigo key={caminho} pagina={pagina} />;
}
