import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Cookie } from "lucide-react";

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

  const decline = () => {
    try {
      localStorage.setItem(CONSENT_KEY, "declined");
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
          <Cookie size={20} className="shrink-0 mt-0.5" style={{ color: "#fee96d" }} />
          <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
            Utilizamos cookies essenciais para o funcionamento do site e cookies opcionais para
            melhorar a tua experiência, em conformidade com o RGPD. Podes aceitar todos os
            cookies ou continuar apenas com os essenciais.{" "}
            <Link to="/privacidade" className="underline hover:text-mustard transition-colors">
              Saber mais
            </Link>
          </p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto shrink-0">
          <button
            onClick={decline}
            className="flex-1 sm:flex-none px-4 py-2.5 text-xs font-bold uppercase tracking-wide rounded-sm border border-white/20 text-white/70 hover:text-white hover:border-white/40 transition-colors"
          >
            Apenas essenciais
          </button>
          <button
            onClick={accept}
            className="flex-1 sm:flex-none px-5 py-2.5 text-xs font-bold uppercase tracking-wide rounded-sm transition-transform hover:scale-105"
            style={{ backgroundColor: "#fee96d", color: "#1a1a1a" }}
          >
            Aceitar todos
          </button>
        </div>
      </div>
    </div>
  );
}
