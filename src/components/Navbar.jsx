import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ConvectaLogo from "@/components/ConvectaLogo";

const navLinks = [
  { label: "Funcionalidades", path: "/funcionalidades" },
  { label: "Como Funciona", path: "/como-funciona" },
  { label: "Preços", path: "/precos" },
  { label: "FAQ", path: "/faq" },
  { label: "Contacto", path: "/contacto" },
];



export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  // Com o menu aberto, a pagina de tras nao mexe. O iOS ignora o
  // `overflow: hidden` so no body — tem de ir tambem no <html>.
  useEffect(() => {
    const v = mobileOpen ? "hidden" : "";
    document.body.style.overflow = v;
    document.documentElement.style.overflow = v;
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [mobileOpen]);

  // Escape fecha, como qualquer painel.
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e) => { if (e.key === "Escape") setMobileOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  const showSolid = !isHome || scrolled;

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          backgroundColor: showSolid ? "rgba(251,250,248,0.9)" : "transparent",
          backdropFilter: showSolid ? "blur(18px)" : "none",
          WebkitBackdropFilter: showSolid ? "blur(18px)" : "none",
          borderBottom: showSolid ? "1px solid var(--cv-linha)" : "none",
        }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-20 lg:h-24">
          <Link to="/" aria-label="Convecta — Início">
            <ConvectaLogo />
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link key={link.path} to={link.path}
                  className="text-sm font-medium transition-colors relative flex items-center gap-1.5"
                  style={{ color: location.pathname === link.path ? "var(--cv-ink)" : "var(--cv-ink-2)" }}>
                  {Icon && <Icon size={14} />}
                  {link.label}
                  {location.pathname === link.path && (
                    <span className="absolute -bottom-1 left-0 right-0" style={{ height: 1, background: "var(--cv-ink)" }} />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="hidden lg:block">
            {/* Cheio, nao contornado. Este e o unico botao da barra e e o
                que paga o site: um botao de contorno le-se como secundario e
                perde-se ao lado do menu. */}
            <Link
              to="/comecar"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold transition-opacity hover:opacity-85"
              style={{ backgroundColor: "var(--cv-amarelo)", color: "var(--cv-amarelo-texto)", borderRadius: 100 }}
            >
              Começar grátis
            </Link>
          </div>

          {/* Hamburger with animated icon */}
          <motion.button
            onClick={() => setMobileOpen(o => !o)}
            className="lg:hidden p-2 relative z-[110] min-w-[44px] min-h-[44px] flex items-center justify-center"
            style={{ color: "var(--cv-ink)" }}
            aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen
                ? <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}><X size={24} /></motion.span>
                : <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}><Menu size={24} /></motion.span>
              }
            </AnimatePresence>
          </motion.button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <div className="fixed inset-0 z-[100]">
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0"
              style={{ background: "rgba(36,32,28,0.35)", touchAction: "none" }}
              onClick={() => setMobileOpen(false)}
              onTouchEnd={(e) => { e.preventDefault(); setMobileOpen(false); }}
              aria-hidden="true"
            />
            <motion.div
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              role="dialog" aria-modal="true" aria-label="Menu"
              className="absolute right-0 top-0 bottom-0 w-80 max-w-[85vw] p-6 sm:p-8 flex flex-col overflow-y-auto"
              style={{ backgroundColor: "var(--cv-ground)", borderLeft: "1px solid var(--cv-linha)", overscrollBehavior: "contain" }}>

              {/* O botao da barra fica escondido por baixo deste painel
                  (a barra e um contexto de empilhamento proprio, z-50, e o
                  painel esta a z-100). Por isso o X vive AQUI, onde se ve. */}
              <div className="mb-10 mt-2 flex items-center justify-between">
                <ConvectaLogo />
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Fechar menu"
                  className="min-w-[44px] min-h-[44px] -mr-2 flex items-center justify-center rounded-full"
                  style={{ color: "var(--cv-ink)" }}
                >
                  <X size={26} />
                </button>
              </div>

              <div className="flex flex-col gap-2">
                {navLinks.map((link, i) => {
                  const Icon = link.icon;
                  const isActive = location.pathname === link.path;
                  return (
                    <motion.div key={link.path}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 + 0.1 }}>
                      <Link to={link.path}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-base font-medium"
                        style={{
                          color: isActive ? "var(--cv-ink)" : "var(--cv-ink-2)",
                          backgroundColor: isActive ? "rgba(36,32,28,0.05)" : "transparent",
                        }}>
                        {Icon && <Icon size={17} />}
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              <div className="mt-auto">
                <Link
                  to="/comecar"
                  onClick={() => setMobileOpen(false)}
                  className="w-full block text-center px-6 py-3.5 text-sm font-semibold"
                  style={{ backgroundColor: "var(--cv-amarelo)", color: "var(--cv-amarelo-texto)", borderRadius: 100 }}
                >
                  Começar grátis
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
