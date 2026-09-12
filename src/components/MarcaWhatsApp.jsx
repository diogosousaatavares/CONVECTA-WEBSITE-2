import React, { useState } from "react";
import { MessageCircle } from "lucide-react";

/*
 * O simbolo do WhatsApp.
 *
 * O logotipo do WhatsApp e marca registada da Meta: nao o desenho a mao.
 * Este componente procura o ficheiro oficial em public/marcas/whatsapp.svg —
 * basta poures la o ficheiro que a Meta disponibiliza e ele aparece sozinho,
 * sem mexer em codigo. Ate la, mostra um simbolo generico de conversa no
 * verde do WhatsApp, que diz a mesma coisa sem copiar a marca.
 */

const VERDE = "#25D366";

export default function MarcaWhatsApp({ tamanho = 22, comNome = false }) {
  const [semFicheiro, setSemFicheiro] = useState(false);

  const simbolo = semFicheiro ? (
    <span
      aria-hidden="true"
      style={{
        width: tamanho, height: tamanho, borderRadius: "50%", background: VERDE,
        display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
      }}
    >
      <MessageCircle size={Math.round(tamanho * 0.56)} strokeWidth={2.6} color="#fff" fill="none" />
    </span>
  ) : (
    <img
      src="/marcas/whatsapp.svg"
      alt=""
      aria-hidden="true"
      width={tamanho}
      height={tamanho}
      onError={() => setSemFicheiro(true)}
      style={{ width: tamanho, height: tamanho, display: "block", flexShrink: 0 }}
    />
  );

  if (!comNome) return simbolo;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
      {simbolo}
      <strong style={{ fontWeight: 700 }}>WhatsApp</strong>
    </span>
  );
}
