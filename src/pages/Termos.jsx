import React from "react";
import { Link } from "react-router-dom";
import Seo from "@/components/Seo";
import ScrollReveal from "@/components/ScrollReveal";
import { SITE, PLANOS, DESCONTO_ANUAL, migalhasLd } from "@/lib/seo";

/*
 * Termos e condicoes da Convecta Booking.
 *
 * O texto anterior regulava a criacao de websites e o "Convecta Care" —
 * um servico que ja nao existe. Este regula o que existe: uma subscricao
 * mensal de software para barbearias.
 *
 * Duas coisas aqui tem de bater certo com o contrato que o Diogo assina com
 * cada barbearia: o periodo minimo (aqui: nenhum) e o pre-aviso de
 * cancelamento (aqui: ate ao fim do mes em curso). Se o contrato disser
 * outra coisa, muda-se aqui ou muda-se la — nao podem dizer coisas
 * diferentes. Texto a rever por advogado antes de ser dado por definitivo.
 */

const ATUALIZADO = "21 de setembro de 2026";

function H2({ children }) {
  return <h2 className="font-heading text-2xl text-ink mt-10 mb-3">{children}</h2>;
}

export default function Termos() {
  return (
    <div>
      <Seo
        titulo="Termos e Condições"
        descricao="As condições de utilização da Convecta Booking: o que inclui a subscrição mensal, preço, pagamento, cancelamento sem fidelização, o período de experiência, e as responsabilidades da barbearia e da Convecta."
        caminho="/termos"
        ld={[migalhasLd([{ nome: "Início", caminho: "/" }, { nome: "Termos e Condições", caminho: "/termos" }])]}
      />

      <section style={{ backgroundColor: "var(--cv-ground)" }} className="pt-32 pb-16 lg:pt-40 lg:pb-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center">
          <ScrollReveal>
            <h1 className="font-heading text-3xl lg:text-4xl text-ink">Termos e Condições</h1>
            <p className="text-ink-3 text-sm mt-3">Última atualização: {ATUALIZADO}</p>
          </ScrollReveal>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-12 text-sm text-ink-2 leading-relaxed">
          <p>
            Estes termos regulam a utilização da Convecta Booking — o software de marcações online e gestão para barbearias disponibilizado por {SITE.titular}, empresário em nome individual, NIF {SITE.nif}, sob a marca Convecta ({SITE.morada.rua}, {SITE.morada.codigoPostal} {SITE.morada.cidade}, Portugal; {SITE.email}; {SITE.telefone}) — e deste site. Ao criar uma conta, aceitas o que aqui está escrito. Escrevemo-lo para ser lido, não para ser assinado sem ler.
          </p>

          <H2>1. O que é o serviço</H2>
          <p>
            A Convecta Booking é um serviço de software por subscrição ("SaaS"). Inclui: um site de marcações online com endereço próprio em {SITE.dominioApps} e a marca da barbearia, onde os clientes da barbearia marcam; um painel de gestão para a barbearia (agenda, clientes, equipa, checkout, caixa, comissões, produtos e stock, cartão de fidelidade, relatórios e exportação para o contabilista); notificações no telemóvel; alojamento, manutenção e atualizações; e suporte. A lista exata do que existe está na página de <Link to="/funcionalidades" className="underline underline-offset-2 text-ink">funcionalidades</Link>, que prevalece sobre qualquer outra descrição.
          </p>
          <p>
            O serviço não inclui: lembretes por SMS, pagamentos online pelos clientes da barbearia, nem um domínio próprio da barbearia. Se algum destes vier a existir, será apresentado como opção, com o respetivo preço, antes de ser cobrado. Os avisos por WhatsApp ao cliente estão previstos em todos os planos e são anunciados no site como “em breve”: enquanto essa indicação se mantiver, não fazem parte do serviço contratado e a sua ausência não dá direito a redução do preço.
          </p>

          <H2>2. Conta e acesso</H2>
          <p>
            A conta é criada pela Convecta em nome da barbearia, com as credenciais entregues ao responsável. A barbearia é responsável por guardar as suas palavras-passe, por quem as usa e por tudo o que é feito com a sua conta. Se suspeitares de acesso indevido, avisa-nos de imediato e alteramos as credenciais.
          </p>

          <H2>3. Preço e pagamento</H2>
          <p>
            O preço depende do plano contratado, por barbearia. A Convecta está no regime de isenção de IVA (artigo 53.º do CIVA): os preços são finais e a fatura não acresce IVA. Se o enquadramento mudar, o IVA passa a acrescer à taxa legal a partir do período seguinte, com aviso prévio. Os planos:{" "}
            {PLANOS.map((pl, i) => (
              <React.Fragment key={pl.id}>
                {i > 0 ? (i === PLANOS.length - 1 ? " e " : ", ") : ""}
                <strong>{pl.nome}</strong> {pl.precoTexto}/mês ({pl.profissionaisTexto.toLowerCase()})
              </React.Fragment>
            ))}. O plano escolhido e o número de profissionais incluídos ficam registados na adesão.
            Não há taxa de adesão, não há comissões sobre as marcações e não há limite de marcações
            nem de clientes. O que cada plano limita é o número de profissionais; a barbearia pode
            mudar de plano a qualquer momento, com o preço novo a aplicar-se ao período seguinte.
          </p>
          <p>
            O pagamento pode ser mensal ou anual. No pagamento anual, os doze meses são faturados de
            uma vez, com um desconto de {Math.round(DESCONTO_ANUAL * 100)} % sobre o preço mensal; nesse caso, e só nesse caso, existe um
            compromisso de doze meses e o cancelamento antecipado não dá direito a devolução do
            período já faturado. O pagamento é feito por cartão, através da Stripe; a Convecta nunca vê nem guarda os dados do cartão. A fatura é emitida com os dados fornecidos no registo.
          </p>
          <p>
            Em caso de atraso no pagamento superior a 15 dias, e depois de aviso, a Convecta pode suspender o acesso ao painel e ao site de marcações até à regularização. Os dados não são apagados durante a suspensão.
          </p>
          <p>
            Se o preço mudar, a barbearia é avisada por e-mail com pelo menos 30 dias de antecedência e pode cancelar antes de o novo preço entrar em vigor.
          </p>

          <H2>4. Duração e cancelamento</H2>
          <p>
            No pagamento mensal não há período mínimo de permanência nem fidelização: a barbearia pode cancelar quando quiser, por e-mail ou telefone, com efeito no fim do mês em curso; não há devolução de mensalidades já faturadas. No pagamento anual, o compromisso é de doze meses, nos termos da cláusula 3. A Convecta pode cessar o serviço com 60 dias de aviso, ou de imediato em caso de uso abusivo, ilegal ou de incumprimento grave. Quando o serviço termina, a barbearia pode pedir uma cópia dos seus dados (em Excel) e, depois, o seu apagamento.
          </p>

          <H2>5. O que a barbearia se compromete a fazer</H2>
          <p>
            Usar o serviço para gerir a sua própria atividade, de forma lícita. Fornecer dados verdadeiros. Informar os seus clientes de que as marcações e os dados são geridos com a Convecta, nos termos da <Link to="/privacidade" className="underline underline-offset-2 text-ink">política de privacidade</Link>. Não tentar aceder a dados de outras barbearias, não sobrecarregar o serviço deliberadamente e não o usar para enviar comunicações não solicitadas.
          </p>
          <p>
            <strong className="text-ink">Pagamentos por MB WAY.</strong> Se a barbearia ligar o pagamento por MB WAY, os clientes enviam o dinheiro diretamente para o número que ela indicar. A Convecta não intermedeia nem recebe esses pagamentos: limita-se a mostrar o número e o valor e a registar o que a barbearia confirmar. Cabe à barbearia confirmar só os pagamentos que efetivamente recebeu, emitir a respetiva fatura, informar os clientes, antes de pagarem, das condições de cancelamento e devolução, fazer as devoluções que forem devidas, e respeitar os limites e as condições do seu banco e do serviço MB WAY. A Convecta não responde por pagamentos não recebidos, enviados para o número errado ou por devolver.
          </p>

          <H2>6. Dados dos clientes da barbearia</H2>
          <p>
            Os dados dos clientes finais (nome, contacto, marcações, carimbos, notas) pertencem à barbearia, que é a responsável pelo seu tratamento. A Convecta trata-os como subcontratante, apenas para prestar o serviço e segundo as instruções da barbearia, guarda-os em servidores na União Europeia, não os usa para fins próprios nem os cede a terceiros, e apaga-os quando o serviço termina, depois de os devolver se a barbearia o pedir. Estes termos, juntamente com a política de privacidade, constituem o acordo de subcontratação previsto no artigo 28.º do RGPD; a pedido, formalizamos um documento autónomo.
          </p>

          <H2>7. Disponibilidade, suporte e alterações</H2>
          <p>
            Fazemos o que é razoável para que o serviço esteja sempre disponível, mas não garantimos ausência total de falhas: dependemos de fornecedores de alojamento e de ligações de internet que não controlamos, e há manutenções, que anunciamos quando previsíveis. O suporte é prestado por telefone e WhatsApp, em dias úteis, com resposta habitual até 24 horas úteis. O serviço vai mudando — acrescentamos e melhoramos funcionalidades sem custo adicional; se alguma vez retirarmos algo que uma barbearia use, avisamos com antecedência.
          </p>

          <H2>8. Propriedade intelectual</H2>
          <p>
            O software, o design e os textos da Convecta Booking são propriedade da Convecta. A barbearia recebe uma licença de utilização, não exclusiva e não transmissível, enquanto a subscrição estiver ativa. A marca, o logótipo, as fotografias e os dados da barbearia continuam a ser dela. A Convecta pode indicar o nome da barbearia como cliente, salvo pedido em contrário.
          </p>

          <H2>9. O período de experiência</H2>
          <p>
            Criar a conta e montar a barbearia não custa nada e não exige cartão. Para começar a receber marcações, a barbearia regista um cartão e entra num período de experiência de 7 dias, durante o qual não é cobrado nenhum valor. No fim desses 7 dias, se a subscrição não tiver sido cancelada, o cartão é cobrado pelo plano escolhido e a mensalidade passa a contar a partir daí. O cancelamento durante o período de experiência faz-se pela própria barbearia, no painel, e não tem custo. Uma barbearia que não registe cartão mantém o acesso ao painel, mas não recebe marcações.
          </p>

          <H2>10. Responsabilidade</H2>
          <p>
            A Convecta responde pelos danos que causar por dolo ou negligência grave. Não responde por lucros cessantes, por marcações perdidas devido a falhas de terceiros (internet, alojamento, telemóvel do cliente), por dados introduzidos erradamente pela barbearia, nem por danos indiretos. Em qualquer caso, a responsabilidade total da Convecta perante uma barbearia fica limitada ao valor pago por essa barbearia nos 12 meses anteriores ao facto. Nada nestes termos limita direitos que a lei não permita limitar.
          </p>

          <H2>11. Lei e foro</H2>
          <p>
            Aplica-se a lei portuguesa. Para qualquer litígio é competente o tribunal da comarca do Porto, sem prejuízo dos direitos do consumidor quando aplicáveis. Em caso de litígio de consumo, pode recorrer-se a uma entidade de resolução alternativa de litígios (lista em consumidor.gov.pt). Livro de reclamações eletrónico em livroreclamacoes.pt.
          </p>

          <H2>12. Alterações a estes termos</H2>
          <p>
            Podemos atualizar estes termos. Alterações relevantes são comunicadas por e-mail às barbearias clientes com 30 dias de antecedência; continuar a usar o serviço depois dessa data vale como aceitação. A data no topo indica a versão em vigor.
          </p>
        </div>
      </section>
    </div>
  );
}
