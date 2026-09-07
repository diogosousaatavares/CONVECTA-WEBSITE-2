import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { CalendarDays, ArrowRight, X, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function BookingNotification() {
  const location = useLocation();
  const isBookingPage = location.pathname.startsWith("/booking");

  const [bannerVisible, setBannerVisible] = useState(() => {
    try {
      return !sessionStorage.getItem('booking_banner_dismissed');
    } catch {
      return true;
    }
  });

  const dismissBanner = () => {
    try {
      sessionStorage.setItem('booking_banner_dismissed', 'true');
    } catch {}
    setBannerVisible(false);
  };

  if (isBookingPage) return null;

  return (
    <AnimatePresence>
      {bannerVisible && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed bottom-3 left-3 right-3 sm:left-auto sm:bottom-6 sm:right-6 z-[60] max-w-sm w-[calc(100vw-1.5rem)] sm:w-auto"
        >
          <div
            className="relative rounded-xl overflow-hidden shadow-2xl border backdrop-blur-xl bg-[#1a1a1a]/95 border-[#fee96d]/30 max-h-[60px] sm:max-h-none p-2 sm:p-5 flex items-center justify-between sm:block"
            style={{
              boxShadow: "0 20px 50px rgba(0,0,0,0.6), 0 0 30px rgba(254,233,109,0.15)",
            }}
          >
            {/* Ambient yellow top bar highlight */}
            <div
              className="absolute top-0 left-0 right-0 h-1"
              style={{
                background: "linear-gradient(90deg, #fee96d, #f59e0b, #fee96d)",
              }}
            />

            {/* Mobile compact <= 60px view */}
            <div className="flex sm:hidden items-center justify-between w-full gap-2 pr-7">
              <div className="flex items-center gap-2 min-w-0">
                <CalendarDays size={16} className="text-[#fee96d] shrink-0" />
                <span className="text-xs text-white font-medium truncate">
                  Sistema de marcações online
                </span>
              </div>
              <Link
                to="/booking"
                onClick={dismissBanner}
                className="shrink-0 px-2.5 py-1 text-[11px] font-bold uppercase rounded-sm bg-[#fee96d] text-[#1a1a1a] flex items-center gap-1 min-h-[36px]"
              >
                <span>Ver</span>
                <ArrowRight size={12} />
              </Link>
            </div>

            {/* Desktop expanded view */}
            <div className="hidden sm:block">
              <button
                onClick={dismissBanner}
                aria-label="Fechar notificação"
                className="absolute top-3 right-3 p-1.5 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors min-w-[32px] min-h-[32px] flex items-center justify-center"
              >
                <X size={16} />
              </button>

              <div className="flex items-start gap-3.5 pr-6">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                  style={{
                    backgroundColor: "rgba(254,233,109,0.15)",
                    border: "1px solid rgba(254,233,109,0.3)",
                    color: "#fee96d",
                  }}
                >
                  <CalendarDays size={20} />
                </div>

                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[#fee96d]">
                    <Sparkles size={11} className="animate-pulse" />
                    <span>Convecta Booking</span>
                  </div>

                  <p className="text-xs sm:text-sm text-white font-medium leading-snug">
                    Procuras um sistema de marcações online para a tua barbearia?
                  </p>

                  <p className="text-xs text-white/60 leading-relaxed font-light">
                    Agenda, clientes, fidelização digital e relatórios num só lugar.
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-end">
                <Link
                  to="/booking"
                  onClick={dismissBanner}
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wide rounded-sm transition-transform hover:scale-[1.03] min-h-[44px]"
                  style={{
                    backgroundColor: "#fee96d",
                    color: "#1a1a1a",
                  }}
                >
                  <span>Ver Convecta Booking</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Mobile close button */}
            <button
              onClick={dismissBanner}
              aria-label="Fechar notificação"
              className="sm:hidden absolute top-1/2 -translate-y-1/2 right-1.5 p-1 text-white/50 hover:text-white transition-colors min-w-[36px] min-h-[36px] flex items-center justify-center"
            >
              <X size={16} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}