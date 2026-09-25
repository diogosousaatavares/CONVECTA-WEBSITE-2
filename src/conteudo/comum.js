/*
 * Pedacos que varias paginas de conteudo repetem: a frase de definicao, a
 * lista de funcionalidades por tema, os factos dos concorrentes com a data
 * em que foram verificados. Um sitio so, para nao haver duas verdades.
 */
import { PLANOS, PRECO_DESDE_TEXTO, DESCONTO_ANUAL } from "@/lib/seo";

export const DEFINICAO =
  "A Convecta Booking é um software de marcações online e gestão para barbearias em Portugal: um site de marcações com o nome da barbearia e um painel com agenda, clientes, caixa, comissões, stock e cartão de fidelidade.";

export const VERIFICADO = "2026-09-24";
export const VERIFICADO_TEXTO = "24 de setembro de 2026";

export const PLANOS_TEXTO = PLANOS.map((p) => `${p.nome} (${p.profissionaisTexto.toLowerCase()}) ${p.precoTexto}/mês`).join("; ");

export const AUTOR = "Diogo Tavares";

// O que a Convecta faz, por tema. Cada linha existe e grava no painel hoje.
export const TEMAS = {
  agenda: [
    "Agenda por barbeiro, com vista do dia e lista.",
    "O barbeiro recebe uma notificação no telemóvel a cada marcação nova.",
    "Confirmação em dois toques, ou automática.",
    "Sem marcações sobrepostas: garantido pela base de dados, não por uma regra no ecrã.",
    "Bloqueio de horas (almoço, folga, formação) e marcações manuais.",
    "Lista de espera: o cliente pede aviso para uma hora ocupada; se vagar, é avisado e tem uma hora para confirmar.",
    "Cada barbeiro pode entrar com a conta dele: vê a agenda e mexe só na coluna dele.",
  ],
  marcacoes: [
    "Endereço próprio: a-tua-barbearia.marcacoes.app, com o teu nome, logótipo e cores.",
    "Três toques: serviço, barbeiro, hora. O cliente vê só as horas livres.",
    "Sem instalar nada de nenhuma loja: o site guarda-se no ecrã principal e fica como uma app.",
    "O cliente recebe aviso no telemóvel quando a marcação é confirmada ou cancelada, e um aviso antes do corte (notificação ou email, sem custo por mensagem).",
    "Cancelamento pelo cliente até ao prazo que a barbearia define.",
    "Link para pôr no Instagram, no Google e no WhatsApp.",
  ],
  gestao: [
    "Checkout no fim de cada corte: serviço, produtos levados, método de pagamento, desconto e gorjeta, tudo na mesma conta.",
    "Abertura e fecho de caixa por dia, entradas e saídas, histórico.",
    "Produtos, stock, stock mínimo, movimentos e fornecedores.",
    "Relatórios de marcações, clientes, profissionais, financeiro, serviços e produtos.",
    "Relatório mensal em Excel pronto para o contabilista: total, por método de pagamento, por barbeiro, por serviço, linha a linha.",
    "Conta-corrente por cliente e por barbeiro, fluxo de caixa.",
  ],
  clientes: [
    "Ficha de cliente com histórico de cortes, gastos e carimbos.",
    "Aniversários dos clientes.",
    "Cartão de fidelidade digital: escolhes quantos carimbos dão um corte grátis e a validade.",
    "O cliente cria conta uma vez e depois marca em segundos.",
  ],
  comissoes: [
    "Comissão em percentagem por profissional.",
    "Calculada e guardada no momento do checkout, sobre o serviço.",
    "Conta-corrente por barbeiro: o que fez, o que lhe cabe, o que já foi pago.",
    "Cada barbeiro vê a conta dele no painel, sem ver a dos colegas nem o financeiro da casa.",
  ],
  app: [
    "Um site de marcações com o nome, o logótipo e as cores da barbearia — o cliente vê a barbearia, não a Convecta.",
    "Instalável no telemóvel a partir do browser, sem App Store nem Google Play, sem aprovações nem atualizações.",
    "Editor de design no painel: cores, tipografia, capa, galeria e o que aparece, com pré-visualização num telemóvel antes de publicar.",
    "Notificações no telemóvel do cliente, como numa app nativa.",
  ],
};

export const NAO_FAZ = [
  "Lembretes por SMS ou WhatsApp (os avisos são por notificação no telemóvel e por email).",
  "Pagamentos online pelo cliente (paga na barbearia, como sempre).",
  "Faturação certificada (a Convecta dá o Excel mensal; a fatura é passada no teu programa de faturação).",
  "Marketplace: a Convecta não traz clientes novos de uma montra; traz os teus para marcarem sozinhos.",
];

export const PRECO_FRASE = `Três planos por barbearia, ${PLANOS_TEXTO}; desde ${PRECO_DESDE_TEXTO}/mês, ${Math.round(DESCONTO_ANUAL * 100)} % mais barato no anual, sem comissões por marcação nem por cliente novo. Montar a barbearia não exige cartão; para começar a receber marcações regista-se o cartão e há 7 dias à experiência, sem ser cobrado nada.`;

/*
 * Concorrentes. Verificado nas paginas oficiais a 24 set 2026. Tudo o que
 * esta aqui tem link para a fonte; rever de 3 em 3 meses. Nunca uma
 * classificacao nem uma opiniao — so o que a pagina deles diz.
 */
export const CONCORRENTES = {
  fresha: {
    nome: "Fresha",
    url: "https://www.fresha.com/for-business/barber",
    precos: "https://www.fresha.com/pt/pricing",
    resumo: "Marketplace global de beleza e barbearias, com agenda e pagamentos.",
    factos: [
      "Marketplace: a barbearia fica listada ao lado das outras, e o cliente pesquisa lá.",
      "Cobra 20 % do valor do serviço por cada cliente novo que chega pelo marketplace (segundo a página de preços deles, a 24 set 2026).",
      "Plano pago anunciado a partir de 19,95 US$ por mês, com funções extra.",
      "Mensagens de WhatsApp pagas por mensagem.",
      "Pagamentos online e terminal próprio.",
    ],
    melhor: "Traz clientes novos que já pesquisam no marketplace; tem pagamentos online, muito mais integrações e uma equipa gigante atrás.",
  },
  treatwell: {
    nome: "Treatwell",
    url: "https://www.treatwell.pt/partners/solucoes/software-para-barbearias/",
    precos: "https://www.treatwell.pt/partners/precos/",
    resumo: "Marketplace europeu de beleza, com software para parceiros.",
    factos: [
      "Marketplace: as marcações chegam pela montra Treatwell.",
      "Comissão de 25 % por cliente novo vindo do marketplace (página de preços, 24 set 2026).",
      "2 % sobre pagamentos online.",
      "Contrato de 12 meses.",
    ],
    melhor: "Marca conhecida pelos clientes finais em Portugal; traz clientes novos; tem lembretes por SMS.",
  },
  booksy: {
    nome: "Booksy",
    url: "https://booksy.com/pt-pt/s/barbearia",
    precos: null,
    resumo: "Marketplace e app de marcações muito usado por barbearias, com app própria para o cliente.",
    factos: [
      "Marketplace com app para o cliente final; listagem de barbearias em Portugal.",
      "Mensalidade e taxas em Portugal: não conseguimos verificar um preço público para Portugal a 24 set 2026 — confirma no site deles antes de decidir.",
      "Lembretes por SMS e app própria para o cliente.",
    ],
    melhor: "Muitos clientes já têm a app Booksy instalada; traz marcações de quem pesquisa lá; SMS.",
  },
  buk: {
    nome: "BUK",
    url: "https://buk.pt/barbeiros",
    precos: "https://buk.pt/barbeiros",
    resumo: "Software português de marcações para vários setores, com página própria para barbeiros.",
    factos: [
      "Plano grátis com 1 colaborador; Pro a 15,99 €/mês e Pro+ a 25,99 €/mês (página de barbeiros, 24 set 2026).",
      "Lembretes por SMS, pagamentos por MB WAY e Multibanco, fidelização.",
      "Afirma ter mais de 3.000 negócios em Portugal.",
      "Página de marcações em buk.pt/nome-do-negócio.",
    ],
    melhor: "Tem plano grátis para quem trabalha sozinho, SMS e pagamentos online; é uma empresa portuguesa com anos de mercado.",
  },
  zappy: {
    nome: "Zappy",
    url: "https://zappysoftware.com/en/pricing",
    precos: "https://zappysoftware.com/en/pricing",
    resumo: "Software de gestão português para vários setores, com faturação certificada.",
    factos: [
      "Planos entre 20 € e 119 € por mês (página de preços, 24 set 2026).",
      "Faturação certificada pela AT dentro do programa.",
      "Genérico: serve clínicas, ginásios, salões e barbearias.",
      "Afirma ter mais de 15.000 profissionais.",
    ],
    melhor: "Fatura dentro do programa (a Convecta não fatura) e serve negócios com várias atividades.",
  },
  noona: {
    nome: "Noona",
    url: "https://noona.app/hq/pt-pt/barbershop-software",
    precos: "https://noona.app/hq/pt-pt/pricing",
    resumo: "Software islandês de marcações com página em português de Portugal e marketplace.",
    factos: [
      "Entre 12 € e 22 € por mês, SMS a 0,03 € cada (página de preços, 24 set 2026).",
      "Marketplace próprio para clientes novos.",
    ],
    melhor: "Mais barato no plano de entrada; SMS; marketplace.",
  },
  easyweek: {
    nome: "EasyWeek",
    url: "https://easyweek.pt/business/solutions/barbershop",
    precos: "https://easyweek.pt/business/solutions/barbershop",
    resumo: "Software de marcações para vários setores, com domínio .pt.",
    factos: [
      "Plano grátis e Pro desde 8,33 €/mês (24 set 2026).",
      "Primeiro no Capterra e no GetApp em Portugal na categoria de barbearias.",
    ],
    melhor: "Plano grátis; muito bem avaliado nos diretórios de software.",
  },
  agendable: {
    nome: "Agendable",
    url: "https://agendable.pt/agenda-online-barbearia/",
    precos: null,
    resumo: "Software português de marcações com página dedicada a barbearias.",
    factos: ["Lembretes por SMS e email.", "Agenda online 24/7."],
    melhor: "SMS.",
  },
};

// A Convecta na mesma grelha que os outros, sem favor.
export const CONVECTA_GRELHA = {
  nome: "Convecta",
  url: "/software-para-barbearias",
  resumo: "Software português de marcações e gestão feito só para barbearias, sem marketplace.",
  factos: [
    PRECO_FRASE,
    "Sem comissões por marcação nem por cliente novo.",
    "Site de marcações com o nome da barbearia, instalável no telemóvel.",
    "Agenda, caixa, comissões, stock, relatórios, Excel e cartão de fidelidade em todos os planos.",
    "Avisos por notificação e email, sem custo por mensagem. Sem SMS nem WhatsApp.",
    "Sem pagamentos online, sem faturação certificada, sem plano grátis (7 dias à experiência).",
  ],
};
