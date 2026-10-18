import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Plus, Minus, Play } from "lucide-react";
import Seo from "@/components/Seo";
import ScrollReveal from "@/components/ScrollReveal";
import CtaSection from "@/components/CtaSection";
import BarraComecarFixa from "@/components/BarraComecarFixa";
import { migalhasLd, faqLd, SITE } from "@/lib/seo";

/*
 * /pagamentos-online (18/10/2026).
 *
 * A página que abre quando se carrega em «Pagamentos online» (ou em «Saber
 * mais» na secção da página inicial). Primeiro a imagem — o cliente a pagar
 * e o barbeiro a receber —, depois como funciona, o que o dono decide, o que
 * custa e as perguntas que ele faz na rua.
 *
 * A imagem de capa é provisória (v1): o Diogo vai fazer uma nova com os
 * ecrãs reais da app. Para a trocar, basta pôr o ficheiro novo em
 * public/pagamentos/ e mudar CAPA aqui.
 */
const CAPA = "/pagamentos/pagamentos-online-capa-v1";
// O tutorial: como ligar a conta Stripe (18/10/2026).
const VIDEO_ID = "ViSip1m6-K0";

/* O vídeo só carrega o YouTube quando se carrega no play: a página não fica
   mais pesada para quem não o vê. */
function VideoTutorial() {
  const [aVer, setAVer] = useState(false);
  return (
    <div className="pol-video">
      {aVer ? (
        <iframe src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&rel=0&modestbranding=1&playsinline=1&hl=pt`}
          title="Como ligar os pagamentos online na Convecta"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
      ) : (
        <button type="button" onClick={() => setAVer(true)} aria-label="Ver o vídeo: como ligar os pagamentos online">
          <img src={`https://i.ytimg.com/vi/${VIDEO_ID}/hqdefault.jpg`} alt="" loading="lazy" />
          <span className="pol-video-play"><Play size={26} fill="currentColor" /></span>
          <span className="pol-video-txt">Vê como se liga, passo a passo</span>
        </button>
      )}
    </div>
  );
}

const LOGOS = [
  ["visa", "Visa"], ["mastercard", "Mastercard"], ["applepay", "Apple Pay"],
  ["googlepay", "Google Pay"], ["mbway", "MB WAY"],
];

const PASSOS = [
  { t: "Ligas a tua conta Stripe", d: "No painel, em Pagamentos online. Pões os dados do teu negócio e o IBAN — cerca de 5 minutos, uma vez." },
  { t: "Escolhes o que se paga", d: "Metade ou o serviço todo, e só nos serviços que quiseres." },
  { t: "O cliente paga ao marcar", d: "No telemóvel, em segundos. O dinheiro cai na tua conta e passa para o teu banco." },
];

const DECIDES = [
  ["Metade ao marcar", "o resto paga na loja"],
  ["O serviço todo", "na loja já não paga nada"],
  ["Só em alguns serviços", "os outros pagam-se na loja, como hoje"],
  ["Só fica marcado depois de pagar", "sem pagamento, a hora continua livre"],
];

const PERGUNTAS = [
  { q: "Quando é que o dinheiro chega ao meu banco?", a: "Cada pagamento fica uns dias no Stripe e depois passa sozinho para o teu IBAN. Nas contas novas, o primeiro pagamento espera 7 dias (é uma regra do Stripe); a partir daí o Stripe deposita todos os dias o que estiver disponível, e chega em 1 a 2 dias úteis." },
  { q: "A Convecta fica com alguma parte?", a: "Não. O dinheiro vai direto para a conta Stripe do teu negócio. Só o Stripe cobra a comissão dele: 1,5 % + 0,25 € por pagamento com cartão europeu, Apple Pay, Google Pay ou MB WAY. Num corte de 15 € recebes 14,52 €." },
  { q: "Preciso de ter empresa?", a: "Não. No Stripe escolhes «Empresário em nome individual» se trabalhas por conta própria, ou «Sociedade» se tens empresa. Pedem a tua identificação e o IBAN, como um banco pediria." },
  { q: "E se o cliente não aparecer?", a: "Quem paga ao marcar quase sempre aparece. Se faltar, o que pagou fica contigo. Se quiseres devolver, fazes isso no teu Stripe em dois cliques." },
  { q: "Quanto custa?", a: "Está incluído nos planos Profissional e Business. No Essencial é um extra de 4,99 €/mês, que ligas e desligas no painel quando quiseres." },
  { q: "O cliente tem de instalar alguma coisa?", a: "Não. Marca na app do teu negócio, como sempre, e paga no mesmo passo — com cartão, Apple Pay, Google Pay ou MB WAY." },
];

export default function PagamentosOnlinePagina() {
  const [aberta, setAberta] = React.useState(0);
  const ld = [
    migalhasLd([{ nome: "Início", caminho: "/" }, { nome: "Pagamentos online", caminho: "/pagamentos-online" }]),
    faqLd(PERGUNTAS),
  ];

  return (
    <div className="pt-24 pol" style={{ backgroundColor: "var(--cv-ground)" }}>
      <Seo
        titulo="Pagamentos online nas marcações — o cliente paga ao marcar"
        descricao="Com a Convecta o cliente paga a marcação no telemóvel — metade ou tudo, com cartão, Apple Pay, Google Pay ou MB WAY. O dinheiro vai direto para a tua conta. Menos faltas, zero comissões da Convecta."
        caminho="/pagamentos-online"
        imagem={`${SITE.url}${CAPA}.jpg`}
        ld={ld}
      />

      {/* A imagem de capa saiu a 18/10/2026 (pedido do Diogo). */}
      <section className="cv-wrap pol-intro">
        <p className="cv-olho">Pagamentos online</p>
        <h1 className="cv-h1 pol-h1">O cliente paga ao marcar. <span className="cv-marca">Acabam as faltas.</span></h1>
        <p className="pol-lead">O pagamento é um passo da marcação: o cliente escolhe a hora e paga no telemóvel. O dinheiro cai na tua conta. A Convecta não fica com nada.</p>
        <div className="pol-logos" aria-label="Cartão, Apple Pay, Google Pay e MB WAY">
          {LOGOS.map(([id, nome]) => (
            <span key={id} className="po-logo" title={nome}><img src={`/pagamentos/${id}.png`} alt={nome} loading="lazy" /></span>
          ))}
        </div>
        <div className="pol-botoes">
          <Link to="/comecar" className="dt-cta">Começar grátis <ArrowRight size={18} /></Link>
          <a href="#como-funciona" className="pol-sec">Como funciona</a>
        </div>
      </section>

      {/* 2. Como funciona — três passos, por esta ordem */}
      <section id="como-funciona" className="cv-wrap cv-sec pol-bloco">
        <ScrollReveal><h2 className="cv-h2">Como funciona</h2></ScrollReveal>
        <ol className="pol-passos">
          {PASSOS.map((p, i) => (
            <ScrollReveal key={p.t} delay={0.06 * i}>
              <li>
                <span className="pol-num">{i + 1}</span>
                <div><h3>{p.t}</h3><p className="cv-mini">{p.d}</p></div>
              </li>
            </ScrollReveal>
          ))}
        </ol>
        <ScrollReveal><VideoTutorial /></ScrollReveal>
      </section>

      {/* 3. Tu decides */}
      <section className="cv-wrap cv-sec pol-bloco">
        <ScrollReveal><h2 className="cv-h2">Tu decides</h2></ScrollReveal>
        <ul className="pol-linhas">
          {DECIDES.map(([t, d]) => (
            <li key={t}><span className="pol-check"><Check size={14} strokeWidth={3} /></span><b>{t}</b><span>{d}</span></li>
          ))}
        </ul>
      </section>

      {/* 4. O que custa */}
      <section className="cv-wrap cv-sec pol-bloco">
        <ScrollReveal><h2 className="cv-h2">O que custa</h2></ScrollReveal>
        <div className="pol-custos">
          <div><span className="pol-grande">0 %</span><span>para a Convecta</span></div>
          <div><span className="pol-grande">1,5 % + 0,25 €</span><span>do Stripe, por pagamento</span></div>
          <div><span className="pol-grande">14,52 €</span><span>é o que recebes num corte de 15 €</span></div>
        </div>
        <p className="cv-mini" style={{ marginTop: 18 }}>Incluído nos planos Profissional e Business. No Essencial é um extra de 4,99 €/mês. Passar o dinheiro para o banco é grátis.</p>
      </section>

      {/* 5. Perguntas */}
      <section className="cv-wrap cv-sec pol-bloco">
        <ScrollReveal><h2 className="cv-h2">Perguntas que nos fazem</h2></ScrollReveal>
        <div className="pol-faq">
          {PERGUNTAS.map((p, i) => (
            <div key={p.q} className={`pol-faq-item${aberta === i ? " aberta" : ""}`}>
              <button type="button" onClick={() => setAberta(aberta === i ? -1 : i)} aria-expanded={aberta === i}>
                <span>{p.q}</span>{aberta === i ? <Minus size={18} /> : <Plus size={18} />}
              </button>
              {aberta === i && <p className="cv-mini">{p.a}</p>}
            </div>
          ))}
        </div>
      </section>

      <CtaSection title="Acaba com as faltas. Começa hoje." buttonText="Começar grátis" to="/comecar" secondaryText="ou fala connosco" />
      <BarraComecarFixa />
    </div>
  );
}
