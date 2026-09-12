import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Cookie } from "lucide-react";

/*
 * O aviso de cookies. So diz a verdade: nao ha cookies de publicidade nem de
 * estatisticas neste site (o Google Analytics so entra quando houver um ID
 * em lib/seo.js — e nesse dia este aviso volta a ter duas opcoes).
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
          backgroundColor: "rgba(26,26,26,0.97)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(254,233,109,0.25)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
        }}
      >
        <div className="flex items-start gap-3 flex-1">
          <Cookie size={20} className="shrink-0 mt-0.5" style={{ color: "var(--cv-amarelo-texto)" }} />
          <p className="text-xs sm:text-sm text-ink-2 leading-relaxed">
            Este site não usa cookies de publicidade nem de rastreio. Guarda no teu browser só o
            essencial: esta escolha e o facto de já teres preenchido o formulário da demonstração.{" "}
            <Link to="/privacidade" className="underline hover:text-mustard transition-colors">
              Saber mais
            </Link>
          </p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto shrink-0">
          <button
            onClick={accept}
            className="flex-1 sm:flex-none px-5 py-2.5 text-xs font-bold uppercase tracking-wide rounded-sm transition-transform hover:scale-105"
            style={{ backgroundColor: "var(--cv-ink)", color: "#fff", borderRadius: 100 }}
          >
            Entendi
          </button>
        </div>
      </div>
    </div>
  );
}
