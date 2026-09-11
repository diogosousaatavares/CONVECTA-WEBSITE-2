import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone } from "lucide-react";
import ConvectaLogo from "@/components/ConvectaLogo";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#1a1a1a" }} className="text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <ConvectaLogo light />
            <p className="mt-4 text-sm text-white/50 leading-relaxed font-body">
              Uma plataforma para gerir o teu negócio. Uma experiência digital para os teus clientes.
            </p>
          </div>

          {/* Plataforma */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">Plataforma</h4>
            <div className="flex flex-col gap-3">
              <Link to="/funcionalidades" className="text-sm text-white/70 hover:text-mustard transition-colors">
                Funcionalidades
              </Link>
              <Link to="/como-funciona" className="text-sm text-white/70 hover:text-mustard transition-colors">
                Como Funciona
              </Link>
              <Link to="/precos" className="text-sm text-white/70 hover:text-mustard transition-colors">
                Preços
              </Link>
            </div>
          </div>

          {/* Empresa */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">Empresa</h4>
            <div className="flex flex-col gap-3">
              <Link to="/faq" className="text-sm text-white/70 hover:text-mustard transition-colors">
                Perguntas Frequentes
              </Link>
              <Link to="/contacto" className="text-sm text-white/70 hover:text-mustard transition-colors">
                Contacto
              </Link>
              <Link to="/privacidade" className="text-sm text-white/70 hover:text-mustard transition-colors">
                Política de Privacidade
              </Link>
              <Link to="/termos" className="text-sm text-white/70 hover:text-mustard transition-colors">
                Termos e Condições
              </Link>
            </div>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">Contacto</h4>
            <div className="flex flex-col gap-3">
              <a href="mailto:geral@convecta.pt" className="text-sm text-white/70 hover:text-mustard transition-colors flex items-center gap-2">
                <Mail size={14} className="text-mustard" />
                geral@convecta.pt
              </a>
              <a href="tel:+351912381717" className="text-sm text-white/70 hover:text-mustard transition-colors flex items-center gap-2">
                <Phone size={14} className="text-mustard" />
                +351 912 381 717
              </a>
              <a
                href="https://instagram.com/convecta.pt"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/70 hover:text-mustard transition-colors flex items-center gap-2 mt-1"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                @convecta.pt
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} Convecta. Todos os direitos reservados.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <a href="https://www.livroreclamacoes.pt" target="_blank" rel="noopener noreferrer" className="text-xs text-white/40 hover:text-mustard transition-colors inline-flex items-center min-h-[44px] py-2">
              Livro de Reclamações
            </a>
            <span className="text-white/20">·</span>
            <Link to="/privacidade" className="text-xs text-white/40 hover:text-mustard transition-colors inline-flex items-center min-h-[44px] py-2">Política de Privacidade</Link>
            <span className="text-white/20">·</span>
            <Link to="/termos" className="text-xs text-white/40 hover:text-mustard transition-colors inline-flex items-center min-h-[44px] py-2">Termos e Condições</Link>
          </div>
        </div>
      </div>

      {/* Giant watermark wordmark */}
      <div className="relative w-full select-none pointer-events-none" aria-hidden="true">
        <p
          className="font-heading whitespace-nowrap leading-none text-center"
          style={{
            fontSize: "clamp(5rem, 16vw, 14rem)",
            color: "rgba(255,255,255,0.04)",
            marginBottom: "clamp(-2rem, -4vw, -3rem)",
          }}
        >
          Convecta
        </p>
      </div>
    </footer>
  );
}
