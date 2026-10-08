import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { PRECO_DESDE_TEXTO } from '@/lib/seo';

/*
 * «Porquê a Convecta» — quatro perguntas logo à entrada do /comecar.
 *
 * Isto NAO e um inquerito para nos. E para ele.
 *
 * Quem responde «o telefone toca a meio do corte», «ha anos», «achava que era
 * complicado» esta a dizer a si proprio porque e que veio. No fim devolvemos-
 * lhe as respostas dele, viradas ao contrario: o que muda com a Convecta. E
 * so depois disso lhe perguntamos quantos barbeiros tem.
 *
 * So botoes: ele toca e avanca, nunca escreve nada. E salta-se com um toque —
 * quem ja vem decidido nao pode ficar preso aqui.
 *
 * As respostas ficam guardadas no Comecar e seguem quando a conta e criada
 * (ai ja ha nome e contacto para lhes juntar). Ver textoRespostas().
 *
 * Regra do site: tudo o que o fecho promete tem de existir hoje no painel.
 */

const PERGUNTAS = [
  {
    id: 'porque',
    titulo: 'O que te fez escolher a Convecta?',
    sub: 'Escolhe a que pesou mais.',
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
  conhecia: 'Não conhecias — agora conheces, e estás a dois minutos de a ter.',
  caro: `Planos desde ${PRECO_DESDE_TEXTO}/mês, sem comissões. E começas à experiência, sem cartão.`,
  complicado: 'Não montas nada sozinho: vamos à barbearia e deixamos tudo pronto no mesmo dia.',
  tempo: 'São dois minutos agora. Depois disso é tempo que ganhas, não tempo que gastas.',
  clientes: 'Os teus clientes e o histórico vêm contigo: entregas a lista como a tiveres e nós carregamos.',
  normal: 'Era normal porque não havia alternativa à tua medida. Agora há.',
};

const rotuloDe = (pergunta, v) => PERGUNTAS.find(p => p.id === pergunta)?.opcoes.find(o => o.v === v)?.t || v;

// O que segue para a tabela dos contactos, depois de a conta ser criada.
export function textoRespostas(r) {
  return [
    '[Questionário de entrada]',
    `Porquê a Convecta: ${rotuloDe('porque', r.porque) || '—'}`,
    `Maior dificuldade: ${rotuloDe('dificuldade', r.dificuldade) || '—'}`,
    `Há quanto tempo: ${rotuloDe('tempo', r.tempo) || '—'}`,
    `Porque não antes: ${rotuloDe('antes', r.antes) || '—'}`,
  ].join('\n');
}

export default function PorqueConvecta({ onFim, onSaltar }) {
  const [i, setI] = useState(-1);          // -1 = convite, 0..3 = perguntas, 4 = fecho
  const [r, setR] = useState({ porque: '', dificuldade: '', tempo: '', antes: '' });

  const total = PERGUNTAS.length;
  const p = PERGUNTAS[i];

  const ir = (n) => {
    try { window.trackEvent?.('porque_convecta_passo', { passo: n }); } catch { /* sem analytics */ }
    setI(n);
    window.scrollTo?.({ top: 0, behavior: 'smooth' });
  };

  function escolher(v) {
    const novas = { ...r, [p.id]: v };
    setR(novas);
    // Avanca sozinho, depois de ele ver o que carregou.
    setTimeout(() => ir(i + 1), 280);
  }

  const cartao = {
    padding: '26px 24px', borderRadius: 18,
    border: '1px solid var(--cv-linha)', background: 'var(--cv-card)',
    boxShadow: '0 10px 40px rgba(36,32,28,0.06)',
  };

  // ── Convite ─────────────────────────────────────────────────────────────
  if (i === -1) {
    return (
      <div style={cartao}>
        <p className="cv-olho" style={{ margin: '0 0 8px' }}>Antes de começar · 30 segundos</p>
        <h1 style={{ fontSize: 28, lineHeight: 1.2, margin: '0 0 10px' }}>Primeiro, conta-nos da tua barbearia.</h1>
        <p style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--cv-ink-2)', margin: '0 0 22px' }}>
          Quatro perguntas, só a tocar. No fim mostramos-te o que muda com a Convecta — à medida do que nos disseres.
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap' }}>
          <button className="pc-btn" onClick={() => ir(0)}>Responder <ArrowRight size={16} /></button>
          <button className="pc-saltar" onClick={onSaltar}>Saltar e falar já</button>
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
        <p className="cv-olho" style={{ margin: '0 0 8px' }}>Com a Convecta</p>
        <h1 style={{ fontSize: 26, lineHeight: 1.25, margin: '0 0 22px' }}>
          É isto que muda na <span className="cv-marca">tua barbearia</span>.
        </h1>

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

        {r.porque && (
          <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--cv-ink-2)', margin: '22px 0 0' }}>
            E fica com o que te fez escolher-nos: {rotuloDe('porque', r.porque).toLowerCase()}.
          </p>
        )}

        <div style={{ marginTop: 26, paddingTop: 22, borderTop: '1px solid var(--cv-linha)', display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <button className="pc-btn" onClick={() => onFim(r)}>Montar a minha barbearia <ArrowRight size={16} /></button>
          <span style={{ fontSize: 13, color: 'var(--cv-ink-3)' }}>Dois minutos · sem cartão</span>
        </div>
      </motion.div>
    );
  }

  // ── Uma pergunta ────────────────────────────────────────────────────────
  const escolhido = v => r[p.id] === v;

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
      </div>
    </div>
  );
}
