/*
 * Pre-renderizacao das paginas do site.
 *
 * Corre depois do `vite build` (ver "build" no package.json):
 *   1. `vite build` faz o site normal para dist/ (com dist/index.html vazio);
 *   2. `vite build --ssr` faz uma versao de src/entry-server.jsx para Node;
 *   3. este script desenha cada rota em HTML e grava dist/<rota>.html.
 *
 * O dist/index.html original fica guardado como dist/app.html: e a "casca"
 * vazia que o Vercel entrega a qualquer caminho desconhecido (vercel.json),
 * para o React mostrar a pagina de 404.
 *
 * Se alguma coisa falhar aqui, o build falha — e o Vercel mantem no ar a
 * versao anterior. Nunca publica um site meio feito.
 */
import { readFile, writeFile, rm, mkdir, cp } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const raiz = process.cwd();
const dist = path.join(raiz, process.env.DIST_DIR || "dist");
const distSsr = path.join(raiz, process.env.DIST_SSR_DIR || "dist-ssr");

// As paginas reais do site. As rotas de redirecionamento e a de 404 nao
// entram: nao ha nada nelas para o Google ler.
const ROTAS = [
  "/",
  "/funcionalidades",
  "/como-funciona",
  "/precos",
  "/comecar",
  "/faq",
  "/contacto",
  "/instagram",
  "/privacidade",
  "/termos",
];

const modelo = await readFile(path.join(dist, "index.html"), "utf8");
if (!modelo.includes("<!-- seo:default -->") || !modelo.includes("<!-- /seo:default -->")) {
  throw new Error("index.html sem os marcadores <!-- seo:default --> … <!-- /seo:default -->");
}
if (!modelo.includes('<div id="root"></div>')) {
  throw new Error('index.html sem <div id="root"></div>');
}

const { render } = await import(pathToFileURL(path.join(distSsr, "entry-server.js")).href);

// A casca vazia para caminhos desconhecidos (404 desenhado pelo React).
await writeFile(path.join(dist, "app.html"), modelo, "utf8");

/*
 * A pagina de 404, desenhada de verdade e gravada como dist/404.html.
 *
 * Antes, o vercel.json mandava qualquer endereco desconhecido para
 * app.html — e o Vercel respondia 200. Para o Google isso e um "soft 404":
 * uma pagina que diz "nao existe" mas se anuncia como valida, e que ele
 * acaba por indexar. Com um 404.html no dist, o Vercel devolve o estado
 * 404 a serio.
 */
{
  const { html, helmet } = await render("/nao-existe");
  const cabeca = [helmet.title.toString(), helmet.meta.toString(), helmet.link.toString()].join("\n  ");
  const pagina = modelo
    .replace(/<!-- seo:default -->[\s\S]*?<!-- \/seo:default -->/, cabeca)
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`);
  await writeFile(path.join(dist, "404.html"), pagina, "utf8");
  console.log("  pre-renderizado 404 → dist/404.html");
}

for (const rota of ROTAS) {
  const { html, helmet } = await render(rota);
  if (!html || html.length < 500) throw new Error(`Rota ${rota} desenhou HTML vazio`);
  if (!helmet) throw new Error(`Rota ${rota} sem <head> (Helmet)`);

  const cabeca = [
    helmet.title.toString(),
    helmet.meta.toString(),
    helmet.link.toString(),
    helmet.script.toString(),
  ].join("\n  ");

  let pagina = modelo
    .replace(/<!-- seo:default -->[\s\S]*?<!-- \/seo:default -->/, cabeca)
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`);

  const atributosHtml = helmet.htmlAttributes.toString();
  if (atributosHtml) pagina = pagina.replace('<html lang="pt-PT">', `<html ${atributosHtml}>`);

  const ficheiro = rota === "/" ? "index.html" : `${rota.slice(1)}.html`;
  await writeFile(path.join(dist, ficheiro), pagina, "utf8");
  console.log(`  pre-renderizado ${rota} → dist/${ficheiro} (${(pagina.length / 1024).toFixed(0)} KB)`);
}

await rm(distSsr, { recursive: true, force: true });
console.log("✓ pré-renderização concluída");
