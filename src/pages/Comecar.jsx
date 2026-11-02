import { lerOrigem } from '@/lib/origem';
import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Check, Mail, AlertTriangle, Scissors, Wind, Hand, Flower2 } from 'lucide-react';
import Seo from '@/components/Seo';
import { PLANOS, DESCONTO_ANUAL } from '@/lib/seo';
import { VERSAO_ACORDO } from '@/lib/seo';
import { supabase, temSupabase } from '@/lib/supabase';
import PorqueConvecta, { textoRespostas } from '@/components/PorqueConvecta';
import { enviarContacto } from '@/lib/contactos';
import AbrirNoNavegador, { emBrowserDeApp } from '@/components/AbrirNoNavegador';

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

// Os cartões dos extras no fim do registo (15/10/2026).
const cartaoExtra = on => ({
  display: 'flex', gap: 12, alignItems: 'flex-start', width: '100%', textAlign: 'left',
  padding: 16, borderRadius: 14, font: 'inherit', color: 'var(--cv-ink)', cursor: 'pointer',
  border: `1.5px solid ${on ? 'var(--cv-amarelo)' : 'var(--cv-linha)'}`,
  background: on ? 'rgba(254,233,109,.18)' : 'var(--cv-card)',
});
const caixinha = on => ({
  width: 22, height: 22, borderRadius: 6, flexShrink: 0, marginTop: 1, display: 'grid', placeItems: 'center',
  border: `1.5px solid ${on ? 'var(--cv-ink)' : 'var(--cv-linha)'}`, background: on ? 'var(--cv-ink)' : 'transparent', color: '#fff',
});

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

// 02/11/2026: os endereços que são nossos (igual a subdominio_reservado, CRIAR_BARBEARIA.sql).
const RESERVADOS = ['www', 'admin', 'administrador', 'api', 'app', 'super', 'superadmin',
  'portal', 'painel', 'mail', 'email', 'static', 'cdn', 'assets', 'blog',
  'suporte', 'ajuda', 'conta', 'login', 'convecta', 'gestao'];
// 02/11/2026: um email a sério, não só um «@».
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/*
 * A SESSÃO VAI NO ENDEREÇO (15/10/2026). O site e o painel são domínios
 * diferentes e não partilham a sessão. Leva-se a sessão no fragmento (#),
 * no formato que o supabase-js do painel já sabe ler sozinho — e ele entra
 * sem escrever a palavra-passe outra vez. O fragmento nunca vai ao servidor.
 */
/* 01/11/2026: no fim do registo. Fora do Instagram vai direto para o painel
   (como sempre). Dentro do Instagram/Facebook/TikTok mostra-se o ecrã «Abre
   no navegador» (o #… não sobrevive à passagem para o Chrome no Android).
   02/11/2026: nesse caso a sessão JÁ NÃO viaja no endereço (?sessao= levava
   os tokens para o histórico e para a área de transferência). Pede-se à
   função ligacao-painel um código de uso único (1 hora) e o painel troca-o
   por sessão em /entrar?token_hash=…&type=magiclink. */
async function urlDoPainel(session) {
  const h = sessaoNoEndereco(session).replace(/^#/, '');
  if (!emBrowserDeApp()) return `${PAINEL}/entrar${h ? '#' + h : ''}`;
  if (!session?.access_token) return `${PAINEL}/entrar`;
  try {
    const { data } = await supabase().functions.invoke('ligacao-painel', { body: {}, headers: { Authorization: `Bearer ${session.access_token}` } });
    if (data?.token_hash) return `${PAINEL}/entrar?token_hash=${encodeURIComponent(data.token_hash)}&type=magiclink`;
  } catch { /* sem código: entra com a palavra-passe */ }
  return `${PAINEL}/entrar`;
}
function sessaoNoEndereco(session) {
  if (!session?.access_token || !session?.refresh_token) return '';
  const p = new URLSearchParams({
    access_token: session.access_token, refresh_token: session.refresh_token,
    expires_in: String(session.expires_in || 3600), token_type: 'bearer', type: 'signup',
  });
  return `#${p.toString()}`;
}
const ETAPAS = ['Plano', 'Negócio', 'Conta'];

/* O tipo de negócio (10/10/2026). Vai para a função registar-barbearia, que
   cria a conta com os serviços, as cores e as palavras de cada tipo — as
   mesmas do painel (src/lib/nicho.js). */
const TIPOS_NEGOCIO = [
  { v: 'barbearia', l: 'Barbearia', d: 'Cortes, barbas, desenhos' },
  { v: 'cabeleireiro', l: 'Cabeleireiro', d: 'Cor, madeixas, brushing' },
  { v: 'unhas', l: 'Unhas, sobrancelhas e pestanas', d: 'Gel, manicure, extensões' },
  { v: 'estetica', l: 'Estética', d: 'Pele, massagens, depilação' },
  { v: 'misto', l: 'Dois tipos no mesmo espaço', d: 'Barbearia + estética, por exemplo' },
];

const campo = {
  // 16px: no iPhone, um campo com letra mais pequena faz zoom ao tocar.
  width: '100%', padding: '12px 14px', borderRadius: 10, fontSize: 16,
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
  // 01/11/2026: no fim, dentro do Instagram, o endereço do painel para abrir no navegador.
  const [fimNaApp, setFimNaApp] = useState('');
  const irParaPainel = async session => {
    const url = await urlDoPainel(session);
    if (emBrowserDeApp()) { setFimNaApp(url); window.scrollTo(0, 0); }
    else window.location.href = url;
  };
  const [barbeiros, setBarbeiros] = useState(1);
  // Abre sempre nos 15 dias (13/10/2026, pedido do Diogo); mensal ou anual só
  // se vier escolhido da página de preços (?periodo=mensal|anual).
  const [periodo, setPeriodo] = useState(['anual', 'mensal'].includes(params.get('periodo')) ? params.get('periodo') : 'quinzenal');
  // O plano vem escolhido quando ele clica num cartão nos Preços; se vier de
  // outro sítio, sai do número de barbeiros e ele pode trocá-lo à mesma.
  const [planoEscolhido, setPlanoEscolhido] = useState(
    PLANOS.some(p => p.id === params.get('plano')) ? params.get('plano') : null,
  );

  const [barbearia, setBarbearia] = useState({ nome: '', telefone: '', morada: '', nif: '' });
  // Indicação (19/10/2026): o código do amigo que o trouxe (do ?ref= ou à mão).
  const refInicial = (params.get('ref') || '').trim().toUpperCase().slice(0, 16);
  const [codigoAmigo, setCodigoAmigo] = useState(refInicial);
  const [mostrarCodigo, setMostrarCodigo] = useState(false);
  /*
   * O TIPO (15/10/2026, à Fresha): escolhe-se um ou dois quadrados. Dois
   * quadrados = dois tipos no mesmo espaço (o «misto», com dois negócios
   * ligados); o primeiro escolhido é o principal.
   */
  const [tipos, setTipos] = useState(params.get('tipo') === 'misto' ? ['barbearia', 'estetica'] : []);
  const misto = tipos.length === 2;
  const tipo = misto ? 'misto' : (tipos[0] || 'barbearia');
  const lados = misto ? tipos : [];
  const tocarTipo = v => setTipos(l => (l.includes(v) ? l.filter(x => x !== v) : [...l, v].slice(-2)));
  const navigate = useNavigate();
  const [conta, setConta] = useState({ nome: '', email: '', telefone: '', password: '' });
  // Aceitação dos Termos, da Privacidade e do acordo RGPD (art. 28.º).
  // Tem de ser um gesto da pessoa — uma caixa por marcar, não um texto.
  const [aceita, setAceita] = useState(false);
  // Os extras no fim (15/10/2026): pagamentos online e outro tipo no mesmo espaço.
  const [comPagamentos, setComPagamentos] = useState(false);
  const [aEscolherSegundo, setAEscolherSegundo] = useState(false);

  const [aEnviar, setAEnviar] = useState(false);
  const [erro, setErro] = useState('');
  const [feito, setFeito] = useState(false);

  // As quatro perguntas de entrada (PorqueConvecta). Mostram-se antes do
  // passo 1; as respostas ficam aqui ate haver conta a que as juntar.
  // 10/10/2026: as quatro perguntas de entrada sairam — o Diogo quer que o
  // registo comece logo pelo tipo de negocio. O componente fica, desligado.
  const [naEntrada, setNaEntrada] = useState(false);
  const [respostas, setRespostas] = useState(null);

  /*
   * O TELEMÓVEL DO RESPONSÁVEL É OBRIGATÓRIO.
   *
   * Não é burocracia: sem número não há como falar com quem montou a conta,
   * e uma barbearia que monta e não activa morre calada. O telefone DA LOJA
   * não serve — atende quem estiver ao balcão.
   *
   * Aceita-se 9 dígitos portugueses (9…), com ou sem +351 e com ou sem
   * espaços, e números estrangeiros com indicativo. Recusa-se o resto: um
   * número mal escrito é o mesmo que não ter número.
   */
  const telefoneLimpo = t => String(t || '').replace(/[\s.\-()]/g, '');
  function telefoneValido(t) {
    const n = telefoneLimpo(t);
    if (/^(\+351|00351)?9\d{8}$/.test(n)) return true;       // telemóvel português
    if (/^(\+351|00351)?2\d{8}$/.test(n)) return true;       // fixo português
    if (/^\+\d{8,15}$/.test(n)) return true;                 // estrangeiro com indicativo
    return false;
  }

  // Num espaço misto o plano vale por área: 4 pessoas em dois lados são 2 por área.
  const planoId = planoEscolhido || planoPara(misto ? Math.ceil(barbeiros / 2) : barbeiros);
  const plano = useMemo(() => PLANOS.find(p => p.id === planoId) || PLANOS[1], [planoId]);
  const slug = slugDe(barbearia.nome);
  // 02/11/2026: diz-se logo se o endereço já está ocupado (o servidor põe -2;
  // antes a pessoa só descobria no painel). businesses_public é legível a anon.
  const [slugOcupado, setSlugOcupado] = useState('');
  useEffect(() => {
    if (!slug || !temSupabase()) { setSlugOcupado(''); return; }
    const t = setTimeout(async () => {
      try {
        const { data } = await supabase().from('businesses_public').select('slug').eq('slug', slug).limit(1);
        setSlugOcupado(data?.length ? slug : '');
      } catch { setSlugOcupado(''); }
    }, 500);
    return () => clearTimeout(t);
  }, [slug]);

  const b = (k, v) => setBarbearia(x => ({ ...x, [k]: v }));
  const c = (k, v) => setConta(x => ({ ...x, [k]: v }));

  /*
   * Mudar de passo passa por aqui, para cada passo ficar registado. E a
   * unica maneira de saber ONDE se perde gente: se 100 escolhem o plano e 30
   * escrevem o nome, o problema e o passo 2, nao o site.
   */
  const avancar = (n) => {
    setErro('');
    if (n > passo) {
      if (passo === 1 && !barbearia.nome.trim()) return setErro('Escreve o nome do teu negócio.');
      if (passo === 1 && !slug) return setErro('Esse nome não dá um endereço válido. Usa letras e números.');
      if (passo === 1 && RESERVADOS.includes(slug)) return setErro('Esse nome dá um endereço que é nosso. Escolhe outro.');
      if (passo === 2 && !tipos.length) return setErro('Escolhe o tipo do teu negócio.');
      if (passo === 4) {
        if (!conta.nome.trim()) return setErro('Escreve o teu nome.');
        if (!EMAIL_RE.test(conta.email.trim())) return setErro('Escreve um email válido.');
        if (!telefoneValido(conta.telefone)) return setErro('Escreve o teu telemóvel, com 9 dígitos.');
        if (conta.password.length < 8) return setErro('A palavra-passe tem de ter pelo menos 8 caracteres.');
      }
    }
    try { window.trackEvent?.('comecar_passo', { passo: n, plano: planoId, barbeiros }); } catch { /* sem analytics */ }
    setPasso(n);
    window.scrollTo?.({ top: 0 });
  };


  // Depois de a conta existir, as respostas seguem para a tabela dos
  // contactos, ja com nome e telemovel. Se falhar, nao se diz nada a ninguem.
  function enviarRespostas() {
    if (!respostas) return;
    enviarContacto({
      nome: conta.nome.trim(),
      negocio: `${barbearia.nome.trim()} (${slug})`,
      telefone: telefoneLimpo(conta.telefone),
      email: conta.email.trim().toLowerCase(),
      mensagem: textoRespostas(respostas),
    }).catch(() => {});
  }

  // O que a barbearia é: o mesmo objeto vai no registo e no caminho da conta já existente.
  function dadosDaBarbearia() {
    return {
      nome_barbearia: barbearia.nome.trim(),
      slug,
      tipoNegocio: tipo,
      lados: misto ? lados : undefined,
      extras: comPagamentos && !['profissional', 'business'].includes(planoId) ? ['pagamentos'] : undefined,
      barbeiros,
      plano: planoId,
      periodo,
      telefone: barbearia.telefone.trim(),
      morada: barbearia.morada.trim(),
      nif: barbearia.nif.replace(/\D/g, ''),
      nome_responsavel: conta.nome.trim(),
      // O número de quem manda na conta. Obrigatório desde 30/09/2026.
      telefone_responsavel: telefoneLimpo(conta.telefone),
      // Marca a versão do formulário: é o que permite à função exigir o
      // número aos registos novos sem trancar quem ficou a meio do anterior.
      registo_versao: 2,
      // O código do amigo que o indicou (1.º mês a metade para quem entra).
      ref: codigoAmigo.trim() || undefined,
      // De onde veio (UTM das stories/posts, ou o referrer). Ver lib/origem.js.
      origem_marketing: lerOrigem() || undefined,
      // Prova da aceitação do acordo RGPD: que versão e quando.
      acordo_rgpd_versao: VERSAO_ACORDO,
      acordo_rgpd_aceite_em: new Date().toISOString(),
      // As quatro respostas de entrada seguem TAMBEM aqui. Ja iam para a
      // tabela dos contactos, mas agora a `registar-barbearia` abre um lead
      // no CRM com este registo — e e com estas respostas que se abre a
      // chamada no dia seguinte, em vez de se comecar do zero.
      respostas: respostas || null,
      respostas_texto: respostas ? textoRespostas(respostas) : '',
    };
  }

  /*
   * 02/11/2026: o caminho «email já tem conta → entra com a palavra-passe e
   * cria a barbearia nessa conta» saiu. Dizia a quem quer que fosse se um
   * email tinha conta (e deixava tentar palavras-passe a partir do site).
   * Agora esse caso mostra o mesmo «vai ao teu email» que o registo normal;
   * quem já tem conta entra no painel com a palavra-passe dela.
   */

  async function registar() {
    setErro('');

    if (!barbearia.nome.trim()) return setErro('Escreve o nome do teu negócio.');
    if (!slug) return setErro('Esse nome não dá um endereço válido. Usa letras e números.');
    if (RESERVADOS.includes(slug)) return setErro('Esse nome dá um endereço que é nosso. Escolhe outro.');
    if (!conta.nome.trim()) return setErro('Escreve o teu nome.');
    if (!EMAIL_RE.test(conta.email.trim())) return setErro('Escreve um email válido.');
    if (!conta.telefone.trim()) return setErro('Escreve o teu telemóvel — é por aí que falamos contigo se alguma coisa correr mal.');
    if (!telefoneValido(conta.telefone)) return setErro('Esse número não parece certo. Escreve os 9 dígitos, por exemplo 912 345 678.');
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
          // 02/11/2026: não se diz que o email já tem conta (ver nota acima).
          setFeito(true);
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
       * deixa e este: um utilizador sem identidades.
       * 02/11/2026: mostra-se o mesmo ecrã «vai ao teu email» — se o site
       * dissesse «já existe», qualquer um descobria quem tem conta, email a
       * email. Quem já tem conta entra no painel com a palavra-passe dela.
       */
      if (data?.user && Array.isArray(data.user.identities) && data.user.identities.length === 0) {
        setFeito(true);
        return;
      }

      // 02/11/2026: conta-se a conta criada nos dois caminhos (com ou sem sessão).
      try { window.trackEvent?.('comecar_conta_criada', { plano: planoId, barbeiros, periodo }); } catch { /* sem analytics */ }

      /*
       * Se veio uma sessao, a confirmacao de email esta desligada no Supabase
       * e a pessoa ja esta dentro. Mostrar "vai ao teu email" seria mentir:
       * leva-se logo para o painel, que trata do resto.
       */
      if (data?.session) {
        enviarRespostas();
        await irParaPainel(data.session);
        return;
      }

      enviarRespostas();
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
        <main style={{ maxWidth: 620, margin: '0 auto',
        /* Os lados um a um, e nunca o atalho `padding`: um `padding` inline
           reescreve os quatro de uma vez e apaga, sem avisar, qualquer
           margem posta noutro sitio. A barra de cima e `position: fixed`
           (80px, 96px em ecra grande), por isso a pagina tem de se afastar
           dela por si — com os 64px que aqui estavam, as duas primeiras
           linhas do cartao liam-se por baixo da barra. */
        paddingLeft: 20, paddingRight: 20, paddingBottom: 120,
        paddingTop: 144 }}>
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
            Clica no link e entras logo no painel de <strong>{barbearia.nome.trim()}</strong>.
          </p>
          {/* Dizer de onde vem a mensagem resolve metade dos "nao recebi": a
              pessoa sabe o que procurar numa caixa cheia. */}
          <p style={{ fontSize: 15, lineHeight: 1.6, opacity: .85, marginTop: 18 }}>
            Se não estiver na caixa de entrada, <strong>procura no spam ou no lixo</strong> —
            é a primeira vez que te escrevemos e é aí que costuma cair.
          </p>
          {/* 02/11/2026: quem já tinha conta (cliente de uma barbearia, por exemplo) vê este
              mesmo ecrã — não se diz se o email existe. A saída é entrar no painel. */}
          <p style={{ fontSize: 15, lineHeight: 1.6, opacity: .85, marginTop: 12 }}>
            Já tinhas conta com este email? Então não chega mensagem nenhuma: <a href={`${PAINEL}/entrar`} style={{ fontWeight: 700 }}>entra no painel</a> com a tua palavra-passe e cria lá o teu negócio.
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

  // ── Formulário (15/10/2026, à Fresha: um ecrã, uma pergunta) ──────────
  const TOTAL = 5;
  const sobre = { fontSize: 13, fontWeight: 600, color: 'var(--cv-ink-3)', margin: '0 0 6px' };
  const titulo = { fontSize: 'clamp(26px, 7vw, 32px)', lineHeight: 1.15, margin: '0 0 8px', fontWeight: 700, letterSpacing: '-.01em' };
  const sub = { fontSize: 15, color: 'var(--cv-ink-2)', margin: '0 0 24px', lineHeight: 1.5 };
  const linhaOpcao = on => ({
    display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', textAlign: 'left',
    padding: '18px 16px', borderRadius: 14, font: 'inherit', fontSize: 16, fontWeight: 600, color: 'var(--cv-ink)', cursor: 'pointer',
    border: `1.5px solid ${on ? 'var(--cv-ink)' : 'var(--cv-linha)'}`, background: 'var(--cv-card)',
  });
  const ICONE = { barbearia: Scissors, cabeleireiro: Wind, unhas: Hand, estetica: Flower2 };
  const EQUIPA = [
    { n: 1, l: 'Só eu' },
    { n: 5, l: '2 a 5 pessoas' },
    { n: 15, l: '6 a 15 pessoas' },
  ];
  const seguinte = passo < TOTAL ? () => avancar(passo + 1) : registar;

  // No fim do registo dentro do Instagram: o ecrã «Abre no navegador».
  if (fimNaApp) return <AbrirNoNavegador url={fimNaApp} />;

  return (
    <>
      <Seo
        titulo="Começar"
        descricao="Cria a conta do teu negócio. 14 dias à experiência, sem pagar nada hoje."
        caminho="/comecar"
        noindex
      />
      <div className="cm">
        <header className="cm-topo">
          <div className="cm-progresso" aria-label={`Passo ${passo} de ${TOTAL}`}>
            {Array.from({ length: TOTAL }, (_, i) => <span key={i} className={i < passo ? 'on' : ''} />)}
          </div>
          <button type="button" className="cm-voltar" aria-label="Voltar"
            onClick={() => (passo > 1 ? avancar(passo - 1) : navigate('/'))}>
            <ArrowLeft size={22} />
          </button>
        </header>

        <main className="cm-corpo">
          <p style={sobre}>Criar conta</p>

          {passo === 1 && (
            <section>
              <h1 style={titulo}>Qual é o nome do teu negócio?</h1>
              <p style={sub}>É o nome que os teus clientes vão ver.</p>
              <input style={{ ...campo, fontSize: 18, padding: '16px' }} value={barbearia.nome} autoFocus
                placeholder={{ cabeleireiro: 'Salão Bela', unhas: 'Nails by Ana', estetica: 'Espaço Pele' }[tipos[0]] || 'RC Cuts'}
                onChange={e => b('nome', e.target.value)} onKeyDown={e => { if (e.key === 'Enter') seguinte(); }} />
              <p className="cm-endereco">{slug || 'o-teu-negocio'}<span>.marcacoes.app</span></p>
              {slugOcupado && slugOcupado === slug && (
                <p style={ajuda}>Esse endereço já está ocupado — vai ficar <b>{slug}-2</b>.marcacoes.app. Podes mudar o nome se preferires.</p>
              )}

              {refInicial ? (
                <div className="cm-amigo-ok">🎁 Entraste pelo convite de um amigo. O teu <b>1.º mês fica a metade</b>.</div>
              ) : mostrarCodigo ? (
                <input style={{ ...campo, marginTop: 14 }} value={codigoAmigo}
                  placeholder="Código de amigo (ex. RASTA-2K7)"
                  onChange={e => setCodigoAmigo(e.target.value.toUpperCase().slice(0, 16))} />
              ) : (
                <button type="button" className="cm-amigo-link" onClick={() => setMostrarCodigo(true)}>Tens um código de amigo?</button>
              )}
            </section>
          )}

          {passo === 2 && (
            <section>
              <h1 style={titulo}>Que tipo de negócio é?</h1>
              <p style={sub}>Tens dois no mesmo espaço? Escolhe os dois.</p>
              <div className="cm-grelha">
                {TIPOS_NEGOCIO.filter(t => t.v !== 'misto').map(t => {
                  const i = tipos.indexOf(t.v);
                  const Ic = ICONE[t.v] || Scissors;
                  return (
                    <button key={t.v} type="button" aria-pressed={i >= 0} onClick={() => tocarTipo(t.v)}
                      className={`cm-tile${i >= 0 ? ' on' : ''}`}>
                      {i === 0 && misto && <span className="cm-principal">Principal</span>}
                      <Ic size={26} strokeWidth={1.6} />
                      <span>{t.v === 'unhas' ? 'Unhas e pestanas' : t.l}</span>
                    </button>
                  );
                })}
              </div>
            </section>
          )}

          {passo === 3 && (
            <section>
              <h1 style={titulo}>Quantas pessoas trabalham {misto ? 'no espaço' : 'contigo'}?</h1>
              <p style={sub}>Contando contigo.</p>
              <div style={{ display: 'grid', gap: 10 }}>
                {EQUIPA.map(o => (
                  <button key={o.n} type="button" onClick={() => { setBarbeiros(o.n); setPlanoEscolhido(null); }} style={linhaOpcao(barbeiros === o.n)}>
                    {o.l}{barbeiros === o.n && <Check size={20} />}
                  </button>
                ))}
              </div>
            </section>
          )}

          {passo === 4 && (
            <section>
              <h1 style={titulo}>Cria a tua conta</h1>
              <p style={sub}>É com isto que entras no painel.</p>
              <div style={{ display: 'grid', gap: 14 }}>
                <input style={campo} value={conta.nome} placeholder="O teu nome" autoComplete="name" onChange={e => c('nome', e.target.value)} />
                <input style={campo} type="email" value={conta.email} placeholder="Email" autoComplete="email" onChange={e => c('email', e.target.value)} />
                <input style={campo} type="tel" inputMode="tel" value={conta.telefone} placeholder="Telemóvel" autoComplete="tel" onChange={e => c('telefone', e.target.value)} />
                <input style={campo} type="password" value={conta.password} placeholder="Palavra-passe (mínimo 8)" autoComplete="new-password" onChange={e => c('password', e.target.value)} />
              </div>
            </section>
          )}

          {passo === 5 && (
            <section>
              {/* 01/11/2026 (Diogo): sem «O teu plano» aqui — o preço fala-se no fim. */}
              <h1 style={titulo}>Está quase.</h1>
              <p style={sub}>Vamos redirecionar-te agora para a tua aplicação de gestão de marcações. Lá tens um vídeo curto que te mostra tudo, passo a passo.</p>
              <div className="cm-plano" style={{ display: 'grid', gap: 8 }}>
                <strong style={{ fontSize: 17 }}>{slug || 'o-teu-negocio'}.marcacoes.app</strong>
                <span style={{ fontSize: 14, color: 'var(--cv-ink-2)' }}>A página de marcações {barbearia.nome.trim() ? `da ${barbearia.nome.trim()}` : 'do teu negócio'} e o teu painel ficam prontos a seguir.</span>
              </div>

              <label style={{ display: 'flex', gap: 10, alignItems: 'flex-start', cursor: 'pointer', marginTop: 20, fontSize: 14, lineHeight: 1.5, color: 'var(--cv-ink-2)' }}>
                <input type="checkbox" checked={aceita} onChange={e => { setAceita(e.target.checked); setErro(''); }}
                  style={{ width: 20, height: 20, marginTop: 1, flexShrink: 0, accentColor: '#1a1714' }} />
                <span>
                  Aceito os <Link to="/termos" target="_blank">Termos</Link>, a{' '}
                  <Link to="/privacidade" target="_blank">Privacidade</Link> e o{' '}
                  <Link to="/acordo-rgpd" target="_blank">Acordo RGPD</Link>.
                </span>
              </label>
            </section>
          )}

          {erro && <Aviso texto={erro} />}
        </main>

        <footer className="cm-baixo">
          <button type="button" className="cm-continuar" onClick={seguinte} disabled={aEnviar}>
            {passo < TOTAL ? <>Continuar <ArrowRight size={18} /></> : aEnviar ? 'A criar…' : <>Criar a minha conta <ArrowRight size={18} /></>}
          </button>
        </footer>
      </div>
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
