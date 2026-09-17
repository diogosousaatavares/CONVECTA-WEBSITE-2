/*
 * A verdade do site, num sitio so.
 *
 * Tudo o que o Google, o WhatsApp e o Instagram leem sobre a Convecta sai
 * daqui: nome, contactos, morada, precos, o que a app faz. Quando os precos
 * mudarem ou a morada mudar, muda-se aqui e todas as paginas seguem — nao ha
 * um preco escrito a mao em cinco ficheiros a ficar para tras.
 *
 * Regra desta lista: so entra o que existe e funciona hoje. Uma
 * funcionalidade prometida no Google e desmentida na demonstracao e um
 * cliente perdido e uma reclamacao a caminho.
 */

export const SITE = {
  url: "https://convecta.pt",
  nome: "Convecta",
  produto: "Convecta Booking",
  // O que a Convecta e, numa linha. E a frase que aparece por baixo do nome
  // nos resultados do Google quando uma pagina nao diz melhor.
  slogan: "Marcações online e gestão para barbearias",
  descricao:
    "Software de marcações online e gestão para barbearias em Portugal. Os clientes marcam pelo site da barbearia, o barbeiro recebe a notificação no telemóvel e gere agenda, caixa, comissões, stock e cartão de fidelidade num só painel. Desde 19,99 €/mês, sem comissões por marcação.",
  // Quem esta por tras da marca, para o rodape, os Termos e a Privacidade
  // (Decreto-Lei 7/2004: nome, NIF, morada e email tem de estar no site).
  titular: "Diogo Borges de Sousa Tavares",
  nif: "262760860",
  email: "geral@convecta.pt",
  telefone: "+351 914 874 725",
  telefoneE164: "+351914874725",
  morada: { rua: "Rua 31 de Janeiro, 454", codigoPostal: "4445-006", cidade: "Alfena", pais: "PT" },
  instagram: "https://www.instagram.com/convecta.pt",
  instagramHandle: "@convecta.pt",
  imagem: "https://convecta.pt/og-image.png",
  imagemLargura: 1200,
  imagemAltura: 630,
  logo: "https://convecta.pt/brand/convecta-logo.png",
  // Onde vive a app (nao e este site). Os clientes de cada barbearia entram
  // em <barbearia>.marcacoes.app; a demonstracao publica e uma barbearia
  // como as outras.
  demoCliente: "https://demo.marcacoes.app",
  demoPainel: "https://administrador.marcacoes.app/entrar?demo=1",
  dominioApps: "marcacoes.app",
};

/*
 * Os planos. Decisao do Diogo, setembro de 2026.
 *
 * A plataforma e a mesma nos tres: agenda, clientes, caixa, comissoes,
 * produtos, stock, relatorios, fidelizacao e a pagina de marcacoes propria.
 * O que muda e quantos profissionais cabem — e, no Business, a personalizacao
 * completa do site da barbearia (que ja existe em <slug>.marcacoes.app; nao e um
 * site desenhado de raiz, e o contrato nao pode prometer isso)
 * feito pela Convecta dentro do sistema dela.
 *
 * Regra: nao se escreve um preco a mao em lado nenhum. Sai sempre daqui.
 */
export const PLANOS = [
  {
    id: "essencial",
    nome: "Essencial",
    preco: 19.99,
    precoTexto: "19,99 €",
    profissionais: 1,
    profissionaisTexto: "1 profissional",
    resumo: "Para quem trabalha sozinho.",
    website: false,
  },
  {
    id: "profissional",
    nome: "Profissional",
    preco: 29.99,
    precoTexto: "29,99 €",
    profissionais: 5,
    profissionaisTexto: "Até 5 profissionais",
    resumo: "Para uma equipa pequena.",
    website: false,
    destaque: true,
  },
  {
    id: "business",
    nome: "Business",
    preco: 59.99,
    precoTexto: "59,99 €",
    profissionais: 15,
    profissionaisTexto: "Até 15 profissionais",
    resumo: "Para barbearias grandes, com o site totalmente personalizado.",
    website: true,
  },
];

/*
 * Pagamento anual: 15 % mais barato do que doze meses a pagar mes a mes.
 * Decisao do Diogo, setembro de 2026. Serve o cashflow dele e prende menos
 * o cliente do que uma fidelizacao — paga adiantado porque compensa, nao
 * porque assinou um papel.
 *
 * Os numeros sao calculados, nao escritos a mao: mexe-se no desconto e tudo
 * o resto segue.
 */
export const DESCONTO_ANUAL = 0.15;

const euros = n => n.toFixed(2).replace(".", ",") + " €";

PLANOS.forEach(pl => {
  pl.precoAno = Math.round(pl.preco * 12 * (1 - DESCONTO_ANUAL) * 100) / 100;
  pl.precoAnoTexto = euros(pl.precoAno);
  // o que o mes fica a valer quando se paga o ano de uma vez
  pl.precoMesAnual = Math.round((pl.precoAno / 12) * 100) / 100;
  pl.precoMesAnualTexto = euros(pl.precoMesAnual);
  pl.poupancaAno = Math.round((pl.preco * 12 - pl.precoAno) * 100) / 100;
  pl.poupancaAnoTexto = euros(pl.poupancaAno);
});

/** O plano mais barato: e o numero que aparece no "a partir de". */
export const PLANO_BASE = PLANOS[0];
export const PRECO_DESDE = PLANO_BASE.preco;
export const PRECO_DESDE_TEXTO = PLANO_BASE.precoTexto;

/*
 * O lembrete por WhatsApp saiu do produto a 16/09/2026.
 *
 * Esteve aqui meses como "em breve" a espera de uma conta Meta verificada. Em
 * vez disso construiu-se o aviso por notificacao e por email, que funciona
 * hoje, e que e melhor negocio para quem compra: no WhatsApp cada lembrete
 * custa 1,4 centimos ao barbeiro e sai-lhe do lucro; assim custa zero.
 *
 * A constante fica porque ha paginas que a leem. Fica a false e sem nada
 * marcado como "em breve": uma promessa que nao se vai cumprir e pior do que
 * nao prometer nada.
 */
export const WHATSAPP_ATIVO = false;

/** O que esta incluido em todos os planos, por ordem de importancia. */
export const INCLUIDO_EM_TODOS = [
  { texto: "Marcações online com endereço próprio" },
  { texto: "Agenda por barbeiro, com notificações" },
  { texto: "Clientes, histórico e aniversários" },
  { texto: "Caixa, checkout e métodos de pagamento" },
  { texto: "Comissões por profissional" },
  { texto: "Produtos, stock e fornecedores" },
  { texto: "Relatórios e Excel para o contabilista" },
  { texto: "Cartão de fidelidade digital" },
  { texto: "Controlo total do design da tua app: cores, tipografia, logótipo, capa e galeria, mudados por ti" },
  { texto: "Avisos ao cliente antes do corte: notificação no telemóvel, ou email. Sem custo por mensagem" },
];

// Compatibilidade: havia um preco unico e varias paginas liam estas duas
// constantes. Continuam a existir, a apontar para o plano de entrada, para
// nenhuma pagina ficar a mostrar um preco que ja nao existe.
export const PRECO_MENSAL = PLANO_BASE.preco;
export const PRECO_MENSAL_TEXTO = PLANO_BASE.precoTexto;

// Google Analytics: vazio ate haver uma propriedade criada. Com isto vazio
// nao se carrega nada — nem o script, nem cookies. Preenche-se com "G-…".
export const GA_ID = "";

/*
 * O que a app faz hoje. Esta lista alimenta os dados estruturados
 * (schema.org) e a pagina de funcionalidades. Verificada contra o codigo do
 * painel e do site do cliente a 11 de setembro de 2026.
 */
export const FUNCIONALIDADES = [
  "Marcações online 24/7 pelo site da barbearia, em três toques",
  "Endereço próprio com o nome, logótipo e cores da barbearia",
  "Editor de design no painel: o dono escolhe cores, tipografia, capa, galeria e o que aparece — e vê o resultado num telemóvel antes de publicar",
  "Site de marcações instalável no telemóvel, sem lojas de apps",
  "Agenda por barbeiro, vista do dia e lista",
  "Notificação no telemóvel do barbeiro a cada marcação nova",
  "Confirmação em dois toques ou confirmação automática",
  "Cliente avisado no telemóvel quando a marcação é confirmada ou cancelada",
  "Cancelamento pelo cliente até ao prazo definido pela barbearia",
  "Sem marcações sobrepostas: garantido pela base de dados",
  "Reagendamento e marcações manuais no painel",
  "Lista de espera",
  "Ficha de cliente com histórico, gastos e carimbos",
  "Aniversários dos clientes",
  "Barbeiros com horários próprios, comissão em percentagem e desempenho",
  "Cartão de fidelidade digital com corte grátis",
  "Checkout com método de pagamento, desconto e gorjeta",
  "Comissões calculadas e guardadas no momento do checkout",
  "Abertura e fecho de caixa por dia, entradas e saídas, histórico",
  "Conta-corrente por cliente e por barbeiro, fluxo de caixa",
  "Produtos, stock, stock mínimo, movimentos e fornecedores",
  "Relatórios de marcações, clientes, profissionais, financeiro, serviços e produtos",
  "Relatório mensal em Excel pronto para o contabilista",
  "Dados guardados na União Europeia, isolados por barbearia",
  "Demonstração pública ao vivo, sem registo",
];

const enderecoLd = {
  "@type": "PostalAddress",
  streetAddress: SITE.morada.rua,
  postalCode: SITE.morada.codigoPostal,
  addressLocality: SITE.morada.cidade,
  addressCountry: SITE.morada.pais,
};

export function organizacaoLd() {
  return {
    "@type": "Organization",
    "@id": `${SITE.url}/#organization`,
    name: SITE.nome,
    alternateName: SITE.produto,
    url: SITE.url,
    logo: { "@type": "ImageObject", url: SITE.logo, width: 641, height: 240 },
    image: SITE.imagem,
    description: SITE.descricao,
    email: SITE.email,
    telephone: SITE.telefoneE164,
    address: enderecoLd,
    areaServed: { "@type": "Country", name: "Portugal" },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      telephone: SITE.telefoneE164,
      email: SITE.email,
      availableLanguage: ["Portuguese"],
      areaServed: "PT",
    },
    sameAs: [SITE.instagram],
  };
}

export function websiteLd() {
  return {
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    url: SITE.url,
    name: SITE.nome,
    alternateName: [SITE.produto, "Convecta Booking — marcações online para barbearias"],
    description: SITE.descricao,
    inLanguage: "pt-PT",
    publisher: { "@id": `${SITE.url}/#organization` },
  };
}

export function softwareLd() {
  return {
    "@type": "SoftwareApplication",
    "@id": `${SITE.url}/#software`,
    name: SITE.produto,
    alternateName: "Convecta",
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Agendamento online para barbearias",
    operatingSystem: "Web (browser em telemóvel, tablet e computador)",
    url: `${SITE.url}/funcionalidades`,
    image: SITE.imagem,
    description:
      "App de marcações online e software de gestão para barbearias: site de marcações com endereço próprio, agenda por barbeiro com notificações, cartão de fidelidade digital, checkout, caixa, comissões, stock, relatórios e Excel para o contabilista.",
    featureList: FUNCIONALIDADES,
    inLanguage: "pt-PT",
    countryOfOrigin: { "@type": "Country", name: "Portugal" },
    audience: { "@type": "BusinessAudience", audienceType: "Barbearias e barbeiros" },
    // Tres planos: o Google mostra "a partir de" com o intervalo de precos.
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "EUR",
      lowPrice: PLANOS[0].preco.toFixed(2),
      highPrice: PLANOS[PLANOS.length - 1].preco.toFixed(2),
      offerCount: PLANOS.length,
      url: `${SITE.url}/precos`,
      offers: PLANOS.map(pl => ({
        "@type": "Offer",
        name: `Convecta Booking — ${pl.nome}`,
        description: `${pl.profissionaisTexto}. ${pl.resumo}`,
        price: pl.preco.toFixed(2),
        priceCurrency: "EUR",
        url: `${SITE.url}/precos`,
        availability: "https://schema.org/InStock",
        category: "Subscrição mensal por barbearia",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: pl.preco.toFixed(2),
          priceCurrency: "EUR",
          unitText: "mês",
          billingIncrement: 1,
          referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "MON" },
        },
        seller: { "@id": `${SITE.url}/#organization` },
      })),
    },
    provider: { "@id": `${SITE.url}/#organization` },
  };
}

// Caminho de migalhas: [{ nome, caminho }]. O Google mostra-o por baixo do
// titulo em vez do URL cru.
export function migalhasLd(itens) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: itens.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.nome,
      item: `${SITE.url}${it.caminho}`,
    })),
  };
}

export function faqLd(perguntas) {
  return {
    "@type": "FAQPage",
    mainEntity: perguntas.map((p) => ({
      "@type": "Question",
      name: p.q,
      acceptedAnswer: { "@type": "Answer", text: p.a },
    })),
  };
}

// Junta varios blocos num so JSON-LD com @graph, que e como o Google gosta.
export function grafoLd(...blocos) {
  return { "@context": "https://schema.org", "@graph": blocos.filter(Boolean) };
}
