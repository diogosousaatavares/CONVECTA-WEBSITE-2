import React from "react";
import { useLocation } from "react-router-dom";
import MarcaWhatsApp from "@/components/MarcaWhatsApp";
import { SITE } from "@/lib/seo";

/*
 * O WhatsApp, sempre à mão, no telemóvel.
 *
 * Um barbeiro não preenche formulários de contacto: manda uma mensagem. O
 * número já está no rodapé, mas o rodapé fica a três ecrãs de distância. Este
 * botão fica onde o polegar está.
 *
 * Só no telemóvel: no computador o rodapé e a página de contacto chegam, e
 * um botão flutuante a tapar conteúdo é ruído. Não aparece no /comecar — lá
 * a única coisa a fazer é acabar o registo, e uma saída a mais é uma
 * distração a mais.
 */
export default function WhatsAppFlutuante() {
  const { pathname } = useLocation();
  if (pathname.startsWith("/comecar")) return null;

  const texto = encodeURIComponent("Olá! Vi o site da Convecta e queria tirar uma dúvida.");
  const href = `https://wa.me/${SITE.telefoneE164.replace(/\D/g, "")}?text=${texto}`;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .cv-wa-flutuante {
          position: fixed; right: 16px; bottom: calc(16px + env(safe-area-inset-bottom));
          z-index: 60; display: inline-flex; align-items: center; gap: 8px;
          padding: 10px 14px 10px 10px; border-radius: 999px;
          background: #fff; color: #111; text-decoration: none;
          font-size: 13px; font-weight: 700; font-family: inherit;
          border: 1px solid var(--cv-linha);
          box-shadow: 0 10px 30px -10px rgba(0,0,0,.35);
        }
        .cv-wa-flutuante:focus-visible { outline: 3px solid var(--cv-ink); outline-offset: 2px; }
        @media (min-width: 900px) { .cv-wa-flutuante { display: none; } }
      ` }} />
      <a
        className="cv-wa-flutuante"
        href={href}
        target="_blank"
        rel="noreferrer"
        aria-label="Falar connosco pelo WhatsApp"
        onClick={() => { try { window.trackEvent?.("whatsapp_click", { origem: pathname }); } catch {} }}
      >
        <MarcaWhatsApp tamanho={26} /> Dúvidas? WhatsApp
      </a>
    </>
  );
}
