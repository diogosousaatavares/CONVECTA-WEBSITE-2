import React, { Suspense } from "react";
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
/*
 * A roda de espera da pagina. Ocupa a altura de um ecra para o rodape nao
 * saltar para cima enquanto o ficheiro nao chega — uma pagina que encolhe e
 * volta a crescer le-se como uma falha, mesmo quando demora meio segundo.
 */
function EsperaDaPagina() {
  return (
    <div style={{ minHeight: "70vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div
        aria-label="A carregar"
        role="status"
        style={{
          width: 30, height: 30, borderRadius: "50%",
          border: "3px solid rgba(36,32,28,0.12)",
          borderTopColor: "var(--cv-amarelo, #fee96d)",
          animation: "spin 0.8s linear infinite",
        }}
      />
    </div>
  );
}

export default function SiteLayout() {
  return (
    <div className="min-h-screen flex flex-col" style={{ position: "relative" }}>
      <AmbientBackground />
      <ScrollProgressBar />
      <Navbar />
      {/*
        A espera pela pagina acontece AQUI DENTRO, e nao a volta do site todo.

        ── O que se passava quando estava la fora ─────────────────────────

        Cada pagina e carregada a pedido (`lazy`). Enquanto o ficheiro nao
        chega, o React tem de mostrar outra coisa — e a fronteira que decide
        "outra coisa" era, ate aqui, uma que embrulhava o site inteiro, a
        barra de cima incluida.

        No telemovel isso dava um erro feio. Abria-se o menu, carregava-se em
        «Funcionalidades», e no mesmo instante aconteciam duas coisas: o menu
        mandava-se fechar, e o React escondia a arvore inteira — com o menu la
        dentro, a meio de se fechar — para mostrar a roda de espera. A
        animacao de saida ficava a meio, sem nunca terminar. Quando a pagina
        chegava e o React voltava a mostrar tudo, o painel estava outra vez no
        ecra, aberto, e ja nada o fechava: o botao dizia «Abrir menu», porque
        do lado do estado ele ESTAVA fechado. So recarregando.

        Com a fronteira aqui, a barra nunca e escondida — a espera e so da
        area da pagina, que e a unica coisa que esta mesmo a faltar. E o menu
        fecha-se em paz.

        A fronteira de fora continua a existir (App.jsx), como rede.
      */}
      <main className="flex-1" style={{ position: "relative", zIndex: 1 }}>
        <Suspense fallback={<EsperaDaPagina />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <CookieConsent />
      <WhatsAppFlutuante />
    </div>
  );
}
