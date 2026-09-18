import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import CookieConsent from "@/components/CookieConsent";
import AmbientBackground from "@/components/AmbientBackground";
import WhatsAppFlutuante from "@/components/WhatsAppFlutuante";

/*
 * O cursor desenhado a mao (CustomCursor) saiu daqui.
 *
 * Punha "cursor: none !important" em tudo no computador: desaparecia a
 * barra de texto por cima das caixas do formulario e a mao por cima dos
 * links — as duas pistas que dizem a uma pessoa o que pode fazer. Num site
 * cujo objetivo e preencher um formulario, isso custa mais do que rende.
 * O componente continua no repositorio, se um dia se quiser de volta.
 */
export default function SiteLayout() {
  return (
    <div className="min-h-screen flex flex-col" style={{ position: "relative" }}>
      <AmbientBackground />
      <ScrollProgressBar />
      <Navbar />
      <main className="flex-1" style={{ position: "relative", zIndex: 1 }}>
        <Outlet />
      </main>
      <Footer />
      <CookieConsent />
      <WhatsAppFlutuante />
    </div>
  );
}
