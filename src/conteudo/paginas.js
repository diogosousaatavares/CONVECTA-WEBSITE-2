/*
 * As paginas de conteudo do site: a pagina-pilar, as seis paginas de
 * funcionalidade, "Sobre" e as comparacoes. Cada uma e um objeto que o
 * componente Artigo desenha.
 *
 * Regras:
 *  - Tudo o que se diz da Convecta existe hoje (ver lib/seo.js e
 *    conteudo/comum.js). Nada de "em breve".
 *  - Tudo o que se diz de um concorrente vem de conteudo/comum.js, com a
 *    data de verificacao e o link para a pagina deles.
 *  - Sem testemunhos, sem numeros de clientes, sem "o melhor". Factos.
 */
import { PLANOS, PRECO_DESDE_TEXTO, DESCONTO_ANUAL, SITE } from "@/lib/seo";
import { DEFINICAO, VERIFICADO, VERIFICADO_TEXTO, TEMAS, NAO_FAZ, PRECO_FRASE, CONCORRENTES, CONVECTA_GRELHA, AUTOR } from "./comum";

const ATUALIZADO = "2026-09-24";
const desconto = Math.round(DESCONTO_ANUAL * 100);

const FUNCIONALIDADES_LIGACOES = [
  { titulo: "Agenda online por barbeiro", caminho: "/agenda-online-barbearia", texto: "Vista do dia, notificações, sem sobreposições, lista de espera." },
  { titulo: "Marcações online 24/7", caminho: "/marcacoes-online-barbearia", texto: "Como o cliente marca em três toques, sem instalar nada." },
  { titulo: "Caixa, stock e relatórios", caminho: "/gestao-barbearia", texto: "Checkout, caixa do dia, produtos, fornecedores, Excel." },
  { titulo: "Clientes e cartão de fidelidade", caminho: "/gestao-clientes-barbearia", texto: "Histórico, aniversários, carimbos." },
  { titulo: "Comissões dos barbeiros", caminho: "/comissoes-barbeiros", texto: "Percentagem por profissional, calculada no checkout." },
  { titulo: "A app com o nome da barbearia", caminho: "/app-para-barbearia", texto: "Instalável no telemóvel, sem lojas de apps." },
];

const COMPARACOES_LIGACOES = [
  { titulo: "Convecta vs Fresha", caminho: "/comparar/fresha", texto: "Mensalidade fixa vs 20 % por cliente novo." },
  { titulo: "Convecta vs Treatwell", caminho: "/comparar/treatwell", texto: "Sem contrato vs 25 % e 12 meses." },
  { titulo: "Convecta vs Booksy", caminho: "/comparar/booksy", texto: "Site próprio vs marketplace com app." },
  { titulo: "Convecta vs BUK", caminho: "/comparar/buk", texto: "Feito só para barbearias vs plano grátis e SMS." },
  { titulo: "Convecta vs Zappy", caminho: "/comparar/zappy", texto: "Marcações e gestão vs faturação certificada." },
];

const lista = (itens) => ({ tipo: "ul", itens });
const p = (texto) => ({ tipo: "p", texto });
const h2 = (texto, id) => ({ tipo: "h2", texto, id });
const h3 = (texto) => ({ tipo: "h3", texto });

/* ───────────────────────────── Página-pilar ───────────────────────────── */
export const PILAR = {
  caminho: "/software-para-barbearias",
  titulo: "Software de marcações e gestão para barbearias",
  tituloSeo: "Software de marcações para barbearias em Portugal — Convecta",
  descricao: `Software de marcações online e gestão para barbearias em Portugal: site de marcações com o nome da barbearia, agenda por barbeiro, caixa, comissões, stock e cartão de fidelidade. Desde ${PRECO_DESDE_TEXTO}/mês, sem comissões.`,
  olho: "Software para barbearias",
  lead: DEFINICAO + " Feito em Portugal, em português de Portugal, para barbearias com um barbeiro ou com quinze.",
  atualizado: ATUALIZADO,
  software: true,
  blocos: [
    p("Um software de marcações para barbearia resolve um problema concreto: o telefone toca a meio do corte, o WhatsApp acumula pedidos às 23h, e a agenda de papel não avisa ninguém. Com a Convecta, os clientes marcam sozinhos pelo site da barbearia, o barbeiro recebe a notificação no telemóvel, e a agenda, a caixa e as comissões ficam no mesmo painel."),
    { tipo: "cta", texto: "Começar grátis", secundario: { caminho: "/precos", texto: "Ver os planos" } },
    h2("O que faz", "o-que-faz"),
    p("A plataforma é a mesma em todos os planos. O que muda entre planos é quantos profissionais cabem."),
    { tipo: "ligacoes", itens: FUNCIONALIDADES_LIGACOES },
    h3("Agenda e marcações"),
    lista([...TEMAS.agenda.slice(0, 4), ...TEMAS.marcacoes.slice(0, 3)]),
    h3("Caixa, comissões e stock"),
    lista([...TEMAS.gestao.slice(0, 5), TEMAS.comissoes[0], TEMAS.comissoes[1]]),
    h3("Clientes"),
    lista(TEMAS.clientes),
    h2("O que ainda não faz", "nao-faz"),
    p("Dizemo-lo antes de assinares, para não o descobrires depois."),
    lista(NAO_FAZ),
    h2("Para quem é", "para-quem"),
    { tipo: "tabela", cabecalho: ["Barbearia", "Plano", "Preço"], linhas: PLANOS.map((pl) => [pl.resumo.replace(/\.$/, ""), `${pl.nome} · ${pl.profissionaisTexto.toLowerCase()}`, `${pl.precoTexto}/mês, ou ${pl.precoMesAnualTexto}/mês no anual`]) },
    p(`Não há limite de marcações em nenhum plano, nem taxa de adesão. No anual pagas os doze meses de uma vez com ${desconto} % de desconto. Os preços completos, com o que inclui e o que não inclui, estão em [Preços](/precos).`),
    h2("Marketplace ou software próprio?", "marketplace"),
    p("Há duas famílias de ferramentas para barbearias. Os **marketplaces** (Fresha, Treatwell, Booksy) são montras: a barbearia fica listada ao lado das outras, e por cada cliente novo que chega pela montra a plataforma fica com uma percentagem — 20 % na Fresha e 25 % na Treatwell, segundo as páginas de preços deles a " + VERIFICADO_TEXTO + ". O **software próprio**, como a Convecta, é a agenda da tua barbearia: o site é teu, o cliente é teu, e pagas uma mensalidade fixa."),
    p("Nenhuma das duas é errada. Se a barbearia é nova e precisa de clientes de fora, uma montra ajuda. Se já tens clientes e o problema é organizá-los, pagar comissão por cada um deles é dinheiro que sai do corte. Explicamos as contas em [Marketplace ou agenda própria](/blog/marketplace-ou-agenda-propria)."),
    { tipo: "ligacoes", itens: COMPARACOES_LIGACOES },
    h2("Como funciona, do primeiro dia", "como-funciona"),
    { tipo: "ol", itens: [
      "Crias a barbearia em [convecta.pt/comecar](/comecar): nome, serviços, horários. O site nasce logo em a-tua-barbearia.marcacoes.app.",
      "Escolhes as cores, o logótipo e a capa no painel, e vês o resultado num telemóvel antes de publicar.",
      "Pões o link no Instagram, no Google e na resposta automática do WhatsApp.",
      "O cliente marca em três toques. O teu telemóvel toca. Confirmas com dois toques, ou deixas confirmar sozinho.",
      "No fim do corte fazes o checkout: serviço, produtos, método de pagamento. A caixa, a comissão do barbeiro e o stock ficam certos sozinhos.",
      "No fim do mês carregas num botão e sai o Excel para o contabilista.",
    ] },
    p("Montar a barbearia não exige cartão nenhum. Para começares a receber marcações registas o cartão e tens 7 dias à experiência, sem seres cobrado — se cancelares até lá, não pagas nada. Vê o passo a passo em [Como funciona](/como-funciona)."),
    h2("Perguntas frequentes", "faq"),
    { tipo: "faq", itens: [
      { q: "Qual é o melhor software de marcações para barbearia em Portugal?", a: "Depende do que precisas. Se queres clientes novos de uma montra e não te importas de pagar comissão, um marketplace (Fresha, Treatwell, Booksy). Se queres o teu próprio site de marcações e gestão da barbearia com mensalidade fixa e sem comissões, a Convecta é feita para isso. Fizemos uma lista honesta, com a Convecta na mesma grelha que os outros, em [Melhores softwares de marcações para barbearias em Portugal](/blog/melhores-softwares-marcacoes-barbearias-portugal)." },
      { q: "Há software de marcações grátis para barbearia?", a: "Há planos grátis noutros programas (BUK e EasyWeek tinham, a " + VERIFICADO_TEXTO + "), normalmente limitados a um colaborador ou a poucas marcações. A Convecta não tem plano grátis: montar a barbearia não exige cartão e, quando registas o cartão para receberes marcações, tens 7 dias à experiência sem seres cobrado, e depois " + PRECO_DESDE_TEXTO + "/mês no plano de entrada, com tudo incluído." },
      { q: "Os clientes precisam de instalar alguma app?", a: "Não. Marcam pelo site da barbearia no browser do telemóvel. Se quiserem, guardam-no no ecrã principal e fica lá como uma app, com o teu nome e logótipo. Criam conta uma vez, com o email, para verem as marcações e receberem os avisos." },
      { q: "A Convecta manda lembretes por SMS ou WhatsApp?", a: "Não. Os avisos ao cliente — marcação confirmada, cancelada, e o aviso antes do corte — vão por notificação no telemóvel e por email, sem custo por mensagem. SMS e WhatsApp não existem na Convecta hoje." },
      { q: "Serve para uma barbearia com vários barbeiros?", a: "Sim. Cada barbeiro tem a coluna dele na agenda, o horário dele e a comissão dele. Pode entrar no painel com a conta dele e ver a agenda, os clientes e a conta de comissões dele — sem ver o financeiro da casa. O dono escolhe se ele vê a agenda toda ou só a coluna dele." },
      { q: "Preciso de faturação certificada no mesmo programa?", a: "A Convecta não fatura: dá-te o Excel mensal com tudo o que foi cobrado, por método de pagamento e por barbeiro, e a fatura passa-se no programa de faturação que já usas. Se precisas de faturar dentro do mesmo programa, o Zappy faz isso; comparamos os dois em [Convecta vs Zappy](/comparar/zappy)." },
      { q: "Onde ficam os dados?", a: "Na União Europeia, numa base de dados isolada por barbearia: uma barbearia nunca vê os dados de outra. A Convecta é responsável pelo tratamento nos termos do RGPD e assina um acordo de subcontratação com cada barbearia ([ver o acordo](/acordo-rgpd))." },
    ] },
    h2("Quem faz a Convecta", "quem"),
    p(`A Convecta é feita por ${SITE.titular}, em Alfena, no concelho de Valongo, distrito do Porto. Visita as barbearias, configura o sistema com o dono e dá suporte por telefone e WhatsApp em dias úteis. Mais em [Sobre a Convecta](/sobre).`),
  ],
  fecho: { titulo: "Experimenta na tua barbearia. 7 dias à experiência, sem comissões." },
};

/* ───────────────────────────── Sobre ───────────────────────────── */
export const SOBRE = {
  caminho: "/sobre",
  titulo: "Sobre a Convecta",
  tituloSeo: "Sobre a Convecta — quem faz o software de marcações para barbearias",
  descricao: "A Convecta é um software de marcações e gestão para barbearias, feito em Alfena (Valongo, Porto) por Diogo Tavares. Quem somos, onde estamos, como trabalhamos e os dados legais.",
  olho: "Quem somos",
  lead: "Marcações online e gestão para barbearias, feito no Porto por quem vai às barbearias.",
  atualizado: ATUALIZADO,
  tipo: "sobre",
  blocos: [
    p(DEFINICAO),
    h2("O que é a Convecta Booking"),
    p("Duas faces do mesmo sistema. Para o cliente da barbearia, um site de marcações com o nome, o logótipo e as cores da barbearia, que se guarda no telemóvel como uma app. Para o dono e os barbeiros, um painel com a agenda, os clientes, a caixa, as comissões, o stock, os relatórios e o cartão de fidelidade. O cliente nunca vê a marca Convecta: vê a barbearia."),
    { tipo: "tabela", cabecalho: ["Ficha", ""], linhas: [
      ["Produto", "Convecta Booking — software de marcações online e gestão para barbearias"],
      ["Para quem", "Barbearias em Portugal, de 1 a 15 profissionais"],
      ["Onde corre", "No browser, em telemóvel, tablet e computador; o site do cliente instala-se no ecrã principal (PWA)"],
      ["Preço", PRECO_FRASE],
      ["Idioma", "Português de Portugal"],
      ["Dados", "Guardados na União Europeia, isolados por barbearia, com acordo de subcontratação RGPD"],
      ["Suporte", "Telefone e WhatsApp em dias úteis; visita à barbearia para configurar, no Grande Porto"],
      ["Responsável", `${SITE.titular}, empresário em nome individual, NIF ${SITE.nif}`],
      ["Morada", `${SITE.morada.rua}, ${SITE.morada.codigoPostal} ${SITE.morada.cidade}, Portugal`],
      ["Contacto", `${SITE.email} · ${SITE.telefone}`],
    ] },
    h2("Quem faz"),
    p(`A Convecta é feita por ${SITE.titular} (Diogo Tavares), de Alfena, concelho de Valongo. Não é uma empresa de software com dezenas de pessoas: é uma pessoa que vai às barbearias, ouve o que trava o dia de um barbeiro, e constrói o sistema à volta disso. É por isso que a Convecta faz menos coisas do que os programas genéricos — e faz as que uma barbearia usa todos os dias.`),
    h2("Como trabalhamos"),
    lista([
      "**Só vendemos o que existe.** A lista do que a app faz, e do que ainda não faz, está pública em [Funcionalidades](/funcionalidades). Se uma coisa não grava no painel, não está no site.",
      "**Sem comissões.** A Convecta ganha a mensalidade e mais nada. Cada marcação e cada cliente são da barbearia.",
      "**Sem testemunhos inventados.** Quando houver avaliações de barbearias reais, aparecem com nome, barbearia e cidade, e só com autorização escrita.",
      "**Perto.** Configuramos o sistema na barbearia, com o dono, e o suporte é por telefone e WhatsApp — não por um formulário que responde em 5 dias.",
    ]),
    h2("Onde nos encontras"),
    lista([
      `Instagram: [${SITE.instagramHandle}](${SITE.instagram})`,
      `Email: [${SITE.email}](mailto:${SITE.email})`,
      `Telefone e WhatsApp: [${SITE.telefone}](tel:${SITE.telefoneE164})`,
      "Ou pela [página de contacto](/contacto).",
    ]),
    { tipo: "aviso", titulo: "Nota", texto: "Há outras empresas chamadas Convecta noutros países e noutros setores (imobiliário, engenharia). Esta é a Convecta de marcações para barbearias, em Portugal, em convecta.pt." },
  ],
};

/* ─────────────────────── Páginas de funcionalidade ─────────────────────── */
const funcionalidade = ({ caminho, titulo, tituloSeo, descricao, olho, lead, blocos, faq }) => ({
  caminho, titulo, tituloSeo, descricao, olho, lead, atualizado: ATUALIZADO,
  migalhas: [{ nome: "Software para barbearias", caminho: "/software-para-barbearias" }],
  blocos: [
    ...blocos,
    h2("Perguntas frequentes"),
    { tipo: "faq", itens: faq },
    h2("Tudo o resto que a Convecta faz"),
    { tipo: "ligacoes", itens: FUNCIONALIDADES_LIGACOES.filter((l) => l.caminho !== caminho) },
    p(`Tudo incluído em todos os planos, desde ${PRECO_DESDE_TEXTO}/mês. A visão completa está em [Software para barbearias](/software-para-barbearias) e a lista, sem exageros, em [Funcionalidades](/funcionalidades).`),
  ],
});

export const AGENDA = funcionalidade({
  caminho: "/agenda-online-barbearia",
  titulo: "Agenda online para barbearias",
  tituloSeo: "Agenda online para barbearias — por barbeiro, sem sobreposições",
  descricao: "Agenda online para barbearia com uma coluna por barbeiro, notificação a cada marcação, confirmação em dois toques, bloqueio de horas e lista de espera. Sem marcações sobrepostas.",
  olho: "Agenda",
  lead: "Uma coluna por barbeiro, o telemóvel a tocar a cada marcação, e a garantia de que duas pessoas nunca ficam com a mesma hora.",
  blocos: [
    p("A agenda é o coração de uma barbearia, e é onde o papel e o WhatsApp falham mais: uma hora dada duas vezes, um cliente que marcou por mensagem e ninguém apontou, um barbeiro que não sabe o que tem à tarde. A agenda da Convecta existe para isso não acontecer."),
    h2("O que a agenda faz"),
    lista(TEMAS.agenda),
    h2("Como é o dia de um barbeiro com a agenda"),
    p("De manhã abre o painel no telemóvel e vê a coluna dele: quem vem, a que horas, que serviço. Quando entra uma marcação nova, o telemóvel toca — nome, serviço, hora — e ele confirma com dois toques, ou já está confirmada se a barbearia ligou a confirmação automática. Se precisa de uma hora para almoçar, bloqueia-a; o site deixa de a mostrar aos clientes. No fim de cada corte, faz o checkout ali mesmo, e a comissão dele fica calculada."),
    p("Se a barbearia tem vários barbeiros, o dono escolhe o que cada um vê: só a coluna dele, ou a agenda toda (mas só mexe na dele). O dono vê e mexe em tudo."),
    h2("Sem marcações sobrepostas, a sério"),
    p("Muitos programas impedem sobreposições com uma regra no ecrã — e falham quando dois clientes carregam ao mesmo tempo. Na Convecta a regra está na base de dados: se dois clientes tentarem a mesma hora com o mesmo barbeiro no mesmo segundo, só um fica com ela; o outro é avisado na hora e escolhe outra."),
    h2("Lista de espera"),
    p("Quando a hora que o cliente quer já está ocupada, pode pedir para ser avisado se vagar. Se alguém cancelar, o primeiro da lista recebe uma notificação e tem uma hora para confirmar; se não confirmar, passa ao seguinte. Se ninguém está à espera e a vaga é para as próximas 24 horas, a barbearia pode avisar todos os clientes: «vaga de última hora». Uma hora vazia é a única coisa que uma barbearia não recupera."),
    { tipo: "cta", texto: "Experimentar a agenda", secundario: { caminho: "/como-funciona", texto: "Ver como funciona" } },
  ],
  faq: [
    { q: "Cada barbeiro pode ver só a agenda dele?", a: "Sim. Cada barbeiro entra com a conta dele e o dono escolhe se ele vê só a coluna dele ou a agenda toda. Em qualquer dos casos só marca, bloqueia e cobra na coluna dele." },
    { q: "Posso marcar à mão para um cliente que liga?", a: "Sim. Na agenda, tocas na hora e escolhes «Nova marcação» ou «Bloquear». A marcação manual fica igual às outras: o cliente recebe o aviso, e entra no histórico dele." },
    { q: "E se um cliente cancelar?", a: "A hora fica logo livre, o barbeiro recebe aviso, e se havia alguém na lista de espera para essa hora, é avisado. O cliente só pode cancelar sozinho até ao prazo que a barbearia definir." },
    { q: "A agenda funciona no telemóvel?", a: "Sim, e é onde os barbeiros mais a usam. No telemóvel abre na coluna do barbeiro; no computador vê-se a grelha com todos." },
  ],
});

export const MARCACOES = funcionalidade({
  caminho: "/marcacoes-online-barbearia",
  titulo: "Marcações online para barbearias",
  tituloSeo: "Marcações online para barbearias — site próprio, três toques, sem app",
  descricao: "Marcações online 24/7 pelo site da tua barbearia, com o teu nome e cores: o cliente escolhe serviço, barbeiro e hora em três toques, sem instalar nada, e recebe os avisos no telemóvel.",
  olho: "Marcações online",
  lead: "O cliente marca às 23h, no sofá, em três toques. Tu ficas a saber de manhã — ou nesse segundo, se o telemóvel estiver ligado.",
  blocos: [
    p("Receber marcações online é a diferença entre atender o telefone a meio de um corte e cortar em paz. Com a Convecta cada barbearia tem o seu site de marcações, com endereço próprio, e o cliente marca sozinho a qualquer hora."),
    h2("Como o cliente marca"),
    { tipo: "ol", itens: [
      "Abre o link da barbearia (no Instagram, no Google, no WhatsApp, ou no ecrã principal do telemóvel, se o guardou).",
      "Escolhe o serviço, o barbeiro e a hora. Só vê horas livres.",
      "Confirma. Recebe o aviso no telemóvel quando a barbearia confirma, e outro antes do corte.",
    ] },
    lista(TEMAS.marcacoes),
    h2("Sem app para instalar, mas com app no telemóvel"),
    p("O cliente não tem de ir a nenhuma loja. O site da barbearia abre no browser e, se ele quiser, guarda-o no ecrã principal: fica lá com o teu logótipo, abre em ecrã inteiro e recebe notificações, como uma app. Para ti é melhor do que uma app nas lojas: não há aprovações, não há atualizações que o cliente tem de fazer, e não há uma app «da Convecta» — é a app da tua barbearia. Mais em [A app com o nome da barbearia](/app-para-barbearia)."),
    h2("Avisos antes do corte, sem custo por mensagem"),
    p("O cliente recebe uma notificação no telemóvel e um email antes da marcação. Não custa nada por mensagem — ao contrário dos lembretes por SMS ou WhatsApp, que noutros programas se pagam à unidade. A Convecta não envia SMS nem WhatsApp; explicamos as diferenças e os custos em [Como reduzir as faltas às marcações](/blog/como-reduzir-faltas-marcacoes-barbearia)."),
    h2("Onde pôr o link"),
    lista([
      "No Instagram: no link da bio e no botão «Reservar» do perfil de empresa.",
      "No Google: no perfil da barbearia, como link de marcações.",
      "No WhatsApp: na resposta automática e na mensagem de ausência («Marca aqui: …»).",
      "No balcão: um QR code impresso.",
    ]),
    { tipo: "cta", texto: "Criar o site da minha barbearia", secundario: { caminho: "/precos", texto: "Ver os planos" } },
  ],
  faq: [
    { q: "O cliente tem de criar conta?", a: "Sim, uma vez, com o email: é o que permite ver as marcações, cancelar dentro do prazo e receber os avisos. Depois marca em segundos." },
    { q: "Posso limitar com quanta antecedência se marca?", a: "Sim. Nas definições escolhes a antecedência mínima, o intervalo entre marcações e o prazo até ao qual o cliente pode cancelar sozinho." },
    { q: "A confirmação é automática?", a: "Como quiseres. Podes confirmar cada marcação com dois toques, ou ligar a confirmação automática e a marcação entra confirmada." },
    { q: "Posso ter o meu próprio domínio?", a: "O endereço incluído é a-tua-barbearia.marcacoes.app. Um domínio próprio não está incluído." },
  ],
});

export const GESTAO = funcionalidade({
  caminho: "/gestao-barbearia",
  titulo: "Software de gestão para barbearias: caixa, stock e relatórios",
  tituloSeo: "Software de gestão para barbearias — caixa, stock, relatórios e Excel",
  descricao: "Programa de gestão para barbearia: checkout com produtos, caixa do dia, stock e fornecedores, relatórios por barbeiro e serviço, e Excel mensal para o contabilista. Incluído em todos os planos.",
  olho: "Gestão",
  lead: "O checkout no fim de cada corte deixa a caixa, o stock e as comissões certos. No fim do mês, um botão dá o Excel ao contabilista.",
  blocos: [
    p("Gerir uma barbearia não é só marcar cortes: é saber quanto entrou hoje, por que método, quanto cabe a cada barbeiro, que produtos estão a acabar, e o que entregar ao contabilista. A Convecta faz isso a partir de um gesto que o barbeiro já faz: fechar a conta no fim do corte."),
    h2("O que a gestão inclui"),
    lista(TEMAS.gestao),
    h2("O checkout"),
    p("Quando o cliente acaba, o barbeiro confirma a presença e fecha a conta: o serviço, os produtos que o cliente levou (uma cera, uma lâmina), o método de pagamento (dinheiro, MB WAY, cartão — o que a barbearia aceitar), um desconto se houver, uma gorjeta se houver. O total aparece antes de fechar. Nesse momento a caixa do dia sobe, o stock desce e a comissão do barbeiro fica calculada. Não há nada para apontar depois."),
    h2("A caixa do dia"),
    p("Abres a caixa de manhã e fechas à noite. Entre uma e outra, todas as entradas (checkouts) e saídas (uma compra de produto, um troco) ficam registadas, com histórico. O fecho diz o que devia haver na gaveta por método de pagamento."),
    h2("Stock e fornecedores"),
    p("Cada produto tem stock, stock mínimo e fornecedor. Quando vendes no checkout, sai um. Quando recebes encomenda, registas a entrada. Os movimentos ficam todos guardados, e vês de relance o que está abaixo do mínimo."),
    h2("O Excel para o contabilista"),
    p("Escolhes o mês e carregas num botão. Sai um ficheiro com o resumo (total, por método de pagamento, por barbeiro, por serviço) e todos os serviços prestados, linha a linha. É o que o contabilista pede; deixa de ser uma tarde a somar talões."),
    { tipo: "aviso", titulo: "O que não faz", texto: "A Convecta não emite faturas certificadas: a fatura passa-se no teu programa de faturação, com os números do Excel. Também não há pagamentos online pelo cliente — paga na barbearia, como sempre." },
    { tipo: "cta", texto: "Começar grátis", secundario: { caminho: "/comissoes-barbeiros", texto: "Ver as comissões" } },
  ],
  faq: [
    { q: "Consigo ver quanto faturou cada barbeiro?", a: "Sim: no relatório de profissionais e na conta-corrente de cada um, por período, por serviço e por produto." },
    { q: "Os barbeiros veem a caixa?", a: "Não. Um barbeiro com acesso ao painel vê a agenda, os clientes e a conta de comissões dele. O financeiro, a caixa, o stock e as definições são só do dono." },
    { q: "Dá para registar uma despesa?", a: "Sim, como saída de caixa, com descrição e método." },
    { q: "Substitui o programa de faturação?", a: "Não. A Convecta gere a barbearia e dá-te o Excel; as faturas continuam a ser passadas no programa certificado que já usas." },
  ],
});

export const CLIENTES = funcionalidade({
  caminho: "/gestao-clientes-barbearia",
  titulo: "Gestão de clientes e cartão de fidelidade para barbearias",
  tituloSeo: "Gestão de clientes para barbearias — histórico, aniversários e cartão de fidelidade",
  descricao: "Ficha de cliente com histórico de cortes, gastos e carimbos, aniversários, e cartão de fidelidade digital com corte grátis. Cada cliente que marca fica na tua base de dados, não na de um marketplace.",
  olho: "Clientes",
  lead: "Cada cliente que marca fica na tua base de dados, com o histórico, os gastos e os carimbos. Teu, não de um marketplace.",
  blocos: [
    p("Num marketplace o cliente é da plataforma: vê a tua barbearia ao lado das outras e a plataforma sabe mais dele do que tu. Na Convecta o cliente cria conta no site da tua barbearia, e a ficha dele é tua."),
    h2("O que fica na ficha"),
    lista(TEMAS.clientes),
    h2("O cartão de fidelidade digital"),
    p("Escolhes quantos carimbos dão um corte grátis e durante quanto tempo valem. A cada checkout o carimbo entra sozinho. O cliente vê os carimbos dele no site da barbearia; tu vês quem está perto do corte grátis. Sem cartões de papel que se perdem na carteira."),
    h2("Aniversários"),
    p("A lista de aniversários do mês está no painel. O que fazes com ela é contigo: uma mensagem, um desconto no corte, nada. A Convecta não manda campanhas em teu nome."),
    h2("Histórico e gastos"),
    p("Cada corte, cada produto, cada método de pagamento fica na ficha. Quando um cliente volta ao fim de três meses, sabes o que fez da última vez e quanto costuma gastar. O relatório de clientes diz quem vem mais e quanto gasta cada um."),
    { tipo: "cta", texto: "Começar grátis", secundario: { caminho: "/marcacoes-online-barbearia", texto: "Ver as marcações online" } },
  ],
  faq: [
    { q: "Posso importar os clientes que já tenho?", a: "Os clientes entram quando criam conta para marcar. Não há hoje uma importação em massa a partir de um ficheiro — se tens uma lista grande, fala connosco e vemos caso a caso." },
    { q: "O cliente vê os carimbos dele?", a: "Sim, no site da barbearia, na área dele." },
    { q: "A Convecta manda mensagens de aniversário ou campanhas?", a: "Não. A Convecta avisa o cliente das marcações dele (confirmada, cancelada, antes do corte). Campanhas e mensagens de marketing não fazem parte da app." },
    { q: "Os dados dos clientes estão protegidos?", a: "Sim. Ficam na União Europeia, isolados por barbearia, e a Convecta assina um acordo de subcontratação RGPD com cada barbearia. Vê a [Política de Privacidade](/privacidade) e o [acordo](/acordo-rgpd)." },
  ],
});

export const COMISSOES = funcionalidade({
  caminho: "/comissoes-barbeiros",
  titulo: "Comissões dos barbeiros: como funcionam na Convecta",
  tituloSeo: "Comissões dos barbeiros — percentagem por profissional, calculada no checkout",
  descricao: "Comissão em percentagem por barbeiro, calculada e guardada no momento do checkout, com conta-corrente por profissional. Cada barbeiro vê a conta dele; o dono vê todas.",
  olho: "Comissões",
  lead: "Defines a percentagem de cada barbeiro uma vez. A partir daí, cada checkout calcula e guarda o que lhe cabe.",
  blocos: [
    p("As contas das comissões são a conversa mais chata do mês numa barbearia: o barbeiro tem uma folha, o dono tem outra, e nunca batem certo. Na Convecta a comissão nasce no checkout, no momento em que o cliente paga, e fica guardada. Não há folha."),
    h2("Como funciona"),
    lista(TEMAS.comissoes),
    h2("Um exemplo"),
    p("O Rui tem 40 % de comissão. Faz um corte de 15 € e o cliente leva uma cera de 12 €. No checkout, a Convecta guarda 27 € de venda, 6 € de comissão do Rui sobre o corte, e tira a cera do stock. No fim do mês, a conta-corrente do Rui diz quanto fez, quanto lhe cabe e quanto já foi pago. O Rui vê a conta dele no painel; o dono vê a de todos."),
    h2("Cada barbeiro com a conta dele"),
    p("O dono dá acesso ao painel a cada barbeiro, com o email dele. O barbeiro entra e vê a agenda, os clientes e «A minha conta»: as comissões dele, por período. Não vê a caixa, o financeiro da casa, nem as comissões dos colegas. O dono escolhe ainda se ele vê a agenda toda ou só a coluna dele. É a mesma regra na base de dados, não só no ecrã."),
    p("Para calcular o que uma percentagem vale para o dono e para o barbeiro ao fim do mês, vê [Como calcular e pagar comissões aos barbeiros](/blog/como-calcular-comissoes-barbeiros)."),
    { tipo: "cta", texto: "Começar grátis", secundario: { caminho: "/gestao-barbearia", texto: "Ver a caixa e o stock" } },
  ],
  faq: [
    { q: "A comissão pode ser diferente por serviço?", a: "A comissão é uma percentagem por barbeiro, aplicada aos serviços. Não há hoje uma percentagem diferente por serviço." },
    { q: "E se um barbeiro é a renda de cadeira, não comissão?", a: "Podes pôr a comissão a 100 % e usar a conta-corrente para registar o que ele te paga. Não há hoje um modo próprio de «renda de cadeira»." },
    { q: "O barbeiro vê a comissão dos colegas?", a: "Não. Cada barbeiro vê só a conta dele." },
    { q: "Posso corrigir um checkout errado?", a: "O dono pode. Um barbeiro com acesso próprio pode registar, mas não corrigir nem apagar movimentos de caixa." },
  ],
});

export const APP = funcionalidade({
  caminho: "/app-para-barbearia",
  titulo: "Uma app com o nome da tua barbearia",
  tituloSeo: "App para barbearia com o teu nome — sem App Store, instalável no telemóvel",
  descricao: "Uma app de marcações com o nome, o logótipo e as cores da tua barbearia, que o cliente instala a partir do browser, sem lojas de apps. Tu escolhes o design no painel e vês o resultado antes de publicar.",
  olho: "A app",
  lead: "Não é a app da Convecta com o teu nome escrito em cima. É a app da tua barbearia — e o cliente instala-a a partir do browser, sem lojas.",
  blocos: [
    p("Uma app nas lojas custa milhares de euros, demora meses e depois precisa de aprovações e atualizações. Uma app «de marcações» genérica, com o nome da barbearia num canto, é a app da plataforma — e o cliente sabe. A Convecta faz a terceira coisa: um site que se instala como app, com o teu design, e que só tem a tua barbearia lá dentro."),
    h2("O que o cliente vê"),
    lista(TEMAS.app),
    h2("Tu escolhes o design"),
    p("No painel há um editor: cores, tipografia, logótipo, capa, galeria, o que aparece e o que não aparece. Mudas, vês o resultado num telemóvel desenhado no ecrã, e publicas quando gostares. Não precisas de um designer nem de nos pedir nada. O editor está em todos os planos — não é um extra do plano de cima."),
    { tipo: "imagem", src: "/provas/personalizacao.jpg", alt: "Editor de design no painel da Convecta, com a pré-visualização do site da barbearia num telemóvel", largura: 1200, altura: 800, legenda: "O editor de design no painel: mudas as cores e vês o site do cliente a mudar ao lado." },
    h2("Como se instala"),
    p("O cliente abre o site da barbearia no telemóvel e escolhe «Adicionar ao ecrã principal» (no iPhone, pelo botão de partilha; no Android, o próprio browser sugere). A partir daí abre em ecrã inteiro, com o teu ícone, e recebe notificações. É uma PWA — a mesma tecnologia que muitas apps grandes usam — e funciona em iPhone e Android."),
    { tipo: "imagem", src: "/provas/instalada.jpg", alt: "O site de uma barbearia instalado no ecrã principal de um telemóvel, com o logótipo da barbearia", largura: 1200, altura: 800, legenda: "Instalada no ecrã principal, com o logótipo da barbearia." },
    { tipo: "cta", texto: "Criar a app da minha barbearia", secundario: { caminho: "/precos", texto: "Ver os planos" } },
  ],
  faq: [
    { q: "Está na App Store ou no Google Play?", a: "Não, de propósito. Instala-se a partir do browser, sem lojas: não há aprovações, comissões das lojas nem atualizações que o cliente tenha de fazer. Funciona em iPhone e Android." },
    { q: "O cliente vê a marca Convecta?", a: "Não. Vê o nome, o logótipo e as cores da barbearia. A Convecta aparece só numa linha discreta no rodapé, «Marcações com Convecta»." },
    { q: "Posso mudar as cores depois?", a: "Sempre que quiseres, no painel, e vês o resultado antes de publicar." },
    { q: "Preciso de um domínio?", a: "Não. O endereço incluído é a-tua-barbearia.marcacoes.app." },
  ],
});

/* ─────────────────────────── Comparações ─────────────────────────── */
const comparacao = ({ chave, caminho, descricao, lead, intro, quando, tabela, faq }) => {
  const c = CONCORRENTES[chave];
  return {
    caminho,
    titulo: `Convecta vs ${c.nome}`,
    tituloSeo: `Convecta vs ${c.nome} — comparação para barbearias em Portugal (${VERIFICADO.slice(0, 4)})`,
    descricao,
    olho: "Comparação",
    lead,
    atualizado: ATUALIZADO,
    tipo: "artigo",
    autor: AUTOR,
    migalhas: [{ nome: "Software para barbearias", caminho: "/software-para-barbearias" }],
    blocos: [
      { tipo: "aviso", titulo: "Como foi feita", texto: `Escrita pela Convecta. Tudo o que dizemos sobre a ${c.nome} vem da página oficial deles ([${c.nome}](${c.url})${c.precos ? `, [preços](${c.precos})` : ""}), verificada a ${VERIFICADO_TEXTO}. Os preços mudam: confirma lá antes de decidir. Não classificamos, não damos estrelas; mostramos onde cada um é melhor.` },
      p(intro),
      h2(`O que é a ${c.nome}`),
      p(c.resumo),
      lista(c.factos),
      h2("O que é a Convecta"),
      p(CONVECTA_GRELHA.resumo),
      lista(CONVECTA_GRELHA.factos),
      h2("Lado a lado"),
      { tipo: "tabela", cabecalho: ["", c.nome, "Convecta"], linhas: tabela, legenda: `Verificado a ${VERIFICADO_TEXTO}. Fonte: páginas oficiais.` },
      h2(`Quando a ${c.nome} é melhor`),
      p(c.melhor),
      h2("Quando a Convecta é melhor"),
      p(quando),
      h2("Perguntas frequentes"),
      { tipo: "faq", itens: faq },
      h2("Outras comparações"),
      { tipo: "ligacoes", itens: COMPARACOES_LIGACOES.filter((l) => l.caminho !== caminho) },
      p("A visão completa do que a Convecta faz está em [Software para barbearias](/software-para-barbearias); os planos em [Preços](/precos)."),
    ],
    fecho: { titulo: "Sem comissões. Sem fidelização no mensal. 7 dias à experiência." },
  };
};

export const VS_FRESHA = comparacao({
  chave: "fresha",
  caminho: "/comparar/fresha",
  descricao: "Convecta ou Fresha para a tua barbearia? Mensalidade fixa sem comissões vs marketplace com 20 % por cliente novo. Preços, o que inclui e onde cada um é melhor, verificado a 24 set 2026.",
  lead: "A Fresha é um marketplace: traz clientes e fica com 20 % de cada cliente novo. A Convecta é a agenda da tua barbearia: mensalidade fixa e zero comissões. As contas mudam conforme o que precisas.",
  intro: "Muitos barbeiros começam na Fresha porque é «grátis» e traz clientes. Vale a pena fazer as contas: por cada cliente novo que chega pelo marketplace, 20 % do serviço fica na Fresha — num corte de 15 €, 3 €. Se recebes 30 clientes novos por mês pela montra, são 90 € por mês; e o cliente continua a ver as outras barbearias ao lado da tua.",
  quando: "Quando já tens clientes e o que te falta é organizá-los: queres o teu próprio site, com o teu nome, sem que o cliente veja concorrentes ao lado, e uma mensalidade que não cresce com o movimento. Queres a caixa, as comissões dos barbeiros e o stock no mesmo sítio, e um Excel para o contabilista. E queres alguém que vai à barbearia configurar e responde ao telefone.",
  tabela: [
    ["Modelo", "Marketplace + software", "Software próprio da barbearia"],
    ["Comissão por cliente novo", "20 % (marketplace)", "0 %"],
    ["Mensalidade", "Plano pago desde 19,95 US$/mês", `Desde ${PRECO_DESDE_TEXTO}/mês`],
    ["Site com o nome da barbearia", "Perfil na Fresha", true],
    ["Cliente vê outras barbearias", true, false],
    ["Lembretes", "SMS e WhatsApp pagos por mensagem", "Notificação e email, sem custo"],
    ["Pagamentos online", true, false],
    ["Caixa, comissões, stock", true, true],
    ["Excel para o contabilista", null, true],
    ["Suporte", "Online", "Telefone e WhatsApp, visita à barbearia (Grande Porto)"],
    ["Contrato", "Sem contrato", "Sem contrato no mensal"],
  ],
  faq: [
    { q: "Posso ter a Convecta e continuar na Fresha?", a: "Podes, mas terias duas agendas. O mais comum é usar a Fresha só como montra e a Convecta como agenda, ou sair da Fresha quando os clientes já marcam no teu site." },
    { q: "A Fresha é mesmo grátis?", a: "O plano base não tem mensalidade, mas cobra 20 % por cliente novo vindo do marketplace, e os lembretes por WhatsApp e SMS pagam-se por mensagem (página de preços, " + VERIFICADO_TEXTO + "). Há também um plano pago." },
    { q: "Como passo os meus clientes da Fresha para a Convecta?", a: "Os clientes criam conta no site da tua barbearia na primeira marcação. Pões o link no Instagram, no Google e no WhatsApp, e nas primeiras semanas dizes-lhes ao balcão. Vê [Como mudar de agenda sem perder clientes](/blog/marketplace-ou-agenda-propria)." },
  ],
});

export const VS_TREATWELL = comparacao({
  chave: "treatwell",
  caminho: "/comparar/treatwell",
  descricao: "Convecta ou Treatwell para a tua barbearia? 25 % por cliente novo, 2 % nos pagamentos online e contrato de 12 meses vs mensalidade fixa sem comissões nem contrato. Verificado a 24 set 2026.",
  lead: "A Treatwell traz clientes da montra e cobra 25 % por cada um deles, com contrato de 12 meses. A Convecta cobra uma mensalidade fixa, sem comissões, e cancelas quando quiseres.",
  intro: "A Treatwell é conhecida dos clientes finais em Portugal, e isso tem valor para uma barbearia nova. Tem também um preço: 25 % por cliente novo, 2 % sobre pagamentos online e um contrato de 12 meses, segundo a página de preços deles. Para uma barbearia com clientela feita, esse preço paga-se por clientes que já eram teus.",
  quando: "Quando a tua clientela já existe e queres que marque sozinha, no teu site, sem comissão e sem contrato de um ano. Quando queres gerir a barbearia — caixa, comissões, stock — e não só receber marcações.",
  tabela: [
    ["Modelo", "Marketplace + software", "Software próprio da barbearia"],
    ["Comissão por cliente novo", "25 %", "0 %"],
    ["Pagamentos online", "Sim, 2 % por pagamento", "Não"],
    ["Contrato", "12 meses", "Sem contrato no mensal"],
    ["Site com o nome da barbearia", "Perfil na Treatwell", true],
    ["Lembretes", "SMS", "Notificação e email, sem custo"],
    ["Caixa, comissões, stock", null, true],
    ["Excel para o contabilista", null, true],
    ["Suporte", "Online", "Telefone e WhatsApp, visita à barbearia (Grande Porto)"],
  ],
  faq: [
    { q: "Vale a pena estar na Treatwell?", a: "Se precisas de clientes novos e a comissão cabe na tua margem, pode valer. Faz as contas: 25 % de um corte de 15 € são 3,75 € por cliente novo. Com a Convecta, o mesmo corte é 100 % teu, mas a Convecta não traz o cliente — traz o teu cliente para marcar sozinho." },
    { q: "A Convecta tem contrato?", a: "No plano mensal não: cancelas quando quiseres, no painel. Se escolheres pagar o ano de uma vez para ter o desconto, aí sim, o compromisso é de doze meses." },
  ],
});

export const VS_BOOKSY = comparacao({
  chave: "booksy",
  caminho: "/comparar/booksy",
  descricao: "Convecta ou Booksy para a tua barbearia? Marketplace com app própria para o cliente vs site de marcações com o nome da barbearia e mensalidade fixa. O que muda para o barbeiro e para o cliente.",
  lead: "A Booksy é um marketplace com uma app que muitos clientes já têm no telemóvel. A Convecta é o site da tua barbearia, com o teu nome, que se instala como app. São duas ideias diferentes de quem é o cliente.",
  intro: "A Booksy é das apps de marcações mais usadas por barbearias, e muitos clientes já a têm instalada. A pergunta é de quem é o cliente: na Booksy ele abre a app da Booksy e vê a tua barbearia ao lado das outras; na Convecta abre a app da tua barbearia, onde só existes tu. Não conseguimos verificar um preço público da Booksy para Portugal a " + VERIFICADO_TEXTO + ", por isso não o comparamos aqui.",
  quando: "Quando queres que o cliente marque na tua app, com o teu nome, e não numa montra onde vê a concorrência. Quando queres um preço fixo e público, gestão da barbearia no mesmo painel, e suporte por telefone.",
  tabela: [
    ["Modelo", "Marketplace + app", "Software próprio da barbearia"],
    ["App para o cliente", "App Booksy (lojas)", "Site da barbearia instalável (sem lojas), com o teu nome"],
    ["Cliente vê outras barbearias", true, false],
    ["Preço", "Não verificado para Portugal", `Desde ${PRECO_DESDE_TEXTO}/mês, público`],
    ["Comissão por cliente novo", "Depende do plano; confirma no site deles", "0 %"],
    ["Lembretes", "SMS", "Notificação e email, sem custo"],
    ["Caixa, comissões, stock", "Parcial; confirma no site deles", true],
    ["Excel para o contabilista", null, true],
    ["Suporte", "Online", "Telefone e WhatsApp, visita à barbearia (Grande Porto)"],
  ],
  faq: [
    { q: "Os meus clientes vão querer instalar outra app?", a: "Não precisam de instalar nada de uma loja: abrem o link da barbearia e, se quiserem, guardam-no no ecrã principal. Fica lá com o teu logótipo." },
    { q: "Perco os clientes que me chegavam pela Booksy?", a: "Os que te encontram na montra da Booksy podem deixar de te encontrar lá. Os que já são teus marcam no teu site. Podes manter os dois durante uma transição, mas com duas agendas." },
  ],
});

export const VS_BUK = comparacao({
  chave: "buk",
  caminho: "/comparar/buk",
  descricao: "Convecta ou BUK para a tua barbearia? Dois softwares portugueses: a BUK com plano grátis, SMS e pagamentos por MB WAY; a Convecta feita só para barbearias, com caixa, comissões, stock e app com o teu nome. Verificado a 24 set 2026.",
  lead: "Dois programas portugueses. A BUK serve vários setores e tem plano grátis e SMS. A Convecta é feita só para barbearias, com a gestão toda no mesmo painel e uma app com o teu nome.",
  intro: "A BUK é um dos programas de marcações mais conhecidos em Portugal, com uma página própria para barbeiros, plano grátis para quem trabalha sozinho e lembretes por SMS. A Convecta é mais nova e mais estreita: só barbearias, e por isso com coisas que uma barbearia usa todos os dias — comissões por barbeiro, cartão de fidelidade com corte grátis, caixa e stock — em todos os planos.",
  quando: "Quando queres um programa que só sabe de barbearias: comissões por barbeiro, checkout com produtos, stock, cartão de fidelidade, tudo no plano de entrada. Quando queres que o cliente veja a tua marca, não a de uma plataforma, e um site cujo design controlas tu. E quando preferes alguém que vai à barbearia configurar.",
  tabela: [
    ["Feito para", "Vários setores", "Só barbearias"],
    ["Plano grátis", "Sim, 1 colaborador", "Não (7 dias à experiência)"],
    ["Preço dos planos pagos", "Pro 15,99 €/mês · Pro+ 25,99 €/mês", `${PLANOS.map((pl) => `${pl.nome} ${pl.precoTexto}`).join(" · ")}/mês`],
    ["Comissões por marcação", "0 %", "0 %"],
    ["Lembretes", "SMS", "Notificação e email, sem custo"],
    ["Pagamentos online (MB WAY, Multibanco)", true, false],
    ["Site com o nome da barbearia", "buk.pt/nome-do-negócio", "a-tua-barbearia.marcacoes.app, com o teu design"],
    ["Comissões por barbeiro, caixa, stock, Excel", "Confirma no site deles por plano", "Em todos os planos"],
    ["Cartão de fidelidade", true, true],
    ["Suporte", "Online", "Telefone e WhatsApp, visita à barbearia (Grande Porto)"],
  ],
  faq: [
    { q: "A BUK é mais barata?", a: "No plano grátis e no Pro (15,99 €), sim. A Convecta começa em " + PRECO_DESDE_TEXTO + "/mês e inclui a gestão toda: caixa, comissões, stock, Excel e cartão de fidelidade. Compara o que cada plano inclui, não só o preço." },
    { q: "A Convecta tem SMS?", a: "Não. Os avisos vão por notificação no telemóvel e por email, sem custo por mensagem." },
  ],
});

export const VS_ZAPPY = comparacao({
  chave: "zappy",
  caminho: "/comparar/zappy",
  descricao: "Convecta ou Zappy para a tua barbearia? O Zappy é um software de gestão para vários setores com faturação certificada; a Convecta é só para barbearias, com marcações, agenda, caixa e comissões, mas sem faturação. Verificado a 24 set 2026.",
  lead: "O Zappy é um programa de gestão para vários setores, com faturação certificada dentro. A Convecta é só para barbearias e não fatura: dá-te o Excel e a fatura passa-se no teu programa.",
  intro: "A grande diferença é a faturação. O Zappy emite faturas certificadas pela AT dentro do programa; a Convecta não — gere a barbearia (marcações, agenda, caixa, comissões, stock) e no fim do mês dá o Excel ao contabilista. Se precisas de faturar no mesmo sítio onde marcas, o Zappy faz isso. Se já tens programa de faturação e o que te falta é a barbearia organizada, a Convecta é mais simples e mais barata.",
  quando: "Quando queres marcações online com o nome da tua barbearia, uma app que o cliente instala, e a agenda, as comissões e a caixa num painel pensado só para barbearias — e já tens quem passe as faturas.",
  tabela: [
    ["Feito para", "Vários setores (clínicas, ginásios, salões, barbearias)", "Só barbearias"],
    ["Faturação certificada", true, "Não (Excel mensal para o contabilista)"],
    ["Preço", "20 € a 119 €/mês", `${PRECO_DESDE_TEXTO} a ${PLANOS[PLANOS.length - 1].precoTexto}/mês`],
    ["Comissões por marcação", "0 %", "0 %"],
    ["Site de marcações com o nome da barbearia", "Confirma no site deles", true],
    ["App instalável com o teu design", null, true],
    ["Comissões por barbeiro, caixa, stock", true, true],
    ["Cartão de fidelidade", null, true],
    ["Suporte", "Online", "Telefone e WhatsApp, visita à barbearia (Grande Porto)"],
  ],
  faq: [
    { q: "A Convecta vai ter faturação?", a: "Não está prometida. Hoje o caminho é o Excel mensal e o programa de faturação que já usas. Se um dia existir, aparece primeiro em Funcionalidades." },
    { q: "Posso usar a Convecta com o meu programa de faturação?", a: "Sim: o Excel mensal dá o total por método de pagamento, por barbeiro e por serviço, e a fatura passa-se lá." },
  ],
});

export const PAGINAS = [PILAR, SOBRE, AGENDA, MARCACOES, GESTAO, CLIENTES, COMISSOES, APP, VS_FRESHA, VS_TREATWELL, VS_BOOKSY, VS_BUK, VS_ZAPPY];
