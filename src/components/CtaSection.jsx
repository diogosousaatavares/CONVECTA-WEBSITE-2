import React from "react";
import ScrollReveal from "@/components/ScrollReveal";
import AmbientParticles from "@/components/AmbientParticles";
import { useContactModal } from "@/lib/ContactModalContext";

export default function CtaSection({ title, buttonText = "Falar Connosco", href, secondaryText }) {
  const { open: openModal } = useContactModal();
  const estilo = { backgroundColor: "#fee96d", color: "#1a1a1a" };
  const classe = "btn-glow inline-flex items-center px-8 py-4 text-sm font-bold uppercase tracking-wide rounded-sm";

  return (
    <section style={{ backgroundColor: "#1a1a1a" }} className="py-24 lg:py-32 relative overflow-hidden">
      <AmbientParticles count={7} />
      <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center">
        <ScrollReveal>
          <h2 className="font-heading text-3xl lg:text-5xl text-white mb-8 leading-tight">
            {title}
          </h2>
          {href
            ? <a href={href} target="_blank" rel="noopener" className={classe} style={estilo}>{buttonText}</a>
            : <button onClick={openModal} className={classe} style={estilo}>{buttonText}</button>}
          {secondaryText && (
            <div className="mt-5">
              <button onClick={openModal} className="text-sm text-white/55 hover:text-white underline underline-offset-4 transition-colors">
                {secondaryText}
              </button>
            </div>
          )}
        </ScrollReveal>
      </div>
    </section>
  );
}
