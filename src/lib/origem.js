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

/* 12/11/2026: guarda-se SEMPRE a primeira visita, mesmo sem UTM — quem vem
   da bio do Instagram abre no browser da app (sem referrer nem UTM); isso lê-se
   no user agent. fbclid/gclid dizem que veio de um link Meta ou Google. */
function appDoBrowser() {
  const ua = (typeof navigator !== 'undefined' && navigator.userAgent) || '';
  if (/Instagram/i.test(ua)) return 'instagram';
  if (/FBAN|FBAV|FB_IAB/i.test(ua)) return 'facebook';
  if (/musical_ly|Bytedance|TikTok/i.test(ua)) return 'tiktok';
  if (/LinkedInApp/i.test(ua)) return 'linkedin';
  return '';
}

export function guardarOrigem() {
  try {
    const p = new URLSearchParams(window.location.search);
    const nova = {};
    for (const k of CAMPOS) { const v = (p.get(k) || '').trim().slice(0, 80); if (v) nova[k] = v; }
    const clid = p.get('fbclid') ? 'fbclid' : p.get('gclid') ? 'gclid' : '';
    const app = appDoBrowser();
    const antiga = JSON.parse(localStorage.getItem(CHAVE) || 'null');
    const fresca = antiga && antiga.em && Date.now() - new Date(antiga.em).getTime() < 30 * 86400000;
    const visita = { ...nova, ...(clid ? { clid } : {}), ...(app ? { app } : {}), em: new Date().toISOString(), pagina: window.location.pathname, referrer: (document.referrer || '').slice(0, 120) };
    // A primeira origem manda (first touch). Substitui-se quando expirou, ou
    // quando a guardada nao tinha UTM e esta tem.
    if (!fresca || (nova.utm_source && !antiga.utm_source) || (nova.ref && !antiga.ref)) {
      localStorage.setItem(CHAVE, JSON.stringify(visita));
    }
  } catch { /* sem armazenamento */ }
}

export function lerOrigem() {
  try {
    const o = JSON.parse(localStorage.getItem(CHAVE) || 'null');
    // a pagina onde criou a conta (a /comecar ou a /experimenta)
    return o ? { ...o, registo: window.location.pathname } : { registo: window.location.pathname, app: appDoBrowser() || undefined };
  } catch { return null; }
}
