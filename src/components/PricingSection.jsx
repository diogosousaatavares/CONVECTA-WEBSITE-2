import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import DoisTipos from "@/components/DoisTipos";
import { enviarContacto } from '@/lib/contactos';
import FundoLinhas from "@/components/FundoLinhas";

/*
 * Os preços (10/11/2026, Diogo): o site deixa de mostrar valores. O preço é à
 * medida de cada barbearia — profissionais, pagamentos online, website… —, e
 * no lugar dos planos fica um formulário curto que pede o contacto (vai para
 * os contactos, como os pedidos de demonstração).
 */

/* ── o pedido de preço (10/11/2026: o site deixa de mostrar preços) ── */
const PROFISSIONAIS = ["Só eu", "2 a 3", "4 a 6", "7 ou mais"];
const PRECISA = ["Pagamentos online", "Lembretes", "Gestão da equipa", "Website"];
const telLimpo = t => String(t || "").replace(/[^\d+]/g, "");
const telValido = t => telLimpo(t).replace(/^\+?351/, "").replace(/\D/g, "").length === 9;

function Chip({ on, children, onClick }) {
  return (
    <button type="button" onClick={onClick} className={`pp-chip${on ? " on" : ""}`} aria-pressed={on}>
      {on && <Check size={13} strokeWidth={3} />}{children}
    </button>
  );
}

function PedidoPreco() {
  const [f, setF] = useState({ nome: "", barbearia: "", telefone: "", email: "" });
  const [prof, setProf] = useState("");
  const [precisa, setPrecisa] = useState([]);
  const [erro, setErro] = useState("");
  const [aEnviar, setAEnviar] = useState(false);
  const [feito, setFeito] = useState(false);
  const s = (k, v) => setF(x => ({ ...x, [k]: v }));
  async function enviar(e) {
    e.preventDefault();
    if (!f.nome.trim()) return setErro("Escreve o teu nome.");
    if (!f.barbearia.trim()) return setErro("Escreve o nome da barbearia.");
    if (!telValido(f.telefone)) return setErro("Escreve o teu telemóvel (9 dígitos).");
    if (!prof) return setErro("Diz-nos quantos profissionais são.");
    setErro(""); setAEnviar(true);
    try {
      await enviarContacto({
        nome: f.nome.trim(), negocio: f.barbearia.trim(), telefone: telLimpo(f.telefone), email: f.email.trim().toLowerCase(),
        mensagem: ["Pedido de preço (site).", `Profissionais: ${prof}`, precisa.length ? `Precisa de: ${precisa.join(", ")}` : ""].filter(Boolean).join("\n"),
      });
      try { window.trackEvent?.("pedido_preco", { profissionais: prof }); } catch { /* */ }
      setFeito(true);
    } catch (err) { setErro(err.message || "Não foi possível enviar. Tenta outra vez."); } finally { setAEnviar(false); }
  }
  if (feito) {
    return (
      <div className="pp-cartao pp-feito">
        <div className="pp-ok"><Check size={24} strokeWidth={3} /></div>
        <p className="cv-h3" style={{ margin: 0 }}>Recebemos, {f.nome.trim().split(" ")[0]}.</p>
        <p className="cv-texto" style={{ margin: 0 }}>Ligamos-te com uma proposta à medida da {f.barbearia.trim()}. Se preferires, fala já connosco:</p>
        <a className="cv-btn" href={`https://wa.me/351914874725?text=${encodeURIComponent("Olá! Pedi o preço da Convecta no site.")}`} target="_blank" rel="noopener noreferrer">WhatsApp · 914 874 725 <ArrowRight size={15} /></a>
      </div>
    );
  }
  return (
    <form className="pp-cartao" onSubmit={enviar} noValidate>
      <div className="pp-linha2">
        <input className="pp-campo" value={f.nome} onChange={e => s("nome", e.target.value)} placeholder="O teu nome" autoComplete="name" aria-label="O teu nome" />
        <input className="pp-campo" value={f.barbearia} onChange={e => s("barbearia", e.target.value)} placeholder="Nome da barbearia" autoComplete="organization" aria-label="Nome da barbearia" />
      </div>
      <div className="pp-linha2">
        <input className="pp-campo" type="tel" inputMode="tel" value={f.telefone} onChange={e => s("telefone", e.target.value)} placeholder="Telemóvel" autoComplete="tel" aria-label="Telemóvel" />
        <input className="pp-campo" type="email" inputMode="email" value={f.email} onChange={e => s("email", e.target.value)} placeholder="Email (opcional)" autoComplete="email" aria-label="Email" />
      </div>
      <div>
        <p className="pp-rotulo">Quantos profissionais são?</p>
        <div className="pp-chips">{PROFISSIONAIS.map(p => <Chip key={p} on={prof === p} onClick={() => setProf(p)}>{p}</Chip>)}</div>
      </div>
      <div>
        <p className="pp-rotulo">O que precisas?</p>
        <div className="pp-chips">{PRECISA.map(p => <Chip key={p} on={precisa.includes(p)} onClick={() => setPrecisa(l => l.includes(p) ? l.filter(x => x !== p) : [...l, p])}>{p}</Chip>)}</div>
      </div>
      {erro && <p className="pp-erro" role="alert">{erro}</p>}
      <button type="submit" className="cv-btn pp-enviar" disabled={aEnviar}>{aEnviar ? "A enviar…" : <>Quero saber o meu preço <ArrowRight size={15} /></>}</button>
      <p className="pp-nota">Sem compromisso.</p>
    </form>
  );
}

/* ── a seccao ───────────────────────────────────────────────────── */
export default function PricingSection({ nivelTitulo = "h2", semApelo = false }) {
  const Titulo = nivelTitulo;
  // os titulos nao podem saltar niveis: h1 -> h2, h2 -> h3
  const NivelNome = nivelTitulo === "h1" ? "h2" : "h3";

  return (
    <section id="precos" className="cv-sec" style={{ position: "relative", overflow: "hidden" }}>
      <FundoLinhas />
      <style>{`
.pp-grelha{display:grid;grid-template-columns:minmax(0,.85fr) minmax(0,1.15fr);gap:28px;align-items:start;margin:40px auto 0;max-width:1000px}
.pp-porque{list-style:none;margin:0;padding:0;display:grid;gap:16px}
.pp-porque li{display:flex;gap:12px;align-items:flex-start}
.pp-porque b{display:block;font-size:1.05rem}.pp-porque small{display:block;color:var(--cv-ink-2);font-size:.95rem;margin-top:2px}
.pp-v{width:24px;height:24px;border-radius:50%;background:var(--cv-amarelo,#FEE96D);color:#111;display:grid;place-items:center;flex-shrink:0;margin-top:1px}
.pp-cartao{display:grid;gap:16px;padding:24px;border-radius:22px;background:#fff;border:1px solid var(--cv-linha);box-shadow:0 24px 60px -36px rgba(0,0,0,.35);text-align:left}
.pp-linha2{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.pp-campo{width:100%;padding:14px 15px;border-radius:12px;border:1px solid var(--cv-linha);background:var(--cv-ground,#FBFAF8);font:inherit;font-size:1rem;color:var(--cv-ink)}
.pp-campo:focus{outline:2px solid var(--cv-amarelo,#FEE96D);outline-offset:1px}
.pp-rotulo{margin:0 0 8px;font-weight:700;font-size:.95rem}.pp-rotulo span{font-weight:500;color:var(--cv-ink-3)}
.pp-chips{display:flex;flex-wrap:wrap;gap:8px}
.pp-chip{display:inline-flex;align-items:center;gap:6px;padding:9px 14px;border-radius:999px;border:1px solid var(--cv-linha);background:#fff;font:inherit;font-size:.92rem;font-weight:600;color:var(--cv-ink);cursor:pointer;transition:background .15s,border-color .15s}
.pp-chip.on{background:var(--cv-amarelo,#FEE96D);border-color:transparent}
.pp-erro{margin:0;color:#B42318;font-size:.92rem;font-weight:600}
.pp-enviar{justify-content:center;width:100%}
.pp-nota{margin:0;text-align:center;font-size:.85rem;color:var(--cv-ink-3)}
.pp-feito{justify-items:start}
.pp-ok{width:48px;height:48px;border-radius:50%;background:var(--cv-amarelo,#FEE96D);display:grid;place-items:center;color:#111}
@media (max-width:860px){.pp-grelha{grid-template-columns:1fr}}
@media (max-width:520px){.pp-linha2{grid-template-columns:1fr}.pp-cartao{padding:18px}}
`}</style>

      {/* as esferas: o mesmo 3D suave do resto do site */}
      <div aria-hidden="true" className="pr-esferas">
        <span className="pr-esfera pr-esfera-a" />
        <span className="pr-esfera pr-esfera-b" />
      </div>

      <div className="cv-wrap" style={{ position: "relative", zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }} style={{ textAlign: "center" }}>
          <p className="cv-olho" style={{ marginBottom: 14 }}>Preços</p>
          <Titulo className="cv-h2" style={{ margin: "0 auto", maxWidth: "18ch" }}>
            Um preço à medida da tua barbearia.
          </Titulo>
          <p className="cv-texto" style={{ margin: "16px auto 0", maxWidth: "56ch" }}>
            O preço varia com o que a tua barbearia precisa. Deixa o contacto e
            ligamos-te com uma proposta.
          </p>
        </motion.div>

        <div className="pp-grelha">
          <ul className="pp-porque">
            {[
              ["Pagas só o que usas", ""],
              ["Sem comissões por marcação", "Cada marcação é tua por inteiro."],
              ["14 dias grátis, sem cartão", "Experimentas antes de decidir."],
              ["Suporte por quem fez a app", "Telefone e WhatsApp, em dias úteis."],
            ].map(([t, d]) => (
              <li key={t}><span className="pp-v"><Check size={13} strokeWidth={3} /></span><span><b>{t}</b>{void d}</span></li>
            ))}
          </ul>
          <PedidoPreco />
        </div>

        {/* Os dois tipos no mesmo espaço: secção própria (DoisTipos.jsx). */}
        <DoisTipos />

        {/* O apelo. Ate aqui mandava-o ver uma barbearia de outra pessoa:
            agora monta-se a dele, com o nome dele. Ver a casa dos outros nao
            prende ninguem; ver a propria, prende. */}
        {/* Na página inicial sai (18/10/2026): no lugar dele entra o
            «Montar o meu negócio», logo a seguir aos planos. */}
        {!semApelo && <div className="pr-apelo">
          <div>
            {React.createElement(NivelNome, { className: "cv-h3", style: { margin: 0 } }, "Vê-a com o teu nome, hoje.")}
          </div>
          <div className="pr-apelo-botoes">
            <Link className="cv-btn" to="/comecar">
              Começar grátis <ArrowRight size={15} />
            </Link>
            <Link className="cv-btn-linha" to="/funcionalidades">
              Ver tudo o que faz
            </Link>
          </div>
        </div>}
      </div>
    </section>
  );
}
