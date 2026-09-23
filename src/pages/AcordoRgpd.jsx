import React from "react";
import { Link } from "react-router-dom";
import Seo from "@/components/Seo";
import ScrollReveal from "@/components/ScrollReveal";
import { SITE, migalhasLd, VERSAO_ACORDO } from "@/lib/seo";

/*
 * Acordo de subcontratação (art. 28.º do RGPD) entre a Convecta e cada
 * barbearia. É aceite com uma caixa no registo (/comecar) ou no painel, e
 * guarda-se a versão e a data em businesses.settings.acordoRgpd.
 *
 * Se mudar alguma coisa de fundo (um fornecedor novo, um prazo), sobe-se a
 * VERSAO e as barbearias voltam a aceitar. Os fornecedores (subcontratantes
 * ulteriores) têm de bater certo com o que se usa de facto.
 *
 * Escrito com cuidado, mas é para ser revisto por um advogado.
 */
const DATA = "23 de setembro de 2026";

function H2({ children }) {
  return <h2 className="font-heading text-2xl text-ink mt-10 mb-3">{children}</h2>;
}
const P = ({ children }) => <p className="mt-3">{children}</p>;
const L = ({ children }) => <ul className="list-disc pl-5 mt-3 space-y-1.5">{children}</ul>;

const FORNECEDORES = [
  ["Supabase, Inc.", "Base de dados, contas e ficheiros (fotografias, logótipos)", "União Europeia — Irlanda"],
  ["Vercel, Inc.", "Alojamento das aplicações (o site da barbearia e o painel)", "UE e EUA — cláusulas contratuais-tipo / EU-US Data Privacy Framework"],
  ["Resend, Inc.", "Envio de e-mails (confirmação de e-mail, lembretes de marcação)", "EUA — cláusulas contratuais-tipo / EU-US Data Privacy Framework"],
  ["Apple, Google e Mozilla", "Entrega das notificações no telemóvel (o conteúdo vai cifrado; estes serviços não o conseguem ler)", "Serviços de notificações dos sistemas operativos"],
];

export default function AcordoRgpd() {
  return (
    <div>
      <Seo
        titulo="Acordo de subcontratação (RGPD)"
        descricao="O acordo de tratamento de dados entre a Convecta e cada barbearia, nos termos do artigo 28.º do RGPD: que dados, para quê, com que segurança, com que fornecedores e o que acontece quando o serviço termina."
        caminho="/acordo-rgpd"
        ld={[migalhasLd([{ nome: "Início", caminho: "/" }, { nome: "Acordo de subcontratação", caminho: "/acordo-rgpd" }])]}
      />

      <section style={{ backgroundColor: "var(--cv-ground)" }} className="pt-32 pb-16 lg:pt-40 lg:pb-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center">
          <ScrollReveal>
            <h1 className="font-heading text-3xl lg:text-4xl text-ink">Acordo de subcontratação de dados</h1>
            <p className="text-ink-3 text-sm mt-3">Artigo 28.º do RGPD · Versão {VERSAO_ACORDO} · {DATA}</p>
          </ScrollReveal>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-12 text-sm text-ink-2 leading-relaxed">
          <p>
            Este acordo faz parte dos <Link to="/termos" className="underline underline-offset-2 text-ink">Termos e Condições</Link> e
            regula a forma como a Convecta trata os dados pessoais dos clientes de cada barbearia. É aceite pela barbearia ao criar
            a conta (ou no painel, para quem já a tinha), e fica registada a versão e a data da aceitação.
          </p>

          <H2>1. As partes</H2>
          <L>
            <li><strong className="text-ink">Responsável pelo tratamento:</strong> a barbearia que usa a Convecta (a «Barbearia»), identificada na sua conta.</li>
            <li><strong className="text-ink">Subcontratante:</strong> {SITE.titular}, empresário em nome individual, NIF {SITE.nif}, que opera sob a marca Convecta, com morada em {SITE.morada.rua}, {SITE.morada.codigoPostal} {SITE.morada.cidade}, Portugal ({SITE.email}) — a «Convecta».</li>
          </L>

          <H2>2. O que é tratado e para quê</H2>
          <P><strong className="text-ink">Finalidade:</strong> prestar o serviço contratado — o site de marcações da Barbearia, a agenda, os avisos aos clientes, o cartão de fidelidade, a caixa e os relatórios. A Convecta não trata estes dados para nenhuma outra finalidade.</P>
          <P><strong className="text-ink">Titulares:</strong> os clientes da Barbearia, e os profissionais que ela regista.</P>
          <P><strong className="text-ink">Dados:</strong> nome, telemóvel, e-mail, data de nascimento (se registada), marcações e respetivo histórico, pagamentos registados na caixa, carimbos e prémios do cartão de fidelidade, avaliações, notas escritas pela Barbearia, e os dados técnicos necessários às notificações no telemóvel. Dos profissionais: nome, fotografia, contactos, horários e comissões.</P>
          <P><strong className="text-ink">Duração:</strong> enquanto a Barbearia tiver conta ativa, e depois o tempo estritamente necessário para cumprir a cláusula 8.</P>

          <H2>3. O que a Convecta se compromete a fazer</H2>
          <L>
            <li>Tratar os dados apenas segundo as instruções da Barbearia — que são as que ela dá ao usar a aplicação — e avisá-la se achar que uma instrução viola a lei.</li>
            <li>Não usar os dados para fins próprios, não os vender, não os ceder, e não contactar os clientes da Barbearia por iniciativa própria.</li>
            <li>Garantir que quem tem acesso aos dados está obrigado a confidencialidade. Hoje, só o titular da Convecta tem esse acesso, e só quando é preciso para dar suporte ou corrigir uma avaria.</li>
            <li>Aplicar as medidas de segurança da cláusula 5.</li>
            <li>Ajudar a Barbearia a responder aos pedidos dos seus clientes (acesso, retificação, apagamento, portabilidade, oposição), nomeadamente exportando ou apagando os dados de um cliente quando ela o pedir.</li>
            <li>Ajudar a Barbearia a cumprir as suas obrigações de segurança, de avaliação de impacto e de notificação de violações, na medida do que a Convecta sabe e controla.</li>
            <li>Pôr à disposição da Barbearia a informação necessária para demonstrar o cumprimento deste acordo, e responder às suas perguntas sobre o tratamento.</li>
          </L>

          <H2>4. O que a Barbearia se compromete a fazer</H2>
          <L>
            <li>Ter fundamento legal para tratar os dados dos seus clientes e informá-los desse tratamento (o site de marcações da Barbearia mostra uma ligação à política de privacidade).</li>
            <li>Não registar na aplicação dados que não precisa — em particular, dados de saúde ou outras categorias especiais (artigo 9.º do RGPD) nas notas dos clientes.</li>
            <li>Guardar em segurança os acessos ao painel e retirar o acesso a quem deixar de trabalhar na Barbearia.</li>
            <li>Avisar a Convecta se souber de um acesso indevido à sua conta.</li>
          </L>

          <H2>5. Segurança</H2>
          <L>
            <li>Base de dados alojada na União Europeia (Irlanda), com cópias de segurança diárias.</li>
            <li>Cada barbearia está separada das outras por regras de acesso na própria base de dados: uma barbearia só vê os seus clientes e as suas marcações, e cada cliente só vê as suas.</li>
            <li>Todas as ligações são cifradas (HTTPS). As palavras-passe são guardadas cifradas e ninguém as consegue ler, nem a Convecta.</li>
            <li>Acesso de administração protegido com autenticação em dois passos.</li>
            <li>As chaves de acesso aos fornecedores ficam fora do código e nunca chegam ao telemóvel ou ao browser.</li>
          </L>

          <H2>6. Fornecedores (subcontratantes ulteriores)</H2>
          <P>A Barbearia autoriza a Convecta a recorrer aos fornecedores abaixo. Cada um está vinculado, por contrato, a obrigações de proteção de dados equivalentes às deste acordo.</P>
          <div className="overflow-x-auto mt-4">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-black/10">
                  <th className="py-2 pr-4 text-ink">Fornecedor</th><th className="py-2 pr-4 text-ink">Para quê</th><th className="py-2 text-ink">Onde / garantias</th>
                </tr>
              </thead>
              <tbody>
                {FORNECEDORES.map(([n, f, o]) => (
                  <tr key={n} className="border-b border-black/5 align-top">
                    <td className="py-2 pr-4 text-ink">{n}</td><td className="py-2 pr-4">{f}</td><td className="py-2">{o}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <P>Se a Convecta quiser acrescentar ou trocar um fornecedor, avisa a Barbearia por e-mail com pelo menos 30 dias de antecedência. A Barbearia pode opor-se com fundamento razoável; não havendo solução, pode cancelar o serviço sem custos antes de a mudança acontecer.</P>
          <P>O pagamento da subscrição da Barbearia passa pela Stripe Payments Europe, Ltd. (Irlanda). Esse tratamento diz respeito aos dados da própria Barbearia, não aos dos seus clientes, e está descrito na <Link to="/privacidade" className="underline underline-offset-2 text-ink">Política de Privacidade</Link>.</P>

          <H2>7. Violações de dados</H2>
          <P>Se a Convecta tomar conhecimento de uma violação de dados pessoais que afete a Barbearia, avisa-a sem demora injustificada e, sempre que possível, no prazo de 48 horas — para que a Barbearia possa, se for o caso, notificar a CNPD no prazo de 72 horas. O aviso diz o que aconteceu, que dados e quantas pessoas foram afetadas, as consequências prováveis e o que foi feito para as limitar.</P>

          <H2>8. Quando o serviço termina</H2>
          <P>Quando a conta é cancelada, a Barbearia pode pedir, até 30 dias depois, uma cópia dos seus dados num formato comum (Excel/CSV). Passado esse prazo, a Convecta apaga os dados dos clientes da Barbearia, incluindo das cópias de segurança à medida que estas expiram, salvo o que a lei a obrigue a guardar.</P>

          <H2>9. Responsabilidade, lei e alterações</H2>
          <P>Cada parte responde pelos danos que cause por não cumprir o RGPD ou este acordo, nos termos do artigo 82.º do RGPD e dos Termos e Condições. Este acordo rege-se pela lei portuguesa. Em caso de conflito entre este acordo e os Termos, prevalece este acordo no que diz respeito a dados pessoais.</P>
          <P>Se este acordo mudar, a nova versão é publicada nesta página e a Barbearia é convidada a aceitá-la no painel.</P>

          <p className="mt-10 text-ink-3">Dúvidas: <a href={`mailto:${SITE.email}`} className="underline underline-offset-2 text-ink">{SITE.email}</a>.</p>
        </div>
      </section>
    </div>
  );
}
