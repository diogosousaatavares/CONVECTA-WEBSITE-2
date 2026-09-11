/*
 * A verdade do site, num sitio so.
 *
 * Tudo o que o Google, o WhatsApp e o Instagram leem sobre a Convecta sai
 * daqui: nome, contactos, morada, preco, o que a app faz. Quando o preco
 * mudar ou a morada mudar, muda-se aqui e todas as paginas seguem — nao ha
 * um "24,99" escrito a mao em cinco ficheiros a ficar para tras.
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
    "Software de marcações online e gestão para barbearias em Portugal. Os clientes marcam pelo site da barbearia, o barbeiro recebe a notificação no telemóvel e gere agenda, caixa, comissões, stock e cartão de fidelidade num só painel. 24,99 €/mês, sem comissões por marcação.",
  email: "geral@convecta.pt",
  telefone: "+351 912 381 717",
  telefoneE164: "+351912381717",
  morada: { rua: "Rua Faria Guimarães, 69", codigoPostal: "4000-206", cidade: "Porto", pais: "PT" },
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

// O preco. Um so, para todas as barbearias, decidido pelo Diogo. Se um dia
// houver planos, esta constante passa a ser uma lista — mas so um sitio.
export const PRECO_MENSAL = 24.99;
export const PRECO_MENSAL_TEXTO = "24,99 €";

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
    offers: {
      "@type": "Offer",
      price: PRECO_MENSAL.toFixed(2),
      priceCurrency: "EUR",
      url: `${SITE.url}/precos`,
      availability: "https://schema.org/InStock",
      category: "Subscrição mensal por barbearia",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: PRECO_MENSAL.toFixed(2),
        priceCurrency: "EUR",
        unitText: "mês",
        billingIncrement: 1,
        referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "MON" },
      },
      seller: { "@id": `${SITE.url}/#organization` },
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
