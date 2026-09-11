import React from "react";
import { Helmet } from "react-helmet-async";
import { SITE, grafoLd } from "@/lib/seo";

/*
 * A cabeca de cada pagina.
 *
 * Titulo, descricao, endereco canonico, cartao do WhatsApp/Facebook (Open
 * Graph), cartao do X e os dados estruturados. Cada pagina diz o que e; o
 * resto vem daqui, sempre igual.
 *
 * titulo:     o titulo da pagina. Leva " | Convecta" no fim, a nao ser que
 *             ja diga Convecta (a pagina inicial diz).
 * descricao:  a frase por baixo do titulo no Google. Ate ~155 caracteres.
 * caminho:    "/precos". Vira o canonical e o og:url.
 * ld:         blocos schema.org (objetos), juntos num @graph.
 * noindex:    paginas que nao interessa o Google mostrar (a do Instagram).
 */
export default function Seo({ titulo, descricao = SITE.descricao, caminho = "/", imagem = SITE.imagem, tipo = "website", ld = [], noindex = false }) {
  const tituloCompleto = /convecta/i.test(titulo) ? titulo : `${titulo} | Convecta`;
  const url = `${SITE.url}${caminho === "/" ? "" : caminho}`;
  const blocos = Array.isArray(ld) ? ld : [ld];

  return (
    <Helmet>
      <html lang="pt-PT" />
      <title>{tituloCompleto}</title>
      <meta name="description" content={descricao} />
      <link rel="canonical" href={url} />
      <meta name="robots" content={noindex ? "noindex, follow" : "index, follow, max-image-preview:large"} />

      <meta property="og:type" content={tipo} />
      <meta property="og:site_name" content={SITE.nome} />
      <meta property="og:locale" content="pt_PT" />
      <meta property="og:title" content={tituloCompleto} />
      <meta property="og:description" content={descricao} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={imagem} />
      <meta property="og:image:secure_url" content={imagem} />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content={String(SITE.imagemLargura)} />
      <meta property="og:image:height" content={String(SITE.imagemAltura)} />
      <meta property="og:image:alt" content="Convecta — marcações online para barbearias" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={tituloCompleto} />
      <meta name="twitter:description" content={descricao} />
      <meta name="twitter:image" content={imagem} />
      <meta name="twitter:image:alt" content="Convecta — marcações online para barbearias" />

      {blocos.length > 0 && (
        <script type="application/ld+json">{JSON.stringify(grafoLd(...blocos))}</script>
      )}
    </Helmet>
  );
}
