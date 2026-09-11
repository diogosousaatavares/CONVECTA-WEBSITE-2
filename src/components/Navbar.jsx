import React, { useState, useEffect } from "react";
import { DEMO_CLIENTE_URL } from "@/lib/demo";
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

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const showSolid = !isHome || scrolled;

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          backgroundColor: showSolid ? "rgba(26,26,26,0.92)" : "transparent",
          backdropFilter: showSolid ? "blur(20px)" : "none",
          WebkitBackdropFilter: showSolid ? "blur(20px)" : "none",
          borderBottom: showSolid ? "1px solid rgba(254,233,109,0.1)" : "none",
        }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-20 lg:h-24">
          <Link to="/" aria-label="Convecta — Início">
            <ConvectaLogo light />
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link key={link.path} to={link.path}
                  className="text-sm font-medium tracking-wide uppercase transition-colors relative flex items-center gap-1.5"
                  style={{ color: location.pathname === link.path ? "#fee96d" : "rgba(255,255,255,0.7)" }}>
                  {Icon && <Icon size={14} />}
                  {link.label}
                  {location.pathname === link.path && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-mustard rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="hidden lg:block">
            <a
              href={DEMO_CLIENTE_URL} target="_blank" rel="noopener"
              className="inline-flex items-center px-6 py-2.5 text-sm font-bold rounded-sm transition-all hover:scale-105"
              style={{ backgroundColor: "#fee96d", color: "#1a1a1a" }}
            >
              Experimentar demo
            </a>
          </div>

          {/* Hamburger with animated icon */}
          <motion.button
            onClick={() => setMobileOpen(o => !o)}
            className="lg:hidden text-white p-2 relative z-[110] min-w-[44px] min-h-[44px] flex items-center justify-center"
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
              className="absolute inset-0 bg-black/70"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="absolute right-0 top-0 bottom-0 w-80 max-w-[85vw] p-6 sm:p-8 flex flex-col overflow-y-auto"
              style={{ backgroundColor: "#1a1a1a", borderLeft: "1px solid rgba(254,233,109,0.1)" }}>

              <div className="mb-10 mt-4">
                <ConvectaLogo light />
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
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-base font-medium ${link.path === "/booking" ? "booking-nav-link" : ""}`}
                        style={{
                          color: isActive ? "#fee96d" : "#fff",
                          backgroundColor: isActive ? "rgba(254,233,109,0.08)" : "transparent",
                        }}>
                        {Icon && <Icon size={17} />}
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              <div className="mt-auto">
                <a
                  href={DEMO_CLIENTE_URL} target="_blank" rel="noopener"
                  onClick={() => setMobileOpen(false)}
                  className="w-full block text-center px-6 py-3.5 text-sm font-bold rounded-xl"
                  style={{ backgroundColor: "#fee96d", color: "#1a1a1a" }}
                >
                  Experimentar a demonstração
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
