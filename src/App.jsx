import React, { lazy, Suspense, useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import PageNotFound from './components/PaginaNaoEncontrada';
import ScrollToTop from './components/ScrollToTop';
import { ContactModalProvider } from '@/lib/ContactModalContext';
import ContactModal from '@/components/ContactModal';
import SiteLayout from '@/components/SiteLayout';

function PageTracker() {
  const location = useLocation();
  useEffect(() => {
    if (typeof window.gtag === 'function') {
      window.gtag('config', 'G-XXXXXXXXXX', {
        page_path: location.pathname + location.search,
      });
    }
  }, [location]);
  return null;
}

const Home = lazy(() => import('@/pages/Home'));
const Servicos = lazy(() => import('@/pages/Servicos'));
const Processo = lazy(() => import('@/pages/Processo'));
const Faq = lazy(() => import('@/pages/Faq'));
const Contacto = lazy(() => import('@/pages/Contacto'));
const Instagram = lazy(() => import('@/pages/Instagram'));
const Privacidade = lazy(() => import('@/pages/Privacidade'));
const Termos = lazy(() => import('@/pages/Termos'));
const Precos = lazy(() => import('@/pages/Precos'));
const Booking = lazy(() => import('@/pages/Booking'));
const BookingSection = lazy(() => import('@/pages/BookingSection'));

// E um site publico: nao ha login, nao ha utilizadores, nao ha nada a
// esperar antes de mostrar a pagina. O AuthProvider do Base44 que aqui estava
// fazia o site inteiro esperar por um servico que ja nao usamos.
const AuthenticatedApp = () => {
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
          <Route path="/funcionalidades" element={<Booking />} />
          <Route path="/como-funciona" element={<BookingSection />} />
          <Route path="/precos" element={<Precos />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/instagram" element={<Instagram />} />
          <Route path="/privacidade" element={<Privacidade />} />
          <Route path="/termos" element={<Termos />} />
          {/* Redirects para URLs antigas */}
          <Route path="/servicos" element={<Navigate to="/" replace />} />
          <Route path="/processo" element={<Navigate to="/como-funciona" replace />} />
          <Route path="/booking" element={<Navigate to="/funcionalidades" replace />} />
          <Route path="/booking/:section" element={<Navigate to="/funcionalidades" replace />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Suspense>
  );
};

function App() {
  return (
    <ContactModalProvider>
        <QueryClientProvider client={queryClientInstance}>
          <Router>
            <PageTracker />
            <ScrollToTop />
            <AuthenticatedApp />
          </Router>
          <Toaster />
          <ContactModal />
        </QueryClientProvider>
    </ContactModalProvider>
  )
}

export default App
