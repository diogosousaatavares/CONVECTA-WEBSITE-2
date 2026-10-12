import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Play } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import BotaoComecar from "@/components/BotaoComecar";

/*
 * MONTAR O MEU NEGÓCIO (12/10/2026).
 *
 * Eram duas portas lado a lado («Montar o meu negócio» e «Ver o que faz»).
 * Passa a ser um só apelo, com uma fotografia: a barbeira a mostrar o
 * painel no telemóvel, o título grande e o botão de começar grátis. A
 * porta das funcionalidades fica como linha de texto por baixo do botão.
 * Sem caixa (pedido do Diogo): a fotografia é recortada, com fundo
 * transparente, e assenta no fundo da página.
 */
export default function AcessoTotal() {
  return (
    <section id="o-que-tens" className="cv-wrap cv-sec">
      <ScrollReveal>
        <div className="mn">
          <div className="mn-texto">
            <p className="cv-olho">Dois minutos</p>
            <h2 className="mn-titulo">Montar o meu <span className="cv-marca">negócio</span></h2>
            <p className="cv-texto mn-sub">O teu site de marcações no ar hoje, com o teu nome. Sem cartão para começar.</p>
            <div className="mn-accoes">
              <BotaoComecar grande origem="montar">Começar grátis</BotaoComecar>
              <Link to="/funcionalidades" className="mn-ver">Ver o que faz <ArrowRight size={15} /></Link>
            </div>
          </div>
          <img className="mn-foto" src="/montar-o-meu-negocio.webp" srcSet="/montar-o-meu-negocio-540.webp 540w, /montar-o-meu-negocio.webp 1080w"
            sizes="(max-width: 720px) 90vw, 520px" width="1040" height="1248" loading="lazy"
            alt="Uma profissional a mostrar a agenda do dia no painel da Convecta, no telemóvel" />
        </div>
      </ScrollReveal>
    </section>
  );
}


// O vídeo, numa secção só dele: vem logo a seguir ao topo da página inicial
// (decisão de 23/09). Antes estava no fim do «Acesso total».
export function VideoApps() {
  return (
    <section id="video" className="cv-wrap" style={{ paddingTop: 8 }}>
      {/* ── Vídeo: Duas apps. Um só sistema. ── */}
        <ScrollReveal>
          <div style={{ margin: "56px 0 48px" }}>
            {/* Heading */}
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <p style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontStyle: "italic", fontSize: "clamp(1.2rem, 3vw, 2rem)", color: "var(--cv-ink-1)", lineHeight: 1.25, margin: "0 0 8px" }}>
                Duas apps. Um só sistema.
              </p>
              <p style={{ fontSize: "0.85rem", color: "var(--cv-ink-3)", margin: 0 }}>
                Tu geres. O teu cliente marca.
              </p>
            </div>

            {/* Video */}
            <VideoComSom />

            {/* Social CTA */}
            <div style={{ textAlign: "center", marginTop: 28 }}>
              <a
                href="https://www.instagram.com/convecta.pt"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 10,
                  padding: "11px 24px", borderRadius: 8,
                  background: "linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)",
                  color: "#fff", fontWeight: 700, fontSize: "0.88rem",
                  textDecoration: "none", boxShadow: "0 4px 20px rgba(188,24,136,0.25)",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
                onMouseEnter={e => { e.currentTarget.style.transform="scale(1.03)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform="scale(1)"; }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="0.5" fill="#fff" stroke="none"/>
                </svg>
                Seguir @convecta.pt no Instagram
              </a>
            </div>
          </div>
        </ScrollReveal>
    </section>
  );
}

/*
 * O video em que o Diogo fala.
 *
 * Esta no YouTube, nao no nosso alojamento: o YouTube baixa a qualidade a
 * quem tem rede fraca, e assim o video arranca em vez de ficar a carregar.
 *
 * Mas o YouTube poe cookies de rastreio mal aparece na pagina, e o site diz
 * que nao usa nenhuns. Por isso a pagina mostra so uma imagem com um botao
 * de play; o YouTube so entra quando alguem carrega. Quem nao carregar nao
 * apanha cookie nenhum — e a pagina continua leve.
 */
const YT_ID = "96XY7C_AlTQ";

function VideoComSom() {
  const [aPassar, setAPassar] = useState(false);

  const caixa = {
    position: "relative",
    borderRadius: 16,
    overflow: "hidden",
    border: "1px solid var(--cv-linha)",
    boxShadow: "0 12px 48px rgba(0,0,0,0.1)",
    aspectRatio: "16/9",
    background: "#000",
  };

  if (aPassar) {
    return (
      <div style={caixa}>
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${YT_ID}?autoplay=1&rel=0&modestbranding=1&playsinline=1&hl=pt`}
          title="Convecta — marcações online e gestão para barbearias, salões e estética"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          style={{ width: "100%", height: "100%", border: 0, display: "block" }}
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setAPassar(true)}
      aria-label="Ver o vídeo: o que a Convecta faz"
      style={{ ...caixa, width: "100%", padding: 0, cursor: "pointer", display: "block" }}
    >
      <img
        src="/duas-apps-poster.jpg"
        alt=""
        loading="lazy"
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
      <span style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.28)" }} />
      <span style={{
        position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
        width: 76, height: 76, borderRadius: "50%", background: "var(--cv-amarelo, #F5D142)",
        display: "grid", placeItems: "center", boxShadow: "0 8px 30px rgba(0,0,0,0.45)",
      }}>
        <Play size={30} fill="#111" stroke="#111" style={{ marginLeft: 4 }} />
      </span>
      <span style={{
        position: "absolute", left: 14, bottom: 14, padding: "6px 12px", borderRadius: 999,
        background: "rgba(0,0,0,0.6)", color: "#fff", fontSize: "0.78rem", fontWeight: 600,
      }}>
        2 min · com som
      </span>
    </button>
  );
}
