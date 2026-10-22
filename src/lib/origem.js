/*
 * A ORIGEM DE QUEM CHEGA AO SITE (22/10/2026).
 *
 * Os links das stories, dos posts e das referências trazem utm_source,
 * utm_medium, utm_campaign e utm_content (e o ?ref= das indicações). Guarda-se
 * a PRIMEIRA origem da visita no browser (30 dias) e, quando a pessoa cria a
 * conta — hoje ou daqui a uma semana — vai no registo para
 * businesses.origem_marketing. É com isto que o super admin diz «este post
 * trouxe 3 registos e 1 cliente», lido da base de dados e não de cliques.
 */
const CHAVE = 'convecta_origem';
const CAMPOS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'ref'];

export function guardarOrigem() {
  try {
    const p = new URLSearchParams(window.location.search);
    const nova = {};
    for (const k of CAMPOS) { const v = (p.get(k) || '').trim().slice(0, 80); if (v) nova[k] = v; }
    const antiga = JSON.parse(localStorage.getItem(CHAVE) || 'null');
    const fresca = antiga && antiga.em && Date.now() - new Date(antiga.em).getTime() < 30 * 86400000;
    // A primeira origem manda (first touch). Só se substitui quando a antiga expirou.
    if (Object.keys(nova).length && (!fresca || !antiga.utm_source)) {
      localStorage.setItem(CHAVE, JSON.stringify({ ...nova, em: new Date().toISOString(), pagina: window.location.pathname, referrer: (document.referrer || '').slice(0, 120) }));
    } else if (!antiga && document.referrer) {
      localStorage.setItem(CHAVE, JSON.stringify({ em: new Date().toISOString(), pagina: window.location.pathname, referrer: document.referrer.slice(0, 120) }));
    }
  } catch { /* sem armazenamento */ }
}

export function lerOrigem() {
  try { return JSON.parse(localStorage.getItem(CHAVE) || 'null'); } catch { return null; }
}
