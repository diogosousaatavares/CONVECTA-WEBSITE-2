import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Mail, Play, CalendarCheck, BellRing, Smartphone } from 'lucide-react';
import Seo from '@/components/Seo';
import { PLANOS, VERSAO_ACORDO } from '@/lib/seo';
import { supabase, temSupabase } from '@/lib/supabase';
import { enviarContacto } from '@/lib/contactos';
import { lerOrigem, guardarOrigem } from '@/lib/origem';

/*
 * /experimenta — A LANDING DE CONVERSÃO (10/11/2026, Diogo).
 *
 * Low ticket = muito volume: o Instagram traz gente, esta página converte.
 * Uma página só, sem menu: promessa → prova → como funciona → formulário.
 *
 * O formulário cria a CONTA com o registo de sempre (signUp com os dados no
 * user_metadata, como o /comecar): a app nasce quando ele confirma o email e
 * entra (função registar-barbearia), e é aí que entra no CRM — com as 3
 * respostas de qualificação nos campos do lead (q_profissionais, qual_gestao,
 * necessidade). Lead quente: o Diogo liga no próprio dia e marca a R2.
 * O contacto vai TAMBÉM logo para pedir_contacto, para não se perder quem
 * não confirma o email.
 */

const PAINEL = 'https://administrador.marcacoes.app';
const TESTEMUNHO = 'https://www.instagram.com/convecta.pt/reel/DffqKjniPyI/';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const RESERVADOS = ['www', 'admin', 'administrador', 'api', 'app', 'super', 'superadmin', 'portal', 'painel', 'mail', 'email', 'static', 'cdn', 'assets', 'blog', 'suporte', 'ajuda', 'conta', 'login', 'convecta', 'gestao'];
const slugDe = nome => (nome || '').trim().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
  .replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '').replace(/-+/g, '-').replace(/^-|-$/g, '').slice(0, 60);
const telLimpo = t => String(t || '').replace(/[\s.\-()]/g, '');
const telValido = t => /^(\+351|00351)?[92]\d{8}$/.test(telLimpo(t)) || /^\+\d{8,15}$/.test(telLimpo(t));

/* As 3 perguntas de qualificação — as mesmas do CRM (guião da chamada). */
const PROFISSIONAIS = [
  { v: 1, l: 'Só eu' },
  { v: 3, l: '2 a 3' },
  { v: 5, l: '4 a 5' },
  { v: 6, l: '6 ou mais' },
];
const GESTAO = [
  { v: 'h2', l: 'WhatsApp, telefone ou caderno' },
  { v: 'h1', l: 'Por ordem de chegada' },
  { v: 'h3', l: 'Já uso uma app' },
  { v: 'h4', l: 'Usei uma app e deixei' },
];
const MELHORAR = ['Menos faltas', 'Mais clientes', 'Menos tempo ao telemóvel', 'Agenda organizada', 'Imagem mais profissional'];

const planoPara = n => (n <= 1 ? 'essencial' : n <= 5 ? 'profissional' : 'business');
const desde = PLANOS[0]?.precoTexto || '';

const campo = { width: '100%', padding: '13px 14px', borderRadius: 12, fontSize: 16, border: '1px solid var(--cv-linha)', background: '#fff', color: 'var(--cv-ink)', fontFamily: 'inherit' };
const rotulo = { display: 'block', fontSize: 13.5, fontWeight: 700, margin: '0 0 8px' };

function Pilula({ on, children, onClick }) {
  return (
    <button type="button" onClick={onClick} aria-pressed={on}
      style={{ padding: '10px 14px', borderRadius: 999, fontSize: 14.5, fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer',
        border: `1.5px solid ${on ? 'var(--cv-ink)' : 'var(--cv-linha)'}`, background: on ? 'var(--cv-ink)' : '#fff', color: on ? '#fff' : 'var(--cv-ink)' }}>
      {children}
    </button>
  );
}

export default function Experimenta() {
  useEffect(() => { try { guardarOrigem(); } catch { /* sem armazenamento */ } }, []);
  const [f, setF] = useState({ nome: '', barbearia: '', telefone: '', email: '', password: '' });
  const [prof, setProf] = useState(null);
  const [gestao, setGestao] = useState('');
  const [melhorar, setMelhorar] = useState([]);
  const [aceita, setAceita] = useState(false);
  const [erro, setErro] = useState('');
  const [aEnviar, setAEnviar] = useState(false);
  const [feito, setFeito] = useState(false);
  const s = (k, v) => setF(x => ({ ...x, [k]: v }));
  const tocarMelhorar = v => setMelhorar(l => (l.includes(v) ? l.filter(x => x !== v) : [...l, v]));
  const slug = slugDe(f.barbearia);

  const irAoFormulario = () => { document.getElementById('formulario')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); try { window.trackEvent?.('landing_cta'); } catch { /* */ } };

  async function enviar(e) {
    e.preventDefault();
    setErro('');
    if (!f.nome.trim()) return setErro('Escreve o teu nome.');
    if (!f.barbearia.trim() || !slug) return setErro('Escreve o nome da tua barbearia.');
    if (RESERVADOS.includes(slug)) return setErro('Esse nome dá um endereço que é nosso. Escreve-o de outra forma.');
    if (!telValido(f.telefone)) return setErro('Escreve o teu telemóvel (9 dígitos) — é por aí que te ligamos.');
    if (!EMAIL_RE.test(f.email.trim())) return setErro('Escreve um email válido.');
    if (f.password.length < 8) return setErro('A palavra-passe tem de ter pelo menos 8 caracteres.');
    if (!prof) return setErro('Diz-nos quantos profissionais têm.');
    if (!gestao) return setErro('Diz-nos como marcam hoje.');
    if (!aceita) return setErro('Para criar a conta tens de aceitar os Termos e a Política de Privacidade.');
    if (!temSupabase()) return setErro('O registo não está disponível neste momento. Fala connosco pelo WhatsApp.');

    const qualificacao = { profissionais: prof, gestao, melhorar };
    const texto = [
      'Landing /experimenta — lead quente.',
      `Profissionais: ${PROFISSIONAIS.find(p => p.v === prof)?.l}`,
      `Como marca hoje: ${GESTAO.find(g => g.v === gestao)?.l}`,
      melhorar.length ? `Quer melhorar: ${melhorar.join(', ')}` : '',
    ].filter(Boolean).join('\n');

    setAEnviar(true);
    // O contacto vai já — se ele não confirmar o email, não se perde.
    enviarContacto({ nome: f.nome.trim(), negocio: f.barbearia.trim(), telefone: telLimpo(f.telefone), email: f.email.trim().toLowerCase(), mensagem: texto }).catch(() => {});
    try {
      const { error } = await supabase().auth.signUp({
        email: f.email.trim().toLowerCase(),
        password: f.password,
        options: {
          data: {
            nome_barbearia: f.barbearia.trim(), slug, tipoNegocio: 'barbearia', barbeiros: prof, plano: planoPara(prof), periodo: 'quinzenal',
            telefone: '', nome_responsavel: f.nome.trim(), telefone_responsavel: telLimpo(f.telefone), registo_versao: 2,
            origem_marketing: lerOrigem() || { utm_source: 'landing', utm_content: 'experimenta' },
            acordo_rgpd_versao: VERSAO_ACORDO, acordo_rgpd_aceite_em: new Date().toISOString(),
            qualificacao, respostas_texto: texto, landing: 'experimenta',
          },
          emailRedirectTo: `${PAINEL}/entrar`,
        },
      });
      if (error) {
        const m = (error.message || '').toLowerCase();
        if (/already registered|already been registered|user already/.test(m)) { setFeito(true); return; }
        if (/rate|too many/.test(m)) return setErro('Já foram feitas várias tentativas. Espera um minuto e tenta outra vez.');
        if (/password/.test(m)) return setErro('Essa palavra-passe é demasiado fraca. Escolhe outra com pelo menos 8 caracteres.');
        return setErro(error.message || 'Não foi possível criar a conta.');
      }
      try { window.trackEvent?.('landing_conta_criada', { profissionais: prof, gestao }); } catch { /* sem analytics */ }
      setFeito(true);
      window.scrollTo(0, 0);
    } catch (err) {
      setErro(err.message || 'Não foi possível criar a conta.');
    } finally {
      setAEnviar(false);
    }
  }

  /* ── OBRIGADO ─────────────────────────────────────────────────────────── */
  if (feito) {
    return (
      <main className="xp">
        <Seo titulo="A tua app está quase pronta" caminho="/experimenta" noindex />
        <style>{CSS}</style>
        <div className="xp-obrigado">
          <div className="xp-icone"><Mail size={26} /></div>
          <h1>Está quase! Confirma o teu email.</h1>
          <p>Enviámos uma mensagem para <strong>{f.email.trim().toLowerCase()}</strong>. Carrega no link e entras logo na app da <strong>{f.barbearia.trim()}</strong>, já criada para ti.</p>
          <ol className="xp-passos">
            <li><Check size={18} /> <span><b>Confirma o email</b> — se não o vires, procura no spam ou nas promoções.</span></li>
            <li><Check size={18} /> <span><b>Ligamos-te hoje</b> para o <b>{telLimpo(f.telefone)}</b> e marcamos uma sessão para deixarmos tudo configurado contigo.</span></li>
            <li><Check size={18} /> <span><b>14 dias grátis</b>, sem cartão. Só pagas se quiseres continuar.</span></li>
          </ol>
          <a className="xp-btn" href={`${PAINEL}/entrar`}>Já confirmei — abrir a minha app <ArrowRight size={18} /></a>
          <p className="xp-nota">Alguma dúvida? Fala connosco pelo WhatsApp: 914 874 725.</p>
        </div>
      </main>
    );
  }

  /* ── A LANDING ────────────────────────────────────────────────────────── */
  return (
    <main className="xp">
      <Seo titulo="Experimenta a Convecta 14 dias grátis" descricao="A tua barbearia com app de marcações própria, lembretes automáticos e menos faltas. 14 dias grátis, sem cartão." caminho="/experimenta" />
      <style>{CSS}</style>

      <header className="xp-topo">
        <Link to="/" className="xp-marca">CONVECTA</Link>
        <button type="button" className="xp-btn xp-btn-pequeno" onClick={irAoFormulario}>Experimentar grátis</button>
      </header>

      <section className="xp-hero">
        <span className="xp-etiqueta">Para barbearias</span>
        <h1>Mais marcações. <br />Menos mensagens.</h1>
        <p className="xp-sub">A tua barbearia com app de marcações própria: os clientes marcam sozinhos, recebem o lembrete e faltam menos. Tu cortas.</p>
        <button type="button" className="xp-btn" onClick={irAoFormulario}>Quero a minha app grátis <ArrowRight size={18} /></button>
        <p className="xp-mini">14 dias grátis · sem cartão · pronta hoje</p>
      </section>

      <section className="xp-beneficios">
        {[
          [Smartphone, 'A tua app, com o teu nome', 'Os clientes marcam a qualquer hora, sem te mandarem mensagem.'],
          [BellRing, 'Lembretes automáticos', 'Cada cliente recebe o aviso antes da marcação. Menos cadeiras vazias.'],
          [CalendarCheck, 'Agenda organizada', 'Tudo num só sítio: marcações, clientes e equipa, no telemóvel.'],
        ].map(([Ic, t, d]) => (
          <div key={t} className="xp-cartao">
            <Ic size={22} />
            <b>{t}</b>
            <span>{d}</span>
          </div>
        ))}
      </section>

      <section className="xp-prova">
        <p className="xp-confiam">Já trabalham com a Convecta: <b>Rasta Village</b> · <b>Dom Cortes</b> · <b>Royal Barber</b></p>
        <a className="xp-video" href={TESTEMUNHO} target="_blank" rel="noreferrer">
          <span className="xp-play"><Play size={22} fill="currentColor" /></span>
          <span><b>Vê o que diz quem já usa</b><br /><small>Testemunho de um cliente · menos de 1 minuto</small></span>
        </a>
      </section>

      <section className="xp-como">
        <h2>Como funciona</h2>
        <ol>
          <li><b>1</b><span><strong>Preenches o formulário</strong> — leva 1 minuto.</span></li>
          <li><b>2</b><span><strong>A tua app fica pronta</strong> na hora, com o nome da tua barbearia.</span></li>
          <li><b>3</b><span><strong>Ligamos-te hoje</strong> e configuramos tudo contigo: serviços, equipa e horários.</span></li>
        </ol>
      </section>

      <section id="formulario" className="xp-form">
        <h2>Cria a tua app grátis</h2>
        <p className="xp-mini">14 dias grátis, sem cartão.{desde ? ` Depois, desde ${desde}/mês, sem fidelização.` : ''}</p>
        <form onSubmit={enviar} noValidate>
          <div className="xp-grelha">
            <label><span style={rotulo}>O teu nome</span><input style={campo} value={f.nome} onChange={e => s('nome', e.target.value)} autoComplete="name" placeholder="João Silva" /></label>
            <label><span style={rotulo}>Nome da barbearia</span><input style={campo} value={f.barbearia} onChange={e => s('barbearia', e.target.value)} placeholder="RC Cuts" />
              {slug && <small className="xp-endereco">A tua app: <b>{slug}.marcacoes.app</b></small>}</label>
            <label><span style={rotulo}>Telemóvel</span><input style={campo} type="tel" inputMode="tel" value={f.telefone} onChange={e => s('telefone', e.target.value)} autoComplete="tel" placeholder="912 345 678" /></label>
            <label><span style={rotulo}>Email</span><input style={campo} type="email" value={f.email} onChange={e => s('email', e.target.value)} autoComplete="email" placeholder="nome@exemplo.com" /></label>
            <label className="xp-largo"><span style={rotulo}>Palavra-passe (para entrares na app)</span><input style={campo} type="password" value={f.password} onChange={e => s('password', e.target.value)} autoComplete="new-password" placeholder="Mínimo 8 caracteres" /></label>
          </div>

          <div className="xp-pergunta">
            <span style={rotulo}>Quantos profissionais têm?</span>
            <div className="xp-pilulas">{PROFISSIONAIS.map(p => <Pilula key={p.v} on={prof === p.v} onClick={() => setProf(p.v)}>{p.l}</Pilula>)}</div>
          </div>
          <div className="xp-pergunta">
            <span style={rotulo}>Como marcam hoje?</span>
            <div className="xp-pilulas">{GESTAO.map(g => <Pilula key={g.v} on={gestao === g.v} onClick={() => setGestao(g.v)}>{g.l}</Pilula>)}</div>
          </div>
          <div className="xp-pergunta">
            <span style={rotulo}>O que queres melhorar? <small style={{ fontWeight: 500, opacity: .6 }}>(podes escolher vários)</small></span>
            <div className="xp-pilulas">{MELHORAR.map(m => <Pilula key={m} on={melhorar.includes(m)} onClick={() => tocarMelhorar(m)}>{m}</Pilula>)}</div>
          </div>

          <label className="xp-aceito">
            <input type="checkbox" checked={aceita} onChange={e => setAceita(e.target.checked)} />
            <span>Aceito os <Link to="/termos" target="_blank">Termos</Link>, a <Link to="/privacidade" target="_blank">Política de Privacidade</Link> e o <Link to="/acordo-rgpd" target="_blank">Acordo de subcontratação</Link>.</span>
          </label>

          {erro && <p className="xp-erro" role="alert">{erro}</p>}
          <button type="submit" className="xp-btn xp-btn-largo" disabled={aEnviar}>{aEnviar ? 'A criar a tua app…' : <>Criar a minha app grátis <ArrowRight size={18} /></>}</button>
          <p className="xp-nota">Ligamos-te hoje para configurarmos tudo contigo.</p>
        </form>
      </section>

      <footer className="xp-rodape">Convecta · <a href="https://convecta.pt">convecta.pt</a> · 914 874 725</footer>
    </main>
  );
}

const CSS = `
.xp{min-height:100vh;background:var(--cv-ground,#FBFAF8);color:var(--cv-ink,#24201C);font-family:inherit;padding:0 16px 40px}
.xp section,.xp-topo,.xp-rodape,.xp-obrigado{max-width:760px;margin:0 auto}
.xp-topo{display:flex;align-items:center;justify-content:space-between;padding:18px 0}
.xp-marca{font-weight:800;letter-spacing:.28em;font-size:15px;color:var(--cv-ink);text-decoration:none}
.xp-btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:15px 24px;border-radius:999px;border:none;background:var(--cv-amarelo,#FEE96D);color:#24201C;font-weight:800;font-size:16px;font-family:inherit;cursor:pointer;text-decoration:none}
.xp-btn:disabled{opacity:.6;cursor:default}
.xp-btn:focus-visible,.xp button:focus-visible,.xp input:focus-visible{outline:2px solid #24201C;outline-offset:2px}
.xp-btn-pequeno{padding:10px 16px;font-size:14px}
.xp-btn-largo{width:100%;margin-top:18px;padding:17px}
.xp-hero{text-align:center;padding:40px 0 34px}
.xp-etiqueta{display:inline-block;font-size:12.5px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:var(--cv-amarelo-texto,#8A6D0A);margin-bottom:14px}
.xp-hero h1{font-size:clamp(38px,8vw,64px);line-height:1.02;letter-spacing:-.03em;margin:0 0 16px;font-weight:900;text-wrap:balance}
.xp-sub{font-size:18px;line-height:1.55;max-width:560px;margin:0 auto 24px;opacity:.85}
.xp-mini{font-size:14px;opacity:.7;margin:12px 0 0}
.xp-beneficios{display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:12px;padding:10px 0 28px}
.xp-cartao{display:grid;gap:6px;padding:18px;border-radius:16px;background:#fff;border:1px solid var(--cv-linha)}
.xp-cartao b{font-size:16px}.xp-cartao span{font-size:14.5px;line-height:1.5;opacity:.8}
.xp-prova{display:grid;gap:14px;padding:6px 0 30px;text-align:center}
.xp-confiam{font-size:15px;margin:0;opacity:.85}
.xp-video{display:flex;align-items:center;gap:14px;text-align:left;padding:14px 18px;border-radius:16px;background:#24201C;color:#fff;text-decoration:none;justify-self:center}
.xp-video small{opacity:.7}
.xp-play{width:46px;height:46px;border-radius:50%;background:var(--cv-amarelo,#FEE96D);color:#24201C;display:grid;place-items:center;flex-shrink:0}
.xp-como{padding:8px 0 30px}
.xp-como h2,.xp-form h2{font-size:28px;letter-spacing:-.02em;margin:0 0 14px;font-weight:900}
.xp-como ol{list-style:none;margin:0;padding:0;display:grid;gap:10px}
.xp-como li{display:flex;gap:14px;align-items:center;padding:14px 16px;border-radius:14px;background:#fff;border:1px solid var(--cv-linha);font-size:15.5px;line-height:1.45}
.xp-como li b{width:32px;height:32px;border-radius:50%;background:var(--cv-amarelo,#FEE96D);display:grid;place-items:center;flex-shrink:0}
.xp-form{padding:26px 20px;border-radius:20px;background:#fff;border:1.5px solid var(--cv-amarelo,#FEE96D);scroll-margin-top:16px}
.xp-grelha{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:18px}
.xp-largo{grid-column:1/-1}
.xp-endereco{display:block;font-size:12.5px;opacity:.7;margin-top:6px}
.xp-pergunta{margin-top:20px}
.xp-pilulas{display:flex;flex-wrap:wrap;gap:8px}
.xp-aceito{display:flex;gap:10px;align-items:flex-start;margin-top:20px;font-size:14px;line-height:1.5;cursor:pointer}
.xp-aceito input{width:20px;height:20px;margin-top:1px;flex-shrink:0}
.xp-aceito a{color:inherit;text-decoration:underline}
.xp-erro{margin:14px 0 0;color:#A01E18;font-weight:700;font-size:14.5px}
.xp-nota{text-align:center;font-size:13.5px;opacity:.7;margin:12px 0 0}
.xp-rodape{text-align:center;font-size:13px;opacity:.6;padding:28px 0 0}
.xp-rodape a{color:inherit}
.xp-obrigado{padding:70px 0 40px}
.xp-icone{width:56px;height:56px;border-radius:50%;background:var(--cv-amarelo,#FEE96D);display:grid;place-items:center;margin-bottom:22px}
.xp-obrigado h1{font-size:32px;line-height:1.15;margin:0 0 12px;letter-spacing:-.02em}
.xp-obrigado p{font-size:16.5px;line-height:1.6}
.xp-passos{list-style:none;padding:0;margin:20px 0 26px;display:grid;gap:10px}
.xp-passos li{display:flex;gap:10px;align-items:flex-start;padding:12px 14px;border-radius:12px;background:#fff;border:1px solid var(--cv-linha);font-size:15px;line-height:1.5}
.xp-passos li svg{color:#1E7F4E;flex-shrink:0;margin-top:3px}
@media (max-width:640px){.xp-grelha{grid-template-columns:1fr}.xp-hero{padding-top:26px}.xp-sub{font-size:16.5px}}
@media (prefers-reduced-motion:reduce){*{scroll-behavior:auto!important}}
`;
