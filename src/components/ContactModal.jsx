import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Send, CheckCircle } from "lucide-react";
import { useContactModal } from "@/lib/ContactModalContext";
import { enviarContacto } from "@/lib/contactos";

const STEPS = [
  { key: "nome", label: "Como te chamas?", placeholder: "O teu nome", type: "text", maxLength: 100 },
  { key: "negocio", label: "Como se chama a tua barbearia?", placeholder: "Nome da barbearia", type: "text", maxLength: 100 },
  { key: "telefone", label: "Qual é o teu número de telefone?", placeholder: "+351 ...", type: "tel", maxLength: 20 },
  { key: "email", label: "E o teu email?", placeholder: "o-teu@email.com", type: "email", maxLength: 150 },
  { key: "mensagem", label: "Queres dizer mais alguma coisa? (opcional)", placeholder: "Quantos barbeiros, como marcas hoje…", type: "textarea", maxLength: 2000 },
];

export default function ContactModal() {
  const { isOpen, close } = useContactModal();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ nome: "", negocio: "", telefone: "", email: "", mensagem: "" });
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [website, setWebsite] = useState(""); // honeypot

  const sanitize = (value) =>
    value.replace(/<[^>]*>/g, "").replace(/[\r\n]{3,}/g, "\n\n").trim();

  const validate = (key, value) => {
    if (key === "nome" && value.trim().length < 2) return "Indica o teu nome.";
    if (key === "negocio" && value.trim().length < 2) return "Indica o nome da tua barbearia.";
    if (key === "telefone" && value.replace(/\D/g, "").length < 9) return "Indica um telefone válido.";
    if (key === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Indica um email válido.";
    return "";
  };

  const currentStep = STEPS[step];
  const currentValue = form[currentStep?.key] ?? "";

  const handleNext = async () => {
    const key = currentStep.key;
    if (key !== "mensagem") {
      const err = validate(key, currentValue);
      if (err) { setError(err); return; }
    }
    setError("");

    if (step < STEPS.length - 1) {
      setStep(s => s + 1);
    } else {
      if (website) { setSent(true); return; }
      const sanitized = {
        nome: sanitize(form.nome),
        negocio: sanitize(form.negocio),
        telefone: sanitize(form.telefone),
        email: sanitize(form.email),
        mensagem: sanitize(form.mensagem),
      };
      setSending(true);
      try {
        await enviarContacto(sanitized);
        setSent(true);
      } catch (e) {
        // Antes falhava em silencio e dizia "enviado" na mesma. Um contacto
        // que se perde sem ninguem saber e um cliente que nunca liga de volta.
        setError(e.message || "Não foi possível enviar. Tenta outra vez.");
      }
      setSending(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && currentStep?.type !== "textarea") {
      e.preventDefault();
      handleNext();
    }
  };

  const handleClose = () => {
    close();
    setTimeout(() => {
      setStep(0);
      setForm({ nome: "", negocio: "", telefone: "", email: "", mensagem: "" });
      setError("");
      setSent(false);
      setSending(false);
      setWebsite("");
    }, 400);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 bg-black/75"
            style={{ backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)" }}
            onClick={handleClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.96 }}
            transition={{ type: "spring", damping: 26, stiffness: 300 }}
            className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 sm:p-10 rounded-2xl"
            style={{
              backgroundColor: "#1a1a1a",
              border: "1px solid rgba(254,233,109,0.12)",
              boxShadow: "0 32px 80px rgba(0,0,0,0.6)",
            }}
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-5 right-5 text-white/30 hover:text-white/80 transition-colors"
              aria-label="Fechar"
            >
              <X size={20} />
            </button>

            {!sent ? (
              <>
                {/* Progress bar */}
                <div className="flex gap-1.5 mb-8">
                  {STEPS.map((_, i) => (
                    <div
                      key={i}
                      className="h-0.5 flex-1 rounded-full overflow-hidden"
                      style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
                    >
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: "#fee96d" }}
                        animate={{ width: i < step ? "100%" : i === step ? "60%" : "0%" }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                      />
                    </div>
                  ))}
                </div>

                <p className="text-xs font-bold uppercase tracking-[0.2em] mb-3" style={{ color: "rgba(255,255,255,0.25)" }}>
                  Passo {step + 1} de {STEPS.length}
                </p>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                  >
                    <h2
                      className="font-heading text-2xl lg:text-3xl text-white mb-7 leading-tight"
                      style={{ letterSpacing: "-0.01em" }}
                    >
                      {currentStep.label}
                    </h2>

                    {/* Honeypot — invisible to real users */}
                    <input
                      type="text"
                      value={website}
                      onChange={e => setWebsite(e.target.value)}
                      tabIndex={-1}
                      autoComplete="off"
                      className="absolute opacity-0 pointer-events-none -z-10 w-px h-px"
                      aria-hidden="true"
                    />

                    {currentStep.type === "textarea" ? (
                      <textarea
                        rows={4}
                        maxLength={currentStep.maxLength}
                        value={currentValue}
                        onChange={e => { setForm(f => ({ ...f, [currentStep.key]: e.target.value })); setError(""); }}
                        placeholder={currentStep.placeholder}
                        autoFocus
                        className="w-full bg-transparent py-3 text-white text-base focus:outline-none resize-none transition-colors"
                        style={{
                          borderBottom: `1.5px solid ${error ? "#ef4444" : "rgba(255,255,255,0.18)"}`,
                          caretColor: "#fee96d",
                        }}
                      />
                    ) : (
                      <input
                        type={currentStep.type}
                        maxLength={currentStep.maxLength}
                        value={currentValue}
                        onChange={e => { setForm(f => ({ ...f, [currentStep.key]: e.target.value })); setError(""); }}
                        onKeyDown={handleKeyDown}
                        placeholder={currentStep.placeholder}
                        autoFocus
                        className="w-full bg-transparent py-3 text-white text-xl focus:outline-none transition-colors"
                        style={{
                          borderBottom: `1.5px solid ${error ? "#ef4444" : "rgba(255,255,255,0.18)"}`,
                          caretColor: "#fee96d",
                        }}
                      />
                    )}

                    {error && (
                      <motion.p
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xs mt-2"
                        style={{ color: "#ef4444" }}
                      >
                        {error}
                      </motion.p>
                    )}
                  </motion.div>
                </AnimatePresence>

                <div className="flex items-center justify-between mt-10">
                  {step > 0 ? (
                    <button
                      onClick={() => { setStep(s => s - 1); setError(""); }}
                      className="text-sm transition-colors"
                      style={{ color: "rgba(255,255,255,0.35)" }}
                      onMouseEnter={e => e.currentTarget.style.color = "rgba(255,255,255,0.7)"}
                      onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.35)"}
                    >
                      ← Voltar
                    </button>
                  ) : <div />}

                  <motion.button
                    onClick={handleNext}
                    disabled={sending}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold rounded-sm disabled:opacity-50"
                    style={{ backgroundColor: "#fee96d", color: "#1a1a1a" }}
                  >
                    {sending ? (
                      "A enviar..."
                    ) : step < STEPS.length - 1 ? (
                      <><span>Continuar</span><ArrowRight size={15} /></>
                    ) : (
                      <><span>Enviar</span><Send size={15} /></>
                    )}
                  </motion.button>
                </div>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", damping: 20, stiffness: 300 }}
                className="text-center py-8"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", damping: 15, stiffness: 350, delay: 0.1 }}
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                  style={{ backgroundColor: "#fee96d" }}
                >
                  <CheckCircle size={28} style={{ color: "#1a1a1a" }} />
                </motion.div>
                <h3 className="font-heading text-2xl text-white mb-3">Recebemos o teu pedido!</h3>
                <p className="text-sm max-w-xs mx-auto mb-8" style={{ color: "rgba(255,255,255,0.45)", lineHeight: 1.7 }}>
                  Respondemos em dias úteis, normalmente no próprio dia, por telefone ou WhatsApp.
                </p>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleClose}
                  className="px-7 py-3 text-sm font-bold rounded-sm"
                  style={{ backgroundColor: "#fee96d", color: "#1a1a1a" }}
                >
                  Fechar
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
