import React, { useEffect, useState } from 'react';
import { ExternalLink, Copy, Check } from 'lucide-react';

/*
 * FORA DO INSTAGRAM (01/11/2026, pedido do Diogo).
 *
 * Quem abre o registo dentro do Instagram (ou Facebook, Messenger, TikTok)
 * está num browser «emprestado»: basta perder a ligação ou fechar a janela e
 * perde tudo o que escreveu — e o painel não fica guardado no telemóvel.
 * Por isso o registo NÃO deixa continuar aí: obriga a abrir no navegador.
 *   Android → abre o Chrome sozinho (intent://).
 *   iPhone  → tenta abrir o Safari (x-safari-https://); se não der, mostra
 *             onde tocar («⋯» → «Abrir no navegador») e o botão de copiar.
 */
export function emBrowserDeApp() {
  if (typeof navigator === 'undefined') return false;
  const ua = navigator.userAgent || '';
  return /Instagram|FBAN|FBAV|FB_IAB|FBIOS|Messenger|TikTok|musical_ly|Bytedance|LinkedInApp|Snapchat|Line\//i.test(ua);
}
const ehAndroid = () => /Android/i.test(navigator.userAgent || '');
const ehIOS = () => /iPhone|iPad|iPod/i.test(navigator.userAgent || '');

/*
 * 01/11/2026 (Diogo): o registo faz-se normalmente, mesmo dentro do Instagram.
 * Este ecrã só aparece NO FIM, depois de criada a conta: em vez de abrir o
 * painel dentro do Instagram (onde não fica guardado), manda abri-lo no
 * navegador. `url` é o painel, já com a sessão (?sessao=…), por isso entra
 * logo, sem pedir a palavra-passe.
 */
export function abrirForaDaApp(url) {
  if (ehAndroid()) window.location.href = `intent://${url.replace(/^https?:\/\//, '')}#Intent;scheme=https;package=com.android.chrome;S.browser_fallback_url=${encodeURIComponent(url)};end`;
  else if (ehIOS()) window.location.href = `x-safari-${url}`;
}

export default function AbrirNoNavegador({ url }) {
  const [copiado, setCopiado] = useState(false);
  // Android: tenta abrir o Chrome logo, sozinho.
  useEffect(() => { if (ehAndroid()) abrirForaDaApp(url); }, [url]);
  const abrir = () => abrirForaDaApp(url);
  const copiar = async () => {
    try { await navigator.clipboard.writeText(url); setCopiado(true); setTimeout(() => setCopiado(false), 2500); } catch { /* sem clipboard */ }
  };

  return (
    <div style={{ minHeight: '100dvh', display: 'grid', placeItems: 'center', padding: '28px 20px', background: 'var(--cv-fundo, #f6f4ef)', color: 'var(--cv-ink, #1a1714)', fontFamily: 'inherit' }}>
      <div style={{ maxWidth: 420, width: '100%', display: 'grid', gap: 18, textAlign: 'center' }}>
        <div style={{ fontSize: 46 }}>🎉</div>
        <h1 style={{ fontSize: 26, lineHeight: 1.2, margin: 0, fontWeight: 800 }}>Conta criada! Abre a tua aplicação no navegador</h1>
        <p style={{ fontSize: 15.5, lineHeight: 1.55, margin: 0, color: 'var(--cv-ink-2, #4a4540)' }}>
          Dentro do Instagram a aplicação não fica guardada. No {ehIOS() ? 'Safari' : 'Chrome'} entras já com a tua conta e podes pô-la no ecrã do telemóvel.
        </p>
        <button type="button" onClick={abrir}
          style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '15px 22px', borderRadius: 100, border: 'none', fontSize: 16, fontWeight: 800, cursor: 'pointer', background: 'var(--cv-amarelo, #FEE96D)', color: 'var(--cv-amarelo-texto, #1a1714)', fontFamily: 'inherit' }}>
          Abrir no {ehIOS() ? 'Safari' : 'navegador'} <ExternalLink size={18} />
        </button>
        <div style={{ textAlign: 'left', fontSize: 14.5, lineHeight: 1.6, padding: '14px 16px', borderRadius: 14, background: 'var(--cv-card, #fff)', border: '1px solid var(--cv-linha, #e6e2d9)' }}>
          <b>Se não abrir sozinho:</b>
          <ol style={{ margin: '6px 0 0', paddingLeft: 20 }}>
            <li>Toca nos <b>três pontos (⋯)</b> {ehIOS() ? 'em cima, à direita' : 'no canto de cima'}.</li>
            <li>Escolhe <b>«Abrir no navegador externo»</b>{ehIOS() ? ' ou «Abrir no Safari»' : ''}.</li>
          </ol>
        </div>
        <button type="button" onClick={copiar}
          style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '12px 18px', borderRadius: 100, border: '1.5px solid var(--cv-linha, #e6e2d9)', background: 'transparent', fontSize: 14.5, fontWeight: 700, cursor: 'pointer', color: 'inherit', fontFamily: 'inherit' }}>
          {copiado ? <><Check size={16} /> Link copiado — cola no navegador</> : <><Copy size={16} /> Copiar o link</>}
        </button>
      </div>
    </div>
  );
}
