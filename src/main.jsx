import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App.jsx'
import '@/index.css'
import { HelmetProvider } from 'react-helmet-async'

// Helper global para rastrear eventos de conversão
window.trackEvent = function(eventName, params = {}) {
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  }
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
)
