import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import ConvectaLogo from "@/components/ConvectaLogo";
import { SITE } from "@/lib/seo";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "var(--cv-ground)", color: "var(--cv-ink)", borderTop: "1px solid var(--cv-linha)" }} className="overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <ConvectaLogo />
            <p className="mt-4 text-sm leading-relaxed font-body" style={{ color: "var(--cv-ink-2)" }}>
              Marcações online e gestão para barbearias. O site onde os teus clientes marcam e o painel onde tu geres a barbearia. Feito no Porto.
            </p>
          </div>

          {/* Plataforma */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "var(--cv-ink-3)" }}>Plataforma</p>
            <div className="flex flex-col gap-3">
              <Link to="/funcionalidades" className="text-sm hover:opacity-70 transition-colors" style={{ color: "var(--cv-ink-2)" }}>
                Funcionalidades
              </Link>
              <Link to="/como-funciona" className="text-sm hover:opacity-70 transition-colors" style={{ color: "var(--cv-ink-2)" }}>
                Como Funciona
              </Link>
              <Link to="/precos" className="text-sm hover:opacity-70 transition-colors" style={{ color: "var(--cv-ink-2)" }}>
                Preços
              </Link>
              <Link to="/comecar" className="text-sm hover:opacity-70 transition-colors" style={{ color: "var(--cv-ink-2)" }}>
                Começar
              </Link>
            </div>
          </div>

          {/* Empresa */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "var(--cv-ink-3)" }}>Empresa</p>
            <div className="flex flex-col gap-3">
              <Link to="/faq" className="text-sm hover:opacity-70 transition-colors" style={{ color: "var(--cv-ink-2)" }}>
                Perguntas Frequentes
              </Link>
              <Link to="/contacto" className="text-sm hover:opacity-70 transition-colors" style={{ color: "var(--cv-ink-2)" }}>
                Contacto
              </Link>
              <Link to="/privacidade" className="text-sm hover:opacity-70 transition-colors" style={{ color: "var(--cv-ink-2)" }}>
                Política de Privacidade
              </Link>
              <Link to="/termos" className="text-sm hover:opacity-70 transition-colors" style={{ color: "var(--cv-ink-2)" }}>
                Termos e Condições
              </Link>
            </div>
          </div>

          {/* Contact & Social */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "var(--cv-ink-3)" }}>Contacto</p>
            <div className="flex flex-col gap-3">
              <a href={`mailto:${SITE.email}`} className="text-sm hover:opacity-70 transition-colors flex items-center gap-2" style={{ color: "var(--cv-ink-2)" }}>
                <Mail size={14} className="text-mustard" />
                {SITE.email}
              </a>
              <a href={`tel:${SITE.telefoneE164}`} className="text-sm hover:opacity-70 transition-colors flex items-center gap-2" style={{ color: "var(--cv-ink-2)" }}>
                <Phone size={14} className="text-mustard" />
                {SITE.telefone}
              </a>
              <span className="text-sm flex items-start gap-2" style={{ color: "var(--cv-ink-2)" }}>
                <MapPin size={14} className="text-mustard shrink-0 mt-0.5" />
                <span>{SITE.morada.rua}<br />{SITE.morada.codigoPostal} {SITE.morada.cidade}</span>
              </span>
              <a
                href={SITE.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm hover:opacity-70 transition-colors flex items-center gap-2 mt-1"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                {SITE.instagramHandle}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderColor: "var(--cv-linha)" }} className="mt-16 pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs" style={{ color: "var(--cv-ink-3)" }}>
            © {new Date().getFullYear()} Convecta · Marcações online para barbearias · Porto, Portugal
            <br />{SITE.titular} · NIF {SITE.nif} · IVA: regime de isenção (art. 53.º do CIVA)
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <a href="https://www.livroreclamacoes.pt" target="_blank" rel="noopener noreferrer" className="text-xs  hover:text-mustard transition-colors inline-flex items-center min-h-[44px] py-2">
              Livro de Reclamações
            </a>
            <span style={{ color: "var(--cv-ink-3)" }}>·</span>
            <Link to="/privacidade" className="text-xs  hover:text-mustard transition-colors inline-flex items-center min-h-[44px] py-2">Política de Privacidade</Link>
            <span style={{ color: "var(--cv-ink-3)" }}>·</span>
            <Link to="/termos" className="text-xs  hover:text-mustard transition-colors inline-flex items-center min-h-[44px] py-2">Termos e Condições</Link>
          </div>
        </div>
      </div>

      {/* Giant watermark wordmark */}
      <div className="relative w-full select-none pointer-events-none" aria-hidden="true">
        <p
          className="font-heading whitespace-nowrap leading-none text-center"
          style={{
            fontSize: "clamp(5rem, 16vw, 14rem)",
            color: "rgba(36,32,28,0.04)",
            marginBottom: "clamp(-2rem, -4vw, -3rem)",
          }}
        >
          Convecta
        </p>
      </div>
    </footer>
  );
}
