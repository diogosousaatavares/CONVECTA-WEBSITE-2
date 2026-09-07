import React from "react";
import ScrollReveal from "@/components/ScrollReveal";
import AmbientParticles from "@/components/AmbientParticles";
import { useContactModal } from "@/lib/ContactModalContext";

export default function CtaSection({ title, buttonText = "Falar Connosco" }) {
  const { open: openModal } = useContactModal();

  return (
    <section style={{ backgroundColor: "#1a1a1a" }} className="py-24 lg:py-32 relative overflow-hidden">
      <AmbientParticles count={7} />
      <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center">
        <ScrollReveal>
          <h2 className="font-heading text-3xl lg:text-5xl text-white mb-8 leading-tight">
            {title}
          </h2>
          <button
            onClick={openModal}
            className="btn-glow inline-flex items-center px-8 py-4 text-sm font-bold uppercase tracking-wide rounded-sm"
            style={{ backgroundColor: "#fee96d", color: "#1a1a1a" }}
          >
            {buttonText}
          </button>
        </ScrollReveal>
      </div>
    </section>
  );
}
