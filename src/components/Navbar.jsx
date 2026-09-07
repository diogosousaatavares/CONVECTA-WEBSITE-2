import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Instagram, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ConvectaLogo from "@/components/ConvectaLogo";
import { useContactModal } from "@/lib/ContactModalContext";

const navLinks = [
  { label: "Serviços", path: "/servicos" },
  { label: "Convecta Booking", path: "/booking" },
  { label: "Processo", path: "/processo" },
  { label: "FAQ", path: "/faq" },
  { label: "Instagram", path: "/instagram", icon: Instagram },
  { label: "Preços", path: "/precos" },
  { label: "Contacto", path: "/contacto" },
];

const bookingMenuLinks = [
  { label: "Visão geral", path: "/booking" },
  { label: "Funcionalidades", path: "/booking/funcionalidades" },
  { label: "Admin & Cliente", path: "/booking/admin-cliente" },
  { label: "Como funciona", path: "/booking/como-funciona" },
  { label: "Demonstração", path: "/booking/demonstracao" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [bookingMenuOpen, setBookingMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const { open: openModal } = useContactModal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); setBookingMenuOpen(false); }, [location.pathname]);

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
              if (link.path === "/booking") {
                return (
                  <div key={link.path} className="booking-menu-group">
                    <div className="booking-menu-trigger">
                    <Link to={link.path}
                      className="text-sm font-medium tracking-wide uppercase transition-colors relative flex items-center gap-1.5 booking-nav-link"
                      style={{ color: "#fee96d" }}>
                      {link.label}
                      {location.pathname === link.path && <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-mustard rounded-full" />}
                    </Link>
                    <button type="button" className="booking-menu-toggle" aria-label="Mostrar opções do Convecta Booking" aria-expanded={bookingMenuOpen} onClick={() => setBookingMenuOpen(open => !open)}><ChevronDown size={14} /></button>
                    </div>
                    <div className={`booking-menu-dropdown ${bookingMenuOpen ? "open" : ""}`}>
                      {bookingMenuLinks.map((item) => <Link key={item.path} className={location.pathname === item.path ? "active" : ""} to={item.path}>{item.label}</Link>)}
                    </div>
                  </div>
                );
              }
              return (
                <Link key={link.path} to={link.path}
                  className={`text-sm font-medium tracking-wide uppercase transition-colors relative flex items-center gap-1.5 ${link.path === "/booking" ? "booking-nav-link" : ""}`}
                  style={{ color: location.pathname === link.path ? "#fee96d" : link.path === "/booking" ? "#fee96d" : "rgba(255,255,255,0.7)" }}>
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
            <button
              onClick={openModal}
              className="inline-flex items-center px-6 py-2.5 text-sm font-bold rounded-sm transition-all hover:scale-105"
              style={{ backgroundColor: "#fee96d", color: "#1a1a1a" }}
            >
              Falar Connosco
            </button>
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
                      {link.path === "/booking" && (
                        <div className="booking-mobile-submenu">
                          {bookingMenuLinks.map((item) => <Link key={item.path} className={location.pathname === item.path ? "active" : ""} to={item.path}>{item.label}</Link>)}
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>

              <div className="mt-auto">
                <button
                  onClick={() => { setMobileOpen(false); openModal(); }}
                  className="w-full block text-center px-6 py-3.5 text-sm font-bold rounded-xl"
                  style={{ backgroundColor: "#fee96d", color: "#1a1a1a" }}
                >
                  Falar Connosco
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
