import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowLeft, Check, Mail, BellRing, Smartphone, MessageCircleOff, ChevronDown } from 'lucide-react';
import Seo from '@/components/Seo';
import { PLANOS, VERSAO_ACORDO } from '@/lib/seo';
import { supabase, temSupabase } from '@/lib/supabase';
import { enviarContacto } from '@/lib/contactos';
import { lerOrigem, guardarOrigem } from '@/lib/origem';

/*
 * /experimenta — A LANDING DE CONVERSÃO (10/11/2026, Diogo).
 *
 * v2: fundo preto, motion, a app a mexer (phone-demo.mp4), um dia com a
 * Convecta em cenas, o vídeo da Rasta Village e o formulário passo a passo.
 * As cenas do «dia» são um EXEMPLO e dizem-no — não são depoimentos.
 *
 * O registo é o de sempre (signUp com os dados no user_metadata): a app nasce
 * quando ele confirma o email (registar-barbearia), e aí entra no CRM com a
 * qualificação (q_profissionais, qual_gestao, necessidade) e o push «lead
 * quente». O contacto vai logo para pedir_contacto, para não se perder.
 */

const PAINEL = 'https://administrador.marcacoes.app';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const RESERVADOS = ['www', 'admin', 'administrador', 'api', 'app', 'super', 'superadmin', 'portal', 'painel', 'mail', 'email', 'static', 'cdn', 'assets', 'blog', 'suporte', 'ajuda', 'conta', 'login', 'convecta', 'gestao'];
const slugDe = nome => (nome || '').trim().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
  .replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '').replace(/-+/g, '-').replace(/^-|-$/g, '').slice(0, 60);
const telLimpo = t => String(t || '').replace(/[\s.\-()]/g, '');
const telValido = t => /^(\+351|00351)?[92]\d{8}$/.test(telLimpo(t)) || /^\+\d{8,15}$/.test(telLimpo(t));
const planoPara = n => (n <= 1 ? 'essencial' : n <= 5 ? 'profissional' : 'business');
const desde = PLANOS[0]?.precoTexto || '';

const PROFISSIONAIS = [{ v: 1, l: 'Só eu' }, { v: 3, l: '2 a 3' }, { v: 5, l: '4 a 5' }, { v: 6, l: '6 ou mais' }];
const GESTAO = [
  { v: 'h2', l: 'WhatsApp, telefone ou caderno' },
  { v: 'h1', l: 'Por ordem de chegada' },
  { v: 'h3', l: 'Já uso uma app' },
  { v: 'h4', l: 'Usei uma app e deixei' },
];
const MELHORAR = ['Menos faltas', 'Mais clientes', 'Menos tempo ao telemóvel', 'Agenda organizada', 'Imagem mais profissional'];

/* Um dia com a Convecta — EXEMPLO ilustrativo (não é um cliente real). */
const DIA = [
  { h: '23:40', t: 'Um cliente marca.', d: 'Tu estás a dormir.' },
  { h: '09:00', t: 'Recebe o lembrete.', d: 'Não se esquece.' },
  { h: '10:00', t: 'Chega à hora.', d: 'Zero mensagens.' },
];

/* O que muda — os ganhos, ditos pela Convecta (não são citações de clientes). */
const MUDA = [
  ['Mais organização', 'Todas as marcações num só sítio, com uma visão clara do dia.'],
  ['Menos tempo ao telemóvel', 'Deixas de responder a mensagens e dás o tempo aos clientes que estão na cadeira.'],
  ['Imagem mais profissional', 'Uma app própria, com a identidade da tua barbearia.'],
  ['Equipa mais simples de gerir', 'Os horários e as marcações de cada profissional, à vista.'],
];

/*
 * DEPOIMENTOS — SÓ VERDADEIROS (10/11/2026). Cada um tem de ser de um cliente
 * real, com as palavras dele e a autorização para publicar (nome e foto).
 * Enquanto a lista estiver vazia, a secção não aparece.
 * Formato: { nome: 'Rui', barbearia: 'Rasta Village', frase: '…', foto: '/provas/rui.jpg', estrelas: 5 }
 */
const DEPOIMENTOS = [];

/* 10/11/2026: os 10 ganhos que o Diogo escreveu, a rolar — como frases da
   Convecta, sem nome de barbearia, sem estrelas e sem aspas. */
const GANHOS = [
  ['Mais organização', 'Uma visão clara de tudo o que acontece na barbearia.'],
  ['Mais profissionalismo', 'Uma plataforma própria, com a tua identidade.'],
  ['Clientes marcam a qualquer hora', 'Sem mensagens nem esperar por resposta.'],
  ['Menos tempo ao telemóvel', 'Mais tempo para quem está na cadeira.'],
  ['Equipa mais fácil de gerir', 'Horários e marcações de cada profissional, à vista.'],
  ['Menos falhas nas marcações', 'Adeus apontamentos e mensagens perdidas.'],
  ['Melhor experiência do cliente', 'Escolhe o serviço e o profissional em segundos.'],
  ['Mais controlo do negócio', 'Toda a informação num só sítio.'],
  ['Simples de usar', 'Começas sem complicações.'],
  ['Pronto para crescer', 'As ferramentas para gerir melhor e crescer.'],
];

/* O vídeo da entrada — o mesmo da página inicial (HeroVideo): um só, pelo tamanho do ecrã. */
const VIDEO = {
  pc: { src: '/video/entrada-pc-v2.mp4', poster: '/video/entrada-pc-v2.jpg' },
  tlm: { src: '/video/entrada-tlm-v1.mp4', poster: '/video/entrada-tlm-v1.jpg' },
};

const PASSOS = ['barbearia', 'profissionais', 'gestao', 'melhorar', 'contacto', 'conta'];

const sobe = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } } };

function Revela({ children, atraso = 0, className }) {
  const reduz = useReducedMotion();
  if (reduz) return <div className={className}>{children}</div>;
  return (
    <motion.div className={className} variants={sobe} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }} transition={{ delay: atraso }}>
      {children}
    </motion.div>
  );
}

/* Os títulos aparecem palavra a palavra quando entram no ecrã. */
function Palavras({ texto, como: Tag = 'h2', className }) {
  const reduz = useReducedMotion();
  const palavras = texto.split(' ');
  if (reduz) return <Tag className={className}>{texto}</Tag>;
  return (
    <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} transition={{ staggerChildren: 0.07 }}>
      <Tag className={className} aria-label={texto}>
        {palavras.map((w, i) => (
          <motion.span key={i} aria-hidden="true" className="xp-palavra" variants={{ hidden: { opacity: 0, y: 24, filter: 'blur(6px)' }, show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } } }}>{w}&nbsp;</motion.span>
        ))}
      </Tag>
    </motion.div>
  );
}

function Opcao({ on, children, onClick }) {
  return (
    <motion.button type="button" onClick={onClick} aria-pressed={on} whileTap={{ scale: 0.97 }} className={`xp-opcao${on ? ' on' : ''}`}>
      <span className="xp-opcao-marca">{on && <Check size={14} strokeWidth={3} />}</span>{children}
    </motion.button>
  );
}

export default function Experimenta() {
  useEffect(() => { try { guardarOrigem(); } catch { /* sem armazenamento */ } }, []);
  const reduz = useReducedMotion();
  const formRef = useRef(null);
  const [video, setVideo] = useState(null);
  useEffect(() => {
    try {
      const tlm = window.matchMedia('(max-width: 767px)').matches;
      const poupa = window.matchMedia('(prefers-reduced-motion: reduce)').matches || navigator.connection?.saveData;
      setVideo({ ...(tlm ? VIDEO.tlm : VIDEO.pc), parado: !!poupa });
    } catch { setVideo({ ...VIDEO.pc, parado: true }); }
  }, []);
  const [passo, setPasso] = useState(0);
  const [dir, setDir] = useState(1);
  const [f, setF] = useState({ nome: '', barbearia: '', telefone: '', email: '', password: '' });
  const [prof, setProf] = useState(null);
  const [gestao, setGestao] = useState('');
  const [melhorar, setMelhorar] = useState([]);
  const [aceita, setAceita] = useState(false);
  const [erro, setErro] = useState('');
  const [aEnviar, setAEnviar] = useState(false);
  const [feito, setFeito] = useState(false);
  const s = (k, v) => setF(x => ({ ...x, [k]: v }));
  const slug = slugDe(f.barbearia);

  const irAoFormulario = () => { formRef.current?.scrollIntoView({ behavior: reduz ? 'auto' : 'smooth', block: 'center' }); try { window.trackEvent?.('landing_cta'); } catch { /* */ } };

  const validar = p => {
    const k = PASSOS[p];
    if (k === 'barbearia') { if (!slug) return 'Escreve o nome da tua barbearia.'; if (RESERVADOS.includes(slug)) return 'Esse nome dá um endereço que é nosso. Escreve-o de outra forma.'; }
    if (k === 'profissionais' && !prof) return 'Escolhe uma opção.';
    if (k === 'gestao' && !gestao) return 'Escolhe uma opção.';
    if (k === 'contacto') { if (!f.nome.trim()) return 'Escreve o teu nome.'; if (!telValido(f.telefone)) return 'Escreve o teu telemóvel (9 dígitos) — é por aí que te ligamos.'; }
    if (k === 'conta') {
      if (!EMAIL_RE.test(f.email.trim())) return 'Escreve um email válido.';
      if (f.password.length < 8) return 'A palavra-passe tem de ter pelo menos 8 caracteres.';
      if (!aceita) return 'Para criar a conta tens de aceitar os Termos e a Política de Privacidade.';
    }
    return '';
  };
  const avancar = () => {
    const e = validar(passo); setErro(e); if (e) return;
    try { window.trackEvent?.('landing_passo', { passo: passo + 2 }); } catch { /* */ }
    if (passo < PASSOS.length - 1) { setDir(1); setPasso(passo + 1); } else enviar();
  };
  const recuar = () => { setErro(''); setDir(-1); setPasso(Math.max(0, passo - 1)); };
  // escolher numa pergunta de um toque avança sozinho
  const escolherEAvancar = fn => { fn(); setErro(''); setTimeout(() => { setDir(1); setPasso(p => p + 1); }, reduz ? 0 : 260); };

  async function enviar() {
    if (!temSupabase()) return setErro('O registo não está disponível neste momento. Fala connosco pelo WhatsApp: 914 874 725.');
    const qualificacao = { profissionais: prof, gestao, melhorar };
    const texto = [
      'Landing /experimenta — lead quente.',
      `Profissionais: ${PROFISSIONAIS.find(p => p.v === prof)?.l}`,
      `Como marca hoje: ${GESTAO.find(g => g.v === gestao)?.l}`,
      melhorar.length ? `Quer melhorar: ${melhorar.join(', ')}` : '',
    ].filter(Boolean).join('\n');
    setAEnviar(true);
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
        <div className="xp-brilho" aria-hidden="true" />
        <motion.div className="xp-obrigado" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <motion.div className="xp-icone" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.15 }}><Mail size={26} /></motion.div>
          <h1>Está quase. Confirma o teu email.</h1>
          <p>Enviámos uma mensagem para <strong>{f.email.trim().toLowerCase()}</strong>. Carrega no link e entras na app da <strong>{f.barbearia.trim()}</strong>, já criada para ti.</p>
          <ol className="xp-lista">
            <li><Check size={18} /><span><b>Confirma o email</b> — se não o vires, procura no spam ou nas promoções.</span></li>
            <li><Check size={18} /><span><b>Ligamos-te hoje</b> para o <b>{telLimpo(f.telefone)}</b> e marcamos uma sessão para deixarmos tudo configurado contigo.</span></li>
            <li><Check size={18} /><span><b>14 dias grátis</b>, sem cartão. Só pagas se quiseres continuar.</span></li>
          </ol>
          <a className="xp-btn" href={`${PAINEL}/entrar`}>Já confirmei — abrir a minha app <ArrowRight size={18} /></a>
          <p className="xp-nota">Alguma dúvida? WhatsApp 914 874 725.</p>
        </motion.div>
      </main>
    );
  }

  const k = PASSOS[passo];
  const slide = {
    enter: d => ({ opacity: 0, x: reduz ? 0 : d * 40 }),
    center: { opacity: 1, x: 0 },
    exit: d => ({ opacity: 0, x: reduz ? 0 : d * -40 }),
  };

  /* ── A LANDING ────────────────────────────────────────────────────────── */
  return (
    <main className="xp">
      <Seo titulo="Experimenta a Convecta 14 dias grátis" descricao="A tua barbearia com app de marcações própria, lembretes automáticos e menos faltas. 14 dias grátis, sem cartão." caminho="/experimenta" />
      <style>{CSS}</style>
      <div className="xp-brilho" aria-hidden="true" />

      <header className="xp-topo xp-topo-sobre">
        <Link to="/" className="xp-marca" aria-label="Convecta"><img src="/brand/convecta-logo-novo-claro.png" alt="Convecta" width="903" height="160" /></Link>
        <button type="button" className="xp-btn xp-btn-pequeno" onClick={irAoFormulario}>Experimentar grátis</button>
      </header>

      {/* HERÓI: o vídeo da entrada, em ecrã inteiro (como na página inicial) */}
      <section className="xp-heroi">
        <div className="xp-heroi-fundo" style={video ? { backgroundImage: `url(${video.poster})` } : undefined} aria-hidden="true" />
        {video && !video.parado && <video className="xp-heroi-video" src={video.src} poster={video.poster} autoPlay muted loop playsInline aria-hidden="true" />}
        <div className="xp-heroi-veu" aria-hidden="true" />
        <div className="xp-heroi-texto">
          <h1>
            {['Mais', 'marcações.'].map((w, i) => (
              <motion.span key={w} className="xp-palavra" initial={{ opacity: 0, y: reduz ? 0 : 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}>{w} </motion.span>
            ))}
            <br />
            {['Menos', 'mensagens.'].map((w, i) => (
              <motion.span key={w} className="xp-palavra xp-amarelo" initial={{ opacity: 0, y: reduz ? 0 : 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.38 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}>{w} </motion.span>
            ))}
          </h1>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.7 }}>
            <button type="button" className="xp-btn" onClick={irAoFormulario}>Quero a minha app grátis <ArrowRight size={18} /></button>
            <p className="xp-mini">14 dias grátis · sem cartão</p>
          </motion.div>
        </div>
        <button type="button" className="xp-mais" onClick={() => document.getElementById('xp-depois')?.scrollIntoView({ behavior: reduz ? 'auto' : 'smooth' })}>
          Ver mais <ChevronDown size={18} />
        </button>
      </section>
      <div id="xp-depois" />

      {/* BENEFÍCIOS */}
      <section className="xp-beneficios">
        {[
          [Smartphone, 'A tua app', 'Com o nome da tua barbearia.'],
          [BellRing, 'Lembretes', 'Menos faltas.'],
          [MessageCircleOff, 'Menos WhatsApp', 'Os clientes marcam sozinhos.'],
        ].map(([Ic, t, d], i) => (
          <Revela key={t} atraso={i * 0.08} className="xp-cartao">
            <span className="xp-cartao-icone"><Ic size={20} /></span>
            <b>{t}</b>
            <span>{d}</span>
          </Revela>
        ))}
      </section>

      {/* UM DIA COM A CONVECTA — exemplo */}
      <section className="xp-dia">
        <Palavras texto="Um dia com a Convecta." /><Revela><p className="xp-mini">Exemplo.</p></Revela>
        <ol>
          {DIA.map((c, i) => (
            <Revela key={c.h} atraso={i * 0.06}>
              <li><span className="xp-hora">{c.h}</span><span><strong>{c.t}</strong> <small>{c.d}</small></span></li>
            </Revela>
          ))}
        </ol>
      </section>

      {/* O QUE MUDA */}
      <section className="xp-muda">
        <Palavras texto="O que muda." />
        <div className="xp-muda-grelha">
          {MUDA.map(([t, d], i) => (
            <Revela key={t} atraso={i * 0.06} className="xp-muda-item">
              <Check size={18} />
              <span><b>{t}</b><br /><small>{d}</small></span>
            </Revela>
          ))}
        </div>
      </section>

      {/* DEPOIMENTOS VERDADEIROS — só aparecem quando houver */}
      {DEPOIMENTOS.length > 0 && (
        <section className="xp-depo">
          <div className="xp-depo-grelha">
            {DEPOIMENTOS.map((d, i) => (
              <Revela key={d.nome + d.barbearia} atraso={i * 0.06} className="xp-depo-cartao">
                {d.estrelas ? <div className="xp-estrelas" aria-label={`${d.estrelas} de 5 estrelas`}>{'★'.repeat(Math.round(d.estrelas))}</div> : null}
                <p>«{d.frase}»</p>
                <div className="xp-depo-quem">
                  {d.foto && <img src={d.foto} alt="" width="44" height="44" />}
                  <span><b>{d.nome}</b><br /><small>{d.barbearia}</small></span>
                </div>
              </Revela>
            ))}
          </div>
        </section>
      )}

      {/* A FAIXA A ROLAR — os ganhos (ditos pela Convecta, sem nomes nem estrelas) */}
      <section className="xp-faixa" aria-label="O que os barbeiros ganham com a Convecta">
        <div className="xp-faixa-trilho">
          {[...GANHOS, ...GANHOS].map((g, i) => (
            <div key={i} className="xp-faixa-item" aria-hidden={i >= GANHOS.length}>
              <b>{g[0]}</b><span>{g[1]}</span>
            </div>
          ))}
        </div>
      </section>

      {/* O FORMULÁRIO, PASSO A PASSO */}
      <section className="xp-form" ref={formRef} id="formulario">
        <Palavras texto="Quero a minha app grátis." /><Revela><p className="xp-mini">1 minuto · 14 dias grátis · sem cartão</p></Revela>
        <div className="xp-cartao-form">
          <div className="xp-progresso" aria-label={`Passo ${passo + 1} de ${PASSOS.length}`}>
            <motion.span animate={{ width: `${((passo + 1) / PASSOS.length) * 100}%` }} transition={{ duration: 0.4 }} />
          </div>
          <div className="xp-passo-num">Passo {passo + 1} de {PASSOS.length}</div>
          <AnimatePresence mode="wait" custom={dir} initial={false}>
            <motion.div key={k} custom={dir} variants={slide} initial="enter" animate="center" exit="exit" transition={{ duration: 0.28, ease: 'easeOut' }} className="xp-passo">
              {k === 'barbearia' && (<>
                <label className="xp-pergunta" htmlFor="xp-barbearia">Como se chama a tua barbearia?</label>
                <input id="xp-barbearia" className="xp-campo" value={f.barbearia} onChange={e => s('barbearia', e.target.value)} onKeyDown={e => e.key === 'Enter' && avancar()} placeholder="RC Cuts" autoComplete="organization" />
                <div className="xp-endereco">{slug ? <>A tua app: <b>{slug}.marcacoes.app</b></> : 'O nome vira o endereço da tua app.'}</div>
              </>)}
              {k === 'profissionais' && (<>
                <div className="xp-pergunta">Quantos profissionais têm?</div>
                <div className="xp-opcoes">{PROFISSIONAIS.map(p => <Opcao key={p.v} on={prof === p.v} onClick={() => escolherEAvancar(() => setProf(p.v))}>{p.l}</Opcao>)}</div>
              </>)}
              {k === 'gestao' && (<>
                <div className="xp-pergunta">Como marcam hoje?</div>
                <div className="xp-opcoes">{GESTAO.map(g => <Opcao key={g.v} on={gestao === g.v} onClick={() => escolherEAvancar(() => setGestao(g.v))}>{g.l}</Opcao>)}</div>
              </>)}
              {k === 'melhorar' && (<>
                <div className="xp-pergunta">O que queres melhorar? <small>Podes escolher vários.</small></div>
                <div className="xp-opcoes">{MELHORAR.map(m => <Opcao key={m} on={melhorar.includes(m)} onClick={() => setMelhorar(l => (l.includes(m) ? l.filter(x => x !== m) : [...l, m]))}>{m}</Opcao>)}</div>
              </>)}
              {k === 'contacto' && (<>
                <div className="xp-pergunta">Quem fala connosco?</div>
                <input className="xp-campo" value={f.nome} onChange={e => s('nome', e.target.value)} placeholder="O teu nome" autoComplete="name" aria-label="O teu nome" />
                <input className="xp-campo" type="tel" inputMode="tel" value={f.telefone} onChange={e => s('telefone', e.target.value)} onKeyDown={e => e.key === 'Enter' && avancar()} placeholder="Telemóvel" autoComplete="tel" aria-label="Telemóvel" />
                <div className="xp-endereco">Ligamos-te hoje para configurarmos tudo contigo.</div>
              </>)}
              {k === 'conta' && (<>
                <div className="xp-pergunta">Por fim, a tua conta.</div>
                <input className="xp-campo" type="email" value={f.email} onChange={e => s('email', e.target.value)} placeholder="Email" autoComplete="email" aria-label="Email" />
                <input className="xp-campo" type="password" value={f.password} onChange={e => s('password', e.target.value)} onKeyDown={e => e.key === 'Enter' && avancar()} placeholder="Palavra-passe (mínimo 8)" autoComplete="new-password" aria-label="Palavra-passe" />
                <label className="xp-aceito">
                  <input type="checkbox" checked={aceita} onChange={e => setAceita(e.target.checked)} />
                  <span>Aceito os <Link to="/termos" target="_blank">Termos</Link>, a <Link to="/privacidade" target="_blank">Privacidade</Link> e o <Link to="/acordo-rgpd" target="_blank">Acordo de subcontratação</Link>.</span>
                </label>
              </>)}
            </motion.div>
          </AnimatePresence>
          {erro && <p className="xp-erro" role="alert">{erro}</p>}
          <div className="xp-acoes">
            {passo > 0 ? <button type="button" className="xp-voltar" onClick={recuar}><ArrowLeft size={16} /> Voltar</button> : <span />}
            {!['profissionais', 'gestao'].includes(k) && (
              <button type="button" className="xp-btn" onClick={avancar} disabled={aEnviar}>
                {k === 'conta' ? (aEnviar ? 'A criar a tua app…' : <>Criar a minha app <ArrowRight size={18} /></>) : <>Continuar <ArrowRight size={18} /></>}
              </button>
            )}
          </div>
        </div>
      </section>

      <footer className="xp-rodape">Convecta · <a href="https://convecta.pt">convecta.pt</a> · 914 874 725</footer>
    </main>
  );
}

const CSS = `
.xp{--xp-fundo:#24201C;--xp-cartao:#2E2924;--xp-campo:#1C1916;--xp-linha:rgba(251,250,248,.10);--xp-texto:#FBFAF8;--xp-suave:rgba(251,250,248,.68);--xp-amarelo:#FEE96D;
  position:relative;min-height:100vh;background:var(--xp-fundo);color:var(--xp-texto);padding:0 16px 40px;overflow-x:hidden;font-family:'Inter',system-ui,-apple-system,sans-serif}
/* 10/11/2026 (marca): títulos em DM Serif Display 400 — nunca a negrito; o resto Inter. */
.xp h1,.xp h2,.xp-pergunta,.xp-obrigado h1{font-family:'DM Serif Display',Georgia,serif;font-weight:400}
.xp-brilho{position:absolute;inset:-20% -10% auto;height:720px;pointer-events:none;background:radial-gradient(600px 360px at 70% 20%,rgba(254,233,109,.16),transparent 70%),radial-gradient(500px 300px at 15% 0%,rgba(254,233,109,.07),transparent 70%)}
.xp section,.xp-topo,.xp-rodape,.xp-obrigado{position:relative;max-width:1080px;margin:0 auto}
.xp-topo{display:flex;align-items:center;justify-content:space-between;padding:20px 0}
.xp-marca{display:inline-flex}.xp-marca img{height:26px;width:auto;display:block}
.xp-btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:16px 26px;border-radius:999px;border:none;background:var(--xp-amarelo);color:#141210;font-weight:700;font-size:16px;font-family:inherit;cursor:pointer;text-decoration:none;box-shadow:0 10px 40px -10px rgba(254,233,109,.55);transition:transform .15s,box-shadow .15s}
.xp-btn:hover{transform:translateY(-1px);box-shadow:0 14px 44px -10px rgba(254,233,109,.7)}
.xp-btn:disabled{opacity:.6;cursor:default;transform:none}
.xp button:focus-visible,.xp a:focus-visible,.xp input:focus-visible{outline:2px solid var(--xp-amarelo);outline-offset:3px}
.xp-btn-pequeno{padding:10px 16px;font-size:14px;box-shadow:none}
.xp-topo-sobre{position:absolute!important;top:0;left:16px;right:16px;z-index:5;max-width:1080px;margin:0 auto}
.xp-heroi{position:relative;max-width:none!important;margin:0 -16px 70px!important;min-height:100vh;min-height:100svh;display:flex;align-items:flex-end;overflow:hidden;isolation:isolate}
.xp-heroi-fundo,.xp-heroi-video,.xp-heroi-veu{position:absolute;inset:0;width:100%;height:100%}
.xp-heroi-fundo{background:#14110e center/cover no-repeat;z-index:-3}
.xp-heroi-video{object-fit:cover;z-index:-2}
.xp-heroi-veu{z-index:-1;background:linear-gradient(180deg,rgba(36,32,28,.55) 0%,rgba(36,32,28,0) 25%,rgba(36,32,28,.15) 50%,rgba(36,32,28,.85) 82%,#24201C 100%)}
.xp-heroi-texto{width:100%;max-width:1080px;margin:0 auto;padding:0 16px 120px}
.xp-heroi h1{font-size:clamp(46px,7.8vw,96px);line-height:1;letter-spacing:-.01em;margin:0 0 26px;max-width:12ch}
.xp-palavra{display:inline-block}
.xp-amarelo{color:var(--xp-amarelo)}
.xp-mini{font-size:14px;color:var(--xp-suave);margin:14px 0 0}
.xp-mais{position:absolute;left:50%;bottom:26px;transform:translateX(-50%);display:flex;align-items:center;gap:6px;border:0;background:none;color:rgba(251,250,248,.75);font:inherit;font-size:12.5px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;cursor:pointer}
.xp-mais svg{animation:xpDesce 2s ease-in-out infinite}
@keyframes xpDesce{0%,100%{transform:translateY(0)}50%{transform:translateY(5px)}}
@media (prefers-reduced-motion:reduce){.xp-mais svg{animation:none}}
.xp-beneficios{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;padding:0 0 80px}
.xp-cartao{display:grid;gap:8px;align-content:start;padding:22px;border-radius:18px;background:var(--xp-cartao);border:1px solid var(--xp-linha)}
.xp-cartao-icone{width:40px;height:40px;border-radius:12px;display:grid;place-items:center;background:rgba(254,233,109,.12);color:var(--xp-amarelo);margin-bottom:6px}
.xp-cartao b{font-size:17px;font-weight:600}.xp-cartao>span:last-child{font-size:14.5px;line-height:1.5;color:var(--xp-suave)}
.xp h2{font-size:clamp(34px,5vw,54px);letter-spacing:-.005em;margin:0;line-height:1.05}
.xp-dia{padding:0 0 90px;max-width:760px!important}
.xp-dia ol{list-style:none;margin:26px 0 0;padding:0 0 0 22px;border-left:1px solid var(--xp-linha);display:grid;gap:12px}
.xp-dia li{position:relative;display:flex;gap:16px;align-items:baseline;padding:16px 18px;border-radius:16px;background:var(--xp-cartao);border:1px solid var(--xp-linha);font-size:18px;line-height:1.45}
.xp-dia li::before{content:"";position:absolute;left:-29px;top:24px;width:12px;height:12px;border-radius:50%;background:var(--xp-amarelo);box-shadow:0 0 0 5px rgba(254,233,109,.15)}
.xp-dia small{color:var(--xp-suave);font-size:14.5px}
.xp-hora{font-weight:700;color:var(--xp-amarelo);font-variant-numeric:tabular-nums;min-width:52px}
.xp-muda{padding:0 0 90px;max-width:900px!important}
.xp-muda-grelha{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:26px}
.xp-muda-item{display:flex;gap:12px;align-items:flex-start;padding:18px;border-radius:16px;background:var(--xp-cartao);border:1px solid var(--xp-linha);font-size:16.5px;line-height:1.45}
.xp-muda-item svg{color:var(--xp-amarelo);flex-shrink:0;margin-top:3px}
.xp-muda-item b{font-weight:600}.xp-muda-item small{color:var(--xp-suave);font-size:14.5px}
.xp-depo{padding:0 0 60px}
.xp-depo-grelha{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:12px}
.xp-depo-cartao{padding:22px;border-radius:18px;background:var(--xp-cartao);border:1px solid var(--xp-linha);display:grid;gap:14px;align-content:start}
.xp-depo-cartao p{margin:0;font-size:16px;line-height:1.55}
.xp-estrelas{color:var(--xp-amarelo);letter-spacing:2px}
.xp-depo-quem{display:flex;gap:12px;align-items:center}.xp-depo-quem img{width:44px;height:44px;border-radius:50%;object-fit:cover}
.xp-depo-quem small{color:var(--xp-suave)}
.xp-faixa{max-width:none!important;margin:0 -16px 90px!important;overflow:hidden;-webkit-mask-image:linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent);mask-image:linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)}
.xp-faixa-trilho{display:flex;gap:12px;width:max-content;animation:xpRola 60s linear infinite}
.xp-faixa:hover .xp-faixa-trilho{animation-play-state:paused}
.xp-faixa-item{display:grid;gap:6px;width:280px;padding:20px 22px;border-radius:18px;background:var(--xp-cartao);border:1px solid var(--xp-linha)}
.xp-faixa-item b{font-family:'DM Serif Display',Georgia,serif;font-weight:400;font-size:22px;line-height:1.15;color:var(--xp-amarelo)}
.xp-faixa-item span{font-size:14.5px;line-height:1.5;color:var(--xp-suave)}
@keyframes xpRola{to{transform:translateX(calc(-50% - 6px))}}
@media (prefers-reduced-motion:reduce){.xp-faixa-trilho{animation:none;flex-wrap:wrap;width:auto;padding:0 16px}}
.xp-form{padding:0 0 40px;max-width:640px!important;text-align:center}
.xp-cartao-form{margin-top:26px;text-align:left;padding:26px 22px 22px;border-radius:24px;background:var(--xp-cartao);border:1px solid rgba(254,233,109,.35);box-shadow:0 30px 100px -40px rgba(254,233,109,.35);overflow:hidden}
.xp-progresso{height:4px;border-radius:99px;background:rgba(255,255,255,.08);overflow:hidden}
.xp-progresso span{display:block;height:100%;background:var(--xp-amarelo);border-radius:99px}
.xp-passo-num{font-size:12.5px;color:var(--xp-suave);margin:12px 0 18px;letter-spacing:.04em}
/* 10/11/2026: o cartão do formulário tem SEMPRE a mesma altura — o do passo com mais opções (5) — para a página não saltar entre passos. */
.xp-passo{display:grid;gap:10px;height:404px;align-content:start}
.xp-pergunta{font-size:27px;line-height:1.2;margin-bottom:4px}
.xp-pergunta small{display:block;font-family:'Inter',system-ui,sans-serif;font-size:14px;font-weight:400;color:var(--xp-suave);margin-top:4px}
.xp-campo{width:100%;padding:15px 16px;border-radius:14px;font-size:17px;border:1px solid var(--xp-linha);background:var(--xp-campo);color:var(--xp-texto);font-family:inherit}
.xp-campo::placeholder{color:rgba(244,241,234,.35)}
.xp-endereco{font-size:13.5px;color:var(--xp-suave)}.xp-endereco b{color:var(--xp-amarelo)}
.xp-opcoes{display:grid;gap:10px}
.xp-opcao{display:flex;align-items:center;gap:12px;width:100%;padding:14px 16px;border-radius:14px;border:1px solid var(--xp-linha);background:var(--xp-campo);color:var(--xp-texto);font-size:16px;font-weight:600;font-family:inherit;cursor:pointer;text-align:left;transition:border-color .15s,background .15s}
.xp-opcao:hover{border-color:rgba(254,233,109,.45)}
.xp-opcao.on{border-color:var(--xp-amarelo);background:rgba(254,233,109,.08)}
.xp-opcao-marca{width:22px;height:22px;border-radius:7px;border:1.5px solid rgba(255,255,255,.25);display:grid;place-items:center;flex-shrink:0;color:#141210}
.xp-opcao.on .xp-opcao-marca{background:var(--xp-amarelo);border-color:var(--xp-amarelo)}
.xp-aceito{display:flex;gap:10px;align-items:flex-start;font-size:14px;line-height:1.5;color:var(--xp-suave);cursor:pointer;margin-top:4px}
.xp-aceito input{width:20px;height:20px;margin-top:1px;flex-shrink:0;accent-color:#FEE96D}
.xp-aceito a{color:var(--xp-texto)}
.xp-erro{margin:14px 0 0;color:#FF8A7A;font-weight:700;font-size:14.5px}
.xp-acoes{display:flex;justify-content:space-between;align-items:center;margin-top:20px;gap:12px}
.xp-voltar{display:inline-flex;align-items:center;gap:6px;border:none;background:none;color:var(--xp-suave);font-family:inherit;font-size:15px;cursor:pointer;padding:8px 0}
.xp-nota{text-align:center;font-size:13.5px;color:var(--xp-suave);margin:14px 0 0}
.xp-rodape{text-align:center;font-size:13px;color:var(--xp-suave);padding:30px 0 0}
.xp-rodape a{color:inherit}
.xp-obrigado{max-width:620px!important;padding:90px 0 40px}
.xp-icone{width:58px;height:58px;border-radius:50%;background:var(--xp-amarelo);color:#141210;display:grid;place-items:center;margin-bottom:24px}
.xp-obrigado h1{font-size:clamp(34px,5.4vw,46px);line-height:1.1;margin:0 0 14px}
.xp-obrigado p{font-size:17px;line-height:1.6;color:var(--xp-suave)}
.xp-obrigado strong{color:var(--xp-texto)}
.xp-lista{list-style:none;padding:0;margin:24px 0 28px;display:grid;gap:10px}
.xp-lista li{display:flex;gap:12px;align-items:flex-start;padding:14px 16px;border-radius:14px;background:var(--xp-cartao);border:1px solid var(--xp-linha);font-size:15.5px;line-height:1.5}
.xp-lista li svg{color:var(--xp-amarelo);flex-shrink:0;margin-top:3px}
@media (max-width:900px){.xp-beneficios{grid-template-columns:1fr 1fr}}
@media (max-width:767px){.xp-heroi-texto{padding-bottom:calc(96px + env(safe-area-inset-bottom,0px))}.xp-heroi h1{font-size:clamp(44px,12vw,58px)}}
.xp-muda-grelha{}@media (max-width:560px){.xp-muda-grelha{grid-template-columns:1fr}.xp-beneficios{grid-template-columns:1fr}.xp-cartao-form{padding:22px 16px 18px}.xp-pergunta{font-size:21px}}
`;
