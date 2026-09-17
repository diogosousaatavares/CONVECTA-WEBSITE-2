import React from "react";
import { Link } from "react-router-dom";
import Seo from "@/components/Seo";
import ScrollReveal from "@/components/ScrollReveal";
import { SITE, migalhasLd } from "@/lib/seo";

/*
 * Politica de privacidade.
 *
 * O texto anterior era do negocio antigo (websites, Convecta Care, Wix). Este
 * descreve o que a Convecta faz hoje: um site e duas apps, uma base de dados
 * na Uniao Europeia, tres tipos de pessoas com dados la dentro (quem visita
 * o site, as barbearias clientes, e os clientes das barbearias).
 *
 * E um texto escrito com cuidado, nao um parecer juridico. Antes de o dar
 * por definitivo deve passar por um advogado — sobretudo a parte da
 * subcontratacao (art. 28.º do RGPD), que as barbearias podem pedir por
 * escrito.
 */

const ATUALIZADO = "11 de setembro de 2026";

function H2({ children }) {
  return <h2 className="font-heading text-2xl text-ink mt-10 mb-3">{children}</h2>;
}

export default function Privacidade() {
  return (
    <div>
      <Seo
        titulo="Política de Privacidade"
        descricao="Que dados a Convecta recolhe no site, nas apps de marcações e no painel das barbearias, para quê, onde ficam guardados (União Europeia) e como exercer os teus direitos."
        caminho="/privacidade"
        ld={[migalhasLd([{ nome: "Início", caminho: "/" }, { nome: "Política de Privacidade", caminho: "/privacidade" }])]}
      />

      <section style={{ backgroundColor: "var(--cv-ground)" }} className="pt-32 pb-16 lg:pt-40 lg:pb-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center">
          <ScrollReveal>
            <h1 className="font-heading text-3xl lg:text-4xl text-ink">Política de Privacidade</h1>
            <p className="text-ink-3 text-sm mt-3">Última atualização: {ATUALIZADO}</p>
          </ScrollReveal>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-12 text-sm text-ink-2 leading-relaxed">
          <p>
            A Convecta leva a sério os dados das pessoas que passam por aqui: quem visita este site, as barbearias que usam a Convecta Booking, e os clientes dessas barbearias que marcam pelo site delas. Esta política explica, em linguagem corrente, que dados existem, para que servem, onde ficam e o que podes fazer em relação a eles. Cumpre o Regulamento Geral sobre a Proteção de Dados (RGPD) e a Lei n.º 58/2019.
          </p>

          <H2>1. Quem é responsável</H2>
          <p>
            O responsável pelo tratamento é {SITE.titular}, empresário em nome individual, NIF {SITE.nif}, que opera sob a marca Convecta, com morada em {SITE.morada.rua}, {SITE.morada.codigoPostal} {SITE.morada.cidade}, Portugal. Para qualquer assunto relacionado com dados pessoais, escreve para <a href={`mailto:${SITE.email}`} className="underline underline-offset-2 text-ink">{SITE.email}</a> ou liga para {SITE.telefone}.
          </p>

          <H2>2. Três situações diferentes</H2>
          <p>
            <strong className="text-ink">a) Visitas este site (convecta.pt).</strong> Se preencheres o formulário de contacto, guardamos o que escreveres: nome, nome da barbearia, telemóvel, e-mail e mensagem. Servem para te responder e para falarmos contigo sobre a Convecta — a finalidade é essa e mais nenhuma. Fundamento: diligências pré-contratuais a teu pedido e o nosso interesse legítimo em responder a quem nos contacta. Guardamos estes pedidos até 12 meses depois do último contacto; se te tornares cliente, passam para a tua ficha.
          </p>
          <p>
            <strong className="text-ink">b) A tua barbearia usa a Convecta Booking.</strong> Para criar e manter a tua conta tratamos os dados do negócio e do responsável: nome, NIF, morada, e-mail, telemóvel, dados de faturação e o histórico de pagamentos da mensalidade. Fundamento: execução do contrato e obrigações legais (faturação e contabilidade). Os dados de faturação são conservados pelos prazos exigidos por lei, mesmo depois de deixares de ser cliente.
          </p>
          <p>
            <strong className="text-ink">c) És cliente de uma barbearia que usa a Convecta.</strong> Quando marcas no site de uma barbearia, os teus dados — nome, telemóvel, e-mail, as tuas marcações, os carimbos do cartão de fidelidade e, se a barbearia os registar, notas sobre as tuas preferências — pertencem à barbearia. A barbearia é a responsável pelo tratamento; a Convecta é a subcontratante que guarda e processa esses dados por conta dela, só para fazer a app funcionar. Nunca usamos os dados dos clientes das barbearias para fins nossos, não os contactamos e não os vendemos. Para exercer os teus direitos sobre esses dados, fala com a barbearia; se precisares, ajudamos.
          </p>

          <H2>3. Notificações no telemóvel</H2>
          <p>
            Se aceitares receber notificações (no site da barbearia ou no painel), guardamos o identificador técnico da subscrição, que permite entregar a mensagem ao teu dispositivo. Não contém o teu nome nem lê nada no teu telemóvel. Podes desligar as notificações a qualquer momento nas definições do browser ou da app, e a subscrição é apagada.
          </p>

          <H2>4. Onde ficam os dados</H2>
          <p>
            A base de dados da Convecta está alojada na Supabase, em servidores na União Europeia (região da Irlanda). Este site e as apps são servidos pela Vercel. Cada barbearia está isolada das outras por regras de acesso na própria base de dados: uma barbearia só vê os seus clientes e as suas marcações, e cada cliente só vê as suas. As ligações são cifradas (HTTPS). O e-mail da Convecta é prestado por um fornecedor de correio eletrónico; a faturação passa pelo nosso contabilista, vinculado a sigilo.
          </p>
          <p>
            Estes fornecedores são subcontratantes no sentido do RGPD e estão obrigados, por contrato, a tratar os dados apenas segundo as nossas instruções e com medidas de segurança adequadas. Não transferimos dados para fora da União Europeia, salvo se um fornecedor o fizer ao abrigo das garantias previstas no RGPD (por exemplo, cláusulas contratuais-tipo).
          </p>

          <H2>5. O registo e o pagamento</H2>
          <p>
            Ao criares a conta da tua barbearia em convecta.pt/comecar, guardamos o nome da barbearia, o teu nome, e-mail, telefone, morada e NIF. Servem para criar a barbearia, para te contactar sobre ela e para emitir a fatura — a finalidade é essa. Fundamento: execução do contrato.
          </p>
          <p>
            O pagamento é feito por cartão através da Stripe Payments Europe, Ltd. (Irlanda), que é subcontratante no sentido do RGPD. Os dados do cartão são escritos numa página da Stripe e nunca passam pelos nossos servidores; a Convecta guarda apenas um identificador do cliente e da subscrição na Stripe, o estado do pagamento e as datas relevantes. A Stripe trata os dados segundo a sua própria política de privacidade e as garantias do RGPD.
          </p>

          <H2>6. Cookies e armazenamento no browser</H2>
          <p>
            Este site não usa cookies de publicidade nem de rastreio entre sites. Usa o armazenamento do browser para coisas pequenas e técnicas: lembrar que já respondeste ao aviso de cookies e manter a sessão iniciada nas apps. Se um dia ligarmos uma ferramenta de estatísticas (como o Google Analytics), atualizamos esta página e pedimos consentimento antes de a carregar.
          </p>

          <H2>7. Durante quanto tempo</H2>
          <p>
            Pedidos de contacto: até 12 meses após o último contacto. Dados de conta da barbearia: enquanto for cliente, e depois pelos prazos legais de faturação. Dados dos clientes das barbearias: enquanto a barbearia for cliente da Convecta; quando uma barbearia sai, os seus dados são apagados a pedido, depois de lhe entregarmos uma cópia se a quiser. Subscrições de notificações: até seres tu a desligá-las ou até deixarem de funcionar.
          </p>

          <H2>8. Os teus direitos</H2>
          <p>
            Tens direito a saber que dados temos sobre ti, a corrigi-los, a pedir que os apaguemos, a limitar ou opor-te ao tratamento, e a recebê-los num formato que possas levar para outro lado. Para isso escreve para <a href={`mailto:${SITE.email}`} className="underline underline-offset-2 text-ink">{SITE.email}</a>; respondemos no prazo de um mês. Se achares que não tratámos bem os teus dados, podes apresentar reclamação à Comissão Nacional de Proteção de Dados (CNPD), em cnpd.pt.
          </p>

          <H2>9. Segurança</H2>
          <p>
            Usamos as medidas que são razoáveis para uma empresa da nossa dimensão: acesso à base de dados restrito por regras por linha, chaves de acesso separadas por função, ligações cifradas, palavras-passe guardadas de forma irreversível, cópias de segurança e registo de quem apaga o quê. Nenhum sistema é infalível; se houver um incidente que afete os teus dados, avisamos-te e avisamos a CNPD nos prazos legais.
          </p>

          <H2>10. Menores</H2>
          <p>
            Os serviços da Convecta destinam-se a empresas e a adultos. Uma barbearia pode registar marcações de menores acompanhados; a responsabilidade por esses dados é dela, como responsável pelo tratamento.
          </p>

          <H2>11. Alterações</H2>
          <p>
            Quando esta política mudar, a data no topo muda também. Se a alteração for relevante para as barbearias clientes, avisamo-las por e-mail antes de entrar em vigor.
          </p>

          <p className="mt-10 text-xs text-ink-3">
            Ver também os <Link to="/termos" className="underline underline-offset-2">Termos e Condições</Link>.
          </p>
        </div>
      </section>
    </div>
  );
}
