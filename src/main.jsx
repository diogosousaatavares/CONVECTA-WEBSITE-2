import React from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from '@/App.jsx'
import '@/index.css'
import { HelmetProvider } from 'react-helmet-async'
import { GA_ID } from '@/lib/seo'

// Google Analytics so carrega quando houver um ID (lib/seo.js). Sem ID nao
// se pede nada a ninguem — nem script, nem cookies.
if (GA_ID) {
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', GA_ID, { anonymize_ip: true });
}

// Helper global para registar eventos de conversão (fica inerte sem GA).
window.trackEvent = function (eventName, params = {}) {
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  }
};

// As paginas vem pre-renderizadas do build (scripts/prerender.mjs): o HTML ja
// la esta, e o React so tem de o "hidratar" — ligar os cliques e as
// animacoes ao que ja esta no ecra. Se por alguma razao o root vier vazio
// (o `vite dev`, ou a casca app.html dos caminhos desconhecidos), desenha do
// zero como sempre.
const raiz = document.getElementById('root');
const arvore = (
  <HelmetProvider>
    <App />
  </HelmetProvider>
);
if (raiz.hasChildNodes()) {
  hydrateRoot(raiz, arvore);
} else {
  createRoot(raiz).render(arvore);
}
