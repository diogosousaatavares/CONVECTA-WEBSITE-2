import React from "react";
import { Link } from "react-router-dom";
import Seo from "@/components/Seo";

export default function PaginaNaoEncontrada() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--cv-ground)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, textAlign: "center" }}>
      <Seo titulo="Página não encontrada" descricao="Este endereço não existe no site da Convecta." noindex />
      <div>
        <p style={{ fontSize: 12, letterSpacing: ".25em", textTransform: "uppercase", color: "rgba(255,255,255,.4)", marginBottom: 12 }}>404</p>
        <h1 className="font-heading" style={{ fontSize: 34, marginBottom: 12 }}>Esta página não existe.</h1>
        <p style={{ color: "rgba(255,255,255,.55)", marginBottom: 28 }}>O endereço pode estar errado ou a página mudou de sítio.</p>
        <Link to="/" style={{ display: "inline-block", padding: "12px 22px", borderRadius: 6, background: "#fee96d", color: "#1a1a1a", fontWeight: 700, textDecoration: "none" }}>Voltar ao início</Link>
      </div>
    </div>
  );
}
