import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { enviarContacto } from '@/lib/contactos';
import { PRECO_DESDE_TEXTO } from '@/lib/seo';

/*
 * «Porquê a Convecta» — quatro perguntas no fim do registo.
 *
 * Isto NAO e um inquerito para nos. E para ele.
 *
 * Quem responde «o telefone toca a meio do corte», «ha anos», «achava que era
 * complicado» esta a dizer a si proprio porque e que acabou de criar a conta.
 * No fim devolvemos-lhe as respostas dele, viradas ao contrario: o que muda a
 * partir de hoje. Quem le isso vai confirmar o email; quem nao le, esquece-se.
 *
 * Aparece no ecra «confirma o teu email», que e onde ele esta parado a espera.
 * Nunca antes do registo: uma pergunta a mais antes do botao custa contas.
 *
 * As respostas seguem para a mesma tabela dos contactos (pedir_contacto), com
 * uma etiqueta no inicio da mensagem. Se o envio falhar, ele nao sabe — o
 * valor para ele ja ficou no ecra.
 *
 * Regra do site: tudo o que o fecho promete tem de existir hoje no painel.
 */

const PERGUNTAS = [
  {
    id: 'porque',
    titulo: 'O que te fez escolher a Convecta?',
    sub: 'Podes escolher mais do que uma.',
    multi: true,
    opcoes: [
      { v: 'comissoes', t: 'Não pago comissão por marcação' },
      { v: 'marca', t: 'A app fica com a minha marca' },
      { v: 'sozinhos', t: 'Os clientes marcam sozinhos' },
      { v: 'tudo', t: 'Agenda, caixa e clientes num sítio só' },
      { v: 'preco', t: 'Preço fixo e claro' },
      { v: 'recomendacao', t: 'Alguém me recomendou' },
    ],
  },
  {
    id: 'dificuldade',
    titulo: 'Qual é a tua maior dor de cabeça hoje?',
    sub: 'A que te tira mais tempo ou paciência.',
    opcoes: [
      { v: 'telefone', t: 'Atender o telefone a meio do corte' },
      { v: 'whatsapp', t: 'Marcações perdidas no WhatsApp' },
      { v: 'faltas', t: 'Clientes que faltam ou se esquecem' },
      { v: 'agenda', t: 'Agenda em papel ou desorganizada' },
      { v: 'contas', t: 'Contas e comissões no fim do mês' },
      { v: 'plataformas', t: 'Comissões das plataformas de marcação' },
    ],
  },
  {
    id: 'tempo',
    titulo: 'Há quanto tempo isso te acontece?',
    opcoes: [
      { v: 'meses', t: 'Há poucos meses' },
      { v: 'ano', t: 'Há cerca de um ano' },
      { v: 'anos', t: 'Há vários anos' },
      { v: 'sempre', t: 'Desde que abri' },
    ],
  },
  {
    id: 'antes',
    titulo: 'E porque não resolveste antes?',
    sub: 'Sem respostas certas.',
    opcoes: [
      { v: 'conhecia', t: 'Não conhecia nada que servisse' },
      { v: 'caro', t: 'Achava que era caro' },
      { v: 'complicado', t: 'Parecia complicado de montar' },
      { v: 'tempo', t: 'Nunca tinha tempo' },
      { v: 'clientes', t: 'Medo de perder clientes na mudança' },
      { v: 'normal', t: 'Achava que era normal' },
    ],
  },
];

// O que a Convecta faz a cada dor. Tudo isto existe hoje no painel.
const RESOLVE = {
  telefone: 'Os teus clientes marcam sozinhos, a qualquer hora. O telemóvel só toca para te avisar que entrou mais uma.',
  whatsapp: 'As marcações deixam de viver em conversas: entram direto na agenda, com nome, serviço e hora.',
  faltas: 'O cliente recebe um aviso antes do corte e, se não puder vir, desmarca sozinho — a hora volta a ficar livre.',
  agenda: 'Uma agenda por profissional, no telemóvel e no computador, sempre igual nos dois.',
  contas: 'Caixa, comissões e relatórios fazem as contas por ti — e exportas tudo para Excel para o contabilista.',
  plataformas: 'Preço fixo, zero comissões por marcação. E os clientes são teus, não de uma montra partilhada.',
};

const TEMPO = {
  meses: 'Apanhaste isto cedo.',
  ano: 'Um ano disto chega.',
  anos: 'Foram anos. Acaba hoje.',
  sempre: 'Desde que abriste. Já não precisa de ser assim.',
};

const ANTES = {
  conhecia: 'Não conhecias — agora conheces, e já tens a conta criada.',
  caro: `Planos desde ${PRECO_DESDE_TEXTO}/mês, sem comissões. E começas à experiência, sem cartão.`,
  complicado: 'Acabaste de montar a conta em dois minutos. O resto fazes ao teu ritmo, e nós ajudamos.',
  tempo: 'A conta já está criada. A partir daqui é tempo que ganhas, não tempo que gastas.',
  clientes: 'Os teus clientes e o histórico vêm contigo: entregas a lista como a tiveres e nós carregamos.',
  normal: 'Era normal porque não havia alternativa à tua medida. Agora há.',
};

const rotuloDe = (pergunta, v) => PERGUNTAS.find(p => p.id === pergunta)?.opcoes.find(o => o.v === v)?.t || v;

export default function PorqueConvecta({ nome, email, telefone, barbearia, slug }) {
  const [i, setI] = useState(-1);          // -1 = convite, 0..3 = perguntas, 4 = fecho
  const [r, setR] = useState({ porque: [], dificuldade: '', tempo: '', antes: '' });
  const [nota, setNota] = useState('');
  const [saltado, setSaltado] = useState(false);

  if (saltado) return null;

  const total = PERGUNTAS.length;
  const p = PERGUNTAS[i];

  const ir = (n) => {
    try { window.trackEvent?.('porque_convecta_passo', { passo: n }); } catch { /* sem analytics */ }
    setI(n);
    if (n === total) enviar();
  };

  function escolher(v) {
    if (p.multi) {
      setR(x => ({ ...x, [p.id]: x[p.id].includes(v) ? x[p.id].filter(y => y !== v) : [...x[p.id], v] }));
      return;
    }
    setR(x => ({ ...x, [p.id]: v }));
    // Uma escolha so: avanca sozinho, depois de ele ver o que carregou.
    setTimeout(() => ir(i + 1), 280);
  }

  function enviar(comNota) {
    const linhas = [
      '[Questionário pós-registo]',
      `Barbearia: ${barbearia}${slug ? ` (${slug})` : ''}`,
      `Porquê a Convecta: ${r.porque.map(v => rotuloDe('porque', v)).join('; ') || '—'}`,
      `Maior dificuldade: ${rotuloDe('dificuldade', r.dificuldade) || '—'}`,
      `Há quanto tempo: ${rotuloDe('tempo', r.tempo) || '—'}`,
      `Porque não antes: ${rotuloDe('antes', r.antes) || '—'}`,
    ];
    if (comNota) linhas.push(`Nota: ${comNota}`);
    enviarContacto({ nome, negocio: barbearia, telefone, email, mensagem: linhas.join('\n') }).catch(() => {});
  }

  const cartao = {
    marginTop: 32, padding: '26px 24px', borderRadius: 18,
    border: '1px solid var(--cv-linha)', background: 'var(--cv-card)',
    boxShadow: '0 10px 40px rgba(36,32,28,0.06)',
  };

  // ── Convite ─────────────────────────────────────────────────────────────
  if (i === -1) {
    return (
      <div style={cartao}>
        <p className="cv-olho" style={{ margin: '0 0 8px' }}>Enquanto o email chega · 30 segundos</p>
        <h2 style={{ fontSize: 22, lineHeight: 1.25, margin: '0 0 10px' }}>Quatro perguntas sobre a tua barbearia</h2>
        <p style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--cv-ink-2)', margin: '0 0 22px' }}>
          No fim mostramos-te o que muda a partir de hoje — à medida do que nos disseres.
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap' }}>
          <button className="pc-btn" onClick={() => ir(0)}>Começar <ArrowRight size={16} /></button>
          <button className="pc-saltar" onClick={() => setSaltado(true)}>Agora não</button>
        </div>
      </div>
    );
  }

  // ── Fecho: as respostas dele, viradas para o que muda ───────────────────
  if (i === total) {
    const linhas = [
      r.dificuldade && { t: rotuloDe('dificuldade', r.dificuldade), d: RESOLVE[r.dificuldade], extra: TEMPO[r.tempo] },
      r.antes && { t: rotuloDe('antes', r.antes), d: ANTES[r.antes] },
    ].filter(Boolean);

    return (
      <motion.div style={cartao} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <p className="cv-olho" style={{ margin: '0 0 8px' }}>A partir de hoje</p>
        <h2 style={{ fontSize: 24, lineHeight: 1.25, margin: '0 0 22px' }}>
          {nome ? `${nome.split(' ')[0]}, ` : ''}é isto que muda na <span className="cv-marca">{barbearia}</span>.
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {linhas.map((l, k) => (
            <motion.div key={k} className="pc-fecho" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + k * 0.18 }}>
              <span className="pc-antes">{l.t}</span>
              <span className="pc-depois">
                <Check size={16} style={{ flexShrink: 0, marginTop: 3, color: 'var(--cv-amarelo-texto)' }} />
                <span>{l.extra ? <strong>{l.extra} </strong> : null}{l.d}</span>
              </span>
            </motion.div>
          ))}
        </div>

        {r.porque.length > 0 && (
          <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--cv-ink-2)', margin: '22px 0 0' }}>
            E fica com o que te fez escolher-nos: {r.porque.map(v => rotuloDe('porque', v).toLowerCase()).join(', ')}.
          </p>
        )}

        <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid var(--cv-linha)' }}>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 8 }}>
            Há mais alguma coisa que devamos saber? <span style={{ fontWeight: 400, color: 'var(--cv-ink-3)' }}>(opcional)</span>
          </label>
          {nota === null ? (
            <p style={{ fontSize: 14, margin: 0, color: 'var(--cv-ink-2)' }}>Obrigado — lemos todas.</p>
          ) : (
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <input className="pc-input" value={nota} onChange={e => setNota(e.target.value)} placeholder="Ex.: tenho 3 barbeiros e uma lista em Excel" />
              <button className="pc-btn" disabled={!nota.trim()} onClick={() => { enviar(nota.trim()); setNota(null); }}>Enviar</button>
            </div>
          )}
        </div>

        <p style={{ fontSize: 15, fontWeight: 600, margin: '22px 0 0' }}>
          Agora só falta confirmares o email — e entras no painel.
        </p>
      </motion.div>
    );
  }

  // ── Uma pergunta ────────────────────────────────────────────────────────
  const escolhido = v => (p.multi ? r[p.id].includes(v) : r[p.id] === v);

  return (
    <div style={cartao}>
      <div style={{ display: 'flex', gap: 6, marginBottom: 22 }} aria-label={`Pergunta ${i + 1} de ${total}`}>
        {PERGUNTAS.map((_, k) => (
          <span key={k} style={{ flex: 1, height: 3, borderRadius: 2, background: k <= i ? 'var(--cv-amarelo)' : 'var(--cv-linha)', transition: 'background .3s' }} />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={p.id} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.22 }}>
          <h2 style={{ fontSize: 22, lineHeight: 1.25, margin: '0 0 6px' }}>{p.titulo}</h2>
          {p.sub && <p style={{ fontSize: 14, color: 'var(--cv-ink-3)', margin: 0 }}>{p.sub}</p>}

          <div className="pc-opcoes">
            {p.opcoes.map(o => (
              <button key={o.v} type="button" className={`pc-opcao ${escolhido(o.v) ? 'pc-on' : ''}`} onClick={() => escolher(o.v)} aria-pressed={escolhido(o.v)}>
                <span className="pc-marca">{escolhido(o.v) && <Check size={13} strokeWidth={3} />}</span>
                {o.t}
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 22, gap: 12 }}>
        <button className="pc-saltar" onClick={() => setI(i - 1)} style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          <ArrowLeft size={15} /> Voltar
        </button>
        {p.multi && (
          <button className="pc-btn" disabled={!r[p.id].length} onClick={() => ir(i + 1)}>Continuar <ArrowRight size={16} /></button>
        )}
      </div>
    </div>
  );
}
