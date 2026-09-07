import React from "react";
import ScrollReveal from "@/components/ScrollReveal";

export default function Privacidade() {
  return (
    <div>
      <section style={{ backgroundColor: "#1a1a1a" }} className="pt-32 pb-16 lg:pt-40 lg:pb-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center">
          <ScrollReveal>
            <h1 className="font-heading text-3xl lg:text-4xl text-white">Política de Privacidade</h1>
          </ScrollReveal>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-12 space-y-6 text-sm text-dark/60 leading-relaxed">
          <p>
            A Convecta compromete-se a proteger a privacidade e os dados pessoais dos seus
            clientes, parceiros e visitantes do website, garantindo o tratamento responsável das
            informações recolhidas no âmbito da prestação dos seus serviços digitais.
          </p>
          <p>
            No decorrer da atividade da empresa, poderão ser recolhidos dados pessoais necessários
            para contacto, desenvolvimento dos websites e prestação dos serviços associados ao
            Convecta Care. Estes dados poderão incluir nome, email, contacto telefónico, morada
            profissional, informações comerciais da empresa cliente e restantes elementos
            fornecidos voluntariamente durante o processo de onboarding ou comunicação com a
            Convecta.
          </p>
          <p>
            Os dados recolhidos serão utilizados exclusivamente para fins relacionados com
            comunicação profissional, prestação dos serviços contratados, suporte técnico,
            faturação e acompanhamento operacional dos projetos desenvolvidos pela empresa. A
            Convecta compromete-se a não vender, partilhar ou disponibilizar dados pessoais a
            terceiros sem consentimento prévio do titular, exceto quando legalmente exigido ou
            necessário para execução técnica dos serviços contratados.
          </p>
          <p>
            Os websites desenvolvidos pela Convecta poderão incluir formulários de contacto,
            integração com serviços Google, cookies técnicos e ferramentas básicas de
            monitorização de tráfego e funcionamento do website. Sempre que aplicável, os websites
            incluirão mecanismos de consentimento relativamente à utilização de cookies e recolha
            de dados, em conformidade com o Regulamento Geral sobre a Proteção de Dados (RGPD).
          </p>
          <p>
            A Convecta compromete-se a implementar medidas razoáveis de proteção e segurança da
            informação, procurando evitar acessos não autorizados, perda de dados ou utilização
            indevida das informações fornecidas pelos clientes.
          </p>
          <p>
            Os titulares dos dados poderão, a qualquer momento, solicitar acesso, alteração ou
            eliminação das informações pessoais armazenadas pela empresa, através de contacto
            direto para os canais oficiais da Convecta.
          </p>
          <p>
            A empresa poderá recorrer a plataformas externas necessárias ao funcionamento
            operacional dos serviços, incluindo Wix, Google Workspace e ferramentas complementares
            de gestão e comunicação. Estas plataformas possuem as suas próprias políticas de
            privacidade e tratamento de dados, sendo utilizadas apenas na medida necessária para
            execução dos serviços contratados.
          </p>
          <p>
            A Convecta reserva-se o direito de atualizar esta política de privacidade sempre que
            necessário para garantir conformidade legal, melhoria operacional ou adaptação a
            futuras alterações regulamentares relacionadas com proteção de dados.
          </p>
          <p>
            A utilização dos serviços da Convecta pressupõe a aceitação das condições descritas
            nesta política de privacidade e tratamento de dados pessoais.
          </p>
        </div>
      </section>
    </div>
  );
}
