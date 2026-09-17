import React, { lazy, Suspense, useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import PageNotFound from './components/PaginaNaoEncontrada';
import ScrollToTop from './components/ScrollToTop';
import { ContactModalProvider } from '@/lib/ContactModalContext';
import ContactModal from '@/components/ContactModal';
import SiteLayout from '@/components/SiteLayout';
import { GA_ID } from '@/lib/seo';

function PageTracker() {
  const location = useLocation();
  useEffect(() => {
    if (GA_ID && typeof window.gtag === 'function') {
      window.gtag('config', GA_ID, {
        page_path: location.pathname + location.search,
      });
    }
  }, [location]);
  return null;
}

const Home = lazy(() => import('@/pages/Home'));
const Faq = lazy(() => import('@/pages/Faq'));
const Contacto = lazy(() => import('@/pages/Contacto'));
const Instagram = lazy(() => import('@/pages/Instagram'));
const Privacidade = lazy(() => import('@/pages/Privacidade'));
const Termos = lazy(() => import('@/pages/Termos'));
const Precos = lazy(() => import('@/pages/Precos'));
const Comecar = lazy(() => import('@/pages/Comecar'));
const Funcionalidades = lazy(() => import('@/pages/Booking'));
const ComoFunciona = lazy(() => import('@/pages/BookingSection'));

// E um site publico: nao ha login, nao ha utilizadores, nao ha nada a
// esperar antes de mostrar a pagina. O AuthProvider do Base44 que aqui estava
// fazia o site inteiro esperar por um servico que ja nao usamos.
const Paginas = () => {
  return (
    <Suspense fallback={
      <div style={{
        position: 'fixed', inset: 0,
        display: 'flex', alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#111111'
      }}>
        <div style={{
          width: 32, height: 32,
          border: '3px solid rgba(254,233,109,0.2)',
          borderTopColor: '#fee96d',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite'
        }} />
      </div>
    }>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/funcionalidades" element={<Funcionalidades />} />
          <Route path="/como-funciona" element={<ComoFunciona />} />
          <Route path="/precos" element={<Precos />} />
          {/* O registo da barbearia. Fica dentro do SiteLayout de proposito:
              quem hesita a meio do formulario tem de poder ir aos Precos ou
              aos Termos e voltar, em vez de ficar preso num ecra sem saida. */}
          <Route path="/comecar" element={<Comecar />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/instagram" element={<Instagram />} />
          <Route path="/privacidade" element={<Privacidade />} />
          <Route path="/termos" element={<Termos />} />
          {/* Redirects para URLs antigas. /demo e /demonstracao saem para a
              app de demonstracao antes de chegar aqui (vercel.json). */}
          <Route path="/servicos" element={<Navigate to="/funcionalidades" replace />} />
          <Route path="/processo" element={<Navigate to="/como-funciona" replace />} />
          <Route path="/booking" element={<Navigate to="/funcionalidades" replace />} />
          <Route path="/booking/:section" element={<Navigate to="/funcionalidades" replace />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Suspense>
  );
};

/*
 * Tudo o que esta dentro do router. O site no browser embrulha isto num
 * BrowserRouter (abaixo); a pre-renderizacao, na altura do build, embrulha-o
 * num StaticRouter (src/entry-server.jsx). E a mesma arvore nos dois lados —
 * tem de ser, para o HTML gerado no build bater certo com o que o React
 * desenha no browser.
 */
export function AppShell() {
  return (
    <ContactModalProvider>
      <QueryClientProvider client={queryClientInstance}>
        <PageTracker />
        <ScrollToTop />
        <Paginas />
        <Toaster />
        <ContactModal />
      </QueryClientProvider>
    </ContactModalProvider>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}

export default App
