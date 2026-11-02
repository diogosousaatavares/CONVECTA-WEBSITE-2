import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Cookie } from "lucide-react";

/*
 * O aviso de cookies. 02/11/2026: o Google Analytics ja esta ligado (GA_ID em
 * lib/seo.js), por isso o aviso diz isso mesmo e tem duas opcoes. «So o
 * essencial» deixa o analytics_storage em denied (Consent Mode, main.jsx).
 */
const CONSENT_KEY = "convecta_cookie_consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem(CONSENT_KEY);
      if (!consent) {
        // Small delay so it doesn't flash in immediately on load
        const t = setTimeout(() => setVisible(true), 600);
        return () => clearTimeout(t);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    try {
      localStorage.setItem(CONSENT_KEY, "accepted");
    } catch {}
    try { window.gtag?.('consent', 'update', { analytics_storage: 'granted' }); } catch {}
    setVisible(false);
  };
  const recusar = () => {
    try {
      localStorage.setItem(CONSENT_KEY, "essential");
    } catch {}
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Consentimento de cookies"
      className="fixed bottom-0 left-0 right-0 z-[70] p-4 sm:p-6"
    >
      <div
        className="max-w-3xl mx-auto rounded-sm p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6"
        style={{
          backgroundColor: "rgba(255,255,255,0.97)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid var(--cv-linha)",
          boxShadow: "0 20px 60px -30px rgba(36,32,28,0.45)",
        }}
      >
        <div className="flex items-start gap-3 flex-1">
          <Cookie size={20} className="shrink-0 mt-0.5" style={{ color: "var(--cv-amarelo-texto)" }} />
          <p className="text-xs sm:text-sm text-ink-2 leading-relaxed">
            Usamos o Google Analytics para perceber como o site é usado. Sem cookies de
            publicidade.{" "}
            <Link to="/privacidade" className="underline text-ink transition-colors">
              Saber mais
            </Link>
          </p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto shrink-0">
          <button
            onClick={recusar}
            className="flex-1 sm:flex-none px-5 py-2.5 text-xs font-bold uppercase tracking-wide transition-transform hover:scale-105"
            style={{ background: "transparent", color: "var(--cv-ink)", border: "1px solid var(--cv-linha)", borderRadius: 100 }}
          >
            Só o essencial
          </button>
          <button
            onClick={accept}
            className="flex-1 sm:flex-none px-5 py-2.5 text-xs font-bold uppercase tracking-wide rounded-sm transition-transform hover:scale-105"
            style={{ backgroundColor: "var(--cv-ink)", color: "#fff", borderRadius: 100 }}
          >
            Aceitar
          </button>
        </div>
      </div>
    </div>
  );
}
