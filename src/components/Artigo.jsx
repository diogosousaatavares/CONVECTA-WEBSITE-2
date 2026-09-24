import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Minus } from "lucide-react";
import Seo from "@/components/Seo";
import CtaSection from "@/components/CtaSection";
import BotaoComecar from "@/components/BotaoComecar";
import BarraComecarFixa from "@/components/BarraComecarFixa";
import { SITE, migalhasLd, faqLd, softwareLd } from "@/lib/seo";

/*
 * A pagina de texto longo do site: pilar, funcionalidades, comparacoes,
 * blog e "Sobre".
 *
 * O conteudo vem de src/conteudo/*.js como uma lista de blocos simples
 * (h2, p, ul, tabela, faq, aviso, ligacoes, citar). Esta pagina so os
 * desenha. Tudo o que aqui aparece tem de ser verdade hoje — e o que e sobre
 * concorrentes leva a data em que foi verificado e o link para a fonte.
 *
 * Datas: `atualizado` (YYYY-MM-DD) aparece visivel e vai para o schema. Uma
 * pagina de precos ou de comparacao sem data e uma pagina em que ninguem
 * confia — nem o Google, nem uma IA, nem um barbeiro.
 */

const dataPt = (iso) => {
  if (!iso) return "";
  const [a, m, d] = iso.split("-").map(Number);
  const meses = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
  return `${d} de ${meses[m - 1]} de ${a}`;
};

// Texto com **negrito** e [links](/caminho) — o suficiente para nao escrever JSX
// em cada paragrafo. Links externos abrem noutro separador.
export function Rico({ texto }) {
  const partes = String(texto).split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g).filter(Boolean);
  return partes.map((p, i) => {
    if (p.startsWith("**")) return <strong key={i} className="text-ink font-semibold">{p.slice(2, -2)}</strong>;
    const m = p.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (m) {
      const [, rotulo, href] = m;
      if (/^https?:/.test(href)) return <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 text-ink">{rotulo}</a>;
      return <Link key={i} to={href} className="underline underline-offset-2 text-ink">{rotulo}</Link>;
    }
    return <React.Fragment key={i}>{p}</React.Fragment>;
  });
}

function Celula({ v }) {
  // "Sim"/"Não" sem icones de certo/errado: numa comparacao, "Sim" em
  // "cliente ve outras barbearias" nao e uma coisa boa — e um facto.
  if (v === true) return <span className="text-ink font-semibold">Sim</span>;
  if (v === false) return <span className="text-ink-3">Não</span>;
  if (v === null || v === undefined || v === "") return <span className="text-ink-3"><Minus size={14} /></span>;
  return <Rico texto={v} />;
}

function Bloco({ b }) {
  switch (b.tipo) {
    case "h2":
      return <h2 className="font-heading text-2xl lg:text-4xl text-ink leading-tight mt-14 mb-5" id={b.id}>{b.texto}</h2>;
    case "h3":
      return <h3 className="font-heading text-xl lg:text-2xl text-ink leading-tight mt-9 mb-3">{b.texto}</h3>;
    case "p":
      return <p className="text-ink-2 text-base lg:text-[1.05rem] leading-[1.8] mb-5"><Rico texto={b.texto} /></p>;
    case "ul":
      return (
        <ul className="mb-6 space-y-2.5">
          {b.itens.map((t, i) => (
            <li key={i} className="flex items-start gap-3 text-ink-2 leading-relaxed">
              <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-[var(--cv-amarelo)] shrink-0" style={{ boxShadow: "0 0 0 3px rgba(254,233,109,0.25)" }} />
              <span><Rico texto={t} /></span>
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="mb-6 space-y-3 list-none">
          {b.itens.map((t, i) => (
            <li key={i} className="flex items-start gap-4 text-ink-2 leading-relaxed">
              <span className="font-heading text-lg text-ink w-7 shrink-0 tabular-nums">{i + 1}.</span>
              <span><Rico texto={t} /></span>
            </li>
          ))}
        </ol>
      );
    case "tabela":
      return (
        <div className="my-7 overflow-x-auto rounded-2xl border border-linha bg-white" style={{ WebkitOverflowScrolling: "touch" }}>
          <table className="w-full text-sm" style={{ minWidth: b.minLargura || 520 }}>
            <caption className="text-left text-xs text-ink-3 px-4 pt-3 pb-1 caption-top">{b.legenda}{b.legenda ? " " : ""}<span className="sm:hidden">Desliza para o lado para ver tudo →</span></caption>
            <thead>
              <tr className="bg-light">
                {b.cabecalho.map((c, i) => <th key={i} className={`text-left font-bold text-ink px-4 py-3 ${i === 0 ? "" : "whitespace-nowrap"}`}>{c}</th>)}
              </tr>
            </thead>
            <tbody>
              {b.linhas.map((l, i) => (
                <tr key={i} className="border-t border-linha align-top">
                  {l.map((c, j) => <td key={j} className={`px-4 py-3 text-ink-2 leading-relaxed ${j === 0 ? "font-semibold text-ink" : ""}`}><Celula v={c} /></td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "aviso":
      return (
        <div className="my-7 p-5 rounded-2xl border border-linha bg-light">
          {b.titulo && <p className="text-xs uppercase tracking-[0.2em] font-bold text-ink-3 mb-2">{b.titulo}</p>}
          <p className="text-ink-2 text-sm leading-relaxed m-0"><Rico texto={b.texto} /></p>
        </div>
      );
    case "citar":
      return (
        <blockquote className="my-8 pl-5 border-l-2 border-[var(--cv-amarelo)] text-ink text-lg lg:text-xl font-heading leading-snug">
          <Rico texto={b.texto} />
        </blockquote>
      );
    case "faq":
      return (
        <div className="my-8 space-y-3">
          {b.itens.map((p) => (
            <details key={p.q} className="p-4 rounded-xl bg-light border border-linha group">
              <summary className="text-ink font-bold text-sm flex items-center justify-between gap-4 cursor-pointer list-none">
                <span>{p.q}</span>
                <span className="text-[var(--cv-amarelo-texto)] group-open:rotate-180 transition-transform">↓</span>
              </summary>
              <p className="text-ink-2 text-sm mt-3 leading-relaxed"><Rico texto={p.a} /></p>
            </details>
          ))}
        </div>
      );
    case "ligacoes":
      return (
        <div className="my-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {b.itens.map((l) => (
            <Link key={l.caminho} to={l.caminho} className="p-4 rounded-2xl border border-linha bg-white hover:border-ink transition-colors flex items-start justify-between gap-3">
              <span>
                <span className="block text-ink font-bold text-sm">{l.titulo}</span>
                {l.texto && <span className="block text-ink-3 text-xs mt-1 leading-relaxed">{l.texto}</span>}
              </span>
              <ArrowRight size={16} className="shrink-0 mt-0.5 text-ink-3" />
            </Link>
          ))}
        </div>
      );
    case "cta":
      return (
        <div className="my-9 flex flex-wrap items-center gap-5">
          <BotaoComecar to={b.para || "/comecar"} origem="artigo">{b.texto || "Começar grátis"}</BotaoComecar>
          {b.secundario && <Link className="cv-btn-linha" to={b.secundario.caminho}>{b.secundario.texto} <ArrowRight size={14} style={{ marginLeft: 6, verticalAlign: -2 }} /></Link>}
        </div>
      );
    case "imagem":
      return (
        <figure className="my-8">
          <img src={b.src} alt={b.alt} width={b.largura} height={b.altura} loading="lazy" className="rounded-2xl border border-linha max-w-full h-auto" />
          {b.legenda && <figcaption className="text-xs text-ink-3 mt-2">{b.legenda}</figcaption>}
        </figure>
      );
    default:
      return null;
  }
}

export default function Artigo({ pagina }) {
  const { caminho, titulo, tituloSeo, descricao, olho, lead, atualizado, publicado, migalhas = [], blocos = [], faq, autor, tipo = "pagina", software = false, fecho } = pagina;
  const migalhasCompletas = [{ nome: "Início", caminho: "/" }, ...migalhas, { nome: titulo, caminho }];
  const ld = [migalhasLd(migalhasCompletas)];
  if (software) ld.push(softwareLd());
  const perguntas = faq || blocos.filter((b) => b.tipo === "faq").flatMap((b) => b.itens);
  if (perguntas.length) ld.push(faqLd(perguntas));
  if (tipo === "artigo") {
    ld.push({
      "@type": "Article",
      "@id": `${SITE.url}${caminho}#article`,
      headline: titulo,
      description: descricao,
      inLanguage: "pt-PT",
      datePublished: publicado || atualizado,
      dateModified: atualizado,
      author: { "@type": "Person", name: autor || SITE.titular, url: `${SITE.url}/sobre` },
      publisher: { "@id": `${SITE.url}/#organization` },
      mainEntityOfPage: `${SITE.url}${caminho}`,
      image: SITE.imagem,
    });
  }
  if (tipo === "sobre") {
    ld.push({ "@type": "AboutPage", "@id": `${SITE.url}${caminho}#about`, url: `${SITE.url}${caminho}`, name: titulo, about: { "@id": `${SITE.url}/#organization` } });
  }

  return (
    <div className="pt-24" style={{ backgroundColor: "var(--cv-ground)" }}>
      <Seo titulo={tituloSeo || titulo} descricao={descricao} caminho={caminho} ld={ld} tipo={tipo === "artigo" ? "article" : "website"} />

      <header className="cv-wrap" style={{ paddingTop: 40, paddingBottom: 36 }}>
        <nav aria-label="Migalhas" className="text-xs text-ink-3 mb-6 flex flex-wrap gap-1.5">
          {migalhasCompletas.map((m, i) => (
            <React.Fragment key={m.caminho}>
              {i > 0 && <span aria-hidden="true">/</span>}
              {i < migalhasCompletas.length - 1 ? <Link to={m.caminho} className="hover:text-ink">{m.nome}</Link> : <span className="text-ink-2">{m.nome}</span>}
            </React.Fragment>
          ))}
        </nav>
        {olho && <p className="cv-olho">{olho}</p>}
        <h1 className="cv-h1" style={{ maxWidth: "20ch" }}>{titulo}</h1>
        {lead && <p className="cv-texto" style={{ margin: "22px 0 0", maxWidth: "62ch", fontSize: "1.1rem" }}><Rico texto={lead} /></p>}
        {(atualizado || autor) && (
          <p className="text-xs text-ink-3 mt-6">
            {autor && <>Por <Link to="/sobre" className="underline underline-offset-2">{autor}</Link>{atualizado ? " · " : ""}</>}
            {atualizado && <>Atualizado a <time dateTime={atualizado}>{dataPt(atualizado)}</time></>}
          </p>
        )}
      </header>

      <article className="bg-white border-t border-linha">
        <div className="cv-wrap" style={{ paddingTop: 20, paddingBottom: 72 }}>
          <div className="max-w-3xl">
            {blocos.map((b, i) => <Bloco key={i} b={b} />)}
          </div>
        </div>
      </article>

      <CtaSection title={fecho?.titulo || "Marcações online para a tua barbearia. Sem comissões, sem cartão para começar."} buttonText={fecho?.botao || "Começar grátis"} to="/comecar" secondaryText="ou fala connosco" secondaryWhatsApp />
      <BarraComecarFixa />
    </div>
  );
}
