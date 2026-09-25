import React, { useMemo, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Check, Mail, AlertTriangle } from 'lucide-react';
import Seo from '@/components/Seo';
import { PLANOS, DESCONTO_ANUAL } from '@/lib/seo';
import { VERSAO_ACORDO } from '@/lib/seo';
import { supabase, temSupabase } from '@/lib/supabase';

/*
 * Começar — o registo da barbearia, sem ninguém do nosso lado.
 *
 * ── O que esta página NÃO faz ─────────────────────────────────────────────
 *
 * Não cria a barbearia. Cria a CONTA, e guarda as respostas dentro dela.
 *
 * A barbearia só nasce depois de ele confirmar o email e entrar no painel.
 * Se nascesse aqui, qualquer pessoa com um script criava mil barbearias com
 * emails inventados. Este passo a mais resolve isso sem captcha nenhum:
 * ninguém cria uma barbearia sem provar que é dono de uma caixa de correio.
 *
 * ── E não pede cartão ────────────────────────────────────────────────────
 *
 * O cartão é pedido lá dentro, depois de ele ver o painel dele montado com o
 * nome da barbearia. Quem já viu a coisa dele feita dá o cartão; quem nunca
 * entrou, fecha o separador. É a ordem que decide se há venda.
 *
 * ── Os preços ────────────────────────────────────────────────────────────
 *
 * Saem de `lib/seo.js`, como no resto do site. Esta página não escreve um
 * número de dinheiro.
 */

const euros = n => Number(n).toFixed(2).replace('.', ',') + ' €';

/*
 * Quantos barbeiros → que plano. A mesma conta que o servidor refaz depois:
 * isto é para ele ver, não é a decisão final. O que vem do browser é sempre
 * uma sugestão.
 */
function planoPara(n) {
  if (n <= 1) return 'essencial';
  if (n <= 5) return 'profissional';
  return 'business';
}

/** O nome vira endereço. Igual ao que o servidor faz, para o que ele vê bater certo. */
function slugDe(nome) {
  return (nome || '').trim().toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-').replace(/^-|-$/g, '')
    .slice(0, 60);
}

const PAINEL = 'https://administrador.marcacoes.app';
const ETAPAS = ['Plano', 'Barbearia', 'Conta'];

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

export default function Comecar() {
  const [params] = useSearchParams();

  const [passo, setPasso] = useState(1);
  const [barbeiros, setBarbeiros] = useState(1);
  const [periodo, setPeriodo] = useState(params.get('periodo') === 'anual' ? 'anual' : 'mensal');
  // O plano vem escolhido quando ele clica num cartão nos Preços; se vier de
  // outro sítio, sai do número de barbeiros e ele pode trocá-lo à mesma.
  const [planoEscolhido, setPlanoEscolhido] = useState(
    PLANOS.some(p => p.id === params.get('plano')) ? params.get('plano') : null,
  );

  const [barbearia, setBarbearia] = useState({ nome: '', telefone: '', morada: '', nif: '' });
  const [conta, setConta] = useState({ nome: '', email: '', password: '' });
  // Aceitação dos Termos, da Privacidade e do acordo RGPD (art. 28.º).
  // Tem de ser um gesto da pessoa — uma caixa por marcar, não um texto.
  const [aceita, setAceita] = useState(false);

  const [aEnviar, setAEnviar] = useState(false);
  const [erro, setErro] = useState('');
  const [feito, setFeito] = useState(false);

  const planoId = planoEscolhido || planoPara(barbeiros);
  const plano = useMemo(() => PLANOS.find(p => p.id === planoId) || PLANOS[1], [planoId]);
  const slug = slugDe(barbearia.nome);

  const b = (k, v) => setBarbearia(x => ({ ...x, [k]: v }));
  const c = (k, v) => setConta(x => ({ ...x, [k]: v }));

  /*
   * Mudar de passo passa por aqui, para cada passo ficar registado. E a
   * unica maneira de saber ONDE se perde gente: se 100 escolhem o plano e 30
   * escrevem o nome, o problema e o passo 2, nao o site.
   */
  const avancar = (n) => {
    setErro('');
    if (n === 3 && !barbearia.nome.trim()) return setErro('Escreve o nome da barbearia.');
    if (n === 3 && !slug) return setErro('Esse nome não dá um endereço válido. Usa letras e números.');
    try { window.trackEvent?.('comecar_passo', { passo: n, plano: planoId, barbeiros }); } catch { /* sem analytics */ }
    setPasso(n);
    window.scrollTo?.({ top: 0, behavior: 'smooth' });
  };

  // O que a barbearia é: o mesmo objeto vai no registo e no caminho da conta já existente.
  function dadosDaBarbearia() {
    return {
      nome_barbearia: barbearia.nome.trim(),
      slug,
      barbeiros,
      plano: planoId,
      periodo,
      telefone: barbearia.telefone.trim(),
      morada: barbearia.morada.trim(),
      nif: barbearia.nif.replace(/\D/g, ''),
      nome_responsavel: conta.nome.trim(),
      // Prova da aceitação do acordo RGPD: que versão e quando.
      acordo_rgpd_versao: VERSAO_ACORDO,
      acordo_rgpd_aceite_em: new Date().toISOString(),
    };
  }

  /*
   * O email já tem conta (cliente de uma barbearia, por exemplo). Uma conta
   * é uma pessoa; a pessoa pode ter a barbearia dela. Entra-se com a
   * palavra-passe dessa conta e pede-se à função registar-barbearia que a
   * crie nessa conta. Devolve true se ficou tratado (feito ou com erro dito).
   */
  async function criarComContaExistente() {
    const sb = supabase();
    const { error: erroEntrar } = await sb.auth.signInWithPassword({ email: conta.email.trim().toLowerCase(), password: conta.password });
    if (erroEntrar) return false;
    const { data, error } = await sb.functions.invoke('registar-barbearia', { body: dadosDaBarbearia() });
    let motivo = data?.erro;
    if (error && !motivo) { try { motivo = (await error.context?.json())?.erro; } catch { motivo = ''; } motivo = motivo || error.message; }
    await sb.auth.signOut().catch(() => {});
    if (motivo) { setErro(motivo); return true; }
    if (data?.jaExistia) { setErro(`Essa conta já tem a barbearia «${data.nome || data.slug}». Entra no painel para a usares.`); return true; }
    try { window.trackEvent?.('comecar_conta_criada', { plano: planoId, barbeiros, periodo, contaExistente: true }); } catch { /* sem analytics */ }
    window.location.href = `${PAINEL}/entrar`;
    return true;
  }

  async function registar() {
    setErro('');

    if (!barbearia.nome.trim()) return setErro('Escreve o nome da barbearia.');
    if (!slug) return setErro('Esse nome não dá um endereço válido. Usa letras e números.');
    if (!conta.nome.trim()) return setErro('Escreve o teu nome.');
    if (!conta.email.includes('@')) return setErro('Escreve um email válido.');
    if (conta.password.length < 8) return setErro('A palavra-passe tem de ter pelo menos 8 caracteres.');
    if (!aceita) return setErro('Para criar a conta tens de aceitar os Termos, a Política de Privacidade e o Acordo de subcontratação.');
    if (!temSupabase()) return setErro('O registo não está disponível neste momento. Fala connosco pelo WhatsApp.');

    setAEnviar(true);
    try {
      const { data, error } = await supabase().auth.signUp({
        email: conta.email.trim().toLowerCase(),
        password: conta.password,
        options: {
          /*
           * As respostas do formulário viajam DENTRO da conta. É assim que
           * chegam ao outro lado sem existir uma tabela de "registos
           * pendentes" a encher-se de gente que nunca confirmou o email.
           */
          data: dadosDaBarbearia(),
          // O link do email leva-o para o PAINEL, não de volta para aqui. É
          // lá que ele vai trabalhar, e é lá que a barbearia é criada.
          emailRedirectTo: `${PAINEL}/entrar`,
        },
      });

      if (error) {
        const m = (error.message || '').toLowerCase();
        if (/already registered|already been registered|user already/.test(m)) {
          // Já tem conta (por exemplo, como cliente de uma barbearia). Não é
          // razão para não abrir a dele: entra com a palavra-passe dessa
          // conta e a barbearia é criada nela.
          if (await criarComContaExistente()) return;
          setErro('Já existe uma conta com esse email. Se a palavra-passe que escreveste é a dessa conta, tenta outra vez; se te esqueceste, recupera-a no painel.');
        } else if (/rate|too many/.test(m)) {
          setErro('Já foram feitas várias tentativas. Espera um minuto e tenta outra vez.');
        } else if (/password/.test(m)) {
          setErro('Essa palavra-passe é demasiado fraca. Escolhe outra com pelo menos 8 caracteres.');
        } else {
          setErro(error.message || 'Não foi possível criar a conta.');
        }
        return;
      }
      /*
       * O Supabase, de proposito, NAO diz "esse email ja existe". Devolve um
       * sucesso falso, sem enviar nada — para ninguem usar este formulario
       * para descobrir quem tem conta, testando emails um a um. O sinal que
       * deixa e este: um utilizador sem identidades. Sem isto, a pessoa via
       * "vai ao teu email" para um email que nunca ia sair, e ficava a espera.
       */
      if (data?.user && Array.isArray(data.user.identities) && data.user.identities.length === 0) {
        if (await criarComContaExistente()) return;
        setErro('Já existe uma conta com esse email. Se a palavra-passe que escreveste é a dessa conta, tenta outra vez; se te esqueceste, recupera-a no painel.');
        return;
      }

      /*
       * Se veio uma sessao, a confirmacao de email esta desligada no Supabase
       * e a pessoa ja esta dentro. Mostrar "vai ao teu email" seria mentir:
       * leva-se logo para o painel, que trata do resto.
       */
      if (data?.session) {
        window.location.href = `${PAINEL}/entrar`;
        return;
      }

      try { window.trackEvent?.('comecar_conta_criada', { plano: planoId, barbeiros, periodo }); } catch { /* sem analytics */ }
      setFeito(true);
    } catch (e) {
      setErro(e.message || 'Não foi possível criar a conta.');
    } finally {
      setAEnviar(false);
    }
  }

  // ── Feito ───────────────────────────────────────────────────────────────
  if (feito) {
    return (
      <>
        <Seo titulo="Confirma o teu email" caminho="/comecar" noindex />
        <main style={{ maxWidth: 620, margin: '0 auto', padding: '80px 20px 120px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: 56, height: 56, borderRadius: '50%',
            background: 'var(--cv-amarelo)', marginBottom: 24,
          }}>
            <Mail size={26} style={{ color: 'var(--cv-amarelo-texto)' }} />
          </div>
          <h1 style={{ fontSize: 30, lineHeight: 1.2, margin: '0 0 14px' }}>
            Falta um passo: confirma o teu email
          </h1>
          <p style={{ fontSize: 16, lineHeight: 1.6, opacity: .85 }}>
            Enviámos uma mensagem para <strong>{conta.email.trim().toLowerCase()}</strong>.
            Clica no link e entras logo no painel da <strong>{barbearia.nome.trim()}</strong>.
          </p>
          {/* Dizer de onde vem a mensagem resolve metade dos "nao recebi": a
              pessoa sabe o que procurar numa caixa cheia. */}
          <p style={{ fontSize: 15, lineHeight: 1.6, opacity: .85, marginTop: 18 }}>
            Se não estiver na caixa de entrada, <strong>procura no spam ou no lixo</strong> —
            é a primeira vez que te escrevemos e é aí que costuma cair.
          </p>
          <div style={{
            marginTop: 28, padding: 16, borderRadius: 12,
            border: '1px solid var(--cv-linha)', background: 'var(--cv-card)',
            fontSize: 14, lineHeight: 1.6,
          }}>
            O teu endereço vai ser <strong>{slug}.marcacoes.app</strong>. Telefone, morada e NIF
            preenches no painel, quando quiseres.
          </div>
          <p style={{ ...ajuda, marginTop: 24 }}>
            Não chegou em poucos minutos? <Link to="/contacto">Fala connosco</Link> e
            resolvemos em cima da hora.
          </p>
        </main>
      </>
    );
  }

  // ── Formulário ──────────────────────────────────────────────────────────
  return (
    <>
      <Seo
        titulo="Começar"
        descricao="Cria a conta da tua barbearia. 7 dias à experiência, sem pagar nada hoje."
        caminho="/comecar"
        noindex
      />
      <main style={{ maxWidth: 620, margin: '0 auto', padding: '64px 20px 120px' }}>

        {/* Os tres passos com nome: "Passo 2 de 3" diz quanto falta, mas nao
            diz o que vem. Saber que o proximo e "Conta" tira a pergunta
            "o que e que me vao pedir a seguir?", que e a que faz fechar. */}
        <ol style={{ display: 'flex', gap: 6, margin: '0 0 10px', padding: 0, listStyle: 'none' }} aria-label={`Passo ${passo} de 3`}>
          {ETAPAS.map((nome, i) => {
            const n = i + 1;
            const feitoJa = n < passo, actual = n === passo;
            return (
              <li key={nome} style={{ flex: 1 }} aria-current={actual ? 'step' : undefined}>
                <div style={{ height: 3, borderRadius: 2, background: n <= passo ? 'var(--cv-amarelo)' : 'var(--cv-linha)' }} />
                <div style={{ fontSize: 12, fontWeight: actual ? 700 : 600, marginTop: 8, opacity: actual ? 1 : feitoJa ? .8 : .45, display: 'flex', alignItems: 'center', gap: 4 }}>
                  {feitoJa && <Check size={12} />}{nome}
                </div>
              </li>
            );
          })}
        </ol>
        {/* As garantias do hero desaparecem quando se entra aqui. Repetem-se,
            numa linha, para nao parecer que o registo e onde a armadilha esta. */}
        <p style={{ fontSize: 12, opacity: .6, margin: '0 0 30px' }}>
          Sem cartão para começar · 7 dias grátis · cancelas sozinho no painel
        </p>

        {/* ── 1. Quantos barbeiros ────────────────────────────────────── */}
        {passo === 1 && (
          <section>
            <h1 style={{ fontSize: 30, lineHeight: 1.2, margin: '0 0 10px' }}>
              Quantos barbeiros trabalham na tua barbearia?
            </h1>
            <p style={{ fontSize: 15, opacity: .8, margin: '0 0 28px', lineHeight: 1.6 }}>
              Contando contigo. É só isto que decide o plano — o resto da plataforma é igual nos três.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28 }}>
              {[1, 2, 3, 4, 5, 6, 8, 10, 15].map(n => (
                <button
                  key={n}
                  onClick={() => { setBarbeiros(n); setPlanoEscolhido(null); }}
                  style={{
                    minWidth: 52, padding: '12px 0', borderRadius: 10, fontSize: 16, fontWeight: 700,
                    cursor: 'pointer', fontFamily: 'inherit',
                    border: `1px solid ${barbeiros === n ? 'var(--cv-amarelo)' : 'var(--cv-linha)'}`,
                    background: barbeiros === n ? 'var(--cv-amarelo)' : 'var(--cv-card)',
                    color: barbeiros === n ? 'var(--cv-amarelo-texto)' : 'var(--cv-ink)',
                  }}
                >
                  {n}
                </button>
              ))}
            </div>

            <div style={{
              padding: 20, borderRadius: 14,
              border: '1px solid var(--cv-amarelo)', background: 'var(--cv-card)',
            }}>
              <div style={{ fontSize: 12, fontWeight: 600, opacity: .65, letterSpacing: .6 }}>
                O PLANO QUE TE SERVE
              </div>
              <div style={{ fontSize: 22, fontWeight: 700, margin: '6px 0 2px' }}>{plano.nome}</div>
              <div style={{ fontSize: 15 }}>
                <strong style={{ fontSize: 24 }}>
                  {periodo === 'anual' ? euros(plano.precoMesAnual) : euros(plano.preco)}
                </strong>
                <span style={{ opacity: .7 }}> por mês</span>
                {periodo === 'anual' && (
                  <span style={{ opacity: .7 }}> — {euros(plano.precoAno)} pagos de uma vez</span>
                )}
              </div>
              <div style={{ ...ajuda, marginTop: 8 }}>{plano.profissionaisTexto}. {plano.resumo}</div>

              <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
                {['mensal', 'anual'].map(p => (
                  <button
                    key={p}
                    onClick={() => setPeriodo(p)}
                    style={{
                      padding: '7px 14px', borderRadius: 100, fontSize: 13, fontWeight: 600,
                      cursor: 'pointer', fontFamily: 'inherit',
                      border: `1px solid ${periodo === p ? 'var(--cv-amarelo)' : 'var(--cv-linha)'}`,
                      background: periodo === p ? 'var(--cv-amarelo)' : 'transparent',
                      color: periodo === p ? 'var(--cv-amarelo-texto)' : 'var(--cv-ink)',
                    }}
                  >
                    {p === 'mensal' ? 'Mensal' : `Anual, −${Math.round(DESCONTO_ANUAL * 100)} %`}
                  </button>
                ))}
              </div>

              {/* Quem chega por um plano pode querer outro: os planos so
                  diferem no numero de profissionais, e o tamanho da equipa
                  e coisa que ele sabe melhor do que nos. */}
              <div style={{ ...ajuda, marginTop: 14 }}>
                Podes escolher outro:{' '}
                {PLANOS.filter(p => p.id !== planoId).map((p, i) => (
                  <React.Fragment key={p.id}>
                    {i > 0 && ' · '}
                    <button
                      onClick={() => setPlanoEscolhido(p.id)}
                      style={{
                        background: 'none', border: 'none', padding: 0, cursor: 'pointer',
                        font: 'inherit', textDecoration: 'underline', color: 'inherit',
                      }}
                    >
                      {p.nome}
                    </button>
                  </React.Fragment>
                ))}
              </div>
            </div>

            <Botao onClick={() => avancar(2)} style={{ marginTop: 28 }}>
              Continuar <ArrowRight size={17} />
            </Botao>
          </section>
        )}

        {/* ── 2. A barbearia ──────────────────────────────────────────── */}
        {passo === 2 && (
          <section>
            <h1 style={{ fontSize: 30, lineHeight: 1.2, margin: '0 0 10px' }}>Como se chama a tua barbearia?</h1>
            <p style={{ fontSize: 15, opacity: .8, margin: '0 0 28px', lineHeight: 1.6 }}>
              O nome curto, o que dizes ao telefone. É só isto — o resto preenches no painel, quando quiseres.
            </p>

            <label style={rotulo}>Nome da barbearia</label>
            <input
              style={{ ...campo, fontSize: 18, padding: '14px 16px' }}
              value={barbearia.nome}
              placeholder="RC Cuts"
              autoFocus
              onChange={e => b('nome', e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') avancar(3); }}
            />

            {/* O momento. O nome vira endereco enquanto ele escreve — e a
                primeira vez que ve a coisa dele com o nome dele. Telefone,
                morada e NIF sairam daqui: cada campo a mais, mesmo opcional,
                e gente que fecha o separador. Pedem-se la dentro. */}
            <div style={{
              marginTop: 16, padding: '18px 20px', borderRadius: 14,
              border: `1px solid ${slug ? 'var(--cv-amarelo)' : 'var(--cv-linha)'}`,
              background: 'var(--cv-card)', transition: 'border-color .2s',
            }}>
              <div style={{ fontSize: 12, fontWeight: 600, opacity: .65, letterSpacing: .6 }}>O TEU SITE VAI SER</div>
              <div style={{ fontSize: 'clamp(18px, 4.5vw, 24px)', fontWeight: 700, marginTop: 6, wordBreak: 'break-all', color: slug ? 'var(--cv-ink)' : 'var(--cv-ink-3)' }}>
                {slug || 'a-tua-barbearia'}<span style={{ opacity: .55, fontWeight: 500 }}>.marcacoes.app</span>
              </div>
              <div style={{ ...ajuda, marginTop: 8 }}>
                {slug ? 'É este o endereço que vais partilhar no Instagram e no WhatsApp.' : 'Escreve o nome e vê o endereço nascer.'}
              </div>
            </div>

            <div style={{ display: 'flex', gap: 12, marginTop: 28, alignItems: 'center' }}>
              <button onClick={() => setPasso(1)} style={{
                display: 'inline-flex', alignItems: 'center', gap: 6, background: 'none',
                border: 'none', cursor: 'pointer', font: 'inherit', opacity: .7, padding: 8,
              }}>
                <ArrowLeft size={16} /> Voltar
              </button>
              <Botao onClick={() => avancar(3)}>
                Continuar <ArrowRight size={17} />
              </Botao>
            </div>
            {erro && <Aviso texto={erro} />}
          </section>
        )}

        {/* ── 3. A conta ──────────────────────────────────────────────── */}
        {passo === 3 && (
          <section>
            <h1 style={{ fontSize: 30, lineHeight: 1.2, margin: '0 0 10px' }}>A tua conta</h1>
            <p style={{ fontSize: 15, opacity: .8, margin: '0 0 28px', lineHeight: 1.6 }}>
              É com este email e esta palavra-passe que entras no painel todos os dias.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div>
                <label style={rotulo}>O teu nome *</label>
                <input style={campo} value={conta.nome} placeholder="Rui Costa" autoComplete="name"
                       onChange={e => c('nome', e.target.value)} />
              </div>
              <div>
                <label style={rotulo}>Email *</label>
                <input style={campo} type="email" value={conta.email} placeholder="rui@exemplo.pt"
                       autoComplete="email" onChange={e => c('email', e.target.value)} />
                <div style={ajuda}>Vamos enviar-te um link de confirmação para aqui.</div>
              </div>
              <div>
                <label style={rotulo}>Palavra-passe *</label>
                <input style={campo} type="password" value={conta.password} autoComplete="new-password"
                       placeholder="Pelo menos 8 caracteres"
                       onChange={e => c('password', e.target.value)} />
              </div>
            </div>

            <div style={{
              marginTop: 24, padding: 16, borderRadius: 12,
              border: '1px solid var(--cv-linha)', background: 'var(--cv-card)',
              fontSize: 14, lineHeight: 1.6,
            }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <Check size={18} style={{ color: 'var(--cv-amarelo)', flexShrink: 0, marginTop: 2 }} />
                <div>
                  <strong>Hoje não pagas nada.</strong> Criar a conta é grátis e o cartão
                  só é pedido lá dentro, depois de veres o painel montado. São 7 dias à
                  experiência, e cancelas sozinho se não gostares.
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 12, marginTop: 28, alignItems: 'center', flexWrap: 'wrap' }}>
              <button onClick={() => setPasso(2)} style={{
                display: 'inline-flex', alignItems: 'center', gap: 6, background: 'none',
                border: 'none', cursor: 'pointer', font: 'inherit', opacity: .7, padding: 8,
              }}>
                <ArrowLeft size={16} /> Voltar
              </button>
              <Botao onClick={registar} disabled={aEnviar}>
                {aEnviar ? 'A criar…' : <>Criar a minha conta <ArrowRight size={17} /></>}
              </Botao>
            </div>

            {erro && <Aviso texto={erro} />}

            <label style={{ ...ajuda, marginTop: 20, display: 'flex', gap: 10, alignItems: 'flex-start', cursor: 'pointer' }}>
              <input type="checkbox" checked={aceita} onChange={e => { setAceita(e.target.checked); setErro(''); }}
                style={{ width: 18, height: 18, marginTop: 2, flexShrink: 0, accentColor: '#1a1714' }} />
              <span>
                Li e aceito os <Link to="/termos" target="_blank">Termos</Link>, a{' '}
                <Link to="/privacidade" target="_blank">Política de Privacidade</Link> e o{' '}
                <Link to="/acordo-rgpd" target="_blank">Acordo de subcontratação de dados (RGPD)</Link>.
              </span>
            </label>
          </section>
        )}
      </main>
    </>
  );
}

function Aviso({ texto }) {
  return (
    <div role="alert" style={{
      display: 'flex', gap: 10, alignItems: 'flex-start', marginTop: 18,
      padding: '12px 14px', borderRadius: 10,
      border: '1px solid #EF4444', background: 'rgba(239,68,68,.08)',
      fontSize: 14, lineHeight: 1.5,
    }}>
      <AlertTriangle size={18} style={{ color: '#EF4444', flexShrink: 0, marginTop: 1 }} />
      <span>{texto}</span>
    </div>
  );
}
