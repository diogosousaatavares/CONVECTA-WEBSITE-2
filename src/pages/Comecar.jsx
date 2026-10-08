import React, { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ArrowRight, Check, Phone, MessageCircle } from 'lucide-react';
import Seo from '@/components/Seo';
import { SITE, PLANOS, WHATSAPP_ATIVO } from '@/lib/seo';
import PorqueConvecta, { textoRespostas } from '@/components/PorqueConvecta';
import { enviarContacto } from '@/lib/contactos';

/*
 * Começar — falar connosco.
 *
 * ── O que mudou, e porquê ────────────────────────────────────────────────
 *
 * Esta página criava a conta sozinha: plano, barbearia, email, confirmação.
 * Deixou de criar. A Convecta instala-se porta a porta — vamos lá, montamos a
 * app com o dono à frente e o cartão fica registado nesse dia. Uma conta que
 * nasce sozinha a meio da noite fica a meio: sem serviços, sem horários, sem
 * cartão, e a dizer ao dono que o programa é complicado.
 *
 * ── Porque é que a página fica, e não desaparece ─────────────────────────
 *
 * Quinze botões «Começar grátis» apontam para aqui — a navbar, o rodapé, os
 * preços, a FAQ, a barra fixa, os artigos. Tirar a página era deixá-los a
 * bater em nada. Agora quem carrega neles vira contacto em vez de registo.
 *
 * ── As quatro perguntas ──────────────────────────────────────────────────
 *
 * O PorqueConvecta fica onde estava. Antes servia para ele perceber porque é
 * que veio; agora serve para as duas coisas, porque as respostas seguem
 * dentro da mensagem e chegam já qualificadas ao CRM — as mesmas quatro
 * perguntas que se fazem à porta.
 *
 * O contacto vai para `pedir_contacto`, a mesma tabela do /contacto. Um sítio
 * só para ligar a toda a gente.
 */

const campo = {
  width: '100%', padding: '12px 14px', borderRadius: 10, fontSize: 15,
  border: '1px solid var(--cv-linha)', background: 'var(--cv-card)',
  color: 'var(--cv-ink)', fontFamily: 'inherit',
};
const rotulo = { display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 };
const ajuda = { fontSize: 12, opacity: .65, marginTop: 6, lineHeight: 1.5 };

function Botao({ children, ...props }) {
  return (
    <button
      {...props}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        padding: '13px 22px', borderRadius: 100, fontSize: 15, fontWeight: 700,
        background: 'var(--cv-amarelo)', color: 'var(--cv-amarelo-texto)',
        border: 'none', cursor: props.disabled ? 'default' : 'pointer',
        opacity: props.disabled ? .55 : 1, fontFamily: 'inherit',
        ...(props.style || {}),
      }}
    >
      {children}
    </button>
  );
}

const TELEFONE = SITE.telefoneE164.replace(/\D/g, '');

export default function Comecar() {
  const [params] = useSearchParams();
  const plano = useMemo(
    () => PLANOS.find(p => p.id === params.get('plano')) || null,
    [params],
  );

  // As quatro perguntas aparecem primeiro; quem já vem decidido salta-as.
  const [naEntrada, setNaEntrada] = useState(true);
  const [respostas, setRespostas] = useState(null);

  const [form, setForm] = useState({ nome: '', negocio: '', telefone: '', email: '' });
  const [armadilha, setArmadilha] = useState('');   // honeypot: só os robôs escrevem aqui
  const [erro, setErro] = useState('');
  const [aEnviar, setAEnviar] = useState(false);
  const [enviado, setEnviado] = useState(false);

  const mudar = e => { setForm({ ...form, [e.target.name]: e.target.value }); setErro(''); };

  async function enviar(e) {
    e.preventDefault();
    if (armadilha) { setEnviado(true); return; }      // robô: finge-se que correu bem
    if (form.nome.trim().length < 2) return setErro('Diz-nos como te chamas.');
    if (form.negocio.trim().length < 2) return setErro('Diz-nos o nome da barbearia.');
    if (form.telefone.replace(/\D/g, '').length < 9) return setErro('Falta um telefone a que possamos ligar.');

    setAEnviar(true);
    try {
      await enviarContacto({
        ...form,
        mensagem: [
          plano ? `Veio do plano ${plano.nome}.` : '',
          // Saltou as perguntas: nao ha respostas nenhumas, e textoRespostas
          // lia-as de um objecto que nao existe.
          respostas ? textoRespostas(respostas) : '',
        ].filter(Boolean).join('\n'),
      });
      try { window.trackEvent?.('comecar_contacto', { plano: plano?.id || '' }); } catch { /* sem analytics */ }
      setEnviado(true);
    } catch (err) {
      setErro(err.message || 'Não foi possível enviar. Liga-nos.');
    } finally {
      setAEnviar(false);
    }
  }

  if (enviado) {
    return (
      <>
        <Seo titulo="Falamos contigo" caminho="/comecar" noindex />
        <main style={{ maxWidth: 620, margin: '0 auto', padding: '64px 20px 120px' }}>
          <div style={{ width: 46, height: 46, borderRadius: '50%', background: 'var(--cv-amarelo)',
            display: 'grid', placeItems: 'center', marginBottom: 18 }}>
            <Check size={24} color="var(--cv-amarelo-texto)" />
          </div>
          <h1 style={{ fontSize: 30, lineHeight: 1.2, margin: '0 0 14px' }}>Está anotado.</h1>
          <p style={{ opacity: .75, lineHeight: 1.6, margin: '0 0 22px' }}>
            Ligamos-te em dias úteis, normalmente no próprio dia. Combinamos meia hora,
            vamos à barbearia e deixamos a app montada com o teu nome e os teus serviços.
          </p>
          <a href={`tel:+${TELEFONE}`} style={{ textDecoration: 'none' }}>
            <Botao style={{ background: 'transparent', color: 'var(--cv-ink)',
              border: '1px solid var(--cv-linha)' }}>
              <Phone size={16} /> Ou liga-nos já: {SITE.telefone}
            </Botao>
          </a>
        </main>
      </>
    );
  }

  return (
    <>
      <Seo
        titulo="Começar"
        descricao="Falamos contigo, vamos à barbearia e deixamos a app montada no próprio dia."
        caminho="/comecar"
        noindex
      />
      <main style={{ maxWidth: 620, margin: '0 auto', padding: '64px 20px 120px' }}>
        {naEntrada ? (
          <PorqueConvecta
            onFim={r => { setRespostas(r); setNaEntrada(false); window.scrollTo?.({ top: 0, behavior: 'smooth' }); }}
            onSaltar={() => { try { window.trackEvent?.('porque_convecta_saltado'); } catch { /* sem analytics */ } setNaEntrada(false); }}
          />
        ) : (
          <>
            <h1 style={{ fontSize: 30, lineHeight: 1.2, margin: '0 0 10px' }}>
              A tua app fica montada no mesmo dia.
            </h1>
            <p style={{ opacity: .75, lineHeight: 1.6, margin: '0 0 8px' }}>
              Não te deixamos um programa para descobrires sozinho. Deixa-nos o contacto,
              combinamos meia hora e vamos lá: serviços, horários, preços e o teu logótipo
              ficam lá dentro antes de sairmos.
            </p>
            {plano && (
              <p style={{ ...ajuda, marginBottom: 0 }}>
                Vieste pelo plano <b>{plano.nome}</b> — confirmamos contigo se é mesmo o que te serve.
              </p>
            )}

            <form onSubmit={enviar} noValidate style={{ display: 'grid', gap: 16, marginTop: 28 }}>
              {/* Armadilha: invisível para gente, apetecível para robôs. */}
              <input type="text" name="website" value={armadilha} tabIndex={-1} autoComplete="off"
                aria-hidden="true" onChange={e => setArmadilha(e.target.value)}
                style={{ position: 'absolute', opacity: 0, pointerEvents: 'none', width: 1, height: 1 }} />

              <div>
                <label style={rotulo} htmlFor="nome">O teu nome</label>
                <input style={campo} id="nome" name="nome" value={form.nome} onChange={mudar}
                  maxLength={100} autoComplete="name" placeholder="Rui Costa" />
              </div>
              <div>
                <label style={rotulo} htmlFor="negocio">A barbearia</label>
                <input style={campo} id="negocio" name="negocio" value={form.negocio} onChange={mudar}
                  maxLength={100} placeholder="RC Cuts" />
              </div>
              <div>
                <label style={rotulo} htmlFor="telefone">Telefone</label>
                <input style={campo} id="telefone" name="telefone" type="tel" value={form.telefone}
                  onChange={mudar} maxLength={20} autoComplete="tel" placeholder="+351 ..." />
                <div style={ajuda}>É por aqui que te ligamos. Uma chamada, sem compromisso.</div>
              </div>
              <div>
                <label style={rotulo} htmlFor="email">Email <span style={{ opacity: .6 }}>(opcional)</span></label>
                <input style={campo} id="email" name="email" type="email" value={form.email}
                  onChange={mudar} maxLength={150} autoComplete="email" placeholder="o-teu@email.com" />
              </div>

              {erro && <div style={{ fontSize: 13, color: '#c0392b' }}>{erro}</div>}

              <Botao type="submit" disabled={aEnviar}>
                {aEnviar ? 'A enviar…' : <>Quero falar convosco <ArrowRight size={16} /></>}
              </Botao>
            </form>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 20 }}>
              <a href={`tel:+${TELEFONE}`} style={{ textDecoration: 'none' }}>
                <Botao type="button" style={{ background: 'transparent', color: 'var(--cv-ink)',
                  border: '1px solid var(--cv-linha)' }}>
                  <Phone size={16} /> {SITE.telefone}
                </Botao>
              </a>
              {WHATSAPP_ATIVO && (
                <a href={`https://wa.me/${TELEFONE}`} target="_blank" rel="noopener noreferrer"
                  style={{ textDecoration: 'none' }}>
                  <Botao type="button" style={{ background: 'transparent', color: 'var(--cv-ink)',
                    border: '1px solid var(--cv-linha)' }}>
                    <MessageCircle size={16} /> WhatsApp
                  </Botao>
                </a>
              )}
            </div>
          </>
        )}
      </main>
    </>
  );
}
