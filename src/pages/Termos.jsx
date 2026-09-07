import React from "react";
import ScrollReveal from "@/components/ScrollReveal";

export default function Termos() {
  return (
    <div>
      <section style={{ backgroundColor: "#1a1a1a" }} className="pt-32 pb-16 lg:pt-40 lg:pb-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center">
          <ScrollReveal>
            <h1 className="font-heading text-3xl lg:text-4xl text-white">Termos e Condições</h1>
          </ScrollReveal>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-12 space-y-6 text-sm text-dark/60 leading-relaxed">
          <p>
            O presente documento regula a prestação de serviços digitais entre a Convecta e o
            cliente, estabelecendo de forma clara as condições associadas ao desenvolvimento,
            manutenção e acompanhamento do website contratado.
          </p>
          <p>
            A Convecta compromete-se a desenvolver um website profissional adaptado às
            necessidades do cliente, de acordo com as informações e materiais fornecidos durante
            o processo de onboarding. O cliente reconhece que a qualidade, rapidez e eficiência do
            desenvolvimento dependem diretamente da entrega atempada dos conteúdos necessários,
            incluindo textos, imagens, logótipo, contactos, informações institucionais e
            restantes elementos relevantes para execução do projeto.
          </p>
          <p>
            O serviço poderá ser contratado em duas modalidades distintas. A modalidade de Website
            Completo corresponde a um projeto pontual sem mensalidade associada, incluindo
            desenvolvimento do website, versão mobile, publicação e estrutura institucional
            básica. Já a modalidade Website + Convecta Care inclui pagamento inicial de setup e
            mensalidade recorrente associada ao acompanhamento contínuo do website.
          </p>
          <p>
            O serviço Convecta Care possui duração mínima obrigatória de seis meses, iniciando-se
            após publicação oficial do website. Durante este período, a Convecta compromete-se a
            assegurar manutenção técnica, gestão da plataforma, pequenas alterações operacionais,
            suporte prioritário e acompanhamento contínuo da presença digital do cliente.
          </p>
          <p>
            Consideram-se pequenas alterações incluídas no serviço modificações simples como
            atualização de textos, alteração de contactos, substituição de imagens, ajustes
            básicos de horários, pequenas promoções ou atualizações operacionais semelhantes. Não
            se encontram incluídos redesigns completos, criação de novas páginas extensas,
            alterações estruturais profundas, copywriting, branding, SEO avançado, integração de
            sistemas complexos ou pedidos considerados excessivos relativamente ao âmbito inicial
            do serviço.
          </p>
          <p>
            A Convecta reserva-se o direito de avaliar pedidos adicionais fora do âmbito
            contratado, podendo apresentar orçamento complementar caso as alterações solicitadas
            impliquem aumento significativo do tempo operacional ou complexidade técnica.
          </p>
          <p>
            O cliente compromete-se a efetuar os pagamentos dentro dos prazos acordados. Em caso
            de incumprimento prolongado, a Convecta poderá suspender temporariamente determinados
            serviços associados ao acompanhamento contínuo até regularização da situação.
          </p>
          <p>
            O cliente reconhece que a Convecta não garante resultados comerciais específicos,
            posicionamento em motores de pesquisa, aumento direto de faturação ou crescimento
            automático do negócio através do website desenvolvido. O serviço prestado centra-se na
            modernização da presença digital, melhoria visual, acompanhamento contínuo e
            manutenção operacional do website.
          </p>
          <p>
            Após conclusão do projeto e cumprimento das obrigações financeiras acordadas, o
            cliente poderá utilizar o website desenvolvido no âmbito da sua atividade profissional.
            No entanto, ferramentas, estruturas operacionais, templates internos e metodologias
            utilizadas pela Convecta permanecem propriedade intelectual da empresa.
          </p>
          <p>
            Qualquer cancelamento do serviço Convecta Care antes do período mínimo contratual
            poderá implicar pagamento dos valores remanescentes até conclusão do período mínimo
            acordado. Após esse período, o cliente poderá cancelar o serviço mediante aviso prévio
            acordado entre ambas as partes.
          </p>
          <p>
            A Convecta compromete-se a tratar todos os dados fornecidos pelo cliente de forma
            confidencial e em conformidade com as normas aplicáveis de proteção de dados e RGPD.
          </p>
        </div>
      </section>
    </div>
  );
}
