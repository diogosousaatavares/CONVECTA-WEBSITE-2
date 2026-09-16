import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Bell, MessageCircle, BarChart3, Palette, Smartphone, Check } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { WHATSAPP_ATIVO } from "@/lib/seo";
import { DEMO_CLIENTE_URL, DEMO_PAINEL_URL } from "@/lib/demo";

/*
 * "Acesso total a tudo" — a seccao logo a seguir ao hero.
 *
 * Nao e uma lista de funcionalidades: sao tres fotografias do produto a
 * funcionar mesmo, tiradas ao telemovel e ao painel. Uma fotografia de uma
 * notificacao que chegou vale mais do que a palavra "notificacoes" numa
 * lista com um visto ao lado.
 *
 * As imagens estao em public/provas e sao capturas reais.
 */

const PROVAS = [
  {
    id: "notificacao",
    Icone: Bell,
    titulo: "O telemóvel toca a cada marcação",
    texto: "A notificação chega ao teu telemóvel no segundo em que o cliente marca — com o nome, o serviço e a hora. Não é email, não é SMS: aparece no ecrã bloqueado.",
    imagem: "/provas/notificacao.jpg",
    larg: 1212, alt2: 424,
    alt: "Aviso da Convecta no telemóvel: nova marcação, Diogo, corte simples, terça-feira 15 de setembro às 10:00",
    formato: "detalhe",
  },
  {
    id: "personalizacao",
    Icone: Palette,
    titulo: "O design é teu, e mudas quando quiseres",
    texto: "Cores, tipografia, logótipo, capa e fotos. Mudas no teu painel e vês o resultado num telemóvel, ao lado, antes de publicar. Não é um pedido que nos fazes.",
    imagem: "/provas/personalizacao.jpg",
    imagemMovel: "/provas/personalizacao-m.jpg",
    larg: 1400, alt2: 872,
    alt: "Página O Meu Site no painel da Convecta, com os campos de cor e a pré-visualização da app num telemóvel",
    formato: "largo",
  },
  {
    id: "instalada",
    Icone: Smartphone,
    titulo: "Fica no ecrã principal, como uma app",
    texto: "A tua e a dos teus clientes. Guarda-se no ecrã principal e abre com um ícone — sem lojas de aplicações, sem downloads, sem esperas.",
    imagem: "/provas/instalada.jpg",
    larg: 680, alt2: 408,
    alt: "Ecrã principal de um iPhone com os dois ícones da Convecta instalados: Marcações e Convecta Gestão",
    formato: "detalhe",
  },
];

const MAIS = [
  { Icone: BarChart3, t: "Relatórios", d: "Receita, ocupação, serviços, profissionais e Excel para o contabilista." },
  { Icone: MessageCircle, t: "Avisos antes do corte", d: "Notificação no telemóvel do cliente, ou email. Sem custo por mensagem." },
];

function Prova({ p, invertido }) {
  const { Icone } = p;
  return (
    <div className={`at-prova ${invertido ? "at-invertida" : ""}`}>
      <div className="at-texto">
        <div className="at-ico"><Icone size={19} strokeWidth={1.7} /></div>
        <h3 className="cv-h3" style={{ fontSize: "1.35rem", marginBottom: 12 }}>{p.titulo}</h3>
        <p className="cv-texto" style={{ fontSize: "0.95rem" }}>{p.texto}</p>
      </div>
      <figure className={`at-figura at-${p.formato}`}>
        {p.imagemMovel ? (
          <picture>
            <source media="(max-width: 860px)" srcSet={p.imagemMovel} />
            <img src={p.imagem} alt={p.alt} width={p.larg} height={p.alt2} loading="lazy" decoding="async" />
          </picture>
        ) : (
          <img src={p.imagem} alt={p.alt} width={p.larg} height={p.alt2} loading="lazy" decoding="async" />
        )}
      </figure>
    </div>
  );
}

export default function AcessoTotal() {
  return (
    <section id="o-que-tens" className="cv-wrap cv-sec">
      <ScrollReveal>
        <p className="cv-olho">Acesso total</p>
        <h2 className="cv-h2">Tudo isto. Em qualquer plano.</h2>
        <p className="cv-texto" style={{ marginTop: 16 }}>
          Não há versão reduzida nem módulos por comprar à parte. Isto não é uma lista de promessas —
          são capturas do produto a funcionar.
        </p>
      </ScrollReveal>

      <div className="at-lista">
        {PROVAS.map((p, i) => (
          <ScrollReveal key={p.id} variant="fadeInUp">
            <Prova p={p} invertido={i % 2 === 1} />
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal>
        <div className="at-mais">
          {MAIS.map(m => (
            <div key={m.t}>
              <div className="at-ico"><m.Icone size={18} strokeWidth={1.7} /></div>
              <h3 className="cv-h3" style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                {m.t}
                {m.emBreve && <span className="cv-em-breve" style={{ marginLeft: 0 }}>Em breve</span>}
              </h3>
              <p className="cv-mini">{m.d}</p>
            </div>
          ))}
          <div>
            <div className="at-ico"><Check size={18} strokeWidth={2} /></div>
            <h3 className="cv-h3">E o resto todo</h3>
            <p className="cv-mini">Agenda, clientes, caixa, comissões, produtos, stock, fidelização.</p>
          </div>
        </div>
      </ScrollReveal>

      {/* O convite: duas portas, não um botão */}
      <ScrollReveal>
        <div className="at-portas">
          <a className="at-porta at-porta-forte" href={DEMO_CLIENTE_URL} target="_blank" rel="noopener">
            <span className="at-porta-olho">Começa aqui</span>
            <span className="at-porta-titulo">Entrar como cliente</span>
            <span className="at-porta-sub">Marca uma consulta na barbearia de demonstração. Três toques.</span>
            <ArrowRight size={18} className="at-seta" />
          </a>
          <a className="at-porta" href={DEMO_PAINEL_URL} target="_blank" rel="noopener">
            <span className="at-porta-olho">O outro lado</span>
            <span className="at-porta-titulo">Entrar como barbeiro</span>
            <span className="at-porta-sub">Vê a marcação chegar ao painel. Confirma, cobra, carimba.</span>
            <ArrowRight size={18} className="at-seta" />
          </a>
        </div>
        <p style={{ textAlign: "center", fontSize: 13, color: "var(--cv-ink-3)", marginTop: 18 }}>
          Sem registo, sem cartão, sem nos pedires nada. Ou <Link to="/precos" style={{ borderBottom: "1px solid var(--cv-linha)" }}>vê os planos</Link>.
        </p>
      </ScrollReveal>
    </section>
  );
}
