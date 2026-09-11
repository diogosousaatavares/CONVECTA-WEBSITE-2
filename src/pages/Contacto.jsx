import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import Seo from "@/components/Seo";
import { migalhasLd } from "@/lib/seo";
import { enviarContacto } from "@/lib/contactos";
import ScrollReveal from "@/components/ScrollReveal";
import GradientTransition from "@/components/GradientTransition";
import AmbientParticles from "@/components/AmbientParticles";

export default function Contacto() {
  const [form, setForm] = useState({ nome: "", negocio: "", telefone: "", email: "", mensagem: "" });
  const [website, setWebsite] = useState(""); // honeypot field — bots fill this, humans don't
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  // Strip HTML/script-like content and excess whitespace to prevent injection in email body
  const sanitize = (value) =>
    value
      .replace(/<[^>]*>/g, "")
      .replace(/[\r\n]{3,}/g, "\n\n")
      .trim();

  const validate = (data) => {
    const next = {};
    if (!data.nome || data.nome.trim().length < 2) {
      next.nome = "Indica o teu nome.";
    }
    if (!data.negocio || data.negocio.trim().length < 2) {
      next.negocio = "Indica o nome da tua barbearia.";
    }
    const phoneDigits = data.telefone.replace(/\D/g, "");
    if (phoneDigits.length < 9) {
      next.telefone = "Indica um telefone válido.";
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(data.email)) {
      next.email = "Indica um email válido.";
    }
    if (data.mensagem && data.mensagem.length > 2000) {
      next.mensagem = "Mensagem demasiado longa (máx. 2000 caracteres).";
    }
    return next;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Honeypot: if filled, silently treat as success without sending (bot trap)
    if (website) {
      setSent(true);
      return;
    }

    const sanitized = {
      nome: sanitize(form.nome),
      negocio: sanitize(form.negocio),
      telefone: sanitize(form.telefone),
      email: sanitize(form.email),
      mensagem: sanitize(form.mensagem),
    };

    const validationErrors = validate(sanitized);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Basic client-side rate limiting: prevent resubmission within 30s
    try {
      const lastSubmit = sessionStorage.getItem("convecta_last_submit");
      if (lastSubmit && Date.now() - Number(lastSubmit) < 30000) {
        setErrors({ form: "Já enviámos o teu pedido. Aguarda um momento antes de tentar novamente." });
        return;
      }
    } catch {}

    setSending(true);
    try {
      await enviarContacto(sanitized);
      try { sessionStorage.setItem("convecta_last_submit", String(Date.now())); } catch {}
      setSent(true);
    } catch (e) {
      setErrors({ form: e.message || "Não foi possível enviar. Tenta outra vez." });
    } finally {
      setSending(false);
    }
  };

  return (
    <div>
      <Seo
        titulo="Contacto — Fala com a Convecta sobre marcações online para a tua barbearia"
        descricao="Fala com quem fez a Convecta: telefone +351 912 381 717, geral@convecta.pt ou o formulário. Respondemos em dias úteis, normalmente no próprio dia. Porto, Portugal."
        caminho="/contacto"
        ld={[migalhasLd([{ nome: "Início", caminho: "/" }, { nome: "Contacto", caminho: "/contacto" }])]}
      />

      {/* Hero */}
      <section style={{ backgroundColor: "#1a1a1a" }} className="pt-32 pb-20 lg:pt-40 lg:pb-28 relative overflow-hidden">
        <AmbientParticles count={6} />
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/40 mb-4">Contacto</p>
            <h1 className="font-heading text-4xl lg:text-6xl text-white mb-4">
              Vamos <span style={{ color: "#fee96d" }}>falar.</span>
            </h1>
            <p className="text-lg text-white/50 max-w-2xl mx-auto">
              Sem compromisso, sem pressão. Quinze minutos ao telefone ou no WhatsApp para percebermos a tua barbearia e dizermos, sem rodeios, se a Convecta faz sentido para ti.
            </p>
          </motion.div>
        </div>
      </section>

      <GradientTransition from="#1a1a1a" to="#ffffff" />

      {/* Form + Info */}
      <section className="bg-white py-24 lg:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Form */}
            <div className="lg:col-span-3">
              <ScrollReveal>
                {sent ? (
                  <div className="text-center py-16">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                      style={{ backgroundColor: "#fee96d" }}
                    >
                      <Send size={24} className="text-dark" />
                    </div>
                    <h3 className="font-heading text-2xl text-dark mb-3">Recebemos o teu pedido.</h3>
                    <p className="text-dark/50 text-sm max-w-md mx-auto">
                      Respondemos em dias úteis, normalmente no próprio dia, por telefone ou WhatsApp.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
                    {/* Honeypot field — hidden from real users, bots tend to fill it */}
                    <input
                      type="text"
                      name="website"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      tabIndex={-1}
                      autoComplete="off"
                      className="absolute opacity-0 pointer-events-none -z-10 w-px h-px"
                      aria-hidden="true"
                    />
                    {errors.form && (
                      <p className="text-xs text-red-500 -mb-2">{errors.form}</p>
                    )}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="nome" className="text-xs font-bold uppercase tracking-wider text-dark/40 mb-2 block">
                          Nome
                        </label>
                        <input
                          id="nome"
                          name="nome"
                          type="text"
                          required
                          maxLength={100}
                          value={form.nome}
                          onChange={handleChange}
                          className="w-full bg-transparent border-b border-dark/15 py-3 text-dark text-sm focus:outline-none focus:border-mustard transition-colors"
                          placeholder="O teu nome"
                        />
                        {errors.nome && <p className="text-xs text-red-500 mt-1">{errors.nome}</p>}
                      </div>
                      <div>
                        <label htmlFor="negocio" className="text-xs font-bold uppercase tracking-wider text-dark/40 mb-2 block">
                          Barbearia
                        </label>
                        <input
                          id="negocio"
                          name="negocio"
                          type="text"
                          required
                          maxLength={100}
                          value={form.negocio}
                          onChange={handleChange}
                          className="w-full bg-transparent border-b border-dark/15 py-3 text-dark text-sm focus:outline-none focus:border-mustard transition-colors"
                          placeholder="Nome da tua barbearia"
                        />
                        {errors.negocio && <p className="text-xs text-red-500 mt-1">{errors.negocio}</p>}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="telefone" className="text-xs font-bold uppercase tracking-wider text-dark/40 mb-2 block">
                          Telefone
                        </label>
                        <input
                          id="telefone"
                          name="telefone"
                          type="tel"
                          required
                          maxLength={20}
                          value={form.telefone}
                          onChange={handleChange}
                          className="w-full bg-transparent border-b border-dark/15 py-3 text-dark text-sm focus:outline-none focus:border-mustard transition-colors"
                          placeholder="+351 ..."
                        />
                        {errors.telefone && <p className="text-xs text-red-500 mt-1">{errors.telefone}</p>}
                      </div>
                      <div>
                        <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-dark/40 mb-2 block">
                          Email
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          maxLength={150}
                          value={form.email}
                          onChange={handleChange}
                          className="w-full bg-transparent border-b border-dark/15 py-3 text-dark text-sm focus:outline-none focus:border-mustard transition-colors"
                          placeholder="o-teu@email.com"
                        />
                        {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                      </div>
                    </div>
                    <div>
                      <label htmlFor="mensagem" className="text-xs font-bold uppercase tracking-wider text-dark/40 mb-2 block">
                        Mensagem <span className="text-dark/20">(opcional)</span>
                      </label>
                      <textarea
                        id="mensagem"
                        name="mensagem"
                        rows={4}
                        maxLength={2000}
                        value={form.mensagem}
                        onChange={handleChange}
                        className="w-full bg-transparent border-b border-dark/15 py-3 text-dark text-sm focus:outline-none focus:border-mustard transition-colors resize-none"
                        placeholder="Quantos barbeiros, como marcas hoje, o que te faz perder tempo…"
                      />
                      {errors.mensagem && <p className="text-xs text-red-500 mt-1">{errors.mensagem}</p>}
                    </div>
                    <button
                      type="submit"
                      disabled={sending}
                      className="btn-glow w-full py-4 text-sm font-bold uppercase tracking-wide rounded-sm disabled:opacity-50"
                      style={{ backgroundColor: "#fee96d", color: "#1a1a1a" }}
                    >
                      {sending ? "A enviar..." : "Falar Connosco"}
                    </button>
                  </form>
                )}
              </ScrollReveal>
            </div>

            {/* Info */}
            <div className="lg:col-span-2">
              <ScrollReveal delay={0.2}>
                <div className="bg-light p-8 rounded-sm sticky top-28">
                  <div className="flex items-center gap-3 mb-6">
                    <Clock size={16} className="text-mustard" />
                    <span className="text-xs font-bold uppercase tracking-wider text-dark/60">
                      Resposta em dias úteis, até 24 h
                    </span>
                  </div>

                  <div className="flex flex-col gap-5 mb-8">
                    <a href="mailto:geral@convecta.pt" className="flex items-center gap-3 text-sm text-dark/70 hover:text-dark transition-colors">
                      <Mail size={16} className="text-mustard shrink-0" />
                      geral@convecta.pt
                    </a>
                    <a href="tel:+351912381717" className="flex items-center gap-3 text-sm text-dark/70 hover:text-dark transition-colors">
                      <Phone size={16} className="text-mustard shrink-0" />
                      +351 912 381 717
                    </a>
                    <span className="flex items-start gap-3 text-sm text-dark/70">
                      <MapPin size={16} className="text-mustard shrink-0 mt-0.5" />
                      Rua Faria Guimarães, nº 69, 4000-206 Porto
                    </span>
                    <a
                      href="https://instagram.com/convecta.pt"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-sm text-dark/70 hover:text-dark transition-colors"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-mustard"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                      @convecta.pt
                    </a>
                  </div>

                  <div className="border-t border-dark/10 pt-6">
                    <p className="text-xs text-dark/40 mb-4 text-center">Ou fala connosco diretamente por:</p>
                    <div className="flex gap-3">
                      <a
                        href="mailto:geral@convecta.pt"
                        className="flex-1 text-center py-2.5 text-xs font-bold uppercase tracking-wider border border-dark/15 rounded-sm text-dark hover:border-dark transition-colors"
                      >
                        Enviar Email
                      </a>
                      <a
                        href="tel:+351912381717"
                        className="flex-1 text-center py-2.5 text-xs font-bold uppercase tracking-wider border border-dark/15 rounded-sm text-dark hover:border-dark transition-colors"
                      >
                        Ligar Agora
                      </a>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}