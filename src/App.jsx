import React, { lazy, Suspense, useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
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

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      navigateToLogin();
      return null;
    }
  }

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
          <Route path="/servicos" element={<Servicos />} />
          <Route path="/processo" element={<Processo />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/instagram" element={<Instagram />} />
          <Route path="/privacidade" element={<Privacidade />} />
          <Route path="/termos" element={<Termos />} />
          <Route path="/precos" element={<Precos />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/booking/:section" element={<BookingSection />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Suspense>
  );
};

function App() {
  return (
    <ContactModalProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClientInstance}>
          <Router>
            <PageTracker />
            <ScrollToTop />
            <AuthenticatedApp />
          </Router>
          <Toaster />
          <ContactModal />
        </QueryClientProvider>
      </AuthProvider>
    </ContactModalProvider>
  )
}

export default App
