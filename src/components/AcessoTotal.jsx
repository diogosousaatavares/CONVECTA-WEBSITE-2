import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Play } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

/*
 * As duas portas.
 *
 * Isto era «Acesso total a tudo»: tres capturas de ecra grandes com texto ao
 * lado, mais uma grelha de extras, mais as portas. A 02/10/2026 o que a
 * seccao dizia mudou-se para o lado do telemovel da Personalizacao, em
 * texto — as capturas diziam o que uma linha diz, e empurravam as portas
 * para baixo de tres ecras de altura.
 *
 * Ficaram as portas, que e a unica coisa aqui que pede uma decisao. As
 * imagens continuam em public/provas, caso as queiramos de volta.
 */
export default function AcessoTotal() {
  return (
    <section id="o-que-tens" className="cv-wrap cv-sec">
      <ScrollReveal>
        <div className="at-portas">
          <Link className="at-porta at-porta-forte" to="/comecar">
            <span className="at-porta-olho">Dois minutos</span>
            <span className="at-porta-titulo">Montar a minha barbearia</span>
            <span className="at-porta-sub">O teu site no ar hoje, com o teu nome. Sem cartão para começar.</span>
            <ArrowRight size={18} className="at-seta" />
          </Link>
          <Link className="at-porta" to="/funcionalidades">
            <span className="at-porta-olho">Antes de decidir</span>
            <span className="at-porta-titulo">Ver o que faz</span>
            <span className="at-porta-sub">Agenda, clientes, caixa, comissões, avisos. Tudo o que está lá dentro.</span>
            <ArrowRight size={18} className="at-seta" />
          </Link>
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
          title="Convecta — marcações online e gestão para barbearias"
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
