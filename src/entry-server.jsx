import React from "react";
import { renderToPipeableStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { HelmetProvider } from "react-helmet-async";
import { PassThrough } from "node:stream";
import { AppShell } from "@/App";

/*
 * Entrada para a pre-renderizacao (so corre no build, nunca no browser).
 *
 * O site e uma aplicacao React: sem isto, o HTML que o servidor entrega e um
 * <div id="root"></div> vazio, e o titulo, a descricao e o cartao de partilha
 * de cada pagina so aparecem depois de o JavaScript correr. O Google ate
 * espera por isso; o WhatsApp, o Instagram e o Facebook nao — mostram o que
 * esta no HTML e mais nada.
 *
 * Aqui desenha-se cada pagina em HTML durante o build (scripts/prerender.mjs
 * chama render() por cada rota) e o browser, ao carregar, "hidrata" esse HTML
 * em vez de o desenhar do zero. A pagina aparece mais depressa e tudo o que
 * o Google le esta la desde o primeiro byte.
 */
export function render(url) {
  const helmetContext = {};
  return new Promise((resolve, reject) => {
    const pipeable = renderToPipeableStream(
      <HelmetProvider context={helmetContext}>
        <StaticRouter location={url}>
          <AppShell />
        </StaticRouter>
      </HelmetProvider>,
      {
        // Esperar por tudo — incluindo as paginas carregadas com lazy() — para
        // o HTML sair inteiro, sem os scripts de "trocar depois" do streaming.
        onAllReady() {
          const partes = [];
          const saida = new PassThrough();
          saida.on("data", (c) => partes.push(c));
          saida.on("end", () => resolve({ html: Buffer.concat(partes).toString("utf8"), helmet: helmetContext.helmet }));
          saida.on("error", reject);
          pipeable.pipe(saida);
        },
        onShellError: reject,
        onError(e) { console.error("[prerender]", url, e); },
      }
    );
  });
}
