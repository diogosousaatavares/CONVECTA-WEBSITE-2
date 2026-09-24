/*
 * O blog: guias e comparacoes assinados pelo Diogo. Cada artigo diz quando
 * foi escrito e verificado. O que e sobre concorrentes vem de comum.js, com
 * link e data. O que e sobre a Convecta existe hoje.
 */
import { PLANOS, PRECO_DESDE_TEXTO, DESCONTO_ANUAL } from "@/lib/seo";
import { VERIFICADO, VERIFICADO_TEXTO, CONCORRENTES, CONVECTA_GRELHA, AUTOR, PRECO_FRASE } from "./comum";

const ATUALIZADO = "2026-09-24";
const p = (texto) => ({ tipo: "p", texto });
const h2 = (texto) => ({ tipo: "h2", texto });
const h3 = (texto) => ({ tipo: "h3", texto });
const lista = (itens) => ({ tipo: "ul", itens });
const fonte = (c) => `[${c.nome}](${c.url})${c.precos && c.precos !== c.url ? ` · [preços](${c.precos})` : ""}`;

const artigo = (o) => ({ ...o, tipo: "artigo", autor: AUTOR, atualizado: ATUALIZADO, publicado: ATUALIZADO, migalhas: [{ nome: "Blog", caminho: "/blog" }] });

export const MELHORES = artigo({
  caminho: "/blog/melhores-softwares-marcacoes-barbearias-portugal",
  titulo: "Melhores softwares de marcações para barbearias em Portugal (2026)",
  tituloSeo: "Melhores softwares de marcações para barbearias em Portugal (2026) — lista honesta",
  descricao: "Os softwares de marcações e gestão que uma barbearia em Portugal encontra em 2026 — Fresha, Treatwell, Booksy, BUK, Noona, EasyWeek, Zappy, Agendable e Convecta — na mesma grelha: modelo, preço, comissões, lembretes, o que fazem melhor. Verificado a 24 set 2026.",
  olho: "Comparação",
  lead: "Não há uma lista portuguesa e honesta disto. Fizemos uma, com a Convecta na mesma grelha que os outros e sem estrelas: só o que cada página oficial diz, com a data.",
  resumo: "Nove programas na mesma grelha, sem estrelas, com preços e comissões verificados.",
  blocos: [
    { tipo: "aviso", titulo: "Escrito pela Convecta", texto: `Esta lista é escrita pela Convecta, que é um dos programas aqui. Por isso não há classificação nem «o melhor»: há uma grelha igual para todos, com o que a página oficial de cada um diz a ${VERIFICADO_TEXTO}, e o link para confirmares. Os preços mudam; confirma antes de decidir.` },
    p("Quem pesquisa «melhor software para barbearia» em português encontra páginas brasileiras (Trinks, AppBarber) que não servem em Portugal, e listas de diretórios com dezenas de programas genéricos. Esta lista tem só o que uma barbearia portuguesa encontra mesmo em 2026, dividido pela pergunta que importa primeiro: **é um marketplace ou é um software próprio?**"),
    h2("Marketplace ou software próprio"),
    p("Um **marketplace** é uma montra: a barbearia fica listada, o cliente pesquisa lá, e a plataforma cobra uma percentagem por cada cliente novo que traz (20 % na Fresha, 25 % na Treatwell). Serve para quem precisa de clientes de fora. Um **software próprio** é a agenda da barbearia: o site é teu, o cliente é teu, pagas uma mensalidade. Serve para quem já tem clientes e quer organizá-los. Explicamos as contas em [Marketplace ou agenda própria](/blog/marketplace-ou-agenda-propria)."),
    h2("Marketplaces"),
    ...["fresha", "treatwell", "booksy"].flatMap((k) => { const c = CONCORRENTES[k]; return [h3(c.nome), p(c.resumo + " Fonte: " + fonte(c) + "."), lista(c.factos), p("**Melhor para:** " + c.melhor)]; }),
    h2("Software próprio, feito em Portugal"),
    h3("Convecta"),
    p(CONVECTA_GRELHA.resumo + " Fonte: [convecta.pt](/software-para-barbearias)."),
    lista(CONVECTA_GRELHA.factos),
    p("**Melhor para:** barbearias que já têm clientes e querem que marquem sozinhos no site da barbearia, com a gestão (caixa, comissões, stock, fidelidade) no mesmo painel, sem comissões, e com alguém que vai à barbearia configurar. **Pior para:** quem precisa de clientes novos de uma montra, de SMS, de pagamentos online ou de faturação no mesmo programa."),
    ...["buk", "zappy", "agendable"].flatMap((k) => { const c = CONCORRENTES[k]; return [h3(c.nome), p(c.resumo + " Fonte: " + fonte(c) + "."), lista(c.factos), p("**Melhor para:** " + c.melhor)]; }),
    h2("Software próprio, estrangeiro com página em português"),
    ...["noona", "easyweek"].flatMap((k) => { const c = CONCORRENTES[k]; return [h3(c.nome), p(c.resumo + " Fonte: " + fonte(c) + "."), lista(c.factos), p("**Melhor para:** " + c.melhor)]; }),
    h2("A grelha"),
    { tipo: "tabela", minLargura: 760, legenda: `Verificado a ${VERIFICADO_TEXTO} nas páginas oficiais. «—» = não verificado.`, cabecalho: ["Programa", "Modelo", "Preço (mês)", "Comissão por cliente novo", "Lembretes", "Feito para"], linhas: [
      ["Fresha", "Marketplace", "Grátis; pago desde 19,95 US$", "20 %", "SMS/WhatsApp pagos", "Vários setores"],
      ["Treatwell", "Marketplace", "—", "25 % (+2 % pagamentos online)", "SMS", "Vários setores"],
      ["Booksy", "Marketplace", "— (PT não verificado)", "—", "SMS", "Barbearias e salões"],
      ["Convecta", "Próprio", `${PRECO_DESDE_TEXTO} a ${PLANOS[PLANOS.length - 1].precoTexto}`, "0 %", "Notificação e email, grátis", "Só barbearias"],
      ["BUK", "Próprio", "Grátis; 15,99 €; 25,99 €", "0 %", "SMS", "Vários setores"],
      ["Zappy", "Próprio + faturação", "20 € a 119 €", "0 %", "—", "Vários setores"],
      ["Agendable", "Próprio", "—", "0 %", "SMS e email", "Vários setores"],
      ["Noona", "Próprio + marketplace", "12 € a 22 €", "—", "SMS 0,03 €", "Vários setores"],
      ["EasyWeek", "Próprio", "Grátis; Pro desde 8,33 €", "0 %", "—", "Vários setores"],
    ] },
    h2("Como escolher"),
    { tipo: "ol", itens: [
      "**Precisas de clientes novos ou de organizar os que tens?** Clientes novos: marketplace. Organizar: software próprio.",
      "**Quantos barbeiros?** Um: há planos grátis (BUK, EasyWeek) e o plano de entrada da Convecta. Vários: vê se as comissões por barbeiro e as contas de cada um estão incluídas ou custam mais.",
      "**Lembretes:** SMS custam por mensagem; notificação e email não. Pergunta quanto pagas por mês por 200 lembretes.",
      "**Faturação:** se queres faturar no mesmo programa, só o Zappy o faz nesta lista.",
      "**De quem é o cliente?** Num marketplace o cliente vê a concorrência ao lado da tua barbearia. Num software próprio vê só a tua.",
      "**Suporte:** pergunta quem responde, como e quando. Uma agenda parada numa sexta à tarde não espera por um email.",
    ] },
    p(`Se quiseres ver a Convecta em detalhe, está tudo em [Software para barbearias](/software-para-barbearias). Se quiseres a comparação direta com um destes: [Fresha](/comparar/fresha), [Treatwell](/comparar/treatwell), [Booksy](/comparar/booksy), [BUK](/comparar/buk), [Zappy](/comparar/zappy).`),
  ],
});

export const MARKETPLACE = artigo({
  caminho: "/blog/marketplace-ou-agenda-propria",
  titulo: "Marketplace ou agenda própria: o que muda para uma barbearia",
  tituloSeo: "Marketplace ou agenda própria para a barbearia — as contas com números reais",
  descricao: "Fresha, Treatwell e Booksy trazem clientes e cobram por eles; um software próprio como a Convecta cobra uma mensalidade fixa. As contas, com percentagens verificadas, e como mudar sem perder clientes.",
  olho: "Guia",
  lead: "Um marketplace traz clientes e fica com uma parte de cada um. Uma agenda própria não traz ninguém — organiza os teus. As contas mudam conforme a fase da barbearia.",
  resumo: "As contas de 20 % e 25 % por cliente novo, e como mudar de agenda sem perder ninguém.",
  blocos: [
    h2("As duas ideias"),
    p("Num **marketplace** (Fresha, Treatwell, Booksy) a barbearia é uma entrada numa lista. O cliente abre a app da plataforma, vê barbearias perto dele, escolhe uma. A plataforma trouxe o cliente e cobra por isso: 20 % do serviço por cliente novo na Fresha, 25 % na Treatwell, segundo as páginas de preços deles a " + VERIFICADO_TEXTO + ". E o cliente continua a ser da plataforma: da próxima vez volta a abrir a app e volta a ver as outras barbearias."),
    p("Numa **agenda própria** (Convecta, BUK, Zappy, Agendable) o site de marcações é da barbearia. O cliente chega pelo teu Instagram, pelo teu Google, pelo teu WhatsApp, e marca no teu site. Não há comissão — há uma mensalidade. E o cliente é teu: a ficha, o histórico, os carimbos."),
    h2("As contas"),
    p("Um corte de 15 €. Trinta clientes novos por mês pela montra, o que numa barbearia pequena é um bom mês."),
    { tipo: "tabela", cabecalho: ["", "Fresha (20 %)", "Treatwell (25 %)", `Convecta (${PRECO_DESDE_TEXTO}/mês)`], linhas: [
      ["Por cliente novo", "3,00 €", "3,75 €", "0 €"],
      ["30 clientes novos/mês", "90 €", "112,50 €", "0 €"],
      ["Mensalidade", "0 € (plano base) ou 19,95 US$", "—", PRECO_DESDE_TEXTO],
      ["Clientes que trouxe", "30", "30", "0 — traz os teus"],
      ["De quem é o cliente", "Da plataforma", "Da plataforma", "Da barbearia"],
    ], legenda: "Percentagens das páginas oficiais a " + VERIFICADO_TEXTO + ". A Treatwell tem ainda contrato de 12 meses e 2 % nos pagamentos online." },
    p("Nos primeiros meses de uma barbearia nova, 90 € por 30 clientes que não existiam é um bom negócio. Ao fim de um ano, quando metade desses clientes já são habituais e continuam a marcar pela app da plataforma, estás a pagar comissão por gente que já era tua. É nesse ponto que muitas barbearias mudam."),
    h2("O que perdes e o que ganhas ao mudar"),
    lista([
      "**Perdes** a montra: quem te descobria na app da plataforma deixa de te descobrir lá.",
      "**Ganhas** a mensalidade fixa, o cliente na tua base de dados, o site com o teu nome e sem concorrentes ao lado, e a gestão da barbearia (caixa, comissões, stock) no mesmo painel.",
      "**Não muda** o trabalho do cliente: continua a marcar no telemóvel em três toques.",
    ]),
    h2("Como mudar sem perder clientes"),
    { tipo: "ol", itens: [
      "Cria a agenda própria e configura serviços, barbeiros e horários. Na Convecta demora uma tarde, e vamos à barbearia fazê-lo contigo.",
      "Põe o link novo no Instagram (bio e botão «Reservar»), no perfil do Google e na resposta automática do WhatsApp.",
      "Durante um mês, mantém as duas: quem marca pela montra é servido; ao balcão dizes «da próxima vez marca aqui» e mostras o link ou o QR.",
      "Quando a maioria já marca no teu site, fecha a montra — ou deixa-a só como cartaz, sem agenda ligada.",
    ] },
    p("Comparações diretas: [Convecta vs Fresha](/comparar/fresha), [Convecta vs Treatwell](/comparar/treatwell), [Convecta vs Booksy](/comparar/booksy)."),
  ],
});

export const PRECOS_ARTIGO = artigo({
  caminho: "/blog/quanto-custa-software-marcacoes-barbearia",
  titulo: "Quanto custa um software de marcações para barbearia (preços reais de 2026)",
  tituloSeo: "Quanto custa um software de marcações para barbearia em 2026 — preços reais",
  descricao: "Os preços reais de 2026 de software de marcações para barbearias em Portugal: grátis com limites, mensalidades de 8 a 119 €, comissões de 20 a 25 % por cliente novo e lembretes pagos por mensagem. Como comparar o custo total.",
  olho: "Guia",
  lead: "«Grátis» raramente é grátis, e 15 €/mês pode custar mais do que 30 €/mês. O que conta é o custo total ao fim do mês.",
  resumo: "Mensalidades, comissões e lembretes pagos: o custo total, não o preço de tabela.",
  blocos: [
    h2("Os quatro tipos de custo"),
    lista([
      "**Mensalidade.** De 0 € (planos grátis com limites) a 119 €/mês. Verifica quantos profissionais e quantas marcações cabem no plano.",
      "**Comissões.** Nos marketplaces, 20 % (Fresha) a 25 % (Treatwell) por cliente novo. Num mês bom são dezenas de euros; num ano, centenas.",
      "**Lembretes.** SMS e WhatsApp pagam-se por mensagem em vários programas (a Noona anunciava 0,03 € por SMS a " + VERIFICADO_TEXTO + "). 200 lembretes por mês são 6 € — ou 0 €, se forem por notificação e email.",
      "**Extras.** Pagamentos online (2 % na Treatwell), domínio próprio, módulos de faturação ou de stock que só entram nos planos de cima.",
    ]),
    h2("O que cada um cobra"),
    { tipo: "tabela", minLargura: 640, legenda: `Páginas oficiais, verificadas a ${VERIFICADO_TEXTO}. Os preços mudam; confirma no link de cada um.`, cabecalho: ["Programa", "Mensalidade", "Comissões", "Lembretes"], linhas: [
      [`[Fresha](${CONCORRENTES.fresha.precos})`, "0 € ou 19,95 US$", "20 % por cliente novo", "SMS/WhatsApp pagos"],
      [`[Treatwell](${CONCORRENTES.treatwell.precos})`, "— (contrato 12 meses)", "25 % por cliente novo, 2 % pagamentos", "SMS"],
      [`[BUK](${CONCORRENTES.buk.precos})`, "0 €, 15,99 €, 25,99 €", "0 %", "SMS"],
      [`[Noona](${CONCORRENTES.noona.precos})`, "12 € a 22 €", "—", "SMS 0,03 €"],
      [`[EasyWeek](${CONCORRENTES.easyweek.precos})`, "0 €, Pro desde 8,33 €", "0 %", "—"],
      [`[Zappy](${CONCORRENTES.zappy.precos})`, "20 € a 119 €", "0 %", "—"],
      ["[Convecta](/precos)", `${PLANOS.map((pl) => pl.precoTexto).join(", ")}`, "0 %", "Notificação e email, 0 €"],
    ] },
    h2("O custo total, com um exemplo"),
    p("Barbearia com 2 barbeiros, 400 cortes por mês a 15 €, 30 clientes novos por mês, lembrete a todos."),
    { tipo: "tabela", cabecalho: ["", "Marketplace a 20 %", "Software próprio com SMS", "Convecta"], linhas: [
      ["Mensalidade", "0 €", "15,99 €", PLANOS[1].precoTexto],
      ["Comissões (30 × 3 €)", "90 €", "0 €", "0 €"],
      ["Lembretes (400)", "Pagos por mensagem", "400 × ~0,03 € = 12 €", "0 €"],
      ["Total aproximado", "90 € + lembretes", "~28 €", PLANOS[1].precoTexto],
      ["O que inclui", "Marcações, pagamentos, montra", "Marcações, SMS", "Marcações, agenda, caixa, comissões, stock, fidelidade, Excel"],
    ], legenda: "Exemplo ilustrativo com os preços públicos acima. O preço do SMS varia por programa." },
    p("A conclusão não é «a Convecta é mais barata»: no plano de 1 barbeiro há programas mais baratos e há planos grátis. A conclusão é que o preço de tabela não chega — conta as comissões e os lembretes, e vê o que está incluído."),
    h2("Os planos da Convecta"),
    p(PRECO_FRASE + ` Não há limite de marcações, taxa de adesão nem comissões. Os detalhes, com o que inclui e não inclui, estão em [Preços](/precos).`),
  ],
});

export const FALTAS = artigo({
  caminho: "/blog/como-reduzir-faltas-marcacoes-barbearia",
  titulo: "Como reduzir as faltas às marcações numa barbearia",
  tituloSeo: "Como reduzir as faltas às marcações numa barbearia — lembretes, prazos e lista de espera",
  descricao: "Quanto custa uma falta, o que funciona para as reduzir (lembretes, prazo de cancelamento, confirmação, lista de espera) e as diferenças entre lembretes por SMS, WhatsApp, email e notificação, com custos.",
  olho: "Guia",
  lead: "Uma hora vazia é a única coisa que uma barbearia não recupera. As faltas reduzem-se com três coisas: lembrar, facilitar o cancelamento e preencher a vaga.",
  resumo: "Lembretes, prazo de cancelamento, lista de espera — e o que custa cada tipo de lembrete.",
  blocos: [
    h2("Quanto custa uma falta"),
    p("Um corte de 15 € que não aparece custa 15 € — e custa o cliente que queria aquela hora e foi a outro lado. Duas faltas por semana são cerca de 120 € por mês. É mais do que qualquer software desta lista."),
    h2("O que funciona"),
    { tipo: "ol", itens: [
      "**Lembrar antes.** Um aviso na véspera ou umas horas antes é o que mais reduz faltas. Não precisa de ser SMS: uma notificação no telemóvel ou um email fazem o mesmo, se o cliente os receber.",
      "**Facilitar o cancelamento.** Se cancelar é difícil, o cliente não cancela — falta. Deixa-o cancelar sozinho até um prazo (2 h, 6 h, 24 h antes) e diz-lhe claramente quando já não pode.",
      "**Confirmar.** Uma marcação confirmada pela barbearia («confirmado, até amanhã às 15h») cria compromisso.",
      "**Preencher a vaga.** Quando alguém cancela, avisa quem estava na lista de espera. Se ninguém está, avisa os clientes: «vaga de última hora». A hora deixa de estar vazia.",
      "**Ter uma regra para reincidentes.** Duas faltas sem aviso: marca só por telefone. Não precisa de ser um programa a fazê-lo; precisa de existir.",
    ] },
    h2("SMS, WhatsApp, email ou notificação: diferenças e custos"),
    { tipo: "tabela", cabecalho: ["Canal", "Custo por mensagem", "Chega?", "Notas"], linhas: [
      ["SMS", "Pago (na ordem dos cêntimos; a Noona anunciava 0,03 €)", "Quase sempre", "Não precisa de internet. Custa por mensagem, todos os meses."],
      ["WhatsApp", "Pago por mensagem (conta Meta verificada)", "Quase sempre", "O cliente vê como mensagem normal. Precisa de aprovação de modelos e de conta de empresa."],
      ["Email", "Grátis", "Depende de o cliente ler email", "Bom como reforço; mau sozinho para muita gente."],
      ["Notificação no telemóvel", "Grátis", "Se o cliente aceitou notificações", "Aparece como uma app. Precisa de o cliente ter aceitado uma vez."],
    ] },
    p("Na Convecta os avisos vão por notificação e por email, sem custo por mensagem, e não há SMS nem WhatsApp. É uma escolha: para uma barbearia com 400 marcações por mês, 400 SMS são uma despesa fixa todos os meses; a notificação custa zero e chega da mesma forma a quem instalou o site da barbearia no telemóvel. Se para ti o SMS é obrigatório, a BUK, a Noona ou a Agendable têm-no — dizemo-lo em [Melhores softwares de marcações para barbearias](/blog/melhores-softwares-marcacoes-barbearias-portugal)."),
    h2("Como a Convecta faz cada uma destas coisas"),
    lista([
      "Aviso antes do corte por notificação e email, sem custo.",
      "Cancelamento pelo cliente até ao prazo que a barbearia define; depois disso, só ligando.",
      "Confirmação em dois toques ou automática; o cliente recebe aviso quando confirmas.",
      "Lista de espera por hora, com uma hora para confirmar quando vaga; «vaga de última hora» para todos os clientes quando ninguém está à espera.",
    ]),
    p("Tudo isto está na [agenda](/agenda-online-barbearia) e nas [marcações online](/marcacoes-online-barbearia), em todos os planos."),
  ],
});

export const COMISSOES_ARTIGO = artigo({
  caminho: "/blog/como-calcular-comissoes-barbeiros",
  titulo: "Como calcular e pagar comissões aos barbeiros",
  tituloSeo: "Como calcular e pagar comissões aos barbeiros — percentagens, exemplos e erros comuns",
  descricao: "Como se calculam as comissões dos barbeiros: percentagem sobre o serviço, sobre o que entra ou sobre o que sobra, renda de cadeira, exemplos com números e os erros que dão discussões no fim do mês.",
  olho: "Guia",
  lead: "A discussão do fim do mês nasce quase sempre de uma coisa: a comissão foi combinada em palavras e calculada em folhas diferentes. Aqui ficam as regras, com números.",
  resumo: "Percentagem sobre o quê, exemplos com números e os erros que dão discussões.",
  blocos: [
    h2("Os modelos que existem"),
    lista([
      "**Percentagem sobre o serviço.** O mais comum: 30 % a 50 % do valor de cada corte para o barbeiro. Simples, e o barbeiro ganha mais quando corta mais.",
      "**Fixo mais percentagem.** Um valor base por mês mais uma percentagem mais baixa. Dá segurança ao barbeiro nos meses fracos.",
      "**Renda de cadeira.** O barbeiro paga um valor fixo pela cadeira e fica com tudo o que faz. É um inquilino, não um comissionista.",
      "**Sobre produtos.** Alguns donos dão uma percentagem (menor) pelas vendas de produtos. Tem de ficar combinado por escrito.",
    ]),
    h2("Percentagem sobre o quê"),
    p("Este é o ponto que dá mais discussões. **Sobre o preço de tabela** (15 €) ou **sobre o que o cliente pagou** (12 €, com desconto)? **Antes ou depois** de um vale de fidelidade (corte grátis)? A regra tem de estar escrita e ser a mesma no programa. Na Convecta a comissão é calculada no checkout sobre o valor do serviço nesse checkout, por isso o que fica guardado é o que o barbeiro vê e o que o dono vê — a mesma linha."),
    h2("Um mês, com números"),
    p("O Rui tem 40 %. Em setembro fez 180 cortes a 15 € e 20 barbas a 8 €: 2.860 € de serviços. A comissão dele são 1.144 €. Se o dono lhe adiantou 300 € a meio do mês, a conta-corrente diz: 1.144 € a haver, 300 € pagos, 844 € a pagar. Não há folha, não há discussão."),
    h2("Os erros que dão discussões"),
    { tipo: "ol", itens: [
      "Combinar em palavras e não escrever a regra (sobre tabela ou sobre o pago; antes ou depois de descontos; com ou sem produtos).",
      "Calcular no fim do mês a partir de talões. Perde-se sempre alguma coisa; o cálculo tem de nascer no momento do pagamento.",
      "Não registar os adiantamentos. Uma conta-corrente por barbeiro resolve.",
      "Mudar a percentagem a meio do mês sem data. Se mudar, mude no dia 1.",
      "Não deixar o barbeiro ver a conta dele. Transparência evita metade das conversas.",
    ] },
    h2("Como a Convecta faz"),
    p("Percentagem por barbeiro, calculada e guardada no checkout, conta-corrente por barbeiro com o que fez, o que lhe cabe e o que já foi pago, e cada barbeiro a ver a conta dele no painel — sem ver a caixa nem as contas dos colegas. Está em [Comissões dos barbeiros](/comissoes-barbeiros), em todos os planos."),
  ],
});

export const ARTIGOS = [MELHORES, MARKETPLACE, PRECOS_ARTIGO, FALTAS, COMISSOES_ARTIGO];

export const BLOG_INDICE = {
  caminho: "/blog",
  titulo: "Guias para donos de barbearia",
  tituloSeo: "Blog — guias para donos de barbearia em Portugal | Convecta",
  descricao: "Guias práticos para gerir uma barbearia em Portugal: software de marcações, marketplaces e comissões, preços reais, faltas, comissões dos barbeiros. Escritos pela Convecta, com datas e fontes.",
  olho: "Blog",
  lead: "Guias curtos, com números e fontes, sobre o que trava o dia de uma barbearia. Escritos por quem faz a Convecta — e diz quando está a falar da Convecta.",
  atualizado: ATUALIZADO,
  blocos: [
    { tipo: "ligacoes", itens: ARTIGOS.map((a) => ({ titulo: a.titulo, caminho: a.caminho, texto: a.resumo })) },
    p("Comparações diretas: [Convecta vs Fresha](/comparar/fresha), [vs Treatwell](/comparar/treatwell), [vs Booksy](/comparar/booksy), [vs BUK](/comparar/buk), [vs Zappy](/comparar/zappy)."),
  ],
};
